<script>
	import Header from './Header.svelte';
	import Paragraph from './Paragraph.svelte';
	import Quote from './Quote.svelte';
	import Image from './Image.svelte';
	import Credit from './Credit.svelte';

	//Main Font
	let fontfamily1 = "Roboto Mono"

	//Main Color
	let fontColor = 'black'

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
	let headerBackground='#761fff'
	let titleColor='hsl(0,0%,0%)'
	let subtitleColor='hsl(0,0%,0%)'
	let subheadColor='hsl(0,0%,0%)'

	let height

	let credit =[{
		role : 'Penulis',
		name : 'Ann Putri'
		}]
	let source = ''

</script>

<svelte:head>
	<meta
		name='viewport' 
		content='width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0'
	/>
	
	<link rel="preconnect" href="https://fonts.googleapis.com">
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
</svelte:head>

<main style="background-color: {mainBackground}">
	<div class="headerilustrasi" style="margin-top:{height}px;">
		<div id="g-_Nasib-Pekerja-Jakarta--Stres-dan-Tua-di-Jalan_-box" class="ai2html">
			<!-- Artboard: cover_smallplus -->
			<div id="g-_Nasib-Pekerja-Jakarta--Stres-dan-Tua-di-Jalan_-cover_smallplus" class="g-artboard"  data-aspect-ratio="1" data-min-width="0" data-max-width="509">
			<div style="padding: 0 0 100% 0;"></div>
			<img id="g-_Nasib-Pekerja-Jakarta--Stres-dan-Tua-di-Jalan_-cover_smallplus_img" class="g-aiImg" alt="" src="./images/_Nasib-Pekerja-Jakarta--Stres-dan-Tua-di-Jalan_-cover_smallplus.png"/>
			</div>
				
			<!-- Artboard: cover_submedium -->
			<div id="g-_Nasib-Pekerja-Jakarta--Stres-dan-Tua-di-Jalan_-cover_submedium" class="g-artboard"  data-aspect-ratio="1.594" data-min-width="510" data-max-width="689">
				<div style="padding: 0 0 {100/1.594}% 0;"></div>
			<img id="g-_Nasib-Pekerja-Jakarta--Stres-dan-Tua-di-Jalan_-cover_submedium_img" class="g-aiImg" alt="" src="./images/_Nasib-Pekerja-Jakarta--Stres-dan-Tua-di-Jalan_-cover_submedium.png"/>
			</div>
				
			<!-- Artboard: cover_medium -->
			<div id="g-_Nasib-Pekerja-Jakarta--Stres-dan-Tua-di-Jalan_-cover_medium" class="g-artboard"  data-aspect-ratio="2.156" data-min-width="690" data-max-width="919">
				<div style="padding: 0 0 {100/2.156}% 0;"></div>
			<img id="g-_Nasib-Pekerja-Jakarta--Stres-dan-Tua-di-Jalan_-cover_medium_img" class="g-aiImg" alt="" src="./images/_Nasib-Pekerja-Jakarta--Stres-dan-Tua-di-Jalan_-cover_medium.png"/>
			</div>
				
			<!-- Artboard: cover_large -->
			<div id="g-_Nasib-Pekerja-Jakarta--Stres-dan-Tua-di-Jalan_-cover_large" class="g-artboard"  data-aspect-ratio="2.884" data-min-width="920" data-max-width="1399">
				<div style="padding: 0 0 {100/2.884}% 0;"></div>
			<img id="g-_Nasib-Pekerja-Jakarta--Stres-dan-Tua-di-Jalan_-cover_large_img" class="g-aiImg" alt="" src="./images/_Nasib-Pekerja-Jakarta--Stres-dan-Tua-di-Jalan_-cover_large.png"/>
			</div>
				
			<!-- Artboard: cover_xlarge_5 -->
			<div id="g-_Nasib-Pekerja-Jakarta--Stres-dan-Tua-di-Jalan_-cover_xlarge_5" class="g-artboard"  data-aspect-ratio="4.466" data-min-width="1400">
				<div style="padding: 0 0 {100/4.466}% 0;"></div>
			<img id="g-_Nasib-Pekerja-Jakarta--Stres-dan-Tua-di-Jalan_-cover_xlarge_5-img" class="g-aiImg" alt="" src="./images/_Nasib-Pekerja-Jakarta--Stres-dan-Tua-di-Jalan_-cover_xlarge_5.png"/>
			</div>
	

	<Header 
		--headerBackground={headerBackground}
		--titleColor={titleColor}
		--subtitleColor={subtitleColor}
		--subheadColor={subheadColor}

		fullHeader={false}

		title='Nasib Pekerja Jakarta'
		subtitle='Stres & Tua di Jalan'		

		author='Ann Putri'
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
			<div id="g-_Nasib-Pekerja-Jakarta--Stres-dan-Tua-di-Jalan_-box" class="ai2html">
				{#if index == 0}
					<!-- Halaman 1 -->
					<!-- Artboard: smallplus_1 -->
					<div id="g-_Nasib-Pekerja-Jakarta--Stres-dan-Tua-di-Jalan_-smallplus_1" class="g-artboard" data-aspect-ratio="0.457" data-min-width="0"
					style:opacity={offset <= 0.2 ? offset : offset <= 0.8 ? 1 : 1 - offset}
					data-max-width="509">
					<div style="padding: 0 0 218.75% 0;"></div>
					<img id="g-_Nasib-Pekerja-Jakarta--Stres-dan-Tua-di-Jalan_-smallplus_1-img" class="g-aiImg" alt="" src="./images/_Nasib-Pekerja-Jakarta--Stres-dan-Tua-di-Jalan_-smallplus_1.png"/>
					</div>

					<!-- Artboard: submedium_1 -->
					<div id="g-_Nasib-Pekerja-Jakarta--Stres-dan-Tua-di-Jalan_-submedium_1" class="g-artboard" data-aspect-ratio="0.637" data-min-width="510" 
					style:opacity={offset <= 0.2 ? offset : offset <= 0.8 ? 1 : 1 - offset}
					data-max-width="689">
					<div style="padding: 0 0 {100/0.637}% 0;"></div>
					<img id="g-_Nasib-Pekerja-Jakarta--Stres-dan-Tua-di-Jalan_-submedium_1-img" class="g-aiImg" alt="" src="./images/_Nasib-Pekerja-Jakarta--Stres-dan-Tua-di-Jalan_-submedium_1.png"/>
					</div>

					<!-- Artboard: medium_1 -->
					<div id="g-_Nasib-Pekerja-Jakarta--Stres-dan-Tua-di-Jalan_-medium_1" class="g-artboard" data-aspect-ratio="0.674" data-min-width="690" data-max-width="919"
					style:opacity={offset <= 0.2 ? offset : offset <= 0.8 ? 1 : 1 - offset}>
					<div style="padding: 0 0 {100/0.674}% 0;"></div>
					<img id="g-_Nasib-Pekerja-Jakarta--Stres-dan-Tua-di-Jalan_-medium_1-img" class="g-aiImg" alt="" src="./images/_Nasib-Pekerja-Jakarta--Stres-dan-Tua-di-Jalan_-medium_1.png"/>
					</div>

					<!-- Artboard: large_1 -->
					<div id="g-_Nasib-Pekerja-Jakarta--Stres-dan-Tua-di-Jalan_-large_1" class="g-artboard" data-aspect-ratio="1" data-min-width="920" 
					style:opacity={offset <= 0.2 ? offset : offset <= 0.8 ? 1 : 1 - offset}
					data-max-width="1399">
					<div style="padding: 0 0 {100/1}% 0;"></div>
					<img id="g-_Nasib-Pekerja-Jakarta--Stres-dan-Tua-di-Jalan_-large_1-img" class="g-aiImg" alt="" src="./images/_Nasib-Pekerja-Jakarta--Stres-dan-Tua-di-Jalan_-large_1.png"/>
					</div>

					<!-- Artboard: xlarge_1 -->
					<div id="g-_Nasib-Pekerja-Jakarta--Stres-dan-Tua-di-Jalan_-xlarge_1" class="g-artboard" data-aspect-ratio="1.778" data-min-width="1400"
					style:opacity={offset <= 0.2 ? offset : offset <= 0.8 ? 1 : 1 - offset}
					>
					<div style="padding: 0 0 {100/1.778}% 0;"></div>
					<img id="g-_Nasib-Pekerja-Jakarta--Stres-dan-Tua-di-Jalan_-xlarge_1-img" class="g-aiImg" alt="" src="./images/_Nasib-Pekerja-Jakarta--Stres-dan-Tua-di-Jalan_-xlarge_1.png"/>
					</div>


				{:else if index == 1}
					<!-- Halaman 2 -->
					<!-- Artboard: smallplus_2 -->
					<div id="g-_Nasib-Pekerja-Jakarta--Stres-dan-Tua-di-Jalan_-smallplus_2" class="g-artboard"  data-aspect-ratio="0.457" data-min-width="0" data-max-width="509"
					style:opacity={offset <= 0.2 ? offset : offset <= 0.8 ? 1 : 1 - offset}>
					<div style="padding: 0 0 218.75% 0;"></div>
					<img id="g-_Nasib-Pekerja-Jakarta--Stres-dan-Tua-di-Jalan_-smallplus_2-img" class="g-aiImg" alt="" src="./images/_Nasib-Pekerja-Jakarta--Stres-dan-Tua-di-Jalan_-smallplus_2.png"/>
					</div>

					<!-- Artboard: submedium_2 -->
					<div id="g-_Nasib-Pekerja-Jakarta--Stres-dan-Tua-di-Jalan_-submedium_2" class="g-artboard"  data-aspect-ratio="0.638" data-min-width="510" data-max-width="689"
					style:opacity={offset <= 0.2 ? offset : offset <= 0.8 ? 1 : 1 - offset}>
					<div style="padding: 0 0 {100/0.638}% 0;"></div>
					<img id="g-_Nasib-Pekerja-Jakarta--Stres-dan-Tua-di-Jalan_-submedium_2-img" class="g-aiImg" alt="" src="./images/_Nasib-Pekerja-Jakarta--Stres-dan-Tua-di-Jalan_-submedium_2.png"/>
					</div>

					<!-- Artboard: medium_2 -->
					<div id="g-_Nasib-Pekerja-Jakarta--Stres-dan-Tua-di-Jalan_-medium_2" class="g-artboard"  data-aspect-ratio="0.674" data-min-width="690" data-max-width="919"
					style:opacity={offset <= 0.2 ? offset : offset <= 0.8 ? 1 : 1 - offset}>
					<div style="padding: 0 0 {100/0.674}% 0;"></div>
					<img id="g-_Nasib-Pekerja-Jakarta--Stres-dan-Tua-di-Jalan_-medium_2-img" class="g-aiImg" alt="" src="./images/_Nasib-Pekerja-Jakarta--Stres-dan-Tua-di-Jalan_-medium_2.png"/>
					</div>

					<!-- Artboard: large_2 -->
					<div id="g-_Nasib-Pekerja-Jakarta--Stres-dan-Tua-di-Jalan_-large_2" class="g-artboard"  data-aspect-ratio="1" data-min-width="920" data-max-width="1399"
					style:opacity={offset <= 0.2 ? offset : offset <= 0.8 ? 1 : 1 - offset}>
					<div style="padding: 0 0 {100/1}% 0;"></div>
					<img id="g-_Nasib-Pekerja-Jakarta--Stres-dan-Tua-di-Jalan_-large_2-img" class="g-aiImg" alt="" src="./images/_Nasib-Pekerja-Jakarta--Stres-dan-Tua-di-Jalan_-large_2.png"/>
					</div>

					<!-- Artboard: xlarge_2 -->
					<div id="g-_Nasib-Pekerja-Jakarta--Stres-dan-Tua-di-Jalan_-xlarge_2" class="g-artboard"  data-aspect-ratio="1.778" data-min-width="1400"
					style:opacity={offset <= 0.2 ? offset : offset <= 0.8 ? 1 : 1 - offset}>
					<div style="padding: 0 0 {100/1.778}% 0;"></div>
					<img id="g-_Nasib-Pekerja-Jakarta--Stres-dan-Tua-di-Jalan_-xlarge_2-img" class="g-aiImg" alt="" src="./images/_Nasib-Pekerja-Jakarta--Stres-dan-Tua-di-Jalan_-xlarge_2.png"/>
					</div>


				{:else if index == 2}
					<!-- Halaman 3 -->
					<!-- Artboard: smallplus_3 -->
					<div id="g-_Nasib-Pekerja-Jakarta--Stres-dan-Tua-di-Jalan_-smallplus_3" class="g-artboard"  data-aspect-ratio="0.457" data-min-width="0" data-max-width="509"
					style:opacity={offset <= 0.2 ? offset : offset <= 0.8 ? 1 : 1 - offset}>
					<div style="padding: 0 0 218.75% 0;"></div>
					<img id="g-_Nasib-Pekerja-Jakarta--Stres-dan-Tua-di-Jalan_-smallplus_3-img" class="g-aiImg" alt="" src="./images/_Nasib-Pekerja-Jakarta--Stres-dan-Tua-di-Jalan_-smallplus_3.png"/>
					</div>

					<!-- Artboard: submedium_3 -->
					<div id="g-_Nasib-Pekerja-Jakarta--Stres-dan-Tua-di-Jalan_-submedium_3" class="g-artboard"  data-aspect-ratio="0.638" data-min-width="510" data-max-width="689"
					style:opacity={offset <= 0.2 ? offset : offset <= 0.8 ? 1 : 1 - offset}>
					<div style="padding: 0 0 {100/0.638}% 0;"></div>
					<img id="g-_Nasib-Pekerja-Jakarta--Stres-dan-Tua-di-Jalan_-submedium_3-img" class="g-aiImg" alt="" src="./images/_Nasib-Pekerja-Jakarta--Stres-dan-Tua-di-Jalan_-submedium_3.png"/>
					</div>

					<!-- Artboard: medium_3 -->
					<div id="g-_Nasib-Pekerja-Jakarta--Stres-dan-Tua-di-Jalan_-medium_3" class="g-artboard"  data-aspect-ratio="0.674" data-min-width="690" data-max-width="919"
					style:opacity={offset <= 0.2 ? offset : offset <= 0.8 ? 1 : 1 - offset}>
					<div style="padding: 0 0 {100/0.674}% 0;"></div>
					<img id="g-_Nasib-Pekerja-Jakarta--Stres-dan-Tua-di-Jalan_-medium_3-img" class="g-aiImg" alt="" src="./images/_Nasib-Pekerja-Jakarta--Stres-dan-Tua-di-Jalan_-medium_3.png"/>
					</div>

					<!-- Artboard: large_3 -->
					<div id="g-_Nasib-Pekerja-Jakarta--Stres-dan-Tua-di-Jalan_-large_3" class="g-artboard"  data-aspect-ratio="1" data-min-width="920" data-max-width="1399"
					style:opacity={offset <= 0.2 ? offset : offset <= 0.8 ? 1 : 1 - offset}>
					<div style="padding: 0 0 {100/1}% 0;"></div>
					<img id="g-_Nasib-Pekerja-Jakarta--Stres-dan-Tua-di-Jalan_-large_3-img" class="g-aiImg" alt="" src="./images/_Nasib-Pekerja-Jakarta--Stres-dan-Tua-di-Jalan_-large_3.png"/>
					</div>

					<!-- Artboard: xlarge_3 -->
					<div id="g-_Nasib-Pekerja-Jakarta--Stres-dan-Tua-di-Jalan_-xlarge_3" class="g-artboard"  data-aspect-ratio="1.778" data-min-width="1400"
					style:opacity={offset <= 0.2 ? offset : offset <= 0.8 ? 1 : 1 - offset}>
					<div style="padding: 0 0 {100/1.778}% 0;"></div>
					<img id="g-_Nasib-Pekerja-Jakarta--Stres-dan-Tua-di-Jalan_-xlarge_3-img" class="g-aiImg" alt="" src="./images/_Nasib-Pekerja-Jakarta--Stres-dan-Tua-di-Jalan_-xlarge_3.png"/>
					</div>


				{:else if index == 3}
					<!-- Halaman 4 -->
					<!-- KOSONG -- HANYA TEKS -->
				{:else if index == 4}
					<!-- Halaman 5 -->
					<!-- Artboard: smallplus_4 -->
					<div id="g-_Nasib-Pekerja-Jakarta--Stres-dan-Tua-di-Jalan_-smallplus_4" class="g-artboard"  data-aspect-ratio="0.457" data-min-width="0" data-max-width="509"
					style:opacity={offset <= 0.2 ? offset : offset <= 0.8 ? 1 : 1 - offset}>
					<div style="padding: 0 0 218.75% 0;"></div>
					<img id="g-_Nasib-Pekerja-Jakarta--Stres-dan-Tua-di-Jalan_-smallplus_4-img" class="g-aiImg" alt="" src="./images/_Nasib-Pekerja-Jakarta--Stres-dan-Tua-di-Jalan_-smallplus_4.png"/>
					</div>

					<!-- Artboard: submedium_4 -->
					<div id="g-_Nasib-Pekerja-Jakarta--Stres-dan-Tua-di-Jalan_-submedium_4" class="g-artboard"  data-aspect-ratio="0.638" data-min-width="510" data-max-width="689"
					style:opacity={offset <= 0.2 ? offset : offset <= 0.8 ? 1 : 1 - offset}>
					<div style="padding: 0 0 {100/0.638}% 0;"></div>
					<img id="g-_Nasib-Pekerja-Jakarta--Stres-dan-Tua-di-Jalan_-submedium_4-img" class="g-aiImg" alt="" src="./images/_Nasib-Pekerja-Jakarta--Stres-dan-Tua-di-Jalan_-submedium_4.png"/>
					</div>

					<!-- Artboard: medium_4 -->
					<div id="g-_Nasib-Pekerja-Jakarta--Stres-dan-Tua-di-Jalan_-medium_4" class="g-artboard"  data-aspect-ratio="0.674" data-min-width="690" data-max-width="919"
					style:opacity={offset <= 0.2 ? offset : offset <= 0.8 ? 1 : 1 - offset}>
					<div style="padding: 0 0 {100/0.674}% 0;"></div>
					<img id="g-_Nasib-Pekerja-Jakarta--Stres-dan-Tua-di-Jalan_-medium_4-img" class="g-aiImg" alt="" src="./images/_Nasib-Pekerja-Jakarta--Stres-dan-Tua-di-Jalan_-medium_4.png"/>
					</div>

					<!-- Artboard: large_4 -->
					<div id="g-_Nasib-Pekerja-Jakarta--Stres-dan-Tua-di-Jalan_-large_4" class="g-artboard"  data-aspect-ratio="1" data-min-width="920" data-max-width="1399"
					style:opacity={offset <= 0.2 ? offset : offset <= 0.8 ? 1 : 1 - offset}>
					<div style="padding: 0 0 {100/1}% 0;"></div>
					<img id="g-_Nasib-Pekerja-Jakarta--Stres-dan-Tua-di-Jalan_-large_4-img" class="g-aiImg" alt="" src="./images/_Nasib-Pekerja-Jakarta--Stres-dan-Tua-di-Jalan_-large_4.png"/>
					</div>

					<!-- Artboard: xlarge_4 -->
					<div id="g-_Nasib-Pekerja-Jakarta--Stres-dan-Tua-di-Jalan_-xlarge_4" class="g-artboard"  data-aspect-ratio="1.778" data-min-width="1400"
					style:opacity={offset <= 0.2 ? offset : offset <= 0.8 ? 1 : 1 - offset}>
					<div style="padding: 0 0 {100/1.778}% 0;"></div>
					<img id="g-_Nasib-Pekerja-Jakarta--Stres-dan-Tua-di-Jalan_-xlarge_4-img" class="g-aiImg" alt="" src="./images/_Nasib-Pekerja-Jakarta--Stres-dan-Tua-di-Jalan_-xlarge_4.png"/>
					</div>
				
				{:else if index == 5}
					<!-- Halaman 6 -->
					<!-- KOSONG -- HANYA TEKS -->
				{:else if index == 6}
					<!-- Halaman 7 -->
					<!-- KOSONG -- HANYA TEKS -->
				{:else if index == 7}
					<!-- Halaman 8 -->
					<!-- Artboard: smallplus_5 -->
					<div id="g-_Nasib-Pekerja-Jakarta--Stres-dan-Tua-di-Jalan_-smallplus_5" class="g-artboard" data-aspect-ratio="0.457" data-min-width="0" data-max-width="509"
					style:opacity={offset <= 0.2 ? offset : offset <= 0.8 ? 1 : 1 - offset}>
					<div style="padding: 0 0 218.75% 0;"></div>
					<img id="g-_Nasib-Pekerja-Jakarta--Stres-dan-Tua-di-Jalan_-smallplus_5-img" class="g-aiImg" alt="" src="./images/_Nasib-Pekerja-Jakarta--Stres-dan-Tua-di-Jalan_-smallplus_5.png"/>
					</div>

					<!-- Artboard: submedium_5 -->
					<div id="g-_Nasib-Pekerja-Jakarta--Stres-dan-Tua-di-Jalan_-submedium_5" class="g-artboard" data-aspect-ratio="0.638" data-min-width="510" data-max-width="689"
					style:opacity={offset <= 0.2 ? offset : offset <= 0.8 ? 1 : 1 - offset}>
					<div style="padding: 0 0 {100/0.638}% 0;"></div>
					<img id="g-_Nasib-Pekerja-Jakarta--Stres-dan-Tua-di-Jalan_-submedium_5-img" class="g-aiImg" alt="" src="./images/_Nasib-Pekerja-Jakarta--Stres-dan-Tua-di-Jalan_-submedium_5.png"/>
					</div>

					<!-- Artboard: medium_5 -->
					<div id="g-_Nasib-Pekerja-Jakarta--Stres-dan-Tua-di-Jalan_-medium_5" class="g-artboard" s data-aspect-ratio="0.674" data-min-width="690" data-max-width="919"
					style:opacity={offset <= 0.2 ? offset : offset <= 0.8 ? 1 : 1 - offset}>
					<div style="padding: 0 0 {100/0.674}% 0;"></div>
					<img id="g-_Nasib-Pekerja-Jakarta--Stres-dan-Tua-di-Jalan_-medium_5-img" class="g-aiImg" alt="" src="./images/_Nasib-Pekerja-Jakarta--Stres-dan-Tua-di-Jalan_-medium_5.png"/>
					</div>

					<!-- Artboard: large_5 -->
					<div id="g-_Nasib-Pekerja-Jakarta--Stres-dan-Tua-di-Jalan_-large_5" class="g-artboard"  data-aspect-ratio="1" data-min-width="920" data-max-width="1399"
					style:opacity={offset <= 0.2 ? offset : offset <= 0.8 ? 1 : 1 - offset}>
					<div style="padding: 0 0 {100/1}% 0;"></div>
					<img id="g-_Nasib-Pekerja-Jakarta--Stres-dan-Tua-di-Jalan_-large_5-img" class="g-aiImg" alt="" src="./images/_Nasib-Pekerja-Jakarta--Stres-dan-Tua-di-Jalan_-large_5.png"/>
					</div>

					<!-- Artboard: xlarge_5 -->
					<div id="g-_Nasib-Pekerja-Jakarta--Stres-dan-Tua-di-Jalan_-xlarge_5" class="g-artboard"  data-aspect-ratio="1.778" data-min-width="1400"
					style:opacity={offset <= 0.2 ? offset : offset <= 0.8 ? 1 : 1 - offset}>
					<div style="padding: 0 0 {100/1.778}% 0;"></div>
					<img id="g-_Nasib-Pekerja-Jakarta--Stres-dan-Tua-di-Jalan_-xlarge_5-img" class="g-aiImg" alt="" src="./images/_Nasib-Pekerja-Jakarta--Stres-dan-Tua-di-Jalan_-xlarge_5.png"/>
					</div>
				{:else if index == 8}
					<!-- Halaman 9 -->
					<!-- KOSONG -- HANYA TEKS -->
				{:else if index == 9}
					<!-- Halaman 10 -->
					<!-- Artboard: smallplus_5_copy -->
					<div id="g-_Nasib-Pekerja-Jakarta--Stres-dan-Tua-di-Jalan_-smallplus_5_copy" class="g-artboard"  data-aspect-ratio="0.457" data-min-width="0" data-max-width="509"
					style:opacity={offset <= 0.2 ? offset : offset <= 0.8 ? 1 : 1 - offset}>
					<div style="padding: 0 0 218.75% 0;"></div>
					<img id="g-_Nasib-Pekerja-Jakarta--Stres-dan-Tua-di-Jalan_-smallplus_5_copy-img" class="g-aiImg" alt="" src="./images/_Nasib-Pekerja-Jakarta--Stres-dan-Tua-di-Jalan_-smallplus_5_copy.png"/>
					</div>

					<!-- Artboard: submedium_5_copy -->
					<div id="g-_Nasib-Pekerja-Jakarta--Stres-dan-Tua-di-Jalan_-submedium_5_copy" class="g-artboard" data-aspect-ratio="0.638" data-min-width="510" data-max-width="689"
					style:opacity={offset <= 0.2 ? offset : offset <= 0.8 ? 1 : 1 - offset}>
					<div style="padding: 0 0 {100/0.637}% 0;"></div>
					<img id="g-_Nasib-Pekerja-Jakarta--Stres-dan-Tua-di-Jalan_-submedium_5_copy-img" class="g-aiImg" alt="" src="./images/_Nasib-Pekerja-Jakarta--Stres-dan-Tua-di-Jalan_-submedium_5_copy.png"/>
					</div>

					<!-- Artboard: medium_5_copy -->
					<div id="g-_Nasib-Pekerja-Jakarta--Stres-dan-Tua-di-Jalan_-medium_5_copy" class="g-artboard"  data-aspect-ratio="0.674" data-min-width="690" data-max-width="919"
					style:opacity={offset <= 0.2 ? offset : offset <= 0.8 ? 1 : 1 - offset}>
					<div style="padding: 0 0 {100/0.674}% 0;"></div>
					<img id="g-_Nasib-Pekerja-Jakarta--Stres-dan-Tua-di-Jalan_-medium_5_copy-img" class="g-aiImg" alt="" src="./images/_Nasib-Pekerja-Jakarta--Stres-dan-Tua-di-Jalan_-medium_5_copy.png"/>
					</div>

					<!-- Artboard: large_5_copy -->
					<div id="g-_Nasib-Pekerja-Jakarta--Stres-dan-Tua-di-Jalan_-large_5_copy" class="g-artboard"  data-aspect-ratio="1" data-min-width="920" data-max-width="1399"
					style:opacity={offset <= 0.2 ? offset : offset <= 0.8 ? 1 : 1 - offset}>
					<div style="padding: 0 0 {100/1}% 0;"></div>
					<img id="g-_Nasib-Pekerja-Jakarta--Stres-dan-Tua-di-Jalan_-large_5_copy-img" class="g-aiImg" alt="" src="./images/_Nasib-Pekerja-Jakarta--Stres-dan-Tua-di-Jalan_-large_5_copy.png"/>
					</div>

					<!-- Artboard: xlarge_5_copy -->
					<div id="g-_Nasib-Pekerja-Jakarta--Stres-dan-Tua-di-Jalan_-xlarge_5_copy" class="g-artboard"  data-aspect-ratio="1.778" data-min-width="1400"
					style:opacity={offset <= 0.2 ? offset : offset <= 0.8 ? 1 : 1 - offset}>
					<div style="padding: 0 0 {100/1.778}% 0;"></div>
					<img id="g-_Nasib-Pekerja-Jakarta--Stres-dan-Tua-di-Jalan_-xlarge_5_copy-img" class="g-aiImg" alt="" src="./images/_Nasib-Pekerja-Jakarta--Stres-dan-Tua-di-Jalan_-xlarge_5_copy.png"/>
					</div>
				{:else if index == 10}
					<!-- Halaman 11 -->
					<!-- KOSONG -- HANYA TEKS -->
				{:else if index == 11}
					<!-- Halaman 12 -->
					<!-- KOSONG -- HANYA TEKS -->
				{:else if index >= 12}
					<!-- Halaman 13 -->
					<!-- Artboard: smallplus_5_copy_2 -->
					<div id="g-_Nasib-Pekerja-Jakarta--Stres-dan-Tua-di-Jalan_-smallplus_5_copy_2" class="g-artboard"  data-aspect-ratio="0.457" data-min-width="0" data-max-width="509"
					style:opacity={offset <= 0.2 && index == 12 ? offset : 1}>
					<div style="padding: 0 0 218.75% 0;"></div>
						<img id="g-_Nasib-Pekerja-Jakarta--Stres-dan-Tua-di-Jalan_-smallplus_5_copy_2-img" class="g-aiImg" alt="" src="./images/_Nasib-Pekerja-Jakarta--Stres-dan-Tua-di-Jalan_-smallplus_5_copy_2.png"/>
					</div>

					<!-- Artboard: submedium_5_copy_2 -->
					<div id="g-_Nasib-Pekerja-Jakarta--Stres-dan-Tua-di-Jalan_-submedium_5_copy_2" class="g-artboard"  data-aspect-ratio="0.638" data-min-width="510" data-max-width="689"
					style:opacity={offset <= 0.2 && index == 12 ? offset : 1}>
					<div style="padding: 0 0 {100/0.637}% 0;"></div>
						<img id="g-_Nasib-Pekerja-Jakarta--Stres-dan-Tua-di-Jalan_-submedium_5_copy_2-img" class="g-aiImg" alt="" src="./images/_Nasib-Pekerja-Jakarta--Stres-dan-Tua-di-Jalan_-submedium_5_copy_2.png"/>
					</div>

					<!-- Artboard: medium_5_copy_2 -->
					<div id="g-_Nasib-Pekerja-Jakarta--Stres-dan-Tua-di-Jalan_-medium_5_copy_2" class="g-artboard" data-aspect-ratio="0.674" data-min-width="690" data-max-width="919"
					style:opacity={offset <= 0.2 && index == 12 ? offset : 1}>
					<div style="padding: 0 0 {100/0.674}% 0;"></div>
						<img id="g-_Nasib-Pekerja-Jakarta--Stres-dan-Tua-di-Jalan_-medium_5_copy_2-img" class="g-aiImg" alt="" src="./images/_Nasib-Pekerja-Jakarta--Stres-dan-Tua-di-Jalan_-medium_5_copy_2.png"/>
					</div>

					<!-- Artboard: large_5_copy_2 -->
					<div id="g-_Nasib-Pekerja-Jakarta--Stres-dan-Tua-di-Jalan_-large_5_copy_2" class="g-artboard"  data-aspect-ratio="1" data-min-width="920" data-max-width="1399"
					style:opacity={offset <= 0.2 && index == 12 ? offset : 1}>
					<div style="padding: 0 0 {100/1}% 0;"></div>
						<img id="g-_Nasib-Pekerja-Jakarta--Stres-dan-Tua-di-Jalan_-large_5_copy_2-img" class="g-aiImg" alt="" src="./images/_Nasib-Pekerja-Jakarta--Stres-dan-Tua-di-Jalan_-large_5_copy_2.png"/>
					</div>

					<!-- Artboard: xlarge_5_copy_2 -->
					<div id="g-_Nasib-Pekerja-Jakarta--Stres-dan-Tua-di-Jalan_-xlarge_5_copy_2" class="g-artboard"  data-aspect-ratio="1.778" data-min-width="1400"
					style:opacity={offset <= 0.2 && index == 12 ? offset : 1}>
					<div style="padding: 0 0 {100/1.778}% 0;"></div>
						<img id="g-_Nasib-Pekerja-Jakarta--Stres-dan-Tua-di-Jalan_-xlarge_5_copy_2-img" class="g-aiImg" alt="" src="./images/_Nasib-Pekerja-Jakarta--Stres-dan-Tua-di-Jalan_-xlarge_5_copy_2.png"/>
					</div>
				{/if}
			</div>
		</div>

		<div slot="foreground" >
			<section></section>
			<section>
				<p> <!-- 1 -->
					Sebelum saya tinggal di kos dekat kantor, saya biasa commuting dari Bekasi ke Lebak Bulus. Untuk mengurangi ongkos ojek, saya berangkat bareng mobil bapak pada pukul 6:00, lalu turun di terminal Pinang Ranti untuk naik Transjakarta. Saya turun di Semanggi, lanjut jalan kaki 1 km ke stasiun MRT Benhil. Saya pun turun di stasiun terakhir, stasiun Lebak Bulus, kemudian lanjut naik ojek daring ke kantor. Kalau dihitung, saya melaju 22,1 kilometer dengan jarak tempuh 2 jam. Lumayan jauh ya?
				</p>
			</section>
			<section>
				<p> <!-- 2 -->
					Tapi nyatanya kisah commuting saya hanyalah ujung kuku pengalaman commuting pekerja Jabodetabek. Menggunakan kendaraan pribadi atau transportasi umum, para komuter bisa <a class='link-article' href='https://properti.kompas.com/read/2017/04/18/231254421/komuter.bodetabek.habiskan.waktu.sekitar.4.jam.di.jalan?page=all'>menghabiskan 4-6 jam</a> di jalan.
				</p>
			</section>
			<section>
				<p> <!-- 3 -->
					Kemacetan luar biasa menjadi penyebab utama lamanya waktu tempuh para pekerja. Kemacetan ini tak hanya disebabkan oleh <a class='link-article' href='https://jakarta.bisnis.com/read/20150216/77/403389/tiap-hari-ada-13-juta-penglaju-asal-bodetabek-berkegiatan-di-jakarta'>1,3 juta pekerja dari Bodetabek</a>, tapi juga karena lebih banyak orang memilih kendaraan pribadi dibanding transportasi umum.
				</p>
			</section>
			<section>
				<p> <!-- 4 -->
					Jarak tempuh yang jauh, gengsi dan kenyamanan yang diberikan oleh motor dan mobil pribadi membuat orang-orang enggan beralih. Masalah ini semakin diperburuk oleh sulitnya akses transportasi umum dari kota-kota satelit ke Jakarta dan koneksi antar moda yang belum bagus.
				</p>
			</section>
			<section>
				<p> <!-- 5 -->
					Sayang, tren kemacetan Jakarta nampaknya tidak akan berkurang. Melihat statistik kendaraan DKI Jakarta tahun 2019, pertumbuhan pengguna sepeda motor mencapai 2,94 persen per tahun sedangkan pengguna mobil 4,04 persen per tahun. Tren ini juga diperburuk oleh pandemi karena <a class='link-article' href='https://databoks.katadata.co.id/datapublish/2021/01/27/publik-cenderung-gunakan-kendaraan-pribadi-saat-pandemi'>orang-orang memilih kendaraan pribadi</a> dibanding transportasi umum.
				</p>
			</section>
			<section>
				<p> <!-- 6 -->
					<strong>Efek buruk commuting jarak jauh</strong>
				</p>
				<p>
					Commuting jarak jauh tak hanya inefektif dan menyebalkan, tapi juga berimbas buruk ke kesehatan. Beberapa studi menunjukkan para pelaju memiliki tingkat stres yang lebih tinggi dibanding mereka yang tidak. 
				</p>
				<p>
					Penelitian longitudinal ini melibatkan 4.297 orang dewasa berusia 18-90 tahun. Jarak laju, pengukuran komposisi tubuh, pengukuran laboratorium, dan tingkat kebugaran partisipan digunakan sebagai faktor penelitian. Peneliti tidak menanyakan jenis kendaraan apa yang digunakan oleh partisipan, tapi menduga partisipan menggunakan kendaraan bermotor sebagai moda transportasi.
				</p>

			</section>
			<section>
				<p> <!-- 7 -->
					Hasilnya menunjukkan mereka yang melaju sejauh >16 km memiliki kecenderungan darah tinggi lebih rendah dari kelompok lain, tapi masih beresiko mengalami tingkat kolesterol dan gula darah tinggi serta penyakit metabolisme. Tingkat resiko semakin besar bagi kelompok yang melaju >24 km. Peneliti mencatat kelompok ini memiliki kecenderungan terkena penyakit darah tinggi lebih rendah, tapi beresiko mengalami tingkat kolesterol dan gula darah tinggi serta penyakit metabolisme. 
				</p>
			</section>
			<section>
				<p> <!-- 8 -->
					Tingkat kebugaran para pelaju jauh buruk karena waktu mereka dihabiskan di jalanan alih-alih melakukan aktivitas fisik. Faktor lainnya seperti para partisipan yang tinggal di kota pinggiran berfasilitas lengkap juga berkontribusi dalam ketidakaktifan fisik mereka. Kemacetan juga memperburuk kualitas hidup karena menimbulkan stres. Stres berkelanjutan ini bisa mengakibatkan tekanan darah tinggi, kelelahan, pola diet dan tidur yang buruk, dan penyakit mental seperti depresi dan gangguan cemas.
				</p>
			</section>
			<section>
				<p> <!-- 9 -->
					Efek commuting jarak jauh ke kesehatan mental juga diteliti oleh <a class='link-article' href='http://eab.sagepub.com/content/46/5/609'>Feng dan Boyle (2013)</a>. Hasilnya menunjukkan commuting di atas 1 jam memiliki efek buruk ke kesehatan mental, khususnya pelaju perempuan. Resiko gangguan mental tertinggi terjadi pada ibu tunggal yang harus melaju 30 sampai lebih dari 60 menit. Ini kontras dengan perempuan tidak punya anak dengan waktu laju yang sama. Pendeknya, melaju konsisten membuat ibu beresiko mengalami gangguan mental lebih tinggi dari perempuan tidak punya anak.
				</p>
			</section>
			<section>
				<p> <!-- 10 -->
					Peneliti menyimpulkan tingginya stres di kalangan pelaju perempuan disebabkan oleh tugas rumah tangga dan mengurus anak. Kemacetan di jalan membuat perempuan mudah stres. Ditambah perempuan sering melakukan <em>trip chaining</em> alias mampir ke beberapa tempat seperti supermarket, sekolah anak, dan dokter. Tentu hal ini membuat mereka lebih lama di jalan.
				</p>
			</section>
			<section>
				<p> <!-- 11 -->
					<strong>Masa depan Commuting pasca-pandemi</strong>
				</p>
				<p>
					Mengingat bekerja dari rumah sudah menjadi tren dan <a class='link-article' href='https://jpi.or.id/city-after-the-pandemic/#work'>55,6% pekerja Jakarta</a> berharap bisa bergantian WFH dan WFO bahkan setelah pandemi selesai. Bukan tidak mungkin pola penggunaan transportasi dan ruang umum akan berubah secara permanen. 
				</p>
				<p>
					Menurunnya jumlah pekerja yang perlu melaju setiap hari tentunya akan memperingan tingkat kemacetan. Namun, mengingat banyak orang masih ragu untuk menggunakan transportasi umum, bukan berarti kemacetan akan hilang. Bisa saja kemacetan semakin buruk karena orang berbondong-bondong membeli kendaraan pribadi, seperti yang diprediksikan oleh <a class='link-article' href='https://www.bbc.com/worklife/article/20201202-why-our-reliance-on-cars-could-start-booming'>BBC</a>.
				</p>
			</section>
			<section>
				<p> <!-- 12 -->
					Di sinilah pemerintah harus turun tangan untuk memperbaiki sistem transportasi publik. Langkah ini tak hanya krusial untuk mengurangi kemacetan, tapi juga mendorong masyarakat untuk menggunakan transportasi publik.
				</p>
			</section>
			<section>
				<p> <!-- 13 -->
					Hal yang bisa dilakukan adalah membuat sistem pre-booking kursi lewat aplikasi seperti yang dilakukan Tiongkok. Memberikan informasi lengkap tentang jumlah kursi dan bus yang tersedia lewat aplikasi seperti yang dilakukan Australia dan <a class='link-article' href='https://ggwash.org/view/64291/real-time-signs-reduce-train-crowding'>Inggris</a> juga bisa menjadi alternatif. Selain itu pemerintah kota juga harus mempertimbangkan membuat penyambung antar moda transportasi yang mudah diakses.
				</p>
			</section>
		</div>
	</Scroller>

	<div class="divider"></div>

	<Paragraph
		--font-color ='black'
		para={[
		'Kalaupun setelah pandemi masih banyak orang yang bekerja dari rumah, pemerintah dan perusahaan perlu memikirkan cara terbaik untuk melindungi hak pekerja. Salah satunya dengan membuat jam kerja yang jelas dan mengurangi waktu lembur. Karena meskipun banyak pekerja yang tak lagi mengalami stres dari jalanan, stres tetap terjadi karena memudarnya batas antara kerja dengan kehidupan pribadi.'
		]}
	/>
	<Credit
		--fontfamily1={fontfamily1}
		--font-color = {fontColor}
		{ credit }
	/>
</main>

<style>
	.link-article {
		color: rgb(0,100,200);
		text-decoration: none;
	}
	.link-article:hover {
		text-decoration: underline;
	}

	.link-article:visited {
		color: rgb(0,80,160);
	}
	.divider {
		height:0.2rem;
		width:60%;
		background-color:hsl(0, 0%, 0%) ;
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
		color: black;
		padding: 1em;
		margin: 0 0 2em 0;
		border-radius: 1rem;
	}

	[slot="foreground"] p {
		padding:1rem;
		background-color: hsla(0,0%,90%,0.8);
		width:90%;
        max-width: 650px;
        margin: 0 auto 0 auto;
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
	.g-artboard {
		transition: opacity 100ms ease-in-out;
	}
	#g-_Nasib-Pekerja-Jakarta--Stres-dan-Tua-di-Jalan_-box ,
	#g-_Nasib-Pekerja-Jakarta--Stres-dan-Tua-di-Jalan_-box .g-artboard {
		margin:0 auto;
	}
	#g-_Nasib-Pekerja-Jakarta--Stres-dan-Tua-di-Jalan_-box p {
	}
	#g-_Nasib-Pekerja-Jakarta--Stres-dan-Tua-di-Jalan_-box .g-aiImg {
		position:absolute;
		top:0;
		display:block;
		width:100% !important;
	}
	#g-_Nasib-Pekerja-Jakarta--Stres-dan-Tua-di-Jalan_-box .g-aiPointText p { white-space: nowrap; }
	#g-_Nasib-Pekerja-Jakarta--Stres-dan-Tua-di-Jalan_-cover_smallplus {
		position:relative;
		overflow:hidden;
	}
	#g-_Nasib-Pekerja-Jakarta--Stres-dan-Tua-di-Jalan_-cover_submedium {
		position:relative;
		overflow:hidden;
	}
	#g-_Nasib-Pekerja-Jakarta--Stres-dan-Tua-di-Jalan_-cover_medium {
		position:relative;
		overflow:hidden;
	}
	#g-_Nasib-Pekerja-Jakarta--Stres-dan-Tua-di-Jalan_-cover_large {
		position:relative;
		overflow:hidden;
	}
	#g-_Nasib-Pekerja-Jakarta--Stres-dan-Tua-di-Jalan_-cover_xlarge_5 {
		position:relative;
		overflow:hidden;
	}
	#g-_Nasib-Pekerja-Jakarta--Stres-dan-Tua-di-Jalan_-smallplus_1 {
		position:relative;
		overflow:hidden;
	}
	#g-_Nasib-Pekerja-Jakarta--Stres-dan-Tua-di-Jalan_-submedium_1 {
		position:relative;
		overflow:hidden;
	}
	#g-_Nasib-Pekerja-Jakarta--Stres-dan-Tua-di-Jalan_-medium_1 {
		position:relative;
		overflow:hidden;
	}
	#g-_Nasib-Pekerja-Jakarta--Stres-dan-Tua-di-Jalan_-large_1 {
		position:relative;
		overflow:hidden;
	}
	#g-_Nasib-Pekerja-Jakarta--Stres-dan-Tua-di-Jalan_-xlarge_1 {
		position:relative;
		overflow:hidden;
	}
	#g-_Nasib-Pekerja-Jakarta--Stres-dan-Tua-di-Jalan_-smallplus_2 {
		position:relative;
		overflow:hidden;
	}
	#g-_Nasib-Pekerja-Jakarta--Stres-dan-Tua-di-Jalan_-submedium_2 {
		position:relative;
		overflow:hidden;
	}
	#g-_Nasib-Pekerja-Jakarta--Stres-dan-Tua-di-Jalan_-medium_2 {
		position:relative;
		overflow:hidden;
	}
	#g-_Nasib-Pekerja-Jakarta--Stres-dan-Tua-di-Jalan_-large_2 {
		position:relative;
		overflow:hidden;
	}
	#g-_Nasib-Pekerja-Jakarta--Stres-dan-Tua-di-Jalan_-xlarge_2 {
		position:relative;
		overflow:hidden;
	}
	#g-_Nasib-Pekerja-Jakarta--Stres-dan-Tua-di-Jalan_-smallplus_3 {
		position:relative;
		overflow:hidden;
	}
	#g-_Nasib-Pekerja-Jakarta--Stres-dan-Tua-di-Jalan_-submedium_3 {
		position:relative;
		overflow:hidden;
	}
	#g-_Nasib-Pekerja-Jakarta--Stres-dan-Tua-di-Jalan_-medium_3 {
		position:relative;
		overflow:hidden;
	}
	#g-_Nasib-Pekerja-Jakarta--Stres-dan-Tua-di-Jalan_-large_3 {
		position:relative;
		overflow:hidden;
	}
	#g-_Nasib-Pekerja-Jakarta--Stres-dan-Tua-di-Jalan_-xlarge_3 {
		position:relative;
		overflow:hidden;
	}
	#g-_Nasib-Pekerja-Jakarta--Stres-dan-Tua-di-Jalan_-smallplus_4 {
		position:relative;
		overflow:hidden;
	}
	#g-_Nasib-Pekerja-Jakarta--Stres-dan-Tua-di-Jalan_-submedium_4 {
		position:relative;
		overflow:hidden;
	}
	#g-_Nasib-Pekerja-Jakarta--Stres-dan-Tua-di-Jalan_-medium_4 {
		position:relative;
		overflow:hidden;
	}
	#g-_Nasib-Pekerja-Jakarta--Stres-dan-Tua-di-Jalan_-large_4 {
		position:relative;
		overflow:hidden;
	}
	#g-_Nasib-Pekerja-Jakarta--Stres-dan-Tua-di-Jalan_-xlarge_4 {
		position:relative;
		overflow:hidden;
	}
	#g-_Nasib-Pekerja-Jakarta--Stres-dan-Tua-di-Jalan_-smallplus_5 {
		position:relative;
		overflow:hidden;
	}
	#g-_Nasib-Pekerja-Jakarta--Stres-dan-Tua-di-Jalan_-submedium_5 {
		position:relative;
		overflow:hidden;
	}
	#g-_Nasib-Pekerja-Jakarta--Stres-dan-Tua-di-Jalan_-medium_5 {
		position:relative;
		overflow:hidden;
	}
	#g-_Nasib-Pekerja-Jakarta--Stres-dan-Tua-di-Jalan_-large_5 {
		position:relative;
		overflow:hidden;
	}
	#g-_Nasib-Pekerja-Jakarta--Stres-dan-Tua-di-Jalan_-xlarge_5 {
		position:relative;
		overflow:hidden;
	}
	#g-_Nasib-Pekerja-Jakarta--Stres-dan-Tua-di-Jalan_-smallplus_5_copy {
		position:relative;
		overflow:hidden;
	}
	#g-_Nasib-Pekerja-Jakarta--Stres-dan-Tua-di-Jalan_-submedium_5_copy {
		position:relative;
		overflow:hidden;
	}
	#g-_Nasib-Pekerja-Jakarta--Stres-dan-Tua-di-Jalan_-medium_5_copy {
		position:relative;
		overflow:hidden;
	}
	#g-_Nasib-Pekerja-Jakarta--Stres-dan-Tua-di-Jalan_-large_5_copy {
		position:relative;
		overflow:hidden;
	}
	#g-_Nasib-Pekerja-Jakarta--Stres-dan-Tua-di-Jalan_-xlarge_5_copy {
		position:relative;
		overflow:hidden;
	}
	#g-_Nasib-Pekerja-Jakarta--Stres-dan-Tua-di-Jalan_-smallplus_5_copy_2 {
		position:relative;
		overflow:hidden;
	}
	#g-_Nasib-Pekerja-Jakarta--Stres-dan-Tua-di-Jalan_-submedium_5_copy_2 {
		position:relative;
		overflow:hidden;
	}
	#g-_Nasib-Pekerja-Jakarta--Stres-dan-Tua-di-Jalan_-medium_5_copy_2 {
		position:relative;
		overflow:hidden;
	}
	#g-_Nasib-Pekerja-Jakarta--Stres-dan-Tua-di-Jalan_-large_5_copy_2 {
		position:relative;
		overflow:hidden;
	}
	#g-_Nasib-Pekerja-Jakarta--Stres-dan-Tua-di-Jalan_-xlarge_5_copy_2 {
		position:relative;
		overflow:hidden;
	}

	@media only screen and (max-width:509px) {
		#g-_Nasib-Pekerja-Jakarta--Stres-dan-Tua-di-Jalan_-cover_xlarge_5,
		#g-_Nasib-Pekerja-Jakarta--Stres-dan-Tua-di-Jalan_-xlarge_1,
		#g-_Nasib-Pekerja-Jakarta--Stres-dan-Tua-di-Jalan_-xlarge_2,
		#g-_Nasib-Pekerja-Jakarta--Stres-dan-Tua-di-Jalan_-xlarge_3,
		#g-_Nasib-Pekerja-Jakarta--Stres-dan-Tua-di-Jalan_-xlarge_4,
		#g-_Nasib-Pekerja-Jakarta--Stres-dan-Tua-di-Jalan_-xlarge_5,
		#g-_Nasib-Pekerja-Jakarta--Stres-dan-Tua-di-Jalan_-xlarge_5_copy,
		#g-_Nasib-Pekerja-Jakarta--Stres-dan-Tua-di-Jalan_-xlarge_5_copy_2 {
			display:none;
		}

		#g-_Nasib-Pekerja-Jakarta--Stres-dan-Tua-di-Jalan_-cover_large,
		#g-_Nasib-Pekerja-Jakarta--Stres-dan-Tua-di-Jalan_-large_1,
		#g-_Nasib-Pekerja-Jakarta--Stres-dan-Tua-di-Jalan_-large_2,
		#g-_Nasib-Pekerja-Jakarta--Stres-dan-Tua-di-Jalan_-large_3,
		#g-_Nasib-Pekerja-Jakarta--Stres-dan-Tua-di-Jalan_-large_4,
		#g-_Nasib-Pekerja-Jakarta--Stres-dan-Tua-di-Jalan_-large_5,
		#g-_Nasib-Pekerja-Jakarta--Stres-dan-Tua-di-Jalan_-large_5_copy,
		#g-_Nasib-Pekerja-Jakarta--Stres-dan-Tua-di-Jalan_-large_5_copy_2 {
			display:none;
		}

		#g-_Nasib-Pekerja-Jakarta--Stres-dan-Tua-di-Jalan_-cover_medium,
		#g-_Nasib-Pekerja-Jakarta--Stres-dan-Tua-di-Jalan_-medium_1,
		#g-_Nasib-Pekerja-Jakarta--Stres-dan-Tua-di-Jalan_-medium_2,
		#g-_Nasib-Pekerja-Jakarta--Stres-dan-Tua-di-Jalan_-medium_3,
		#g-_Nasib-Pekerja-Jakarta--Stres-dan-Tua-di-Jalan_-medium_4,
		#g-_Nasib-Pekerja-Jakarta--Stres-dan-Tua-di-Jalan_-medium_5,
		#g-_Nasib-Pekerja-Jakarta--Stres-dan-Tua-di-Jalan_-medium_5_copy,
		#g-_Nasib-Pekerja-Jakarta--Stres-dan-Tua-di-Jalan_-medium_5_copy_2{
			display:none;
		}

		#g-_Nasib-Pekerja-Jakarta--Stres-dan-Tua-di-Jalan_-cover_submedium,
		#g-_Nasib-Pekerja-Jakarta--Stres-dan-Tua-di-Jalan_-submedium_1,
		#g-_Nasib-Pekerja-Jakarta--Stres-dan-Tua-di-Jalan_-submedium_2,
		#g-_Nasib-Pekerja-Jakarta--Stres-dan-Tua-di-Jalan_-submedium_3,
		#g-_Nasib-Pekerja-Jakarta--Stres-dan-Tua-di-Jalan_-submedium_4,
		#g-_Nasib-Pekerja-Jakarta--Stres-dan-Tua-di-Jalan_-submedium_5,
		#g-_Nasib-Pekerja-Jakarta--Stres-dan-Tua-di-Jalan_-submedium_5_copy,
		#g-_Nasib-Pekerja-Jakarta--Stres-dan-Tua-di-Jalan_-submedium_5_copy_2 {
			display:none;
		}

		#g-_Nasib-Pekerja-Jakarta--Stres-dan-Tua-di-Jalan_-cover_smallplus,
		#g-_Nasib-Pekerja-Jakarta--Stres-dan-Tua-di-Jalan_-smallplus_1,
		#g-_Nasib-Pekerja-Jakarta--Stres-dan-Tua-di-Jalan_-smallplus_2,
		#g-_Nasib-Pekerja-Jakarta--Stres-dan-Tua-di-Jalan_-smallplus_3,
		#g-_Nasib-Pekerja-Jakarta--Stres-dan-Tua-di-Jalan_-smallplus_4,
		#g-_Nasib-Pekerja-Jakarta--Stres-dan-Tua-di-Jalan_-smallplus_5,
		#g-_Nasib-Pekerja-Jakarta--Stres-dan-Tua-di-Jalan_-smallplus_5_copy,
		#g-_Nasib-Pekerja-Jakarta--Stres-dan-Tua-di-Jalan_-smallplus_5_copy_2 {
			display:block;
		}
	}

	@media only screen and (min-width:510px) and (max-width:689px) {
		#g-_Nasib-Pekerja-Jakarta--Stres-dan-Tua-di-Jalan_-cover_xlarge_5,
		#g-_Nasib-Pekerja-Jakarta--Stres-dan-Tua-di-Jalan_-xlarge_1,
		#g-_Nasib-Pekerja-Jakarta--Stres-dan-Tua-di-Jalan_-xlarge_2,
		#g-_Nasib-Pekerja-Jakarta--Stres-dan-Tua-di-Jalan_-xlarge_3,
		#g-_Nasib-Pekerja-Jakarta--Stres-dan-Tua-di-Jalan_-xlarge_4,
		#g-_Nasib-Pekerja-Jakarta--Stres-dan-Tua-di-Jalan_-xlarge_5,
		#g-_Nasib-Pekerja-Jakarta--Stres-dan-Tua-di-Jalan_-xlarge_5_copy,
		#g-_Nasib-Pekerja-Jakarta--Stres-dan-Tua-di-Jalan_-xlarge_5_copy_2{
			display:none;
		}

		#g-_Nasib-Pekerja-Jakarta--Stres-dan-Tua-di-Jalan_-cover_large,
		#g-_Nasib-Pekerja-Jakarta--Stres-dan-Tua-di-Jalan_-large_1,
		#g-_Nasib-Pekerja-Jakarta--Stres-dan-Tua-di-Jalan_-large_2,
		#g-_Nasib-Pekerja-Jakarta--Stres-dan-Tua-di-Jalan_-large_3,
		#g-_Nasib-Pekerja-Jakarta--Stres-dan-Tua-di-Jalan_-large_4,
		#g-_Nasib-Pekerja-Jakarta--Stres-dan-Tua-di-Jalan_-large_5,
		#g-_Nasib-Pekerja-Jakarta--Stres-dan-Tua-di-Jalan_-large_5_copy,
		#g-_Nasib-Pekerja-Jakarta--Stres-dan-Tua-di-Jalan_-large_5_copy_2 {
			display:none;
		}

		#g-_Nasib-Pekerja-Jakarta--Stres-dan-Tua-di-Jalan_-cover_medium,
		#g-_Nasib-Pekerja-Jakarta--Stres-dan-Tua-di-Jalan_-medium_1,
		#g-_Nasib-Pekerja-Jakarta--Stres-dan-Tua-di-Jalan_-medium_2,
		#g-_Nasib-Pekerja-Jakarta--Stres-dan-Tua-di-Jalan_-medium_3,
		#g-_Nasib-Pekerja-Jakarta--Stres-dan-Tua-di-Jalan_-medium_4,
		#g-_Nasib-Pekerja-Jakarta--Stres-dan-Tua-di-Jalan_-medium_5,
		#g-_Nasib-Pekerja-Jakarta--Stres-dan-Tua-di-Jalan_-medium_5_copy,
		#g-_Nasib-Pekerja-Jakarta--Stres-dan-Tua-di-Jalan_-medium_5_copy_2 {
			display:none;
		}

		#g-_Nasib-Pekerja-Jakarta--Stres-dan-Tua-di-Jalan_-cover_submedium,
		#g-_Nasib-Pekerja-Jakarta--Stres-dan-Tua-di-Jalan_-submedium_1,
		#g-_Nasib-Pekerja-Jakarta--Stres-dan-Tua-di-Jalan_-submedium_2,
		#g-_Nasib-Pekerja-Jakarta--Stres-dan-Tua-di-Jalan_-submedium_3,
		#g-_Nasib-Pekerja-Jakarta--Stres-dan-Tua-di-Jalan_-submedium_4,
		#g-_Nasib-Pekerja-Jakarta--Stres-dan-Tua-di-Jalan_-submedium_5,
		#g-_Nasib-Pekerja-Jakarta--Stres-dan-Tua-di-Jalan_-submedium_5_copy,
		#g-_Nasib-Pekerja-Jakarta--Stres-dan-Tua-di-Jalan_-submedium_5_copy_2{
			display:block;
		}

		#g-_Nasib-Pekerja-Jakarta--Stres-dan-Tua-di-Jalan_-cover_smallplus,
		#g-_Nasib-Pekerja-Jakarta--Stres-dan-Tua-di-Jalan_-smallplus_1,
		#g-_Nasib-Pekerja-Jakarta--Stres-dan-Tua-di-Jalan_-smallplus_2,
		#g-_Nasib-Pekerja-Jakarta--Stres-dan-Tua-di-Jalan_-smallplus_3,
		#g-_Nasib-Pekerja-Jakarta--Stres-dan-Tua-di-Jalan_-smallplus_4,
		#g-_Nasib-Pekerja-Jakarta--Stres-dan-Tua-di-Jalan_-smallplus_5,
		#g-_Nasib-Pekerja-Jakarta--Stres-dan-Tua-di-Jalan_-smallplus_5_copy,
		#g-_Nasib-Pekerja-Jakarta--Stres-dan-Tua-di-Jalan_-smallplus_5_copy_2
		 {
			display:none;
		}
	}

	@media only screen and (min-width:690px) and (max-width:919px) {
		#g-_Nasib-Pekerja-Jakarta--Stres-dan-Tua-di-Jalan_-cover_xlarge_5,
		#g-_Nasib-Pekerja-Jakarta--Stres-dan-Tua-di-Jalan_-xlarge_1,
		#g-_Nasib-Pekerja-Jakarta--Stres-dan-Tua-di-Jalan_-xlarge_2,
		#g-_Nasib-Pekerja-Jakarta--Stres-dan-Tua-di-Jalan_-xlarge_3,
		#g-_Nasib-Pekerja-Jakarta--Stres-dan-Tua-di-Jalan_-xlarge_4,
		#g-_Nasib-Pekerja-Jakarta--Stres-dan-Tua-di-Jalan_-xlarge_5,
		#g-_Nasib-Pekerja-Jakarta--Stres-dan-Tua-di-Jalan_-xlarge_5_copy,
		#g-_Nasib-Pekerja-Jakarta--Stres-dan-Tua-di-Jalan_-xlarge_5_copy_2
		 {
			display:none;
		}

		#g-_Nasib-Pekerja-Jakarta--Stres-dan-Tua-di-Jalan_-cover_large,
		#g-_Nasib-Pekerja-Jakarta--Stres-dan-Tua-di-Jalan_-large_1,
		#g-_Nasib-Pekerja-Jakarta--Stres-dan-Tua-di-Jalan_-large_2,
		#g-_Nasib-Pekerja-Jakarta--Stres-dan-Tua-di-Jalan_-large_3,
		#g-_Nasib-Pekerja-Jakarta--Stres-dan-Tua-di-Jalan_-large_4,
		#g-_Nasib-Pekerja-Jakarta--Stres-dan-Tua-di-Jalan_-large_5,
		#g-_Nasib-Pekerja-Jakarta--Stres-dan-Tua-di-Jalan_-large_5_copy,
		#g-_Nasib-Pekerja-Jakarta--Stres-dan-Tua-di-Jalan_-large_5_copy_2
		 {
			display:none;
		}

		#g-_Nasib-Pekerja-Jakarta--Stres-dan-Tua-di-Jalan_-cover_medium,
		#g-_Nasib-Pekerja-Jakarta--Stres-dan-Tua-di-Jalan_-medium_1,
		#g-_Nasib-Pekerja-Jakarta--Stres-dan-Tua-di-Jalan_-medium_2,
		#g-_Nasib-Pekerja-Jakarta--Stres-dan-Tua-di-Jalan_-medium_3,
		#g-_Nasib-Pekerja-Jakarta--Stres-dan-Tua-di-Jalan_-medium_4,
		#g-_Nasib-Pekerja-Jakarta--Stres-dan-Tua-di-Jalan_-medium_5,
		#g-_Nasib-Pekerja-Jakarta--Stres-dan-Tua-di-Jalan_-medium_5_copy,
		#g-_Nasib-Pekerja-Jakarta--Stres-dan-Tua-di-Jalan_-medium_5_copy_2
		{
			display:block;
		}

		#g-_Nasib-Pekerja-Jakarta--Stres-dan-Tua-di-Jalan_-cover_submedium,
		#g-_Nasib-Pekerja-Jakarta--Stres-dan-Tua-di-Jalan_-submedium_1,
		#g-_Nasib-Pekerja-Jakarta--Stres-dan-Tua-di-Jalan_-submedium_2,
		#g-_Nasib-Pekerja-Jakarta--Stres-dan-Tua-di-Jalan_-submedium_3,
		#g-_Nasib-Pekerja-Jakarta--Stres-dan-Tua-di-Jalan_-submedium_4,
		#g-_Nasib-Pekerja-Jakarta--Stres-dan-Tua-di-Jalan_-submedium_5,
		#g-_Nasib-Pekerja-Jakarta--Stres-dan-Tua-di-Jalan_-submedium_5_copy,
		#g-_Nasib-Pekerja-Jakarta--Stres-dan-Tua-di-Jalan_-submedium_5_copy_2
		 {
			display:none;
		}

		#g-_Nasib-Pekerja-Jakarta--Stres-dan-Tua-di-Jalan_-cover_smallplus,
		#g-_Nasib-Pekerja-Jakarta--Stres-dan-Tua-di-Jalan_-smallplus_1,
		#g-_Nasib-Pekerja-Jakarta--Stres-dan-Tua-di-Jalan_-smallplus_2,
		#g-_Nasib-Pekerja-Jakarta--Stres-dan-Tua-di-Jalan_-smallplus_3,
		#g-_Nasib-Pekerja-Jakarta--Stres-dan-Tua-di-Jalan_-smallplus_4,
		#g-_Nasib-Pekerja-Jakarta--Stres-dan-Tua-di-Jalan_-smallplus_5,
		#g-_Nasib-Pekerja-Jakarta--Stres-dan-Tua-di-Jalan_-smallplus_5_copy,
		#g-_Nasib-Pekerja-Jakarta--Stres-dan-Tua-di-Jalan_-smallplus_5_copy_2
		 {
			display:none;
		}
	}

	@media only screen and (min-width:920px) and (max-width:1399px) {
		#g-_Nasib-Pekerja-Jakarta--Stres-dan-Tua-di-Jalan_-cover_xlarge_5,
		#g-_Nasib-Pekerja-Jakarta--Stres-dan-Tua-di-Jalan_-xlarge_1,
		#g-_Nasib-Pekerja-Jakarta--Stres-dan-Tua-di-Jalan_-xlarge_2,
		#g-_Nasib-Pekerja-Jakarta--Stres-dan-Tua-di-Jalan_-xlarge_3,
		#g-_Nasib-Pekerja-Jakarta--Stres-dan-Tua-di-Jalan_-xlarge_4,
		#g-_Nasib-Pekerja-Jakarta--Stres-dan-Tua-di-Jalan_-xlarge_5,
		#g-_Nasib-Pekerja-Jakarta--Stres-dan-Tua-di-Jalan_-xlarge_5_copy,
		#g-_Nasib-Pekerja-Jakarta--Stres-dan-Tua-di-Jalan_-xlarge_5_copy_2
		{
			display:none;
		}

		#g-_Nasib-Pekerja-Jakarta--Stres-dan-Tua-di-Jalan_-cover_large,
		#g-_Nasib-Pekerja-Jakarta--Stres-dan-Tua-di-Jalan_-large_1,
		#g-_Nasib-Pekerja-Jakarta--Stres-dan-Tua-di-Jalan_-large_2,
		#g-_Nasib-Pekerja-Jakarta--Stres-dan-Tua-di-Jalan_-large_3,
		#g-_Nasib-Pekerja-Jakarta--Stres-dan-Tua-di-Jalan_-large_4,
		#g-_Nasib-Pekerja-Jakarta--Stres-dan-Tua-di-Jalan_-large_5,
		#g-_Nasib-Pekerja-Jakarta--Stres-dan-Tua-di-Jalan_-large_5_copy,
		#g-_Nasib-Pekerja-Jakarta--Stres-dan-Tua-di-Jalan_-large_5_copy_2
		 {
			display:block;
		}

		#g-_Nasib-Pekerja-Jakarta--Stres-dan-Tua-di-Jalan_-cover_medium,
		#g-_Nasib-Pekerja-Jakarta--Stres-dan-Tua-di-Jalan_-medium_1,
		#g-_Nasib-Pekerja-Jakarta--Stres-dan-Tua-di-Jalan_-medium_2,
		#g-_Nasib-Pekerja-Jakarta--Stres-dan-Tua-di-Jalan_-medium_3,
		#g-_Nasib-Pekerja-Jakarta--Stres-dan-Tua-di-Jalan_-medium_4,
		#g-_Nasib-Pekerja-Jakarta--Stres-dan-Tua-di-Jalan_-medium_5,
		#g-_Nasib-Pekerja-Jakarta--Stres-dan-Tua-di-Jalan_-medium_5_copy,
		#g-_Nasib-Pekerja-Jakarta--Stres-dan-Tua-di-Jalan_-medium_5_copy_2
		{
			display:none;
		}

		#g-_Nasib-Pekerja-Jakarta--Stres-dan-Tua-di-Jalan_-cover_submedium,
		#g-_Nasib-Pekerja-Jakarta--Stres-dan-Tua-di-Jalan_-submedium_1,
		#g-_Nasib-Pekerja-Jakarta--Stres-dan-Tua-di-Jalan_-submedium_2,
		#g-_Nasib-Pekerja-Jakarta--Stres-dan-Tua-di-Jalan_-submedium_3,
		#g-_Nasib-Pekerja-Jakarta--Stres-dan-Tua-di-Jalan_-submedium_4,
		#g-_Nasib-Pekerja-Jakarta--Stres-dan-Tua-di-Jalan_-submedium_5,
		#g-_Nasib-Pekerja-Jakarta--Stres-dan-Tua-di-Jalan_-submedium_5_copy,
		#g-_Nasib-Pekerja-Jakarta--Stres-dan-Tua-di-Jalan_-submedium_5_copy_2
		 {
			display:none;
		}

		#g-_Nasib-Pekerja-Jakarta--Stres-dan-Tua-di-Jalan_-cover_smallplus,
		#g-_Nasib-Pekerja-Jakarta--Stres-dan-Tua-di-Jalan_-smallplus_1,
		#g-_Nasib-Pekerja-Jakarta--Stres-dan-Tua-di-Jalan_-smallplus_2,
		#g-_Nasib-Pekerja-Jakarta--Stres-dan-Tua-di-Jalan_-smallplus_3,
		#g-_Nasib-Pekerja-Jakarta--Stres-dan-Tua-di-Jalan_-smallplus_4,
		#g-_Nasib-Pekerja-Jakarta--Stres-dan-Tua-di-Jalan_-smallplus_5,
		#g-_Nasib-Pekerja-Jakarta--Stres-dan-Tua-di-Jalan_-smallplus_5_copy,
		#g-_Nasib-Pekerja-Jakarta--Stres-dan-Tua-di-Jalan_-smallplus_5_copy_2
		 {
			display:none;
		}
	}

	@media only screen and (min-width:1400px) {
		#g-_Nasib-Pekerja-Jakarta--Stres-dan-Tua-di-Jalan_-cover_xlarge_5,
		#g-_Nasib-Pekerja-Jakarta--Stres-dan-Tua-di-Jalan_-xlarge_1,
		#g-_Nasib-Pekerja-Jakarta--Stres-dan-Tua-di-Jalan_-xlarge_2,
		#g-_Nasib-Pekerja-Jakarta--Stres-dan-Tua-di-Jalan_-xlarge_3,
		#g-_Nasib-Pekerja-Jakarta--Stres-dan-Tua-di-Jalan_-xlarge_4,
		#g-_Nasib-Pekerja-Jakarta--Stres-dan-Tua-di-Jalan_-xlarge_5,
		#g-_Nasib-Pekerja-Jakarta--Stres-dan-Tua-di-Jalan_-xlarge_5_copy,
		#g-_Nasib-Pekerja-Jakarta--Stres-dan-Tua-di-Jalan_-xlarge_5_copy_2 {
			display:block;
		}

		#g-_Nasib-Pekerja-Jakarta--Stres-dan-Tua-di-Jalan_-cover_large,
		#g-_Nasib-Pekerja-Jakarta--Stres-dan-Tua-di-Jalan_-large_1,
		#g-_Nasib-Pekerja-Jakarta--Stres-dan-Tua-di-Jalan_-large_2,
		#g-_Nasib-Pekerja-Jakarta--Stres-dan-Tua-di-Jalan_-large_3,
		#g-_Nasib-Pekerja-Jakarta--Stres-dan-Tua-di-Jalan_-large_4,
		#g-_Nasib-Pekerja-Jakarta--Stres-dan-Tua-di-Jalan_-large_5,
		#g-_Nasib-Pekerja-Jakarta--Stres-dan-Tua-di-Jalan_-large_5_copy,
		#g-_Nasib-Pekerja-Jakarta--Stres-dan-Tua-di-Jalan_-large_5_copy_2 {
			display:none;
		}

		#g-_Nasib-Pekerja-Jakarta--Stres-dan-Tua-di-Jalan_-cover_medium,
		#g-_Nasib-Pekerja-Jakarta--Stres-dan-Tua-di-Jalan_-medium_1,
		#g-_Nasib-Pekerja-Jakarta--Stres-dan-Tua-di-Jalan_-medium_2,
		#g-_Nasib-Pekerja-Jakarta--Stres-dan-Tua-di-Jalan_-medium_3,
		#g-_Nasib-Pekerja-Jakarta--Stres-dan-Tua-di-Jalan_-medium_4,
		#g-_Nasib-Pekerja-Jakarta--Stres-dan-Tua-di-Jalan_-medium_5,
		#g-_Nasib-Pekerja-Jakarta--Stres-dan-Tua-di-Jalan_-medium_5_copy,
		#g-_Nasib-Pekerja-Jakarta--Stres-dan-Tua-di-Jalan_-medium_5_copy_2 {
			display:none;
		}

		#g-_Nasib-Pekerja-Jakarta--Stres-dan-Tua-di-Jalan_-cover_submedium,
		#g-_Nasib-Pekerja-Jakarta--Stres-dan-Tua-di-Jalan_-submedium_1,
		#g-_Nasib-Pekerja-Jakarta--Stres-dan-Tua-di-Jalan_-submedium_2,
		#g-_Nasib-Pekerja-Jakarta--Stres-dan-Tua-di-Jalan_-submedium_3,
		#g-_Nasib-Pekerja-Jakarta--Stres-dan-Tua-di-Jalan_-submedium_4,
		#g-_Nasib-Pekerja-Jakarta--Stres-dan-Tua-di-Jalan_-submedium_5,
		#g-_Nasib-Pekerja-Jakarta--Stres-dan-Tua-di-Jalan_-submedium_5_copy,
		#g-_Nasib-Pekerja-Jakarta--Stres-dan-Tua-di-Jalan_-submedium_5_copy_2 {
			display:none;
		}

		#g-_Nasib-Pekerja-Jakarta--Stres-dan-Tua-di-Jalan_-cover_smallplus,
		#g-_Nasib-Pekerja-Jakarta--Stres-dan-Tua-di-Jalan_-smallplus_1,
		#g-_Nasib-Pekerja-Jakarta--Stres-dan-Tua-di-Jalan_-smallplus_2,
		#g-_Nasib-Pekerja-Jakarta--Stres-dan-Tua-di-Jalan_-smallplus_3,
		#g-_Nasib-Pekerja-Jakarta--Stres-dan-Tua-di-Jalan_-smallplus_4,
		#g-_Nasib-Pekerja-Jakarta--Stres-dan-Tua-di-Jalan_-smallplus_5,
		#g-_Nasib-Pekerja-Jakarta--Stres-dan-Tua-di-Jalan_-smallplus_5_copy,
		#g-_Nasib-Pekerja-Jakarta--Stres-dan-Tua-di-Jalan_-smallplus_5_copy_2 {
			display:none;
		}
	}

</style>