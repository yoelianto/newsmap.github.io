<script>
	import Head from './Head.svelte';
	import Header from './Header.svelte';
	import Paragraph from './Paragraph.svelte';
	import Quote from './Quote.svelte';
	import Image from './Image.svelte';
	import Credit from './Credit.svelte';
	import Foot from './Foot.svelte'

	//Main Font
	let fontfamily1 = "Roboto Mono"

	//Main Color
	let fontColor = '#f9f9e1'

	//Secondary Dark Color
	let colorBrandDarkBlue = "#242053"

	// scroller
	import Scroller from '@sveltejs/svelte-scroller';
	// scroller variables
	let count, index, offset, progress;
	let top = 0;
	let threshold = 0.5;
	let bottom = 1;

	// styling variables
	let mainBackground='#ffe7aa'	
	let headerBackground='#761fff'
	let titleColor='hsla(356, 80%, 65%, 1)'
	let subtitleColor='black'
	let subheadColor='black'

	let subhead = ['“Bapak pergi ke kantor. Ibu pergi ke pasar” adalah kalimat standar yang sering saya temui di buku pelajaran sekolah. Namun 12 tahun setelahnya, ternyata peran gender tersebut berubah: ibu pergi ke kantor, bapak mengurus rumah.',
	'<br>',
	'Ada apa gerangan?']

	let height

	let credit =[{
		role : 'Penulis',
		name : 'Ann Putri'
		}]

</script>

<svelte:head>
	<meta
		name='viewport' 
		content='width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0'
	/>
	
	<link rel="preconnect" href="https://fonts.googleapis.com">
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
	<link href="https://fonts.googleapis.com/css2?family=Koulen&display=swap" rel="stylesheet">
</svelte:head>

