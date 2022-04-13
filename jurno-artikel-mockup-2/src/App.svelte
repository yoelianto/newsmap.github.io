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
	let mainBackground='#761fff'	
	let headerBackground='#761fff'
	let titleColor='#f9f9e1'
	let subtitleColor='#f9f9e1'
	let subheadColor='#f9f9e1'

	let subhead = ['Indonesia adalah salah satu negara dengan jumlah jenis ular berbisa terbanyak di dunia. Totalnya 77 jenis yang terbagi ke dalam tiga famili: elapidae, viperidae, & colubridae',

	'Namun,  sampai saat ini Indonesia hanya memiliki stok antivenom untuk 8-10 jenis ular berbisa. Masih ada 67 jenis ular berbisa lain yang tak punya antivenom. Jumlah tersebut lebih sedikit dari Australia yang masing-masing memiliki antivenom untuk 7-12 jenis ular dan Thailand yang punya 12-20 antivenom.',

	'Sedangkan jumlah ular berbisa di Indonesia jauh lebih banyak dibandingkan Australia dan Malaysia yang masing-masing hanya 20 jenis. Sementara di dunia terdapat 320 jenis ular berbisa yang mematikan, menurut WHO. Artinya, 24 persen di antara berada di negeri ini.'
	]

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

</script>

<svelte:head>
	<link rel="preconnect" href="https://fonts.googleapis.com">
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
	<link href="https://fonts.googleapis.com/css2?family=Fondamento:ital@0;1&display=swap" rel="stylesheet">
</svelte:head>

