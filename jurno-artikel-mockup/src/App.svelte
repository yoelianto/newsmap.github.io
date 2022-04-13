<script>
	import Header from './Header.svelte';
	import Paragraph from './Paragraph.svelte';
	import Quote from './Quote.svelte';
	import Image from './Image.svelte';
	import Credit from './Credit.svelte';

	// scroller
	import Scroller from '@sveltejs/svelte-scroller';
	// scroller variables
	let count, index, offset, progress;
	let top = 0;
	let threshold = 0;
	let bottom = 1;

	// styling variables
	let mainBackground='#af3134'
	let headerImage='url("https://rupadata.id/wp-content/uploads/2021/02/header-artikel-plta-kayan.jpg")'
	let headerBackground='#888'
	let titleColor='#f9f9e1'
	let subtitleColor='#f9f9e1'
	let subheadColor='#f9f9e1'

	let credit =[{
		role : 'Penulis',
		name : 'Lorem Ipsum'
		},{
		role : 'Editor',
		name : 'Lorem Ipsum'
		},{
		role : 'Periset',
		name : 'Lorem Ipsum'
		}]
	let source = 'Sed nec pellentesque massa. Vestibulum eu sem ut dolor placerat ultricies at sit amet massa'

	// let scrollytelling = [
	// 	'Presiden Moon Jae-in kerap membawa grup-grup kpop sebagai pendamping diplomatisnya;',

	// 	'Red Velvet menjadi utusan kebudayaan di konser Korea Utara di tahun 2018,',

	// 	'EXO bertemu dengan Donald Trump di tahun 2019,',

	// 	'dan BTS yang dilantik sebagai diplomat khusus di tahun 2021.',
	// ]

	// export let name;
</script>

<svelte:head>
	<link rel="preconnect" href="https://fonts.googleapis.com">
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
	<link href="https://fonts.googleapis.com/css2?family=Black+Han+Sans&family=Roboto+Mono:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;1,100;1,200;1,300;1,400;1,500;1,600;1,700&family=Roboto:ital,wght@0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap" rel="stylesheet">
</svelte:head>

<main style="background-color: {mainBackground}">
	<div id="g-Korean-Waves-box" class="ai2html">
		<!-- Artboard: smallplus-cover -->
<div id="g-Korean-Waves-smallplus-cover" class="g-artboard" style="max-width: 509px;max-height: 1113px" data-aspect-ratio="0.457" data-min-width="0" data-max-width="509">
<div style="padding: 0 0 218.75% 0;"></div>
		<img id="g-Korean-Waves-smallplus-cover-img" class="g-aiImg" alt="" src="./images/Korean-Waves-smallplus-cover.png"/>
		<div id="g-ai0-1" class="g-Layer_1 g-aiAbs g-aiPointText" style="top:8.6136%;margin-top:-15.3px;left:49.966%;margin-left:-120px;width:240px;">
			<p class="g-pstyle0">KOREAN WAVES</p>
		</div>
		<div id="g-ai0-2" class="g-Layer_1 g-aiAbs g-aiPointText" style="top:18.5861%;margin-top:-72.1px;left:29.2279%;margin-left:-62px;width:124px;">
			<p class="g-pstyle1">한</p>
		</div>
		<div id="g-ai0-3" class="g-Layer_1 g-aiAbs g-aiPointText" style="top:18.5861%;margin-top:-72.1px;left:70.6763%;margin-left:-62.5px;width:125px;">
			<p class="g-pstyle1">류</p>
		</div>
	</div>

	<!-- Artboard: submedium-cover -->
	<div id="g-Korean-Waves-submedium-cover" class="g-artboard" style="min-width: 510px;max-width: 689px;max-height: 1081px" data-aspect-ratio="0.638" data-min-width="510" data-max-width="689">
<div style="padding: 0 0 156.8627% 0;"></div>
		<img id="g-Korean-Waves-submedium-cover-img" class="g-aiImg" alt="" src="./images/Korean-Waves-submedium-cover.png"/>
		<div id="g-ai1-1" class="g-Layer_1 g-aiAbs g-aiPointText" style="top:8.7591%;margin-top:-27.1px;left:50.0031%;margin-left:-203.5px;width:407px;">
			<p class="g-pstyle0">KOREAN WAVES</p>
		</div>
		<div id="g-ai1-2" class="g-Layer_1 g-aiAbs g-aiPointText" style="top:24.0663%;margin-top:-127.5px;left:27.0127%;margin-left:-101px;width:202px;">
			<p class="g-pstyle1">한</p>
		</div>
		<div id="g-ai1-3" class="g-Layer_1 g-aiAbs g-aiPointText" style="top:24.0663%;margin-top:-127.5px;left:72.8175%;margin-left:-101.5px;width:203px;">
			<p class="g-pstyle1">류</p>
		</div>
	</div>

	<!-- Artboard: medium-cover -->
	<div id="g-Korean-Waves-medium-cover" class="g-artboard" style="min-width: 690px;max-width: 919px;max-height: 1364px" data-aspect-ratio="0.674" data-min-width="690" data-max-width="919">
<div style="padding: 0 0 148.4058% 0;"></div>
		<img id="g-Korean-Waves-medium-cover-img" class="g-aiImg" alt="" src="./images/Korean-Waves-medium-cover.png"/>
		<div id="g-ai2-1" class="g-Layer_1 g-aiAbs g-aiPointText" style="top:7.9464%;margin-top:-37.4px;left:49.9641%;margin-left:-274px;width:548px;">
			<p class="g-pstyle0">KOREAN WAVES</p>
		</div>
		<div id="g-ai2-2" class="g-Layer_1 g-aiAbs g-aiPointText" style="top:24.3176%;margin-top:-174px;left:26.7502%;margin-left:-134px;width:268px;">
			<p class="g-pstyle1">한</p>
		</div>
		<div id="g-ai2-3" class="g-Layer_1 g-aiAbs g-aiPointText" style="top:24.3176%;margin-top:-174px;left:73.0985%;margin-left:-135px;width:270px;">
			<p class="g-pstyle1">류</p>
		</div>
	</div>

	<!-- Artboard: large-cover -->
	<div id="g-Korean-Waves-large-cover" class="g-artboard" style="min-width: 920px;max-width: 1399px;max-height: 1399px" data-aspect-ratio="1" data-min-width="920" data-max-width="1399">
<div style="padding: 0 0 100% 0;"></div>
		<img id="g-Korean-Waves-large-cover-img" class="g-aiImg" alt="" src="./images/Korean-Waves-large-cover.png"/>
		<div id="g-ai3-1" class="g-Layer_1 g-aiAbs g-aiPointText" style="top:8.9005%;margin-top:-45.9px;left:50.0203%;margin-left:-338.5px;width:677px;">
			<p class="g-pstyle0">KOREAN WAVES</p>
		</div>
		<div id="g-ai3-2" class="g-Layer_1 g-aiAbs g-aiPointText" style="top:31.5001%;margin-top:-216.8px;left:27.4754%;margin-left:-163.5px;width:327px;">
			<p class="g-pstyle1">한</p>
		</div>
		<div id="g-ai3-3" class="g-Layer_1 g-aiAbs g-aiPointText" style="top:31.5001%;margin-top:-216.8px;left:70.7239%;margin-left:-165px;width:330px;">
			<p class="g-pstyle1">류</p>
		</div>
	</div>

	<!-- Artboard: xlarge-cover -->
	<div id="g-Korean-Waves-xlarge-cover" class="g-artboard" style="min-width: 1400px;" data-aspect-ratio="1.778" data-min-width="1400">