<main style="background-color: {mainBackground}">
	<div class="headerilustrasi" style="padding-top:3rem;background-color:{titleColor}">
		<div id="g-Bapak-Rumah-Tangga_19-box" class="ai2html">
			<!-- Artboard: smallplus-cover -->
			<div id="g-Bapak-Rumah-Tangga_19-smallplus-cover" class="g-artboard" style="max-width: 509px;max-height: 509px" data-aspect-ratio="1" data-min-width="0" data-max-width="509">
			<div style="padding: 0 0 100% 0;"></div>
			<img id="g-Bapak-Rumah-Tangga_19-smallplus-cover-img" class="g-aiImg" alt="" src="./images/Bapak-Rumah-Tangga_19-smallplus-cover.png"/>
			</div>

			<!-- Artboard: submedium-cover -->
			<div id="g-Bapak-Rumah-Tangga_19-submedium-cover" class="g-artboard" style="min-width: 510px;max-width: 689px;max-height: 432px" data-aspect-ratio="1.594" data-min-width="510" data-max-width="689">
			<div style="padding: 0 0 62.7451% 0;"></div>
			<img id="g-Bapak-Rumah-Tangga_19-submedium-cover-img" class="g-aiImg" alt="" src="./images/Bapak-Rumah-Tangga_19-submedium-cover.png"/>
			</div>

			<!-- Artboard: medium-cover -->
			<div id="g-Bapak-Rumah-Tangga_19-medium-cover" class="g-artboard" style="min-width: 690px;max-width: 919px;max-height: 426px" data-aspect-ratio="2.156" data-min-width="690" data-max-width="919">
			<div style="padding: 0 0 46.3768% 0;"></div>
			<img id="g-Bapak-Rumah-Tangga_19-medium-cover-img" class="g-aiImg" alt="" src="./images/Bapak-Rumah-Tangga_19-medium-cover.png"/>
			</div>

			<!-- Artboard: large-cover -->
			<div id="g-Bapak-Rumah-Tangga_19-large-cover" class="g-artboard" style="min-width: 920px;max-width: 1399px;max-height: 485px" data-aspect-ratio="2.884" data-min-width="920" data-max-width="1399">
			<div style="padding: 0 0 34.6739% 0;"></div>
			<img id="g-Bapak-Rumah-Tangga_19-large-cover-img" class="g-aiImg" alt="" src="./images/Bapak-Rumah-Tangga_19-large-cover.png"/>
			</div>

			<!-- Artboard: xlarge-cover -->
			<div id="g-Bapak-Rumah-Tangga_19-xlarge-cover" class="g-artboard" style="min-width: 1400px;" data-aspect-ratio="4.466" data-min-width="1400">
			<div style="padding: 0 0 22.3929% 0;"></div>
			<img id="g-Bapak-Rumah-Tangga_19-xlarge-cover-img" class="g-aiImg" alt="" src="./images/Bapak-Rumah-Tangga_19-xlarge-cover.png"/>
			</div>
		</div>
	</div>	
	

	<Header 
		--headerBackground={headerBackground}
		--titleColor={titleColor}
		--subtitleColor={subtitleColor}
		--subheadColor={subheadColor}

		fullHeader={false}
		subhead = {subhead}

		title='Mungkinkah Menjadi Bapak Rumah Tangga?'	

		author='Ann Putri'
		date='13 Mei 2022'
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
			<div id="g-Bapak-Rumah-Tangga_19-box" class="ai2html" style='position:relative'>
				{#if index < 10}
					<div class="background" style='position:absolute;width:100%'>
						<!-- Artboard: smallplus-1 -->
						<div id="g-Bapak-Rumah-Tangga_19-smallplus-1" class="g-artboard" style="max-width: 509px;max-height: 1113px" data-aspect-ratio="0.457" data-min-width="0" data-max-width="509">
						<div style="padding: 0 0 218.75% 0;"></div>
						<img id="g-Bapak-Rumah-Tangga_19-smallplus-1-img" class="g-aiImg" alt="" src="./images/Bapak-Rumah-Tangga_19-smallplus-1.png"/>
						</div>
		
						<!-- Artboard: submedium-1 -->
						<div id="g-Bapak-Rumah-Tangga_19-submedium-1" class="g-artboard" style="min-width: 510px;max-width: 689px;max-height: 1081px" data-aspect-ratio="0.638" data-min-width="510" data-max-width="689">
						<div style="padding: 0 0 156.8627% 0;"></div>
						<img id="g-Bapak-Rumah-Tangga_19-submedium-1-img" class="g-aiImg" alt="" src="./images/Bapak-Rumah-Tangga_19-submedium-1.png"/>
						</div>
		
						<!-- Artboard: medium-1 -->
						<div id="g-Bapak-Rumah-Tangga_19-medium-1" class="g-artboard" style="min-width: 690px;max-width: 919px;max-height: 1364px" data-aspect-ratio="0.674" data-min-width="690" data-max-width="919">
						<div style="padding: 0 0 148.4058% 0;"></div>
						<img id="g-Bapak-Rumah-Tangga_19-medium-1-img" class="g-aiImg" alt="" src="./images/Bapak-Rumah-Tangga_19-medium-1.png"/>
						</div>
		
						<!-- Artboard: large-1 -->
						<div id="g-Bapak-Rumah-Tangga_19-large-1" class="g-artboard" style="min-width: 920px;max-width: 1399px;max-height: 1399px" data-aspect-ratio="1" data-min-width="920" data-max-width="1399">
						<div style="padding: 0 0 100% 0;"></div>
						<img id="g-Bapak-Rumah-Tangga_19-large-1-img" class="g-aiImg" alt="" src="./images/Bapak-Rumah-Tangga_19-large-1.png"/>
						</div>
		
						<!-- Artboard: xlarge-1 -->
						<div id="g-Bapak-Rumah-Tangga_19-xlarge-1" class="g-artboard" style="min-width: 1400px;" data-aspect-ratio="1.778" data-min-width="1400">
						<div style="padding: 0 0 56.25% 0;"></div>
						<img id="g-Bapak-Rumah-Tangga_19-xlarge-1-img" class="g-aiImg" alt="" src="./images/Bapak-Rumah-Tangga_19-xlarge-1.png"/>
						</div>
					</div>
				{/if}
				

			{#if index == 0}
				<div class="page"
					style:opacity={offset <= 0.2 ? offset : offset <= 0.8 ? 1 : 1 - offset}>
						<!-- Halaman 1 -->
						<!-- Artboard: smallplus-1 -->
						<div id="g-Bapak-Rumah-Tangga_19-smallplus-1" class="g-artboard" style="max-width: 509px;max-height: 1113px" data-aspect-ratio="0.457" data-min-width="0" data-max-width="509">
						<div style="padding: 0 0 218.75% 0;"></div>
						<img id="g-Bapak-Rumah-Tangga_19-smallplus-1-img" class="g-aiImg" alt="" src="./images/Bapak-Rumah-Tangga_19-smallplus-1.png"/>
						</div>
		
						<!-- Artboard: submedium-1 -->
						<div id="g-Bapak-Rumah-Tangga_19-submedium-1" class="g-artboard" style="min-width: 510px;max-width: 689px;max-height: 1081px" data-aspect-ratio="0.638" data-min-width="510" data-max-width="689">
						<div style="padding: 0 0 156.8627% 0;"></div>
						<img id="g-Bapak-Rumah-Tangga_19-submedium-1-img" class="g-aiImg" alt="" src="./images/Bapak-Rumah-Tangga_19-submedium-1.png"/>
						</div>
		
						<!-- Artboard: medium-1 -->
						<div id="g-Bapak-Rumah-Tangga_19-medium-1" class="g-artboard" style="min-width: 690px;max-width: 919px;max-height: 1364px" data-aspect-ratio="0.674" data-min-width="690" data-max-width="919">
						<div style="padding: 0 0 148.4058% 0;"></div>
						<img id="g-Bapak-Rumah-Tangga_19-medium-1-img" class="g-aiImg" alt="" src="./images/Bapak-Rumah-Tangga_19-medium-1.png"/>
						</div>
		
						<!-- Artboard: large-1 -->
						<div id="g-Bapak-Rumah-Tangga_19-large-1" class="g-artboard" style="min-width: 920px;max-width: 1399px;max-height: 1399px" data-aspect-ratio="1" data-min-width="920" data-max-width="1399">
						<div style="padding: 0 0 100% 0;"></div>
						<img id="g-Bapak-Rumah-Tangga_19-large-1-img" class="g-aiImg" alt="" src="./images/Bapak-Rumah-Tangga_19-large-1.png"/>
						</div>
		
						<!-- Artboard: xlarge-1 -->
						<div id="g-Bapak-Rumah-Tangga_19-xlarge-1" class="g-artboard" style="min-width: 1400px;" data-aspect-ratio="1.778" data-min-width="1400">
						<div style="padding: 0 0 56.25% 0;"></div>
						<img id="g-Bapak-Rumah-Tangga_19-xlarge-1-img" class="g-aiImg" alt="" src="./images/Bapak-Rumah-Tangga_19-xlarge-1.png"/>
						</div>
				</div>
				

			{:else if index == 1}
				<div class="page"
					style:opacity={offset <= 0.2 ? offset : offset <= 0.8 ? 1 : 1 - offset}>
						<!-- Halaman 2 -->
						<!-- Artboard: smallplus-2 -->
						<div id="g-Bapak-Rumah-Tangga_19-smallplus-2" class="g-artboard" style="max-width: 509px;max-height: 1113px" data-aspect-ratio="0.457" data-min-width="0" data-max-width="509">
						<div style="padding: 0 0 218.75% 0;"></div>
						<img id="g-Bapak-Rumah-Tangga_19-smallplus-2-img" class="g-aiImg" alt="" src="./images/Bapak-Rumah-Tangga_19-smallplus-2.png"/>
						</div>
		
						<!-- Artboard: submedium-2 -->
						<div id="g-Bapak-Rumah-Tangga_19-submedium-2" class="g-artboard" style="min-width: 510px;max-width: 689px;max-height: 1081px" data-aspect-ratio="0.638" data-min-width="510" data-max-width="689">
						<div style="padding: 0 0 156.8627% 0;"></div>
						<img id="g-Bapak-Rumah-Tangga_19-submedium-2-img" class="g-aiImg" alt="" src="./images/Bapak-Rumah-Tangga_19-submedium-2.png"/>
						</div>
		
						<!-- Artboard: medium-2 -->
						<div id="g-Bapak-Rumah-Tangga_19-medium-2" class="g-artboard" style="min-width: 690px;max-width: 919px;max-height: 1364px" data-aspect-ratio="0.674" data-min-width="690" data-max-width="919">
						<div style="padding: 0 0 148.4058% 0;"></div>
						<img id="g-Bapak-Rumah-Tangga_19-medium-2-img" class="g-aiImg" alt="" src="./images/Bapak-Rumah-Tangga_19-medium-2.png"/>
						</div>
		
						<!-- Artboard: large-2 -->
						<div id="g-Bapak-Rumah-Tangga_19-large-2" class="g-artboard" style="min-width: 920px;max-width: 1399px;max-height: 1399px" data-aspect-ratio="1" data-min-width="920" data-max-width="1399">
						<div style="padding: 0 0 100% 0;"></div>
						<img id="g-Bapak-Rumah-Tangga_19-large-2-img" class="g-aiImg" alt="" src="./images/Bapak-Rumah-Tangga_19-large-2.png"/>
						</div>
		
						<!-- Artboard: xlarge-2 -->
						<div id="g-Bapak-Rumah-Tangga_19-xlarge-2" class="g-artboard" style="min-width: 1400px;" data-aspect-ratio="1.778" data-min-width="1400">
						<div style="padding: 0 0 56.25% 0;"></div>
						<img id="g-Bapak-Rumah-Tangga_19-xlarge-2-img" class="g-aiImg" alt="" src="./images/Bapak-Rumah-Tangga_19-xlarge-2.png"/>
						</div>
				</div>
				

			{:else if index == 2}
				<div class="page"
					style:opacity={offset <= 0.2 ? offset : offset <= 0.8 ? 1 : 1 - offset}>
						<!-- Halaman 3 -->
						<!-- Artboard: smallplus-3 -->
						<div id="g-Bapak-Rumah-Tangga_19-smallplus-3" class="g-artboard" style="max-width: 509px;max-height: 1113px" data-aspect-ratio="0.457" data-min-width="0" data-max-width="509">
						<div style="padding: 0 0 218.75% 0;"></div>
						<img id="g-Bapak-Rumah-Tangga_19-smallplus-3-img" class="g-aiImg" alt="" src="./images/Bapak-Rumah-Tangga_19-smallplus-3.png"/>
						</div>
		
						<!-- Artboard: submedium-3 -->
						<div id="g-Bapak-Rumah-Tangga_19-submedium-3" class="g-artboard" style="min-width: 510px;max-width: 689px;max-height: 1081px" data-aspect-ratio="0.638" data-min-width="510" data-max-width="689">
						<div style="padding: 0 0 156.8627% 0;"></div>
						<img id="g-Bapak-Rumah-Tangga_19-submedium-3-img" class="g-aiImg" alt="" src="./images/Bapak-Rumah-Tangga_19-submedium-3.png"/>
						</div>
		
						<!-- Artboard: medium-3 -->
						<div id="g-Bapak-Rumah-Tangga_19-medium-3" class="g-artboard" style="min-width: 690px;max-width: 919px;max-height: 1364px" data-aspect-ratio="0.674" data-min-width="690" data-max-width="919">
						<div style="padding: 0 0 148.4058% 0;"></div>
						<img id="g-Bapak-Rumah-Tangga_19-medium-3-img" class="g-aiImg" alt="" src="./images/Bapak-Rumah-Tangga_19-medium-3.png"/>
						</div>
		
						<!-- Artboard: large-3 -->
						<div id="g-Bapak-Rumah-Tangga_19-large-3" class="g-artboard" style="min-width: 920px;max-width: 1399px;max-height: 1399px" data-aspect-ratio="1" data-min-width="920" data-max-width="1399">
						<div style="padding: 0 0 100% 0;"></div>
						<img id="g-Bapak-Rumah-Tangga_19-large-3-img" class="g-aiImg" alt="" src="./images/Bapak-Rumah-Tangga_19-large-3.png"/>
						</div>
		
						<!-- Artboard: xlarge-3 -->
						<div id="g-Bapak-Rumah-Tangga_19-xlarge-3" class="g-artboard" style="min-width: 1400px;" data-aspect-ratio="1.778" data-min-width="1400">
						<div style="padding: 0 0 56.25% 0;"></div>
						<img id="g-Bapak-Rumah-Tangga_19-xlarge-3-img" class="g-aiImg" alt="" src="./images/Bapak-Rumah-Tangga_19-xlarge-3.png"/>
						</div>
				</div>
					

			{:else if index == 3}
				<div class="page"
					style:opacity={offset <= 0.2 ? offset : offset <= 0.8 ? 1 : 1 - offset}>
						<!-- Halaman 4 -->
						<!-- Artboard: smallplus-4 -->
						<div id="g-Bapak-Rumah-Tangga_19-smallplus-4" class="g-artboard" style="max-width: 509px;max-height: 1113px" data-aspect-ratio="0.457" data-min-width="0" data-max-width="509">
						<div style="padding: 0 0 218.75% 0;"></div>
						<img id="g-Bapak-Rumah-Tangga_19-smallplus-4-img" class="g-aiImg" alt="" src="./images/Bapak-Rumah-Tangga_19-smallplus-4.png"/>
						</div>
		
						<!-- Artboard: submedium-4 -->
						<div id="g-Bapak-Rumah-Tangga_19-submedium-4" class="g-artboard" style="min-width: 510px;max-width: 689px;max-height: 1081px" data-aspect-ratio="0.638" data-min-width="510" data-max-width="689">
						<div style="padding: 0 0 156.8627% 0;"></div>
						<img id="g-Bapak-Rumah-Tangga_19-submedium-4-img" class="g-aiImg" alt="" src="./images/Bapak-Rumah-Tangga_19-submedium-4.png"/>
						</div>
		
						<!-- Artboard: medium-4 -->
						<div id="g-Bapak-Rumah-Tangga_19-medium-4" class="g-artboard" style="min-width: 690px;max-width: 919px;max-height: 1364px" data-aspect-ratio="0.674" data-min-width="690" data-max-width="919">
						<div style="padding: 0 0 148.4058% 0;"></div>
						<img id="g-Bapak-Rumah-Tangga_19-medium-4-img" class="g-aiImg" alt="" src="./images/Bapak-Rumah-Tangga_19-medium-4.png"/>
						</div>
		
						<!-- Artboard: large-4 -->
						<div id="g-Bapak-Rumah-Tangga_19-large-4" class="g-artboard" style="min-width: 920px;max-width: 1399px;max-height: 1399px" data-aspect-ratio="1" data-min-width="920" data-max-width="1399">
						<div style="padding: 0 0 100% 0;"></div>
						<img id="g-Bapak-Rumah-Tangga_19-large-4-img" class="g-aiImg" alt="" src="./images/Bapak-Rumah-Tangga_19-large-4.png"/>
						</div>
		
						<!-- Artboard: xlarge-4 -->
						<div id="g-Bapak-Rumah-Tangga_19-xlarge-4" class="g-artboard" style="min-width: 1400px;" data-aspect-ratio="1.778" data-min-width="1400">
						<div style="padding: 0 0 56.25% 0;"></div>
						<img id="g-Bapak-Rumah-Tangga_19-xlarge-4-img" class="g-aiImg" alt="" src="./images/Bapak-Rumah-Tangga_19-xlarge-4.png"/>
						</div>
				</div>
					
			
			{:else if index == 4}
				<div class="page"
					style:opacity={offset <= 0.2 ? offset : offset <= 0.8 ? 1 : 1 - offset}>
						<!-- Halaman 5 -->
						<!-- Artboard: smallplus-5 -->
						<div id="g-Bapak-Rumah-Tangga_19-smallplus-5" class="g-artboard" style="max-width: 509px;max-height: 1113px" data-aspect-ratio="0.457" data-min-width="0" data-max-width="509">
						<div style="padding: 0 0 218.75% 0;"></div>
						<img id="g-Bapak-Rumah-Tangga_19-smallplus-5-img" class="g-aiImg" alt="" src="./images/Bapak-Rumah-Tangga_19-smallplus-5.png"/>
						</div>
		
						<!-- Artboard: submedium-5 -->
						<div id="g-Bapak-Rumah-Tangga_19-submedium-5" class="g-artboard" style="min-width: 510px;max-width: 689px;max-height: 1081px" data-aspect-ratio="0.638" data-min-width="510" data-max-width="689">
						<div style="padding: 0 0 156.8627% 0;"></div>
						<img id="g-Bapak-Rumah-Tangga_19-submedium-5-img" class="g-aiImg" alt="" src="./images/Bapak-Rumah-Tangga_19-submedium-5.png"/>
						</div>
		
						<!-- Artboard: medium-5 -->
						<div id="g-Bapak-Rumah-Tangga_19-medium-5" class="g-artboard" style="min-width: 690px;max-width: 919px;max-height: 1364px" data-aspect-ratio="0.674" data-min-width="690" data-max-width="919">
						<div style="padding: 0 0 148.4058% 0;"></div>
						<img id="g-Bapak-Rumah-Tangga_19-medium-5-img" class="g-aiImg" alt="" src="./images/Bapak-Rumah-Tangga_19-medium-5.png"/>
						</div>
		
						<!-- Artboard: large-5 -->
						<div id="g-Bapak-Rumah-Tangga_19-large-5" class="g-artboard" style="min-width: 920px;max-width: 1399px;max-height: 1399px" data-aspect-ratio="1" data-min-width="920" data-max-width="1399">
						<div style="padding: 0 0 100% 0;"></div>
						<img id="g-Bapak-Rumah-Tangga_19-large-5-img" class="g-aiImg" alt="" src="./images/Bapak-Rumah-Tangga_19-large-5.png"/>
						</div>
		
						<!-- Artboard: xlarge-5 -->
						<div id="g-Bapak-Rumah-Tangga_19-xlarge-5" class="g-artboard" style="min-width: 1400px;" data-aspect-ratio="1.778" data-min-width="1400">
						<div style="padding: 0 0 56.25% 0;"></div>
						<img id="g-Bapak-Rumah-Tangga_19-xlarge-5-img" class="g-aiImg" alt="" src="./images/Bapak-Rumah-Tangga_19-xlarge-5.png"/>
						</div>
				</div>
					
			
			{:else if index == 5}
				<div class="page"
					style:opacity={offset <= 0.2 ? offset : offset <= 0.8 ? 1 : 1}>
						<!-- Halaman 6 -->
						<!-- Artboard: smallplus-6 -->
						<div id="g-Bapak-Rumah-Tangga_19-smallplus-6" class="g-artboard" style="max-width: 509px;max-height: 1113px" data-aspect-ratio="0.457" data-min-width="0" data-max-width="509">
						<div style="padding: 0 0 218.75% 0;"></div>
						<img id="g-Bapak-Rumah-Tangga_19-smallplus-6-img" class="g-aiImg" alt="" src="./images/Bapak-Rumah-Tangga_19-smallplus-6.png"/>
						</div>
		
						<!-- Artboard: submedium-6 -->
						<div id="g-Bapak-Rumah-Tangga_19-submedium-6" class="g-artboard" style="min-width: 510px;max-width: 689px;max-height: 1081px" data-aspect-ratio="0.638" data-min-width="510" data-max-width="689">
						<div style="padding: 0 0 156.8627% 0;"></div>
						<img id="g-Bapak-Rumah-Tangga_19-submedium-6-img" class="g-aiImg" alt="" src="./images/Bapak-Rumah-Tangga_19-submedium-6.png"/>
						</div>
		
						<!-- Artboard: medium-6 -->
						<div id="g-Bapak-Rumah-Tangga_19-medium-6" class="g-artboard" style="min-width: 690px;max-width: 919px;max-height: 1364px" data-aspect-ratio="0.674" data-min-width="690" data-max-width="919">
						<div style="padding: 0 0 148.4058% 0;"></div>
						<img id="g-Bapak-Rumah-Tangga_19-medium-6-img" class="g-aiImg" alt="" src="./images/Bapak-Rumah-Tangga_19-medium-6.png"/>
						</div>
		
						<!-- Artboard: large-6 -->
						<div id="g-Bapak-Rumah-Tangga_19-large-6" class="g-artboard" style="min-width: 920px;max-width: 1399px;max-height: 1399px" data-aspect-ratio="1" data-min-width="920" data-max-width="1399">
						<div style="padding: 0 0 100% 0;"></div>
						<img id="g-Bapak-Rumah-Tangga_19-large-6-img" class="g-aiImg" alt="" src="./images/Bapak-Rumah-Tangga_19-large-6.png"/>
						</div>
		
						<!-- Artboard: xlarge-6 -->
						<div id="g-Bapak-Rumah-Tangga_19-xlarge-6" class="g-artboard" style="min-width: 1400px;" data-aspect-ratio="1.778" data-min-width="1400">
						<div style="padding: 0 0 56.25% 0;"></div>
						<img id="g-Bapak-Rumah-Tangga_19-xlarge-6-img" class="g-aiImg" alt="" src="./images/Bapak-Rumah-Tangga_19-xlarge-6.png"/>
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
					Krisis ekonomi yang berujung pada pemecatan dan suami memilih untuk mengurus keluarga
				</p>
			</section>
			<section>
				<p>
					Tingkat pendidikan dan persaingan pasar tenaga kerja, namun tidak sedikit pula terdapat banyaknya sarjana yang memilih untuk menjadi bapak rumah tangga
				</p>
			</section>
			<section>
				<p>
					Terbukti banyaknya penelitian mengenai pentingnya peran ayah untuk lebih dekat dengan anak
				</p>
			</section>
			<section>
				<p>
					<a style='color:#ffe7aa;font-weight:bold' href='https://repository.uchastings.edu/cgi/viewcontent.cgi?article=1232&context=hwlj'>Tuntutan feminis</a> agar laki-laki lebih banyak berpartisipasi dalam urusan rumah tangga
				</p>
			</section>
			<section>
				<p>
					Beberapa negara yang mengimplementasikan ide feminis ini dalam bentuk <em>paternal leave</em> atau cuti untuk para bapak yang istrinya baru melahirkan.
				</p>
			</section>
		</div>
	</Scroller>

	<div class="divider"></div>

	<Paragraph
		--font-color ='black'
		subjudul='Stigma Terhadap Bapak Rumah Tangga'
		para={[
		"Meskipun bapak yang rajin ngemong anak dan keluarga mulai menjadi tren, kebijakan cuti dan stigma masyarakat masih menghalangi mereka. Di Indonesia sendiri cuti melahirkan untuk bapak hanya dua hari. Ini kontras dengan cuti melahirkan untuk ibu yang berdurasi tiga bulan, menandakan bahwa urusan anak masih urusan eksklusif para ibu.",
		'Stigma masyarakat terhadap bapak yang mengurus keluarga juga masih kencang. Mereka kerap dianggap aneh, pengangguran, atau gagal sebagai laki-laki karena tidak bekerja. Tentu stigma ini datang dari peran gender yang mengharuskan laki-laki sebagai pemimpin keluarga dan pencari nafkah utama.',
		'Padahal kenyataannya sekarang perempuan memiliki tingkat pendidikan dan jenjang karier yang lebih tinggi dari laki-laki. Sehingga bukan tidak mungkin tren bapak rumah tangga akan terus naik di masa depan.'
		]}
	/>

	<div id="g-Bapak-Rumah-Tangga_19-box" class="ai2html" style='position:relative'>
		<!-- Artboard: smallplus-7 -->
		<div id="g-Bapak-Rumah-Tangga_19-smallplus-7" class="g-artboard" style="max-width: 509px;max-height: 1113px" data-aspect-ratio="0.457" data-min-width="0" data-max-width="509">
		<div style="padding: 0 0 218.75% 0;"></div>
		<img id="g-Bapak-Rumah-Tangga_19-smallplus-7-img" class="g-aiImg" alt="" src="./images/Bapak-Rumah-Tangga_19-smallplus-7.png"/>
		<div id="g-ai35-1" class="g-Layer_1 g-aiAbs g-aiPointText" style="top:14.4641%;margin-top:-28.2px;left:5.5667%;width:306px;">
		<p class="g-pstyle0">Istri Sebagai Pencari</p>
		<p class="g-pstyle0">Nafkah Utama</p>
		</div>
		<div id="g-ai35-2" class="g-Layer_1 g-aiAbs g-aiPointText" style="top:29.8329%;margin-top:-19.8px;left:77.3016%;width:68px;">
		<p class="g-pstyle1">Malu</p>
		<p class="g-pstyle2">42,5%</p>
		</div>
		<div id="g-ai35-3" class="g-Layer_1 g-aiAbs g-aiPointText" style="top:46.5859%;margin-top:-29.1px;left:8.8358%;width:68px;">
		<p class="g-pstyle1">Biasa</p>
		<p class="g-pstyle1">Saja~</p>
		<p class="g-pstyle2">57,5%</p>
		</div>
		</div>

		<!-- Artboard: submedium-7 -->
		<div id="g-Bapak-Rumah-Tangga_19-submedium-7" class="g-artboard" style="min-width: 510px;max-width: 689px;max-height: 1081px" data-aspect-ratio="0.638" data-min-width="510" data-max-width="689">
		<div style="padding: 0 0 156.8627% 0;"></div>
		<img id="g-Bapak-Rumah-Tangga_19-submedium-7-img" class="g-aiImg" alt="" src="./images/Bapak-Rumah-Tangga_19-submedium-7.png"/>
		<div id="g-ai36-1" class="g-Layer_1 g-aiAbs g-aiPointText" style="top:16.7939%;margin-top:-33.4px;left:5.8259%;width:356px;">
		<p class="g-pstyle0">Istri Sebagai Pencari</p>
		<p class="g-pstyle0">Nafkah Utama</p>
		</div>
		<div id="g-ai36-2" class="g-Layer_1 g-aiAbs g-aiPointText" style="top:29.0563%;margin-top:-26.5px;left:70.4542%;width:86px;">
		<p class="g-pstyle1">Malu</p>
		<p class="g-pstyle2">42,5%</p>
		</div>
		<div id="g-ai36-3" class="g-Layer_1 g-aiAbs g-aiPointText" style="top:49.0204%;margin-top:-39.2px;left:11.5455%;width:86px;">
		<p class="g-pstyle1">Biasa</p>
		<p class="g-pstyle1">Saja~</p>
		<p class="g-pstyle2">57,5%</p>
		</div>
		</div>

		<!-- Artboard: medium-7 -->
		<div id="g-Bapak-Rumah-Tangga_19-medium-7" class="g-artboard" style="min-width: 690px;max-width: 919px;max-height: 1364px" data-aspect-ratio="0.674" data-min-width="690" data-max-width="919">
		<div style="padding: 0 0 148.4058% 0;"></div>
		<img id="g-Bapak-Rumah-Tangga_19-medium-7-img" class="g-aiImg" alt="" src="./images/Bapak-Rumah-Tangga_19-medium-7.png"/>
		<div id="g-ai37-1" class="g-Layer_1 g-aiAbs g-aiPointText" style="top:11.8568%;margin-top:-48.4px;left:5.9419%;width:503px;">
		<p class="g-pstyle0">Istri Sebagai Pencari</p>
		<p class="g-pstyle0">Nafkah Utama</p>
		</div>
		<div id="g-ai37-2" class="g-Layer_1 g-aiAbs g-aiPointText" style="top:25.6053%;margin-top:-38.2px;left:74.7086%;width:114px;">
		<p class="g-pstyle1">Malu</p>
		<p class="g-pstyle2">42,5%</p>
		</div>
		<div id="g-ai37-3" class="g-Layer_1 g-aiAbs g-aiPointText" style="top:48.0957%;margin-top:-56.5px;left:12.0277%;width:114px;">
		<p class="g-pstyle1">Biasa</p>
		<p class="g-pstyle1">Saja~</p>
		<p class="g-pstyle2">57,5%</p>
		</div>
		</div>

		<!-- Artboard: large-7 -->
		<div id="g-Bapak-Rumah-Tangga_19-large-7" class="g-artboard" style="min-width: 920px;max-width: 1399px;max-height: 1399px" data-aspect-ratio="1" data-min-width="920" data-max-width="1399">
		<div style="padding: 0 0 100% 0;"></div>
		<img id="g-Bapak-Rumah-Tangga_19-large-7-img" class="g-aiImg" alt="" src="./images/Bapak-Rumah-Tangga_19-large-7.png"/>
		<div id="g-ai38-1" class="g-Layer_1 g-aiAbs g-aiPointText" style="top:11.3794%;margin-top:-62.7px;left:4.3824%;width:647px;">
		<p class="g-pstyle0">Istri Sebagai Pencari</p>
		<p class="g-pstyle0">Nafkah Utama</p>
		</div>
		<div id="g-ai38-2" class="g-Layer_1 g-aiAbs g-aiPointText" style="top:27.1392%;margin-top:-34.7px;left:47.0568%;width:104px;">
		<p class="g-pstyle1">Malu</p>
		<p class="g-pstyle2">42,5%</p>
		</div>
		<div id="g-ai38-3" class="g-Layer_1 g-aiAbs g-aiPointText" style="top:49.6905%;margin-top:-51.2px;left:4.7447%;width:104px;">
		<p class="g-pstyle1">Biasa</p>
		<p class="g-pstyle1">Saja~</p>
		<p class="g-pstyle2">57,5%</p>
		</div>
		</div>

		<!-- Artboard: xlarge-7 -->
		<div id="g-Bapak-Rumah-Tangga_19-xlarge-7" class="g-artboard" style="min-width: 1400px;" data-aspect-ratio="1.778" data-min-width="1400">
		<div style="padding: 0 0 56.25% 0;"></div>
		<img id="g-Bapak-Rumah-Tangga_19-xlarge-7-img" class="g-aiImg" alt="" src="./images/Bapak-Rumah-Tangga_19-xlarge-7.png"/>
		<div id="g-ai39-1" class="g-Layer_1 g-aiAbs g-aiPointText" style="top:12.5322%;margin-top:-62.7px;left:3.7141%;width:647px;">
		<p class="g-pstyle0">Istri Sebagai Pencari</p>
		<p class="g-pstyle0">Nafkah Utama</p>
		</div>
		<div id="g-ai39-2" class="g-Layer_1 g-aiAbs g-aiPointText" style="top:39.0756%;margin-top:-49.7px;left:47.5087%;width:141px;">
		<p class="g-pstyle1">Malu</p>
		<p class="g-pstyle2">42,5%</p>
		</div>
		<div id="g-ai39-3" class="g-Layer_1 g-aiAbs g-aiPointText" style="top:77.1419%;margin-top:-73.5px;left:7.3807%;width:141px;">
		<p class="g-pstyle1">Biasa</p>
		<p class="g-pstyle1">Saja~</p>
		<p class="g-pstyle2">57,5%</p>
		</div>
		</div>
	</div>

	

	<Paragraph
		--font-color ='black'
		para={[
		"Lalu, apa yang bisa kita lakukan untuk para bapak rumah tangga? Tentunya dengan lebih mengakomodasi mereka lewat peraturan yang ramah bapak rumah tangga. Apabila peraturan-peraturan ini sudah diimplementasikan, stigma terhadap mereka pelan-pelan akan menghilang."
		]}
	/>

	<Credit
		--fontfamily1={fontfamily1}
		--font-color = 'black'
		{ credit }
	/>
</main>

<style>
	.page {
		transition: opacity 100ms ease-in-out;
	}
	.divider {
		height:0.2rem;
		width:60%;
		background-color:#ef6771 ;
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
		color: white;
		padding: 1em;
		margin: 0 0 2em 0;
	}

	[slot="foreground"] p {
		padding:1rem;
		background-color:hsl(7, 84%, 62%);
		width:90%;
        max-width: 650px;
        margin: 0 auto 0 auto;
        text-align: left;
		border-radius: 1rem;
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
	.g-artboard {
		transition: opacity 100ms ease-in-out;
	}
	#g-Bapak-Rumah-Tangga_19-box ,
	#g-Bapak-Rumah-Tangga_19-box .g-artboard {
		margin:0 auto;
	}
	#g-Bapak-Rumah-Tangga_19-box p {
		margin:0;
		font-family: 'Roboto Mono', monospace;
	}
	#g-Bapak-Rumah-Tangga_19-box .g-aiAbs {
		position:absolute;
	}
	#g-Bapak-Rumah-Tangga_19-box .g-aiImg {
		position:absolute;
		top:0;
		display:block;
		width:100% !important;
	}
	#g-Bapak-Rumah-Tangga_19-box .g-aiPointText p { white-space: nowrap; }
	#g-Bapak-Rumah-Tangga_19-smallplus-cover {
		position:relative;
		overflow:hidden;
	}
	#g-Bapak-Rumah-Tangga_19-submedium-cover {
		position:relative;
		overflow:hidden;
	}
	#g-Bapak-Rumah-Tangga_19-medium-cover {
		position:relative;
		overflow:hidden;
	}
	#g-Bapak-Rumah-Tangga_19-large-cover {
		position:relative;
		overflow:hidden;
	}
	#g-Bapak-Rumah-Tangga_19-xlarge-cover {
		position:relative;
		overflow:hidden;
	}
	#g-Bapak-Rumah-Tangga_19-smallplus-1 {
		position:relative;
		overflow:hidden;
	}
	#g-Bapak-Rumah-Tangga_19-submedium-1 {
		position:relative;
		overflow:hidden;
	}
	#g-Bapak-Rumah-Tangga_19-medium-1 {
		position:relative;
		overflow:hidden;
	}
	#g-Bapak-Rumah-Tangga_19-large-1 {
		position:relative;
		overflow:hidden;
	}
	#g-Bapak-Rumah-Tangga_19-xlarge-1 {
		position:relative;
		overflow:hidden;
	}
	#g-Bapak-Rumah-Tangga_19-smallplus-2 {
		position:relative;
		overflow:hidden;
	}
	#g-Bapak-Rumah-Tangga_19-submedium-2 {
		position:relative;
		overflow:hidden;
	}
	#g-Bapak-Rumah-Tangga_19-medium-2 {
		position:relative;
		overflow:hidden;
	}
	#g-Bapak-Rumah-Tangga_19-large-2 {
		position:relative;
		overflow:hidden;
	}
	#g-Bapak-Rumah-Tangga_19-xlarge-2 {
		position:relative;
		overflow:hidden;
	}
	#g-Bapak-Rumah-Tangga_19-smallplus-3 {
		position:relative;
		overflow:hidden;
	}
	#g-Bapak-Rumah-Tangga_19-submedium-3 {
		position:relative;
		overflow:hidden;
	}
	#g-Bapak-Rumah-Tangga_19-medium-3 {
		position:relative;
		overflow:hidden;
	}
	#g-Bapak-Rumah-Tangga_19-large-3 {
		position:relative;
		overflow:hidden;
	}
	#g-Bapak-Rumah-Tangga_19-xlarge-3 {
		position:relative;
		overflow:hidden;
	}
	#g-Bapak-Rumah-Tangga_19-smallplus-4 {
		position:relative;
		overflow:hidden;
	}
	#g-Bapak-Rumah-Tangga_19-submedium-4 {
		position:relative;
		overflow:hidden;
	}
	#g-Bapak-Rumah-Tangga_19-medium-4 {
		position:relative;
		overflow:hidden;
	}
	#g-Bapak-Rumah-Tangga_19-large-4 {
		position:relative;
		overflow:hidden;
	}
	#g-Bapak-Rumah-Tangga_19-xlarge-4 {
		position:relative;
		overflow:hidden;
	}
	#g-Bapak-Rumah-Tangga_19-smallplus-5 {
		position:relative;
		overflow:hidden;
	}
	#g-Bapak-Rumah-Tangga_19-submedium-5 {
		position:relative;
		overflow:hidden;
	}
	#g-Bapak-Rumah-Tangga_19-medium-5 {
		position:relative;
		overflow:hidden;
	}
	#g-Bapak-Rumah-Tangga_19-large-5 {
		position:relative;
		overflow:hidden;
	}
	#g-Bapak-Rumah-Tangga_19-xlarge-5 {
		position:relative;
		overflow:hidden;
	}
	#g-Bapak-Rumah-Tangga_19-smallplus-6 {
		position:relative;
		overflow:hidden;
	}
	#g-Bapak-Rumah-Tangga_19-submedium-6 {
		position:relative;
		overflow:hidden;
	}
	#g-Bapak-Rumah-Tangga_19-medium-6 {
		position:relative;
		overflow:hidden;
	}
	#g-Bapak-Rumah-Tangga_19-large-6 {
		position:relative;
		overflow:hidden;
	}
	#g-Bapak-Rumah-Tangga_19-xlarge-6 {
		position:relative;
		overflow:hidden;
	}
	#g-Bapak-Rumah-Tangga_19-smallplus-7 {
		position:relative;
		overflow:hidden;
	}
	#g-Bapak-Rumah-Tangga_19-smallplus-7 p {
		font-weight:500;
		line-height:27px;
		height:auto;
		opacity:1;
		letter-spacing:0em;
		font-size:23px;
		text-align:left;
		color:rgb(0,0,0);
		text-transform:none;
		padding-bottom:0;
		padding-top:0;
		mix-blend-mode:normal;
		font-style:normal;
		position:static;
	}
	#g-Bapak-Rumah-Tangga_19-smallplus-7 .g-pstyle0 {
		height:27px;
	}
	#g-Bapak-Rumah-Tangga_19-smallplus-7 .g-pstyle1 {
		font-weight:700;
		line-height:19px;
		height:19px;
		font-size:15px;
	}
	#g-Bapak-Rumah-Tangga_19-smallplus-7 .g-pstyle2 {
		line-height:19px;
		height:19px;
		font-size:15px;
	}
	#g-Bapak-Rumah-Tangga_19-submedium-7 {
		position:relative;
		overflow:hidden;
	}
	#g-Bapak-Rumah-Tangga_19-submedium-7 p {
		font-weight:500;
		line-height:32px;
		height:auto;
		opacity:1;
		letter-spacing:0em;
		font-size:27px;
		text-align:left;
		color:rgb(0,0,0);
		text-transform:none;
		padding-bottom:0;
		padding-top:0;
		mix-blend-mode:normal;
		font-style:normal;
		position:static;
	}
	#g-Bapak-Rumah-Tangga_19-submedium-7 .g-pstyle0 {
		height:32px;
	}
	#g-Bapak-Rumah-Tangga_19-submedium-7 .g-pstyle1 {
		font-weight:700;
		line-height:25px;
		height:25px;
		font-size:21px;
	}
	#g-Bapak-Rumah-Tangga_19-submedium-7 .g-pstyle2 {
		line-height:25px;
		height:25px;
		font-size:21px;
	}
	#g-Bapak-Rumah-Tangga_19-medium-7 {
		position:relative;
		overflow:hidden;
	}
	#g-Bapak-Rumah-Tangga_19-medium-7 p {
		font-weight:500;
		line-height:46px;
		height:auto;
		opacity:1;
		letter-spacing:0em;
		font-size:38px;
		text-align:left;
		color:rgb(0,0,0);
		text-transform:none;
		padding-bottom:0;
		padding-top:0;
		mix-blend-mode:normal;
		font-style:normal;
		position:static;
	}
	#g-Bapak-Rumah-Tangga_19-medium-7 .g-pstyle0 {
		height:46px;
	}
	#g-Bapak-Rumah-Tangga_19-medium-7 .g-pstyle1 {
		font-weight:700;
		line-height:37px;
		height:37px;
		font-size:31px;
	}
	#g-Bapak-Rumah-Tangga_19-medium-7 .g-pstyle2 {
		line-height:37px;
		height:37px;
		font-size:31px;
	}
	#g-Bapak-Rumah-Tangga_19-large-7 {
		position:relative;
		overflow:hidden;
	}
	#g-Bapak-Rumah-Tangga_19-large-7 p {
		font-weight:500;
		line-height:60px;
		height:auto;
		opacity:1;
		letter-spacing:0em;
		font-size:50px;
		text-align:left;
		color:rgb(0,0,0);
		text-transform:none;
		padding-bottom:0;
		padding-top:0;
		mix-blend-mode:normal;
		font-style:normal;
		position:static;
	}
	#g-Bapak-Rumah-Tangga_19-large-7 .g-pstyle0 {
		height:60px;
	}
	#g-Bapak-Rumah-Tangga_19-large-7 .g-pstyle1 {
		font-weight:700;
		line-height:33px;
		height:33px;
		font-size:27px;
	}
	#g-Bapak-Rumah-Tangga_19-large-7 .g-pstyle2 {
		line-height:33px;
		height:33px;
		font-size:27px;
	}
	#g-Bapak-Rumah-Tangga_19-xlarge-7 {
		position:relative;
		overflow:hidden;
	}
	#g-Bapak-Rumah-Tangga_19-xlarge-7 p {
		font-weight:500;
		line-height:60px;
		height:auto;
		opacity:1;
		letter-spacing:0em;
		font-size:50px;
		text-align:left;
		color:rgb(0,0,0);
		text-transform:none;
		padding-bottom:0;
		padding-top:0;
		mix-blend-mode:normal;
		font-style:normal;
		position:static;
	}
	#g-Bapak-Rumah-Tangga_19-xlarge-7 .g-pstyle0 {
		height:60px;
	}
	#g-Bapak-Rumah-Tangga_19-xlarge-7 .g-pstyle1 {
		font-weight:700;
		line-height:48px;
		height:48px;
		font-size:40px;
	}
	#g-Bapak-Rumah-Tangga_19-xlarge-7 .g-pstyle2 {
		line-height:48px;
		height:48px;
		font-size:40px;
	}

	@media only screen and (max-width:509px) {
		#g-Bapak-Rumah-Tangga_19-xlarge-cover,
		#g-Bapak-Rumah-Tangga_19-xlarge-1,
		#g-Bapak-Rumah-Tangga_19-xlarge-2,
		#g-Bapak-Rumah-Tangga_19-xlarge-3,
		#g-Bapak-Rumah-Tangga_19-xlarge-4,
		#g-Bapak-Rumah-Tangga_19-xlarge-5,
		#g-Bapak-Rumah-Tangga_19-xlarge-6,
		#g-Bapak-Rumah-Tangga_19-xlarge-7{
			display:none;
		}

		#g-Bapak-Rumah-Tangga_19-large-cover,
		#g-Bapak-Rumah-Tangga_19-large-1,
		#g-Bapak-Rumah-Tangga_19-large-2,
		#g-Bapak-Rumah-Tangga_19-large-3,
		#g-Bapak-Rumah-Tangga_19-large-4,
		#g-Bapak-Rumah-Tangga_19-large-5,
		#g-Bapak-Rumah-Tangga_19-large-6,
		#g-Bapak-Rumah-Tangga_19-large-7{
			display:none;
		}

		#g-Bapak-Rumah-Tangga_19-medium-cover,
		#g-Bapak-Rumah-Tangga_19-medium-1,
		#g-Bapak-Rumah-Tangga_19-medium-2,
		#g-Bapak-Rumah-Tangga_19-medium-3,
		#g-Bapak-Rumah-Tangga_19-medium-4,
		#g-Bapak-Rumah-Tangga_19-medium-5,
		#g-Bapak-Rumah-Tangga_19-medium-6,
		#g-Bapak-Rumah-Tangga_19-medium-7 {
			display:none;
		}

		#g-Bapak-Rumah-Tangga_19-submedium-cover,
		#g-Bapak-Rumah-Tangga_19-submedium-1,
		#g-Bapak-Rumah-Tangga_19-submedium-2,
		#g-Bapak-Rumah-Tangga_19-submedium-3,
		#g-Bapak-Rumah-Tangga_19-submedium-4,
		#g-Bapak-Rumah-Tangga_19-submedium-5,
		#g-Bapak-Rumah-Tangga_19-submedium-6,
		#g-Bapak-Rumah-Tangga_19-submedium-7 {
			display:none;
		}

		#g-Bapak-Rumah-Tangga_19-smallplus-cover,
		#g-Bapak-Rumah-Tangga_19-smallplus-1,
		#g-Bapak-Rumah-Tangga_19-smallplus-2,
		#g-Bapak-Rumah-Tangga_19-smallplus-3,
		#g-Bapak-Rumah-Tangga_19-smallplus-4,
		#g-Bapak-Rumah-Tangga_19-smallplus-5,
		#g-Bapak-Rumah-Tangga_19-smallplus-6,
		#g-Bapak-Rumah-Tangga_19-smallplus-7 {
			display:block;
		}
	}

	@media only screen and (min-width:510px) and (max-width:689px) {
		#g-Bapak-Rumah-Tangga_19-xlarge-cover,
		#g-Bapak-Rumah-Tangga_19-xlarge-1,
		#g-Bapak-Rumah-Tangga_19-xlarge-2,
		#g-Bapak-Rumah-Tangga_19-xlarge-3,
		#g-Bapak-Rumah-Tangga_19-xlarge-4,
		#g-Bapak-Rumah-Tangga_19-xlarge-5,
		#g-Bapak-Rumah-Tangga_19-xlarge-6,
		#g-Bapak-Rumah-Tangga_19-xlarge-7 {
			display:none;
		}

		#g-Bapak-Rumah-Tangga_19-large-cover,
		#g-Bapak-Rumah-Tangga_19-large-1,
		#g-Bapak-Rumah-Tangga_19-large-2,
		#g-Bapak-Rumah-Tangga_19-large-3,
		#g-Bapak-Rumah-Tangga_19-large-4,
		#g-Bapak-Rumah-Tangga_19-large-5,
		#g-Bapak-Rumah-Tangga_19-large-6,
		#g-Bapak-Rumah-Tangga_19-large-7 {
			display:none;
		}

		#g-Bapak-Rumah-Tangga_19-medium-cover,
		#g-Bapak-Rumah-Tangga_19-medium-1,
		#g-Bapak-Rumah-Tangga_19-medium-2,
		#g-Bapak-Rumah-Tangga_19-medium-3,
		#g-Bapak-Rumah-Tangga_19-medium-4,
		#g-Bapak-Rumah-Tangga_19-medium-5,
		#g-Bapak-Rumah-Tangga_19-medium-6,
		#g-Bapak-Rumah-Tangga_19-medium-7 {
			display:none;
		}

		#g-Bapak-Rumah-Tangga_19-submedium-cover,
		#g-Bapak-Rumah-Tangga_19-submedium-1,
		#g-Bapak-Rumah-Tangga_19-submedium-2,
		#g-Bapak-Rumah-Tangga_19-submedium-3,
		#g-Bapak-Rumah-Tangga_19-submedium-4,
		#g-Bapak-Rumah-Tangga_19-submedium-5,
		#g-Bapak-Rumah-Tangga_19-submedium-6,
		#g-Bapak-Rumah-Tangga_19-submedium-7 {
			display:block;
		}

		#g-Bapak-Rumah-Tangga_19-smallplus-cover,
		#g-Bapak-Rumah-Tangga_19-smallplus-1,
		#g-Bapak-Rumah-Tangga_19-smallplus-2,
		#g-Bapak-Rumah-Tangga_19-smallplus-3,
		#g-Bapak-Rumah-Tangga_19-smallplus-4,
		#g-Bapak-Rumah-Tangga_19-smallplus-5,
		#g-Bapak-Rumah-Tangga_19-smallplus-6,
		#g-Bapak-Rumah-Tangga_19-smallplus-7 {
			display:none;
		}
	}

	@media only screen and (min-width:690px) and (max-width:919px) {
		#g-Bapak-Rumah-Tangga_19-xlarge-cover,
		#g-Bapak-Rumah-Tangga_19-xlarge-1,
		#g-Bapak-Rumah-Tangga_19-xlarge-2,
		#g-Bapak-Rumah-Tangga_19-xlarge-3,
		#g-Bapak-Rumah-Tangga_19-xlarge-4,
		#g-Bapak-Rumah-Tangga_19-xlarge-5,
		#g-Bapak-Rumah-Tangga_19-xlarge-6,
		#g-Bapak-Rumah-Tangga_19-xlarge-7 {
			display:none;
		}

		#g-Bapak-Rumah-Tangga_19-large-cover,
		#g-Bapak-Rumah-Tangga_19-large-1,
		#g-Bapak-Rumah-Tangga_19-large-2,
		#g-Bapak-Rumah-Tangga_19-large-3,
		#g-Bapak-Rumah-Tangga_19-large-4,
		#g-Bapak-Rumah-Tangga_19-large-5,
		#g-Bapak-Rumah-Tangga_19-large-6,
		#g-Bapak-Rumah-Tangga_19-large-7 {
			display:none;
		}

		#g-Bapak-Rumah-Tangga_19-medium-cover,
		#g-Bapak-Rumah-Tangga_19-medium-1,
		#g-Bapak-Rumah-Tangga_19-medium-2,
		#g-Bapak-Rumah-Tangga_19-medium-3,
		#g-Bapak-Rumah-Tangga_19-medium-4,
		#g-Bapak-Rumah-Tangga_19-medium-5,
		#g-Bapak-Rumah-Tangga_19-medium-6,
		#g-Bapak-Rumah-Tangga_19-medium-7 {
			display:block;
		}

		#g-Bapak-Rumah-Tangga_19-submedium-cover,
		#g-Bapak-Rumah-Tangga_19-submedium-1,
		#g-Bapak-Rumah-Tangga_19-submedium-2,
		#g-Bapak-Rumah-Tangga_19-submedium-3,
		#g-Bapak-Rumah-Tangga_19-submedium-4,
		#g-Bapak-Rumah-Tangga_19-submedium-5,
		#g-Bapak-Rumah-Tangga_19-submedium-6,
		#g-Bapak-Rumah-Tangga_19-submedium-7 {
			display:none;
		}

		#g-Bapak-Rumah-Tangga_19-smallplus-cover,
		#g-Bapak-Rumah-Tangga_19-smallplus-1,
		#g-Bapak-Rumah-Tangga_19-smallplus-2,
		#g-Bapak-Rumah-Tangga_19-smallplus-3,
		#g-Bapak-Rumah-Tangga_19-smallplus-4,
		#g-Bapak-Rumah-Tangga_19-smallplus-5,
		#g-Bapak-Rumah-Tangga_19-smallplus-6,
		#g-Bapak-Rumah-Tangga_19-smallplus-7 {
			display:none;
		}
	}

	@media only screen and (min-width:920px) and (max-width:1399px) {
		#g-Bapak-Rumah-Tangga_19-xlarge-cover,
		#g-Bapak-Rumah-Tangga_19-xlarge-1,
		#g-Bapak-Rumah-Tangga_19-xlarge-2,
		#g-Bapak-Rumah-Tangga_19-xlarge-3,
		#g-Bapak-Rumah-Tangga_19-xlarge-4,
		#g-Bapak-Rumah-Tangga_19-xlarge-5,
		#g-Bapak-Rumah-Tangga_19-xlarge-6,
		#g-Bapak-Rumah-Tangga_19-xlarge-7 {
			display:none;
		}

		#g-Bapak-Rumah-Tangga_19-large-cover,
		#g-Bapak-Rumah-Tangga_19-large-1,
		#g-Bapak-Rumah-Tangga_19-large-2,
		#g-Bapak-Rumah-Tangga_19-large-3,
		#g-Bapak-Rumah-Tangga_19-large-4,
		#g-Bapak-Rumah-Tangga_19-large-5,
		#g-Bapak-Rumah-Tangga_19-large-6,
		#g-Bapak-Rumah-Tangga_19-large-7 {
			display:block;
		}

		#g-Bapak-Rumah-Tangga_19-medium-cover,
		#g-Bapak-Rumah-Tangga_19-medium-1,
		#g-Bapak-Rumah-Tangga_19-medium-2,
		#g-Bapak-Rumah-Tangga_19-medium-3,
		#g-Bapak-Rumah-Tangga_19-medium-4,
		#g-Bapak-Rumah-Tangga_19-medium-5,
		#g-Bapak-Rumah-Tangga_19-medium-6,
		#g-Bapak-Rumah-Tangga_19-medium-7 {
			display:none;
		}

		#g-Bapak-Rumah-Tangga_19-submedium-cover,
		#g-Bapak-Rumah-Tangga_19-submedium-1,
		#g-Bapak-Rumah-Tangga_19-submedium-2,
		#g-Bapak-Rumah-Tangga_19-submedium-3,
		#g-Bapak-Rumah-Tangga_19-submedium-4,
		#g-Bapak-Rumah-Tangga_19-submedium-5,
		#g-Bapak-Rumah-Tangga_19-submedium-6,
		#g-Bapak-Rumah-Tangga_19-submedium-7 {
			display:none;
		}

		#g-Bapak-Rumah-Tangga_19-smallplus-cover,
		#g-Bapak-Rumah-Tangga_19-smallplus-1,
		#g-Bapak-Rumah-Tangga_19-smallplus-2,
		#g-Bapak-Rumah-Tangga_19-smallplus-3,
		#g-Bapak-Rumah-Tangga_19-smallplus-4,
		#g-Bapak-Rumah-Tangga_19-smallplus-5,
		#g-Bapak-Rumah-Tangga_19-smallplus-6,
		#g-Bapak-Rumah-Tangga_19-smallplus-7 {
			display:none;
		}
	}

	@media only screen and (min-width:1400px) {
		#g-Bapak-Rumah-Tangga_19-xlarge-cover,
		#g-Bapak-Rumah-Tangga_19-xlarge-1,
		#g-Bapak-Rumah-Tangga_19-xlarge-2,
		#g-Bapak-Rumah-Tangga_19-xlarge-3,
		#g-Bapak-Rumah-Tangga_19-xlarge-4,
		#g-Bapak-Rumah-Tangga_19-xlarge-5,
		#g-Bapak-Rumah-Tangga_19-xlarge-6,
		#g-Bapak-Rumah-Tangga_19-xlarge-7 {
			display:block;
		}

		#g-Bapak-Rumah-Tangga_19-large-cover,
		#g-Bapak-Rumah-Tangga_19-large-1,
		#g-Bapak-Rumah-Tangga_19-large-2,
		#g-Bapak-Rumah-Tangga_19-large-3,
		#g-Bapak-Rumah-Tangga_19-large-4,
		#g-Bapak-Rumah-Tangga_19-large-5,
		#g-Bapak-Rumah-Tangga_19-large-6,
		#g-Bapak-Rumah-Tangga_19-large-7 {
			display:none;
		}

		#g-Bapak-Rumah-Tangga_19-medium-cover,
		#g-Bapak-Rumah-Tangga_19-medium-1,
		#g-Bapak-Rumah-Tangga_19-medium-2,
		#g-Bapak-Rumah-Tangga_19-medium-3,
		#g-Bapak-Rumah-Tangga_19-medium-4,
		#g-Bapak-Rumah-Tangga_19-medium-5,
		#g-Bapak-Rumah-Tangga_19-medium-6,
		#g-Bapak-Rumah-Tangga_19-medium-7{
			display:none;
		}

		#g-Bapak-Rumah-Tangga_19-submedium-cover,
		#g-Bapak-Rumah-Tangga_19-submedium-1,
		#g-Bapak-Rumah-Tangga_19-submedium-2,
		#g-Bapak-Rumah-Tangga_19-submedium-3,
		#g-Bapak-Rumah-Tangga_19-submedium-4,
		#g-Bapak-Rumah-Tangga_19-submedium-5,
		#g-Bapak-Rumah-Tangga_19-submedium-6,
		#g-Bapak-Rumah-Tangga_19-submedium-7 {
			display:none;
		}

		#g-Bapak-Rumah-Tangga_19-smallplus-cover,
		#g-Bapak-Rumah-Tangga_19-smallplus-1,
		#g-Bapak-Rumah-Tangga_19-smallplus-2,
		#g-Bapak-Rumah-Tangga_19-smallplus-3,
		#g-Bapak-Rumah-Tangga_19-smallplus-4,
		#g-Bapak-Rumah-Tangga_19-smallplus-5,
		#g-Bapak-Rumah-Tangga_19-smallplus-6,
		#g-Bapak-Rumah-Tangga_19-smallplus-7 {
			display:none;
		}
	}

</style>