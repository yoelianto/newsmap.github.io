<script>
	import Header from './Header.svelte';
	import Head from './Head.svelte';
	import Paragraph from './Paragraph.svelte';
	import List from './List.svelte'
	import Quote from './Quote.svelte';
	import Image from './Image.svelte';
	import Credit from './Credit.svelte';
	import Timeline from './Timeline.svelte';

	//Main Font
	let fontfamily1 = "Roboto Mono"

	//Main Color
	let fontColor = '#283039'

	//Secondary Dark Color
	let colorBrandDarkBlue = "#242053"

	// scroller
	import Scroller from '@sveltejs/svelte-scroller';
	// scroller variables
	let count, index, offset, progress;
	let top = 0;
	let threshold = 0;
	let bottom = 1;

	// styling variables
	let mainBackground='hsl(0,0%,100%)'	
	let headerBackground='hsl(0,0%,100%)'
	let titleColor='#03714e'
	let subtitleColor='#283039'
	let subheadColor='hsl(0,0%,0%)'

	let height

	let credit =[{
		role : 'Penulis',
		name : 'Ahsan Ridhoi'
		}]
	let source = ''

	let subhead=[
		'Kredit konsumer di Indonesia sedang menuju lanskap baru dengan kehadiran paylater. Paylater tumbuh sangat pesat, sementara kartu kredit nyaris stagnan. Potensi pasar yang seharusnya bisa dijangkau oleh kartu kredit, terambil oleh paylater yang dianggap menawarkan lebih banyak keunggulan.'
	]

</script>

<svelte:head>
	<meta
		name='viewport' 
		content='width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0'
	/>
	
	<link rel="preconnect" href="https://fonts.googleapis.com">
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
	<link href="https://fonts.googleapis.com/css2?family=Mulish:ital,wght@0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap" rel="stylesheet">
	<link href="https://fonts.googleapis.com/css2?family=Coiny&display=swap" rel="stylesheet">
</svelte:head>