<div style="padding: 0 0 56.25% 0;"></div>
		<img id="g-Korean-Waves-xlarge-cover-img" class="g-aiImg" alt="" src="./images/Korean-Waves-xlarge-cover.png"/>
		<div id="g-ai4-1" class="g-Layer_1 g-aiAbs g-aiPointText" style="top:12.3028%;margin-top:-45.9px;left:50.0134%;margin-left:-338.5px;width:677px;">
			<p class="g-pstyle0">KOREAN WAVES</p>
		</div>
		<div id="g-ai4-2" class="g-Layer_1 g-aiAbs g-aiPointText" style="top:38.8319%;margin-top:-216.8px;left:35.7217%;margin-left:-163.5px;width:327px;">
			<p class="g-pstyle1">한</p>
		</div>
		<div id="g-ai4-3" class="g-Layer_1 g-aiAbs g-aiPointText" style="top:38.8319%;margin-top:-216.8px;left:64.1422%;margin-left:-165px;width:330px;">
			<p class="g-pstyle1">류</p>
		</div>
	</div>
	</div>
	<Header 
		--headerImage={headerImage}
		--headerBackground={headerBackground}
		--titleColor={titleColor}
		--subtitleColor={subtitleColor}
		--subheadColor={subheadColor}

		fullHeader={false}

		title='Diplomasi K-Pop'

		subhead='Suka tidak suka, keberadaan artis dan/atau idola Kpop akan muncul di depan mata Anda. Entah dalam bentuk billboard BTS segede gaban di pinggir jalan, potongan lagu girl/boy group di akun Youtube gratisan, atau idola yang menjadi brand ambassador marketplace. Kedatangan hallyu wave terasa seperti bom yang tiba-tiba meledak.

		Namun yang membuat kpop jauh lebih menarik dari dunia hiburan lainnya adalah dukungan negara yang begitu besar.'

		author='Volutpat Sapien'
		date=''		
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
			<div id="g-Korean-Waves-box" class="ai2html">
			{#if index == 0}
				<!-- Halaman 1 -->
				<!-- Artboard: smallplus-moonjae -->
				<div id="g-Korean-Waves-smallplus-moonjae" class="g-artboard" style="max-width: 509px;max-height: 1113px" data-aspect-ratio="0.457" data-min-width="0" data-max-width="509"
				style:opacity={offset <= 0.2 ? offset : offset <= 0.8 ? 1 : 1 - offset}>
				<div style="padding: 0 0 218.75% 0;"></div>
						<img id="g-Korean-Waves-smallplus-moonjae-img" class="g-aiImg" alt="" src="./images/Korean-Waves-smallplus-moonjae.png"/>
					</div>
			
				<!-- Artboard: submedium-moonjae -->
				<div id="g-Korean-Waves-submedium-moonjae" class="g-artboard" style="min-width: 510px;max-width: 689px;max-height: 1081px" data-aspect-ratio="0.638" data-min-width="510" data-max-width="689"
				style:opacity={offset <= 0.2 ? offset : offset <= 0.8 ? 1 : 1 - offset}>
				<div style="padding: 0 0 156.8627% 0;"></div>
						<img id="g-Korean-Waves-submedium-moonjae-img" class="g-aiImg" alt="" src="./images/Korean-Waves-submedium-moonjae.png"/>
					</div>
			
				<!-- Artboard: medium-moonjae -->
				<div id="g-Korean-Waves-medium-moonjae" class="g-artboard" style="min-width: 690px;max-width: 919px;max-height: 1364px" data-aspect-ratio="0.674" data-min-width="690" data-max-width="919"
				style:opacity={offset <= 0.2 ? offset : offset <= 0.8 ? 1 : 1 - offset}>
				<div style="padding: 0 0 148.4058% 0;"></div>
						<img id="g-Korean-Waves-medium-moonjae-img" class="g-aiImg" alt="" src="./images/Korean-Waves-medium-moonjae.png"/>
					</div>
			
				<!-- Artboard: large-moonjae -->
				<div id="g-Korean-Waves-large-moonjae" class="g-artboard" style="min-width: 920px;max-width: 1399px;max-height: 1399px" data-aspect-ratio="1" data-min-width="920" data-max-width="1399"
				style:opacity={offset <= 0.2 ? offset : offset <= 0.8 ? 1 : 1 - offset}>
				<div style="padding: 0 0 100% 0;"></div>
						<img id="g-Korean-Waves-large-moonjae-img" class="g-aiImg" alt="" src="./images/Korean-Waves-large-moonjae.png"/>
					</div>
			
				<!-- Artboard: xlarge-moonjae -->
				<div id="g-Korean-Waves-xlarge-moonjae" class="g-artboard" style="min-width: 1400px;" data-aspect-ratio="1.778" data-min-width="1400"
				style:opacity={offset <= 0.2 ? offset : offset <= 0.8 ? 1 : 1 - offset}>
				<div style="padding: 0 0 56.25% 0;"></div>
						<img id="g-Korean-Waves-xlarge-moonjae-img" class="g-aiImg" alt="" src="./images/Korean-Waves-xlarge-moonjae.png"/>
					</div>


			{:else if index == 1}
				<!-- Halaman 2 -->
				<!-- Artboard: smallplus-redvelvet -->
				<div id="g-Korean-Waves-smallplus-redvelvet" class="g-artboard" style="max-width: 509px;max-height: 1113px" data-aspect-ratio="0.457" data-min-width="0" data-max-width="509"
				style:opacity={offset <= 0.2 ? offset : offset <= 0.8 ? 1 : 1 - offset}>
					<div style="padding: 0 0 218.75% 0;"></div>
						<img id="g-Korean-Waves-smallplus-redvelvet-img" class="g-aiImg" alt="" src="./images/Korean-Waves-smallplus-redvelvet.png"/>
					</div>
				
					<!-- Artboard: submedium-redvelvet -->
					<div id="g-Korean-Waves-submedium-redvelvet" class="g-artboard" style="min-width: 510px;max-width: 689px;max-height: 1081px" data-aspect-ratio="0.638" data-min-width="510" data-max-width="689"
					style:opacity={offset <= 0.2 ? offset : offset <= 0.8 ? 1 : 1 - offset}>
				<div style="padding: 0 0 156.8627% 0;"></div>
						<img id="g-Korean-Waves-submedium-redvelvet-img" class="g-aiImg" alt="" src="./images/Korean-Waves-submedium-redvelvet.png"/>
					</div>
				
					<!-- Artboard: medium-redvelvet -->
					<div id="g-Korean-Waves-medium-redvelvet" class="g-artboard" style="min-width: 690px;max-width: 919px;max-height: 1364px" data-aspect-ratio="0.674" data-min-width="690" data-max-width="919"
					style:opacity={offset <= 0.2 ? offset : offset <= 0.8 ? 1 : 1 - offset}>
				<div style="padding: 0 0 148.4058% 0;"></div>
						<img id="g-Korean-Waves-medium-redvelvet-img" class="g-aiImg" alt="" src="./images/Korean-Waves-medium-redvelvet.png"/>
					</div>
				
					<!-- Artboard: large-redvelvet -->
					<div id="g-Korean-Waves-large-redvelvet" class="g-artboard" style="min-width: 920px;max-width: 1399px;max-height: 1399px" data-aspect-ratio="1" data-min-width="920" data-max-width="1399"
					style:opacity={offset <= 0.2 ? offset : offset <= 0.8 ? 1 : 1 - offset}>
				<div style="padding: 0 0 100% 0;"></div>
						<img id="g-Korean-Waves-large-redvelvet-img" class="g-aiImg" alt="" src="./images/Korean-Waves-large-redvelvet.png"/>
					</div>
				
					<!-- Artboard: xlarge-redvelvet -->
					<div id="g-Korean-Waves-xlarge-redvelvet" class="g-artboard" style="min-width: 1400px;" data-aspect-ratio="1.778" data-min-width="1400"
					style:opacity={offset <= 0.2 ? offset : offset <= 0.8 ? 1 : 1 - offset}>
				<div style="padding: 0 0 56.25% 0;"></div>
						<img id="g-Korean-Waves-xlarge-redvelvet-img" class="g-aiImg" alt="" src="./images/Korean-Waves-xlarge-redvelvet.png"/>
					</div>


			{:else if index == 2}
				<!-- Halaman 3 -->
				<!-- Artboard: smallplus-exo -->
				<div id="g-Korean-Waves-smallplus-exo" class="g-artboard" style="max-width: 509px;max-height: 1113px" data-aspect-ratio="0.457" data-min-width="0" data-max-width="509"
				style:opacity={offset <= 0.2 ? offset : offset <= 0.8 ? 1 : 1 - offset}>
				<div style="padding: 0 0 218.75% 0;"></div>
						<img id="g-Korean-Waves-smallplus-exo-img" class="g-aiImg" alt="" src="./images/Korean-Waves-smallplus-exo.png"/>
					</div>
				
					<!-- Artboard: submedium-exo -->
					<div id="g-Korean-Waves-submedium-exo" class="g-artboard" style="min-width: 510px;max-width: 689px;max-height: 1081px" data-aspect-ratio="0.638" data-min-width="510" data-max-width="689"
					style:opacity={offset <= 0.2 ? offset : offset <= 0.8 ? 1 : 1 - offset}>
				<div style="padding: 0 0 156.8627% 0;"></div>
						<img id="g-Korean-Waves-submedium-exo-img" class="g-aiImg" alt="" src="./images/Korean-Waves-submedium-exo.png"/>
					</div>
				
					<!-- Artboard: medium-exo -->
					<div id="g-Korean-Waves-medium-exo" class="g-artboard" style="min-width: 690px;max-width: 919px;max-height: 1364px" data-aspect-ratio="0.674" data-min-width="690" data-max-width="919"
					style:opacity={offset <= 0.2 ? offset : offset <= 0.8 ? 1 : 1 - offset}>
				<div style="padding: 0 0 148.4058% 0;"></div>
						<img id="g-Korean-Waves-medium-exo-img" class="g-aiImg" alt="" src="./images/Korean-Waves-medium-exo.png"/>
					</div>
				
					<!-- Artboard: large-exo -->
					<div id="g-Korean-Waves-large-exo" class="g-artboard" style="min-width: 920px;max-width: 1399px;max-height: 1399px" data-aspect-ratio="1" data-min-width="920" data-max-width="1399"
					style:opacity={offset <= 0.2 ? offset : offset <= 0.8 ? 1 : 1 - offset}>
				<div style="padding: 0 0 100% 0;"></div>
						<img id="g-Korean-Waves-large-exo-img" class="g-aiImg" alt="" src="./images/Korean-Waves-large-exo.png"/>
					</div>
				
					<!-- Artboard: xlarge-exo -->
					<div id="g-Korean-Waves-xlarge-exo" class="g-artboard" style="min-width: 1400px;" data-aspect-ratio="1.778" data-min-width="1400"
					style:opacity={offset <= 0.2 ? offset : offset <= 0.8 ? 1 : 1 - offset}>
				<div style="padding: 0 0 56.25% 0;"></div>
						<img id="g-Korean-Waves-xlarge-exo-img" class="g-aiImg" alt="" src="./images/Korean-Waves-xlarge-exo.png"/>
					</div>


			{:else if index == 3}
				<!-- Halaman 4 -->
				<!-- Artboard: smallplus-bts -->
				<div id="g-Korean-Waves-smallplus-bts" class="g-artboard" style="max-width: 509px;max-height: 1113px" data-aspect-ratio="0.457" data-min-width="0" data-max-width="509"
				style:opacity={offset <= 0.2 ? offset : offset <= 0.8 ? 1 : 1 - offset}>
					<div style="padding: 0 0 218.75% 0;"></div>
							<img id="g-Korean-Waves-smallplus-bts-img" class="g-aiImg" alt="" src="./images/Korean-Waves-smallplus-bts.png"/>
						</div>
					
				<!-- Artboard: submedium-bts -->
				<div id="g-Korean-Waves-submedium-bts" class="g-artboard" style="min-width: 510px;max-width: 689px;max-height: 1081px" data-aspect-ratio="0.638" data-min-width="510" data-max-width="689"
				style:opacity={offset <= 0.2 ? offset : offset <= 0.8 ? 1 : 1 - offset}>
				<div style="padding: 0 0 156.8627% 0;"></div>
						<img id="g-Korean-Waves-submedium-bts-img" class="g-aiImg" alt="" src="./images/Korean-Waves-submedium-bts.png"/>
					</div>
			
				<!-- Artboard: medium-bts -->
				<div id="g-Korean-Waves-medium-bts" class="g-artboard" style="min-width: 690px;max-width: 919px;max-height: 1364px" data-aspect-ratio="0.674" data-min-width="690" data-max-width="919"
				style:opacity={offset <= 0.2 ? offset : offset <= 0.8 ? 1 : 1 - offset}>
				<div style="padding: 0 0 148.4058% 0;"></div>
						<img id="g-Korean-Waves-medium-bts-img" class="g-aiImg" alt="" src="./images/Korean-Waves-medium-bts.png"/>
					</div>
			
				<!-- Artboard: large-bts -->
				<div id="g-Korean-Waves-large-bts" class="g-artboard" style="min-width: 920px;max-width: 1399px;max-height: 1399px" data-aspect-ratio="1" data-min-width="920" data-max-width="1399"
				style:opacity={offset <= 0.2 ? offset : offset <= 0.8 ? 1 : 1 - offset}>
				<div style="padding: 0 0 100% 0;"></div>
						<img id="g-Korean-Waves-large-bts-img" class="g-aiImg" alt="" src="./images/Korean-Waves-large-bts.png"/>
					</div>
			
				<!-- Artboard: xlarge-bts -->
				<div id="g-Korean-Waves-xlarge-bts" class="g-artboard" style="min-width: 1400px;" data-aspect-ratio="1.778" data-min-width="1400"
				style:opacity={offset <= 0.2 ? offset : offset <= 0.8 ? 1 : 1 - offset}>
				<div style="padding: 0 0 56.25% 0;"></div>
						<img id="g-Korean-Waves-xlarge-bts-img" class="g-aiImg" alt="" src="./images/Korean-Waves-xlarge-bts.png"/>
					</div>
			
			{:else if index == 4}
				<!-- Halaman 5 -->
				<!-- Artboard: smallplus-bts -->
				<div id="g-Korean-Waves-smallplus-bts" class="g-artboard" style="max-width: 509px;max-height: 1113px" data-aspect-ratio="0.457" data-min-width="0" data-max-width="509"
				style:opacity={offset <= 0.2 ? offset : offset <= 0.8 ? 1 : 1 - offset}>
					<div style="padding: 0 0 218.75% 0;"></div>
							<img id="g-Korean-Waves-smallplus-bts-img" class="g-aiImg" alt="" src="./images/Korean-Waves-smallplus-bts.png"/>
						</div>
					
				<!-- Artboard: submedium-bts -->
				<div id="g-Korean-Waves-submedium-bts" class="g-artboard" style="min-width: 510px;max-width: 689px;max-height: 1081px" data-aspect-ratio="0.638" data-min-width="510" data-max-width="689"
				style:opacity={offset <= 0.2 ? offset : offset <= 0.8 ? 1 : 1 - offset}>
				<div style="padding: 0 0 156.8627% 0;"></div>
						<img id="g-Korean-Waves-submedium-bts-img" class="g-aiImg" alt="" src="./images/Korean-Waves-submedium-bts.png"/>
					</div>
			
				<!-- Artboard: medium-bts -->
				<div id="g-Korean-Waves-medium-bts" class="g-artboard" style="min-width: 690px;max-width: 919px;max-height: 1364px" data-aspect-ratio="0.674" data-min-width="690" data-max-width="919"
				style:opacity={offset <= 0.2 ? offset : offset <= 0.8 ? 1 : 1 - offset}>
				<div style="padding: 0 0 148.4058% 0;"></div>
						<img id="g-Korean-Waves-medium-bts-img" class="g-aiImg" alt="" src="./images/Korean-Waves-medium-bts.png"/>
					</div>
			
				<!-- Artboard: large-bts -->
				<div id="g-Korean-Waves-large-bts" class="g-artboard" style="min-width: 920px;max-width: 1399px;max-height: 1399px" data-aspect-ratio="1" data-min-width="920" data-max-width="1399"
				style:opacity={offset <= 0.2 ? offset : offset <= 0.8 ? 1 : 1 - offset}>
				<div style="padding: 0 0 100% 0;"></div>
						<img id="g-Korean-Waves-large-bts-img" class="g-aiImg" alt="" src="./images/Korean-Waves-large-bts.png"/>
					</div>
			
				<!-- Artboard: xlarge-bts -->
				<div id="g-Korean-Waves-xlarge-bts" class="g-artboard" style="min-width: 1400px;" data-aspect-ratio="1.778" data-min-width="1400"
				style:opacity={offset <= 0.2 ? offset : offset <= 0.8 ? 1 : 1 - offset}>
				<div style="padding: 0 0 56.25% 0;"></div>
						<img id="g-Korean-Waves-xlarge-bts-img" class="g-aiImg" alt="" src="./images/Korean-Waves-xlarge-bts.png"/>
					</div>

			{/if}
			</div>
		</div>

		<div slot="foreground" >
			<section></section>
			<section>
				<p>
					Presiden Moon Jae-in kerap membawa grup-grup kpop sebagai pendamping diplomatisnya;
				</p>
			</section>
			<section>
				<p>
					Red Velvet menjadi utusan kebudayaan di konser Korea Utara di tahun 2018,
				</p>
			</section>
			<section>
				<p>
					EXO bertemu dengan Donald Trump di tahun 2019,
				</p>
			</section>
			<section>
				<p>
					dan BTS yang dilantik sebagai diplomat khusus di tahun 2021.
				</p>
			</section>
		</div>
	</Scroller>

	<div class="divider"></div>

	<Paragraph
		--font-color ='#f9f9e1'
		para={[
		'Begitu menguntungkannya hubungan antara kpop dengan pemerintahan Korsel sampai-sampai pemerintah membuat tim khusus untuk mempromosikan kpop ke dunia. Namun kesuksesan ini tak akan eksis tanpa adanya bekingan yang besar ke teknologi pendukung, seperti internet cepat dan modal ke perusahaan-perusahaan teknologi lokal. Ini terlihat di pemetaan dana pemerintah di tahun 2012: sepertiga dari modal usaha negara dihabiskan di industri entertainmen.'
		]}
	/>
	<!-- <Image
		--font-color ='#f9f9e1'

		imageTitle='Lorem Ipsum Dolor Sit Amet'
		imageSource='Dokumentasi Pribadi'
	> -->
	

	<div id="g-Korean-Waves-box" class="ai2html">
		<!-- Artboard: smallplus-data -->
	<div id="g-Korean-Waves-smallplus-data" class="g-artboard" style="max-width: 509px;max-height: 1113px" data-aspect-ratio="0.457" data-min-width="0" data-max-width="509">
		<div style="padding: 0 0 218.75% 0;"></div>
				<img id="g-Korean-Waves-smallplus-data-img" class="g-aiImg" alt="" src="./images/Korean-Waves-smallplus-data.png"/>
				<div id="g-ai25-1" class="g-Layer_1 g-aiAbs g-aiPointText" style="top:34.0296%;margin-top:-57.2px;left:49.2184%;margin-left:-148.5px;width:297px;">
					<p class="g-pstyle0"><span class="g-cstyle0">EFEK </span>HALLYU</p>
					<p class="g-pstyle1">PADA PDB</p>
					<p class="g-pstyle0">KOREA SELATAN</p>
				</div>
				<div id="g-ai25-2" class="g-Layer_1 g-aiAbs g-aiPointText" style="top:51.464%;margin-top:-14.2px;left:4.6825%;width:99px;">
					<p class="g-pstyle2">$ 1,87 Miliar</p>
					<p class="g-pstyle2">2004</p>
				</div>
				<div id="g-ai25-3" class="g-Layer_1 g-aiAbs g-aiPointText" style="top:51.464%;margin-top:-14.2px;right:4.0607%;width:99px;">
					<p class="g-pstyle3">$ 12,3 Miliar</p>
					<p class="g-pstyle3">2019</p>
				</div>
			</div>
		
			<!-- Artboard: submedium-data -->
			<div id="g-Korean-Waves-submedium-data" class="g-artboard" style="min-width: 510px;max-width: 689px;max-height: 1081px" data-aspect-ratio="0.638" data-min-width="510" data-max-width="689">
		<div style="padding: 0 0 156.8627% 0;"></div>
				<img id="g-Korean-Waves-submedium-data-img" class="g-aiImg" alt="" src="./images/Korean-Waves-submedium-data.png"/>
				<div id="g-ai26-1" class="g-Layer_1 g-aiAbs g-aiPointText" style="top:26.7684%;margin-top:-75.1px;left:50.0015%;margin-left:-191.5px;width:383px;">
					<p class="g-pstyle0"><span class="g-cstyle0">EFEK </span>HALLYU</p>
					<p class="g-pstyle1">PADA PDB</p>
					<p class="g-pstyle0">KOREA SELATAN</p>
				</div>
				<div id="g-ai26-2" class="g-Layer_1 g-aiAbs g-aiPointText" style="top:50.2573%;margin-top:-23.1px;left:3.7282%;width:147px;">
					<p class="g-pstyle2">$ 1,87 Miliar</p>
					<p class="g-pstyle2">2004</p>
				</div>
				<div id="g-ai26-3" class="g-Layer_1 g-aiAbs g-aiPointText" style="top:50.2573%;margin-top:-23.1px;right:3.1528%;width:147px;">
					<p class="g-pstyle3">$ 12,3 Miliar</p>
					<p class="g-pstyle3">2019</p>
				</div>
			</div>
		
			<!-- Artboard: medium-data -->
			<div id="g-Korean-Waves-medium-data" class="g-artboard" style="min-width: 690px;max-width: 919px;max-height: 1364px" data-aspect-ratio="0.674" data-min-width="690" data-max-width="919">
		<div style="padding: 0 0 148.4058% 0;"></div>
				<img id="g-Korean-Waves-medium-data-img" class="g-aiImg" alt="" src="./images/Korean-Waves-medium-data.png"/>
				<div id="g-ai27-1" class="g-Layer_1 g-aiAbs g-aiPointText" style="top:27.0156%;margin-top:-107.6px;left:50.0224%;margin-left:-269px;width:538px;">
					<p class="g-pstyle0"><span class="g-cstyle0">EFEK </span>HALLYU</p>
					<p class="g-pstyle1">PADA PDB</p>
					<p class="g-pstyle0">KOREA SELATAN</p>
				</div>
				<div id="g-ai27-2" class="g-Layer_1 g-aiAbs g-aiPointText" style="top:49.5576%;margin-top:-31.5px;left:4.0423%;width:190px;">
					<p class="g-pstyle2">$ 1,87 Miliar</p>
					<p class="g-pstyle2">2004</p>
				</div>
				<div id="g-ai27-3" class="g-Layer_1 g-aiAbs g-aiPointText" style="top:49.5576%;margin-top:-31.5px;right:3.4664%;width:190px;">
					<p class="g-pstyle3">$ 12,3 Miliar</p>
					<p class="g-pstyle3">2019</p>
				</div>
			</div>
		
			<!-- Artboard: large-data -->
			<div id="g-Korean-Waves-large-data" class="g-artboard" style="min-width: 920px;max-width: 1399px;max-height: 1399px" data-aspect-ratio="1" data-min-width="920" data-max-width="1399">
		<div style="padding: 0 0 100% 0;"></div>
				<img id="g-Korean-Waves-large-data-img" class="g-aiImg" alt="" src="./images/Korean-Waves-large-data.png"/>
				<div id="g-ai28-1" class="g-Layer_1 g-aiAbs g-aiPointText" style="top:19.2%;margin-top:-107.6px;left:50.0168%;margin-left:-269px;width:538px;">
					<p class="g-pstyle0"><span class="g-cstyle0">EFEK </span>HALLYU</p>
					<p class="g-pstyle1">PADA PDB</p>
					<p class="g-pstyle0">KOREA SELATAN</p>
				</div>
				<div id="g-ai28-2" class="g-Layer_1 g-aiAbs g-aiPointText" style="top:41.7867%;margin-top:-42.4px;left:3.6724%;width:248px;">
					<p class="g-pstyle2">$ 1,87 Miliar</p>
					<p class="g-pstyle2">2004</p>
				</div>
				<div id="g-ai28-3" class="g-Layer_1 g-aiAbs g-aiPointText" style="top:41.7867%;margin-top:-42.4px;right:3.0703%;width:248px;">
					<p class="g-pstyle3">$ 12,3 Miliar</p>
					<p class="g-pstyle3">2019</p>
				</div>
			</div>
		
			<!-- Artboard: xlarge-data -->
			<div id="g-Korean-Waves-xlarge-data" class="g-artboard" style="min-width: 1400px;" data-aspect-ratio="1.778" data-min-width="1400">
		<div style="padding: 0 0 56.25% 0;"></div>
				<img id="g-Korean-Waves-xlarge-data-img" class="g-aiImg" alt="" src="./images/Korean-Waves-xlarge-data.png"/>
				<div id="g-ai29-1" class="g-Layer_1 g-aiAbs g-aiPointText" style="top:12.6527%;margin-top:-71.6px;left:49.9925%;margin-left:-388.5px;width:777px;">
					<p class="g-pstyle0">EFEK <span class="g-cstyle0">HALLYU </span>PADA PDB</p>
					<p class="g-pstyle1">KOREA SELATAN</p>
				</div>
				<div id="g-ai29-2" class="g-Layer_1 g-aiAbs g-aiPointText" style="top:33.1737%;margin-top:-45.2px;left:17.3621%;width:265px;">
					<p class="g-pstyle2">$ 1,87 Miliar</p>
					<p class="g-pstyle2">2004</p>
				</div>
				<div id="g-ai29-3" class="g-Layer_1 g-aiAbs g-aiPointText" style="top:33.1737%;margin-top:-45.2px;right:16.8871%;width:265px;">
					<p class="g-pstyle3">$ 12,3 Miliar</p>
					<p class="g-pstyle3">2019</p>
				</div>
			</div>
	</div>
			
	<!-- </Image> -->
	<Paragraph
		--font-color ='#f9f9e1'
		para={[
		'Namun penggunaan kpop sebagai alat diplomasi ini tak selalu positif. Pemerintah Tiongkok memblokir konten kpop dan kdrama karena Korsel membuat perjanjian militer dengan Amerika Serikat. Hasilnya, kpop terpaksa memfokuskan pasarnya ke Asia Pasifik, salah satunya Indonesia. Strategi ini terhitung sukses: Indonesia merupakan negara paling “berisik” (dan mungkin juga salah satu yang paling banyak menggelontorkan uang) soal kpop di dunia maya. '
		]}
	/>
	<Credit 
		--font-color ='#f9f9e1'
		{ source } { credit }
	/>
</main>

<style>
	.divider {
		height:0.2rem;
		width:60%;
		background-color:#f9f9e1 ;
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
		background-color: black;
		width:90%;
        max-width: 650px;
        margin: 0 auto 0 auto;
        text-align: left;
		border-radius: 1rem;
		font-family: 'Roboto-Mono', monospace;
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
	#g-Korean-Waves-box ,
	#g-Korean-Waves-box .g-artboard {
		margin:0 auto;
	}
	#g-Korean-Waves-box p {
		margin:0;
	}
	#g-Korean-Waves-box .g-aiAbs {
		position:absolute;
	}
	#g-Korean-Waves-box .g-aiImg {
		position:absolute;
		top:0;
		display:block;
		width:100% !important;
	}
	/* #g-Korean-Waves-box .g-aiSymbol {
		position: absolute;
		box-sizing: border-box;
	} */
	#g-Korean-Waves-box .g-aiPointText p { white-space: nowrap; }
	#g-Korean-Waves-smallplus-cover {
		position:relative;
		overflow:hidden;
	}
	#g-Korean-Waves-smallplus-cover p {
		font-family:'Black Han Sans',arial,helvetica,sans-serif;
		line-height:31px;
		height:auto;

		opacity:1;
		letter-spacing:0em;
		font-size:26px;
		text-align:left;
		color:rgb(124,208,243);
		text-transform:none;
		padding-bottom:0;
		padding-top:0;
		mix-blend-mode:normal;
		font-style:normal;
		position:static;
	}
	#g-Korean-Waves-smallplus-cover .g-pstyle0 {
		height:31px;
		text-align:center;
	}
	#g-Korean-Waves-smallplus-cover .g-pstyle1 {
		line-height:146px;
		height:146px;
		font-size:122px;
		text-align:center;
	}
	#g-Korean-Waves-submedium-cover {
		position:relative;
		overflow:hidden;
	}
	#g-Korean-Waves-submedium-cover p {
		font-family:'Black Han Sans',arial,helvetica,sans-serif;
		line-height:55px;
		height:auto;

		opacity:1;
		letter-spacing:0em;
		font-size:46px;
		text-align:left;
		color:rgb(124,208,243);
		text-transform:none;
		padding-bottom:0;
		padding-top:0;
		mix-blend-mode:normal;
		font-style:normal;
		position:static;
	}
	#g-Korean-Waves-submedium-cover .g-pstyle0 {
		height:55px;
		text-align:center;
	}
	#g-Korean-Waves-submedium-cover .g-pstyle1 {
		line-height:258px;
		height:258px;
		font-size:215px;
		text-align:center;
	}
	#g-Korean-Waves-medium-cover {
		position:relative;
		overflow:hidden;
	}
	#g-Korean-Waves-medium-cover p {
		font-family:'Black Han Sans',arial,helvetica,sans-serif;
		line-height:75px;
		height:auto;

		opacity:1;
		letter-spacing:0em;
		font-size:62px;
		text-align:left;
		color:rgb(124,208,243);
		text-transform:none;
		padding-bottom:0;
		padding-top:0;
		mix-blend-mode:normal;
		font-style:normal;
		position:static;
	}
	#g-Korean-Waves-medium-cover .g-pstyle0 {
		height:75px;
		text-align:center;
	}
	#g-Korean-Waves-medium-cover .g-pstyle1 {
		line-height:352px;
		height:352px;
		font-size:294px;
		text-align:center;
	}
	#g-Korean-Waves-large-cover {
		position:relative;
		overflow:hidden;
	}
	#g-Korean-Waves-large-cover p {
		font-family:'Black Han Sans',arial,helvetica,sans-serif;
		line-height:93px;
		height:auto;

		opacity:1;
		letter-spacing:0em;
		font-size:78px;
		text-align:left;
		color:rgb(124,208,243);
		text-transform:none;
		padding-bottom:0;
		padding-top:0;
		mix-blend-mode:normal;
		font-style:normal;
		position:static;
	}
	#g-Korean-Waves-large-cover .g-pstyle0 {
		height:93px;
		text-align:center;
	}
	#g-Korean-Waves-large-cover .g-pstyle1 {
		line-height:438px;
		height:438px;
		font-size:365px;
		text-align:center;
	}
	#g-Korean-Waves-xlarge-cover {
		position:relative;
		overflow:hidden;
	}
	#g-Korean-Waves-xlarge-cover p {
		font-family:'Black Han Sans',arial,helvetica,sans-serif;
		line-height:93px;
		height:auto;

		opacity:1;
		letter-spacing:0em;
		font-size:78px;
		text-align:left;
		color:rgb(124,208,243);
		text-transform:none;
		padding-bottom:0;
		padding-top:0;
		mix-blend-mode:normal;
		font-style:normal;
		position:static;
	}
	#g-Korean-Waves-xlarge-cover .g-pstyle0 {
		height:93px;
		text-align:center;
	}
	#g-Korean-Waves-xlarge-cover .g-pstyle1 {
		line-height:438px;
		height:438px;
		font-size:365px;
		text-align:center;
	}
	#g-Korean-Waves-smallplus-moonjae {
		width:100%;
		position:relative;
		overflow:hidden;
	}
	#g-Korean-Waves-submedium-moonjae {
		position:relative;
		overflow:hidden;
	}
	#g-Korean-Waves-medium-moonjae {
		position:relative;
		overflow:hidden;
	}
	#g-Korean-Waves-large-moonjae {
		position:relative;
		overflow:hidden;
	}
	#g-Korean-Waves-xlarge-moonjae {
		position:relative;
		overflow:hidden;
	}
	#g-Korean-Waves-smallplus-bts {
		position:relative;
		overflow:hidden;
	}
	#g-Korean-Waves-submedium-bts {
		position:relative;
		overflow:hidden;
	}
	#g-Korean-Waves-medium-bts {
		position:relative;
		overflow:hidden;
	}
	#g-Korean-Waves-large-bts {
		position:relative;
		overflow:hidden;
	}
	#g-Korean-Waves-xlarge-bts {
		position:relative;
		overflow:hidden;
	}
	#g-Korean-Waves-smallplus-redvelvet {
		position:relative;
		overflow:hidden;
	}
	#g-Korean-Waves-submedium-redvelvet {
		position:relative;
		overflow:hidden;
	}
	#g-Korean-Waves-medium-redvelvet {
		position:relative;
		overflow:hidden;
	}
	#g-Korean-Waves-large-redvelvet {
		position:relative;
		overflow:hidden;
	}
	#g-Korean-Waves-xlarge-redvelvet {
		position:relative;
		overflow:hidden;
	}
	#g-Korean-Waves-smallplus-exo {
		position:relative;
		overflow:hidden;
	}
	#g-Korean-Waves-submedium-exo {
		position:relative;
		overflow:hidden;
	}
	#g-Korean-Waves-medium-exo {
		position:relative;
		overflow:hidden;
	}
	#g-Korean-Waves-large-exo {
		position:relative;
		overflow:hidden;
	}
	#g-Korean-Waves-xlarge-exo {
		position:relative;
		overflow:hidden;
	}
	#g-Korean-Waves-smallplus-data {
		position:relative;
		overflow:hidden;
	}
	#g-Korean-Waves-smallplus-data p {
		font-family:'Black Han Sans',arial,helvetica,sans-serif;
		line-height:38px;
		height:auto;

		opacity:1;
		letter-spacing:0em;
		font-size:32px;
		text-align:left;
		color:rgb(249,249,225);
		text-transform:none;
		padding-bottom:0;
		padding-top:0;
		mix-blend-mode:normal;
		font-style:normal;
		position:static;
	}
	#g-Korean-Waves-smallplus-data .g-pstyle0 {
		height:38px;
		text-align:center;
	}
	#g-Korean-Waves-smallplus-data .g-pstyle1 {
		height:38px;
		text-align:center;
		color:rgb(124,208,243);
	}
	#g-Korean-Waves-smallplus-data .g-pstyle2 {
		line-height:14px;
		height:14px;
		font-size:12px;
	}
	#g-Korean-Waves-smallplus-data .g-pstyle3 {
		line-height:14px;
		height:14px;
		font-size:12px;
		text-align:right;
		color:rgb(124,208,243);
	}
	#g-Korean-Waves-smallplus-data .g-cstyle0 {
		color:rgb(124,208,243);
	}
	#g-Korean-Waves-submedium-data {
		position:relative;
		overflow:hidden;
	}
	#g-Korean-Waves-submedium-data p {
		font-family:'Black Han Sans',arial,helvetica,sans-serif;
		line-height:50px;
		height:auto;

		opacity:1;
		letter-spacing:0em;
		font-size:42px;
		text-align:left;
		color:rgb(249,249,225);
		text-transform:none;
		padding-bottom:0;
		padding-top:0;
		mix-blend-mode:normal;
		font-style:normal;
		position:static;
	}
	#g-Korean-Waves-submedium-data .g-pstyle0 {
		height:50px;
		text-align:center;
	}
	#g-Korean-Waves-submedium-data .g-pstyle1 {
		height:50px;
		text-align:center;
		color:rgb(124,208,243);
	}
	#g-Korean-Waves-submedium-data .g-pstyle2 {
		line-height:23px;
		height:23px;
		font-size:20px;
	}
	#g-Korean-Waves-submedium-data .g-pstyle3 {
		line-height:23px;
		height:23px;
		font-size:20px;
		text-align:right;
		color:rgb(124,208,243);
	}
	#g-Korean-Waves-submedium-data .g-cstyle0 {
		color:rgb(124,208,243);
	}
	#g-Korean-Waves-medium-data {
		position:relative;
		overflow:hidden;
	}
	#g-Korean-Waves-medium-data p {
		font-family:'Black Han Sans',arial,helvetica,sans-serif;
		line-height:72px;
		height:auto;

		opacity:1;
		letter-spacing:0em;
		font-size:60px;
		text-align:left;
		color:rgb(249,249,225);
		text-transform:none;
		padding-bottom:0;
		padding-top:0;
		mix-blend-mode:normal;
		font-style:normal;
		position:static;
	}
	#g-Korean-Waves-medium-data .g-pstyle0 {
		height:72px;
		text-align:center;
	}
	#g-Korean-Waves-medium-data .g-pstyle1 {
		height:72px;
		text-align:center;
		color:rgb(124,208,243);
	}
	#g-Korean-Waves-medium-data .g-pstyle2 {
		line-height:31px;
		height:31px;
		font-size:26px;
	}
	#g-Korean-Waves-medium-data .g-pstyle3 {
		line-height:31px;
		height:31px;
		font-size:26px;
		text-align:right;
		color:rgb(124,208,243);
	}
	#g-Korean-Waves-medium-data .g-cstyle0 {
		color:rgb(124,208,243);
	}
	#g-Korean-Waves-large-data {
		position:relative;
		overflow:hidden;
	}
	#g-Korean-Waves-large-data p {
		font-family:'Black Han Sans',arial,helvetica,sans-serif;
		line-height:72px;
		height:auto;

		opacity:1;
		letter-spacing:0em;
		font-size:60px;
		text-align:left;
		color:rgb(249,249,225);
		text-transform:none;
		padding-bottom:0;
		padding-top:0;
		mix-blend-mode:normal;
		font-style:normal;
		position:static;
	}
	#g-Korean-Waves-large-data .g-pstyle0 {
		height:72px;
		text-align:center;
	}
	#g-Korean-Waves-large-data .g-pstyle1 {
		height:72px;
		text-align:center;
		color:rgb(124,208,243);
	}
	#g-Korean-Waves-large-data .g-pstyle2 {
		line-height:42px;
		height:42px;
		font-size:35px;
	}
	#g-Korean-Waves-large-data .g-pstyle3 {
		line-height:42px;
		height:42px;
		font-size:35px;
		text-align:right;
		color:rgb(124,208,243);
	}
	#g-Korean-Waves-large-data .g-cstyle0 {
		color:rgb(124,208,243);
	}
	#g-Korean-Waves-xlarge-data {
		position:relative;
		overflow:hidden;
	}
	#g-Korean-Waves-xlarge-data p {
		font-family:'Black Han Sans',arial,helvetica,sans-serif;
		line-height:72px;
		height:auto;

		opacity:1;
		letter-spacing:0em;
		font-size:60px;
		text-align:left;
		color:rgb(124,208,243);
		text-transform:none;
		padding-bottom:0;
		padding-top:0;
		mix-blend-mode:normal;
		font-style:normal;
		position:static;
	}
	#g-Korean-Waves-xlarge-data .g-pstyle0 {
		height:72px;
		text-align:center;
	}
	#g-Korean-Waves-xlarge-data .g-pstyle1 {
		height:72px;
		text-align:center;
		color:rgb(249,249,225);
	}
	#g-Korean-Waves-xlarge-data .g-pstyle2 {
		line-height:45px;
		height:45px;
		font-size:38px;
		color:rgb(249,249,225);
	}
	#g-Korean-Waves-xlarge-data .g-pstyle3 {
		line-height:45px;
		height:45px;
		font-size:38px;
		text-align:right;
	}
	#g-Korean-Waves-xlarge-data .g-cstyle0 {
		color:rgb(249,249,225);
	}

	@media only screen and (max-width:509px) {
		#g-Korean-Waves-xlarge-cover,
		#g-Korean-Waves-xlarge-moonjae,
		#g-Korean-Waves-xlarge-bts,
		#g-Korean-Waves-xlarge-redvelvet,
		#g-Korean-Waves-xlarge-exo,
		#g-Korean-Waves-xlarge-data {
			display:none;
		}

		#g-Korean-Waves-large-cover,
		#g-Korean-Waves-large-moonjae,
		#g-Korean-Waves-large-bts,
		#g-Korean-Waves-large-redvelvet,
		#g-Korean-Waves-large-exo,
		#g-Korean-Waves-large-data {
			display:none;
		}

		#g-Korean-Waves-medium-cover,
		#g-Korean-Waves-medium-moonjae,
		#g-Korean-Waves-medium-bts,
		#g-Korean-Waves-medium-redvelvet,
		#g-Korean-Waves-medium-exo,
		#g-Korean-Waves-medium-data {
			display:none;
		}

		#g-Korean-Waves-submedium-cover,
		#g-Korean-Waves-submedium-moonjae,
		#g-Korean-Waves-submedium-bts,
		#g-Korean-Waves-submedium-redvelvet,
		#g-Korean-Waves-submedium-exo,
		#g-Korean-Waves-submedium-data {
			display:none;
		}

		#g-Korean-Waves-smallplus-cover,
		#g-Korean-Waves-smallplus-moonjae,
		#g-Korean-Waves-smallplus-bts,
		#g-Korean-Waves-smallplus-redvelvet,
		#g-Korean-Waves-smallplus-exo,
		#g-Korean-Waves-smallplus-data {
			display:block;
		}
	}

	@media only screen and (min-width:510px) and (max-width:689px) {
		#g-Korean-Waves-xlarge-cover,
		#g-Korean-Waves-xlarge-moonjae,
		#g-Korean-Waves-xlarge-bts,
		#g-Korean-Waves-xlarge-redvelvet,
		#g-Korean-Waves-xlarge-exo,
		#g-Korean-Waves-xlarge-data {
			display:none;
		}

		#g-Korean-Waves-large-cover,
		#g-Korean-Waves-large-moonjae,
		#g-Korean-Waves-large-bts,
		#g-Korean-Waves-large-redvelvet,
		#g-Korean-Waves-large-exo,
		#g-Korean-Waves-large-data {
			display:none;
		}

		#g-Korean-Waves-medium-cover,
		#g-Korean-Waves-medium-moonjae,
		#g-Korean-Waves-medium-bts,
		#g-Korean-Waves-medium-redvelvet,
		#g-Korean-Waves-medium-exo,
		#g-Korean-Waves-medium-data {
			display:none;
		}

		#g-Korean-Waves-submedium-cover,
		#g-Korean-Waves-submedium-moonjae,
		#g-Korean-Waves-submedium-bts,
		#g-Korean-Waves-submedium-redvelvet,
		#g-Korean-Waves-submedium-exo,
		#g-Korean-Waves-submedium-data {
			display:block;
		}

		#g-Korean-Waves-smallplus-cover,
		#g-Korean-Waves-smallplus-moonjae,
		#g-Korean-Waves-smallplus-bts,
		#g-Korean-Waves-smallplus-redvelvet,
		#g-Korean-Waves-smallplus-exo,
		#g-Korean-Waves-smallplus-data {
			display:none;
		}
	}

	@media only screen and (min-width:690px) and (max-width:919px) {
		#g-Korean-Waves-xlarge-cover,
		#g-Korean-Waves-xlarge-moonjae,
		#g-Korean-Waves-xlarge-bts,
		#g-Korean-Waves-xlarge-redvelvet,
		#g-Korean-Waves-xlarge-exo,
		#g-Korean-Waves-xlarge-data {
			display:none;
		}

		#g-Korean-Waves-large-cover,
		#g-Korean-Waves-large-moonjae,
		#g-Korean-Waves-large-bts,
		#g-Korean-Waves-large-redvelvet,
		#g-Korean-Waves-large-exo,
		#g-Korean-Waves-large-data {
			display:none;
		}

		#g-Korean-Waves-medium-cover,
		#g-Korean-Waves-medium-moonjae,
		#g-Korean-Waves-medium-bts,
		#g-Korean-Waves-medium-redvelvet,
		#g-Korean-Waves-medium-exo,
		#g-Korean-Waves-medium-data {
			display:block;
		}

		#g-Korean-Waves-submedium-cover,
		#g-Korean-Waves-submedium-moonjae,
		#g-Korean-Waves-submedium-bts,
		#g-Korean-Waves-submedium-redvelvet,
		#g-Korean-Waves-submedium-exo,
		#g-Korean-Waves-submedium-data {
			display:none;
		}

		#g-Korean-Waves-smallplus-cover,
		#g-Korean-Waves-smallplus-moonjae,
		#g-Korean-Waves-smallplus-bts,
		#g-Korean-Waves-smallplus-redvelvet,
		#g-Korean-Waves-smallplus-exo,
		#g-Korean-Waves-smallplus-data {
			display:none;
		}
	}

	@media only screen and (min-width:920px) and (max-width:1399px) {
		#g-Korean-Waves-xlarge-cover,
		#g-Korean-Waves-xlarge-moonjae,
		#g-Korean-Waves-xlarge-bts,
		#g-Korean-Waves-xlarge-redvelvet,
		#g-Korean-Waves-xlarge-exo,
		#g-Korean-Waves-xlarge-data {
			display:none;
		}

		#g-Korean-Waves-large-cover,
		#g-Korean-Waves-large-moonjae,
		#g-Korean-Waves-large-bts,
		#g-Korean-Waves-large-redvelvet,
		#g-Korean-Waves-large-exo,
		#g-Korean-Waves-large-data {
			display:block;
		}

		#g-Korean-Waves-medium-cover,
		#g-Korean-Waves-medium-moonjae,
		#g-Korean-Waves-medium-bts,
		#g-Korean-Waves-medium-redvelvet,
		#g-Korean-Waves-medium-exo,
		#g-Korean-Waves-medium-data {
			display:none;
		}

		#g-Korean-Waves-submedium-cover,
		#g-Korean-Waves-submedium-moonjae,
		#g-Korean-Waves-submedium-bts,
		#g-Korean-Waves-submedium-redvelvet,
		#g-Korean-Waves-submedium-exo,
		#g-Korean-Waves-submedium-data {
			display:none;
		}

		#g-Korean-Waves-smallplus-cover,
		#g-Korean-Waves-smallplus-moonjae,
		#g-Korean-Waves-smallplus-bts,
		#g-Korean-Waves-smallplus-redvelvet,
		#g-Korean-Waves-smallplus-exo,
		#g-Korean-Waves-smallplus-data {
			display:none;
		}
	}

	@media only screen and (min-width:1400px) {
		#g-Korean-Waves-xlarge-cover,
		#g-Korean-Waves-xlarge-moonjae,
		#g-Korean-Waves-xlarge-bts,
		#g-Korean-Waves-xlarge-redvelvet,
		#g-Korean-Waves-xlarge-exo,
		#g-Korean-Waves-xlarge-data {
			display:block;
		}

		#g-Korean-Waves-large-cover,
		#g-Korean-Waves-large-moonjae,
		#g-Korean-Waves-large-bts,
		#g-Korean-Waves-large-redvelvet,
		#g-Korean-Waves-large-exo,
		#g-Korean-Waves-large-data {
			display:none;
		}

		#g-Korean-Waves-medium-cover,
		#g-Korean-Waves-medium-moonjae,
		#g-Korean-Waves-medium-bts,
		#g-Korean-Waves-medium-redvelvet,
		#g-Korean-Waves-medium-exo,
		#g-Korean-Waves-medium-data {
			display:none;
		}

		#g-Korean-Waves-submedium-cover,
		#g-Korean-Waves-submedium-moonjae,
		#g-Korean-Waves-submedium-bts,
		#g-Korean-Waves-submedium-redvelvet,
		#g-Korean-Waves-submedium-exo,
		#g-Korean-Waves-submedium-data {
			display:none;
		}

		#g-Korean-Waves-smallplus-cover,
		#g-Korean-Waves-smallplus-moonjae,
		#g-Korean-Waves-smallplus-bts,
		#g-Korean-Waves-smallplus-redvelvet,
		#g-Korean-Waves-smallplus-exo,
		#g-Korean-Waves-smallplus-data {
			display:none;
		}
	}

</style>