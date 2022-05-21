<script>
	import Head from './Head.svelte';
	import Header from './Header.svelte';
	import Paragraph from './Paragraph.svelte';
	import Quote from './Quote.svelte';
	import Image from './Image.svelte';
	import Credit from './Credit.svelte';
	import Foot from './Foot.svelte';
	import Followers from './Followers.svelte';

	//Main Font
	let fontfamily1 = "Roboto Mono"

	//Main Color
	let fontColor = 'white'

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
	let mainBackground='#15202b'	
	let headerBackground='#15202b'
	let titleColor='#f9f9e1'
	let subtitleColor='#f9f9e1'
	let subheadColor='#f9f9e1'

	let height

	let credit =[{
		role : 'Penulis',
		name : 'Ann Putri'
		}]
	
	let subhead = [
		"Punya second account ngga?"
	]

</script>

<svelte:head>
	<meta
		name='viewport' 
		content='width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0'
	/>
	
	<link rel="preconnect" href="https://fonts.googleapis.com">
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
	<link href="https://fonts.googleapis.com/css2?family=Patrick+Hand&display=swap" rel="stylesheet">
	<link href="https://fonts.googleapis.com/css2?family=Neucha&display=swap" rel="stylesheet">
</svelte:head>

<main style="background-color: {mainBackground}">
	<div class="headerilustrasi" style="margin-top:{height}px;">
		<div id="g-Buka-Bukaan-di-Second-Account_19-box" class="ai2html">
			<!-- Artboard: smallplus-cover -->
			<div style="height:fit-content" id="g-Buka-Bukaan-di-Second-Account_19-smallplus-cover" class="g-artboard" data-aspect-ratio="1" data-min-width="0" data-max-width="509">
			<div style="padding: 0 0 100% 0;"></div>
			<img style="width:100%" id="g-Buka-Bukaan-di-Second-Account_19-smallplus-cover-img" class="g-aiImg" alt="" src="./images/Buka-Bukaan-di-Second-Account_19-smallplus-cover.png"/>
			</div>

			<!-- Artboard: submedium-cover -->
			<div id="g-Buka-Bukaan-di-Second-Account_19-submedium-cover" class="g-artboard"  data-aspect-ratio="1.594" data-min-width="510" data-max-width="689">
			<div style="padding: 0 0 {100/1.594}% 0;"></div>
			<img style="width:100%"  id="g-Buka-Bukaan-di-Second-Account_19-submedium-cover-img" class="g-aiImg" alt="" src="./images/Buka-Bukaan-di-Second-Account_19-submedium-cover.png"/>
			</div>

			<!-- Artboard: medium-cover -->
			<div id="g-Buka-Bukaan-di-Second-Account_19-medium-cover" class="g-artboard"  data-aspect-ratio="2.156" data-min-width="690" data-max-width="919">
			<div style="padding: 0 0 {100/2.156}% 0;"></div>
			<img style="width:100%"  id="g-Buka-Bukaan-di-Second-Account_19-medium-cover-img" class="g-aiImg" alt="" src="./images/Buka-Bukaan-di-Second-Account_19-medium-cover.png"/>
			</div>

			<!-- Artboard: large-cover -->
			<div id="g-Buka-Bukaan-di-Second-Account_19-large-cover" class="g-artboard"  data-aspect-ratio="2.884" data-min-width="920" data-max-width="1399">
			<div style="padding: 0 0 {100/2.884}% 0;"></div>
			<img style="width:100%"  id="g-Buka-Bukaan-di-Second-Account_19-large-cover-img" class="g-aiImg" alt="" src="./images/Buka-Bukaan-di-Second-Account_19-large-cover.png"/>
			</div>

			<!-- Artboard: xlarge-cover -->
			<div id="g-Buka-Bukaan-di-Second-Account_19-xlarge-cover" class="g-artboard"  data-aspect-ratio="4.466" data-min-width="1400">
			<div style="padding: 0 0 {100/4.466}% 0;"></div>
			<img style="width:100%" id="g-Buka-Bukaan-di-Second-Account_19-xlarge-cover-img" class="g-aiImg" alt="" src="./images/Buka-Bukaan-di-Second-Account_19-xlarge-cover.png"/>
			</div>
		</div>
	</div>	
	

	<Header 
		--headerBackground={headerBackground}
		--titleColor={titleColor}
		--subtitleColor={subtitleColor}
		--subheadColor={subheadColor}

		fullHeader={false}

		title='Buka-bukaan di Second Account'
		
		{subhead}

		author='Ann Putri'
		date='14 Mei 2022'		
	/>

	<div class="divider"></div>

	<Paragraph
		--font-color ='#f9f9e1'
		para={[
			"Kalau kamu mengerti pertanyaan di atas, selamat, kamu adalah satu dari generasi muda yang rutin menggunakan Instagram. Media sosial berbasis gambar ini “memaksa” kita untuk terus menunjukkan sisi terbaik kita. Akibatnya kita merasa harus terus mengkurasi <em>feed</em> sebaik mungkin.",
			"Sebagian anak muda merasa tekanan ini sangat menyesakkan sehingga mereka “kabur” ke akun kedua mereka. Akun yang kerap disebut sebagai <em>second account</em> atau <em>fake Instagram</em> (finsta) ini sengaja dibuat anonim dan privat. Fenomena ini sangat menarik sampai-sampai Rugun Sirait. Hasilnya adalah artikel jurnal berjudul “Spectatorial Sisterhood: Relasi Sosial Pengguna Second Account di Instagram”."
		]}
	/>

	<Image 
	img = {[{
        url: './images/buka-bukaan-di-second-account_xlarge-1.png',
        title: 'Performative Self vs Authentic Self di Media Sosial'
    }]}
	/>

	<Paragraph
		--font-color ='#f9f9e1'
		subjudul = '<em>Performative Self</em> vs <em>Authentic Self</em> di Media Sosial'
		para={[
			"Dalam percakapan kami, Rugun mengatakan artikel jurnal ini adalah skripsinya yang di-<em>recycle</em>. Penelitian Rugun melibatkan lima responden perempuan berusia 20-23 tahun. Awalnya responden tidak meliputi perempuan saja. Namun, setelah melihat kondisi lapangan, ia mengerucutkan semua responden ke perempuan. Menurutnya, perempuan punya lapisan pengalaman unik akibat ekspresi mereka di ruang publik lebih dikekang dibandingkan laki-laki. Ditambah ia juga merasa kesulitan karena kurang punya akses ke <em>second account</em> laki-laki."
		]}
	/>

	<Image 
	img = {[{
        url: './images/buka-bukaan-di-second-account_xlarge-2.png',
        title: 'Performative Self vs Authentic Self di Media Sosial'
    }]}
	/>

	<Paragraph
		--font-color ='#f9f9e1'
		para={[
			"Second account muncul karena ketiadaan privasi sekaligus munculnya tekanan untuk tampil sesempurna mungkin. Oleh karenanya <em>first account</em> atau akun utama merupakan “<em>performed selves</em>”, imaji khusus publik yang terkurasi.",
			"Namun ketidakaslian imaji diri dan sempitnya ekspresi diri yang diperbolehkan dalam akun utama membuat sebagian anak muda merasa tidak nyaman.",
			"Dari sinilah <em>second account</em> lahir sebagai tempat ekspresi diri yang bebas, otentik, dan paling penting, privat alias <em>authentic self<?em>."

		]}
	/>

	<Paragraph
		--font-color ='#f9f9e1'
		para={[
			"Berbekal <em>second account</em> miliknya, Rugun memposisikan diri sebagai pengguna second account, mengobservasi second account teman-teman sekaligus respondennya dari jarak aman. Dalam menganalisa fenomena ini, Rugun menggunakan konsep “<em>spectatorial girlfriendship</em>” dan “<em>common girlfriend experience</em>”.",
			"“<em>Spectatorial girlfriendship</em>” adalah konsep yang dicetuskan Akane Kanai (2019) dan digunakan untuk memahami simbol-simbol konstruksi femininitas antar perempuan yang tergambar dalam unggahan-unggahan media sosial mereka. Mode pertemanan ini bisa terjadi apabila para perempuan sudah memahami simbol-simbol dalam teks, visual, dan respons antara pengguna perempuan dengan para pengikutnya. <em>Spectatorial girlfriendship</em> terjadi di <em>first account</em>, di mana perempuan mengkurasi dirinya sendiri agar bisa tampil sempurna dan berkompetisi di pasar kerja.",
			"Sedangkan “<em>common girlfriend experience</em>” adalah pengalaman umum yang dibagikan oleh sesama perempuan. Pengalaman-pengalaman yang bersifat tidak sempurna, memalukan, dan <em>nyeleneh</em> ini kemudian dituangkan di <em>second account</em>. Bisa dibilang hanya di <em>second account</em> para perempuan bisa menjadi diri mereka yang otentik tanpa embel-embel imaji perempuan ideal.",
		]}
	/>

	<div id="g-Buka-Bukaan-di-Second-Account_19-box" class="ai2html">
		<!-- Artboard: smallplus-3 -->
		<div id="g-Buka-Bukaan-di-Second-Account_19-smallplus-3" class="g-artboard" data-aspect-ratio="0.457" data-min-width="0" data-max-width="509">
			<img style='width:100%;position:relative' id="g-Buka-Bukaan-di-Second-Account_19-smallplus-3-img" class="g-aiImg" alt="" src="./images/Buka-Bukaan-di-Second-Account_19-smallplus-3.png"/>
			<div id="g-ai15-1" class="g-Layer_1 g-aiAbs g-aiPointText" style="position:absolute;top:18.0692%;margin-top:-9.5px;left:14.0588%;width:90px;">
				<p class="g-pstyle0">First account</p>
			</div>
			<div id="g-ai15-2" class="g-Layer_1 g-aiAbs g-aiPointText" style="position:absolute;top:18.0692%;margin-top:-9.5px;right:14.0302%;width:102px;">
				<p class="g-pstyle1">Second account</p>
			</div>
			<div id="g-ai15-3" class="g-Layer_1 g-aiAbs g-aiPointText" style="position:absolute;top:21.3549%;margin-top:-9.5px;left:14.0588%;width:100px;">
				<p class="g-pstyle0">Mengkurasi diri</p>
			</div>
			<div id="g-ai15-4" class="g-Layer_1 g-aiAbs g-aiPointText" style="position:absolute;top:21.3549%;margin-top:-9.5px;right:14.0308%;width:122px;">
				<p class="g-pstyle1">Mengkurasi audiens</p>
			</div>
			<div id="g-ai15-5" class="g-Layer_1 g-aiAbs g-aiPointText" style="position:absolute;top:24.6406%;margin-top:-9.5px;left:14.0588%;width:72px;">
				<p class="g-pstyle0">Terkekang</p>
			</div>
			<div id="g-ai15-6" class="g-Layer_1 g-aiAbs g-aiPointText" style="position:absolute;top:24.6406%;margin-top:-9.5px;right:14.0887%;width:69px;">
				<p class="g-pstyle1">Ekspresif</p>
			</div>
			<div id="g-ai15-7" class="g-Layer_1 g-aiAbs g-aiPointText" style="position:absolute;top:27.9263%;margin-top:-9.5px;left:14.0588%;width:52px;">
				<p class="g-pstyle0">Publik</p>
			</div>
			<div id="g-ai15-8" class="g-Layer_1 g-aiAbs g-aiPointText" style="position:absolute;top:27.9263%;margin-top:-9.5px;right:13.949%;width:53px;">
				<p class="g-pstyle1">Privat</p>
			</div>
			<div id="g-ai15-9" class="g-Layer_1 g-aiAbs g-aiPointText" style="position:absolute;top:65.5356%;margin-top:-32.7px;left:6.8692%;width:135px;">
			<p style="margin:0" class="g-pstyle2">Spectatorial</p>
			<p style="margin:0" class="g-pstyle2">Girlfriend</p>
				</div>
			<div id="g-ai15-10" class="g-Layer_1 g-aiAbs g-aiPointText" style="position:absolute;top:67.7512%;margin-top:-48.3px;right:6.7517%;width:123px;">
				<p style="margin:0" class="g-pstyle3">Common</p>
				<p style="margin:0" class="g-pstyle3">Girlfriend</p>
				<p style="margin:0" class="g-pstyle3">Experience</p>
			</div>
		</div>
		
			<!-- Artboard: submedium-3 -->
			<div id="g-Buka-Bukaan-di-Second-Account_19-submedium-3" class="g-artboard"  data-aspect-ratio="0.638" data-min-width="510" data-max-width="689">
				<div style="padding: 0 0 {100/0.638}% 0"></div>
				<img style="width:100%"id="g-Buka-Bukaan-di-Second-Account_19-submedium-3-img" class="g-aiImg" alt="" src="./images/Buka-Bukaan-di-Second-Account_19-submedium-3.png"/>
				<div id="g-ai16-1" class="g-Layer_1 g-aiAbs g-aiPointText" style="position:absolute;top:16.8008%;margin-top:-13.4px;left:9.9198%;width:119px;">
					<p class="g-pstyle0">First account</p>
				</div>
				<div id="g-ai16-2" class="g-Layer_1 g-aiAbs g-aiPointText" style="position:absolute;top:16.8008%;margin-top:-13.4px;right:9.9544%;width:136px;">
					<p class="g-pstyle1">Second account</p>
				</div>
				<div id="g-ai16-3" class="g-Layer_1 g-aiAbs g-aiPointText" style="position:absolute;top:21.9258%;margin-top:-13.4px;left:9.9198%;width:134px;">
					<p class="g-pstyle0">Mengkurasi diri</p>
				</div>
				<div id="g-ai16-4" class="g-Layer_1 g-aiAbs g-aiPointText" style="position:absolute;top:21.9258%;margin-top:-13.4px;right:9.8709%;width:165px;">
					<p class="g-pstyle1">Mengkurasi audiens</p>
				</div>
				<div id="g-ai16-5" class="g-Layer_1 g-aiAbs g-aiPointText" style="position:absolute;top:27.0508%;margin-top:-13.4px;left:9.9198%;width:94px;">
					<p class="g-pstyle0">Terkekang</p>
				</div>
				<div id="g-ai16-6" class="g-Layer_1 g-aiAbs g-aiPointText" style="position:absolute;top:27.0508%;margin-top:-13.4px;right:9.9789%;width:89px;">
					<p class="g-pstyle1">Ekspresif</p>
				</div>
				<div id="g-ai16-7" class="g-Layer_1 g-aiAbs g-aiPointText" style="position:absolute;top:32.1758%;margin-top:-13.4px;left:9.9198%;width:65px;">
					<p class="g-pstyle0">Publik</p>
				</div>
				<div id="g-ai16-8" class="g-Layer_1 g-aiAbs g-aiPointText" style="position:absolute;top:32.1758%;margin-top:-13.4px;right:9.8817%;width:66px;">
					<p class="g-pstyle1">Privat</p>
				</div>
				<div id="g-ai16-9" class="g-Layer_1 g-aiAbs g-aiPointText" style="position:absolute;top:70.7187%;margin-top:-32.7px;left:5.1926%;width:135px;">
					<p style="margin:0" class="g-pstyle2">Spectatorial</p>
					<p class="g-pstyle2">Girlfriend</p>
				</div>
				<div id="g-ai16-10" class="g-Layer_1 g-aiAbs g-aiPointText" style="position:absolute;top:72.6573%;margin-top:-48.3px;right:5.1187%;width:123px;">
					<p style="margin:0" class="g-pstyle3">Common</p>
					<p style="margin:0" class="g-pstyle3">Girlfriend</p>
					<p style="margin:0" class="g-pstyle3">Experience</p>
				</div>
			</div>
		
			<!-- Artboard: medium-3 -->
			<div id="g-Buka-Bukaan-di-Second-Account_19-medium-3" class="g-artboard" data-aspect-ratio="0.674" data-min-width="690" data-max-width="919">
				<div style="padding: 0 0 {100/0.674}% 0"></div>
				<img style="width:100%"id="g-Buka-Bukaan-di-Second-Account_19-medium-3-img" class="g-aiImg" alt="" src="./images/Buka-Bukaan-di-Second-Account_19-medium-3.png"/>
				<div id="g-ai17-1" class="g-Layer_1 g-aiAbs g-aiPointText" style="position:absolute;top:17.2492%;margin-top:-45.6px;left:11.0144%;width:179px;">
					<p style="margin:0" class="g-pstyle0">Spectatorial</p>
					<p style="margin:0" class="g-pstyle0">Girlfriend</p>
				</div>
				<div id="g-ai17-2" class="g-Layer_1 g-aiAbs g-aiPointText" style="position:absolute;top:17.2492%;margin-top:-45.6px;right:11.0756%;width:261px;">
					<p style="margin:0" class="g-pstyle1">Common Girlfriend</p>
					<p style="margin:0" class="g-pstyle1">Experience</p>
				</div>
				<div id="g-ai17-3" class="g-Layer_1 g-aiAbs g-aiPointText" style="position:absolute;top:26.5045%;margin-top:-13.4px;left:10.8836%;width:119px;">
					<p class="g-pstyle2">First account</p>
				</div>
				<div id="g-ai17-4" class="g-Layer_1 g-aiAbs g-aiPointText" style="position:absolute;top:26.5045%;margin-top:-13.4px;right:10.9075%;width:136px;">
					<p class="g-pstyle3">Second account</p>
				</div>
				<div id="g-ai17-5" class="g-Layer_1 g-aiAbs g-aiPointText" style="position:absolute;top:30.5084%;margin-top:-13.4px;left:10.8836%;width:134px;">
					<p class="g-pstyle2">Mengkurasi diri</p>
				</div>
				<div id="g-ai17-6" class="g-Layer_1 g-aiAbs g-aiPointText" style="position:absolute;top:30.5084%;margin-top:-13.4px;right:10.8458%;width:165px;">
					<p class="g-pstyle3">Mengkurasi audiens</p>
				</div>
				<div id="g-ai17-7" class="g-Layer_1 g-aiAbs g-aiPointText" style="position:absolute;top:34.5123%;margin-top:-13.4px;left:10.8836%;width:94px;">
					<p class="g-pstyle2">Terkekang</p>
				</div>
				<div id="g-ai17-8" class="g-Layer_1 g-aiAbs g-aiPointText" style="position:absolute;top:34.5123%;margin-top:-13.4px;right:10.9256%;width:89px;">
					<p class="g-pstyle3">Ekspresif</p>
				</div>
				<div id="g-ai17-9" class="g-Layer_1 g-aiAbs g-aiPointText" style="position:absolute;top:38.5162%;margin-top:-13.4px;left:10.8836%;width:65px;">
					<p class="g-pstyle2">Publik</p>
				</div>
				<div id="g-ai17-10" class="g-Layer_1 g-aiAbs g-aiPointText" style="position:absolute;top:38.5162%;margin-top:-13.4px;right:10.8537%;width:66px;">
					<p class="g-pstyle3">Privat</p>
				</div>
			</div>
		
			<!-- Artboard: large-3 -->
			<div id="g-Buka-Bukaan-di-Second-Account_19-large-3" class="g-artboard" data-aspect-ratio="1" data-min-width="920" data-max-width="1399">
				<div style="padding: 0 0 {100/1}% 0"></div>
				<img style="width:100%" id="g-Buka-Bukaan-di-Second-Account_19-large-3-img" class="g-aiImg" alt="" src="./images/Buka-Bukaan-di-Second-Account_19-large-3.png"/>
				<div id="g-ai18-1" class="g-Layer_1 g-aiAbs g-aiPointText" style="position:absolute;top:21.1206%;margin-top:-64.3px;left:8.8384%;width:243px;">
					<p style="margin:0" class="g-pstyle0">Spectatorial</p>
					<p style="margin:0" class="g-pstyle0">Girlfriend</p>
				</div>
				<div id="g-ai18-2" class="g-Layer_1 g-aiAbs g-aiPointText" style="position:absolute;top:21.1206%;margin-top:-64.3px;right:8.8443%;width:359px;">
					<p style="margin:0" class="g-pstyle1">Common Girlfriend</p>
					<p style="margin:0" class="g-pstyle1">Experience</p>
				</div>
				<div id="g-ai18-3" class="g-Layer_1 g-aiAbs g-aiPointText" style="position:absolute;top:35.5497%;margin-top:-19.1px;left:8.7009%;width:159px;">
					<p class="g-pstyle2">First account</p>
				</div>
				<div id="g-ai18-4" class="g-Layer_1 g-aiAbs g-aiPointText" style="position:absolute;top:35.5497%;margin-top:-19.1px;right:8.6699%;width:183px;">
					<p class="g-pstyle3">Second account</p>
				</div>
				<div id="g-ai18-5" class="g-Layer_1 g-aiAbs g-aiPointText" style="position:absolute;top:41.854%;margin-top:-19.1px;left:8.7009%;width:180px;">
					<p class="g-pstyle2">Mengkurasi diri</p>
				</div>
				<div id="g-ai18-6" class="g-Layer_1 g-aiAbs g-aiPointText" style="position:absolute;top:41.854%;margin-top:-19.1px;right:8.6943%;width:223px;">
					<p class="g-pstyle3">Mengkurasi audiens</p>
				</div>
				<div id="g-ai18-7" class="g-Layer_1 g-aiAbs g-aiPointText" style="position:absolute;top:48.0497%;margin-top:-19.1px;left:8.7009%;width:123px;">
					<p class="g-pstyle2">Terkekang</p>
				</div>
				<div id="g-ai18-8" class="g-Layer_1 g-aiAbs g-aiPointText" style="position:absolute;top:48.0497%;margin-top:-19.1px;right:8.6711%;width:117px;">
					<p class="g-pstyle3">Ekspresif</p>
				</div>
				<div id="g-ai18-9" class="g-Layer_1 g-aiAbs g-aiPointText" style="position:absolute;top:54.354%;margin-top:-19.1px;left:8.7009%;width:82px;">
					<p class="g-pstyle2">Publik</p>
				</div>
				<div id="g-ai18-10" class="g-Layer_1 g-aiAbs g-aiPointText" style="position:absolute;top:54.354%;margin-top:-19.1px;right:8.6629%;width:84px;">
					<p class="g-pstyle3">Privat</p>
				</div>
			</div>
		
			<!-- Artboard: xlarge-3 -->
			<div id="g-Buka-Bukaan-di-Second-Account_19-xlarge-3" class="g-artboard" data-aspect-ratio="1.778" data-min-width="1400">
				<div style="padding: 0 0 {100/1.778}% 0"></div>
				<img style="width:100%"id="g-Buka-Bukaan-di-Second-Account_19-xlarge-3-img" class="g-aiImg" alt="" src="./images/Buka-Bukaan-di-Second-Account_19-xlarge-3.png"/>
				<div id="g-ai19-1"  class="g-Layer_1 g-aiAbs g-aiPointText" style="position:absolute;top:20.1028%;margin-top:-64.3px;left:9.951%;width:243px;">
					<p style="margin:0" class="g-pstyle0">Spectatorial</p>
					<p style="margin:0" class="g-pstyle0">Girlfriend</p>
				</div>
				<div id="g-ai19-2"  class="g-Layer_1 g-aiAbs g-aiPointText" style="position:absolute;top:20.1028%;margin-top:-64.3px;right:9.9548%;width:359px;">
					<p style="margin:0" class="g-pstyle1">Common Girlfriend</p>
					<p style="margin:0" class="g-pstyle1">Experience</p>
				</div>
				<div id="g-ai19-3" class="g-Layer_1 g-aiAbs g-aiPointText" style="position:absolute;top:37.3406%;margin-top:-19.1px;left:9.8606%;width:159px;">
					<p class="g-pstyle2">First account</p>
				</div>
				<div id="g-ai19-4"  class="g-Layer_1 g-aiAbs g-aiPointText" style="position:absolute;top:37.3406%;margin-top:-19.1px;right:9.8402%;width:183px;">
					<p class="g-pstyle3">Second account</p>
				</div>
				<div id="g-ai19-5"  class="g-Layer_1 g-aiAbs g-aiPointText" style="position:absolute;top:44.7057%;margin-top:-19.1px;left:9.8606%;width:180px;">
					<p class="g-pstyle2">Mengkurasi diri</p>
				</div>
				<div id="g-ai19-6"  class="g-Layer_1 g-aiAbs g-aiPointText" style="position:absolute;top:44.7057%;margin-top:-19.1px;right:9.8562%;width:223px;">
					<p class="g-pstyle3">Mengkurasi audiens</p>
				</div>
				<div id="g-ai19-7"  class="g-Layer_1 g-aiAbs g-aiPointText" style="position:absolute;top:51.9438%;margin-top:-19.1px;left:9.8606%;width:123px;">
					<p class="g-pstyle2">Terkekang</p>
				</div>
				<div id="g-ai19-8"  class="g-Layer_1 g-aiAbs g-aiPointText" style="position:absolute;top:51.9438%;margin-top:-19.1px;right:9.841%;width:117px;">
					<p class="g-pstyle3">Ekspresif</p>
				</div>
				<div id="g-ai19-9"  class="g-Layer_1 g-aiAbs g-aiPointText" style="position:absolute;top:59.3088%;margin-top:-19.1px;left:9.8606%;width:82px;">
					<p class="g-pstyle2">Publik</p>
				</div>
				<div id="g-ai19-10"  class="g-Layer_1 g-aiAbs g-aiPointText" style="position:absolute;top:59.3088%;margin-top:-19.1px;right:9.8356%;width:84px;">
					<p class="g-pstyle3">Privat</p>
				</div>
			</div>
	</div>

	<Paragraph
		--font-color ='#f9f9e1'
		subjudul='Berbagi Pengalaman Intim'
		para={[
			"Menurut Rugun, pertemanan intim yang dibolehkan masuk ke <em>second account</em> adalah pertemanan IRL (<em>In Real Life</em>) atau dunia nyata. Ini karena relasi luring dianggap lebih terpercaya, sehingga <em>second account</em> menjadi tempat berkumpul teman-teman dekat yang hanya bisa bersua lewat media sosial. Keluarga dan teman kerja cenderung tidak dimasukkan ke <em>second account</em> karena persona yang ditampilkan di <em>second account</em> tidak sejalan dengan persona yang ditampilkan ke mereka.",
			"Apabila imaji di <em>first account</em> dibuat sesempurna mungkin, maka di <em>second account</em> kebalikannya. Nada humor yang menjelekkan diri sendiri sering digunakan untuk menyoroti kekurangan sekaligus sebagai cara untuk <em>relatable</em>. Tak hanya itu, guyonan ini juga berfungsi untuk menandakan kedekatan.",
			"Natasha, contohnya, menggunakan <em>second account</em> untuk menunjukkan sisi dirinya yang suka mengeluh lewat humor yang merendahkan diri. Humor mencela juga digunakan oleh pengikut yang terdiri dari teman-teman dekat ketika merespon unggahan di <em>second account</em>. Hal serupa juga dilakukan Silfi, responden lainnya. Ia mengunggah foto dengan pose dan caption sok imut untuk menandakan bahwa dirinya baik-baik saja setelah mengalami <em>mental breakdown</em> beberapa hari lalu.",
			"Sensitifnya isu yang diposting di <em>second account</em> membuat para pemiliknya menekan angka <em>followers</em> sekecil mungkin. Apabila di akun utama mereka memiliki ratusan hingga ribuan pengikut, maka <em>second account</em> kebalikannya.",
			"Hal ini diilustrasikan oleh Rugun lewat jumlah <em>followers</em> para responden:",
		]}
	/>
	
	<Followers 
		data={[
			{
				nama:'Silfi',
				follower:69,
				img:'./images/profil-01.png'
			},
			{
				nama:'Natasha',
				follower:55,
				img:'./images/profil-02.png'
			},
			{
				nama:'Brenda',
				follower:31,
				img:'./images/profil-03.png'
			},
			{
				nama:'Fransiska',
				follower:24,
				img:'./images/profil-04.png'
			},
			{
				nama:'Tabitha',
				follower:21,
				img:'./images/profil-05.png'
			}
		]}
	/>

	<Paragraph
		--font-color ='#f9f9e1'
		para={[
			"Hanya orang-orang terpercaya dan sudah dikenal lama oleh pemilik yang dibolehkan mengikuti <em>second account</em>. Fitur “kunci akun” Instagram membuat pemilik bisa mengkurasi siapa yang boleh mengikuti dan melihat isi akun. Berdasarkan pengakuan responden, para pengikut umumnya adalah teman dekat sejak SMP-SMA hingga dari masa kuliah. Dalam beberapa kasus, sebagian memperbolehkan pasangan dan anggota keluarga untuk mengikuti akun mereka."
		]}
	/>

	<Image 
	img = {[{
        url: './images/buka-bukaan-di-second-account_xlarge-4.png',
        title: 'Performative Self vs Authentic Self di Media Sosial'
    }]}
	/>

	<Paragraph
		--font-color ='#f9f9e1'
		para={[
			"Kepercayaan menjadi token terpenting karena <em>second account</em> merupakan ruang aman para penggunanya. Mengklik tombol “<em>follow</em>” berarti meneken kontrak kepercayaan bahwa apa yang terjadi di <em>second account</em> tetap ada di <em>second account</em>.",
			"Sayangnya ada beberapa pihak tak bertanggung jawab yang membeberkan isi akun mereka ke publik. Tak ada yang bisa dilakukan selain menegur pelaku dan menendangnya dari akun pribadi.",
			"Di bagian akhir tulisan, Rugun mempertanyakan “rasa aman” yang didapatkan dari <em>second account</em>. Untuk menjawabnya ia beralih ke McRobbie (2015) yang menyatakan orang-orang melarikan diri dari tatapan publik tanpa henti di akun pertama. Sayang ia tidak mengelaborasikan lebih lanjut tentang rasa waswas yang dirasakan responden soal pembeberan isi <em>second account</em> ke orang luar. Padahal, hal ini cukup krusial mengingat orang-orang menggunakan <em>second account</em> karena isu privasi."
		]}
	/>

	<Image 
	img = {[{
        url: './images/buka-bukaan-di-second-account_xlarge-5.png',
        title: 'Performative Self vs Authentic Self di Media Sosial'
    }]}
	/>

	<Paragraph
		--font-color ='#f9f9e1'
		para={[
			"Rugun menyimpulkan fenomena <em>second account</em> di kalangan perempuan sebagai <em>spectatorial sisterhood</em> alias relasi spektatorial antara persaudaraan perempuan. Menurutnya, relasi yang terbangun antara pemilik dan pengikut merupakan relasi intim yang penuh kepercayaan dan bersifat dua arah. Kedekatan dan dinamika relasi antara pemilik akun dengan pengikutnya terasa seperti persaudaraan. "
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
		background-color:#f6efa6 ;
		margin:2rem auto;
		border-radius: 0.1rem;
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
	#g-Buka-Bukaan-di-Second-Account_19-box ,
	#g-Buka-Bukaan-di-Second-Account_19-box .g-artboard {
		margin:0 auto;
	}
	#g-Buka-Bukaan-di-Second-Account_19-box p {
		margin:0;
	}
	#g-Buka-Bukaan-di-Second-Account_19-box .g-aiAbs {
		z-index:10;
		position:absolute;
	}
	#g-Buka-Bukaan-di-Second-Account_19-box .g-aiImg {
		position:absolute;
		top:0;
		display:block;
		width:100% !important;
	}
	#g-Buka-Bukaan-di-Second-Account_19-box .g-aiPointText p { white-space: nowrap; }
	#g-Buka-Bukaan-di-Second-Account_19-smallplus-cover {
		position:relative;
		overflow:hidden;
	}
	#g-Buka-Bukaan-di-Second-Account_19-submedium-cover {
		position:relative;
		overflow:hidden;
	}
	#g-Buka-Bukaan-di-Second-Account_19-medium-cover {
		position:relative;
		overflow:hidden;
	}
	#g-Buka-Bukaan-di-Second-Account_19-large-cover {
		position:relative;
		overflow:hidden;
	}
	#g-Buka-Bukaan-di-Second-Account_19-xlarge-cover {
		position:relative;
		overflow:hidden;
	}
	#g-Buka-Bukaan-di-Second-Account_19-smallplus-3 {
		position:relative;
		overflow:hidden;
	}
	#g-Buka-Bukaan-di-Second-Account_19-smallplus-3 p {
		font-family: 'Neucha', cursive;
		font-weight:500;
		line-height:17px;
		height:auto;
		opacity:1;
		letter-spacing:0em;
		font-size:14px;
		text-align:left;
		color:rgb(21,32,43);
		text-transform:none;
		padding-bottom:0;
		padding-top:0;
		mix-blend-mode:normal;
		font-style:normal;
		position:static;
	}
	#g-Buka-Bukaan-di-Second-Account_19-smallplus-3 .g-pstyle0 {
		height:17px;
	}
	#g-Buka-Bukaan-di-Second-Account_19-smallplus-3 .g-pstyle1 {
		height:17px;
		text-align:right;
	}
	#g-Buka-Bukaan-di-Second-Account_19-smallplus-3 .g-pstyle2 {
		line-height:31px;
		height:31px;
		font-size:26px;
		color:rgb(255,255,255);
	}
	#g-Buka-Bukaan-di-Second-Account_19-smallplus-3 .g-pstyle3 {
		line-height:31px;
		height:31px;
		font-size:26px;
		text-align:right;
		color:rgb(255,255,255);
	}
	#g-Buka-Bukaan-di-Second-Account_19-submedium-3 {
		position:relative;
		overflow:hidden;
	}
	#g-Buka-Bukaan-di-Second-Account_19-submedium-3 p {
		font-family: 'Neucha', cursive;
		font-weight:500;
		line-height:24px;
		height:auto;
		opacity:1;
		letter-spacing:0em;
		font-size:20px;
		text-align:left;
		color:rgb(21,32,43);
		text-transform:none;
		padding-bottom:0;
		padding-top:0;
		mix-blend-mode:normal;
		font-style:normal;
		position:static;
	}
	#g-Buka-Bukaan-di-Second-Account_19-submedium-3 .g-pstyle0 {
		height:24px;
	}
	#g-Buka-Bukaan-di-Second-Account_19-submedium-3 .g-pstyle1 {
		height:24px;
		text-align:right;
	}
	#g-Buka-Bukaan-di-Second-Account_19-submedium-3 .g-pstyle2 {
		line-height:31px;
		height:31px;
		font-size:26px;
		color:rgb(255,255,255);
	}
	#g-Buka-Bukaan-di-Second-Account_19-submedium-3 .g-pstyle3 {
		line-height:31px;
		height:31px;
		font-size:26px;
		text-align:right;
		color:rgb(255,255,255);
	}
	#g-Buka-Bukaan-di-Second-Account_19-medium-3 {
		position:relative;
		overflow:hidden;
	}
	#g-Buka-Bukaan-di-Second-Account_19-medium-3 p {
		font-family: 'Neucha', cursive;
		font-weight:500;
		line-height:24px;
		height:auto;
		opacity:1;
		letter-spacing:0em;
		font-size:20px;
		text-align:left;
		color:rgb(21,32,43);
		text-transform:none;
		padding-bottom:0;
		padding-top:0;
		mix-blend-mode:normal;
		font-style:normal;
		position:static;
	}
	#g-Buka-Bukaan-di-Second-Account_19-medium-3 .g-pstyle0 {
		line-height:43px;
		height:43px;
		font-size:36px;
	}
	#g-Buka-Bukaan-di-Second-Account_19-medium-3 .g-pstyle1 {
		line-height:43px;
		height:43px;
		font-size:36px;
		text-align:right;
	}
	#g-Buka-Bukaan-di-Second-Account_19-medium-3 .g-pstyle2 {
		height:24px;
	}
	#g-Buka-Bukaan-di-Second-Account_19-medium-3 .g-pstyle3 {
		height:24px;
		text-align:right;
	}
	#g-Buka-Bukaan-di-Second-Account_19-large-3 {
		position:relative;
		overflow:hidden;
	}
	#g-Buka-Bukaan-di-Second-Account_19-large-3 p {
		font-family: 'Neucha', cursive;
		font-weight:500;
		line-height:34px;
		height:auto;
		opacity:1;
		letter-spacing:0em;
		font-size:28px;
		text-align:left;
		color:rgb(21,32,43);
		text-transform:none;
		padding-bottom:0;
		padding-top:0;
		mix-blend-mode:normal;
		font-style:normal;
		position:static;
	}
	#g-Buka-Bukaan-di-Second-Account_19-large-3 .g-pstyle0 {
		line-height:61px;
		height:61px;
		font-size:51px;
	}
	#g-Buka-Bukaan-di-Second-Account_19-large-3 .g-pstyle1 {
		line-height:61px;
		height:61px;
		font-size:51px;
		text-align:right;
	}
	#g-Buka-Bukaan-di-Second-Account_19-large-3 .g-pstyle2 {
		height:34px;
	}
	#g-Buka-Bukaan-di-Second-Account_19-large-3 .g-pstyle3 {
		height:34px;
		text-align:right;
	}
	#g-Buka-Bukaan-di-Second-Account_19-xlarge-3 {
		position:relative;
		overflow:hidden;
	}
	#g-Buka-Bukaan-di-Second-Account_19-xlarge-3 p {
		font-family: 'Neucha', cursive;
		font-weight:500;
		line-height:34px;
		height:auto;
		opacity:1;
		letter-spacing:0em;
		font-size:28px;
		text-align:left;
		color:rgb(21,32,43);
		text-transform:none;
		padding-bottom:0;
		padding-top:0;
		mix-blend-mode:normal;
		font-style:normal;
		position:static;
	}
	#g-Buka-Bukaan-di-Second-Account_19-xlarge-3 .g-pstyle0 {
		line-height:61px;
		height:61px;
		font-size:51px;
	}
	#g-Buka-Bukaan-di-Second-Account_19-xlarge-3 .g-pstyle1 {
		line-height:61px;
		height:61px;
		font-size:51px;
		text-align:right;
	}
	#g-Buka-Bukaan-di-Second-Account_19-xlarge-3 .g-pstyle2 {
		height:34px;
	}
	#g-Buka-Bukaan-di-Second-Account_19-xlarge-3 .g-pstyle3 {
		height:34px;
		text-align:right;
	}

	@media only screen and (max-width:509px) {
		#g-Buka-Bukaan-di-Second-Account_19-xlarge-cover,
		#g-Buka-Bukaan-di-Second-Account_19-xlarge-3 {
			display:none;
		}

		#g-Buka-Bukaan-di-Second-Account_19-large-cover,
		#g-Buka-Bukaan-di-Second-Account_19-large-3 {
			display:none;
		}

		#g-Buka-Bukaan-di-Second-Account_19-medium-cover,
		#g-Buka-Bukaan-di-Second-Account_19-medium-3 {
			display:none;
		}

		#g-Buka-Bukaan-di-Second-Account_19-submedium-cover,
		#g-Buka-Bukaan-di-Second-Account_19-submedium-3 {
			display:none;
		}

		#g-Buka-Bukaan-di-Second-Account_19-smallplus-cover,
		#g-Buka-Bukaan-di-Second-Account_19-smallplus-3 {
			display:block;
		}
	}

	@media only screen and (min-width:510px) and (max-width:689px) {
		#g-Buka-Bukaan-di-Second-Account_19-xlarge-cover,
		#g-Buka-Bukaan-di-Second-Account_19-xlarge-3 {
			display:none;
		}

		#g-Buka-Bukaan-di-Second-Account_19-large-cover,
		#g-Buka-Bukaan-di-Second-Account_19-large-3 {
			display:none;
		}

		#g-Buka-Bukaan-di-Second-Account_19-medium-cover,
		#g-Buka-Bukaan-di-Second-Account_19-medium-3 {
			display:none;
		}

		#g-Buka-Bukaan-di-Second-Account_19-submedium-cover,
		#g-Buka-Bukaan-di-Second-Account_19-submedium-3 {
			display:block;
		}

		#g-Buka-Bukaan-di-Second-Account_19-smallplus-cover,
		#g-Buka-Bukaan-di-Second-Account_19-smallplus-3 {
			display:none;
		}
	}

	@media only screen and (min-width:690px) and (max-width:919px) {
		#g-Buka-Bukaan-di-Second-Account_19-xlarge-cover,
		#g-Buka-Bukaan-di-Second-Account_19-xlarge-3 {
			display:none;
		}

		#g-Buka-Bukaan-di-Second-Account_19-large-cover,
		#g-Buka-Bukaan-di-Second-Account_19-large-3 {
			display:none;
		}

		#g-Buka-Bukaan-di-Second-Account_19-medium-cover,
		#g-Buka-Bukaan-di-Second-Account_19-medium-3 {
			display:block;
		}

		#g-Buka-Bukaan-di-Second-Account_19-submedium-cover,
		#g-Buka-Bukaan-di-Second-Account_19-submedium-3 {
			display:none;
		}

		#g-Buka-Bukaan-di-Second-Account_19-smallplus-cover,
		#g-Buka-Bukaan-di-Second-Account_19-smallplus-3 {
			display:none;
		}
	}

	@media only screen and (min-width:920px) and (max-width:1399px) {
		#g-Buka-Bukaan-di-Second-Account_19-xlarge-cover,
		#g-Buka-Bukaan-di-Second-Account_19-xlarge-3 {
			display:none;
		}

		#g-Buka-Bukaan-di-Second-Account_19-large-cover,
		#g-Buka-Bukaan-di-Second-Account_19-large-3 {
			display:block;
		}

		#g-Buka-Bukaan-di-Second-Account_19-medium-cover,
		#g-Buka-Bukaan-di-Second-Account_19-medium-3 {
			display:none;
		}

		#g-Buka-Bukaan-di-Second-Account_19-submedium-cover,
		#g-Buka-Bukaan-di-Second-Account_19-submedium-3 {
			display:none;
		}

		#g-Buka-Bukaan-di-Second-Account_19-smallplus-cover,
		#g-Buka-Bukaan-di-Second-Account_19-smallplus-3 {
			display:none;
		}
	}

	@media only screen and (min-width:1400px) {
		#g-Buka-Bukaan-di-Second-Account_19-xlarge-cover,
		#g-Buka-Bukaan-di-Second-Account_19-xlarge-3 {
			display:block;
		}

		#g-Buka-Bukaan-di-Second-Account_19-large-cover,
		#g-Buka-Bukaan-di-Second-Account_19-large-3 {
			display:none;
		}

		#g-Buka-Bukaan-di-Second-Account_19-medium-cover,
		#g-Buka-Bukaan-di-Second-Account_19-medium-3 {
			display:none;
		}

		#g-Buka-Bukaan-di-Second-Account_19-submedium-cover,
		#g-Buka-Bukaan-di-Second-Account_19-submedium-3 {
			display:none;
		}

		#g-Buka-Bukaan-di-Second-Account_19-smallplus-cover,
		#g-Buka-Bukaan-di-Second-Account_19-smallplus-3 {
			display:none;
		}
	}

</style>