<main style="background-color: {mainBackground};padding-top:40px">
	<div class="headerilustrasi">
		<div id="g-Lanskap-Baru-Bisnis-Kredit-Konsumer--Kartu-Kredit-vs-Paylater_-1-box" class="ai2html">

			<!-- Artboard: cover_smallplus -->
			<div id="g-Lanskap-Baru-Bisnis-Kredit-Konsumer--Kartu-Kredit-vs-Paylater_-1-cover_smallplus" class="g-artboard" style="max-width: 320px;max-height: 320px" data-aspect-ratio="1" data-min-width="0" data-max-width="509">
			<div style="padding: 0 0 100% 0;"></div>
				<img id="g-Lanskap-Baru-Bisnis-Kredit-Konsumer--Kartu-Kredit-vs-Paylater_-1-cover_smallplus-img" class="g-aiImg" alt="" src="./images/Lanskap-Baru-Bisnis-Kredit-Konsumer--Kartu-Kredit-vs-Paylater_-1-cover_smallplus.png"/>
			</div>
		
			<!-- Artboard: cover_submedium -->
			<div id="g-Lanskap-Baru-Bisnis-Kredit-Konsumer--Kartu-Kredit-vs-Paylater_-1-cover_submedium" class="g-artboard" style="width:510px; height:320px;" data-aspect-ratio="1.594" data-min-width="510" data-max-width="689">
			<div style=""></div>
				<img id="g-Lanskap-Baru-Bisnis-Kredit-Konsumer--Kartu-Kredit-vs-Paylater_-1-cover_submedium-img" class="g-aiImg" alt="" src="./images/Lanskap-Baru-Bisnis-Kredit-Konsumer--Kartu-Kredit-vs-Paylater_-1-cover_submedium.png"/>
			</div>
		
			<!-- Artboard: cover_medium -->
			<div id="g-Lanskap-Baru-Bisnis-Kredit-Konsumer--Kartu-Kredit-vs-Paylater_-1-cover_medium" class="g-artboard" style="width:690px; height:320px;" data-aspect-ratio="2.156" data-min-width="690" data-max-width="919">
			<div style=""></div>
				<img id="g-Lanskap-Baru-Bisnis-Kredit-Konsumer--Kartu-Kredit-vs-Paylater_-1-cover_medium-img" class="g-aiImg" alt="" src="./images/Lanskap-Baru-Bisnis-Kredit-Konsumer--Kartu-Kredit-vs-Paylater_-1-cover_medium.png"/>
			</div>
		
			<!-- Artboard: cover_large -->
			<div id="g-Lanskap-Baru-Bisnis-Kredit-Konsumer--Kartu-Kredit-vs-Paylater_-1-cover_large" class="g-artboard" style="width:920px; height:319px;" data-aspect-ratio="2.884" data-min-width="920" data-max-width="1399">
			<div style=""></div>
				<img id="g-Lanskap-Baru-Bisnis-Kredit-Konsumer--Kartu-Kredit-vs-Paylater_-1-cover_large-img" class="g-aiImg" alt="" src="./images/Lanskap-Baru-Bisnis-Kredit-Konsumer--Kartu-Kredit-vs-Paylater_-1-cover_large.png"/>
			</div>
		
			<!-- Artboard: cover_xlarge_5 -->
			<div id="g-Lanskap-Baru-Bisnis-Kredit-Konsumer--Kartu-Kredit-vs-Paylater_-1-cover_xlarge_5" class="g-artboard" style="width:1400px; height:313.5px;" data-aspect-ratio="4.466" data-min-width="1400">
			<div style=""></div>
				<img id="g-Lanskap-Baru-Bisnis-Kredit-Konsumer--Kartu-Kredit-vs-Paylater_-1-cover_xlarge_5-img" class="g-aiImg" alt="" src="./images/Lanskap-Baru-Bisnis-Kredit-Konsumer--Kartu-Kredit-vs-Paylater_-1-cover_xlarge_5.png"/>
			</div>
		</div>
	</div>

	

	<Header 
		--headerBackground={headerBackground}
		--titleColor={titleColor}
		--subtitleColor={subtitleColor}
		--subheadColor={subheadColor}

		fullHeader={false}

		title='Lanskap Baru Bisnis Kredit Konsumer'
		subtitle='Kartu Kredit vs Paylater?'	

		author='Ahsan Ridhoi'
		date='11 Mei 2022'

		{subhead}
	/>

	<div class="divider"></div>

	<Scroller
		{top}
		{threshold}
		{bottom}
		bind:count
		bind:index
		bind:offset
		bind:progress
	>
		<div slot="background">
			<div id="g-Lanskap-Baru-Bisnis-Kredit-Konsumer--Kartu-Kredit-vs-Paylater_-1-box" class="ai2html" style='position:relative'>	
			{#if index == 0}
				<div class="page"
					style:opacity={offset <= 0.2 ? offset : offset <= 0.8 ? 1 : 1 - offset}>
						<!-- Halaman 1 -->
						<!-- Artboard: smallplus_1 -->
							<div id="g-Lanskap-Baru-Bisnis-Kredit-Konsumer--Kartu-Kredit-vs-Paylater_-1-smallplus_1" class="g-artboard" style="max-width: 320px;max-height: 700px" data-aspect-ratio="0.457" data-min-width="0" data-max-width="509">
								<div style="padding: 0 0 218.75% 0;"></div>
										<img id="g-Lanskap-Baru-Bisnis-Kredit-Konsumer--Kartu-Kredit-vs-Paylater_-1-smallplus_1-img" class="g-aiImg" alt="" src="./images/Lanskap-Baru-Bisnis-Kredit-Konsumer--Kartu-Kredit-vs-Paylater_-1-smallplus_1.png"/>
										<div id="g-ai5-1" class="g-ai2html-settings g-aiAbs g-aiPointText" style="top:28.1403%;margin-top:-7px;right:12.392%;width:75px;">
											<p class="g-pstyle0">16,94 Juta</p>
										</div>
										<div id="g-ai5-2" class="g-ai2html-settings g-aiAbs g-aiPointText" style="top:81.0139%;margin-top:-18.1px;left:49.9066%;margin-left:-124.5px;width:249px;">
											<p class="g-pstyle1">Hanya menjangkau 9% populasi</p>
											<p class="g-pstyle1">usia dewasa</p>
										</div>
										<div id="g-ai5-3" class="g-ai2html-settings g-aiAbs g-aiPointText" style="top:86.233%;margin-top:-5.6px;left:49.9605%;margin-left:-36.5px;width:73px;">
											<p class="g-pstyle2">Sumber: BPS</p>
										</div>
									</div>
								
									<!-- Artboard: submedium_1 -->
									<div id="g-Lanskap-Baru-Bisnis-Kredit-Konsumer--Kartu-Kredit-vs-Paylater_-1-submedium_1" class="g-artboard" style="width:510px; height:800.000000000001px;" data-aspect-ratio="0.637" data-min-width="510" data-max-width="689">
								<div style=""></div>
										<img id="g-Lanskap-Baru-Bisnis-Kredit-Konsumer--Kartu-Kredit-vs-Paylater_-1-submedium_1-img" class="g-aiImg" alt="" src="./images/Lanskap-Baru-Bisnis-Kredit-Konsumer--Kartu-Kredit-vs-Paylater_-1-submedium_1.png"/>
										<div id="g-ai6-1" class="g-ai2html-settings g-aiAbs g-aiPointText" style="top:16.4424%;margin-top:-11.5px;left:10.3126%;width:63px;">
											<p class="g-pstyle0">2020</p>
										</div>
										<div id="g-ai6-2" class="g-ai2html-settings g-aiAbs g-aiPointText" style="top:16.4424%;margin-top:-11.5px;right:12.4492%;width:106px;">
											<p class="g-pstyle1">16,94 Juta</p>
										</div>
										<div id="g-ai6-3" class="g-ai2html-settings g-aiAbs g-aiPointText" style="top:23.1924%;margin-top:-11.5px;left:10.3126%;width:60px;">
											<p class="g-pstyle0">2021</p>
										</div>
										<div id="g-ai6-4" class="g-ai2html-settings g-aiAbs g-aiPointText" style="top:23.1924%;margin-top:-11.5px;right:12.532%;width:103px;">
											<p class="g-pstyle1">16,51 Juta</p>
										</div>
										<div id="g-ai6-5" class="g-ai2html-settings g-aiAbs g-aiPointText" style="top:90.183%;margin-top:-28.5px;left:50.033%;margin-left:-192.5px;width:385px;">
											<p class="g-pstyle2">Hanya menjangkau 9% populasi</p>
											<p class="g-pstyle2">usia dewasa</p>
										</div>
										<div id="g-ai6-6" class="g-ai2html-settings g-aiAbs g-aiPointText" style="top:97.4855%;margin-top:-8.9px;left:49.9536%;margin-left:-51.5px;width:103px;">
											<p class="g-pstyle3">Sumber: BPS</p>
										</div>
									</div>
								
									<!-- Artboard: medium_1 -->
									<div id="g-Lanskap-Baru-Bisnis-Kredit-Konsumer--Kartu-Kredit-vs-Paylater_-1-medium_1" class="g-artboard" style="width:690px; height:1024px;" data-aspect-ratio="0.674" data-min-width="690" data-max-width="919">
								<div style=""></div>
										<img id="g-Lanskap-Baru-Bisnis-Kredit-Konsumer--Kartu-Kredit-vs-Paylater_-1-medium_1-img" class="g-aiImg" alt="" src="./images/Lanskap-Baru-Bisnis-Kredit-Konsumer--Kartu-Kredit-vs-Paylater_-1-medium_1.png"/>
										<div id="g-ai7-1" class="g-ai2html-settings g-aiAbs g-aiPointText" style="top:11.6607%;margin-top:-15.4px;left:10.3125%;width:78px;">
											<p class="g-pstyle0">2020</p>
										</div>
										<div id="g-ai7-2" class="g-ai2html-settings g-aiAbs g-aiPointText" style="top:11.6607%;margin-top:-15.4px;right:12.398%;width:136px;">
											<p class="g-pstyle1">16,94 Juta</p>
										</div>
										<div id="g-ai7-3" class="g-ai2html-settings g-aiAbs g-aiPointText" style="top:18.7896%;margin-top:-15.4px;left:10.3125%;width:74px;">
											<p class="g-pstyle0">2021</p>
										</div>
										<div id="g-ai7-4" class="g-ai2html-settings g-aiAbs g-aiPointText" style="top:18.7896%;margin-top:-15.4px;right:12.4723%;width:132px;">
											<p class="g-pstyle1">16,51 Juta</p>
										</div>
										<div id="g-ai7-5" class="g-ai2html-settings g-aiAbs g-aiPointText" style="top:89.6294%;margin-top:-38.8px;left:50.0245%;margin-left:-256.5px;width:513px;">
											<p class="g-pstyle2">Hanya menjangkau 9% populasi</p>
											<p class="g-pstyle2">usia dewasa</p>
										</div>
										<div id="g-ai7-6" class="g-ai2html-settings g-aiAbs g-aiPointText" style="top:97.3623%;margin-top:-12px;left:49.9833%;margin-left:-66px;width:132px;">
											<p class="g-pstyle3">Sumber: BPS</p>
										</div>
									</div>
								
									<!-- Artboard: large_1 -->
									<div id="g-Lanskap-Baru-Bisnis-Kredit-Konsumer--Kartu-Kredit-vs-Paylater_-1-large_1" class="g-artboard" style="width:920px; height:920.000000000001px;" data-aspect-ratio="1" data-min-width="920" data-max-width="1399">
								<div style=""></div>
										<img id="g-Lanskap-Baru-Bisnis-Kredit-Konsumer--Kartu-Kredit-vs-Paylater_-1-large_1-img" class="g-aiImg" alt="" src="./images/Lanskap-Baru-Bisnis-Kredit-Konsumer--Kartu-Kredit-vs-Paylater_-1-large_1.png"/>
										<div id="g-ai8-1" class="g-ai2html-settings g-aiAbs g-aiPointText" style="top:11.8018%;margin-top:-13.6px;left:23.2991%;width:72px;">
											<p class="g-pstyle0">2020</p>
										</div>
										<div id="g-ai8-2" class="g-ai2html-settings g-aiAbs g-aiPointText" style="top:11.8018%;margin-top:-13.6px;right:24.7309%;width:124px;">
											<p class="g-pstyle1">16,94 Juta</p>
										</div>
										<div id="g-ai8-3" class="g-ai2html-settings g-aiAbs g-aiPointText" style="top:18.867%;margin-top:-13.6px;left:23.2991%;width:69px;">
											<p class="g-pstyle0">2021</p>
										</div>
										<div id="g-ai8-4" class="g-ai2html-settings g-aiAbs g-aiPointText" style="top:18.867%;margin-top:-13.6px;right:24.7169%;width:121px;">
											<p class="g-pstyle1">16,51 Juta</p>
										</div>
										<div id="g-ai8-5" class="g-ai2html-settings g-aiAbs g-aiPointText" style="top:89.6324%;margin-top:-34.6px;left:49.9923%;margin-left:-231px;width:462px;">
											<p class="g-pstyle2">Hanya menjangkau 9% populasi</p>
											<p class="g-pstyle2">usia dewasa</p>
										</div>
										<div id="g-ai8-6" class="g-ai2html-settings g-aiAbs g-aiPointText" style="top:97.3328%;margin-top:-10.5px;left:50.0064%;margin-left:-60.5px;width:121px;">
											<p class="g-pstyle3">Sumber: BPS</p>
										</div>
									</div>
								
									<!-- Artboard: xlarge_1 -->
									<div id="g-Lanskap-Baru-Bisnis-Kredit-Konsumer--Kartu-Kredit-vs-Paylater_-1-xlarge_1" class="g-artboard" style="width:1400px; height:787.500000000001px;" data-aspect-ratio="1.778" data-min-width="1400">
								<div style=""></div>
										<img id="g-Lanskap-Baru-Bisnis-Kredit-Konsumer--Kartu-Kredit-vs-Paylater_-1-xlarge_1-img" class="g-aiImg" alt="" src="./images/Lanskap-Baru-Bisnis-Kredit-Konsumer--Kartu-Kredit-vs-Paylater_-1-xlarge_1.png"/>
										<div id="g-ai9-1" class="g-ai2html-settings g-aiAbs g-aiPointText" style="top:11.7365%;margin-top:-11.4px;left:34.9573%;width:65px;">
											<p class="g-pstyle0">2020</p>
										</div>
										<div id="g-ai9-2" class="g-ai2html-settings g-aiAbs g-aiPointText" style="top:11.7365%;margin-top:-11.4px;right:35.7958%;width:109px;">
											<p class="g-pstyle1">16,94 Juta</p>
										</div>
										<div id="g-ai9-3" class="g-ai2html-settings g-aiAbs g-aiPointText" style="top:18.7206%;margin-top:-11.4px;left:34.9573%;width:62px;">
											<p class="g-pstyle0">2021</p>
										</div>
										<div id="g-ai9-4" class="g-ai2html-settings g-aiAbs g-aiPointText" style="top:18.7206%;margin-top:-11.4px;right:35.7471%;width:107px;">
											<p class="g-pstyle1">16,51 Juta</p>
										</div>
										<div id="g-ai9-5" class="g-ai2html-settings g-aiAbs g-aiPointText" style="top:89.6553%;margin-top:-30px;left:49.9879%;margin-left:-199.5px;width:399px;">
											<p class="g-pstyle2">Hanya menjangkau 9% populasi</p>
											<p class="g-pstyle2">usia dewasa</p>
										</div>
										<div id="g-ai9-6" class="g-ai2html-settings g-aiAbs g-aiPointText" style="top:97.42%;margin-top:-9.2px;left:50.0082%;margin-left:-53.5px;width:107px;">
											<p class="g-pstyle3">Sumber: BPS</p>
										</div>
									</div>
						
				</div>
			{:else if index == 1}
				<div class="page"
					style:opacity={offset <= 0.2 ? offset : offset <= 0.8 ? 1 : 1 - offset}>
						<!-- Halaman 2 -->
						<!-- Artboard: smallplus_2 -->
						<div id="g-Lanskap-Baru-Bisnis-Kredit-Konsumer--Kartu-Kredit-vs-Paylater_-1-smallplus_2" class="g-artboard" style="max-width: 320px;max-height: 700px" data-aspect-ratio="0.457" data-min-width="0" data-max-width="509">
							<div style="padding: 0 0 218.75% 0;"></div>
									<img id="g-Lanskap-Baru-Bisnis-Kredit-Konsumer--Kartu-Kredit-vs-Paylater_-1-smallplus_2-img" class="g-aiImg" alt="" src="./images/Lanskap-Baru-Bisnis-Kredit-Konsumer--Kartu-Kredit-vs-Paylater_-1-smallplus_2.png"/>
									<div id="g-ai10-1" class="g-ai2html-settings g-aiAbs g-aiPointText" style="top:8.6174%;margin-top:-10.3px;left:50.5437%;margin-left:-45.5px;width:91px;">
										<p class="g-pstyle0">VOLUME</p>
									</div>
									<div id="g-ai10-2" class="g-ai2html-settings g-aiAbs g-aiPointText" style="top:10.4203%;margin-top:-4.9px;right:85.3729%;width:35px;">
										<p class="g-pstyle1">500</p>
									</div>
									<div id="g-ai10-3" class="g-ai2html-settings g-aiAbs g-aiPointText" style="top:12.4643%;margin-top:-8.3px;left:21.1401%;width:64px;">
										<p class="g-pstyle2">100000</p>
									</div>
									<div id="g-ai10-4" class="g-ai2html-settings g-aiAbs g-aiPointText" style="top:17.7639%;margin-top:-3.3px;left:68.4596%;margin-left:-16.5px;width:33px;">
										<p class="g-pstyle3">2019</p>
									</div>
									<div id="g-ai10-5" class="g-ai2html-settings g-aiAbs g-aiPointText" style="top:19.3849%;margin-top:-6.7px;left:68.4698%;margin-left:-33px;width:66px;">
										<p class="g-pstyle4">349,21 JT</p>
									</div>
									<div id="g-ai10-6" class="g-ai2html-settings g-aiAbs g-aiPointText" style="top:21.8489%;margin-top:-4.9px;right:85.3525%;width:34px;">
										<p class="g-pstyle1">100</p>
									</div>
									<div id="g-ai10-7" class="g-ai2html-settings g-aiAbs g-aiPointText" style="top:25.4203%;margin-top:-4.9px;right:85.3729%;width:35px;">
										<p class="g-pstyle1">500</p>
									</div>
									<div id="g-ai10-8" class="g-ai2html-settings g-aiAbs g-aiPointText" style="top:27.6071%;margin-top:-8.3px;left:21.1401%;width:64px;">
										<p class="g-pstyle2">100000</p>
									</div>
									<div id="g-ai10-9" class="g-ai2html-settings g-aiAbs g-aiPointText" style="top:28.1925%;margin-top:-3.3px;left:68.4956%;margin-left:-17px;width:34px;">
										<p class="g-pstyle5">2020</p>
									</div>
									<div id="g-ai10-10" class="g-ai2html-settings g-aiAbs g-aiPointText" style="top:29.8135%;margin-top:-6.7px;left:68.5098%;margin-left:-34px;width:68px;">
										<p class="g-pstyle6">274,68 JT</p>
									</div>
									<div id="g-ai10-11" class="g-ai2html-settings g-aiAbs g-aiPointText" style="top:36.9918%;margin-top:-4.9px;right:85.3525%;width:34px;">
										<p class="g-pstyle1">100</p>
									</div>
									<div id="g-ai10-12" class="g-ai2html-settings g-aiAbs g-aiPointText" style="top:41.9257%;margin-top:-10.5px;left:49.7534%;margin-left:-32.5px;width:65px;">
										<p class="g-pstyle0">NILAI</p>
									</div>
									<div id="g-ai10-13" class="g-ai2html-settings g-aiAbs g-aiPointText" style="top:47.6071%;margin-top:-8.3px;left:21.1108%;width:64px;">
										<p class="g-pstyle7">100000</p>
									</div>
									<div id="g-ai10-14" class="g-ai2html-settings g-aiAbs g-aiPointText" style="top:50.621%;margin-top:-3.3px;left:68.5127%;margin-left:-16.5px;width:33px;">
										<p class="g-pstyle5">2019</p>
									</div>
									<div id="g-ai10-15" class="g-ai2html-settings g-aiAbs g-aiPointText" style="top:52.2421%;margin-top:-6.7px;left:68.5625%;margin-left:-44.5px;width:89px;">
										<p class="g-pstyle6">342.682,83 M</p>
									</div>
									<div id="g-ai10-16" class="g-ai2html-settings g-aiAbs g-aiPointText" style="top:59.2775%;margin-top:-4.9px;left:16.7223%;margin-left:-17px;width:34px;">
										<p class="g-pstyle8">100</p>
									</div>
									<div id="g-ai10-17" class="g-ai2html-settings g-aiAbs g-aiPointText" style="top:59.2775%;margin-top:-4.9px;left:83.1044%;margin-left:-17.5px;width:35px;">
										<p class="g-pstyle8">500</p>
									</div>
									<div id="g-ai10-18" class="g-ai2html-settings g-aiAbs g-aiPointText" style="top:62.6071%;margin-top:-8.3px;left:21.1108%;width:64px;">
										<p class="g-pstyle7">100000</p>
									</div>
									<div id="g-ai10-19" class="g-ai2html-settings g-aiAbs g-aiPointText" style="top:65.621%;margin-top:-3.3px;left:68.5487%;margin-left:-17px;width:34px;">
										<p class="g-pstyle5">2020</p>
									</div>
									<div id="g-ai10-20" class="g-ai2html-settings g-aiAbs g-aiPointText" style="top:67.0992%;margin-top:-6.7px;left:68.6467%;margin-left:-44px;width:88px;">
										<p class="g-pstyle6">238.903,61 M</p>
									</div>
								</div>
							
								<!-- Artboard: submedium_2 -->
								<div id="g-Lanskap-Baru-Bisnis-Kredit-Konsumer--Kartu-Kredit-vs-Paylater_-1-submedium_2" class="g-artboard" style="width:510px; height:800px;" data-aspect-ratio="0.638" data-min-width="510" data-max-width="689">
							<div style=""></div>
									<img id="g-Lanskap-Baru-Bisnis-Kredit-Konsumer--Kartu-Kredit-vs-Paylater_-1-submedium_2-img" class="g-aiImg" alt="" src="./images/Lanskap-Baru-Bisnis-Kredit-Konsumer--Kartu-Kredit-vs-Paylater_-1-submedium_2.png"/>
									<div id="g-ai11-1" class="g-ai2html-settings g-aiAbs g-aiPointText" style="top:8.5103%;margin-top:-12.1px;left:50.3059%;margin-left:-50px;width:100px;">
										<p class="g-pstyle0">VOLUME</p>
									</div>
									<div id="g-ai11-2" class="g-ai2html-settings g-aiAbs g-aiPointText" style="top:10.3132%;margin-top:-5.5px;right:75.3373%;width:37px;">
										<p class="g-pstyle1">500</p>
									</div>
									<div id="g-ai11-3" class="g-ai2html-settings g-aiAbs g-aiPointText" style="top:12.5268%;margin-top:-9.2px;left:29.3051%;width:70px;">
										<p class="g-pstyle2">100000</p>
									</div>
									<div id="g-ai11-4" class="g-ai2html-settings g-aiAbs g-aiPointText" style="top:17.7192%;margin-top:-3.8px;left:63.2793%;margin-left:-17.5px;width:35px;">
										<p class="g-pstyle3">2019</p>
									</div>
									<div id="g-ai11-5" class="g-ai2html-settings g-aiAbs g-aiPointText" style="top:19.3135%;margin-top:-7.5px;left:63.3146%;margin-left:-36.5px;width:73px;">
										<p class="g-pstyle4">349,21 JT</p>
									</div>
									<div id="g-ai11-6" class="g-ai2html-settings g-aiAbs g-aiPointText" style="top:21.9382%;margin-top:-5.5px;right:75.4908%;width:35px;">
										<p class="g-pstyle1">100</p>
									</div>
									<div id="g-ai11-7" class="g-ai2html-settings g-aiAbs g-aiPointText" style="top:25.4382%;margin-top:-5.5px;right:75.3373%;width:37px;">
										<p class="g-pstyle1">500</p>
									</div>
									<div id="g-ai11-8" class="g-ai2html-settings g-aiAbs g-aiPointText" style="top:27.5268%;margin-top:-9.2px;left:29.3051%;width:70px;">
										<p class="g-pstyle2">100000</p>
									</div>
									<div id="g-ai11-9" class="g-ai2html-settings g-aiAbs g-aiPointText" style="top:28.2192%;margin-top:-3.8px;left:63.2911%;margin-left:-18px;width:36px;">
										<p class="g-pstyle5">2020</p>
									</div>
									<div id="g-ai11-10" class="g-ai2html-settings g-aiAbs g-aiPointText" style="top:29.8135%;margin-top:-7.5px;left:63.3152%;margin-left:-37.5px;width:75px;">
										<p class="g-pstyle6">274,68 JT</p>
									</div>
									<div id="g-ai11-11" class="g-ai2html-settings g-aiAbs g-aiPointText" style="top:37.0632%;margin-top:-5.5px;right:75.4908%;width:35px;">
										<p class="g-pstyle1">100</p>
									</div>
									<div id="g-ai11-12" class="g-ai2html-settings g-aiAbs g-aiPointText" style="top:41.9078%;margin-top:-12.3px;left:49.8093%;margin-left:-35.5px;width:71px;">
										<p class="g-pstyle0">NILAI</p>
									</div>
									<div id="g-ai11-13" class="g-ai2html-settings g-aiAbs g-aiPointText" style="top:47.6518%;margin-top:-9.2px;left:29.284%;width:70px;">
										<p class="g-pstyle7">100000</p>
									</div>
									<div id="g-ai11-14" class="g-ai2html-settings g-aiAbs g-aiPointText" style="top:50.5942%;margin-top:-3.8px;left:63.3174%;margin-left:-17.5px;width:35px;">
										<p class="g-pstyle5">2019</p>
									</div>
									<div id="g-ai11-15" class="g-ai2html-settings g-aiAbs g-aiPointText" style="top:52.1885%;margin-top:-7.5px;left:63.3531%;margin-left:-49.5px;width:99px;">
										<p class="g-pstyle6">342.682,83 M</p>
									</div>
									<div id="g-ai11-16" class="g-ai2html-settings g-aiAbs g-aiPointText" style="top:59.1882%;margin-top:-5.5px;left:26.067%;margin-left:-17.5px;width:35px;">
										<p class="g-pstyle8">100</p>
									</div>
									<div id="g-ai11-17" class="g-ai2html-settings g-aiAbs g-aiPointText" style="top:59.1882%;margin-top:-5.5px;left:73.7529%;margin-left:-18.5px;width:37px;">
										<p class="g-pstyle8">500</p>
									</div>
									<div id="g-ai11-18" class="g-ai2html-settings g-aiAbs g-aiPointText" style="top:62.6518%;margin-top:-9.2px;left:29.284%;width:70px;">
										<p class="g-pstyle7">100000</p>
									</div>
									<div id="g-ai11-19" class="g-ai2html-settings g-aiAbs g-aiPointText" style="top:65.5942%;margin-top:-3.8px;left:63.3292%;margin-left:-18px;width:36px;">
										<p class="g-pstyle5">2020</p>
									</div>
									<div id="g-ai11-20" class="g-ai2html-settings g-aiAbs g-aiPointText" style="top:67.1885%;margin-top:-7.5px;left:63.3294%;margin-left:-48.5px;width:97px;">
										<p class="g-pstyle6">238.903,61 M</p>
									</div>
								</div>
							
								<!-- Artboard: medium_2 -->
								<div id="g-Lanskap-Baru-Bisnis-Kredit-Konsumer--Kartu-Kredit-vs-Paylater_-1-medium_2" class="g-artboard" style="width:690px; height:1024px;" data-aspect-ratio="0.674" data-min-width="690" data-max-width="919">
							<div style=""></div>
									<img id="g-Lanskap-Baru-Bisnis-Kredit-Konsumer--Kartu-Kredit-vs-Paylater_-1-medium_2-img" class="g-aiImg" alt="" src="./images/Lanskap-Baru-Bisnis-Kredit-Konsumer--Kartu-Kredit-vs-Paylater_-1-medium_2.png"/>
									<div id="g-ai12-1" class="g-ai2html-settings g-aiAbs g-aiPointText" style="top:8.5357%;margin-top:-15.4px;left:50.301%;margin-left:-61px;width:122px;">
										<p class="g-pstyle0">VOLUME</p>
									</div>
									<div id="g-ai12-2" class="g-ai2html-settings g-aiAbs g-aiPointText" style="top:10.3288%;margin-top:-6.8px;right:74.0004%;width:41px;">
										<p class="g-pstyle1">500</p>
									</div>
									<div id="g-ai12-3" class="g-ai2html-settings g-aiAbs g-aiPointText" style="top:12.4389%;margin-top:-11.4px;left:30.4207%;width:83px;">
										<p class="g-pstyle2">100000</p>
									</div>
									<div id="g-ai12-4" class="g-ai2html-settings g-aiAbs g-aiPointText" style="top:17.7407%;margin-top:-4.7px;left:62.5894%;margin-left:-19.5px;width:39px;">
										<p class="g-pstyle3">2019</p>
									</div>
									<div id="g-ai12-5" class="g-ai2html-settings g-aiAbs g-aiPointText" style="top:19.3194%;margin-top:-9.8px;left:62.5764%;margin-left:-43.5px;width:87px;">
										<p class="g-pstyle4">349,21 JT</p>
									</div>
									<div id="g-ai12-6" class="g-ai2html-settings g-aiAbs g-aiPointText" style="top:21.9499%;margin-top:-6.8px;right:74.0644%;width:39px;">
										<p class="g-pstyle1">100</p>
									</div>
									<div id="g-ai12-7" class="g-ai2html-settings g-aiAbs g-aiPointText" style="top:25.4655%;margin-top:-6.8px;right:74.0004%;width:41px;">
										<p class="g-pstyle1">500</p>
									</div>
									<div id="g-ai12-8" class="g-ai2html-settings g-aiAbs g-aiPointText" style="top:27.5756%;margin-top:-11.4px;left:30.4207%;width:83px;">
										<p class="g-pstyle2">100000</p>
									</div>
									<div id="g-ai12-9" class="g-ai2html-settings g-aiAbs g-aiPointText" style="top:28.2876%;margin-top:-4.7px;left:62.5802%;margin-left:-20px;width:40px;">
										<p class="g-pstyle5">2020</p>
									</div>
									<div id="g-ai12-10" class="g-ai2html-settings g-aiAbs g-aiPointText" style="top:29.7686%;margin-top:-9.8px;left:62.6088%;margin-left:-45px;width:90px;">
										<p class="g-pstyle6">274,68 JT</p>
									</div>
									<div id="g-ai12-11" class="g-ai2html-settings g-aiAbs g-aiPointText" style="top:36.989%;margin-top:-6.8px;right:74.0644%;width:39px;">
										<p class="g-pstyle1">100</p>
									</div>
									<div id="g-ai12-12" class="g-ai2html-settings g-aiAbs g-aiPointText" style="top:41.9078%;margin-top:-15.1px;left:49.8399%;margin-left:-42.5px;width:85px;">
										<p class="g-pstyle7">NILAI</p>
									</div>
									<div id="g-ai12-13" class="g-ai2html-settings g-aiAbs g-aiPointText" style="top:47.6928%;margin-top:-11.4px;left:30.4009%;width:83px;">
										<p class="g-pstyle8">100000</p>
									</div>
									<div id="g-ai12-14" class="g-ai2html-settings g-aiAbs g-aiPointText" style="top:50.6509%;margin-top:-4.7px;left:62.6255%;margin-left:-19.5px;width:39px;">
										<p class="g-pstyle5">2019</p>
									</div>
									<div id="g-ai12-15" class="g-ai2html-settings g-aiAbs g-aiPointText" style="top:52.2295%;margin-top:-9.8px;left:62.5925%;margin-left:-60px;width:120px;">
										<p class="g-pstyle6">342.682,83 M</p>
									</div>
									<div id="g-ai12-16" class="g-ai2html-settings g-aiAbs g-aiPointText" style="top:59.2546%;margin-top:-6.8px;left:27.3834%;margin-left:-19.5px;width:39px;">
										<p class="g-pstyle9">100</p>
									</div>
									<div id="g-ai12-17" class="g-ai2html-settings g-aiAbs g-aiPointText" style="top:59.2546%;margin-top:-6.8px;left:72.4577%;margin-left:-20.5px;width:41px;">
										<p class="g-pstyle9">500</p>
									</div>
									<div id="g-ai12-18" class="g-ai2html-settings g-aiAbs g-aiPointText" style="top:62.6342%;margin-top:-11.4px;left:30.4009%;width:83px;">
										<p class="g-pstyle8">100000</p>
									</div>
									<div id="g-ai12-19" class="g-ai2html-settings g-aiAbs g-aiPointText" style="top:65.5923%;margin-top:-4.7px;left:62.6163%;margin-left:-20px;width:40px;">
										<p class="g-pstyle5">2020</p>
									</div>
									<div id="g-ai12-20" class="g-ai2html-settings g-aiAbs g-aiPointText" style="top:67.1709%;margin-top:-9.8px;left:62.6107%;margin-left:-59px;width:118px;">
										<p class="g-pstyle6">238.903,61 M</p>
									</div>
								</div>
							
								<!-- Artboard: large_2 -->
								<div id="g-Lanskap-Baru-Bisnis-Kredit-Konsumer--Kartu-Kredit-vs-Paylater_-1-large_2" class="g-artboard" style="width:920px; height:920px;" data-aspect-ratio="1" data-min-width="920" data-max-width="1399">
							<div style=""></div>
									<img id="g-Lanskap-Baru-Bisnis-Kredit-Konsumer--Kartu-Kredit-vs-Paylater_-1-large_2-img" class="g-aiImg" alt="" src="./images/Lanskap-Baru-Bisnis-Kredit-Konsumer--Kartu-Kredit-vs-Paylater_-1-large_2.png"/>
									<div id="g-ai13-1" class="g-ai2html-settings g-aiAbs g-aiPointText" style="top:7.6858%;margin-top:-18.7px;left:50.2897%;margin-left:-72px;width:144px;">
										<p class="g-pstyle0">VOLUME</p>
									</div>
									<div id="g-ai13-2" class="g-ai2html-settings g-aiAbs g-aiPointText" style="top:10.1109%;margin-top:-8px;right:71.9245%;width:45px;">
										<p class="g-pstyle1">500</p>
									</div>
									<div id="g-ai13-3" class="g-ai2html-settings g-aiAbs g-aiPointText" style="top:13.0456%;margin-top:-14px;left:32.1256%;width:96px;">
										<p class="g-pstyle2">100000</p>
									</div>
									<div id="g-ai13-4" class="g-ai2html-settings g-aiAbs g-aiPointText" style="top:20.225%;margin-top:-6.1px;left:61.4556%;margin-left:-21px;width:42px;">
										<p class="g-pstyle3">2019</p>
									</div>
									<div id="g-ai13-5" class="g-ai2html-settings g-aiAbs g-aiPointText" style="top:22.2978%;margin-top:-12.1px;left:61.4748%;margin-left:-50.5px;width:101px;">
										<p class="g-pstyle4">349,21 JT</p>
									</div>
									<div id="g-ai13-6" class="g-ai2html-settings g-aiAbs g-aiPointText" style="top:25.763%;margin-top:-8px;right:71.9356%;width:43px;">
										<p class="g-pstyle1">100</p>
									</div>
									<div id="g-ai13-7" class="g-ai2html-settings g-aiAbs g-aiPointText" style="top:30.5457%;margin-top:-8px;right:71.9245%;width:45px;">
										<p class="g-pstyle1">500</p>
									</div>
									<div id="g-ai13-8" class="g-ai2html-settings g-aiAbs g-aiPointText" style="top:33.4804%;margin-top:-14px;left:32.1256%;width:96px;">
										<p class="g-pstyle2">100000</p>
									</div>
									<div id="g-ai13-9" class="g-ai2html-settings g-aiAbs g-aiPointText" style="top:34.3554%;margin-top:-6.1px;left:61.4898%;margin-left:-22px;width:44px;">
										<p class="g-pstyle5">2020</p>
									</div>
									<div id="g-ai13-10" class="g-ai2html-settings g-aiAbs g-aiPointText" style="top:36.537%;margin-top:-12.1px;left:61.4691%;margin-left:-52px;width:104px;">
										<p class="g-pstyle6">274,68 JT</p>
									</div>
									<div id="g-ai13-11" class="g-ai2html-settings g-aiAbs g-aiPointText" style="top:46.1978%;margin-top:-8px;right:71.9356%;width:43px;">
										<p class="g-pstyle1">100</p>
									</div>
									<div id="g-ai13-12" class="g-ai2html-settings g-aiAbs g-aiPointText" style="top:52.9337%;margin-top:-19px;left:49.8708%;margin-left:-49.5px;width:99px;">
										<p class="g-pstyle7">NILAI</p>
									</div>
									<div id="g-ai13-13" class="g-ai2html-settings g-aiAbs g-aiPointText" style="top:60.6543%;margin-top:-14px;left:32.1074%;width:96px;">
										<p class="g-pstyle8">100000</p>
									</div>
									<div id="g-ai13-14" class="g-ai2html-settings g-aiAbs g-aiPointText" style="top:64.6815%;margin-top:-6.1px;left:61.4885%;margin-left:-21px;width:42px;">
										<p class="g-pstyle5">2019</p>
									</div>
									<div id="g-ai13-15" class="g-ai2html-settings g-aiAbs g-aiPointText" style="top:66.8631%;margin-top:-12.1px;left:61.5347%;margin-left:-71px;width:142px;">
										<p class="g-pstyle6">342.682,83 M</p>
									</div>
									<div id="g-ai13-16" class="g-ai2html-settings g-aiAbs g-aiPointText" style="top:76.3065%;margin-top:-8px;left:29.3693%;margin-left:-21.5px;width:43px;">
										<p class="g-pstyle9">100</p>
									</div>
									<div id="g-ai13-17" class="g-ai2html-settings g-aiAbs g-aiPointText" style="top:76.3065%;margin-top:-8px;left:70.4954%;margin-left:-22.5px;width:45px;">
										<p class="g-pstyle9">500</p>
									</div>
									<div id="g-ai13-18" class="g-ai2html-settings g-aiAbs g-aiPointText" style="top:80.9804%;margin-top:-14px;left:32.1074%;width:96px;">
										<p class="g-pstyle8">100000</p>
									</div>
									<div id="g-ai13-19" class="g-ai2html-settings g-aiAbs g-aiPointText" style="top:84.8989%;margin-top:-6.1px;left:61.5227%;margin-left:-22px;width:44px;">
										<p class="g-pstyle5">2020</p>
									</div>
									<div id="g-ai13-20" class="g-ai2html-settings g-aiAbs g-aiPointText" style="top:87.0804%;margin-top:-12.1px;left:61.5206%;margin-left:-69.5px;width:139px;">
										<p class="g-pstyle6">238.903,61 M</p>
									</div>
								</div>
							
								<!-- Artboard: xlarge_2 -->
								<div id="g-Lanskap-Baru-Bisnis-Kredit-Konsumer--Kartu-Kredit-vs-Paylater_-1-xlarge_2" class="g-artboard" style="width:1400px; height:787.5px;" data-aspect-ratio="1.778" data-min-width="1400">
							<div style=""></div>
									<img id="g-Lanskap-Baru-Bisnis-Kredit-Konsumer--Kartu-Kredit-vs-Paylater_-1-xlarge_2-img" class="g-aiImg" alt="" src="./images/Lanskap-Baru-Bisnis-Kredit-Konsumer--Kartu-Kredit-vs-Paylater_-1-xlarge_2.png"/>
									<div id="g-ai14-1" class="g-ai2html-settings g-aiAbs g-aiPointText" style="top:18.0771%;margin-top:-22.4px;left:31.6676%;margin-left:-56px;width:112px;">
										<p class="g-pstyle0">NILAI</p>
									</div>
									<div id="g-ai14-2" class="g-ai2html-settings g-aiAbs g-aiPointText" style="top:18.0771%;margin-top:-22.4px;left:70.1191%;margin-left:-84.5px;width:169px;">
										<p class="g-pstyle0">VOLUME</p>
									</div>
									<div id="g-ai14-3" class="g-ai2html-settings g-aiAbs g-aiPointText" style="top:24.6068%;margin-top:-9.8px;right:46.8283%;width:49px;">
										<p class="g-pstyle1">500</p>
									</div>
									<div id="g-ai14-4" class="g-ai2html-settings g-aiAbs g-aiPointText" style="top:28.5301%;margin-top:-16.7px;left:56.3193%;width:110px;">
										<p class="g-pstyle2">100000</p>
									</div>
									<div id="g-ai14-5" class="g-ai2html-settings g-aiAbs g-aiPointText" style="top:28.7841%;margin-top:-16.7px;left:17.93%;width:110px;">
										<p class="g-pstyle3">100000</p>
									</div>
									<div id="g-ai14-6" class="g-ai2html-settings g-aiAbs g-aiPointText" style="top:34.283%;margin-top:-7px;left:40.7148%;margin-left:-23px;width:46px;">
										<p class="g-pstyle4">2019</p>
									</div>
									<div id="g-ai14-7" class="g-ai2html-settings g-aiAbs g-aiPointText" style="top:37.3281%;margin-top:-14px;left:40.7172%;margin-left:-81.5px;width:163px;">
										<p class="g-pstyle5">342.682,83 M</p>
									</div>
									<div id="g-ai14-8" class="g-ai2html-settings g-aiAbs g-aiPointText" style="top:38.3465%;margin-top:-7px;left:79.0645%;margin-left:-23px;width:46px;">
										<p class="g-pstyle6">2019</p>
									</div>
									<div id="g-ai14-9" class="g-ai2html-settings g-aiAbs g-aiPointText" style="top:41.3916%;margin-top:-14px;left:79.0587%;margin-left:-57.5px;width:115px;">
										<p class="g-pstyle7">349,21 JT</p>
									</div>
									<div id="g-ai14-10" class="g-ai2html-settings g-aiAbs g-aiPointText" style="top:46.0672%;margin-top:-9.8px;right:46.8827%;width:46px;">
										<p class="g-pstyle1">100</p>
									</div>
									<div id="g-ai14-11" class="g-ai2html-settings g-aiAbs g-aiPointText" style="top:50.3846%;margin-top:-9.8px;left:47.6758%;margin-left:-24.5px;width:49px;">
										<p class="g-pstyle8">500</p>
									</div>
									<div id="g-ai14-12" class="g-ai2html-settings g-aiAbs g-aiPointText" style="top:50.3846%;margin-top:-9.8px;left:15.7806%;margin-left:-23px;width:46px;">
										<p class="g-pstyle8">100</p>
									</div>
									<div id="g-ai14-13" class="g-ai2html-settings g-aiAbs g-aiPointText" style="top:52.6703%;margin-top:-9.8px;right:46.8283%;width:49px;">
										<p class="g-pstyle1">500</p>
									</div>
									<div id="g-ai14-14" class="g-ai2html-settings g-aiAbs g-aiPointText" style="top:56.7206%;margin-top:-16.7px;left:17.93%;width:110px;">
										<p class="g-pstyle3">100000</p>
									</div>
									<div id="g-ai14-15" class="g-ai2html-settings g-aiAbs g-aiPointText" style="top:56.7206%;margin-top:-16.7px;left:56.3193%;width:110px;">
										<p class="g-pstyle2">100000</p>
									</div>
									<div id="g-ai14-16" class="g-ai2html-settings g-aiAbs g-aiPointText" style="top:57.9021%;margin-top:-7px;left:79.0782%;margin-left:-24px;width:48px;">
										<p class="g-pstyle4">2020</p>
									</div>
									<div id="g-ai14-17" class="g-ai2html-settings g-aiAbs g-aiPointText" style="top:60.8201%;margin-top:-14px;left:79.0707%;margin-left:-59.5px;width:119px;">
										<p class="g-pstyle5">274,68 JT</p>
									</div>
									<div id="g-ai14-18" class="g-ai2html-settings g-aiAbs g-aiPointText" style="top:62.2196%;margin-top:-7px;left:40.7284%;margin-left:-24px;width:48px;">
										<p class="g-pstyle4">2020</p>
									</div>
									<div id="g-ai14-19" class="g-ai2html-settings g-aiAbs g-aiPointText" style="top:65.1376%;margin-top:-14px;left:40.7255%;margin-left:-80px;width:160px;">
										<p class="g-pstyle5">238.903,61 M</p>
									</div>
									<div id="g-ai14-20" class="g-ai2html-settings g-aiAbs g-aiPointText" style="top:74.2576%;margin-top:-9.8px;right:46.8827%;width:46px;">
										<p class="g-pstyle1">100</p>
									</div>
								</div>
				</div>
				
				
			{/if}
			</div>
		</div>

		<div slot="foreground" >
			<section>
			</section>
			<section>
				<p>
					Bank Indonesia (BI) mencatat selama pandemi Covid-19, sirkulasi kartu kredit konsisten terkontraksi.
				</p>
			</section>
			<section>
				<p>
					Dari sisi volume dan nilai transaksi juga mengalami penurunan dari tahun 2019 ke 2020.
				</p>
			</section>
		</div>
	</Scroller>

	<Paragraph
		--font-color ={fontColor}
		para={[
		"Pandemi memang memukul bisnis kartu kredit. BI sebetulnya telah berusaha mengungkit kinerja bisnis kartu kredit melalui pemangkasan suku bunga. Tercatat BI dua kali melakukan hal itu, yakni pada 1 Mei 2020 dengan memangkas batas atas suku bunga dari 2,25% menjadi 2% dan pada 1 Juli 2021 menjadi 1,75%.",
		"Kendatipun, kebijakan BI tersebut rupanya belum mampu mengungkit bisnis kartu kredit secara signifikan. Sepanjang 2021 volume transaksi hanya naik 3% dibandingkan tahun sebelumnya menjadi 281,90 juta kali. Nilai transaksi hanya naik 2% sepanjang 2021 dibandingkan tahun sebelumnya menjadi Rp244.515,98 miliar.",
		"Melempemnya industri kartu kredit inilah yang barangkali menjadi alasan Citibank menghentikan lini bisnis consumer banking pada April tahun lalu, setelah beroperasi lebih kurang 53 tahun sejak 1968.  Kartu kredit adalah jualan utama Citibank di pasar ritel nasabah. Citibank adalah perusahaan pertama yang mengenalkan kartu kredit ke masyarakat Indonesia pada 1989 lalu."
		]}
	/>

	<Timeline
		list={[
			{
				tahun:'1968',
				berita:'Citibank hadir di Indonesia',
				img:'./images/Icon 1.png',
				opacity:0.5
			},
			{
				tahun:'1989',
				berita:'Kartu kredit pertama di Indonesia',
				detail:'Citibank hadir sebagai pionir sebagai perusahaan pertama yang mengenalkan kartu kredit ke pasar ritel nasabah masyarakat Indonesia',
				img:'./images/Icon 2.png',
				opacity:0.5
			},
			{
				tahun:'2019',
				berita:'Bank dengan pengedar kartu kredit terbesar',
				detail:'Reputasi tersebut berdasarkan 1,2 Juta kartu yang diedarkan, menobatkan Citibank sebagai bank dengan distribusi kartu kredit terbesar di Indonesia',
				img:'./images/Icon 3.png',
				opacity:0.5
			},
			{
				tahun:'2021',
				berita:'Menghentikan Lini Bisnis Consumer Banking',
				detail:'Melempemnya industri kartu kredit menjadi alasan Citibank menutup lini bisnis tersebut dan berfokus ke kredit insitutional yang lebih potensial',
				img:'./images/Icon 4.png',
				opacity:0.5
			}
		]}
	/>

	<Paragraph
		--font-color={fontColor}
		para={[
			"Ekonom Institute for Development of Economics and Finance (INDEF), Bhima Yudhistira menilai lambatnya pertumbuhan bisnis kartu kredit terpengaruh penurunan sektor ritel konvensional seperti mal dan restoran yang menjadi pasar utamanya."
		]}
	/>

	<Quote
		quotes={[
			"Penurunan bahkan sebelum pandemi. Dengan adanya pandemi, penurunan semakin dalam"]}
		person='Bhima Yudhistira'
		credential='Ekonom Institute for Development of Economics and Finance (INDEF)'
	/>

	<Paragraph
		--font-color ={fontColor}
		para={[
		"Mengacu kepada survei penjualan eceran BI yang menjadi indikator sektor ritel, penurunan memang sudah terlihat pada Desember 2019. Liburan Natal dan Tahun baru tak mampu mengerek Indeks Penjualan Riil (IPR) bulan tersebut yang tercatat turun 0,5% secara tahunan (<em>year on year</em>/YoY). Kelompok barang perlengkapan rumah tangga, misalnya hanya tumbuh tipis 4,9%.",
		"Pada Desember 2020, IPR tercatat anjlok lebih dalam dengan kontraksi sebesar 19,2% (YoY). Angka ini pun lebih dalam dari bulan sebelumnya yang kontraksi 16,3% (YoY). Penurunan pada akhir tahun lalu paling terpengaruh di kelompok makanan, minuman, dan tembakau sebesar minus 10,3% (YoY) dan sandang minus 59,7% (YoY).",
		"Kontraksi IPR berlanjut pada Januari 2021 yang tercatat minus 16,4% (YoY). Penurunan terdalam pun masih pada kelompok sandang sebesar minus 46,3% (YoY) dan makanan, minuman, dan tembakan yang minus 7% (YoY).",
		"Dalam laporannya, BI menyebut kontraksi yang berlanjut pada awal 2021 lalu lantaran penurunan permintaan konsumen setelah libur Natal dan Tahun Baru. Khususnya terimbas pembatasan pemberlakuan kegiatan masyarakat (PPKM) oleh pemerintah.",
		"Merujuk laporan KPMG pada 2019 bertajuk <a href='https://assets.kpmg/content/dam/kpmg/id/pdf/2017/01/id-retail-payments-in-indonesia.pdf'>Retail Payments in Indonesia: Who Will Drive the Cashles Revolution?</a>, salah satu penyebab lambatnya penetrasi kartu kredit di Indonesia adalah pengetatan regulasi dari BI. Hanya penduduk berpenghasilan di atas Rp 3 juta yang bisa mengajukan kepemilikan kartu kredit.",
		"Kebijakan yang efektif berjalan pada 2015 tersebut bertujuan menjaga tingkat kredit macet atau <em>non performing loan</em> (NPL) stabil. Rasio NPL yang bagus menurut BI adalah di bawah 5%, berujuk Peraturan Bank Indonesia No 6/10/PBI tahun 2004.",
		"Begitu juga lantaran aturan yang mengharuskan penyedia kartu kredit menyerahkan rincian transaksi, termasuk identitas pribadi pengguna ke kantor pajak. Hal ini membuat masyarakat kurang tertarik menggunakan kartu kredit memperhatikan keamanan data pribadi. Aturan ini berlaku efektif pada 2016 lalu."
		]}
	/>

	<Paragraph
		--font-color ={fontColor}
		subjudul='Momentum Paylater'
	/>

	<Scroller
		{top}
		{threshold}
		{bottom}
		bind:count
		bind:index
		bind:offset
		bind:progress
	>
		<div slot="background">
			<div id="g-Lanskap-Baru-Bisnis-Kredit-Konsumer--Kartu-Kredit-vs-Paylater_-1-box" class="ai2html" style='position:relative'>	
			{#if index == 0}
				<div class="page"
					style:opacity={offset <= 0.2 ? offset : offset <= 0.8 ? 1 : 1 - offset}>
						<!-- Halaman 1 -->
						<!-- Artboard: smallplus_3 -->
						<div id="g-Lanskap-Baru-Bisnis-Kredit-Konsumer--Kartu-Kredit-vs-Paylater_-1-smallplus_3" class="g-artboard" style="max-width: 320px;max-height: 700px" data-aspect-ratio="0.457" data-min-width="0" data-max-width="509">
							<div style="padding: 0 0 218.75% 0;"></div>
									<img id="g-Lanskap-Baru-Bisnis-Kredit-Konsumer--Kartu-Kredit-vs-Paylater_-1-smallplus_3-img" class="g-aiImg" alt="" src="./images/Lanskap-Baru-Bisnis-Kredit-Konsumer--Kartu-Kredit-vs-Paylater_-1-smallplus_3.png"/>
									<div id="g-ai15-1" class="g-ai2html-settings g-aiAbs g-aiPointText" style="top:44.6701%;margin-top:-16.7px;left:71.4215%;margin-left:-43px;width:86px;">
										<p class="g-pstyle0">PAYLATER</p>
										<p class="g-pstyle0">33,9</p>
									</div>
									<div id="g-ai15-2" class="g-ai2html-settings g-aiAbs g-aiPointText" style="top:51.6701%;margin-top:-16.7px;left:25.739%;margin-left:-42.5px;width:85px;">
										<p class="g-pstyle1">E-MONEY</p>
										<p class="g-pstyle1">53,7</p>
									</div>
									<div id="g-ai15-3" class="g-ai2html-settings g-aiAbs g-aiPointText" style="top:63.5273%;margin-top:-16.7px;left:69.8936%;margin-left:-23.5px;width:47px;">
										<p class="g-pstyle0">DLL</p>
										<p class="g-pstyle0">12,4</p>
									</div>
								</div>
							
								<!-- Artboard: submedium_3 -->
								<div id="g-Lanskap-Baru-Bisnis-Kredit-Konsumer--Kartu-Kredit-vs-Paylater_-1-submedium_3" class="g-artboard" style="width:510px; height:800px;" data-aspect-ratio="0.638" data-min-width="510" data-max-width="689">
							<div style=""></div>
									<img id="g-Lanskap-Baru-Bisnis-Kredit-Konsumer--Kartu-Kredit-vs-Paylater_-1-submedium_3-img" class="g-aiImg" alt="" src="./images/Lanskap-Baru-Bisnis-Kredit-Konsumer--Kartu-Kredit-vs-Paylater_-1-submedium_3.png"/>
									<div id="g-ai16-1" class="g-ai2html-settings g-aiAbs g-aiPointText" style="top:43.3893%;margin-top:-23.1px;left:69.1182%;margin-left:-56.5px;width:113px;">
										<p class="g-pstyle0">PAYLATER</p>
										<p class="g-pstyle0">33,9</p>
									</div>
									<div id="g-ai16-2" class="g-ai2html-settings g-aiAbs g-aiPointText" style="top:52.1393%;margin-top:-23.1px;left:28.3758%;margin-left:-56px;width:112px;">
										<p class="g-pstyle1">E-MONEY</p>
										<p class="g-pstyle1">53,7</p>
									</div>
									<div id="g-ai16-3" class="g-ai2html-settings g-aiAbs g-aiPointText" style="top:66.8893%;margin-top:-23.1px;left:67.8024%;margin-left:-29px;width:58px;">
										<p class="g-pstyle0">DLL</p>
										<p class="g-pstyle0">12,4</p>
									</div>
								</div>
							
								<!-- Artboard: medium_3 -->
								<div id="g-Lanskap-Baru-Bisnis-Kredit-Konsumer--Kartu-Kredit-vs-Paylater_-1-medium_3" class="g-artboard" style="width:690px; height:1024px;" data-aspect-ratio="0.674" data-min-width="690" data-max-width="919">
							<div style=""></div>
									<img id="g-Lanskap-Baru-Bisnis-Kredit-Konsumer--Kartu-Kredit-vs-Paylater_-1-medium_3-img" class="g-aiImg" alt="" src="./images/Lanskap-Baru-Bisnis-Kredit-Konsumer--Kartu-Kredit-vs-Paylater_-1-medium_3.png"/>
									<div id="g-ai17-1" class="g-ai2html-settings g-aiAbs g-aiPointText" style="top:36.0455%;margin-top:-32.1px;left:69.3809%;margin-left:-73.5px;width:147px;">
										<p class="g-pstyle0">PAYLATER</p>
										<p class="g-pstyle0">33,9</p>
									</div>
									<div id="g-ai17-2" class="g-ai2html-settings g-aiAbs g-aiPointText" style="top:45.2252%;margin-top:-32.1px;left:28.0882%;margin-left:-72.5px;width:145px;">
										<p class="g-pstyle1">E-MONEY</p>
										<p class="g-pstyle1">53,7</p>
									</div>
									<div id="g-ai17-3" class="g-ai2html-settings g-aiAbs g-aiPointText" style="top:61.0455%;margin-top:-32.1px;left:68.0005%;margin-left:-35.5px;width:71px;">
										<p class="g-pstyle0">DLL</p>
										<p class="g-pstyle0">12,4</p>
									</div>
								</div>
							
								<!-- Artboard: large_3 -->
								<div id="g-Lanskap-Baru-Bisnis-Kredit-Konsumer--Kartu-Kredit-vs-Paylater_-1-large_3" class="g-artboard" style="width:920px; height:920px;" data-aspect-ratio="1" data-min-width="920" data-max-width="1399">
							<div style=""></div>
									<img id="g-Lanskap-Baru-Bisnis-Kredit-Konsumer--Kartu-Kredit-vs-Paylater_-1-large_3-img" class="g-aiImg" alt="" src="./images/Lanskap-Baru-Bisnis-Kredit-Konsumer--Kartu-Kredit-vs-Paylater_-1-large_3.png"/>
									<div id="g-ai18-1" class="g-ai2html-settings g-aiAbs g-aiPointText" style="top:31.6353%;margin-top:-27px;left:62.3103%;margin-left:-64px;width:128px;">
										<p class="g-pstyle0">PAYLATER</p>
										<p class="g-pstyle0">33,9</p>
									</div>
									<div id="g-ai18-2" class="g-ai2html-settings g-aiAbs g-aiPointText" style="top:40.3309%;margin-top:-27px;left:36.0951%;margin-left:-63px;width:126px;">
										<p class="g-pstyle1">E-MONEY</p>
										<p class="g-pstyle1">53,7</p>
									</div>
									<div id="g-ai18-3" class="g-ai2html-settings g-aiAbs g-aiPointText" style="top:55.3309%;margin-top:-27px;left:61.4504%;margin-left:-32px;width:64px;">
										<p class="g-pstyle0">DLL</p>
										<p class="g-pstyle0">12,4</p>
									</div>
								</div>
							
								<!-- Artboard: xlarge_3 -->
								<div id="g-Lanskap-Baru-Bisnis-Kredit-Konsumer--Kartu-Kredit-vs-Paylater_-1-xlarge_3" class="g-artboard" style="width:1400px; height:787.5px;" data-aspect-ratio="1.778" data-min-width="1400">
							<div style=""></div>
									<img id="g-Lanskap-Baru-Bisnis-Kredit-Konsumer--Kartu-Kredit-vs-Paylater_-1-xlarge_3-img" class="g-aiImg" alt="" src="./images/Lanskap-Baru-Bisnis-Kredit-Konsumer--Kartu-Kredit-vs-Paylater_-1-xlarge_3.png"/>
									<div id="g-ai19-1" class="g-ai2html-settings g-aiAbs g-aiPointText" style="top:43.4631%;margin-top:-32.3px;left:39.7468%;margin-left:-74px;width:148px;">
										<p class="g-pstyle0">PAYLATER</p>
										<p class="g-pstyle0">33,9</p>
									</div>
									<div id="g-ai19-2" class="g-ai2html-settings g-aiAbs g-aiPointText" style="top:55.6536%;margin-top:-32.3px;left:19.2816%;margin-left:-73px;width:146px;">
										<p class="g-pstyle1">E-MONEY</p>
										<p class="g-pstyle1">53,7</p>
									</div>
									<div id="g-ai19-3" class="g-ai2html-settings g-aiAbs g-aiPointText" style="top:76.352%;margin-top:-32.3px;left:39.0421%;margin-left:-35.5px;width:71px;">
										<p class="g-pstyle0">DLL</p>
										<p class="g-pstyle0">12,4</p>
									</div>
								</div>
						
				</div>
			{:else if index == 1}
				<div class="page"
					style:opacity={offset <= 0.2 ? offset : offset <= 0.8 ? 1 : 1 - offset}>
						<!-- Halaman 2 -->
						<!-- Artboard: smallplus_4 -->
						<div id="g-Lanskap-Baru-Bisnis-Kredit-Konsumer--Kartu-Kredit-vs-Paylater_-1-smallplus_4" class="g-artboard" style="max-width: 320px;max-height: 700px" data-aspect-ratio="0.457" data-min-width="0" data-max-width="509">
							<div style="padding: 0 0 218.75% 0;"></div>
									<img id="g-Lanskap-Baru-Bisnis-Kredit-Konsumer--Kartu-Kredit-vs-Paylater_-1-smallplus_4-img" class="g-aiImg" alt="" src="./images/Lanskap-Baru-Bisnis-Kredit-Konsumer--Kartu-Kredit-vs-Paylater_-1-smallplus_4.png"/>
									<div id="g-ai20-1" class="g-ai2html-settings g-aiAbs g-aiPointText" style="top:35.1493%;margin-top:-6px;left:72.8314%;margin-left:-40.5px;width:81px;">
										<p class="g-pstyle0">GOPAYLATER</p>
									</div>
									<div id="g-ai20-2" class="g-ai2html-settings g-aiAbs g-aiPointText" style="top:40.7207%;margin-top:-6px;left:55.0778%;margin-left:-20px;width:40px;">
										<p class="g-pstyle0">18%</p>
									</div>
									<div id="g-ai20-3" class="g-ai2html-settings g-aiAbs g-aiPointText" style="top:42.1493%;margin-top:-6px;left:32.3421%;margin-left:-20px;width:40px;">
										<p class="g-pstyle1">15%</p>
									</div>
									<div id="g-ai20-4" class="g-ai2html-settings g-aiAbs g-aiPointText" style="top:44.6427%;margin-top:-11.5px;left:4.4267%;margin-left:-31.5px;width:63px;">
										<p class="g-pstyle0">KREDIVO</p>
									</div>
									<div id="g-ai20-5" class="g-ai2html-settings g-aiAbs g-aiPointText" style="top:48.6427%;margin-top:-11.5px;left:46.5341%;margin-left:-34px;width:68px;">
										<p class="g-pstyle1">LAIN-LAIN</p>
										<p class="g-pstyle1">48%</p>
									</div>
									<div id="g-ai20-6" class="g-ai2html-settings g-aiAbs g-aiPointText" style="top:56.8636%;margin-top:-6px;left:45.8534%;margin-left:-20px;width:40px;">
										<p class="g-pstyle1">19%</p>
									</div>
									<div id="g-ai20-7" class="g-ai2html-settings g-aiAbs g-aiPointText" style="top:65.4218%;margin-top:-17px;left:38.4514%;margin-left:-33px;width:66px;">
										<p class="g-pstyle0">SHOPEE</p>
										<p class="g-pstyle0">PAYLATER</p>
									</div>
								</div>
							
								<!-- Artboard: submedium_4 -->
								<div id="g-Lanskap-Baru-Bisnis-Kredit-Konsumer--Kartu-Kredit-vs-Paylater_-1-submedium_4" class="g-artboard" style="width:510px; height:800px;" data-aspect-ratio="0.638" data-min-width="510" data-max-width="689">
							<div style=""></div>
									<img id="g-Lanskap-Baru-Bisnis-Kredit-Konsumer--Kartu-Kredit-vs-Paylater_-1-submedium_4-img" class="g-aiImg" alt="" src="./images/Lanskap-Baru-Bisnis-Kredit-Konsumer--Kartu-Kredit-vs-Paylater_-1-submedium_4.png"/>
									<div id="g-ai21-1" class="g-ai2html-settings g-aiAbs g-aiPointText" style="top:31.7609%;margin-top:-8.1px;left:70.0381%;margin-left:-52px;width:104px;">
										<p class="g-pstyle0">GOPAYLATER</p>
									</div>
									<div id="g-ai21-2" class="g-ai2html-settings g-aiAbs g-aiPointText" style="top:38.6359%;margin-top:-8.1px;left:54.4477%;margin-left:-23.5px;width:47px;">
										<p class="g-pstyle0">18%</p>
									</div>
									<div id="g-ai21-3" class="g-ai2html-settings g-aiAbs g-aiPointText" style="top:40.2609%;margin-top:-8.1px;left:34.4072%;margin-left:-23.5px;width:47px;">
										<p class="g-pstyle1">15%</p>
									</div>
									<div id="g-ai21-4" class="g-ai2html-settings g-aiAbs g-aiPointText" style="top:43.4687%;margin-top:-15.7px;left:9.8685%;margin-left:-40px;width:80px;">
										<p class="g-pstyle0">KREDIVO</p>
									</div>
									<div id="g-ai21-5" class="g-ai2html-settings g-aiAbs g-aiPointText" style="top:48.3437%;margin-top:-15.7px;left:46.982%;margin-left:-43.5px;width:87px;">
										<p class="g-pstyle1">LAIN-LAIN</p>
										<p class="g-pstyle1">48%</p>
									</div>
									<div id="g-ai21-6" class="g-ai2html-settings g-aiAbs g-aiPointText" style="top:58.5109%;margin-top:-8.1px;left:46.3167%;margin-left:-23.5px;width:47px;">
										<p class="g-pstyle1">19%</p>
									</div>
									<div id="g-ai21-7" class="g-ai2html-settings g-aiAbs g-aiPointText" style="top:69.0514%;margin-top:-23.4px;left:39.8389%;margin-left:-42px;width:84px;">
										<p class="g-pstyle0">SHOPEE</p>
										<p class="g-pstyle0">PAYLATER</p>
									</div>
								</div>
							
								<!-- Artboard: medium_4 -->
								<div id="g-Lanskap-Baru-Bisnis-Kredit-Konsumer--Kartu-Kredit-vs-Paylater_-1-medium_4" class="g-artboard" style="width:690px; height:1024px;" data-aspect-ratio="0.674" data-min-width="690" data-max-width="919">
							<div style=""></div>
									<img id="g-Lanskap-Baru-Bisnis-Kredit-Konsumer--Kartu-Kredit-vs-Paylater_-1-medium_4-img" class="g-aiImg" alt="" src="./images/Lanskap-Baru-Bisnis-Kredit-Konsumer--Kartu-Kredit-vs-Paylater_-1-medium_4.png"/>
									<div id="g-ai22-1" class="g-ai2html-settings g-aiAbs g-aiPointText" style="top:34.7688%;margin-top:-12px;left:71.0331%;margin-left:-69.5px;width:139px;">
										<p class="g-pstyle0">GOPAYLATER</p>
									</div>
									<div id="g-ai22-2" class="g-ai2html-settings g-aiAbs g-aiPointText" style="top:42.386%;margin-top:-12px;left:54.6978%;margin-left:-29px;width:58px;">
										<p class="g-pstyle0">18%</p>
									</div>
									<div id="g-ai22-3" class="g-ai2html-settings g-aiAbs g-aiPointText" style="top:44.2415%;margin-top:-12px;left:33.7288%;margin-left:-29px;width:58px;">
										<p class="g-pstyle1">15%</p>
									</div>
									<div id="g-ai22-4" class="g-ai2html-settings g-aiAbs g-aiPointText" style="top:47.8398%;margin-top:-22.9px;left:8.0013%;margin-left:-52px;width:104px;">
										<p class="g-pstyle0">KREDIVO</p>
									</div>
									<div id="g-ai22-5" class="g-ai2html-settings g-aiAbs g-aiPointText" style="top:53.2109%;margin-top:-22.9px;left:46.841%;margin-left:-57px;width:114px;">
										<p class="g-pstyle1">LAIN-LAIN</p>
										<p class="g-pstyle1">48%</p>
									</div>
									<div id="g-ai22-6" class="g-ai2html-settings g-aiAbs g-aiPointText" style="top:64.4563%;margin-top:-12px;left:46.1902%;margin-left:-29px;width:58px;">
										<p class="g-pstyle1">19%</p>
									</div>
									<div id="g-ai22-7" class="g-ai2html-settings g-aiAbs g-aiPointText" style="top:76.0475%;margin-top:-33.7px;left:39.3848%;margin-left:-55px;width:110px;">
										<p class="g-pstyle0">SHOPEE</p>
										<p class="g-pstyle0">PAYLATER</p>
									</div>
								</div>
							
								<!-- Artboard: large_4 -->
								<div id="g-Lanskap-Baru-Bisnis-Kredit-Konsumer--Kartu-Kredit-vs-Paylater_-1-large_4" class="g-artboard" style="width:920px; height:920px;" data-aspect-ratio="1" data-min-width="920" data-max-width="1399">
							<div style=""></div>
									<img id="g-Lanskap-Baru-Bisnis-Kredit-Konsumer--Kartu-Kredit-vs-Paylater_-1-large_4-img" class="g-aiImg" alt="" src="./images/Lanskap-Baru-Bisnis-Kredit-Konsumer--Kartu-Kredit-vs-Paylater_-1-large_4.png"/>
									<div id="g-ai23-1" class="g-ai2html-settings g-aiAbs g-aiPointText" style="top:27.5036%;margin-top:-12px;left:65.7749%;margin-left:-69.5px;width:139px;">
										<p class="g-pstyle0">GOPAYLATER</p>
									</div>
									<div id="g-ai23-2" class="g-ai2html-settings g-aiAbs g-aiPointText" style="top:35.9818%;margin-top:-12px;left:53.5234%;margin-left:-29px;width:58px;">
										<p class="g-pstyle0">18%</p>
									</div>
									<div id="g-ai23-3" class="g-ai2html-settings g-aiAbs g-aiPointText" style="top:38.0471%;margin-top:-12px;left:37.7966%;margin-left:-29px;width:58px;">
										<p class="g-pstyle1">15%</p>
									</div>
									<div id="g-ai23-4" class="g-ai2html-settings g-aiAbs g-aiPointText" style="top:41.9434%;margin-top:-22.9px;left:18.501%;margin-left:-52px;width:104px;">
										<p class="g-pstyle0">KREDIVO</p>
									</div>
									<div id="g-ai23-5" class="g-ai2html-settings g-aiAbs g-aiPointText" style="top:48.0304%;margin-top:-22.9px;left:47.6308%;margin-left:-57px;width:114px;">
										<p class="g-pstyle1">LAIN-LAIN</p>
										<p class="g-pstyle1">48%</p>
									</div>
									<div id="g-ai23-6" class="g-ai2html-settings g-aiAbs g-aiPointText" style="top:60.4384%;margin-top:-12px;left:47.1427%;margin-left:-29px;width:58px;">
										<p class="g-pstyle1">19%</p>
									</div>
									<div id="g-ai23-7" class="g-ai2html-settings g-aiAbs g-aiPointText" style="top:73.3398%;margin-top:-33.7px;left:42.0386%;margin-left:-55px;width:110px;">
										<p class="g-pstyle0">SHOPEE</p>
										<p class="g-pstyle0">PAYLATER</p>
									</div>
								</div>
							
								<!-- Artboard: xlarge_4 -->
								<div id="g-Lanskap-Baru-Bisnis-Kredit-Konsumer--Kartu-Kredit-vs-Paylater_-1-xlarge_4" class="g-artboard" style="width:1400px; height:787.5px;" data-aspect-ratio="1.778" data-min-width="1400">
							<div style=""></div>
									<img id="g-Lanskap-Baru-Bisnis-Kredit-Konsumer--Kartu-Kredit-vs-Paylater_-1-xlarge_4-img" class="g-aiImg" alt="" src="./images/Lanskap-Baru-Bisnis-Kredit-Konsumer--Kartu-Kredit-vs-Paylater_-1-xlarge_4.png"/>
									<div id="g-ai24-1" class="g-ai2html-settings g-aiAbs g-aiPointText" style="top:23.7502%;margin-top:-12px;left:60.3664%;margin-left:-69.5px;width:139px;">
										<p class="g-pstyle0">GOPAYLATER</p>
									</div>
									<div id="g-ai24-2" class="g-ai2html-settings g-aiAbs g-aiPointText" style="top:33.528%;margin-top:-12px;left:52.3154%;margin-left:-29px;width:58px;">
										<p class="g-pstyle0">18%</p>
									</div>
									<div id="g-ai24-3" class="g-ai2html-settings g-aiAbs g-aiPointText" style="top:36.0677%;margin-top:-12px;left:41.9806%;margin-left:-29px;width:58px;">
										<p class="g-pstyle1">15%</p>
									</div>
									<div id="g-ai24-4" class="g-ai2html-settings g-aiAbs g-aiPointText" style="top:40.6196%;margin-top:-22.9px;left:29.3006%;margin-left:-52px;width:104px;">
										<p class="g-pstyle0">KREDIVO</p>
									</div>
									<div id="g-ai24-5" class="g-ai2html-settings g-aiAbs g-aiPointText" style="top:47.6037%;margin-top:-22.9px;left:48.4431%;margin-left:-57px;width:114px;">
										<p class="g-pstyle1">LAIN-LAIN</p>
										<p class="g-pstyle1">48%</p>
									</div>
									<div id="g-ai24-6" class="g-ai2html-settings g-aiAbs g-aiPointText" style="top:62.2264%;margin-top:-12px;left:48.1223%;margin-left:-29px;width:58px;">
										<p class="g-pstyle1">19%</p>
									</div>
									<div id="g-ai24-7" class="g-ai2html-settings g-aiAbs g-aiPointText" style="top:77.2985%;margin-top:-33.7px;left:44.7682%;margin-left:-55px;width:110px;">
										<p class="g-pstyle0">SHOPEE</p>
										<p class="g-pstyle0">PAYLATER</p>
									</div>
								</div>
								</div>
				
				
			{/if}
			</div>
		</div>

		<div slot="foreground" >
			<section>
			</section>
			<section>
				<p>
					Saat bisnis kartu kredit meredup...
				</p>
			</section>
			<section>
				<p>
					...<em>paylater</em> malah tumbuh pesat. (Fintech Report 2021 oleh DSInnovate)
				</p>
			</section>
		</div>
	</Scroller>

	<Paragraph
		--font-color ={fontColor}
		para={[
		"Kami mencoba mendapatkan angka pasti dari pengguna paylater dengan menghubungi Vice President Marketing & Communication Kredivo, Indina Andamari pada 30 Maret 2022 lalu. Pilihan kepada Kredivo, lantaran platform ini telah berdiri sejak 2016 dan salah satu yang paling awal menyediakan layanan paylater. Kredivo tercatat bernaung di bawah PT FinAccel Finance Indonesia."
		]}
	/>

	<Quote 
		quotes={[
			"jumlah pengguna aktif Kredivo saat ini mencapai 5 juta orang. Angka tersebut pun tumbuh dua kali lipat dalam 10 bulan. Rata-rata pengguna bertransaksi 25 kali menggunakan Kredivo setiap tahunnya.",
			"Pengguna paylater khususnya Kredivo didominasi oleh mereka yang berusia 20 - 35 tahun, <em>first-jobber</em> dan mayoritas berdomisili di Jabodetabek,"]}
		person='Indina Andamari'
		credential='VP Marketing & Communication Kredivo'
	/>

	<Paragraph
		--font-color ={fontColor}
		para={[
		"Pertumbuhan pesat bisnis <em>paylater</em> tersebut, setidaknya karena empat hal:"
		]}
	/>
	
	<List 
			list={[
				"Kemudahan memperoleh akses kredit",
				"Menjadi alternatif kartu kredit",
				"Aman",
				"dan terkoneksi dengan platform belanja digital."
				]}
	/>

	<Paragraph
		--font-color ={fontColor}
		subjudul='Persepsi Salah Satu Pengguna'
	/>

	<Scroller
		{top}
		{threshold}
		{bottom}
		bind:count
		bind:index
		bind:offset
		bind:progress
	>
		<div slot="background">
			<div id="g-Lanskap-Baru-Bisnis-Kredit-Konsumer--Kartu-Kredit-vs-Paylater_-1-box" class="ai2html" style='position:relative'>	
			{#if index == 0}
				<div class="page"
					style:opacity={offset <= 0.2 ? offset : offset <= 0.8 ? 1 : 1 - offset}>
						<!-- Halaman 1 -->
						<!-- Artboard: smallplus_5 -->
						<div id="g-Lanskap-Baru-Bisnis-Kredit-Konsumer--Kartu-Kredit-vs-Paylater_-1-smallplus_5" class="g-artboard" style="max-width: 320px;max-height: 700px" data-aspect-ratio="0.457" data-min-width="0" data-max-width="509">
							<div style="padding: 0 0 218.75% 0;"></div>
									<img id="g-Lanskap-Baru-Bisnis-Kredit-Konsumer--Kartu-Kredit-vs-Paylater_-1-smallplus_5-img" class="g-aiImg" alt="" src="./images/Lanskap-Baru-Bisnis-Kredit-Konsumer--Kartu-Kredit-vs-Paylater_-1-smallplus_5.png"/>
									<div id="g-ai25-1" class="g-ai2html-settings g-aiAbs g-aiPointText" style="top:68.5609%;margin-top:-24.9px;left:50.0696%;margin-left:-91.5px;width:183px;">
										<p class="g-pstyle0">BAGAS, 26</p>
										<p class="g-pstyle1">SHOPEE PAYLATER</p>
									</div>
								</div>
							
								<!-- Artboard: submedium_5 -->
								<div id="g-Lanskap-Baru-Bisnis-Kredit-Konsumer--Kartu-Kredit-vs-Paylater_-1-submedium_5" class="g-artboard" style="width:510px; height:800px;" data-aspect-ratio="0.638" data-min-width="510" data-max-width="689">
							<div style=""></div>
									<img id="g-Lanskap-Baru-Bisnis-Kredit-Konsumer--Kartu-Kredit-vs-Paylater_-1-submedium_5-img" class="g-aiImg" alt="" src="./images/Lanskap-Baru-Bisnis-Kredit-Konsumer--Kartu-Kredit-vs-Paylater_-1-submedium_5.png"/>
									<div id="g-ai26-1" class="g-ai2html-settings g-aiAbs g-aiPointText" style="top:70.9315%;margin-top:-32.5px;left:49.9746%;margin-left:-114px;width:228px;">
										<p class="g-pstyle0">BAGAS, 26</p>
										<p class="g-pstyle1">SHOPEE PAYLATER</p>
									</div>
								</div>
							
								<!-- Artboard: medium_5 -->
								<div id="g-Lanskap-Baru-Bisnis-Kredit-Konsumer--Kartu-Kredit-vs-Paylater_-1-medium_5" class="g-artboard" style="width:690px; height:1024px;" data-aspect-ratio="0.674" data-min-width="690" data-max-width="919">
							<div style=""></div>
									<img id="g-Lanskap-Baru-Bisnis-Kredit-Konsumer--Kartu-Kredit-vs-Paylater_-1-medium_5-img" class="g-aiImg" alt="" src="./images/Lanskap-Baru-Bisnis-Kredit-Konsumer--Kartu-Kredit-vs-Paylater_-1-medium_5.png"/>
									<div id="g-ai27-1" class="g-ai2html-settings g-aiAbs g-aiPointText" style="top:72.2353%;margin-top:-44.7px;left:49.9672%;margin-left:-151.5px;width:303px;">
										<p class="g-pstyle0">BAGAS, 26</p>
										<p class="g-pstyle1">SHOPEE PAYLATER</p>
									</div>
								</div>
							
								<!-- Artboard: large_5 -->
								<div id="g-Lanskap-Baru-Bisnis-Kredit-Konsumer--Kartu-Kredit-vs-Paylater_-1-large_5" class="g-artboard" style="width:920px; height:920px;" data-aspect-ratio="1" data-min-width="920" data-max-width="1399">
							<div style=""></div>
									<img id="g-Lanskap-Baru-Bisnis-Kredit-Konsumer--Kartu-Kredit-vs-Paylater_-1-large_5-img" class="g-aiImg" alt="" src="./images/Lanskap-Baru-Bisnis-Kredit-Konsumer--Kartu-Kredit-vs-Paylater_-1-large_5.png"/>
									<div id="g-ai28-1" class="g-ai2html-settings g-aiAbs g-aiPointText" style="top:74.7489%;margin-top:-44.7px;left:49.9754%;margin-left:-151.5px;width:303px;">
										<p class="g-pstyle0">BAGAS, 26</p>
										<p class="g-pstyle1">SHOPEE PAYLATER</p>
									</div>
								</div>
							
								<!-- Artboard: xlarge_5 -->
								<div id="g-Lanskap-Baru-Bisnis-Kredit-Konsumer--Kartu-Kredit-vs-Paylater_-1-xlarge_5" class="g-artboard" style="width:1400px; height:787.5px;" data-aspect-ratio="1.778" data-min-width="1400">
							<div style=""></div>
									<img id="g-Lanskap-Baru-Bisnis-Kredit-Konsumer--Kartu-Kredit-vs-Paylater_-1-xlarge_5-img" class="g-aiImg" alt="" src="./images/Lanskap-Baru-Bisnis-Kredit-Konsumer--Kartu-Kredit-vs-Paylater_-1-xlarge_5.png"/>
									<div id="g-ai29-1" class="g-ai2html-settings g-aiAbs g-aiPointText" style="top:78.9447%;margin-top:-44.7px;left:49.9838%;margin-left:-151.5px;width:303px;">
										<p class="g-pstyle0">BAGAS, 26</p>
										<p class="g-pstyle1">SHOPEE PAYLATER</p>
									</div>
								</div>
						
				</div>
			{:else if index == 1}
				<div class="page"
					style:opacity={offset <= 0.2 ? offset : offset <= 0.8 ? 1 : 1 - offset}>
						<!-- Halaman 2 -->
						<!-- Artboard: smallplus_5_copy -->
						<div id="g-Lanskap-Baru-Bisnis-Kredit-Konsumer--Kartu-Kredit-vs-Paylater_-1-smallplus_5_copy" class="g-artboard" style="max-width: 320px;max-height: 700px" data-aspect-ratio="0.457" data-min-width="0" data-max-width="509">
							<div style="padding: 0 0 218.75% 0;"></div>
									<img id="g-Lanskap-Baru-Bisnis-Kredit-Konsumer--Kartu-Kredit-vs-Paylater_-1-smallplus_5_copy-img" class="g-aiImg" alt="" src="./images/Lanskap-Baru-Bisnis-Kredit-Konsumer--Kartu-Kredit-vs-Paylater_-1-smallplus_5_copy.png"/>
									<div id="g-ai30-1" class="g-ai2html-settings g-aiAbs g-aiPointText" style="top:55.6985%;margin-top:-13.9px;left:29.9585%;width:203px;">
										<p class="g-pstyle0">Dapat memenuhi kebutuhan</p>
										<p class="g-pstyle0">ketika tidak memiliki dana cukup</p>
									</div>
									<div id="g-ai30-2" class="g-ai2html-settings g-aiAbs g-aiPointText" style="top:55.8823%;margin-top:-12.2px;right:74.1907%;width:61px;">
										<p class="g-pstyle1">69%</p>
									</div>
									<div id="g-ai30-3" class="g-ai2html-settings g-aiAbs g-aiPointText" style="top:60.5557%;margin-top:-13.9px;left:29.9585%;width:188px;">
										<p class="g-pstyle2">Alternatif pilihan pembayaran</p>
										<p class="g-pstyle2">cicilan selain kartu kredit</p>
									</div>
									<div id="g-ai30-4" class="g-ai2html-settings g-aiAbs g-aiPointText" style="top:60.8823%;margin-top:-12.2px;right:74.1907%;width:61px;">
										<p class="g-pstyle3">67%</p>
									</div>
									<div id="g-ai30-5" class="g-ai2html-settings g-aiAbs g-aiPointText" style="top:65.5557%;margin-top:-13.9px;left:29.9585%;width:172px;">
										<p class="g-pstyle4">Memberi kemudahan akses</p>
										<p class="g-pstyle4">untuk kredit cepat</p>
									</div>
									<div id="g-ai30-6" class="g-ai2html-settings g-aiAbs g-aiPointText" style="top:65.7394%;margin-top:-12.2px;right:74.1907%;width:61px;">
										<p class="g-pstyle5">58%</p>
									</div>
									<div id="g-ai30-7" class="g-ai2html-settings g-aiAbs g-aiPointText" style="top:70.4128%;margin-top:-13.9px;left:29.9585%;width:175px;">
										<p class="g-pstyle6">Aman karena sudah dijamin</p>
										<p class="g-pstyle6">oleh OJK</p>
									</div>
									<div id="g-ai30-8" class="g-ai2html-settings g-aiAbs g-aiPointText" style="top:70.5965%;margin-top:-12.2px;right:74.1907%;width:61px;">
										<p class="g-pstyle7">53%</p>
									</div>
									<div id="g-ai30-9" class="g-ai2html-settings g-aiAbs g-aiPointText" style="top:75.4128%;margin-top:-13.9px;left:29.9585%;width:160px;">
										<p class="g-pstyle6">Pembayaran cicilan yang</p>
										<p class="g-pstyle6">flexibel</p>
									</div>
									<div id="g-ai30-10" class="g-ai2html-settings g-aiAbs g-aiPointText" style="top:75.4537%;margin-top:-12.2px;right:74.1907%;width:61px;">
										<p class="g-pstyle7">52%</p>
									</div>
									<div id="g-ai30-11" class="g-ai2html-settings g-aiAbs g-aiPointText" style="top:80.4537%;margin-top:-12.2px;right:74.1907%;width:61px;">
										<p class="g-pstyle8">45%</p>
									</div>
									<div id="g-ai30-12" class="g-ai2html-settings g-aiAbs g-aiPointText" style="top:80.3134%;margin-top:-7.2px;left:29.9585%;width:102px;">
										<p class="g-pstyle9">Bunga Rendah</p>
									</div>
									<div id="g-ai30-13" class="g-ai2html-settings g-aiAbs g-aiPointText" style="top:85.2699%;margin-top:-13.9px;left:29.9585%;width:137px;">
										<p class="g-pstyle10">Banyak digunakan di</p>
										<p class="g-pstyle10">e-commerce</p>
									</div>
									<div id="g-ai30-14" class="g-ai2html-settings g-aiAbs g-aiPointText" style="top:85.3108%;margin-top:-12.2px;right:74.1907%;width:61px;">
										<p class="g-pstyle11">44%</p>
									</div>
								</div>
							
								<!-- Artboard: submedium_5_copy -->
								<div id="g-Lanskap-Baru-Bisnis-Kredit-Konsumer--Kartu-Kredit-vs-Paylater_-1-submedium_5_copy" class="g-artboard" style="width:510px; height:800px;" data-aspect-ratio="0.638" data-min-width="510" data-max-width="689">
							<div style=""></div>
									<img id="g-Lanskap-Baru-Bisnis-Kredit-Konsumer--Kartu-Kredit-vs-Paylater_-1-submedium_5_copy-img" class="g-aiImg" alt="" src="./images/Lanskap-Baru-Bisnis-Kredit-Konsumer--Kartu-Kredit-vs-Paylater_-1-submedium_5_copy.png"/>
									<div id="g-ai31-1" class="g-ai2html-settings g-aiAbs g-aiPointText" style="top:55.3241%;margin-top:-19.6px;left:32.3487%;width:275px;">
										<p class="g-pstyle0">Dapat memenuhi kebutuhan</p>
										<p class="g-pstyle0">ketika tidak memiliki dana cukup</p>
									</div>
									<div id="g-ai31-2" class="g-ai2html-settings g-aiAbs g-aiPointText" style="top:55.5979%;margin-top:-16.8px;right:71.2552%;width:77px;">
										<p class="g-pstyle1">69%</p>
									</div>
									<div id="g-ai31-3" class="g-ai2html-settings g-aiAbs g-aiPointText" style="top:61.4491%;margin-top:-19.6px;left:32.3487%;width:255px;">
										<p class="g-pstyle2">Alternatif pilihan pembayaran</p>
										<p class="g-pstyle2">cicilan selain kartu kredit</p>
									</div>
									<div id="g-ai31-4" class="g-ai2html-settings g-aiAbs g-aiPointText" style="top:61.7229%;margin-top:-16.8px;right:71.2552%;width:77px;">
										<p class="g-pstyle3">67%</p>
									</div>
									<div id="g-ai31-5" class="g-ai2html-settings g-aiAbs g-aiPointText" style="top:67.4491%;margin-top:-19.6px;left:32.3487%;width:232px;">
										<p class="g-pstyle4">Memberi kemudahan akses</p>
										<p class="g-pstyle4">untuk kredit cepat</p>
									</div>
									<div id="g-ai31-6" class="g-ai2html-settings g-aiAbs g-aiPointText" style="top:67.7229%;margin-top:-16.8px;right:71.2552%;width:77px;">
										<p class="g-pstyle5">58%</p>
									</div>
									<div id="g-ai31-7" class="g-ai2html-settings g-aiAbs g-aiPointText" style="top:73.4491%;margin-top:-19.6px;left:32.3487%;width:236px;">
										<p class="g-pstyle6">Aman karena sudah dijamin</p>
										<p class="g-pstyle6">oleh OJK</p>
									</div>
									<div id="g-ai31-8" class="g-ai2html-settings g-aiAbs g-aiPointText" style="top:73.7229%;margin-top:-16.8px;right:71.2552%;width:77px;">
										<p class="g-pstyle7">53%</p>
									</div>
									<div id="g-ai31-9" class="g-ai2html-settings g-aiAbs g-aiPointText" style="top:79.5741%;margin-top:-19.6px;left:32.3487%;width:215px;">
										<p class="g-pstyle6">Pembayaran cicilan yang</p>
										<p class="g-pstyle6">flexibel</p>
									</div>
									<div id="g-ai31-10" class="g-ai2html-settings g-aiAbs g-aiPointText" style="top:79.7229%;margin-top:-16.8px;right:71.2552%;width:77px;">
										<p class="g-pstyle7">52%</p>
									</div>
									<div id="g-ai31-11" class="g-ai2html-settings g-aiAbs g-aiPointText" style="top:85.7229%;margin-top:-16.8px;right:71.2552%;width:77px;">
										<p class="g-pstyle8">45%</p>
									</div>
									<div id="g-ai31-12" class="g-ai2html-settings g-aiAbs g-aiPointText" style="top:85.6492%;margin-top:-10.2px;left:32.3487%;width:134px;">
										<p class="g-pstyle9">Bunga Rendah</p>
									</div>
									<div id="g-ai31-13" class="g-ai2html-settings g-aiAbs g-aiPointText" style="top:91.6991%;margin-top:-19.6px;left:32.3487%;width:183px;">
										<p class="g-pstyle10">Banyak digunakan di</p>
										<p class="g-pstyle10">e-commerce</p>
									</div>
									<div id="g-ai31-14" class="g-ai2html-settings g-aiAbs g-aiPointText" style="top:91.7229%;margin-top:-16.8px;right:71.2552%;width:77px;">
										<p class="g-pstyle11">44%</p>
									</div>
								</div>
							
								<!-- Artboard: medium_5_copy -->
								<div id="g-Lanskap-Baru-Bisnis-Kredit-Konsumer--Kartu-Kredit-vs-Paylater_-1-medium_5_copy" class="g-artboard" style="width:690px; height:1024px;" data-aspect-ratio="0.674" data-min-width="690" data-max-width="919">
							<div style=""></div>
									<img id="g-Lanskap-Baru-Bisnis-Kredit-Konsumer--Kartu-Kredit-vs-Paylater_-1-medium_5_copy-img" class="g-aiImg" alt="" src="./images/Lanskap-Baru-Bisnis-Kredit-Konsumer--Kartu-Kredit-vs-Paylater_-1-medium_5_copy.png"/>
									<div id="g-ai32-1" class="g-ai2html-settings g-aiAbs g-aiPointText" style="top:62.2649%;margin-top:-19.6px;left:36.9535%;width:275px;">
										<p class="g-pstyle0">Dapat memenuhi kebutuhan</p>
										<p class="g-pstyle0">ketika tidak memiliki dana cukup</p>
									</div>
									<div id="g-ai32-2" class="g-ai2html-settings g-aiAbs g-aiPointText" style="top:62.4788%;margin-top:-16.8px;right:65.7103%;width:77px;">
										<p class="g-pstyle1">69%</p>
									</div>
									<div id="g-ai32-3" class="g-ai2html-settings g-aiAbs g-aiPointText" style="top:66.9524%;margin-top:-19.6px;left:36.9535%;width:255px;">
										<p class="g-pstyle2">Alternatif pilihan pembayaran</p>
										<p class="g-pstyle2">cicilan selain kartu kredit</p>
									</div>
									<div id="g-ai32-4" class="g-ai2html-settings g-aiAbs g-aiPointText" style="top:67.1663%;margin-top:-16.8px;right:65.7103%;width:77px;">
										<p class="g-pstyle3">67%</p>
									</div>
									<div id="g-ai32-5" class="g-ai2html-settings g-aiAbs g-aiPointText" style="top:71.6399%;margin-top:-19.6px;left:36.9535%;width:232px;">
										<p class="g-pstyle4">Memberi kemudahan akses</p>
										<p class="g-pstyle4">untuk kredit cepat</p>
									</div>
									<div id="g-ai32-6" class="g-ai2html-settings g-aiAbs g-aiPointText" style="top:71.8538%;margin-top:-16.8px;right:65.7103%;width:77px;">
										<p class="g-pstyle5">58%</p>
									</div>
									<div id="g-ai32-7" class="g-ai2html-settings g-aiAbs g-aiPointText" style="top:76.4251%;margin-top:-19.6px;left:36.9535%;width:236px;">
										<p class="g-pstyle6">Aman karena sudah dijamin</p>
										<p class="g-pstyle6">oleh OJK</p>
									</div>
									<div id="g-ai32-8" class="g-ai2html-settings g-aiAbs g-aiPointText" style="top:76.5413%;margin-top:-16.8px;right:65.7103%;width:77px;">
										<p class="g-pstyle7">53%</p>
									</div>
									<div id="g-ai32-9" class="g-ai2html-settings g-aiAbs g-aiPointText" style="top:81.1126%;margin-top:-19.6px;left:36.9535%;width:215px;">
										<p class="g-pstyle6">Pembayaran cicilan yang</p>
										<p class="g-pstyle6">flexibel</p>
									</div>
									<div id="g-ai32-10" class="g-ai2html-settings g-aiAbs g-aiPointText" style="top:81.2288%;margin-top:-16.8px;right:65.7103%;width:77px;">
										<p class="g-pstyle7">52%</p>
									</div>
									<div id="g-ai32-11" class="g-ai2html-settings g-aiAbs g-aiPointText" style="top:85.9163%;margin-top:-16.8px;right:65.7103%;width:77px;">
										<p class="g-pstyle8">45%</p>
									</div>
									<div id="g-ai32-12" class="g-ai2html-settings g-aiAbs g-aiPointText" style="top:85.9564%;margin-top:-10.2px;left:36.9535%;width:134px;">
										<p class="g-pstyle9">Bunga Rendah</p>
									</div>
									<div id="g-ai32-13" class="g-ai2html-settings g-aiAbs g-aiPointText" style="top:90.5852%;margin-top:-19.6px;left:36.9535%;width:183px;">
										<p class="g-pstyle10">Banyak digunakan di</p>
										<p class="g-pstyle10">e-commerce</p>
									</div>
									<div id="g-ai32-14" class="g-ai2html-settings g-aiAbs g-aiPointText" style="top:90.6038%;margin-top:-16.8px;right:65.7103%;width:77px;">
										<p class="g-pstyle11">44%</p>
									</div>
								</div>
							
								<!-- Artboard: large_5_copy -->
								<div id="g-Lanskap-Baru-Bisnis-Kredit-Konsumer--Kartu-Kredit-vs-Paylater_-1-large_5_copy" class="g-artboard" style="width:920px; height:920px;" data-aspect-ratio="1" data-min-width="920" data-max-width="1399">
							<div style=""></div>
									<img id="g-Lanskap-Baru-Bisnis-Kredit-Konsumer--Kartu-Kredit-vs-Paylater_-1-large_5_copy-img" class="g-aiImg" alt="" src="./images/Lanskap-Baru-Bisnis-Kredit-Konsumer--Kartu-Kredit-vs-Paylater_-1-large_5_copy.png"/>
									<div id="g-ai33-1" class="g-ai2html-settings g-aiAbs g-aiPointText" style="top:59.3036%;margin-top:-19.6px;left:40.2151%;width:275px;">
										<p class="g-pstyle0">Dapat memenuhi kebutuhan</p>
										<p class="g-pstyle0">ketika tidak memiliki dana cukup</p>
									</div>
									<div id="g-ai33-2" class="g-ai2html-settings g-aiAbs g-aiPointText" style="top:59.6503%;margin-top:-16.8px;right:61.7828%;width:77px;">
										<p class="g-pstyle1">69%</p>
									</div>
									<div id="g-ai33-3" class="g-ai2html-settings g-aiAbs g-aiPointText" style="top:64.6296%;margin-top:-19.6px;left:40.2151%;width:255px;">
										<p class="g-pstyle2">Alternatif pilihan pembayaran</p>
										<p class="g-pstyle2">cicilan selain kartu kredit</p>
									</div>
									<div id="g-ai33-4" class="g-ai2html-settings g-aiAbs g-aiPointText" style="top:64.8677%;margin-top:-16.8px;right:61.7828%;width:77px;">
										<p class="g-pstyle3">67%</p>
									</div>
									<div id="g-ai33-5" class="g-ai2html-settings g-aiAbs g-aiPointText" style="top:69.847%;margin-top:-19.6px;left:40.2151%;width:232px;">
										<p class="g-pstyle4">Memberi kemudahan akses</p>
										<p class="g-pstyle4">untuk kredit cepat</p>
									</div>
									<div id="g-ai33-6" class="g-ai2html-settings g-aiAbs g-aiPointText" style="top:70.0851%;margin-top:-16.8px;right:61.7828%;width:77px;">
										<p class="g-pstyle5">58%</p>
									</div>
									<div id="g-ai33-7" class="g-ai2html-settings g-aiAbs g-aiPointText" style="top:75.1731%;margin-top:-19.6px;left:40.2151%;width:236px;">
										<p class="g-pstyle6">Aman karena sudah dijamin</p>
										<p class="g-pstyle6">oleh OJK</p>
									</div>
									<div id="g-ai33-8" class="g-ai2html-settings g-aiAbs g-aiPointText" style="top:75.3025%;margin-top:-16.8px;right:61.7828%;width:77px;">
										<p class="g-pstyle7">53%</p>
									</div>
									<div id="g-ai33-9" class="g-ai2html-settings g-aiAbs g-aiPointText" style="top:80.3905%;margin-top:-19.6px;left:40.2151%;width:215px;">
										<p class="g-pstyle6">Pembayaran cicilan yang</p>
										<p class="g-pstyle6">flexibel</p>
									</div>
									<div id="g-ai33-10" class="g-ai2html-settings g-aiAbs g-aiPointText" style="top:80.5199%;margin-top:-16.8px;right:61.7828%;width:77px;">
										<p class="g-pstyle7">52%</p>
									</div>
									<div id="g-ai33-11" class="g-ai2html-settings g-aiAbs g-aiPointText" style="top:85.7373%;margin-top:-16.8px;right:61.7828%;width:77px;">
										<p class="g-pstyle8">45%</p>
									</div>
									<div id="g-ai33-12" class="g-ai2html-settings g-aiAbs g-aiPointText" style="top:85.6732%;margin-top:-10.2px;left:40.2151%;width:134px;">
										<p class="g-pstyle9">Bunga Rendah</p>
									</div>
									<div id="g-ai33-13" class="g-ai2html-settings g-aiAbs g-aiPointText" style="top:90.934%;margin-top:-19.6px;left:40.2151%;width:183px;">
										<p class="g-pstyle10">Banyak digunakan di</p>
										<p class="g-pstyle10">e-commerce</p>
									</div>
									<div id="g-ai33-14" class="g-ai2html-settings g-aiAbs g-aiPointText" style="top:90.9547%;margin-top:-16.8px;right:61.7828%;width:77px;">
										<p class="g-pstyle11">44%</p>
									</div>
								</div>
							
								<!-- Artboard: xlarge_5_copy -->
								<div id="g-Lanskap-Baru-Bisnis-Kredit-Konsumer--Kartu-Kredit-vs-Paylater_-1-xlarge_5_copy" class="g-artboard" style="width:1400px; height:787.5px;" data-aspect-ratio="1.778" data-min-width="1400">
							<div style=""></div>
									<img id="g-Lanskap-Baru-Bisnis-Kredit-Konsumer--Kartu-Kredit-vs-Paylater_-1-xlarge_5_copy-img" class="g-aiImg" alt="" src="./images/Lanskap-Baru-Bisnis-Kredit-Konsumer--Kartu-Kredit-vs-Paylater_-1-xlarge_5_copy.png"/>
									<div id="g-ai34-1" class="g-ai2html-settings g-aiAbs g-aiPointText" style="top:18.9725%;margin-top:-33.4px;left:59.5847%;width:448px;">
										<p class="g-pstyle0">Dapat memenuhi kebutuhan</p>
										<p class="g-pstyle0">ketika tidak memiliki dana cukup</p>
									</div>
									<div id="g-ai34-2" class="g-ai2html-settings g-aiAbs g-aiPointText" style="top:19.4927%;margin-top:-28.5px;right:42.6531%;width:114px;">
										<p class="g-pstyle1">69%</p>
									</div>
									<div id="g-ai34-3" class="g-ai2html-settings g-aiAbs g-aiPointText" style="top:29.3852%;margin-top:-33.4px;left:59.5847%;width:414px;">
										<p class="g-pstyle2">Alternatif pilihan pembayaran</p>
										<p class="g-pstyle2">cicilan selain kartu kredit</p>
									</div>
									<div id="g-ai34-4" class="g-ai2html-settings g-aiAbs g-aiPointText" style="top:29.7784%;margin-top:-28.5px;right:42.6531%;width:114px;">
										<p class="g-pstyle3">67%</p>
									</div>
									<div id="g-ai34-5" class="g-ai2html-settings g-aiAbs g-aiPointText" style="top:39.6709%;margin-top:-33.4px;left:59.5847%;width:375px;">
										<p class="g-pstyle4">Memberi kemudahan akses</p>
										<p class="g-pstyle4">untuk kredit cepat</p>
									</div>
									<div id="g-ai34-6" class="g-ai2html-settings g-aiAbs g-aiPointText" style="top:40.0641%;margin-top:-28.5px;right:42.6531%;width:114px;">
										<p class="g-pstyle5">58%</p>
									</div>
									<div id="g-ai34-7" class="g-ai2html-settings g-aiAbs g-aiPointText" style="top:49.9567%;margin-top:-33.4px;left:59.5847%;width:382px;">
										<p class="g-pstyle6">Aman karena sudah dijamin</p>
										<p class="g-pstyle6">oleh OJK</p>
									</div>
									<div id="g-ai34-8" class="g-ai2html-settings g-aiAbs g-aiPointText" style="top:50.3498%;margin-top:-28.5px;right:42.6531%;width:114px;">
										<p class="g-pstyle7">53%</p>
									</div>
									<div id="g-ai34-9" class="g-ai2html-settings g-aiAbs g-aiPointText" style="top:60.3694%;margin-top:-33.4px;left:59.5847%;width:347px;">
										<p class="g-pstyle6">Pembayaran cicilan yang</p>
										<p class="g-pstyle6">flexibel</p>
									</div>
									<div id="g-ai34-10" class="g-ai2html-settings g-aiAbs g-aiPointText" style="top:60.6355%;margin-top:-28.5px;right:42.6531%;width:114px;">
										<p class="g-pstyle7">52%</p>
									</div>
									<div id="g-ai34-11" class="g-ai2html-settings g-aiAbs g-aiPointText" style="top:70.9213%;margin-top:-28.5px;right:42.6531%;width:114px;">
										<p class="g-pstyle8">45%</p>
									</div>
									<div id="g-ai34-12" class="g-ai2html-settings g-aiAbs g-aiPointText" style="top:70.8078%;margin-top:-17.6px;left:59.5847%;width:210px;">
										<p class="g-pstyle9">Bunga Rendah</p>
									</div>
									<div id="g-ai34-13" class="g-ai2html-settings g-aiAbs g-aiPointText" style="top:80.9408%;margin-top:-33.4px;left:59.5847%;width:293px;">
										<p class="g-pstyle10">Banyak digunakan di</p>
										<p class="g-pstyle10">e-commerce</p>
									</div>
									<div id="g-ai34-14" class="g-ai2html-settings g-aiAbs g-aiPointText" style="top:81.08%;margin-top:-28.5px;right:42.6531%;width:114px;">
										<p class="g-pstyle11">44%</p>
									</div>
								</div>

				</div>
				
				
			{/if}
			</div>
		</div>

		<div slot="foreground" >
			<section>
			</section>
			<section>
				<p>
					Bagas (26), seorang penulis copy di Jakarta merasa mendapatkan banyak kemudahan dengan menggunakan paylater. Bagas sudah sejak Desember 2019 rutin menggunakan Shopee Paylater.
				</p>
			</section>
			<section>
				<p>
					Persepsi pengguna <em>paylater</em> sebagaimana tercatat dalam 2021 Indonesian e-Commerce Consumer Behavior Report Katadata Insight Center (KIC) dan Kredivo.
				</p>
			</section>
		</div>
	</Scroller>

	<Paragraph
		--font-color ={fontColor}
		para={[
		"Berdasarkan Indonesia Paylater Ecosystem Report 2021 dari DSInnovate, <em>paylater</em> berada di bawah Peraturan Otoritas Jasa Keuangan Nomor 29/POJK.05/2014 tentang Penyelenggaraan Usaha Perusahaan Pembiayaan. Hal ini lantaran platform <em>paylater</em> berinduk kepada perusahaan pembiayaan, misalnya Shopee Paylater yang di bawah <a href='https://commerce-finance.com/faq'>PT Commerce Finance</a>.",
		"Aturan ini pula membedakan <em>paylater</em> dengan pinjaman online atau P2P <em>lending</em> yang operasionalnya di bawah Peraturan OJK Nomor 77/POJK.01/2016 tentang Layanan Pinjam Meminjam Uang Berbasis Teknologi Informasi.",
		"Laporan tersebut juga mencatat rentang suku bunga 11 platform ternama di negeri ini yakni dari 0% sampai 4%. Kemudian, 10 dari 11 platform itu  bekerja sama dengan e-Commerce. Kredivo adalah yang terbanyak. Platform ini bekerja sama dengan 8 dari 10 e-Commerce ternama di negeri ini seperti e-commerce ternama di Indonesia, yakni: Tokopedia, Bukalapak, Lazada, Blibli, JD.ID, Zalora, Sociolla dan Bhinneka.",
		"<em>paylater</em> juga tercatat terkoneksi dengan platform <em>ride hailing</em> dan <em>online travel agent</em> (OTA), seperti Gopaylater dengan Gojek dan TravelokaPaylater dengan Traveloka."
		]}
	/>

	<Paragraph
		--font-color ={fontColor}
		subjudul='Lanskap Baru Bisnis Kredit Konsumer'
		para={[
		"Sayangnya, institusi pemerintah belum mencatat berapa besarnya putaran uang dari bisnis paylater. Namun, mengutip Indonesia Paylater Ecosystem Report 2021,dari  proyeksi nilai pasar atau <em>gross merchandise value</em> (GMV) <em>e-commerce</em> yang bakal menyentuh US$ 8,5 miliar pada 2028, akan mendorong nilai pasar <em>paylater</em> 76,7% per tahunnya.",
		"Analisis Google, Temasek, Bain & Company dalam laporan e-Conomy Sea 2021 pun menyebut 30% gerai digital di Asia Tenggara akan mengadopsi <em>paylater</em> dalam waktu dekat, khususnya di Indonesia. Laporan tersebut pun mencatat tren pencarian konsumen terkait <em>paylater</em> meningkat 16 kali di Indonesia.",
		"“Kompetisi di sektor ini memanas, dengan pemain BNPL (Buy Now Pay Later) murni, platform ritel digital, bank, bahkan OTA (agen travel online) berebut di kue yang sama,” tulis laporan tersebut.",
		"Ketua Asosiasi Perusahaan Pembiayaan Indonesia (APPI), Suwandi Wiratno menilai peluang besar bisnis paylater, lantaran akan menjadi medium generasi nasabah selanjutnya. "
		]}
	/>

	<Quote 
		quotes={[
			"Sekarang siapa sih yang menjadi peminjam masa depan? Ya, generasi milenial. Generasi milenial itu tidak lepas dari <em>handphone</em> (31 Maret 2022)"
			]}
		person='Suwandi Wiratno'
		credential='Ketua Asosiasi Perusahaan Pembiayaan Indonesia (APPI)'
	/>

	<Scroller
		{top}
		{threshold}
		{bottom}
		bind:count
		bind:index
		bind:offset
		bind:progress
	>
		<div slot="background">
			<div id="g-Lanskap-Baru-Bisnis-Kredit-Konsumer--Kartu-Kredit-vs-Paylater_-1-box" class="ai2html" style='position:relative'>	
			{#if index == 0}
				<div class="page"
					style:opacity={offset <= 0.2 ? offset : offset <= 0.8 ? 1 : 1 - offset}>
						<!-- Halaman 1 -->
						<!-- Artboard: smallplus_5_copy_2 -->
					<div id="g-Lanskap-Baru-Bisnis-Kredit-Konsumer--Kartu-Kredit-vs-Paylater_-1-smallplus_5_copy_2" class="g-artboard" style="max-width: 320px;max-height: 700px" data-aspect-ratio="0.457" data-min-width="0" data-max-width="509">
				<div style="padding: 0 0 218.75% 0;"></div>
						<img id="g-Lanskap-Baru-Bisnis-Kredit-Konsumer--Kartu-Kredit-vs-Paylater_-1-smallplus_5_copy_2-img" class="g-aiImg" alt="" src="./images/Lanskap-Baru-Bisnis-Kredit-Konsumer--Kartu-Kredit-vs-Paylater_-1-smallplus_5_copy_2.png"/>
						<div id="g-ai35-1" class="g-ai2html-settings g-aiAbs g-aiPointText" style="top:11.4537%;margin-top:-12.2px;left:49.9304%;margin-left:-47.5px;width:95px;">
							<p class="g-pstyle0">Milenial</p>
						</div>
						<div id="g-ai35-2" class="g-ai2html-settings g-aiAbs g-aiPointText" style="top:26.0251%;margin-top:-12.2px;left:50.0081%;margin-left:-37.5px;width:75px;">
							<p class="g-pstyle0">16,5%</p>
						</div>
						<div id="g-ai35-3" class="g-ai2html-settings g-aiAbs g-aiPointText" style="top:28.4563%;margin-top:-7.2px;left:49.9368%;margin-left:-75px;width:150px;">
							<p class="g-pstyle1">Menggunakan Paylater</p>
						</div>
						<div id="g-ai35-4" class="g-ai2html-settings g-aiAbs g-aiPointText" style="top:34.0251%;margin-top:-12.2px;left:49.9683%;margin-left:-33px;width:66px;">
							<p class="g-pstyle2">9,3%</p>
						</div>
						<div id="g-ai35-5" class="g-ai2html-settings g-aiAbs g-aiPointText" style="top:36.4563%;margin-top:-7.2px;left:50.022%;margin-left:-85.5px;width:171px;">
							<p class="g-pstyle3">Menggunakan Kartu Kredit</p>
						</div>
						<div id="g-ai35-6" class="g-ai2html-settings g-aiAbs g-aiPointText" style="top:54.5965%;margin-top:-12.2px;left:49.9347%;margin-left:-36px;width:72px;">
							<p class="g-pstyle4">Gen Z</p>
						</div>
						<div id="g-ai35-7" class="g-ai2html-settings g-aiAbs g-aiPointText" style="top:69.0251%;margin-top:-12.2px;left:49.9838%;margin-left:-32.5px;width:65px;">
							<p class="g-pstyle4">9,7%</p>
						</div>
						<div id="g-ai35-8" class="g-ai2html-settings g-aiAbs g-aiPointText" style="top:71.4563%;margin-top:-7.2px;left:49.9368%;margin-left:-75px;width:150px;">
							<p class="g-pstyle5">Menggunakan Paylater</p>
						</div>
						<div id="g-ai35-9" class="g-ai2html-settings g-aiAbs g-aiPointText" style="top:77.0251%;margin-top:-12.2px;left:50.0386%;margin-left:-33.5px;width:67px;">
							<p class="g-pstyle6">2,9%</p>
						</div>
						<div id="g-ai35-10" class="g-ai2html-settings g-aiAbs g-aiPointText" style="top:79.4563%;margin-top:-7.2px;left:50.022%;margin-left:-85.5px;width:171px;">
							<p class="g-pstyle7">Menggunakan Kartu Kredit</p>
						</div>
					</div>
				
					<!-- Artboard: submedium_5_copy_2 -->
					<div id="g-Lanskap-Baru-Bisnis-Kredit-Konsumer--Kartu-Kredit-vs-Paylater_-1-submedium_5_copy_2" class="g-artboard" style="width:510px; height:800px;" data-aspect-ratio="0.638" data-min-width="510" data-max-width="689">
				<div style=""></div>
						<img id="g-Lanskap-Baru-Bisnis-Kredit-Konsumer--Kartu-Kredit-vs-Paylater_-1-submedium_5_copy_2-img" class="g-aiImg" alt="" src="./images/Lanskap-Baru-Bisnis-Kredit-Konsumer--Kartu-Kredit-vs-Paylater_-1-submedium_5_copy_2.png"/>
						<div id="g-ai36-1" class="g-ai2html-settings g-aiAbs g-aiPointText" style="top:10.4708%;margin-top:-15.8px;left:50.0245%;margin-left:-59px;width:118px;">
							<p class="g-pstyle0">Milenial</p>
						</div>
						<div id="g-ai36-2" class="g-ai2html-settings g-aiAbs g-aiPointText" style="top:27.0958%;margin-top:-15.8px;left:49.997%;margin-left:-45.5px;width:91px;">
							<p class="g-pstyle0">16,5%</p>
						</div>
						<div id="g-ai36-3" class="g-ai2html-settings g-aiAbs g-aiPointText" style="top:29.7593%;margin-top:-9.1px;left:49.9607%;margin-left:-94.5px;width:189px;">
							<p class="g-pstyle1">Menggunakan Paylater</p>
						</div>
						<div id="g-ai36-4" class="g-ai2html-settings g-aiAbs g-aiPointText" style="top:36.0958%;margin-top:-15.8px;left:50.0364%;margin-left:-40px;width:80px;">
							<p class="g-pstyle2">9,3%</p>
						</div>
						<div id="g-ai36-5" class="g-ai2html-settings g-aiAbs g-aiPointText" style="top:38.8843%;margin-top:-9.1px;left:49.9932%;margin-left:-108px;width:216px;">
							<p class="g-pstyle3">Menggunakan Kartu Kredit</p>
						</div>
						<div id="g-ai36-6" class="g-ai2html-settings g-aiAbs g-aiPointText" style="top:59.5958%;margin-top:-15.8px;left:50.0265%;margin-left:-44px;width:88px;">
							<p class="g-pstyle4">Gen Z</p>
						</div>
						<div id="g-ai36-7" class="g-ai2html-settings g-aiAbs g-aiPointText" style="top:76.0958%;margin-top:-15.8px;left:49.9809%;margin-left:-39px;width:78px;">
							<p class="g-pstyle4">9,7%</p>
						</div>
						<div id="g-ai36-8" class="g-ai2html-settings g-aiAbs g-aiPointText" style="top:78.8843%;margin-top:-9.1px;left:49.9607%;margin-left:-94.5px;width:189px;">
							<p class="g-pstyle5">Menggunakan Paylater</p>
						</div>
						<div id="g-ai36-9" class="g-ai2html-settings g-aiAbs g-aiPointText" style="top:85.2208%;margin-top:-15.8px;left:49.9661%;margin-left:-40px;width:80px;">
							<p class="g-pstyle6">2,9%</p>
						</div>
						<div id="g-ai36-10" class="g-ai2html-settings g-aiAbs g-aiPointText" style="top:88.0093%;margin-top:-9.1px;left:49.9932%;margin-left:-108px;width:216px;">
							<p class="g-pstyle7">Menggunakan Kartu Kredit</p>
						</div>
					</div>
				
					<!-- Artboard: medium_5_copy_2 -->
					<div id="g-Lanskap-Baru-Bisnis-Kredit-Konsumer--Kartu-Kredit-vs-Paylater_-1-medium_5_copy_2" class="g-artboard" style="width:690px; height:1024px;" data-aspect-ratio="0.674" data-min-width="690" data-max-width="919">
				<div style=""></div>
						<img id="g-Lanskap-Baru-Bisnis-Kredit-Konsumer--Kartu-Kredit-vs-Paylater_-1-medium_5_copy_2-img" class="g-aiImg" alt="" src="./images/Lanskap-Baru-Bisnis-Kredit-Konsumer--Kartu-Kredit-vs-Paylater_-1-medium_5_copy_2.png"/>
						<div id="g-ai37-1" class="g-ai2html-settings g-aiAbs g-aiPointText" style="top:8.4795%;margin-top:-19.8px;left:49.9653%;margin-left:-71.5px;width:143px;">
							<p class="g-pstyle0">Milenial</p>
						</div>
						<div id="g-ai37-2" class="g-ai2html-settings g-aiAbs g-aiPointText" style="top:24.9835%;margin-top:-19.8px;left:50.0306%;margin-left:-55px;width:110px;">
							<p class="g-pstyle0">16,5%</p>
						</div>
						<div id="g-ai37-3" class="g-ai2html-settings g-aiAbs g-aiPointText" style="top:27.7583%;margin-top:-12.2px;left:49.9722%;margin-left:-117px;width:234px;">
							<p class="g-pstyle1">Menggunakan Paylater</p>
						</div>
						<div id="g-ai37-4" class="g-ai2html-settings g-aiAbs g-aiPointText" style="top:33.9678%;margin-top:-19.8px;left:49.9919%;margin-left:-47.5px;width:95px;">
							<p class="g-pstyle2">9,3%</p>
						</div>
						<div id="g-ai37-5" class="g-ai2html-settings g-aiAbs g-aiPointText" style="top:36.7426%;margin-top:-12.2px;left:49.9842%;margin-left:-134px;width:268px;">
							<p class="g-pstyle3">Menggunakan Kartu Kredit</p>
						</div>
						<div id="g-ai37-6" class="g-ai2html-settings g-aiAbs g-aiPointText" style="top:57.21%;margin-top:-19.8px;left:49.9716%;margin-left:-52.5px;width:105px;">
							<p class="g-pstyle4">Gen Z</p>
						</div>
						<div id="g-ai37-7" class="g-ai2html-settings g-aiAbs g-aiPointText" style="top:73.6163%;margin-top:-19.8px;left:49.9788%;margin-left:-46.5px;width:93px;">
							<p class="g-pstyle4">9,7%</p>
						</div>
						<div id="g-ai37-8" class="g-ai2html-settings g-aiAbs g-aiPointText" style="top:76.3911%;margin-top:-12.2px;left:49.9722%;margin-left:-117px;width:234px;">
							<p class="g-pstyle5">Menggunakan Paylater</p>
						</div>
						<div id="g-ai37-9" class="g-ai2html-settings g-aiAbs g-aiPointText" style="top:82.6006%;margin-top:-19.8px;left:49.9984%;margin-left:-48px;width:96px;">
							<p class="g-pstyle6">2,9%</p>
						</div>
						<div id="g-ai37-10" class="g-ai2html-settings g-aiAbs g-aiPointText" style="top:85.3755%;margin-top:-12.2px;left:49.9842%;margin-left:-134px;width:268px;">
							<p class="g-pstyle7">Menggunakan Kartu Kredit</p>
						</div>
					</div>
				
					<!-- Artboard: large_5_copy_2 -->
					<div id="g-Lanskap-Baru-Bisnis-Kredit-Konsumer--Kartu-Kredit-vs-Paylater_-1-large_5_copy_2" class="g-artboard" style="width:920px; height:920px;" data-aspect-ratio="1" data-min-width="920" data-max-width="1399">
				<div style=""></div>
						<img id="g-Lanskap-Baru-Bisnis-Kredit-Konsumer--Kartu-Kredit-vs-Paylater_-1-large_5_copy_2-img" class="g-aiImg" alt="" src="./images/Lanskap-Baru-Bisnis-Kredit-Konsumer--Kartu-Kredit-vs-Paylater_-1-large_5_copy_2.png"/>
						<div id="g-ai38-1" class="g-ai2html-settings g-aiAbs g-aiPointText" style="top:13.3121%;margin-top:-21.5px;left:25.1808%;margin-left:-76px;width:152px;">
							<p class="g-pstyle0">Milenial</p>
						</div>
						<div id="g-ai38-2" class="g-ai2html-settings g-aiAbs g-aiPointText" style="top:32.9861%;margin-top:-21.5px;left:25.1917%;margin-left:-58px;width:116px;">
							<p class="g-pstyle0">16,5%</p>
						</div>
						<div id="g-ai38-3" class="g-ai2html-settings g-aiAbs g-aiPointText" style="top:36.1891%;margin-top:-12.9px;left:25.1772%;margin-left:-124.5px;width:249px;">
							<p class="g-pstyle1">Menggunakan Paylater</p>
						</div>
						<div id="g-ai38-4" class="g-ai2html-settings g-aiAbs g-aiPointText" style="top:40.9208%;margin-top:-21.5px;left:74.832%;margin-left:-55.5px;width:111px;">
							<p class="g-pstyle2">Gen Z</p>
						</div>
						<div id="g-ai38-5" class="g-ai2html-settings g-aiAbs g-aiPointText" style="top:43.6382%;margin-top:-21.5px;left:25.1616%;margin-left:-50px;width:100px;">
							<p class="g-pstyle3">9,3%</p>
						</div>
						<div id="g-ai38-6" class="g-ai2html-settings g-aiAbs g-aiPointText" style="top:46.9499%;margin-top:-12.9px;left:25.1702%;margin-left:-142.5px;width:285px;">
							<p class="g-pstyle4">Menggunakan Kartu Kredit</p>
						</div>
						<div id="g-ai38-7" class="g-ai2html-settings g-aiAbs g-aiPointText" style="top:60.4861%;margin-top:-21.5px;left:74.8275%;margin-left:-49px;width:98px;">
							<p class="g-pstyle2">9,7%</p>
						</div>
						<div id="g-ai38-8" class="g-ai2html-settings g-aiAbs g-aiPointText" style="top:63.6891%;margin-top:-12.9px;left:74.8462%;margin-left:-124.5px;width:249px;">
							<p class="g-pstyle5">Menggunakan Paylater</p>
						</div>
						<div id="g-ai38-9" class="g-ai2html-settings g-aiAbs g-aiPointText" style="top:71.1382%;margin-top:-21.5px;left:74.8322%;margin-left:-50.5px;width:101px;">
							<p class="g-pstyle6">2,9%</p>
						</div>
						<div id="g-ai38-10" class="g-ai2html-settings g-aiAbs g-aiPointText" style="top:74.4499%;margin-top:-12.9px;left:74.8392%;margin-left:-142.5px;width:285px;">
							<p class="g-pstyle7">Menggunakan Kartu Kredit</p>
						</div>
					</div>
				
					<!-- Artboard: xlarge_5_copy_2 -->
					<div id="g-Lanskap-Baru-Bisnis-Kredit-Konsumer--Kartu-Kredit-vs-Paylater_-1-xlarge_5_copy_2" class="g-artboard" style="width:1400px; height:787.5px;" data-aspect-ratio="1.778" data-min-width="1400">
				<div style=""></div>
						<img id="g-Lanskap-Baru-Bisnis-Kredit-Konsumer--Kartu-Kredit-vs-Paylater_-1-xlarge_5_copy_2-img" class="g-aiImg" alt="" src="./images/Lanskap-Baru-Bisnis-Kredit-Konsumer--Kartu-Kredit-vs-Paylater_-1-xlarge_5_copy_2.png"/>
						<div id="g-ai39-1" class="g-ai2html-settings g-aiAbs g-aiPointText" style="top:17.6226%;margin-top:-25.8px;left:27.0025%;margin-left:-89.5px;width:179px;">
							<p class="g-pstyle0">Milenial</p>
						</div>
						<div id="g-ai39-2" class="g-ai2html-settings g-aiAbs g-aiPointText" style="top:17.6226%;margin-top:-25.8px;left:72.9938%;margin-left:-65px;width:130px;">
							<p class="g-pstyle1">Gen Z</p>
						</div>
						<div id="g-ai39-3" class="g-ai2html-settings g-aiAbs g-aiPointText" style="top:45.3051%;margin-top:-25.8px;left:72.9814%;margin-left:-57px;width:114px;">
							<p class="g-pstyle1">9,7%</p>
						</div>
						<div id="g-ai39-4" class="g-ai2html-settings g-aiAbs g-aiPointText" style="top:45.3051%;margin-top:-25.8px;left:26.9978%;margin-left:-67.5px;width:135px;">
							<p class="g-pstyle0">16,5%</p>
						</div>
						<div id="g-ai39-5" class="g-ai2html-settings g-aiAbs g-aiPointText" style="top:49.8738%;margin-top:-15.8px;left:72.997%;margin-left:-148.5px;width:297px;">
							<p class="g-pstyle2">Menggunakan Paylater</p>
						</div>
						<div id="g-ai39-6" class="g-ai2html-settings g-aiAbs g-aiPointText" style="top:50.0008%;margin-top:-15.8px;left:27.0158%;margin-left:-148.5px;width:297px;">
							<p class="g-pstyle3">Menggunakan Paylater</p>
						</div>
						<div id="g-ai39-7" class="g-ai2html-settings g-aiAbs g-aiPointText" style="top:60.4162%;margin-top:-25.8px;left:72.9982%;margin-left:-59px;width:118px;">
							<p class="g-pstyle4">2,9%</p>
						</div>
						<div id="g-ai39-8" class="g-ai2html-settings g-aiAbs g-aiPointText" style="top:60.5432%;margin-top:-25.8px;left:27.0234%;margin-left:-58.5px;width:117px;">
							<p class="g-pstyle5">9,3%</p>
						</div>
						<div id="g-ai39-9" class="g-ai2html-settings g-aiAbs g-aiPointText" style="top:65.1119%;margin-top:-15.8px;left:73.0048%;margin-left:-170.5px;width:341px;">
							<p class="g-pstyle6">Menggunakan Kartu Kredit</p>
						</div>
						<div id="g-ai39-10" class="g-ai2html-settings g-aiAbs g-aiPointText" style="top:65.1119%;margin-top:-15.8px;left:27.0236%;margin-left:-170.5px;width:341px;">
							<p class="g-pstyle7">Menggunakan Kartu Kredit</p>
						</div>
					</div>
						
				</div>
			{/if}
			</div>
		</div>

		<div slot="foreground" >
			<section>
			</section>
			<section>
				<p>
					Hasil survei Katadata Insight Center (KIC) dan Zigi periode Januari 2022 menemukan milenial (26-35 tahun) dan Generasi Z (18-25 tahun) meminati paylater.
				</p>
				<p>
					Sebanyak 16,5% dari 2.862 responden milenial mengaku menggunakan paylater. Sementara, 9,7% dari 1.692 responden Generasi Z menggunakan paylater. 
				</p>
			</section>
		</div>
	</Scroller>

	<Paragraph
		--font-color ={fontColor}
		para={[
		"<em>Paylater</em> pun kini tak hanya menggarap pasar digital, tapi juga pasar ritel konvensional yang jadi pasar utama kartu kredit. Potensi bisnisnya pun menjadi lebih besar. Kredivo adalah salah satu yang melakukannya.",
		"VP Marketing & Communication Kredivo Indina Andamari menyatakan, Kredivo saat ini bekerja sama dengan ratusan gerai ritel konvensional ternama, seperti IKEA, McDonalds, Electronic City, Erafone, Matahari, Alfamart/Alfamidi, Hartono, iBox, Zara, Bershka, dan lain-lain. Ia menyebut kerja sama ini sebagai model bisnis <em>open-loop</em>.",
		"“Hal ini tentunya menjadi poin penting untuk pertumbuhan industri BNPL karena <em>paylater</em> bisa digunakan di mana saja, tak terbatas dengan online merchant, juga tidak hanya terbatas pada kategori produk bernilai tinggi tapi juga kebutuhan sehari-hari seperti makanan dan <em>groceries</em>,” kata Indina.",
		"Meski demikian, Indina berpendapat <em>paylater</em> tak akan menggantikan kartu kredit. Sebaliknya, kedua sistem pembayaran tersebut justru bisa saling melengkapi.",
		"“Karena segmennya yang berbeda, kartu kredit dan <em>paylater</em> akan saling melengkapi. Namun, dengan keunggulan <em>user experience</em> yang lebih mudah dan cepat, kami optimistis paylater akan menjawab kebutuhan konsumen dan tumbuh semakin cepat dari waktu ke waktu,” kata Indina. ",
		"Perbedaan segmentasi pasar kartu kredit dan <em>paylater</em> paling menonjol pada demografi penggunanya. Pengguna kartu kredit adalah masyarakat kelas menengah atas dan berpenghasilan stabil, mengingat syarat ketat mempunyai kartu kredit harus berpenghasilan di atas Rp 3 juta. ",
		"Penggunaan kartu kredit juga lebih banyak untuk transaksi mahal, seperti halnya untuk pariwisata. Direktur Consumer Banking PT CIMB Niaga TBK, Lani Darmawan menyatakan, bisnis kartu kredit tersuruk selama pandemi lantaran transaksi pariwisata yang tergolong “<em>ticket size besar</em>” tak ada selama pandemi, seperti dilansir <a href='https://finansial.bisnis.com/read/20200623/90/1256651/terdampak-pandemi-bagaimana-prospek-bisnis-kartu-kredit>Bisnis Indonesia</a>. ",
		"Sementara, pengguna <em>paylater</em> adalah masyarakat kelas ekonomi menengah bawah, sebagaimana tercermin dari pengguna Kredivo. Indina menyatakan, pengguna Kredivo dominan berusia 20-35 tahun, baru bekerja, berdomisili di Jabodetabek, dan <em>underbanked</em>. Ia menyatakan, 60% dari total pengguna mendapatkan akses kredit pertama dari Kredivo. ",
		"Kerja sama dengan perbankan untuk saling melengkapi sudah dilakukan Kredivo. Indina menyatakan, saat ini platform tempatnya bekerja telah bergandengan dengan Standard Chartered Bank Indonesia, Bank DBS Indonesia, dan PermataBank untuk penyaluran kredit dan memperluas layanan lembaga-lembaga perbankan tersebut. ",
		"Wujud kredit digital yang terbentuk dari kerja sama tersebut, misalnya nasabah Bank DBS Indonesia kini bisa mengajukan kredit melalui aplikasi DBS dan mendapat persetujuan beserta limit hanya dalam 60 detik. Kredit digital DBS ini pun bisa digunakan bertransaksi di <em>e-commerce</em> dan <em>e-wallet</em> dengan tingkat suku bunga kredit bank. Nasabah pun tetap mendapat kartu <a href='https://newssetup.kontan.co.id/news/dianggap-menjanjikan-perbankan-ramai-ramai-merilis-kartu-kredit-digital?page=all'>kredit fisik</a>.",
		"“Selain itu, dengan menggunakan Flexi Card, kartu fisik hasil kerjasama antara Kredivo dan Bank Sahabat Sampoerna, pengguna dapat berbelanja di jutaan <em>merchant offline</em> di seluruh Indonesia yang memiliki mesin EDC dengan jaringan GPN menggunakan limit Kredivo,” kata Indina.",
		"Kerja sama lain dalam catatan kami dilakukan Traveloka Paylater dengan BNI meluncurkan Virtual Card Number (VCN). Layanan baru ini memberi plafon kredit dari Rp 5 juta-Rp 50 juta yang bisa digunakan nasabah bertransaksi di e-Commerce dengan jangka cicilan hingga 12 bulan dan berbunga rendah.",
		"Indodana, platform paylater di bawah PT Artha Dana Teknologi, juga bekerja sama dengan Bank Jago–bank digital jelmaan Bank Artos milik bankir kawakan Jerry NG. Kerja sama keduanya dalam bentuk kesepakatan fasilitas pendanaan dengan skema pinjaman (channeling).  ",
		"Direktur Indodana, Jerry Anson, dalam keterangan resminya yang kami terima pada 7 Maret 2022 lalu, menyebut kerja sama itu bisa meningkatkan pertumbuhan bisnis Indonana Paylater yang kini sedang digandrungi publik. Ia pun mengapresiasi kepercayaan Bank Jago memberi <em>channeling</em> kepada platformnya, yang diklaimnya membangun solusi finansial digital dengan memanfaatkan teknologi <em>big data</em>.",
		"Aplikasi tekfin penyedia <em>paylater</em> dan perbankan memang saling membutuhkan satu sama lain. Tekfin <em>paylater</em> membutuhkan <em>channeling</em> dari perbankan, mengingat sebagai perusahaan berlisensi multifinance mereka harus punya setoran modal untuk memberikan pinjaman hingga menerbitkan obligasi. ",
		"Perbankan bisa menyediakan hal itu bagi tekfin <em>paylater</em>. Konsepnya biasanya melalui pendanaan lini kredit seperti yang diterima Kredivo dari Victory Park Capital Advisors, LLC, Standard Chartered Bank Indonesia dan juga Bank DBS Indonesia pada 2021.",
		"Dari sisi perbankan, kerja sama dengan tekfin <em>paylater</em> berguna untuk memperluas pasarnya. Khususnya kepada para konsumen e-Commerce dan generasi peminjam baru: milenial dan Gen Z. ",
		"Bagi konsumen, kerja sama tekfin <em>paylater</em> dan perbankan bisa memberi lebih banyak pilihan dan semakin memudahkan ketika berbelanja. Suku bunga yang ditawarkan pun bisa lebih murah, karena para penyelenggara tersebut bakal bersaing menjadi yang termurah demi menggaet pengguna lebih banyak."
		]}
	/>

	<Quote 
		quotes={[
			"Transaksi jadi lebih murah, kan. Kita belanja punya pilihan yang lebih murah"
			]}
		person='Piter Abdullah'
		credential='Ekonom CORE Indonesia'
	/>

	<Paragraph
		--font-color ={fontColor}
		para={[
		"Ke depan, kata Piter, ragam pilihan kredit konsumer pun bisa mempercepat perputaran ekonomi. Dengan begitu, bisa kian mengungkit perekonomian nasional. Khususnya dalam masa pemulihan pasca pandemi.",
		"Namun, Piter mewanti potensi risiko kredit macet yang tinggi lantaran mudahnya penilaian saat aktivasi. Terlebih pasar <em>paylater</em> saat ini adalah kalangan muda yang belum bisa dikatakan sepenuhnya mapan secara keuangan. ",
		"“<em>Credit scoring</em>-nya harus lebih cermat. Jangan lebih mendahulukan pertumbuhan pengguna. Harus lebih selektif,” kata Piter. "
		]}
	/>

	<Credit
		--fontfamily1={fontfamily1}
		--font-color = {fontColor}
		{ credit }
	/>
</main>

<style>
	.divider {
		height:0.2rem;
		width:60%;
		background-color:hsl(76, 69%, 41%);
		margin:2rem auto;
		border-radius: 0.1rem;
	}

	[slot="background"] {
		/* background-color: rgba(255,62,0,0.05); */
		height: 100vh;
		/* border-top: 2px solid #ff3e00;
		border-bottom: 2px solid #ff3e00; */
		font-size: 1.4em;
		overflow: hidden;
	}

	[slot="foreground"] section {
		height: 80vh;
		color: hsl(212, 18%, 19%);
		padding: 1em;
		margin: 0 0 2em 0;
		border-radius: 1rem;
	}

	[slot="foreground"] p {
		padding:1rem;
		background-color:hsl(62, 52%, 87%);
		width:90%;
        max-width: 650px;
        margin: 0 auto 0 auto !important;
        text-align: left;
		font-family: 'Roboto-Mono', monospace;
		white-space: normal;
	}
	/* main {
		text-align: center;
		padding: 1em;
		max-width: 240px;
		margin: 0 auto;
	} */

	/* h1 {
		color: #ff3e00;
		text-transform: uppercase;
		font-size: 4em;
		font-weight: 100;
	} */

	/* @media (min-width: 640px) {
		main {
			max-width: none;
		}
	} */

	/* --------------------------------------------------------------------------------------------------------------------------------------- */
	/* Custom Scrollytelling Style */
	/* --------------------------------------------------------------------------------------------------------------------------------------- */
	#g-Lanskap-Baru-Bisnis-Kredit-Konsumer--Kartu-Kredit-vs-Paylater_-1-box ,
	#g-Lanskap-Baru-Bisnis-Kredit-Konsumer--Kartu-Kredit-vs-Paylater_-1-box .g-artboard {
		margin:0 auto;
	}
	#g-Lanskap-Baru-Bisnis-Kredit-Konsumer--Kartu-Kredit-vs-Paylater_-1-box p {
		margin:0;
	}
	#g-Lanskap-Baru-Bisnis-Kredit-Konsumer--Kartu-Kredit-vs-Paylater_-1-box .g-aiAbs {
		position:absolute;
	}
	#g-Lanskap-Baru-Bisnis-Kredit-Konsumer--Kartu-Kredit-vs-Paylater_-1-box .g-aiImg {
		position:absolute;
		top:0;
		display:block;
		width:100% !important;
	}
	#g-Lanskap-Baru-Bisnis-Kredit-Konsumer--Kartu-Kredit-vs-Paylater_-1-box .g-aiSymbol {
		position: absolute;
		box-sizing: border-box;
	}
	#g-Lanskap-Baru-Bisnis-Kredit-Konsumer--Kartu-Kredit-vs-Paylater_-1-box .g-aiPointText p { white-space: nowrap; }
	#g-Lanskap-Baru-Bisnis-Kredit-Konsumer--Kartu-Kredit-vs-Paylater_-1-cover_smallplus {
		position:relative;
		overflow:hidden;
	}
	#g-Lanskap-Baru-Bisnis-Kredit-Konsumer--Kartu-Kredit-vs-Paylater_-1-cover_submedium {
		position:relative;
		overflow:hidden;
	}
	#g-Lanskap-Baru-Bisnis-Kredit-Konsumer--Kartu-Kredit-vs-Paylater_-1-cover_medium {
		position:relative;
		overflow:hidden;
	}
	#g-Lanskap-Baru-Bisnis-Kredit-Konsumer--Kartu-Kredit-vs-Paylater_-1-cover_large {
		position:relative;
		overflow:hidden;
	}
	#g-Lanskap-Baru-Bisnis-Kredit-Konsumer--Kartu-Kredit-vs-Paylater_-1-cover_xlarge_5 {
		position:relative;
		overflow:hidden;
	}
	#g-Lanskap-Baru-Bisnis-Kredit-Konsumer--Kartu-Kredit-vs-Paylater_-1-smallplus_1 {
		position:relative;
		overflow:hidden;
	}
	#g-Lanskap-Baru-Bisnis-Kredit-Konsumer--Kartu-Kredit-vs-Paylater_-1-smallplus_1 p {
		font-weight:700;
		line-height:17px;
		height:auto;
		opacity:1;
		letter-spacing:0em;
		font-size:14px;
		text-align:left;
		color:rgb(238,239,205);
		text-transform:none;
		padding-bottom:0;
		padding-top:0;
		mix-blend-mode:normal;
		font-style:normal;
		position:static;
	}
	#g-Lanskap-Baru-Bisnis-Kredit-Konsumer--Kartu-Kredit-vs-Paylater_-1-smallplus_1 .g-pstyle0 {
		line-height:13px;
		height:13px;
		font-size:11px;
		text-align:right;
		color:rgb(40,48,57);
	}
	#g-Lanskap-Baru-Bisnis-Kredit-Konsumer--Kartu-Kredit-vs-Paylater_-1-smallplus_1 .g-pstyle1 {
		height:17px;
		text-align:center;
	}
	#g-Lanskap-Baru-Bisnis-Kredit-Konsumer--Kartu-Kredit-vs-Paylater_-1-smallplus_1 .g-pstyle2 {
		line-height:10px;
		height:10px;
		font-size:8px;
		text-align:center;
		color:rgb(40,48,57);
	}
	#g-Lanskap-Baru-Bisnis-Kredit-Konsumer--Kartu-Kredit-vs-Paylater_-1-submedium_1 {
		position:relative;
		overflow:hidden;
	}
	#g-Lanskap-Baru-Bisnis-Kredit-Konsumer--Kartu-Kredit-vs-Paylater_-1-submedium_1 p {
		font-weight:700;
		line-height:27px;
		height:auto;
		opacity:1;
		letter-spacing:0em;
		font-size:23px;
		text-align:left;
		color:rgb(238,239,205);
		text-transform:none;
		padding-bottom:0;
		padding-top:0;
		mix-blend-mode:normal;
		font-style:normal;
		position:static;
	}
	#g-Lanskap-Baru-Bisnis-Kredit-Konsumer--Kartu-Kredit-vs-Paylater_-1-submedium_1 .g-pstyle0 {
		line-height:21px;
		height:21px;
		font-size:17px;
		color:rgb(40,48,57);
	}
	#g-Lanskap-Baru-Bisnis-Kredit-Konsumer--Kartu-Kredit-vs-Paylater_-1-submedium_1 .g-pstyle1 {
		line-height:21px;
		height:21px;
		font-size:17px;
		text-align:right;
		color:rgb(40,48,57);
	}
	#g-Lanskap-Baru-Bisnis-Kredit-Konsumer--Kartu-Kredit-vs-Paylater_-1-submedium_1 .g-pstyle2 {
		height:27px;
		text-align:center;
	}
	#g-Lanskap-Baru-Bisnis-Kredit-Konsumer--Kartu-Kredit-vs-Paylater_-1-submedium_1 .g-pstyle3 {
		line-height:16px;
		height:16px;
		font-size:13px;
		text-align:center;
		color:rgb(40,48,57);
	}
	#g-Lanskap-Baru-Bisnis-Kredit-Konsumer--Kartu-Kredit-vs-Paylater_-1-medium_1 {
		position:relative;
		overflow:hidden;
	}
	#g-Lanskap-Baru-Bisnis-Kredit-Konsumer--Kartu-Kredit-vs-Paylater_-1-medium_1 p {
		font-weight:700;
		line-height:37px;
		height:auto;
		opacity:1;
		letter-spacing:0em;
		font-size:31px;
		text-align:left;
		color:rgb(238,239,205);
		text-transform:none;
		padding-bottom:0;
		padding-top:0;
		mix-blend-mode:normal;
		font-style:normal;
		position:static;
	}
	#g-Lanskap-Baru-Bisnis-Kredit-Konsumer--Kartu-Kredit-vs-Paylater_-1-medium_1 .g-pstyle0 {
		line-height:28px;
		height:28px;
		font-size:23px;
		color:rgb(40,48,57);
	}
	#g-Lanskap-Baru-Bisnis-Kredit-Konsumer--Kartu-Kredit-vs-Paylater_-1-medium_1 .g-pstyle1 {
		line-height:28px;
		height:28px;
		font-size:23px;
		text-align:right;
		color:rgb(40,48,57);
	}
	#g-Lanskap-Baru-Bisnis-Kredit-Konsumer--Kartu-Kredit-vs-Paylater_-1-medium_1 .g-pstyle2 {
		height:37px;
		text-align:center;
	}
	#g-Lanskap-Baru-Bisnis-Kredit-Konsumer--Kartu-Kredit-vs-Paylater_-1-medium_1 .g-pstyle3 {
		line-height:22px;
		height:22px;
		font-size:18px;
		text-align:center;
		color:rgb(40,48,57);
	}
	#g-Lanskap-Baru-Bisnis-Kredit-Konsumer--Kartu-Kredit-vs-Paylater_-1-large_1 {
		position:relative;
		overflow:hidden;
	}
	#g-Lanskap-Baru-Bisnis-Kredit-Konsumer--Kartu-Kredit-vs-Paylater_-1-large_1 p {
		font-weight:700;
		line-height:33px;
		height:auto;
		opacity:1;
		letter-spacing:0em;
		font-size:28px;
		text-align:left;
		color:rgb(238,239,205);
		text-transform:none;
		padding-bottom:0;
		padding-top:0;
		mix-blend-mode:normal;
		font-style:normal;
		position:static;
	}
	#g-Lanskap-Baru-Bisnis-Kredit-Konsumer--Kartu-Kredit-vs-Paylater_-1-large_1 .g-pstyle0 {
		line-height:25px;
		height:25px;
		font-size:21px;
		color:rgb(40,48,57);
	}
	#g-Lanskap-Baru-Bisnis-Kredit-Konsumer--Kartu-Kredit-vs-Paylater_-1-large_1 .g-pstyle1 {
		line-height:25px;
		height:25px;
		font-size:21px;
		text-align:right;
		color:rgb(40,48,57);
	}
	#g-Lanskap-Baru-Bisnis-Kredit-Konsumer--Kartu-Kredit-vs-Paylater_-1-large_1 .g-pstyle2 {
		height:33px;
		text-align:center;
	}
	#g-Lanskap-Baru-Bisnis-Kredit-Konsumer--Kartu-Kredit-vs-Paylater_-1-large_1 .g-pstyle3 {
		line-height:19px;
		height:19px;
		font-size:16px;
		text-align:center;
		color:rgb(40,48,57);
	}
	#g-Lanskap-Baru-Bisnis-Kredit-Konsumer--Kartu-Kredit-vs-Paylater_-1-xlarge_1 {
		position:relative;
		overflow:hidden;
	}
	#g-Lanskap-Baru-Bisnis-Kredit-Konsumer--Kartu-Kredit-vs-Paylater_-1-xlarge_1 p {
		font-weight:700;
		line-height:29px;
		height:auto;
		opacity:1;
		letter-spacing:0em;
		font-size:24px;
		text-align:left;
		color:rgb(238,239,205);
		text-transform:none;
		padding-bottom:0;
		padding-top:0;
		mix-blend-mode:normal;
		font-style:normal;
		position:static;
	}
	#g-Lanskap-Baru-Bisnis-Kredit-Konsumer--Kartu-Kredit-vs-Paylater_-1-xlarge_1 .g-pstyle0 {
		line-height:21px;
		height:21px;
		font-size:18px;
		color:rgb(40,48,57);
	}
	#g-Lanskap-Baru-Bisnis-Kredit-Konsumer--Kartu-Kredit-vs-Paylater_-1-xlarge_1 .g-pstyle1 {
		line-height:21px;
		height:21px;
		font-size:18px;
		text-align:right;
		color:rgb(40,48,57);
	}
	#g-Lanskap-Baru-Bisnis-Kredit-Konsumer--Kartu-Kredit-vs-Paylater_-1-xlarge_1 .g-pstyle2 {
		height:29px;
		text-align:center;
	}
	#g-Lanskap-Baru-Bisnis-Kredit-Konsumer--Kartu-Kredit-vs-Paylater_-1-xlarge_1 .g-pstyle3 {
		line-height:17px;
		height:17px;
		font-size:14px;
		text-align:center;
		color:rgb(40,48,57);
	}
	#g-Lanskap-Baru-Bisnis-Kredit-Konsumer--Kartu-Kredit-vs-Paylater_-1-smallplus_2 {
		position:relative;
		overflow:hidden;
	}
	#g-Lanskap-Baru-Bisnis-Kredit-Konsumer--Kartu-Kredit-vs-Paylater_-1-smallplus_2 p {
		font-weight:700;
		line-height:12px;
		height:auto;
		opacity:1;
		letter-spacing:0em;
		font-size:10px;
		text-align:left;
		color:rgb(40,48,57);
		text-transform:none;
		padding-bottom:0;
		padding-top:0;
		mix-blend-mode:normal;
		font-style:normal;
		position:static;
	}
	#g-Lanskap-Baru-Bisnis-Kredit-Konsumer--Kartu-Kredit-vs-Paylater_-1-smallplus_2 .g-pstyle0 {
		line-height:19px;
		height:19px;
		font-size:16px;
		text-align:center;
	}
	#g-Lanskap-Baru-Bisnis-Kredit-Konsumer--Kartu-Kredit-vs-Paylater_-1-smallplus_2 .g-pstyle1 {
		line-height:9px;
		height:9px;
		font-size:7px;
		text-align:right;
	}
	#g-Lanskap-Baru-Bisnis-Kredit-Konsumer--Kartu-Kredit-vs-Paylater_-1-smallplus_2 .g-pstyle2 {
		line-height:15px;
		height:15px;
		font-size:12px;
	}
	#g-Lanskap-Baru-Bisnis-Kredit-Konsumer--Kartu-Kredit-vs-Paylater_-1-smallplus_2 .g-pstyle3 {
		line-height:6px;
		height:6px;
		font-size:5px;
		text-align:center;
		color:rgb(177,30,74);
	}
	#g-Lanskap-Baru-Bisnis-Kredit-Konsumer--Kartu-Kredit-vs-Paylater_-1-smallplus_2 .g-pstyle4 {
		height:12px;
		text-align:center;
		color:rgb(177,30,74);
	}
	#g-Lanskap-Baru-Bisnis-Kredit-Konsumer--Kartu-Kredit-vs-Paylater_-1-smallplus_2 .g-pstyle5 {
		line-height:6px;
		height:6px;
		font-size:5px;
		text-align:center;
	}
	#g-Lanskap-Baru-Bisnis-Kredit-Konsumer--Kartu-Kredit-vs-Paylater_-1-smallplus_2 .g-pstyle6 {
		height:12px;
		text-align:center;
	}
	#g-Lanskap-Baru-Bisnis-Kredit-Konsumer--Kartu-Kredit-vs-Paylater_-1-smallplus_2 .g-pstyle7 {
		line-height:15px;
		height:15px;
		font-size:12px;
		color:rgb(177,30,74);
	}
	#g-Lanskap-Baru-Bisnis-Kredit-Konsumer--Kartu-Kredit-vs-Paylater_-1-smallplus_2 .g-pstyle8 {
		line-height:9px;
		height:9px;
		font-size:7px;
		text-align:center;
	}
	#g-Lanskap-Baru-Bisnis-Kredit-Konsumer--Kartu-Kredit-vs-Paylater_-1-submedium_2 {
		position:relative;
		overflow:hidden;
	}
	#g-Lanskap-Baru-Bisnis-Kredit-Konsumer--Kartu-Kredit-vs-Paylater_-1-submedium_2 p {
		font-weight:700;
		line-height:14px;
		height:auto;
		opacity:1;
		letter-spacing:0em;
		font-size:12px;
		text-align:left;
		color:rgb(40,48,57);
		text-transform:none;
		padding-bottom:0;
		padding-top:0;
		mix-blend-mode:normal;
		font-style:normal;
		position:static;
	}
	#g-Lanskap-Baru-Bisnis-Kredit-Konsumer--Kartu-Kredit-vs-Paylater_-1-submedium_2 .g-pstyle0 {
		line-height:22px;
		height:22px;
		font-size:18px;
		text-align:center;
	}
	#g-Lanskap-Baru-Bisnis-Kredit-Konsumer--Kartu-Kredit-vs-Paylater_-1-submedium_2 .g-pstyle1 {
		line-height:10px;
		height:10px;
		font-size:8px;
		text-align:right;
	}
	#g-Lanskap-Baru-Bisnis-Kredit-Konsumer--Kartu-Kredit-vs-Paylater_-1-submedium_2 .g-pstyle2 {
		line-height:17px;
		height:17px;
		font-size:14px;
	}
	#g-Lanskap-Baru-Bisnis-Kredit-Konsumer--Kartu-Kredit-vs-Paylater_-1-submedium_2 .g-pstyle3 {
		line-height:7px;
		height:7px;
		font-size:6px;
		text-align:center;
		color:rgb(177,30,74);
	}
	#g-Lanskap-Baru-Bisnis-Kredit-Konsumer--Kartu-Kredit-vs-Paylater_-1-submedium_2 .g-pstyle4 {
		height:14px;
		text-align:center;
		color:rgb(177,30,74);
	}
	#g-Lanskap-Baru-Bisnis-Kredit-Konsumer--Kartu-Kredit-vs-Paylater_-1-submedium_2 .g-pstyle5 {
		line-height:7px;
		height:7px;
		font-size:6px;
		text-align:center;
	}
	#g-Lanskap-Baru-Bisnis-Kredit-Konsumer--Kartu-Kredit-vs-Paylater_-1-submedium_2 .g-pstyle6 {
		height:14px;
		text-align:center;
	}
	#g-Lanskap-Baru-Bisnis-Kredit-Konsumer--Kartu-Kredit-vs-Paylater_-1-submedium_2 .g-pstyle7 {
		line-height:17px;
		height:17px;
		font-size:14px;
		color:rgb(177,30,74);
	}
	#g-Lanskap-Baru-Bisnis-Kredit-Konsumer--Kartu-Kredit-vs-Paylater_-1-submedium_2 .g-pstyle8 {
		line-height:10px;
		height:10px;
		font-size:8px;
		text-align:center;
	}
	#g-Lanskap-Baru-Bisnis-Kredit-Konsumer--Kartu-Kredit-vs-Paylater_-1-medium_2 {
		position:relative;
		overflow:hidden;
	}
	#g-Lanskap-Baru-Bisnis-Kredit-Konsumer--Kartu-Kredit-vs-Paylater_-1-medium_2 p {
		font-weight:700;
		line-height:18px;
		height:auto;
		opacity:1;
		letter-spacing:0em;
		font-size:15px;
		text-align:left;
		color:rgb(40,48,57);
		text-transform:none;
		padding-bottom:0;
		padding-top:0;
		mix-blend-mode:normal;
		font-style:normal;
		position:static;
	}
	#g-Lanskap-Baru-Bisnis-Kredit-Konsumer--Kartu-Kredit-vs-Paylater_-1-medium_2 .g-pstyle0 {
		line-height:28px;
		height:28px;
		font-size:23px;
		text-align:center;
	}
	#g-Lanskap-Baru-Bisnis-Kredit-Konsumer--Kartu-Kredit-vs-Paylater_-1-medium_2 .g-pstyle1 {
		line-height:12px;
		height:12px;
		font-size:10px;
		text-align:right;
	}
	#g-Lanskap-Baru-Bisnis-Kredit-Konsumer--Kartu-Kredit-vs-Paylater_-1-medium_2 .g-pstyle2 {
		line-height:21px;
		height:21px;
		font-size:18px;
	}
	#g-Lanskap-Baru-Bisnis-Kredit-Konsumer--Kartu-Kredit-vs-Paylater_-1-medium_2 .g-pstyle3 {
		line-height:9px;
		height:9px;
		font-size:8px;
		text-align:center;
		color:rgb(177,30,74);
	}
	#g-Lanskap-Baru-Bisnis-Kredit-Konsumer--Kartu-Kredit-vs-Paylater_-1-medium_2 .g-pstyle4 {
		height:18px;
		text-align:center;
		color:rgb(177,30,74);
	}
	#g-Lanskap-Baru-Bisnis-Kredit-Konsumer--Kartu-Kredit-vs-Paylater_-1-medium_2 .g-pstyle5 {
		line-height:9px;
		height:9px;
		font-size:8px;
		text-align:center;
	}
	#g-Lanskap-Baru-Bisnis-Kredit-Konsumer--Kartu-Kredit-vs-Paylater_-1-medium_2 .g-pstyle6 {
		height:18px;
		text-align:center;
	}
	#g-Lanskap-Baru-Bisnis-Kredit-Konsumer--Kartu-Kredit-vs-Paylater_-1-medium_2 .g-pstyle7 {
		line-height:28px;
		height:28px;
		font-size:24px;
		text-align:center;
	}
	#g-Lanskap-Baru-Bisnis-Kredit-Konsumer--Kartu-Kredit-vs-Paylater_-1-medium_2 .g-pstyle8 {
		line-height:21px;
		height:21px;
		font-size:18px;
		color:rgb(177,30,74);
	}
	#g-Lanskap-Baru-Bisnis-Kredit-Konsumer--Kartu-Kredit-vs-Paylater_-1-medium_2 .g-pstyle9 {
		line-height:12px;
		height:12px;
		font-size:10px;
		text-align:center;
	}
	#g-Lanskap-Baru-Bisnis-Kredit-Konsumer--Kartu-Kredit-vs-Paylater_-1-large_2 {
		position:relative;
		overflow:hidden;
	}
	#g-Lanskap-Baru-Bisnis-Kredit-Konsumer--Kartu-Kredit-vs-Paylater_-1-large_2 p {
		font-weight:700;
		line-height:22px;
		height:auto;
		opacity:1;
		letter-spacing:0em;
		font-size:18px;
		text-align:left;
		color:rgb(40,48,57);
		text-transform:none;
		padding-bottom:0;
		padding-top:0;
		mix-blend-mode:normal;
		font-style:normal;
		position:static;
	}
	#g-Lanskap-Baru-Bisnis-Kredit-Konsumer--Kartu-Kredit-vs-Paylater_-1-large_2 .g-pstyle0 {
		line-height:34px;
		height:34px;
		font-size:28px;
		text-align:center;
	}
	#g-Lanskap-Baru-Bisnis-Kredit-Konsumer--Kartu-Kredit-vs-Paylater_-1-large_2 .g-pstyle1 {
		line-height:15px;
		height:15px;
		font-size:13px;
		text-align:right;
	}
	#g-Lanskap-Baru-Bisnis-Kredit-Konsumer--Kartu-Kredit-vs-Paylater_-1-large_2 .g-pstyle2 {
		line-height:26px;
		height:26px;
		font-size:22px;
	}
	#g-Lanskap-Baru-Bisnis-Kredit-Konsumer--Kartu-Kredit-vs-Paylater_-1-large_2 .g-pstyle3 {
		line-height:11px;
		height:11px;
		font-size:9px;
		text-align:center;
		color:rgb(177,30,74);
	}
	#g-Lanskap-Baru-Bisnis-Kredit-Konsumer--Kartu-Kredit-vs-Paylater_-1-large_2 .g-pstyle4 {
		height:22px;
		text-align:center;
		color:rgb(177,30,74);
	}
	#g-Lanskap-Baru-Bisnis-Kredit-Konsumer--Kartu-Kredit-vs-Paylater_-1-large_2 .g-pstyle5 {
		line-height:11px;
		height:11px;
		font-size:9px;
		text-align:center;
	}
	#g-Lanskap-Baru-Bisnis-Kredit-Konsumer--Kartu-Kredit-vs-Paylater_-1-large_2 .g-pstyle6 {
		height:22px;
		text-align:center;
	}
	#g-Lanskap-Baru-Bisnis-Kredit-Konsumer--Kartu-Kredit-vs-Paylater_-1-large_2 .g-pstyle7 {
		line-height:35px;
		height:35px;
		font-size:29px;
		text-align:center;
	}
	#g-Lanskap-Baru-Bisnis-Kredit-Konsumer--Kartu-Kredit-vs-Paylater_-1-large_2 .g-pstyle8 {
		line-height:26px;
		height:26px;
		font-size:22px;
		color:rgb(177,30,74);
	}
	#g-Lanskap-Baru-Bisnis-Kredit-Konsumer--Kartu-Kredit-vs-Paylater_-1-large_2 .g-pstyle9 {
		line-height:15px;
		height:15px;
		font-size:13px;
		text-align:center;
	}
	#g-Lanskap-Baru-Bisnis-Kredit-Konsumer--Kartu-Kredit-vs-Paylater_-1-xlarge_2 {
		position:relative;
		overflow:hidden;
	}
	#g-Lanskap-Baru-Bisnis-Kredit-Konsumer--Kartu-Kredit-vs-Paylater_-1-xlarge_2 p {
		font-weight:700;
		line-height:26px;
		height:auto;
		opacity:1;
		letter-spacing:0em;
		font-size:22px;
		text-align:left;
		color:rgb(40,48,57);
		text-transform:none;
		padding-bottom:0;
		padding-top:0;
		mix-blend-mode:normal;
		font-style:normal;
		position:static;
	}
	#g-Lanskap-Baru-Bisnis-Kredit-Konsumer--Kartu-Kredit-vs-Paylater_-1-xlarge_2 .g-pstyle0 {
		line-height:41px;
		height:41px;
		font-size:34px;
		text-align:center;
	}
	#g-Lanskap-Baru-Bisnis-Kredit-Konsumer--Kartu-Kredit-vs-Paylater_-1-xlarge_2 .g-pstyle1 {
		line-height:18px;
		height:18px;
		font-size:15px;
		text-align:right;
	}
	#g-Lanskap-Baru-Bisnis-Kredit-Konsumer--Kartu-Kredit-vs-Paylater_-1-xlarge_2 .g-pstyle2 {
		line-height:31px;
		height:31px;
		font-size:26px;
	}
	#g-Lanskap-Baru-Bisnis-Kredit-Konsumer--Kartu-Kredit-vs-Paylater_-1-xlarge_2 .g-pstyle3 {
		line-height:31px;
		height:31px;
		font-size:26px;
		color:rgb(177,30,74);
	}
	#g-Lanskap-Baru-Bisnis-Kredit-Konsumer--Kartu-Kredit-vs-Paylater_-1-xlarge_2 .g-pstyle4 {
		line-height:13px;
		height:13px;
		font-size:11px;
		text-align:center;
	}
	#g-Lanskap-Baru-Bisnis-Kredit-Konsumer--Kartu-Kredit-vs-Paylater_-1-xlarge_2 .g-pstyle5 {
		height:26px;
		text-align:center;
	}
	#g-Lanskap-Baru-Bisnis-Kredit-Konsumer--Kartu-Kredit-vs-Paylater_-1-xlarge_2 .g-pstyle6 {
		line-height:13px;
		height:13px;
		font-size:11px;
		text-align:center;
		color:rgb(177,30,74);
	}
	#g-Lanskap-Baru-Bisnis-Kredit-Konsumer--Kartu-Kredit-vs-Paylater_-1-xlarge_2 .g-pstyle7 {
		height:26px;
		text-align:center;
		color:rgb(177,30,74);
	}
	#g-Lanskap-Baru-Bisnis-Kredit-Konsumer--Kartu-Kredit-vs-Paylater_-1-xlarge_2 .g-pstyle8 {
		line-height:18px;
		height:18px;
		font-size:15px;
		text-align:center;
	}
	#g-Lanskap-Baru-Bisnis-Kredit-Konsumer--Kartu-Kredit-vs-Paylater_-1-smallplus_3 {
		position:relative;
		overflow:hidden;
	}
	#g-Lanskap-Baru-Bisnis-Kredit-Konsumer--Kartu-Kredit-vs-Paylater_-1-smallplus_3 p {
		font-weight:700;
		line-height:16px;
		height:auto;
		opacity:1;
		letter-spacing:0em;
		font-size:13px;
		text-align:left;
		color:rgb(40,48,57);
		text-transform:none;
		padding-bottom:0;
		padding-top:0;
		mix-blend-mode:normal;
		font-style:normal;
		position:static;
	}
	#g-Lanskap-Baru-Bisnis-Kredit-Konsumer--Kartu-Kredit-vs-Paylater_-1-smallplus_3 .g-pstyle0 {
		height:16px;
		text-align:center;
	}
	#g-Lanskap-Baru-Bisnis-Kredit-Konsumer--Kartu-Kredit-vs-Paylater_-1-smallplus_3 .g-pstyle1 {
		height:16px;
		text-align:center;
		color:rgb(238,239,205);
	}
	#g-Lanskap-Baru-Bisnis-Kredit-Konsumer--Kartu-Kredit-vs-Paylater_-1-submedium_3 {
		position:relative;
		overflow:hidden;
	}
	#g-Lanskap-Baru-Bisnis-Kredit-Konsumer--Kartu-Kredit-vs-Paylater_-1-submedium_3 p {
		font-weight:700;
		line-height:22px;
		height:auto;
		opacity:1;
		letter-spacing:0em;
		font-size:19px;
		text-align:left;
		color:rgb(40,48,57);
		text-transform:none;
		padding-bottom:0;
		padding-top:0;
		mix-blend-mode:normal;
		font-style:normal;
		position:static;
	}
	#g-Lanskap-Baru-Bisnis-Kredit-Konsumer--Kartu-Kredit-vs-Paylater_-1-submedium_3 .g-pstyle0 {
		height:22px;
		text-align:center;
	}
	#g-Lanskap-Baru-Bisnis-Kredit-Konsumer--Kartu-Kredit-vs-Paylater_-1-submedium_3 .g-pstyle1 {
		height:22px;
		text-align:center;
		color:rgb(238,239,205);
	}
	#g-Lanskap-Baru-Bisnis-Kredit-Konsumer--Kartu-Kredit-vs-Paylater_-1-medium_3 {
		position:relative;
		overflow:hidden;
	}
	#g-Lanskap-Baru-Bisnis-Kredit-Konsumer--Kartu-Kredit-vs-Paylater_-1-medium_3 p {
		font-weight:700;
		line-height:31px;
		height:auto;
		opacity:1;
		letter-spacing:0em;
		font-size:26px;
		text-align:left;
		color:rgb(40,48,57);
		text-transform:none;
		padding-bottom:0;
		padding-top:0;
		mix-blend-mode:normal;
		font-style:normal;
		position:static;
	}
	#g-Lanskap-Baru-Bisnis-Kredit-Konsumer--Kartu-Kredit-vs-Paylater_-1-medium_3 .g-pstyle0 {
		height:31px;
		text-align:center;
	}
	#g-Lanskap-Baru-Bisnis-Kredit-Konsumer--Kartu-Kredit-vs-Paylater_-1-medium_3 .g-pstyle1 {
		height:31px;
		text-align:center;
		color:rgb(238,239,205);
	}
	#g-Lanskap-Baru-Bisnis-Kredit-Konsumer--Kartu-Kredit-vs-Paylater_-1-large_3 {
		position:relative;
		overflow:hidden;
	}
	#g-Lanskap-Baru-Bisnis-Kredit-Konsumer--Kartu-Kredit-vs-Paylater_-1-large_3 p {
		font-weight:700;
		line-height:26px;
		height:auto;
		opacity:1;
		letter-spacing:0em;
		font-size:22px;
		text-align:left;
		color:rgb(40,48,57);
		text-transform:none;
		padding-bottom:0;
		padding-top:0;
		mix-blend-mode:normal;
		font-style:normal;
		position:static;
	}
	#g-Lanskap-Baru-Bisnis-Kredit-Konsumer--Kartu-Kredit-vs-Paylater_-1-large_3 .g-pstyle0 {
		height:26px;
		text-align:center;
	}
	#g-Lanskap-Baru-Bisnis-Kredit-Konsumer--Kartu-Kredit-vs-Paylater_-1-large_3 .g-pstyle1 {
		height:26px;
		text-align:center;
		color:rgb(238,239,205);
	}
	#g-Lanskap-Baru-Bisnis-Kredit-Konsumer--Kartu-Kredit-vs-Paylater_-1-xlarge_3 {
		position:relative;
		overflow:hidden;
	}
	#g-Lanskap-Baru-Bisnis-Kredit-Konsumer--Kartu-Kredit-vs-Paylater_-1-xlarge_3 p {
		font-weight:700;
		line-height:31px;
		height:auto;
		opacity:1;
		letter-spacing:0em;
		font-size:26px;
		text-align:left;
		color:rgb(40,48,57);
		text-transform:none;
		padding-bottom:0;
		padding-top:0;
		mix-blend-mode:normal;
		font-style:normal;
		position:static;
	}
	#g-Lanskap-Baru-Bisnis-Kredit-Konsumer--Kartu-Kredit-vs-Paylater_-1-xlarge_3 .g-pstyle0 {
		height:31px;
		text-align:center;
	}
	#g-Lanskap-Baru-Bisnis-Kredit-Konsumer--Kartu-Kredit-vs-Paylater_-1-xlarge_3 .g-pstyle1 {
		height:31px;
		text-align:center;
		color:rgb(238,239,205);
	}
	#g-Lanskap-Baru-Bisnis-Kredit-Konsumer--Kartu-Kredit-vs-Paylater_-1-smallplus_4 {
		position:relative;
		overflow:hidden;
	}
	#g-Lanskap-Baru-Bisnis-Kredit-Konsumer--Kartu-Kredit-vs-Paylater_-1-smallplus_4 p {
		font-weight:700;
		line-height:11px;
		height:auto;
		opacity:1;
		letter-spacing:0em;
		font-size:9px;
		text-align:left;
		color:rgb(40,48,57);
		text-transform:none;
		padding-bottom:0;
		padding-top:0;
		mix-blend-mode:normal;
		font-style:normal;
		position:static;
	}
	#g-Lanskap-Baru-Bisnis-Kredit-Konsumer--Kartu-Kredit-vs-Paylater_-1-smallplus_4 .g-pstyle0 {
		height:11px;
		text-align:center;
	}
	#g-Lanskap-Baru-Bisnis-Kredit-Konsumer--Kartu-Kredit-vs-Paylater_-1-smallplus_4 .g-pstyle1 {
		height:11px;
		text-align:center;
		color:rgb(238,239,205);
	}
	#g-Lanskap-Baru-Bisnis-Kredit-Konsumer--Kartu-Kredit-vs-Paylater_-1-submedium_4 {
		position:relative;
		overflow:hidden;
	}
	#g-Lanskap-Baru-Bisnis-Kredit-Konsumer--Kartu-Kredit-vs-Paylater_-1-submedium_4 p {
		font-weight:700;
		line-height:15px;
		height:auto;
		opacity:1;
		letter-spacing:0em;
		font-size:13px;
		text-align:left;
		color:rgb(40,48,57);
		text-transform:none;
		padding-bottom:0;
		padding-top:0;
		mix-blend-mode:normal;
		font-style:normal;
		position:static;
	}
	#g-Lanskap-Baru-Bisnis-Kredit-Konsumer--Kartu-Kredit-vs-Paylater_-1-submedium_4 .g-pstyle0 {
		height:15px;
		text-align:center;
	}
	#g-Lanskap-Baru-Bisnis-Kredit-Konsumer--Kartu-Kredit-vs-Paylater_-1-submedium_4 .g-pstyle1 {
		height:15px;
		text-align:center;
		color:rgb(238,239,205);
	}
	#g-Lanskap-Baru-Bisnis-Kredit-Konsumer--Kartu-Kredit-vs-Paylater_-1-medium_4 {
		position:relative;
		overflow:hidden;
	}
	#g-Lanskap-Baru-Bisnis-Kredit-Konsumer--Kartu-Kredit-vs-Paylater_-1-medium_4 p {
		font-weight:700;
		line-height:22px;
		height:auto;
		opacity:1;
		letter-spacing:0em;
		font-size:18px;
		text-align:left;
		color:rgb(40,48,57);
		text-transform:none;
		padding-bottom:0;
		padding-top:0;
		mix-blend-mode:normal;
		font-style:normal;
		position:static;
	}
	#g-Lanskap-Baru-Bisnis-Kredit-Konsumer--Kartu-Kredit-vs-Paylater_-1-medium_4 .g-pstyle0 {
		height:22px;
		text-align:center;
	}
	#g-Lanskap-Baru-Bisnis-Kredit-Konsumer--Kartu-Kredit-vs-Paylater_-1-medium_4 .g-pstyle1 {
		height:22px;
		text-align:center;
		color:rgb(238,239,205);
	}
	#g-Lanskap-Baru-Bisnis-Kredit-Konsumer--Kartu-Kredit-vs-Paylater_-1-large_4 {
		position:relative;
		overflow:hidden;
	}
	#g-Lanskap-Baru-Bisnis-Kredit-Konsumer--Kartu-Kredit-vs-Paylater_-1-large_4 p {
		font-weight:700;
		line-height:22px;
		height:auto;
		opacity:1;
		letter-spacing:0em;
		font-size:18px;
		text-align:left;
		color:rgb(40,48,57);
		text-transform:none;
		padding-bottom:0;
		padding-top:0;
		mix-blend-mode:normal;
		font-style:normal;
		position:static;
	}
	#g-Lanskap-Baru-Bisnis-Kredit-Konsumer--Kartu-Kredit-vs-Paylater_-1-large_4 .g-pstyle0 {
		height:22px;
		text-align:center;
	}
	#g-Lanskap-Baru-Bisnis-Kredit-Konsumer--Kartu-Kredit-vs-Paylater_-1-large_4 .g-pstyle1 {
		height:22px;
		text-align:center;
		color:rgb(238,239,205);
	}
	#g-Lanskap-Baru-Bisnis-Kredit-Konsumer--Kartu-Kredit-vs-Paylater_-1-xlarge_4 {
		position:relative;
		overflow:hidden;
	}
	#g-Lanskap-Baru-Bisnis-Kredit-Konsumer--Kartu-Kredit-vs-Paylater_-1-xlarge_4 p {
		font-weight:700;
		line-height:22px;
		height:auto;
		opacity:1;
		letter-spacing:0em;
		font-size:18px;
		text-align:left;
		color:rgb(40,48,57);
		text-transform:none;
		padding-bottom:0;
		padding-top:0;
		mix-blend-mode:normal;
		font-style:normal;
		position:static;
	}
	#g-Lanskap-Baru-Bisnis-Kredit-Konsumer--Kartu-Kredit-vs-Paylater_-1-xlarge_4 .g-pstyle0 {
		height:22px;
		text-align:center;
	}
	#g-Lanskap-Baru-Bisnis-Kredit-Konsumer--Kartu-Kredit-vs-Paylater_-1-xlarge_4 .g-pstyle1 {
		height:22px;
		text-align:center;
		color:rgb(238,239,205);
	}
	#g-Lanskap-Baru-Bisnis-Kredit-Konsumer--Kartu-Kredit-vs-Paylater_-1-smallplus_5 {
		position:relative;
		overflow:hidden;
	}
	#g-Lanskap-Baru-Bisnis-Kredit-Konsumer--Kartu-Kredit-vs-Paylater_-1-smallplus_5 p {
		font-weight:700;
		line-height:21px;
		height:auto;
		opacity:1;
		letter-spacing:0em;
		font-size:18px;
		text-align:left;
		color:rgb(238,239,205);
		text-transform:none;
		padding-bottom:0;
		padding-top:0;
		mix-blend-mode:normal;
		font-style:normal;
		position:static;
	}
	#g-Lanskap-Baru-Bisnis-Kredit-Konsumer--Kartu-Kredit-vs-Paylater_-1-smallplus_5 .g-pstyle0 {
		line-height:28px;
		height:28px;
		font-size:24px;
		text-align:center;
	}
	#g-Lanskap-Baru-Bisnis-Kredit-Konsumer--Kartu-Kredit-vs-Paylater_-1-smallplus_5 .g-pstyle1 {
		height:21px;
		text-align:center;
	}
	#g-Lanskap-Baru-Bisnis-Kredit-Konsumer--Kartu-Kredit-vs-Paylater_-1-submedium_5 {
		position:relative;
		overflow:hidden;
	}
	#g-Lanskap-Baru-Bisnis-Kredit-Konsumer--Kartu-Kredit-vs-Paylater_-1-submedium_5 p {
		font-weight:700;
		line-height:27px;
		height:auto;
		opacity:1;
		letter-spacing:0em;
		font-size:23px;
		text-align:left;
		color:rgb(238,239,205);
		text-transform:none;
		padding-bottom:0;
		padding-top:0;
		mix-blend-mode:normal;
		font-style:normal;
		position:static;
	}
	#g-Lanskap-Baru-Bisnis-Kredit-Konsumer--Kartu-Kredit-vs-Paylater_-1-submedium_5 .g-pstyle0 {
		line-height:36px;
		height:36px;
		font-size:30px;
		text-align:center;
	}
	#g-Lanskap-Baru-Bisnis-Kredit-Konsumer--Kartu-Kredit-vs-Paylater_-1-submedium_5 .g-pstyle1 {
		height:27px;
		text-align:center;
	}
	#g-Lanskap-Baru-Bisnis-Kredit-Konsumer--Kartu-Kredit-vs-Paylater_-1-medium_5 {
		position:relative;
		overflow:hidden;
	}
	#g-Lanskap-Baru-Bisnis-Kredit-Konsumer--Kartu-Kredit-vs-Paylater_-1-medium_5 p {
		font-weight:700;
		line-height:37px;
		height:auto;
		opacity:1;
		letter-spacing:0em;
		font-size:31px;
		text-align:left;
		color:rgb(238,239,205);
		text-transform:none;
		padding-bottom:0;
		padding-top:0;
		mix-blend-mode:normal;
		font-style:normal;
		position:static;
	}
	#g-Lanskap-Baru-Bisnis-Kredit-Konsumer--Kartu-Kredit-vs-Paylater_-1-medium_5 .g-pstyle0 {
		line-height:50px;
		height:50px;
		font-size:41px;
		text-align:center;
	}
	#g-Lanskap-Baru-Bisnis-Kredit-Konsumer--Kartu-Kredit-vs-Paylater_-1-medium_5 .g-pstyle1 {
		height:37px;
		text-align:center;
	}
	#g-Lanskap-Baru-Bisnis-Kredit-Konsumer--Kartu-Kredit-vs-Paylater_-1-large_5 {
		position:relative;
		overflow:hidden;
	}
	#g-Lanskap-Baru-Bisnis-Kredit-Konsumer--Kartu-Kredit-vs-Paylater_-1-large_5 p {
		font-weight:700;
		line-height:37px;
		height:auto;
		opacity:1;
		letter-spacing:0em;
		font-size:31px;
		text-align:left;
		color:rgb(238,239,205);
		text-transform:none;
		padding-bottom:0;
		padding-top:0;
		mix-blend-mode:normal;
		font-style:normal;
		position:static;
	}
	#g-Lanskap-Baru-Bisnis-Kredit-Konsumer--Kartu-Kredit-vs-Paylater_-1-large_5 .g-pstyle0 {
		line-height:50px;
		height:50px;
		font-size:41px;
		text-align:center;
	}
	#g-Lanskap-Baru-Bisnis-Kredit-Konsumer--Kartu-Kredit-vs-Paylater_-1-large_5 .g-pstyle1 {
		height:37px;
		text-align:center;
	}
	#g-Lanskap-Baru-Bisnis-Kredit-Konsumer--Kartu-Kredit-vs-Paylater_-1-xlarge_5 {
		position:relative;
		overflow:hidden;
	}
	#g-Lanskap-Baru-Bisnis-Kredit-Konsumer--Kartu-Kredit-vs-Paylater_-1-xlarge_5 p {
		font-weight:700;
		line-height:37px;
		height:auto;
		opacity:1;
		letter-spacing:0em;
		font-size:31px;
		text-align:left;
		color:rgb(238,239,205);
		text-transform:none;
		padding-bottom:0;
		padding-top:0;
		mix-blend-mode:normal;
		font-style:normal;
		position:static;
	}
	#g-Lanskap-Baru-Bisnis-Kredit-Konsumer--Kartu-Kredit-vs-Paylater_-1-xlarge_5 .g-pstyle0 {
		line-height:50px;
		height:50px;
		font-size:41px;
		text-align:center;
	}
	#g-Lanskap-Baru-Bisnis-Kredit-Konsumer--Kartu-Kredit-vs-Paylater_-1-xlarge_5 .g-pstyle1 {
		height:37px;
		text-align:center;
	}
	#g-Lanskap-Baru-Bisnis-Kredit-Konsumer--Kartu-Kredit-vs-Paylater_-1-smallplus_5_copy {
		position:relative;
		overflow:hidden;
	}
	#g-Lanskap-Baru-Bisnis-Kredit-Konsumer--Kartu-Kredit-vs-Paylater_-1-smallplus_5_copy p {
		font-weight:700;
		line-height:13px;
		height:auto;
		opacity:1;
		letter-spacing:0em;
		font-size:11px;
		text-align:left;
		color:rgb(138,176,33);
		text-transform:none;
		padding-bottom:0;
		padding-top:0;
		mix-blend-mode:normal;
		font-style:normal;
		position:static;
	}
	#g-Lanskap-Baru-Bisnis-Kredit-Konsumer--Kartu-Kredit-vs-Paylater_-1-smallplus_5_copy .g-pstyle0 {
		height:13px;
		color:rgb(2,89,58);
	}
	#g-Lanskap-Baru-Bisnis-Kredit-Konsumer--Kartu-Kredit-vs-Paylater_-1-smallplus_5_copy .g-pstyle1 {
		line-height:22px;
		height:22px;
		font-size:18px;
		text-align:right;
		color:rgb(2,89,58);
	}
	#g-Lanskap-Baru-Bisnis-Kredit-Konsumer--Kartu-Kredit-vs-Paylater_-1-smallplus_5_copy .g-pstyle2 {
		height:13px;
		color:rgb(3,113,78);
	}
	#g-Lanskap-Baru-Bisnis-Kredit-Konsumer--Kartu-Kredit-vs-Paylater_-1-smallplus_5_copy .g-pstyle3 {
		line-height:22px;
		height:22px;
		font-size:18px;
		text-align:right;
		color:rgb(3,113,78);
	}
	#g-Lanskap-Baru-Bisnis-Kredit-Konsumer--Kartu-Kredit-vs-Paylater_-1-smallplus_5_copy .g-pstyle4 {
		height:13px;
		color:rgb(96,137,0);
	}
	#g-Lanskap-Baru-Bisnis-Kredit-Konsumer--Kartu-Kredit-vs-Paylater_-1-smallplus_5_copy .g-pstyle5 {
		line-height:22px;
		height:22px;
		font-size:18px;
		text-align:right;
		color:rgb(96,137,0);
	}
	#g-Lanskap-Baru-Bisnis-Kredit-Konsumer--Kartu-Kredit-vs-Paylater_-1-smallplus_5_copy .g-pstyle6 {
		height:13px;
	}
	#g-Lanskap-Baru-Bisnis-Kredit-Konsumer--Kartu-Kredit-vs-Paylater_-1-smallplus_5_copy .g-pstyle7 {
		line-height:22px;
		height:22px;
		font-size:18px;
		text-align:right;
	}
	#g-Lanskap-Baru-Bisnis-Kredit-Konsumer--Kartu-Kredit-vs-Paylater_-1-smallplus_5_copy .g-pstyle8 {
		line-height:22px;
		height:22px;
		font-size:18px;
		text-align:right;
		color:rgb(174,175,32);
	}
	#g-Lanskap-Baru-Bisnis-Kredit-Konsumer--Kartu-Kredit-vs-Paylater_-1-smallplus_5_copy .g-pstyle9 {
		height:13px;
		color:rgb(174,175,32);
	}
	#g-Lanskap-Baru-Bisnis-Kredit-Konsumer--Kartu-Kredit-vs-Paylater_-1-smallplus_5_copy .g-pstyle10 {
		height:13px;
		color:rgb(244,205,18);
	}
	#g-Lanskap-Baru-Bisnis-Kredit-Konsumer--Kartu-Kredit-vs-Paylater_-1-smallplus_5_copy .g-pstyle11 {
		line-height:22px;
		height:22px;
		font-size:18px;
		text-align:right;
		color:rgb(244,205,18);
	}
	#g-Lanskap-Baru-Bisnis-Kredit-Konsumer--Kartu-Kredit-vs-Paylater_-1-submedium_5_copy {
		position:relative;
		overflow:hidden;
	}
	#g-Lanskap-Baru-Bisnis-Kredit-Konsumer--Kartu-Kredit-vs-Paylater_-1-submedium_5_copy p {
		font-weight:700;
		line-height:19px;
		height:auto;
		opacity:1;
		letter-spacing:0em;
		font-size:16px;
		text-align:left;
		color:rgb(138,176,33);
		text-transform:none;
		padding-bottom:0;
		padding-top:0;
		mix-blend-mode:normal;
		font-style:normal;
		position:static;
	}
	#g-Lanskap-Baru-Bisnis-Kredit-Konsumer--Kartu-Kredit-vs-Paylater_-1-submedium_5_copy .g-pstyle0 {
		height:19px;
		color:rgb(2,89,58);
	}
	#g-Lanskap-Baru-Bisnis-Kredit-Konsumer--Kartu-Kredit-vs-Paylater_-1-submedium_5_copy .g-pstyle1 {
		line-height:31px;
		height:31px;
		font-size:26px;
		text-align:right;
		color:rgb(2,89,58);
	}
	#g-Lanskap-Baru-Bisnis-Kredit-Konsumer--Kartu-Kredit-vs-Paylater_-1-submedium_5_copy .g-pstyle2 {
		height:19px;
		color:rgb(3,113,78);
	}
	#g-Lanskap-Baru-Bisnis-Kredit-Konsumer--Kartu-Kredit-vs-Paylater_-1-submedium_5_copy .g-pstyle3 {
		line-height:31px;
		height:31px;
		font-size:26px;
		text-align:right;
		color:rgb(3,113,78);
	}
	#g-Lanskap-Baru-Bisnis-Kredit-Konsumer--Kartu-Kredit-vs-Paylater_-1-submedium_5_copy .g-pstyle4 {
		height:19px;
		color:rgb(96,137,0);
	}
	#g-Lanskap-Baru-Bisnis-Kredit-Konsumer--Kartu-Kredit-vs-Paylater_-1-submedium_5_copy .g-pstyle5 {
		line-height:31px;
		height:31px;
		font-size:26px;
		text-align:right;
		color:rgb(96,137,0);
	}
	#g-Lanskap-Baru-Bisnis-Kredit-Konsumer--Kartu-Kredit-vs-Paylater_-1-submedium_5_copy .g-pstyle6 {
		height:19px;
	}
	#g-Lanskap-Baru-Bisnis-Kredit-Konsumer--Kartu-Kredit-vs-Paylater_-1-submedium_5_copy .g-pstyle7 {
		line-height:31px;
		height:31px;
		font-size:26px;
		text-align:right;
	}
	#g-Lanskap-Baru-Bisnis-Kredit-Konsumer--Kartu-Kredit-vs-Paylater_-1-submedium_5_copy .g-pstyle8 {
		line-height:31px;
		height:31px;
		font-size:26px;
		text-align:right;
		color:rgb(174,175,32);
	}
	#g-Lanskap-Baru-Bisnis-Kredit-Konsumer--Kartu-Kredit-vs-Paylater_-1-submedium_5_copy .g-pstyle9 {
		height:19px;
		color:rgb(174,175,32);
	}
	#g-Lanskap-Baru-Bisnis-Kredit-Konsumer--Kartu-Kredit-vs-Paylater_-1-submedium_5_copy .g-pstyle10 {
		height:19px;
		color:rgb(244,205,18);
	}
	#g-Lanskap-Baru-Bisnis-Kredit-Konsumer--Kartu-Kredit-vs-Paylater_-1-submedium_5_copy .g-pstyle11 {
		line-height:31px;
		height:31px;
		font-size:26px;
		text-align:right;
		color:rgb(244,205,18);
	}
	#g-Lanskap-Baru-Bisnis-Kredit-Konsumer--Kartu-Kredit-vs-Paylater_-1-medium_5_copy {
		position:relative;
		overflow:hidden;
	}
	#g-Lanskap-Baru-Bisnis-Kredit-Konsumer--Kartu-Kredit-vs-Paylater_-1-medium_5_copy p {
		font-weight:700;
		line-height:19px;
		height:auto;
		opacity:1;
		letter-spacing:0em;
		font-size:16px;
		text-align:left;
		color:rgb(138,176,33);
		text-transform:none;
		padding-bottom:0;
		padding-top:0;
		mix-blend-mode:normal;
		font-style:normal;
		position:static;
	}
	#g-Lanskap-Baru-Bisnis-Kredit-Konsumer--Kartu-Kredit-vs-Paylater_-1-medium_5_copy .g-pstyle0 {
		height:19px;
		color:rgb(2,89,58);
	}
	#g-Lanskap-Baru-Bisnis-Kredit-Konsumer--Kartu-Kredit-vs-Paylater_-1-medium_5_copy .g-pstyle1 {
		line-height:31px;
		height:31px;
		font-size:26px;
		text-align:right;
		color:rgb(2,89,58);
	}
	#g-Lanskap-Baru-Bisnis-Kredit-Konsumer--Kartu-Kredit-vs-Paylater_-1-medium_5_copy .g-pstyle2 {
		height:19px;
		color:rgb(3,113,78);
	}
	#g-Lanskap-Baru-Bisnis-Kredit-Konsumer--Kartu-Kredit-vs-Paylater_-1-medium_5_copy .g-pstyle3 {
		line-height:31px;
		height:31px;
		font-size:26px;
		text-align:right;
		color:rgb(3,113,78);
	}
	#g-Lanskap-Baru-Bisnis-Kredit-Konsumer--Kartu-Kredit-vs-Paylater_-1-medium_5_copy .g-pstyle4 {
		height:19px;
		color:rgb(96,137,0);
	}
	#g-Lanskap-Baru-Bisnis-Kredit-Konsumer--Kartu-Kredit-vs-Paylater_-1-medium_5_copy .g-pstyle5 {
		line-height:31px;
		height:31px;
		font-size:26px;
		text-align:right;
		color:rgb(96,137,0);
	}
	#g-Lanskap-Baru-Bisnis-Kredit-Konsumer--Kartu-Kredit-vs-Paylater_-1-medium_5_copy .g-pstyle6 {
		height:19px;
	}
	#g-Lanskap-Baru-Bisnis-Kredit-Konsumer--Kartu-Kredit-vs-Paylater_-1-medium_5_copy .g-pstyle7 {
		line-height:31px;
		height:31px;
		font-size:26px;
		text-align:right;
	}
	#g-Lanskap-Baru-Bisnis-Kredit-Konsumer--Kartu-Kredit-vs-Paylater_-1-medium_5_copy .g-pstyle8 {
		line-height:31px;
		height:31px;
		font-size:26px;
		text-align:right;
		color:rgb(174,175,32);
	}
	#g-Lanskap-Baru-Bisnis-Kredit-Konsumer--Kartu-Kredit-vs-Paylater_-1-medium_5_copy .g-pstyle9 {
		height:19px;
		color:rgb(174,175,32);
	}
	#g-Lanskap-Baru-Bisnis-Kredit-Konsumer--Kartu-Kredit-vs-Paylater_-1-medium_5_copy .g-pstyle10 {
		height:19px;
		color:rgb(244,205,18);
	}
	#g-Lanskap-Baru-Bisnis-Kredit-Konsumer--Kartu-Kredit-vs-Paylater_-1-medium_5_copy .g-pstyle11 {
		line-height:31px;
		height:31px;
		font-size:26px;
		text-align:right;
		color:rgb(244,205,18);
	}
	#g-Lanskap-Baru-Bisnis-Kredit-Konsumer--Kartu-Kredit-vs-Paylater_-1-large_5_copy {
		position:relative;
		overflow:hidden;
	}
	#g-Lanskap-Baru-Bisnis-Kredit-Konsumer--Kartu-Kredit-vs-Paylater_-1-large_5_copy p {
		font-weight:700;
		line-height:19px;
		height:auto;
		opacity:1;
		letter-spacing:0em;
		font-size:16px;
		text-align:left;
		color:rgb(138,176,33);
		text-transform:none;
		padding-bottom:0;
		padding-top:0;
		mix-blend-mode:normal;
		font-style:normal;
		position:static;
	}
	#g-Lanskap-Baru-Bisnis-Kredit-Konsumer--Kartu-Kredit-vs-Paylater_-1-large_5_copy .g-pstyle0 {
		height:19px;
		color:rgb(2,89,58);
	}
	#g-Lanskap-Baru-Bisnis-Kredit-Konsumer--Kartu-Kredit-vs-Paylater_-1-large_5_copy .g-pstyle1 {
		line-height:31px;
		height:31px;
		font-size:26px;
		text-align:right;
		color:rgb(2,89,58);
	}
	#g-Lanskap-Baru-Bisnis-Kredit-Konsumer--Kartu-Kredit-vs-Paylater_-1-large_5_copy .g-pstyle2 {
		height:19px;
		color:rgb(3,113,78);
	}
	#g-Lanskap-Baru-Bisnis-Kredit-Konsumer--Kartu-Kredit-vs-Paylater_-1-large_5_copy .g-pstyle3 {
		line-height:31px;
		height:31px;
		font-size:26px;
		text-align:right;
		color:rgb(3,113,78);
	}
	#g-Lanskap-Baru-Bisnis-Kredit-Konsumer--Kartu-Kredit-vs-Paylater_-1-large_5_copy .g-pstyle4 {
		height:19px;
		color:rgb(96,137,0);
	}
	#g-Lanskap-Baru-Bisnis-Kredit-Konsumer--Kartu-Kredit-vs-Paylater_-1-large_5_copy .g-pstyle5 {
		line-height:31px;
		height:31px;
		font-size:26px;
		text-align:right;
		color:rgb(96,137,0);
	}
	#g-Lanskap-Baru-Bisnis-Kredit-Konsumer--Kartu-Kredit-vs-Paylater_-1-large_5_copy .g-pstyle6 {
		height:19px;
	}
	#g-Lanskap-Baru-Bisnis-Kredit-Konsumer--Kartu-Kredit-vs-Paylater_-1-large_5_copy .g-pstyle7 {
		line-height:31px;
		height:31px;
		font-size:26px;
		text-align:right;
	}
	#g-Lanskap-Baru-Bisnis-Kredit-Konsumer--Kartu-Kredit-vs-Paylater_-1-large_5_copy .g-pstyle8 {
		line-height:31px;
		height:31px;
		font-size:26px;
		text-align:right;
		color:rgb(174,175,32);
	}
	#g-Lanskap-Baru-Bisnis-Kredit-Konsumer--Kartu-Kredit-vs-Paylater_-1-large_5_copy .g-pstyle9 {
		height:19px;
		color:rgb(174,175,32);
	}
	#g-Lanskap-Baru-Bisnis-Kredit-Konsumer--Kartu-Kredit-vs-Paylater_-1-large_5_copy .g-pstyle10 {
		height:19px;
		color:rgb(244,205,18);
	}
	#g-Lanskap-Baru-Bisnis-Kredit-Konsumer--Kartu-Kredit-vs-Paylater_-1-large_5_copy .g-pstyle11 {
		line-height:31px;
		height:31px;
		font-size:26px;
		text-align:right;
		color:rgb(244,205,18);
	}
	#g-Lanskap-Baru-Bisnis-Kredit-Konsumer--Kartu-Kredit-vs-Paylater_-1-xlarge_5_copy {
		position:relative;
		overflow:hidden;
	}
	#g-Lanskap-Baru-Bisnis-Kredit-Konsumer--Kartu-Kredit-vs-Paylater_-1-xlarge_5_copy p {
		font-weight:700;
		line-height:32px;
		height:auto;
		opacity:1;
		letter-spacing:0em;
		font-size:26px;
		text-align:left;
		color:rgb(138,176,33);
		text-transform:none;
		padding-bottom:0;
		padding-top:0;
		mix-blend-mode:normal;
		font-style:normal;
		position:static;
	}
	#g-Lanskap-Baru-Bisnis-Kredit-Konsumer--Kartu-Kredit-vs-Paylater_-1-xlarge_5_copy .g-pstyle0 {
		height:32px;
		color:rgb(2,89,58);
	}
	#g-Lanskap-Baru-Bisnis-Kredit-Konsumer--Kartu-Kredit-vs-Paylater_-1-xlarge_5_copy .g-pstyle1 {
		line-height:52px;
		height:52px;
		font-size:43px;
		text-align:right;
		color:rgb(2,89,58);
	}
	#g-Lanskap-Baru-Bisnis-Kredit-Konsumer--Kartu-Kredit-vs-Paylater_-1-xlarge_5_copy .g-pstyle2 {
		height:32px;
		color:rgb(3,113,78);
	}
	#g-Lanskap-Baru-Bisnis-Kredit-Konsumer--Kartu-Kredit-vs-Paylater_-1-xlarge_5_copy .g-pstyle3 {
		line-height:52px;
		height:52px;
		font-size:43px;
		text-align:right;
		color:rgb(3,113,78);
	}
	#g-Lanskap-Baru-Bisnis-Kredit-Konsumer--Kartu-Kredit-vs-Paylater_-1-xlarge_5_copy .g-pstyle4 {
		height:32px;
		color:rgb(96,137,0);
	}
	#g-Lanskap-Baru-Bisnis-Kredit-Konsumer--Kartu-Kredit-vs-Paylater_-1-xlarge_5_copy .g-pstyle5 {
		line-height:52px;
		height:52px;
		font-size:43px;
		text-align:right;
		color:rgb(96,137,0);
	}
	#g-Lanskap-Baru-Bisnis-Kredit-Konsumer--Kartu-Kredit-vs-Paylater_-1-xlarge_5_copy .g-pstyle6 {
		height:32px;
	}
	#g-Lanskap-Baru-Bisnis-Kredit-Konsumer--Kartu-Kredit-vs-Paylater_-1-xlarge_5_copy .g-pstyle7 {
		line-height:52px;
		height:52px;
		font-size:43px;
		text-align:right;
	}
	#g-Lanskap-Baru-Bisnis-Kredit-Konsumer--Kartu-Kredit-vs-Paylater_-1-xlarge_5_copy .g-pstyle8 {
		line-height:52px;
		height:52px;
		font-size:43px;
		text-align:right;
		color:rgb(174,175,32);
	}
	#g-Lanskap-Baru-Bisnis-Kredit-Konsumer--Kartu-Kredit-vs-Paylater_-1-xlarge_5_copy .g-pstyle9 {
		height:32px;
		color:rgb(174,175,32);
	}
	#g-Lanskap-Baru-Bisnis-Kredit-Konsumer--Kartu-Kredit-vs-Paylater_-1-xlarge_5_copy .g-pstyle10 {
		height:32px;
		color:rgb(244,205,18);
	}
	#g-Lanskap-Baru-Bisnis-Kredit-Konsumer--Kartu-Kredit-vs-Paylater_-1-xlarge_5_copy .g-pstyle11 {
		line-height:52px;
		height:52px;
		font-size:43px;
		text-align:right;
		color:rgb(244,205,18);
	}
	#g-Lanskap-Baru-Bisnis-Kredit-Konsumer--Kartu-Kredit-vs-Paylater_-1-smallplus_5_copy_2 {
		position:relative;
		overflow:hidden;
	}
	#g-Lanskap-Baru-Bisnis-Kredit-Konsumer--Kartu-Kredit-vs-Paylater_-1-smallplus_5_copy_2 p {
		font-weight:700;
		line-height:13px;
		height:auto;
		opacity:1;
		letter-spacing:0em;
		font-size:11px;
		text-align:left;
		color:rgb(3,113,78);
		text-transform:none;
		padding-bottom:0;
		padding-top:0;
		mix-blend-mode:normal;
		font-style:normal;
		position:static;
	}
	#g-Lanskap-Baru-Bisnis-Kredit-Konsumer--Kartu-Kredit-vs-Paylater_-1-smallplus_5_copy_2 .g-pstyle0 {
		line-height:22px;
		height:22px;
		font-size:18px;
		text-align:center;
		color:rgb(2,89,58);
	}
	#g-Lanskap-Baru-Bisnis-Kredit-Konsumer--Kartu-Kredit-vs-Paylater_-1-smallplus_5_copy_2 .g-pstyle1 {
		height:13px;
		text-align:center;
		color:rgb(2,89,58);
	}
	#g-Lanskap-Baru-Bisnis-Kredit-Konsumer--Kartu-Kredit-vs-Paylater_-1-smallplus_5_copy_2 .g-pstyle2 {
		line-height:22px;
		height:22px;
		font-size:18px;
		text-align:center;
	}
	#g-Lanskap-Baru-Bisnis-Kredit-Konsumer--Kartu-Kredit-vs-Paylater_-1-smallplus_5_copy_2 .g-pstyle3 {
		height:13px;
		text-align:center;
	}
	#g-Lanskap-Baru-Bisnis-Kredit-Konsumer--Kartu-Kredit-vs-Paylater_-1-smallplus_5_copy_2 .g-pstyle4 {
		line-height:22px;
		height:22px;
		font-size:18px;
		text-align:center;
		color:rgb(138,176,33);
	}
	#g-Lanskap-Baru-Bisnis-Kredit-Konsumer--Kartu-Kredit-vs-Paylater_-1-smallplus_5_copy_2 .g-pstyle5 {
		height:13px;
		text-align:center;
		color:rgb(138,176,33);
	}
	#g-Lanskap-Baru-Bisnis-Kredit-Konsumer--Kartu-Kredit-vs-Paylater_-1-smallplus_5_copy_2 .g-pstyle6 {
		line-height:22px;
		height:22px;
		font-size:18px;
		text-align:center;
		color:rgb(244,205,19);
	}
	#g-Lanskap-Baru-Bisnis-Kredit-Konsumer--Kartu-Kredit-vs-Paylater_-1-smallplus_5_copy_2 .g-pstyle7 {
		height:13px;
		text-align:center;
		color:rgb(244,205,19);
	}
	#g-Lanskap-Baru-Bisnis-Kredit-Konsumer--Kartu-Kredit-vs-Paylater_-1-submedium_5_copy_2 {
		position:relative;
		overflow:hidden;
	}
	#g-Lanskap-Baru-Bisnis-Kredit-Konsumer--Kartu-Kredit-vs-Paylater_-1-submedium_5_copy_2 p {
		font-weight:700;
		line-height:17px;
		height:auto;
		opacity:1;
		letter-spacing:0em;
		font-size:15px;
		text-align:left;
		color:rgb(3,113,78);
		text-transform:none;
		padding-bottom:0;
		padding-top:0;
		mix-blend-mode:normal;
		font-style:normal;
		position:static;
	}
	#g-Lanskap-Baru-Bisnis-Kredit-Konsumer--Kartu-Kredit-vs-Paylater_-1-submedium_5_copy_2 .g-pstyle0 {
		line-height:29px;
		height:29px;
		font-size:24px;
		text-align:center;
		color:rgb(2,89,58);
	}
	#g-Lanskap-Baru-Bisnis-Kredit-Konsumer--Kartu-Kredit-vs-Paylater_-1-submedium_5_copy_2 .g-pstyle1 {
		height:17px;
		text-align:center;
		color:rgb(2,89,58);
	}
	#g-Lanskap-Baru-Bisnis-Kredit-Konsumer--Kartu-Kredit-vs-Paylater_-1-submedium_5_copy_2 .g-pstyle2 {
		line-height:29px;
		height:29px;
		font-size:24px;
		text-align:center;
	}
	#g-Lanskap-Baru-Bisnis-Kredit-Konsumer--Kartu-Kredit-vs-Paylater_-1-submedium_5_copy_2 .g-pstyle3 {
		height:17px;
		text-align:center;
	}
	#g-Lanskap-Baru-Bisnis-Kredit-Konsumer--Kartu-Kredit-vs-Paylater_-1-submedium_5_copy_2 .g-pstyle4 {
		line-height:29px;
		height:29px;
		font-size:24px;
		text-align:center;
		color:rgb(138,176,33);
	}
	#g-Lanskap-Baru-Bisnis-Kredit-Konsumer--Kartu-Kredit-vs-Paylater_-1-submedium_5_copy_2 .g-pstyle5 {
		height:17px;
		text-align:center;
		color:rgb(138,176,33);
	}
	#g-Lanskap-Baru-Bisnis-Kredit-Konsumer--Kartu-Kredit-vs-Paylater_-1-submedium_5_copy_2 .g-pstyle6 {
		line-height:29px;
		height:29px;
		font-size:24px;
		text-align:center;
		color:rgb(244,205,19);
	}
	#g-Lanskap-Baru-Bisnis-Kredit-Konsumer--Kartu-Kredit-vs-Paylater_-1-submedium_5_copy_2 .g-pstyle7 {
		height:17px;
		text-align:center;
		color:rgb(244,205,19);
	}
	#g-Lanskap-Baru-Bisnis-Kredit-Konsumer--Kartu-Kredit-vs-Paylater_-1-medium_5_copy_2 {
		position:relative;
		overflow:hidden;
	}
	#g-Lanskap-Baru-Bisnis-Kredit-Konsumer--Kartu-Kredit-vs-Paylater_-1-medium_5_copy_2 p {
		font-weight:700;
		line-height:22px;
		height:auto;
		opacity:1;
		letter-spacing:0em;
		font-size:18px;
		text-align:left;
		color:rgb(3,113,78);
		text-transform:none;
		padding-bottom:0;
		padding-top:0;
		mix-blend-mode:normal;
		font-style:normal;
		position:static;
	}
	#g-Lanskap-Baru-Bisnis-Kredit-Konsumer--Kartu-Kredit-vs-Paylater_-1-medium_5_copy_2 .g-pstyle0 {
		line-height:36px;
		height:36px;
		font-size:30px;
		text-align:center;
		color:rgb(2,89,58);
	}
	#g-Lanskap-Baru-Bisnis-Kredit-Konsumer--Kartu-Kredit-vs-Paylater_-1-medium_5_copy_2 .g-pstyle1 {
		height:22px;
		text-align:center;
		color:rgb(2,89,58);
	}
	#g-Lanskap-Baru-Bisnis-Kredit-Konsumer--Kartu-Kredit-vs-Paylater_-1-medium_5_copy_2 .g-pstyle2 {
		line-height:36px;
		height:36px;
		font-size:30px;
		text-align:center;
	}
	#g-Lanskap-Baru-Bisnis-Kredit-Konsumer--Kartu-Kredit-vs-Paylater_-1-medium_5_copy_2 .g-pstyle3 {
		height:22px;
		text-align:center;
	}
	#g-Lanskap-Baru-Bisnis-Kredit-Konsumer--Kartu-Kredit-vs-Paylater_-1-medium_5_copy_2 .g-pstyle4 {
		line-height:36px;
		height:36px;
		font-size:30px;
		text-align:center;
		color:rgb(138,176,33);
	}
	#g-Lanskap-Baru-Bisnis-Kredit-Konsumer--Kartu-Kredit-vs-Paylater_-1-medium_5_copy_2 .g-pstyle5 {
		height:22px;
		text-align:center;
		color:rgb(138,176,33);
	}
	#g-Lanskap-Baru-Bisnis-Kredit-Konsumer--Kartu-Kredit-vs-Paylater_-1-medium_5_copy_2 .g-pstyle6 {
		line-height:36px;
		height:36px;
		font-size:30px;
		text-align:center;
		color:rgb(244,205,19);
	}
	#g-Lanskap-Baru-Bisnis-Kredit-Konsumer--Kartu-Kredit-vs-Paylater_-1-medium_5_copy_2 .g-pstyle7 {
		height:22px;
		text-align:center;
		color:rgb(244,205,19);
	}
	#g-Lanskap-Baru-Bisnis-Kredit-Konsumer--Kartu-Kredit-vs-Paylater_-1-large_5_copy_2 {
		position:relative;
		overflow:hidden;
	}
	#g-Lanskap-Baru-Bisnis-Kredit-Konsumer--Kartu-Kredit-vs-Paylater_-1-large_5_copy_2 p {
		font-weight:700;
		line-height:24px;
		height:auto;
		opacity:1;
		letter-spacing:0em;
		font-size:20px;
		text-align:left;
		color:rgb(3,113,78);
		text-transform:none;
		padding-bottom:0;
		padding-top:0;
		mix-blend-mode:normal;
		font-style:normal;
		position:static;
	}
	#g-Lanskap-Baru-Bisnis-Kredit-Konsumer--Kartu-Kredit-vs-Paylater_-1-large_5_copy_2 .g-pstyle0 {
		line-height:39px;
		height:39px;
		font-size:32px;
		text-align:center;
		color:rgb(2,89,58);
	}
	#g-Lanskap-Baru-Bisnis-Kredit-Konsumer--Kartu-Kredit-vs-Paylater_-1-large_5_copy_2 .g-pstyle1 {
		height:24px;
		text-align:center;
		color:rgb(2,89,58);
	}
	#g-Lanskap-Baru-Bisnis-Kredit-Konsumer--Kartu-Kredit-vs-Paylater_-1-large_5_copy_2 .g-pstyle2 {
		line-height:39px;
		height:39px;
		font-size:32px;
		text-align:center;
		color:rgb(138,176,33);
	}
	#g-Lanskap-Baru-Bisnis-Kredit-Konsumer--Kartu-Kredit-vs-Paylater_-1-large_5_copy_2 .g-pstyle3 {
		line-height:39px;
		height:39px;
		font-size:32px;
		text-align:center;
	}
	#g-Lanskap-Baru-Bisnis-Kredit-Konsumer--Kartu-Kredit-vs-Paylater_-1-large_5_copy_2 .g-pstyle4 {
		height:24px;
		text-align:center;
	}
	#g-Lanskap-Baru-Bisnis-Kredit-Konsumer--Kartu-Kredit-vs-Paylater_-1-large_5_copy_2 .g-pstyle5 {
		height:24px;
		text-align:center;
		color:rgb(138,176,33);
	}
	#g-Lanskap-Baru-Bisnis-Kredit-Konsumer--Kartu-Kredit-vs-Paylater_-1-large_5_copy_2 .g-pstyle6 {
		line-height:39px;
		height:39px;
		font-size:32px;
		text-align:center;
		color:rgb(244,205,19);
	}
	#g-Lanskap-Baru-Bisnis-Kredit-Konsumer--Kartu-Kredit-vs-Paylater_-1-large_5_copy_2 .g-pstyle7 {
		height:24px;
		text-align:center;
		color:rgb(244,205,19);
	}
	#g-Lanskap-Baru-Bisnis-Kredit-Konsumer--Kartu-Kredit-vs-Paylater_-1-xlarge_5_copy_2 {
		position:relative;
		overflow:hidden;
	}
	#g-Lanskap-Baru-Bisnis-Kredit-Konsumer--Kartu-Kredit-vs-Paylater_-1-xlarge_5_copy_2 p {
		font-weight:700;
		line-height:29px;
		height:auto;
		opacity:1;
		letter-spacing:0em;
		font-size:24px;
		text-align:left;
		color:rgb(244,205,19);
		text-transform:none;
		padding-bottom:0;
		padding-top:0;
		mix-blend-mode:normal;
		font-style:normal;
		position:static;
	}
	#g-Lanskap-Baru-Bisnis-Kredit-Konsumer--Kartu-Kredit-vs-Paylater_-1-xlarge_5_copy_2 .g-pstyle0 {
		line-height:47px;
		height:47px;
		font-size:39px;
		text-align:center;
		color:rgb(2,89,58);
	}
	#g-Lanskap-Baru-Bisnis-Kredit-Konsumer--Kartu-Kredit-vs-Paylater_-1-xlarge_5_copy_2 .g-pstyle1 {
		line-height:47px;
		height:47px;
		font-size:39px;
		text-align:center;
		color:rgb(138,176,33);
	}
	#g-Lanskap-Baru-Bisnis-Kredit-Konsumer--Kartu-Kredit-vs-Paylater_-1-xlarge_5_copy_2 .g-pstyle2 {
		height:29px;
		text-align:center;
		color:rgb(138,176,33);
	}
	#g-Lanskap-Baru-Bisnis-Kredit-Konsumer--Kartu-Kredit-vs-Paylater_-1-xlarge_5_copy_2 .g-pstyle3 {
		height:29px;
		text-align:center;
		color:rgb(2,89,58);
	}
	#g-Lanskap-Baru-Bisnis-Kredit-Konsumer--Kartu-Kredit-vs-Paylater_-1-xlarge_5_copy_2 .g-pstyle4 {
		line-height:47px;
		height:47px;
		font-size:39px;
		text-align:center;
	}
	#g-Lanskap-Baru-Bisnis-Kredit-Konsumer--Kartu-Kredit-vs-Paylater_-1-xlarge_5_copy_2 .g-pstyle5 {
		line-height:47px;
		height:47px;
		font-size:39px;
		text-align:center;
		color:rgb(3,113,78);
	}
	#g-Lanskap-Baru-Bisnis-Kredit-Konsumer--Kartu-Kredit-vs-Paylater_-1-xlarge_5_copy_2 .g-pstyle6 {
		height:29px;
		text-align:center;
	}
	#g-Lanskap-Baru-Bisnis-Kredit-Konsumer--Kartu-Kredit-vs-Paylater_-1-xlarge_5_copy_2 .g-pstyle7 {
		height:29px;
		text-align:center;
		color:rgb(3,113,78);
	}

	@media only screen and (max-width:509px) {
		#g-Lanskap-Baru-Bisnis-Kredit-Konsumer--Kartu-Kredit-vs-Paylater_-1-cover_xlarge_5,
		#g-Lanskap-Baru-Bisnis-Kredit-Konsumer--Kartu-Kredit-vs-Paylater_-1-xlarge_1,
		#g-Lanskap-Baru-Bisnis-Kredit-Konsumer--Kartu-Kredit-vs-Paylater_-1-xlarge_2,
		#g-Lanskap-Baru-Bisnis-Kredit-Konsumer--Kartu-Kredit-vs-Paylater_-1-xlarge_3,
		#g-Lanskap-Baru-Bisnis-Kredit-Konsumer--Kartu-Kredit-vs-Paylater_-1-xlarge_4,
		#g-Lanskap-Baru-Bisnis-Kredit-Konsumer--Kartu-Kredit-vs-Paylater_-1-xlarge_5,
		#g-Lanskap-Baru-Bisnis-Kredit-Konsumer--Kartu-Kredit-vs-Paylater_-1-xlarge_5_copy,
		#g-Lanskap-Baru-Bisnis-Kredit-Konsumer--Kartu-Kredit-vs-Paylater_-1-xlarge_5_copy_2 {
			display:none;
		}

		#g-Lanskap-Baru-Bisnis-Kredit-Konsumer--Kartu-Kredit-vs-Paylater_-1-cover_large,
		#g-Lanskap-Baru-Bisnis-Kredit-Konsumer--Kartu-Kredit-vs-Paylater_-1-large_1,
		#g-Lanskap-Baru-Bisnis-Kredit-Konsumer--Kartu-Kredit-vs-Paylater_-1-large_2,
		#g-Lanskap-Baru-Bisnis-Kredit-Konsumer--Kartu-Kredit-vs-Paylater_-1-large_3,
		#g-Lanskap-Baru-Bisnis-Kredit-Konsumer--Kartu-Kredit-vs-Paylater_-1-large_4,
		#g-Lanskap-Baru-Bisnis-Kredit-Konsumer--Kartu-Kredit-vs-Paylater_-1-large_5,
		#g-Lanskap-Baru-Bisnis-Kredit-Konsumer--Kartu-Kredit-vs-Paylater_-1-large_5_copy,
		#g-Lanskap-Baru-Bisnis-Kredit-Konsumer--Kartu-Kredit-vs-Paylater_-1-large_5_copy_2  {
			display:none;
		}

		#g-Lanskap-Baru-Bisnis-Kredit-Konsumer--Kartu-Kredit-vs-Paylater_-1-cover_medium,
		#g-Lanskap-Baru-Bisnis-Kredit-Konsumer--Kartu-Kredit-vs-Paylater_-1-medium_1,
		#g-Lanskap-Baru-Bisnis-Kredit-Konsumer--Kartu-Kredit-vs-Paylater_-1-medium_2,
		#g-Lanskap-Baru-Bisnis-Kredit-Konsumer--Kartu-Kredit-vs-Paylater_-1-medium_3,
		#g-Lanskap-Baru-Bisnis-Kredit-Konsumer--Kartu-Kredit-vs-Paylater_-1-medium_4,
		#g-Lanskap-Baru-Bisnis-Kredit-Konsumer--Kartu-Kredit-vs-Paylater_-1-medium_5,
		#g-Lanskap-Baru-Bisnis-Kredit-Konsumer--Kartu-Kredit-vs-Paylater_-1-medium_5_copy,
		#g-Lanskap-Baru-Bisnis-Kredit-Konsumer--Kartu-Kredit-vs-Paylater_-1-medium_5_copy_2 {
			display:none;
		}

		#g-Lanskap-Baru-Bisnis-Kredit-Konsumer--Kartu-Kredit-vs-Paylater_-1-cover_submedium,
		#g-Lanskap-Baru-Bisnis-Kredit-Konsumer--Kartu-Kredit-vs-Paylater_-1-submedium_1,
		#g-Lanskap-Baru-Bisnis-Kredit-Konsumer--Kartu-Kredit-vs-Paylater_-1-submedium_2,
		#g-Lanskap-Baru-Bisnis-Kredit-Konsumer--Kartu-Kredit-vs-Paylater_-1-submedium_3,
		#g-Lanskap-Baru-Bisnis-Kredit-Konsumer--Kartu-Kredit-vs-Paylater_-1-submedium_4,
		#g-Lanskap-Baru-Bisnis-Kredit-Konsumer--Kartu-Kredit-vs-Paylater_-1-submedium_5,
		#g-Lanskap-Baru-Bisnis-Kredit-Konsumer--Kartu-Kredit-vs-Paylater_-1-submedium_5_copy,
		#g-Lanskap-Baru-Bisnis-Kredit-Konsumer--Kartu-Kredit-vs-Paylater_-1-submedium_5_copy_2  {
			display:none;
		}

		#g-Lanskap-Baru-Bisnis-Kredit-Konsumer--Kartu-Kredit-vs-Paylater_-1-cover_smallplus,
		#g-Lanskap-Baru-Bisnis-Kredit-Konsumer--Kartu-Kredit-vs-Paylater_-1-smallplus_1,
		#g-Lanskap-Baru-Bisnis-Kredit-Konsumer--Kartu-Kredit-vs-Paylater_-1-smallplus_2,
		#g-Lanskap-Baru-Bisnis-Kredit-Konsumer--Kartu-Kredit-vs-Paylater_-1-smallplus_3,
		#g-Lanskap-Baru-Bisnis-Kredit-Konsumer--Kartu-Kredit-vs-Paylater_-1-smallplus_4,
		#g-Lanskap-Baru-Bisnis-Kredit-Konsumer--Kartu-Kredit-vs-Paylater_-1-smallplus_5,
		#g-Lanskap-Baru-Bisnis-Kredit-Konsumer--Kartu-Kredit-vs-Paylater_-1-smallplus_5_copy,
		#g-Lanskap-Baru-Bisnis-Kredit-Konsumer--Kartu-Kredit-vs-Paylater_-1-smallplus_5_copy_2 {
			display:block;
		}
	}

	@media only screen and (min-width:510px) and (max-width:689px) {
		#g-Lanskap-Baru-Bisnis-Kredit-Konsumer--Kartu-Kredit-vs-Paylater_-1-cover_xlarge_5,
		#g-Lanskap-Baru-Bisnis-Kredit-Konsumer--Kartu-Kredit-vs-Paylater_-1-xlarge_1,
		#g-Lanskap-Baru-Bisnis-Kredit-Konsumer--Kartu-Kredit-vs-Paylater_-1-xlarge_2,
		#g-Lanskap-Baru-Bisnis-Kredit-Konsumer--Kartu-Kredit-vs-Paylater_-1-xlarge_3,
		#g-Lanskap-Baru-Bisnis-Kredit-Konsumer--Kartu-Kredit-vs-Paylater_-1-xlarge_4,
		#g-Lanskap-Baru-Bisnis-Kredit-Konsumer--Kartu-Kredit-vs-Paylater_-1-xlarge_5,
		#g-Lanskap-Baru-Bisnis-Kredit-Konsumer--Kartu-Kredit-vs-Paylater_-1-xlarge_5_copy,
		#g-Lanskap-Baru-Bisnis-Kredit-Konsumer--Kartu-Kredit-vs-Paylater_-1-xlarge_5_copy_2 {
			display:none;
		}

		#g-Lanskap-Baru-Bisnis-Kredit-Konsumer--Kartu-Kredit-vs-Paylater_-1-cover_large,
		#g-Lanskap-Baru-Bisnis-Kredit-Konsumer--Kartu-Kredit-vs-Paylater_-1-large_1,
		#g-Lanskap-Baru-Bisnis-Kredit-Konsumer--Kartu-Kredit-vs-Paylater_-1-large_2,
		#g-Lanskap-Baru-Bisnis-Kredit-Konsumer--Kartu-Kredit-vs-Paylater_-1-large_3,
		#g-Lanskap-Baru-Bisnis-Kredit-Konsumer--Kartu-Kredit-vs-Paylater_-1-large_4,
		#g-Lanskap-Baru-Bisnis-Kredit-Konsumer--Kartu-Kredit-vs-Paylater_-1-large_5,
		#g-Lanskap-Baru-Bisnis-Kredit-Konsumer--Kartu-Kredit-vs-Paylater_-1-large_5_copy,
		#g-Lanskap-Baru-Bisnis-Kredit-Konsumer--Kartu-Kredit-vs-Paylater_-1-large_5_copy_2  {
			display:none;
		}

		#g-Lanskap-Baru-Bisnis-Kredit-Konsumer--Kartu-Kredit-vs-Paylater_-1-cover_medium,
		#g-Lanskap-Baru-Bisnis-Kredit-Konsumer--Kartu-Kredit-vs-Paylater_-1-medium_1,
		#g-Lanskap-Baru-Bisnis-Kredit-Konsumer--Kartu-Kredit-vs-Paylater_-1-medium_2,
		#g-Lanskap-Baru-Bisnis-Kredit-Konsumer--Kartu-Kredit-vs-Paylater_-1-medium_3,
		#g-Lanskap-Baru-Bisnis-Kredit-Konsumer--Kartu-Kredit-vs-Paylater_-1-medium_4,
		#g-Lanskap-Baru-Bisnis-Kredit-Konsumer--Kartu-Kredit-vs-Paylater_-1-medium_5,
		#g-Lanskap-Baru-Bisnis-Kredit-Konsumer--Kartu-Kredit-vs-Paylater_-1-medium_5_copy,
		#g-Lanskap-Baru-Bisnis-Kredit-Konsumer--Kartu-Kredit-vs-Paylater_-1-medium_5_copy_2  {
			display:none;
		}

		#g-Lanskap-Baru-Bisnis-Kredit-Konsumer--Kartu-Kredit-vs-Paylater_-1-cover_submedium,
		#g-Lanskap-Baru-Bisnis-Kredit-Konsumer--Kartu-Kredit-vs-Paylater_-1-submedium_1,
		#g-Lanskap-Baru-Bisnis-Kredit-Konsumer--Kartu-Kredit-vs-Paylater_-1-submedium_2,
		#g-Lanskap-Baru-Bisnis-Kredit-Konsumer--Kartu-Kredit-vs-Paylater_-1-submedium_3,
		#g-Lanskap-Baru-Bisnis-Kredit-Konsumer--Kartu-Kredit-vs-Paylater_-1-submedium_4,
		#g-Lanskap-Baru-Bisnis-Kredit-Konsumer--Kartu-Kredit-vs-Paylater_-1-submedium_5,
		#g-Lanskap-Baru-Bisnis-Kredit-Konsumer--Kartu-Kredit-vs-Paylater_-1-submedium_5_copy,
		#g-Lanskap-Baru-Bisnis-Kredit-Konsumer--Kartu-Kredit-vs-Paylater_-1-submedium_5_copy_2 {
			display:block;
		}

		#g-Lanskap-Baru-Bisnis-Kredit-Konsumer--Kartu-Kredit-vs-Paylater_-1-cover_smallplus,
		#g-Lanskap-Baru-Bisnis-Kredit-Konsumer--Kartu-Kredit-vs-Paylater_-1-smallplus_1,
		#g-Lanskap-Baru-Bisnis-Kredit-Konsumer--Kartu-Kredit-vs-Paylater_-1-smallplus_2,
		#g-Lanskap-Baru-Bisnis-Kredit-Konsumer--Kartu-Kredit-vs-Paylater_-1-smallplus_3,
		#g-Lanskap-Baru-Bisnis-Kredit-Konsumer--Kartu-Kredit-vs-Paylater_-1-smallplus_4,
		#g-Lanskap-Baru-Bisnis-Kredit-Konsumer--Kartu-Kredit-vs-Paylater_-1-smallplus_5,
		#g-Lanskap-Baru-Bisnis-Kredit-Konsumer--Kartu-Kredit-vs-Paylater_-1-smallplus_5_copy,
		#g-Lanskap-Baru-Bisnis-Kredit-Konsumer--Kartu-Kredit-vs-Paylater_-1-smallplus_5_copy_2 
		 {
			display:none;
		}
	}

	@media only screen and (min-width:690px) and (max-width:919px) {
		#g-Lanskap-Baru-Bisnis-Kredit-Konsumer--Kartu-Kredit-vs-Paylater_-1-cover_xlarge_5,
		#g-Lanskap-Baru-Bisnis-Kredit-Konsumer--Kartu-Kredit-vs-Paylater_-1-xlarge_1,
		#g-Lanskap-Baru-Bisnis-Kredit-Konsumer--Kartu-Kredit-vs-Paylater_-1-xlarge_2,
		#g-Lanskap-Baru-Bisnis-Kredit-Konsumer--Kartu-Kredit-vs-Paylater_-1-xlarge_3,
		#g-Lanskap-Baru-Bisnis-Kredit-Konsumer--Kartu-Kredit-vs-Paylater_-1-xlarge_4,
		#g-Lanskap-Baru-Bisnis-Kredit-Konsumer--Kartu-Kredit-vs-Paylater_-1-xlarge_5,
		#g-Lanskap-Baru-Bisnis-Kredit-Konsumer--Kartu-Kredit-vs-Paylater_-1-xlarge_5_copy,
		#g-Lanskap-Baru-Bisnis-Kredit-Konsumer--Kartu-Kredit-vs-Paylater_-1-xlarge_5_copy_2 
		 {
			display:none;
		}

		#g-Lanskap-Baru-Bisnis-Kredit-Konsumer--Kartu-Kredit-vs-Paylater_-1-cover_large,
		#g-Lanskap-Baru-Bisnis-Kredit-Konsumer--Kartu-Kredit-vs-Paylater_-1-large_1,
		#g-Lanskap-Baru-Bisnis-Kredit-Konsumer--Kartu-Kredit-vs-Paylater_-1-large_2,
		#g-Lanskap-Baru-Bisnis-Kredit-Konsumer--Kartu-Kredit-vs-Paylater_-1-large_3,
		#g-Lanskap-Baru-Bisnis-Kredit-Konsumer--Kartu-Kredit-vs-Paylater_-1-large_4,
		#g-Lanskap-Baru-Bisnis-Kredit-Konsumer--Kartu-Kredit-vs-Paylater_-1-large_5,
		#g-Lanskap-Baru-Bisnis-Kredit-Konsumer--Kartu-Kredit-vs-Paylater_-1-large_5_copy,
		#g-Lanskap-Baru-Bisnis-Kredit-Konsumer--Kartu-Kredit-vs-Paylater_-1-large_5_copy_2 
		 {
			display:none;
		}

		#g-Lanskap-Baru-Bisnis-Kredit-Konsumer--Kartu-Kredit-vs-Paylater_-1-cover_medium,
		#g-Lanskap-Baru-Bisnis-Kredit-Konsumer--Kartu-Kredit-vs-Paylater_-1-medium_1,
		#g-Lanskap-Baru-Bisnis-Kredit-Konsumer--Kartu-Kredit-vs-Paylater_-1-medium_2,
		#g-Lanskap-Baru-Bisnis-Kredit-Konsumer--Kartu-Kredit-vs-Paylater_-1-medium_3,
		#g-Lanskap-Baru-Bisnis-Kredit-Konsumer--Kartu-Kredit-vs-Paylater_-1-medium_4,
		#g-Lanskap-Baru-Bisnis-Kredit-Konsumer--Kartu-Kredit-vs-Paylater_-1-medium_5,
		#g-Lanskap-Baru-Bisnis-Kredit-Konsumer--Kartu-Kredit-vs-Paylater_-1-medium_5_copy,
		#g-Lanskap-Baru-Bisnis-Kredit-Konsumer--Kartu-Kredit-vs-Paylater_-1-medium_5_copy_2 
		{
			display:block;
		}

		#g-Lanskap-Baru-Bisnis-Kredit-Konsumer--Kartu-Kredit-vs-Paylater_-1-cover_submedium,
		#g-Lanskap-Baru-Bisnis-Kredit-Konsumer--Kartu-Kredit-vs-Paylater_-1-submedium_1,
		#g-Lanskap-Baru-Bisnis-Kredit-Konsumer--Kartu-Kredit-vs-Paylater_-1-submedium_2,
		#g-Lanskap-Baru-Bisnis-Kredit-Konsumer--Kartu-Kredit-vs-Paylater_-1-submedium_3,
		#g-Lanskap-Baru-Bisnis-Kredit-Konsumer--Kartu-Kredit-vs-Paylater_-1-submedium_4,
		#g-Lanskap-Baru-Bisnis-Kredit-Konsumer--Kartu-Kredit-vs-Paylater_-1-submedium_5,
		#g-Lanskap-Baru-Bisnis-Kredit-Konsumer--Kartu-Kredit-vs-Paylater_-1-submedium_5_copy,
		#g-Lanskap-Baru-Bisnis-Kredit-Konsumer--Kartu-Kredit-vs-Paylater_-1-submedium_5_copy_2 
		 {
			display:none;
		}

		#g-Lanskap-Baru-Bisnis-Kredit-Konsumer--Kartu-Kredit-vs-Paylater_-1-cover_smallplus,
		#g-Lanskap-Baru-Bisnis-Kredit-Konsumer--Kartu-Kredit-vs-Paylater_-1-smallplus_1,
		#g-Lanskap-Baru-Bisnis-Kredit-Konsumer--Kartu-Kredit-vs-Paylater_-1-smallplus_2,
		#g-Lanskap-Baru-Bisnis-Kredit-Konsumer--Kartu-Kredit-vs-Paylater_-1-smallplus_3,
		#g-Lanskap-Baru-Bisnis-Kredit-Konsumer--Kartu-Kredit-vs-Paylater_-1-smallplus_4,
		#g-Lanskap-Baru-Bisnis-Kredit-Konsumer--Kartu-Kredit-vs-Paylater_-1-smallplus_5,
		#g-Lanskap-Baru-Bisnis-Kredit-Konsumer--Kartu-Kredit-vs-Paylater_-1-smallplus_5_copy,
		#g-Lanskap-Baru-Bisnis-Kredit-Konsumer--Kartu-Kredit-vs-Paylater_-1-smallplus_5_copy_2 
		 {
			display:none;
		}
	}

	@media only screen and (min-width:920px) and (max-width:1399px) {
		#g-Lanskap-Baru-Bisnis-Kredit-Konsumer--Kartu-Kredit-vs-Paylater_-1-cover_xlarge_5,
		#g-Lanskap-Baru-Bisnis-Kredit-Konsumer--Kartu-Kredit-vs-Paylater_-1-xlarge_1,
		#g-Lanskap-Baru-Bisnis-Kredit-Konsumer--Kartu-Kredit-vs-Paylater_-1-xlarge_2,
		#g-Lanskap-Baru-Bisnis-Kredit-Konsumer--Kartu-Kredit-vs-Paylater_-1-xlarge_3,
		#g-Lanskap-Baru-Bisnis-Kredit-Konsumer--Kartu-Kredit-vs-Paylater_-1-xlarge_4,
		#g-Lanskap-Baru-Bisnis-Kredit-Konsumer--Kartu-Kredit-vs-Paylater_-1-xlarge_5,
		#g-Lanskap-Baru-Bisnis-Kredit-Konsumer--Kartu-Kredit-vs-Paylater_-1-xlarge_5_copy,
		#g-Lanskap-Baru-Bisnis-Kredit-Konsumer--Kartu-Kredit-vs-Paylater_-1-xlarge_5_copy_2 
		{
			display:none;
		}

		#g-Lanskap-Baru-Bisnis-Kredit-Konsumer--Kartu-Kredit-vs-Paylater_-1-cover_large,
		#g-Lanskap-Baru-Bisnis-Kredit-Konsumer--Kartu-Kredit-vs-Paylater_-1-large_1,
		#g-Lanskap-Baru-Bisnis-Kredit-Konsumer--Kartu-Kredit-vs-Paylater_-1-large_2,
		#g-Lanskap-Baru-Bisnis-Kredit-Konsumer--Kartu-Kredit-vs-Paylater_-1-large_3,
		#g-Lanskap-Baru-Bisnis-Kredit-Konsumer--Kartu-Kredit-vs-Paylater_-1-large_4,
		#g-Lanskap-Baru-Bisnis-Kredit-Konsumer--Kartu-Kredit-vs-Paylater_-1-large_5,
		#g-Lanskap-Baru-Bisnis-Kredit-Konsumer--Kartu-Kredit-vs-Paylater_-1-large_5_copy,
		#g-Lanskap-Baru-Bisnis-Kredit-Konsumer--Kartu-Kredit-vs-Paylater_-1-large_5_copy_2 
		 {
			display:block;
		}

		#g-Lanskap-Baru-Bisnis-Kredit-Konsumer--Kartu-Kredit-vs-Paylater_-1-cover_medium,
		#g-Lanskap-Baru-Bisnis-Kredit-Konsumer--Kartu-Kredit-vs-Paylater_-1-medium_1,
		#g-Lanskap-Baru-Bisnis-Kredit-Konsumer--Kartu-Kredit-vs-Paylater_-1-medium_2,
		#g-Lanskap-Baru-Bisnis-Kredit-Konsumer--Kartu-Kredit-vs-Paylater_-1-medium_3,
		#g-Lanskap-Baru-Bisnis-Kredit-Konsumer--Kartu-Kredit-vs-Paylater_-1-medium_4,
		#g-Lanskap-Baru-Bisnis-Kredit-Konsumer--Kartu-Kredit-vs-Paylater_-1-medium_5,
		#g-Lanskap-Baru-Bisnis-Kredit-Konsumer--Kartu-Kredit-vs-Paylater_-1-medium_5_copy,
		#g-Lanskap-Baru-Bisnis-Kredit-Konsumer--Kartu-Kredit-vs-Paylater_-1-medium_5_copy_2 
		{
			display:none;
		}

		#g-Lanskap-Baru-Bisnis-Kredit-Konsumer--Kartu-Kredit-vs-Paylater_-1-cover_submedium,
		#g-Lanskap-Baru-Bisnis-Kredit-Konsumer--Kartu-Kredit-vs-Paylater_-1-submedium_1,
		#g-Lanskap-Baru-Bisnis-Kredit-Konsumer--Kartu-Kredit-vs-Paylater_-1-submedium_2,
		#g-Lanskap-Baru-Bisnis-Kredit-Konsumer--Kartu-Kredit-vs-Paylater_-1-submedium_3,
		#g-Lanskap-Baru-Bisnis-Kredit-Konsumer--Kartu-Kredit-vs-Paylater_-1-submedium_4,
		#g-Lanskap-Baru-Bisnis-Kredit-Konsumer--Kartu-Kredit-vs-Paylater_-1-submedium_5,
		#g-Lanskap-Baru-Bisnis-Kredit-Konsumer--Kartu-Kredit-vs-Paylater_-1-submedium_5_copy,
		#g-Lanskap-Baru-Bisnis-Kredit-Konsumer--Kartu-Kredit-vs-Paylater_-1-submedium_5_copy_2 
		 {
			display:none;
		}

		#g-Lanskap-Baru-Bisnis-Kredit-Konsumer--Kartu-Kredit-vs-Paylater_-1-cover_smallplus,
		#g-Lanskap-Baru-Bisnis-Kredit-Konsumer--Kartu-Kredit-vs-Paylater_-1-smallplus_1,
		#g-Lanskap-Baru-Bisnis-Kredit-Konsumer--Kartu-Kredit-vs-Paylater_-1-smallplus_2,
		#g-Lanskap-Baru-Bisnis-Kredit-Konsumer--Kartu-Kredit-vs-Paylater_-1-smallplus_3,
		#g-Lanskap-Baru-Bisnis-Kredit-Konsumer--Kartu-Kredit-vs-Paylater_-1-smallplus_4,
		#g-Lanskap-Baru-Bisnis-Kredit-Konsumer--Kartu-Kredit-vs-Paylater_-1-smallplus_5,
		#g-Lanskap-Baru-Bisnis-Kredit-Konsumer--Kartu-Kredit-vs-Paylater_-1-smallplus_5_copy,
		#g-Lanskap-Baru-Bisnis-Kredit-Konsumer--Kartu-Kredit-vs-Paylater_-1-smallplus_5_copy_2 
		 {
			display:none;
		}
	}

	@media only screen and (min-width:1400px) {
		#g-Lanskap-Baru-Bisnis-Kredit-Konsumer--Kartu-Kredit-vs-Paylater_-1-cover_xlarge_5,
		#g-Lanskap-Baru-Bisnis-Kredit-Konsumer--Kartu-Kredit-vs-Paylater_-1-xlarge_1,
		#g-Lanskap-Baru-Bisnis-Kredit-Konsumer--Kartu-Kredit-vs-Paylater_-1-xlarge_2,
		#g-Lanskap-Baru-Bisnis-Kredit-Konsumer--Kartu-Kredit-vs-Paylater_-1-xlarge_3,
		#g-Lanskap-Baru-Bisnis-Kredit-Konsumer--Kartu-Kredit-vs-Paylater_-1-xlarge_4,
		#g-Lanskap-Baru-Bisnis-Kredit-Konsumer--Kartu-Kredit-vs-Paylater_-1-xlarge_5,
		#g-Lanskap-Baru-Bisnis-Kredit-Konsumer--Kartu-Kredit-vs-Paylater_-1-xlarge_5_copy,
		#g-Lanskap-Baru-Bisnis-Kredit-Konsumer--Kartu-Kredit-vs-Paylater_-1-xlarge_5_copy_2  {
			display:block;
		}

		#g-Lanskap-Baru-Bisnis-Kredit-Konsumer--Kartu-Kredit-vs-Paylater_-1-cover_large,
		#g-Lanskap-Baru-Bisnis-Kredit-Konsumer--Kartu-Kredit-vs-Paylater_-1-large_1,
		#g-Lanskap-Baru-Bisnis-Kredit-Konsumer--Kartu-Kredit-vs-Paylater_-1-large_2,
		#g-Lanskap-Baru-Bisnis-Kredit-Konsumer--Kartu-Kredit-vs-Paylater_-1-large_3,
		#g-Lanskap-Baru-Bisnis-Kredit-Konsumer--Kartu-Kredit-vs-Paylater_-1-large_4,
		#g-Lanskap-Baru-Bisnis-Kredit-Konsumer--Kartu-Kredit-vs-Paylater_-1-large_5,
		#g-Lanskap-Baru-Bisnis-Kredit-Konsumer--Kartu-Kredit-vs-Paylater_-1-large_5_copy,
		#g-Lanskap-Baru-Bisnis-Kredit-Konsumer--Kartu-Kredit-vs-Paylater_-1-large_5_copy_2 {
			display:none;
		}

		#g-Lanskap-Baru-Bisnis-Kredit-Konsumer--Kartu-Kredit-vs-Paylater_-1-cover_medium,
		#g-Lanskap-Baru-Bisnis-Kredit-Konsumer--Kartu-Kredit-vs-Paylater_-1-medium_1,
		#g-Lanskap-Baru-Bisnis-Kredit-Konsumer--Kartu-Kredit-vs-Paylater_-1-medium_2,
		#g-Lanskap-Baru-Bisnis-Kredit-Konsumer--Kartu-Kredit-vs-Paylater_-1-medium_3,
		#g-Lanskap-Baru-Bisnis-Kredit-Konsumer--Kartu-Kredit-vs-Paylater_-1-medium_4,
		#g-Lanskap-Baru-Bisnis-Kredit-Konsumer--Kartu-Kredit-vs-Paylater_-1-medium_5,
		#g-Lanskap-Baru-Bisnis-Kredit-Konsumer--Kartu-Kredit-vs-Paylater_-1-medium_5_copy,
		#g-Lanskap-Baru-Bisnis-Kredit-Konsumer--Kartu-Kredit-vs-Paylater_-1-medium_5_copy_2  {
			display:none;
		}

		#g-Lanskap-Baru-Bisnis-Kredit-Konsumer--Kartu-Kredit-vs-Paylater_-1-cover_submedium,
		#g-Lanskap-Baru-Bisnis-Kredit-Konsumer--Kartu-Kredit-vs-Paylater_-1-submedium_1,
		#g-Lanskap-Baru-Bisnis-Kredit-Konsumer--Kartu-Kredit-vs-Paylater_-1-submedium_2,
		#g-Lanskap-Baru-Bisnis-Kredit-Konsumer--Kartu-Kredit-vs-Paylater_-1-submedium_3,
		#g-Lanskap-Baru-Bisnis-Kredit-Konsumer--Kartu-Kredit-vs-Paylater_-1-submedium_4,
		#g-Lanskap-Baru-Bisnis-Kredit-Konsumer--Kartu-Kredit-vs-Paylater_-1-submedium_5,
		#g-Lanskap-Baru-Bisnis-Kredit-Konsumer--Kartu-Kredit-vs-Paylater_-1-submedium_5_copy,
		#g-Lanskap-Baru-Bisnis-Kredit-Konsumer--Kartu-Kredit-vs-Paylater_-1-submedium_5_copy_2 {
			display:none;
		}

		#g-Lanskap-Baru-Bisnis-Kredit-Konsumer--Kartu-Kredit-vs-Paylater_-1-cover_smallplus,
		#g-Lanskap-Baru-Bisnis-Kredit-Konsumer--Kartu-Kredit-vs-Paylater_-1-smallplus_1,
		#g-Lanskap-Baru-Bisnis-Kredit-Konsumer--Kartu-Kredit-vs-Paylater_-1-smallplus_2,
		#g-Lanskap-Baru-Bisnis-Kredit-Konsumer--Kartu-Kredit-vs-Paylater_-1-smallplus_3,
		#g-Lanskap-Baru-Bisnis-Kredit-Konsumer--Kartu-Kredit-vs-Paylater_-1-smallplus_4,
		#g-Lanskap-Baru-Bisnis-Kredit-Konsumer--Kartu-Kredit-vs-Paylater_-1-smallplus_5,
		#g-Lanskap-Baru-Bisnis-Kredit-Konsumer--Kartu-Kredit-vs-Paylater_-1-smallplus_5_copy,
		#g-Lanskap-Baru-Bisnis-Kredit-Konsumer--Kartu-Kredit-vs-Paylater_-1-smallplus_5_copy_2  {
			display:none;
		}
	}

</style>