<main style="background-color: {mainBackground}">
	<div id="g-Bisa-Ular-box" class="ai2html">
		<!-- Artboard: smallplus-cover -->
		<div id="g-Bisa-Ular-smallplus-cover" class="g-artboard" style="max-width: 509px;max-height: 509px" data-aspect-ratio="1" data-min-width="0" data-max-width="509">
		<div style="padding: 0 0 100% 0;"></div>
		<img id="g-Bisa-Ular-smallplus-cover-img" class="g-aiImg" alt="" src="./images/Bisa-Ular-smallplus-cover.png"/>
		</div>
			
		<!-- Artboard: submedium-cover -->
		<div id="g-Bisa-Ular-submedium-cover" class="g-artboard" style="min-width: 510px;max-width: 689px;max-height: 432px" data-aspect-ratio="1.594" data-min-width="510" data-max-width="689">
		<div style="padding: 0 0 62.7451% 0;"></div>
		<img id="g-Bisa-Ular-submedium-cover-img" class="g-aiImg" alt="" src="./images/Bisa-Ular-submedium-cover.png"/>
		</div>
			
		<!-- Artboard: medium-cover -->
		<div id="g-Bisa-Ular-medium-cover" class="g-artboard" style="min-width: 690px;max-width: 919px;max-height: 426px" data-aspect-ratio="2.156" data-min-width="690" data-max-width="919">
		<div style="padding: 0 0 46.3768% 0;"></div>
		<img id="g-Bisa-Ular-medium-cover-img" class="g-aiImg" alt="" src="./images/Bisa-Ular-medium-cover.png"/>
		</div>
			
		<!-- Artboard: large-cover -->
		<div id="g-Bisa-Ular-large-cover" class="g-artboard" style="min-width: 920px;max-width: 1399px;max-height: 485px" data-aspect-ratio="2.884" data-min-width="920" data-max-width="1399">
		<div style="padding: 0 0 34.6739% 0;"></div>
			<img id="g-Bisa-Ular-large-cover-img" class="g-aiImg" alt="" src="./images/Bisa-Ular-large-cover.png"/>
		</div>
			
		<!-- Artboard: xlarge-cover -->
		<div id="g-Bisa-Ular-xlarge-cover" class="g-artboard" style="min-width: 1400px;" data-aspect-ratio="4.466" data-min-width="1400">
		<div style="padding: 0 0 22.3929% 0;"></div>
			<img id="g-Bisa-Ular-xlarge-cover-img" class="g-aiImg" alt="" src="./images/Bisa-Ular-xlarge-cover.png"/>
		</div>
	</div>

	<Header 
		--headerBackground={headerBackground}
		--titleColor={titleColor}
		--subtitleColor={subtitleColor}
		--subheadColor={subheadColor}

		fullHeader={false}

		title='Bisa Ular'

		subhead={subhead}
		

		author='Ahsan Ridhoi'
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
			<div id="g-Bisa-Ular-box" class="ai2html">

			{#if index == 0}
				<!-- Halaman 1 -->
				<!-- Artboard: smallplus-1 -->
				<div id="g-Bisa-Ular-smallplus-1" class="g-artboard" style="max-width: 509px;max-height: 1113px" data-aspect-ratio="0.457" data-min-width="0" data-max-width="509"
				style:opacity={offset <= 0.2 ? offset : offset <= 0.8 ? 1 : 1 - offset}>
				<div style="padding: 0 0 218.75% 0;"></div>
				<img id="g-Bisa-Ular-smallplus-1-img" class="g-aiImg" alt="" src="./images/Bisa-Ular-smallplus-1.png"/>
				</div>

				<!-- Artboard: submedium-1 -->
				<div id="g-Bisa-Ular-submedium-1" class="g-artboard" style="min-width: 510px;max-width: 689px;max-height: 1081px" data-aspect-ratio="0.638" data-min-width="510" data-max-width="689"
				style:opacity={offset <= 0.2 ? offset : offset <= 0.8 ? 1 : 1 - offset}>
				<div style="padding: 0 0 156.8627% 0;"></div>
				<img id="g-Bisa-Ular-submedium-1-img" class="g-aiImg" alt="" src="./images/Bisa-Ular-submedium-1.png"/>
				</div>

				<!-- Artboard: medium-1 -->
				<div id="g-Bisa-Ular-medium-1" class="g-artboard" style="min-width: 690px;max-width: 919px;max-height: 1364px" data-aspect-ratio="0.674" data-min-width="690" data-max-width="919"
				style:opacity={offset <= 0.2 ? offset : offset <= 0.8 ? 1 : 1 - offset}>
				<div style="padding: 0 0 148.4058% 0;"></div>
				<img id="g-Bisa-Ular-medium-1-img" class="g-aiImg" alt="" src="./images/Bisa-Ular-medium-1.png"/>
				</div>

				<!-- Artboard: large-1 -->
				<div id="g-Bisa-Ular-large-1" class="g-artboard" style="min-width: 920px;max-width: 1399px;max-height: 1399px" data-aspect-ratio="1" data-min-width="920" data-max-width="1399"
				style:opacity={offset <= 0.2 ? offset : offset <= 0.8 ? 1 : 1 - offset}>
				<div style="padding: 0 0 100% 0;"></div>
				<img id="g-Bisa-Ular-large-1-img" class="g-aiImg" alt="" src="./images/Bisa-Ular-large-1.png"/>
				</div>

				<!-- Artboard: xlarge-1 -->
				<div id="g-Bisa-Ular-xlarge-1" class="g-artboard" style="min-width: 1400px;" data-aspect-ratio="1.778" data-min-width="1400"
				style:opacity={offset <= 0.2 ? offset : offset <= 0.8 ? 1 : 1 - offset}>
				<div style="padding: 0 0 56.25% 0;"></div>
				<img id="g-Bisa-Ular-xlarge-1-img" class="g-aiImg" alt="" src="./images/Bisa-Ular-xlarge-1.png"/>
				</div>


			{:else if index == 1}
				<!-- Halaman 2 -->
				<!-- Artboard: smallplus-2 -->
				<div id="g-Bisa-Ular-smallplus-2" class="g-artboard" style="max-width: 509px;max-height: 1113px" data-aspect-ratio="0.457" data-min-width="0" data-max-width="509"
				style:opacity={offset <= 0.2 ? offset : offset <= 0.8 ? 1 : 1 - offset}>
				<div style="padding: 0 0 218.75% 0;"></div>
				<img id="g-Bisa-Ular-smallplus-2-img" class="g-aiImg" alt="" src="./images/Bisa-Ular-smallplus-2.png"/>
				</div>

				<!-- Artboard: submedium-2 -->
				<div id="g-Bisa-Ular-submedium-2" class="g-artboard" style="min-width: 510px;max-width: 689px;max-height: 1081px" data-aspect-ratio="0.638" data-min-width="510" data-max-width="689"
				style:opacity={offset <= 0.2 ? offset : offset <= 0.8 ? 1 : 1 - offset}>
				<div style="padding: 0 0 156.8627% 0;"></div>
				<img id="g-Bisa-Ular-submedium-2-img" class="g-aiImg" alt="" src="./images/Bisa-Ular-submedium-2.png"/>
				</div>

				<!-- Artboard: medium-2 -->
				<div id="g-Bisa-Ular-medium-2" class="g-artboard" style="min-width: 690px;max-width: 919px;max-height: 1364px" data-aspect-ratio="0.674" data-min-width="690" data-max-width="919"
				style:opacity={offset <= 0.2 ? offset : offset <= 0.8 ? 1 : 1 - offset}>
				<div style="padding: 0 0 148.4058% 0;"></div>
				<img id="g-Bisa-Ular-medium-2-img" class="g-aiImg" alt="" src="./images/Bisa-Ular-medium-2.png"/>
				</div>

				<!-- Artboard: large-2 -->
				<div id="g-Bisa-Ular-large-2" class="g-artboard" style="min-width: 920px;max-width: 1399px;max-height: 1399px" data-aspect-ratio="1" data-min-width="920" data-max-width="1399"
				style:opacity={offset <= 0.2 ? offset : offset <= 0.8 ? 1 : 1 - offset}>
				<div style="padding: 0 0 100% 0;"></div>
				<img id="g-Bisa-Ular-large-2-img" class="g-aiImg" alt="" src="./images/Bisa-Ular-large-2.png"/>
				</div>

				<!-- Artboard: xlarge-2 -->
				<div id="g-Bisa-Ular-xlarge-2" class="g-artboard" style="min-width: 1400px;" data-aspect-ratio="1.778" data-min-width="1400"
				style:opacity={offset <= 0.2 ? offset : offset <= 0.8 ? 1 : 1 - offset}>
				<div style="padding: 0 0 56.25% 0;"></div>
				<img id="g-Bisa-Ular-xlarge-2-img" class="g-aiImg" alt="" src="./images/Bisa-Ular-xlarge-2.png"/>
				</div>


			{:else if index == 2}
				<!-- Halaman 3 -->
				<!-- Artboard: smallplus-3 -->
				<div id="g-Bisa-Ular-smallplus-3" class="g-artboard" style="max-width: 509px;max-height: 1113px" data-aspect-ratio="0.457" data-min-width="0" data-max-width="509"
				style:opacity={offset <= 0.2 ? offset : offset <= 0.8 ? 1 : 1 - offset}>
				<div style="padding: 0 0 218.75% 0;"></div>
				<img id="g-Bisa-Ular-smallplus-3-img" class="g-aiImg" alt="" src="./images/Bisa-Ular-smallplus-3.png"/>
				</div>

				<!-- Artboard: submedium-3 -->
				<div id="g-Bisa-Ular-submedium-3" class="g-artboard" style="min-width: 510px;max-width: 689px;max-height: 1081px" data-aspect-ratio="0.638" data-min-width="510" data-max-width="689"
				style:opacity={offset <= 0.2 ? offset : offset <= 0.8 ? 1 : 1 - offset}>
				<div style="padding: 0 0 156.8627% 0;"></div>
				<img id="g-Bisa-Ular-submedium-3-img" class="g-aiImg" alt="" src="./images/Bisa-Ular-submedium-3.png"/>
				</div>

				<!-- Artboard: medium-3 -->
				<div id="g-Bisa-Ular-medium-3" class="g-artboard" style="min-width: 690px;max-width: 919px;max-height: 1364px" data-aspect-ratio="0.674" data-min-width="690" data-max-width="919"
				style:opacity={offset <= 0.2 ? offset : offset <= 0.8 ? 1 : 1 - offset}>
				<div style="padding: 0 0 148.4058% 0;"></div>
				<img id="g-Bisa-Ular-medium-3-img" class="g-aiImg" alt="" src="./images/Bisa-Ular-medium-3.png"/>
				</div>

				<!-- Artboard: large-3 -->
				<div id="g-Bisa-Ular-large-3" class="g-artboard" style="min-width: 920px;max-width: 1399px;max-height: 1399px" data-aspect-ratio="1" data-min-width="920" data-max-width="1399"
				style:opacity={offset <= 0.2 ? offset : offset <= 0.8 ? 1 : 1 - offset}>
				<div style="padding: 0 0 100% 0;"></div>
				<img id="g-Bisa-Ular-large-3-img" class="g-aiImg" alt="" src="./images/Bisa-Ular-large-3.png"/>
				</div>

				<!-- Artboard: xlarge-3 -->
				<div id="g-Bisa-Ular-xlarge-3" class="g-artboard" style="min-width: 1400px;" data-aspect-ratio="1.778" data-min-width="1400"
				style:opacity={offset <= 0.2 ? offset : offset <= 0.8 ? 1 : 1 - offset}>
				<div style="padding: 0 0 56.25% 0;"></div>
				<img id="g-Bisa-Ular-xlarge-3-img" class="g-aiImg" alt="" src="./images/Bisa-Ular-xlarge-3.png"/>
				</div>


			{:else if index == 3}
				<!-- Halaman 4 -->
				<!-- Artboard: smallplus-4 -->
				<div id="g-Bisa-Ular-smallplus-4" class="g-artboard" style="max-width: 509px;max-height: 1113px" data-aspect-ratio="0.457" data-min-width="0" data-max-width="509"
				style:opacity={offset <= 0.2 ? offset : offset <= 0.8 ? 1 : 1 - offset}>
				<div style="padding: 0 0 218.75% 0;"></div>
				<img id="g-Bisa-Ular-smallplus-4-img" class="g-aiImg" alt="" src="./images/Bisa-Ular-smallplus-4.png"/>
				</div>

				<!-- Artboard: submedium-4 -->
				<div id="g-Bisa-Ular-submedium-4" class="g-artboard" style="min-width: 510px;max-width: 689px;max-height: 1081px" data-aspect-ratio="0.638" data-min-width="510" data-max-width="689"
				style:opacity={offset <= 0.2 ? offset : offset <= 0.8 ? 1 : 1 - offset}>
				<div style="padding: 0 0 156.8627% 0;"></div>
				<img id="g-Bisa-Ular-submedium-4-img" class="g-aiImg" alt="" src="./images/Bisa-Ular-submedium-4.png"/>
				</div>

				<!-- Artboard: medium-4 -->
				<div id="g-Bisa-Ular-medium-4" class="g-artboard" style="min-width: 690px;max-width: 919px;max-height: 1364px" data-aspect-ratio="0.674" data-min-width="690" data-max-width="919"
				style:opacity={offset <= 0.2 ? offset : offset <= 0.8 ? 1 : 1 - offset}>
				<div style="padding: 0 0 148.4058% 0;"></div>
				<img id="g-Bisa-Ular-medium-4-img" class="g-aiImg" alt="" src="./images/Bisa-Ular-medium-4.png"/>
				</div>

				<!-- Artboard: large-4 -->
				<div id="g-Bisa-Ular-large-4" class="g-artboard" style="min-width: 920px;max-width: 1399px;max-height: 1399px" data-aspect-ratio="1" data-min-width="920" data-max-width="1399"
				style:opacity={offset <= 0.2 ? offset : offset <= 0.8 ? 1 : 1 - offset}>
				<div style="padding: 0 0 100% 0;"></div>
				<img id="g-Bisa-Ular-large-4-img" class="g-aiImg" alt="" src="./images/Bisa-Ular-large-4.png"/>
				</div>

				<!-- Artboard: xlarge-4 -->
				<div id="g-Bisa-Ular-xlarge-4" class="g-artboard" style="min-width: 1400px;" data-aspect-ratio="1.778" data-min-width="1400"
				style:opacity={offset <= 0.2 ? offset : offset <= 0.8 ? 1 : 1 - offset}>
				<div style="padding: 0 0 56.25% 0;"></div>
				<img id="g-Bisa-Ular-xlarge-4-img" class="g-aiImg" alt="" src="./images/Bisa-Ular-xlarge-4.png"/>
				</div>
			
			{:else if index == 4}
				<!-- Halaman 5 -->
				<!-- Artboard: smallplus-5 -->
				<div id="g-Bisa-Ular-smallplus-5" class="g-artboard" style="max-width: 509px;max-height: 1113px" data-aspect-ratio="0.457" data-min-width="0" data-max-width="509"
				style:opacity={offset <= 0.2 ? offset : offset <= 0.8 ? 1 : 1 - offset}>
				<div style="padding: 0 0 218.75% 0;"></div>
				<img id="g-Bisa-Ular-smallplus-5-img" class="g-aiImg" alt="" src="./images/Bisa-Ular-smallplus-5.png"/>
				</div>

				<!-- Artboard: submedium-5 -->
				<div id="g-Bisa-Ular-submedium-5" class="g-artboard" style="min-width: 510px;max-width: 689px;max-height: 1081px" data-aspect-ratio="0.638" data-min-width="510" data-max-width="689"
				style:opacity={offset <= 0.2 ? offset : offset <= 0.8 ? 1 : 1 - offset}>
				<div style="padding: 0 0 156.8627% 0;"></div>
				<img id="g-Bisa-Ular-submedium-5-img" class="g-aiImg" alt="" src="./images/Bisa-Ular-submedium-5.png"/>
				</div>

				<!-- Artboard: medium-5 -->
				<div id="g-Bisa-Ular-medium-5" class="g-artboard" style="min-width: 690px;max-width: 919px;max-height: 1364px" data-aspect-ratio="0.674" data-min-width="690" data-max-width="919"
				style:opacity={offset <= 0.2 ? offset : offset <= 0.8 ? 1 : 1 - offset}>
				<div style="padding: 0 0 148.4058% 0;"></div>
				<img id="g-Bisa-Ular-medium-5-img" class="g-aiImg" alt="" src="./images/Bisa-Ular-medium-5.png"/>
				</div>

				<!-- Artboard: large-5 -->
				<div id="g-Bisa-Ular-large-5" class="g-artboard" style="min-width: 920px;max-width: 1399px;max-height: 1399px" data-aspect-ratio="1" data-min-width="920" data-max-width="1399"
				style:opacity={offset <= 0.2 ? offset : offset <= 0.8 ? 1 : 1 - offset}>
				<div style="padding: 0 0 100% 0;"></div>
				<img id="g-Bisa-Ular-large-5-img" class="g-aiImg" alt="" src="./images/Bisa-Ular-large-5.png"/>
				</div>

				<!-- Artboard: xlarge-5 -->
				<div id="g-Bisa-Ular-xlarge-5" class="g-artboard" style="min-width: 1400px;" data-aspect-ratio="1.778" data-min-width="1400"
				style:opacity={offset <= 0.2 ? offset : offset <= 0.8 ? 1 : 1 - offset}>
				<div style="padding: 0 0 56.25% 0;"></div>
				<img id="g-Bisa-Ular-xlarge-5-img" class="g-aiImg" alt="" src="./images/Bisa-Ular-xlarge-5.png"/>
				</div>

			
			{:else if index == 5}
				<!-- Halaman 6 -->
				<!-- Artboard: smallplus-6 -->
				<div id="g-Bisa-Ular-smallplus-6" class="g-artboard" style="max-width: 509px;max-height: 1113px" data-aspect-ratio="0.457" data-min-width="0" data-max-width="509"
				style:opacity={offset <= 0.2 ? offset : offset <= 0.8 ? 1 : 1 - offset}>
				<div style="padding: 0 0 218.75% 0;"></div>
				<img id="g-Bisa-Ular-smallplus-6-img" class="g-aiImg" alt="" src="./images/Bisa-Ular-smallplus-6.png"/>
				</div>

				<!-- Artboard: submedium-6 -->
				<div id="g-Bisa-Ular-submedium-6" class="g-artboard" style="min-width: 510px;max-width: 689px;max-height: 1081px" data-aspect-ratio="0.638" data-min-width="510" data-max-width="689"
				style:opacity={offset <= 0.2 ? offset : offset <= 0.8 ? 1 : 1 - offset}>
				<div style="padding: 0 0 156.8627% 0;"></div>
				<img id="g-Bisa-Ular-submedium-6-img" class="g-aiImg" alt="" src="./images/Bisa-Ular-submedium-6.png"/>
				</div>

				<!-- Artboard: medium-6 -->
				<div id="g-Bisa-Ular-medium-6" class="g-artboard" style="min-width: 690px;max-width: 919px;max-height: 1364px" data-aspect-ratio="0.674" data-min-width="690" data-max-width="919"
				style:opacity={offset <= 0.2 ? offset : offset <= 0.8 ? 1 : 1 - offset}>
				<div style="padding: 0 0 148.4058% 0;"></div>
				<img id="g-Bisa-Ular-medium-6-img" class="g-aiImg" alt="" src="./images/Bisa-Ular-medium-6.png"/>
				</div>

				<!-- Artboard: large-6 -->
				<div id="g-Bisa-Ular-large-6" class="g-artboard" style="min-width: 920px;max-width: 1399px;max-height: 1399px" data-aspect-ratio="1" data-min-width="920" data-max-width="1399"
				style:opacity={offset <= 0.2 ? offset : offset <= 0.8 ? 1 : 1 - offset}>
				<div style="padding: 0 0 100% 0;"></div>
				<img id="g-Bisa-Ular-large-6-img" class="g-aiImg" alt="" src="./images/Bisa-Ular-large-6.png"/>
				</div>

				<!-- Artboard: xlarge-6 -->
				<div id="g-Bisa-Ular-xlarge-6" class="g-artboard" style="min-width: 1400px;" data-aspect-ratio="1.778" data-min-width="1400"
				style:opacity={offset <= 0.2 ? offset : offset <= 0.8 ? 1 : 1 - offset}>
				<div style="padding: 0 0 56.25% 0;"></div>
				<img id="g-Bisa-Ular-xlarge-6-img" class="g-aiImg" alt="" src="./images/Bisa-Ular-xlarge-6.png"/>
				</div>
			{:else if index == 6}
				<!-- Halaman 7 -->
				<!-- Artboard: smallplus-7 -->
				<div id="g-Bisa-Ular-smallplus-7" class="g-artboard" style="max-width: 509px;max-height: 1113px" data-aspect-ratio="0.457" data-min-width="0" data-max-width="509"
				style:opacity={offset <= 0.2 ? offset : offset <= 0.8 ? 1 : 1 - offset}>
				<div style="padding: 0 0 218.75% 0;"></div>
				<img id="g-Bisa-Ular-smallplus-7-img" class="g-aiImg" alt="" src="./images/Bisa-Ular-smallplus-7.png"/>
				</div>

				<!-- Artboard: submedium-7 -->
				<div id="g-Bisa-Ular-submedium-7" class="g-artboard" style="min-width: 510px;max-width: 689px;max-height: 1081px" data-aspect-ratio="0.638" data-min-width="510" data-max-width="689"
				style:opacity={offset <= 0.2 ? offset : offset <= 0.8 ? 1 : 1 - offset}>
				<div style="padding: 0 0 156.8627% 0;"></div>
				<img id="g-Bisa-Ular-submedium-7-img" class="g-aiImg" alt="" src="./images/Bisa-Ular-submedium-7.png"/>
				</div>

				<!-- Artboard: medium-7 -->
				<div id="g-Bisa-Ular-medium-7" class="g-artboard" style="min-width: 690px;max-width: 919px;max-height: 1364px" data-aspect-ratio="0.674" data-min-width="690" data-max-width="919"
				style:opacity={offset <= 0.2 ? offset : offset <= 0.8 ? 1 : 1 - offset}>
				<div style="padding: 0 0 148.4058% 0;"></div>
				<img id="g-Bisa-Ular-medium-7-img" class="g-aiImg" alt="" src="./images/Bisa-Ular-medium-7.png"/>
				</div>

				<!-- Artboard: large-7 -->
				<div id="g-Bisa-Ular-large-7" class="g-artboard" style="min-width: 920px;max-width: 1399px;max-height: 1399px" data-aspect-ratio="1" data-min-width="920" data-max-width="1399"
				style:opacity={offset <= 0.2 ? offset : offset <= 0.8 ? 1 : 1 - offset}>
				<div style="padding: 0 0 100% 0;"></div>
				<img id="g-Bisa-Ular-large-7-img" class="g-aiImg" alt="" src="./images/Bisa-Ular-large-7.png"/>
				</div>

				<!-- Artboard: xlarge-7 -->
				<div id="g-Bisa-Ular-xlarge-7" class="g-artboard" style="min-width: 1400px;" data-aspect-ratio="1.778" data-min-width="1400"
				style:opacity={offset <= 0.2 ? offset : offset <= 0.8 ? 1 : 1 - offset}>
				<div style="padding: 0 0 56.25% 0;"></div>
				<img id="g-Bisa-Ular-xlarge-7-img" class="g-aiImg" alt="" src="./images/Bisa-Ular-xlarge-7.png"/>
				</div>
			{:else if index == 7}
				<!-- Halaman 8 -->
				<!-- Artboard: smallplus-8 -->
				<div id="g-Bisa-Ular-smallplus-8" class="g-artboard" style="max-width: 509px;max-height: 1113px" data-aspect-ratio="0.457" data-min-width="0" data-max-width="509"
				style:opacity={offset <= 0.2 ? offset : offset <= 0.8 ? 1 : 1 - offset}>
				<div style="padding: 0 0 218.75% 0;"></div>
				<img id="g-Bisa-Ular-smallplus-8-img" class="g-aiImg" alt="" src="./images/Bisa-Ular-smallplus-8.png"/>
				</div>

				<!-- Artboard: submedium-8 -->
				<div id="g-Bisa-Ular-submedium-8" class="g-artboard" style="min-width: 510px;max-width: 689px;max-height: 1081px" data-aspect-ratio="0.638" data-min-width="510" data-max-width="689"
				style:opacity={offset <= 0.2 ? offset : offset <= 0.8 ? 1 : 1 - offset}>
				<div style="padding: 0 0 156.8627% 0;"></div>
				<img id="g-Bisa-Ular-submedium-8-img" class="g-aiImg" alt="" src="./images/Bisa-Ular-submedium-8.png"/>
				</div>

				<!-- Artboard: medium-8 -->
				<div id="g-Bisa-Ular-medium-8" class="g-artboard" style="min-width: 690px;max-width: 919px;max-height: 1364px" data-aspect-ratio="0.674" data-min-width="690" data-max-width="919"
				style:opacity={offset <= 0.2 ? offset : offset <= 0.8 ? 1 : 1 - offset}>
				<div style="padding: 0 0 148.4058% 0;"></div>
				<img id="g-Bisa-Ular-medium-8-img" class="g-aiImg" alt="" src="./images/Bisa-Ular-medium-8.png"/>
				</div>

				<!-- Artboard: large-8 -->
				<div id="g-Bisa-Ular-large-8" class="g-artboard" style="min-width: 920px;max-width: 1399px;max-height: 1399px" data-aspect-ratio="1" data-min-width="920" data-max-width="1399"
				style:opacity={offset <= 0.2 ? offset : offset <= 0.8 ? 1 : 1 - offset}>
				<div style="padding: 0 0 100% 0;"></div>
				<img id="g-Bisa-Ular-large-8-img" class="g-aiImg" alt="" src="./images/Bisa-Ular-large-8.png"/>
				</div>

				<!-- Artboard: xlarge-8 -->
				<div id="g-Bisa-Ular-xlarge-8" class="g-artboard" style="min-width: 1400px;" data-aspect-ratio="1.778" data-min-width="1400"
				style:opacity={offset <= 0.2 ? offset : offset <= 0.8 ? 1 : 1 - offset}>
				<div style="padding: 0 0 56.25% 0;"></div>
				<img id="g-Bisa-Ular-xlarge-8-img" class="g-aiImg" alt="" src="./images/Bisa-Ular-xlarge-8.png"/>
				</div>
			{:else if index == 8}
				<!-- Halaman 9 -->
				<!-- Artboard: smallplus-9 -->
				<div id="g-Bisa-Ular-smallplus-9" class="g-artboard" style="max-width: 509px;max-height: 1113px" data-aspect-ratio="0.457" data-min-width="0" data-max-width="509"
				style:opacity={offset <= 0.2 ? offset : offset <= 0.8 ? 1 : 1 - offset}>
				<div style="padding: 0 0 218.75% 0;"></div>
				<img id="g-Bisa-Ular-smallplus-9-img" class="g-aiImg" alt="" src="./images/Bisa-Ular-smallplus-9.png"/>
				</div>

				<!-- Artboard: submedium-9 -->
				<div id="g-Bisa-Ular-submedium-9" class="g-artboard" style="min-width: 510px;max-width: 689px;max-height: 1081px" data-aspect-ratio="0.638" data-min-width="510" data-max-width="689"
				style:opacity={offset <= 0.2 ? offset : offset <= 0.8 ? 1 : 1 - offset}>
				<div style="padding: 0 0 156.8627% 0;"></div>
				<img id="g-Bisa-Ular-submedium-9-img" class="g-aiImg" alt="" src="./images/Bisa-Ular-submedium-9.png"/>
				</div>

				<!-- Artboard: medium-9 -->
				<div id="g-Bisa-Ular-medium-9" class="g-artboard" style="min-width: 690px;max-width: 919px;max-height: 1364px" data-aspect-ratio="0.674" data-min-width="690" data-max-width="919"
				style:opacity={offset <= 0.2 ? offset : offset <= 0.8 ? 1 : 1 - offset}>
				<div style="padding: 0 0 148.4058% 0;"></div>
				<img id="g-Bisa-Ular-medium-9-img" class="g-aiImg" alt="" src="./images/Bisa-Ular-medium-9.png"/>
				</div>

				<!-- Artboard: large-9 -->
				<div id="g-Bisa-Ular-large-9" class="g-artboard" style="min-width: 920px;max-width: 1399px;max-height: 1399px" data-aspect-ratio="1" data-min-width="920" data-max-width="1399"
				style:opacity={offset <= 0.2 ? offset : offset <= 0.8 ? 1 : 1 - offset}>
				<div style="padding: 0 0 100% 0;"></div>
				<img id="g-Bisa-Ular-large-9-img" class="g-aiImg" alt="" src="./images/Bisa-Ular-large-9.png"/>
				</div>

				<!-- Artboard: xlarge-9 -->
				<div id="g-Bisa-Ular-xlarge-9" class="g-artboard" style="min-width: 1400px;" data-aspect-ratio="1.778" data-min-width="1400"
				style:opacity={offset <= 0.2 ? offset : offset <= 0.8 ? 1 : 1 - offset}>
				<div style="padding: 0 0 56.25% 0;"></div>
				<img id="g-Bisa-Ular-xlarge-9-img" class="g-aiImg" alt="" src="./images/Bisa-Ular-xlarge-9.png"/>
				</div>
			{:else if index >= 9}
				<!-- Halaman 1- -->
				<!-- Artboard: smallplus-10 -->
				<div id="g-Bisa-Ular-smallplus-10" class="g-artboard" style="max-width: 509px;max-height: 1113px" data-aspect-ratio="0.457" data-min-width="0" data-max-width="509"
				style:opacity={offset <= 0.2 ? offset : offset <= 0.8 ? 1 : 1 - offset}>
				<div style="padding: 0 0 218.75% 0;"></div>
				<img id="g-Bisa-Ular-smallplus-10-img" class="g-aiImg" alt="" src="./images/Bisa-Ular-smallplus-10.png"/>
				</div>

				<!-- Artboard: submedium-10 -->
				<div id="g-Bisa-Ular-submedium-10" class="g-artboard" style="min-width: 510px;max-width: 689px;max-height: 1081px" data-aspect-ratio="0.638" data-min-width="510" data-max-width="689"
				style:opacity={offset <= 0.2 ? offset : offset <= 0.8 ? 1 : 1 - offset}>
				<div style="padding: 0 0 156.8627% 0;"></div>
				<img id="g-Bisa-Ular-submedium-10-img" class="g-aiImg" alt="" src="./images/Bisa-Ular-submedium-10.png"/>
				</div>

				<!-- Artboard: medium-10 -->
				<div id="g-Bisa-Ular-medium-10" class="g-artboard" style="min-width: 690px;max-width: 919px;max-height: 1364px" data-aspect-ratio="0.674" data-min-width="690" data-max-width="919"
				style:opacity={offset <= 0.2 ? offset : offset <= 0.8 ? 1 : 1 - offset}>
				<div style="padding: 0 0 148.4058% 0;"></div>
				<img id="g-Bisa-Ular-medium-10-img" class="g-aiImg" alt="" src="./images/Bisa-Ular-medium-10.png"/>
				</div>

				<!-- Artboard: large-10 -->
				<div id="g-Bisa-Ular-large-10" class="g-artboard" style="min-width: 920px;max-width: 1399px;max-height: 1399px" data-aspect-ratio="1" data-min-width="920" data-max-width="1399"
				style:opacity={offset <= 0.2 ? offset : offset <= 0.8 ? 1 : 1 - offset}>
				<div style="padding: 0 0 100% 0;"></div>
				<img id="g-Bisa-Ular-large-10-img" class="g-aiImg" alt="" src="./images/Bisa-Ular-large-10.png"/>
				</div>

				<!-- Artboard: xlarge-10 -->
				<div id="g-Bisa-Ular-xlarge-10" class="g-artboard" style="min-width: 1400px;" data-aspect-ratio="1.778" data-min-width="1400"
				style:opacity={offset <= 0.2 ? offset : offset <= 0.8 ? 1 : 1 - offset}>
				<div style="padding: 0 0 56.25% 0;"></div>
				<img id="g-Bisa-Ular-xlarge-10-img" class="g-aiImg" alt="" src="./images/Bisa-Ular-xlarge-10.png"/>
				</div>
			{/if}


			</div>
		</div>

		<div slot="foreground" >
			<section></section>
			<section>
				<p>
					Lima hari sebelum ulang tahunnya yang ke-13, pada Januari 2020, Martinus menggembala sapi-sapi ternaknya di sebuah ladang di Kabupaten Lembata, Nusa Tenggara Timur (NTT).
				</p>
			</section>
			<section>
				<p>
					Namun, a menginjak dan digigit seekor ular berbisa langka bernama ilmiah daboia ruselli siamensis. Ular ini termasuk golongan viperia ruselli yang hanya hidup di beberapa wilayah Indonesia Tengah, antara lain Pulau Flores, Pulau Komodo, NTT, Adonara, Ende, dan Pulau Solor.
				</p>
			</section>
			<section>
				<p>
					Dalam hitungan jam setelah terkena gigitan, ia mengalami gagal ginjal, kegagalan pernapasan, dan pendarahan di hampir semua organ tubuhnya. Dengan kata lain, nyawanya sedang di ujung tanduk.
				</p>
			</section>
			<section>
				<p>
					Kabar tersebut sampai kepada Tri Maharani pada 14 Januari 2020, doktor lulusan Universitas Brawijaya Malang yang menjabat sebagai Presiden Indonesia Toksinologi.
				</p>
			</section>
			<section>
				<p>
					Dalam kondisi semacam itu, menurut Maha, pasien harus mendapatkan antivenom atau anti bisa ular yang tepat. Masalahnya, antivenom untuk daboia ruselli siamensis tak tersedia di Indonesia. Kementerian Kesehatan dan PT Bio Farma pun tak bisa menyanggupi menyediakannya untuk keperluan penyembuhan Martinus.  
				</p>
			</section>
			<section>
				<p>
					Mujur, sekali lagi, masih berkawan dengan Martinus. Maha memiliki koneksi khusus dengan salah satu profesor yang menangani gigitan ular berbisa dari Queen Sabovana Memorial Institute Thailand.
				</p>
			</section>
			<section>
				<p>
					Profesor tersebut menyanggupi membantu Maha mendapatkan antivenom untuk mengobati Martinus. Keesokan harinya, Maha langsung terbang ke Bangkok, Thailand dan bertemu profesor tersebut. Ia membeli 12 vial antivenom untuk ular daboia ruselli siamensis melalui perantara kenalannya itu. Harga per vialnya mencapai ratusan dollar Amerika Serikat. Semua ia beli dengan uang pribadi. 
				</p>
			</section>
			<section>
				<p>
					Usai mendapat antivenom tersebut, Maha langsung berangkat ke Lembata. Lantaran tak ada pesawat yang langsung menuju Lembata, ia mesti transit terlebih dulu sehari di Surabaya untuk kemudian terbang menuju Kupang. Dari Kupang, ia melakukan perjalanan darat ke Lembata.
				</p>
			</section>
			<section>
				<p>
					Maha tiba di Lembata pada hari kelima usai Martinus tergigit ular. Ia langsung menyuntikkan antivenom tersebut ke tubuh Martinus dan mengawasi langsung perkembangan kesehatannya selama lebih kurang 12 jam.
				</p>
			</section>
			<section>
				<p>
					Tepat pukul 12 malam hari itu, saat usia Martinus resmi bertambah, kondisinya membaik. Pendarahan di organ-organ penting mulai berhenti. Ginjalnya pun membaik. Kini, ia telah sembuh dan menjalani hidup normal kembali.
				</p>
			</section>
		</div>
	</Scroller>

	<div class="divider"></div>

	<Paragraph
		--font-color ='#f9f9e1'
		para={[
		'Kelangkaan antivenom di Indonesia cukup mengkhawatirkan jika dibandingkan dengan jumlah kasus tahunan gigitan ular berbisa. Sepanjang sepuluh tahun ke belakang, berdasarkan laporan dari rumah sakit dan fasilitas Kesehatan lain, Maha mencatat sebanyak 135 ribu kasus gigitan ular di Indonesia per tahun.',
		'Dari jumlah kasus tersebut, rasio kematian korban mencapai 10% atau lebih 13.500 orang. Angka tersebut jauh dari standar Organisasi Kesehatan Dunia (WHO) bahwa rasio kematian maksimal di suatu wilayah adalah 2%.',
		'Data tersebut sebetulnya tak bisa menjadi gambaran utuh atas kasus gigitan ular di Indonesia. Pasalnya, tak ada catatan resmi dari pemerintah terkait persoalan kesehatan serius ini. Maka, menurut Maha, bisa jadi jumlah kasus dan kematian lebih dari angka tersebut.'
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
	#g-Bisa-Ular-box ,
	#g-Bisa-Ular-box .g-artboard {
		margin:0 auto;
	}
	#g-Bisa-Ular-box .g-aiImg {
		position:absolute;
		top:0;
		display:block;
		width:100% !important;
	}
	#g-Bisa-Ular-smallplus-cover {
		position:relative;
		overflow:hidden;
	}
	#g-Bisa-Ular-submedium-cover {
		position:relative;
		overflow:hidden;
	}
	#g-Bisa-Ular-medium-cover {
		position:relative;
		overflow:hidden;
	}
	#g-Bisa-Ular-large-cover {
		position:relative;
		overflow:hidden;
	}
	#g-Bisa-Ular-xlarge-cover {
		position:relative;
		overflow:hidden;
	}
	#g-Bisa-Ular-smallplus-1 {
		position:relative;
		overflow:hidden;
	}
	#g-Bisa-Ular-submedium-1 {
		position:relative;
		overflow:hidden;
	}
	#g-Bisa-Ular-medium-1 {
		position:relative;
		overflow:hidden;
	}
	#g-Bisa-Ular-large-1 {
		position:relative;
		overflow:hidden;
	}
	#g-Bisa-Ular-xlarge-1 {
		position:relative;
		overflow:hidden;
	}
	#g-Bisa-Ular-smallplus-2 {
		position:relative;
		overflow:hidden;
	}
	#g-Bisa-Ular-submedium-2 {
		position:relative;
		overflow:hidden;
	}
	#g-Bisa-Ular-medium-2 {
		position:relative;
		overflow:hidden;
	}
	#g-Bisa-Ular-large-2 {
		position:relative;
		overflow:hidden;
	}
	#g-Bisa-Ular-xlarge-2 {
		position:relative;
		overflow:hidden;
	}
	#g-Bisa-Ular-smallplus-3 {
		position:relative;
		overflow:hidden;
	}
	#g-Bisa-Ular-submedium-3 {
		position:relative;
		overflow:hidden;
	}
	#g-Bisa-Ular-medium-3 {
		position:relative;
		overflow:hidden;
	}
	#g-Bisa-Ular-large-3 {
		position:relative;
		overflow:hidden;
	}
	#g-Bisa-Ular-xlarge-3 {
		position:relative;
		overflow:hidden;
	}
	#g-Bisa-Ular-smallplus-4 {
		position:relative;
		overflow:hidden;
	}
	#g-Bisa-Ular-submedium-4 {
		position:relative;
		overflow:hidden;
	}
	#g-Bisa-Ular-medium-4 {
		position:relative;
		overflow:hidden;
	}
	#g-Bisa-Ular-large-4 {
		position:relative;
		overflow:hidden;
	}
	#g-Bisa-Ular-xlarge-4 {
		position:relative;
		overflow:hidden;
	}
	#g-Bisa-Ular-smallplus-5 {
		position:relative;
		overflow:hidden;
	}
	#g-Bisa-Ular-submedium-5 {
		position:relative;
		overflow:hidden;
	}
	#g-Bisa-Ular-medium-5 {
		position:relative;
		overflow:hidden;
	}
	#g-Bisa-Ular-large-5 {
		position:relative;
		overflow:hidden;
	}
	#g-Bisa-Ular-xlarge-5 {
		position:relative;
		overflow:hidden;
	}
	#g-Bisa-Ular-smallplus-6 {
		position:relative;
		overflow:hidden;
	}
	#g-Bisa-Ular-submedium-6 {
		position:relative;
		overflow:hidden;
	}
	#g-Bisa-Ular-medium-6 {
		position:relative;
		overflow:hidden;
	}
	#g-Bisa-Ular-large-6 {
		position:relative;
		overflow:hidden;
	}
	#g-Bisa-Ular-xlarge-6 {
		position:relative;
		overflow:hidden;
	}
	#g-Bisa-Ular-smallplus-7 {
		position:relative;
		overflow:hidden;
	}
	#g-Bisa-Ular-submedium-7 {
		position:relative;
		overflow:hidden;
	}
	#g-Bisa-Ular-medium-7 {
		position:relative;
		overflow:hidden;
	}
	#g-Bisa-Ular-large-7 {
		position:relative;
		overflow:hidden;
	}
	#g-Bisa-Ular-xlarge-7 {
		position:relative;
		overflow:hidden;
	}
	#g-Bisa-Ular-smallplus-8 {
		position:relative;
		overflow:hidden;
	}
	#g-Bisa-Ular-submedium-8 {
		position:relative;
		overflow:hidden;
	}
	#g-Bisa-Ular-medium-8 {
		position:relative;
		overflow:hidden;
	}
	#g-Bisa-Ular-large-8 {
		position:relative;
		overflow:hidden;
	}
	#g-Bisa-Ular-xlarge-8 {
		position:relative;
		overflow:hidden;
	}
	#g-Bisa-Ular-smallplus-9 {
		position:relative;
		overflow:hidden;
	}
	#g-Bisa-Ular-submedium-9 {
		position:relative;
		overflow:hidden;
	}
	#g-Bisa-Ular-medium-9 {
		position:relative;
		overflow:hidden;
	}
	#g-Bisa-Ular-large-9 {
		position:relative;
		overflow:hidden;
	}
	#g-Bisa-Ular-xlarge-9 {
		position:relative;
		overflow:hidden;
	}
	#g-Bisa-Ular-smallplus-10 {
		position:relative;
		overflow:hidden;
	}
	#g-Bisa-Ular-submedium-10 {
		position:relative;
		overflow:hidden;
	}
	#g-Bisa-Ular-medium-10 {
		position:relative;
		overflow:hidden;
	}
	#g-Bisa-Ular-large-10 {
		position:relative;
		overflow:hidden;
	}
	#g-Bisa-Ular-xlarge-10 {
		position:relative;
		overflow:hidden;
	}

	@media only screen and (max-width:509px) {
		#g-Bisa-Ular-xlarge-cover,
		#g-Bisa-Ular-xlarge-1,
		#g-Bisa-Ular-xlarge-2,
		#g-Bisa-Ular-xlarge-3,
		#g-Bisa-Ular-xlarge-4,
		#g-Bisa-Ular-xlarge-5,
		#g-Bisa-Ular-xlarge-6,
		#g-Bisa-Ular-xlarge-7,
		#g-Bisa-Ular-xlarge-8,
		#g-Bisa-Ular-xlarge-9,
		#g-Bisa-Ular-xlarge-10 {
			display:none;
		}

		#g-Bisa-Ular-large-cover,
		#g-Bisa-Ular-large-1,
		#g-Bisa-Ular-large-2,
		#g-Bisa-Ular-large-3,
		#g-Bisa-Ular-large-4,
		#g-Bisa-Ular-large-5,
		#g-Bisa-Ular-large-6,
		#g-Bisa-Ular-large-7,
		#g-Bisa-Ular-large-8,
		#g-Bisa-Ular-large-9,
		#g-Bisa-Ular-large-10 {
			display:none;
		}

		#g-Bisa-Ular-medium-cover,
		#g-Bisa-Ular-medium-1,
		#g-Bisa-Ular-medium-2,
		#g-Bisa-Ular-medium-3,
		#g-Bisa-Ular-medium-4,
		#g-Bisa-Ular-medium-5,
		#g-Bisa-Ular-medium-6,
		#g-Bisa-Ular-medium-7,
		#g-Bisa-Ular-medium-8,
		#g-Bisa-Ular-medium-9,
		#g-Bisa-Ular-medium-10 {
			display:none;
		}

		#g-Bisa-Ular-submedium-cover,
		#g-Bisa-Ular-submedium-1,
		#g-Bisa-Ular-submedium-2,
		#g-Bisa-Ular-submedium-3,
		#g-Bisa-Ular-submedium-4,
		#g-Bisa-Ular-submedium-5,
		#g-Bisa-Ular-submedium-6,
		#g-Bisa-Ular-submedium-7,
		#g-Bisa-Ular-submedium-8,
		#g-Bisa-Ular-submedium-9,
		#g-Bisa-Ular-submedium-10 {
			display:none;
		}

		#g-Bisa-Ular-smallplus-cover,
		#g-Bisa-Ular-smallplus-1,
		#g-Bisa-Ular-smallplus-2,
		#g-Bisa-Ular-smallplus-3,
		#g-Bisa-Ular-smallplus-4,
		#g-Bisa-Ular-smallplus-5,
		#g-Bisa-Ular-smallplus-6,
		#g-Bisa-Ular-smallplus-7,
		#g-Bisa-Ular-smallplus-8,
		#g-Bisa-Ular-smallplus-9,
		#g-Bisa-Ular-smallplus-10 {
			display:block;
		}
	}

	@media only screen and (min-width:510px) and (max-width:689px) {
		#g-Bisa-Ular-xlarge-cover,
		#g-Bisa-Ular-xlarge-1,
		#g-Bisa-Ular-xlarge-2,
		#g-Bisa-Ular-xlarge-3,
		#g-Bisa-Ular-xlarge-4,
		#g-Bisa-Ular-xlarge-5,
		#g-Bisa-Ular-xlarge-6,
		#g-Bisa-Ular-xlarge-7,
		#g-Bisa-Ular-xlarge-8,
		#g-Bisa-Ular-xlarge-9,
		#g-Bisa-Ular-xlarge-10 {
			display:none;
		}

		#g-Bisa-Ular-large-cover,
		#g-Bisa-Ular-large-1,
		#g-Bisa-Ular-large-2,
		#g-Bisa-Ular-large-3,
		#g-Bisa-Ular-large-4,
		#g-Bisa-Ular-large-5,
		#g-Bisa-Ular-large-6,
		#g-Bisa-Ular-large-7,
		#g-Bisa-Ular-large-8,
		#g-Bisa-Ular-large-9,
		#g-Bisa-Ular-large-10 {
			display:none;
		}

		#g-Bisa-Ular-medium-cover,
		#g-Bisa-Ular-medium-1,
		#g-Bisa-Ular-medium-2,
		#g-Bisa-Ular-medium-3,
		#g-Bisa-Ular-medium-4,
		#g-Bisa-Ular-medium-5,
		#g-Bisa-Ular-medium-6,
		#g-Bisa-Ular-medium-7,
		#g-Bisa-Ular-medium-8,
		#g-Bisa-Ular-medium-9,
		#g-Bisa-Ular-medium-10 {
			display:none;
		}

		#g-Bisa-Ular-submedium-cover,
		#g-Bisa-Ular-submedium-1,
		#g-Bisa-Ular-submedium-2,
		#g-Bisa-Ular-submedium-3,
		#g-Bisa-Ular-submedium-4,
		#g-Bisa-Ular-submedium-5,
		#g-Bisa-Ular-submedium-6,
		#g-Bisa-Ular-submedium-7,
		#g-Bisa-Ular-submedium-8,
		#g-Bisa-Ular-submedium-9,
		#g-Bisa-Ular-submedium-10 {
			display:block;
		}

		#g-Bisa-Ular-smallplus-cover,
		#g-Bisa-Ular-smallplus-1,
		#g-Bisa-Ular-smallplus-2,
		#g-Bisa-Ular-smallplus-3,
		#g-Bisa-Ular-smallplus-4,
		#g-Bisa-Ular-smallplus-5,
		#g-Bisa-Ular-smallplus-6,
		#g-Bisa-Ular-smallplus-7,
		#g-Bisa-Ular-smallplus-8,
		#g-Bisa-Ular-smallplus-9,
		#g-Bisa-Ular-smallplus-10 {
			display:none;
		}
	}

	@media only screen and (min-width:690px) and (max-width:919px) {
		#g-Bisa-Ular-xlarge-cover,
		#g-Bisa-Ular-xlarge-1,
		#g-Bisa-Ular-xlarge-2,
		#g-Bisa-Ular-xlarge-3,
		#g-Bisa-Ular-xlarge-4,
		#g-Bisa-Ular-xlarge-5,
		#g-Bisa-Ular-xlarge-6,
		#g-Bisa-Ular-xlarge-7,
		#g-Bisa-Ular-xlarge-8,
		#g-Bisa-Ular-xlarge-9,
		#g-Bisa-Ular-xlarge-10 {
			display:none;
		}

		#g-Bisa-Ular-large-cover,
		#g-Bisa-Ular-large-1,
		#g-Bisa-Ular-large-2,
		#g-Bisa-Ular-large-3,
		#g-Bisa-Ular-large-4,
		#g-Bisa-Ular-large-5,
		#g-Bisa-Ular-large-6,
		#g-Bisa-Ular-large-7,
		#g-Bisa-Ular-large-8,
		#g-Bisa-Ular-large-9,
		#g-Bisa-Ular-large-10 {
			display:none;
		}

		#g-Bisa-Ular-medium-cover,
		#g-Bisa-Ular-medium-1,
		#g-Bisa-Ular-medium-2,
		#g-Bisa-Ular-medium-3,
		#g-Bisa-Ular-medium-4,
		#g-Bisa-Ular-medium-5,
		#g-Bisa-Ular-medium-6,
		#g-Bisa-Ular-medium-7,
		#g-Bisa-Ular-medium-8,
		#g-Bisa-Ular-medium-9,
		#g-Bisa-Ular-medium-10 {
			display:block;
		}

		#g-Bisa-Ular-submedium-cover,
		#g-Bisa-Ular-submedium-1,
		#g-Bisa-Ular-submedium-2,
		#g-Bisa-Ular-submedium-3,
		#g-Bisa-Ular-submedium-4,
		#g-Bisa-Ular-submedium-5,
		#g-Bisa-Ular-submedium-6,
		#g-Bisa-Ular-submedium-7,
		#g-Bisa-Ular-submedium-8,
		#g-Bisa-Ular-submedium-9,
		#g-Bisa-Ular-submedium-10 {
			display:none;
		}

		#g-Bisa-Ular-smallplus-cover,
		#g-Bisa-Ular-smallplus-1,
		#g-Bisa-Ular-smallplus-2,
		#g-Bisa-Ular-smallplus-3,
		#g-Bisa-Ular-smallplus-4,
		#g-Bisa-Ular-smallplus-5,
		#g-Bisa-Ular-smallplus-6,
		#g-Bisa-Ular-smallplus-7,
		#g-Bisa-Ular-smallplus-8,
		#g-Bisa-Ular-smallplus-9,
		#g-Bisa-Ular-smallplus-10 {
			display:none;
		}
	}

	@media only screen and (min-width:920px) and (max-width:1399px) {
		#g-Bisa-Ular-xlarge-cover,
		#g-Bisa-Ular-xlarge-1,
		#g-Bisa-Ular-xlarge-2,
		#g-Bisa-Ular-xlarge-3,
		#g-Bisa-Ular-xlarge-4,
		#g-Bisa-Ular-xlarge-5,
		#g-Bisa-Ular-xlarge-6,
		#g-Bisa-Ular-xlarge-7,
		#g-Bisa-Ular-xlarge-8,
		#g-Bisa-Ular-xlarge-9,
		#g-Bisa-Ular-xlarge-10 {
			display:none;
		}

		#g-Bisa-Ular-large-cover,
		#g-Bisa-Ular-large-1,
		#g-Bisa-Ular-large-2,
		#g-Bisa-Ular-large-3,
		#g-Bisa-Ular-large-4,
		#g-Bisa-Ular-large-5,
		#g-Bisa-Ular-large-6,
		#g-Bisa-Ular-large-7,
		#g-Bisa-Ular-large-8,
		#g-Bisa-Ular-large-9,
		#g-Bisa-Ular-large-10 {
			display:block;
		}

		#g-Bisa-Ular-medium-cover,
		#g-Bisa-Ular-medium-1,
		#g-Bisa-Ular-medium-2,
		#g-Bisa-Ular-medium-3,
		#g-Bisa-Ular-medium-4,
		#g-Bisa-Ular-medium-5,
		#g-Bisa-Ular-medium-6,
		#g-Bisa-Ular-medium-7,
		#g-Bisa-Ular-medium-8,
		#g-Bisa-Ular-medium-9,
		#g-Bisa-Ular-medium-10 {
			display:none;
		}

		#g-Bisa-Ular-submedium-cover,
		#g-Bisa-Ular-submedium-1,
		#g-Bisa-Ular-submedium-2,
		#g-Bisa-Ular-submedium-3,
		#g-Bisa-Ular-submedium-4,
		#g-Bisa-Ular-submedium-5,
		#g-Bisa-Ular-submedium-6,
		#g-Bisa-Ular-submedium-7,
		#g-Bisa-Ular-submedium-8,
		#g-Bisa-Ular-submedium-9,
		#g-Bisa-Ular-submedium-10 {
			display:none;
		}

		#g-Bisa-Ular-smallplus-cover,
		#g-Bisa-Ular-smallplus-1,
		#g-Bisa-Ular-smallplus-2,
		#g-Bisa-Ular-smallplus-3,
		#g-Bisa-Ular-smallplus-4,
		#g-Bisa-Ular-smallplus-5,
		#g-Bisa-Ular-smallplus-6,
		#g-Bisa-Ular-smallplus-7,
		#g-Bisa-Ular-smallplus-8,
		#g-Bisa-Ular-smallplus-9,
		#g-Bisa-Ular-smallplus-10 {
			display:none;
		}
	}

	@media only screen and (min-width:1400px) {
		#g-Bisa-Ular-xlarge-cover,
		#g-Bisa-Ular-xlarge-1,
		#g-Bisa-Ular-xlarge-2,
		#g-Bisa-Ular-xlarge-3,
		#g-Bisa-Ular-xlarge-4,
		#g-Bisa-Ular-xlarge-5,
		#g-Bisa-Ular-xlarge-6,
		#g-Bisa-Ular-xlarge-7,
		#g-Bisa-Ular-xlarge-8,
		#g-Bisa-Ular-xlarge-9,
		#g-Bisa-Ular-xlarge-10 {
			display:block;
		}

		#g-Bisa-Ular-large-cover,
		#g-Bisa-Ular-large-1,
		#g-Bisa-Ular-large-2,
		#g-Bisa-Ular-large-3,
		#g-Bisa-Ular-large-4,
		#g-Bisa-Ular-large-5,
		#g-Bisa-Ular-large-6,
		#g-Bisa-Ular-large-7,
		#g-Bisa-Ular-large-8,
		#g-Bisa-Ular-large-9,
		#g-Bisa-Ular-large-10 {
			display:none;
		}

		#g-Bisa-Ular-medium-cover,
		#g-Bisa-Ular-medium-1,
		#g-Bisa-Ular-medium-2,
		#g-Bisa-Ular-medium-3,
		#g-Bisa-Ular-medium-4,
		#g-Bisa-Ular-medium-5,
		#g-Bisa-Ular-medium-6,
		#g-Bisa-Ular-medium-7,
		#g-Bisa-Ular-medium-8,
		#g-Bisa-Ular-medium-9,
		#g-Bisa-Ular-medium-10 {
			display:none;
		}

		#g-Bisa-Ular-submedium-cover,
		#g-Bisa-Ular-submedium-1,
		#g-Bisa-Ular-submedium-2,
		#g-Bisa-Ular-submedium-3,
		#g-Bisa-Ular-submedium-4,
		#g-Bisa-Ular-submedium-5,
		#g-Bisa-Ular-submedium-6,
		#g-Bisa-Ular-submedium-7,
		#g-Bisa-Ular-submedium-8,
		#g-Bisa-Ular-submedium-9,
		#g-Bisa-Ular-submedium-10 {
			display:none;
		}

		#g-Bisa-Ular-smallplus-cover,
		#g-Bisa-Ular-smallplus-1,
		#g-Bisa-Ular-smallplus-2,
		#g-Bisa-Ular-smallplus-3,
		#g-Bisa-Ular-smallplus-4,
		#g-Bisa-Ular-smallplus-5,
		#g-Bisa-Ular-smallplus-6,
		#g-Bisa-Ular-smallplus-7,
		#g-Bisa-Ular-smallplus-8,
		#g-Bisa-Ular-smallplus-9,
		#g-Bisa-Ular-smallplus-10 {
			display:none;
		}
	}

</style>