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
	<Head 
		bind:height = {height}
	/>
	<div class="headerilustrasi" style="margin-top:{height}px;">
		<div id="g-Bisa-Ular-box" class="ai2html">
			
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

	<Image />

	<Paragraph
		--font-color ='#f9f9e1'
		subjudul = '<em>Performative Self</em> vs <em>Authentic Self</em> di Media Sosial'
		para={[
			"Dalam percakapan kami, Rugun mengatakan artikel jurnal ini adalah skripsinya yang di-<em>recycle</em>. Penelitian Rugun melibatkan lima responden perempuan berusia 20-23 tahun. Awalnya responden tidak meliputi perempuan saja. Namun, setelah melihat kondisi lapangan, ia mengerucutkan semua responden ke perempuan. Menurutnya, perempuan punya lapisan pengalaman unik akibat ekspresi mereka di ruang publik lebih dikekang dibandingkan laki-laki. Ditambah ia juga merasa kesulitan karena kurang punya akses ke <em>second account</em> laki-laki."
		]}
	/>

	<Image />

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

	<Image />

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
				follower:69
			},
			{
				nama:'Natasha',
				follower:55
			},
			{
				nama:'Brenda',
				follower:31
			},
			{
				nama:'Fransiska',
				follower:24
			},
			{
				nama:'Tabitha',
				follower:21
			}
		]}
	/>

	<Paragraph
		--font-color ='#f9f9e1'
		para={[
			"Hanya orang-orang terpercaya dan sudah dikenal lama oleh pemilik yang dibolehkan mengikuti <em>second account</em>. Fitur “kunci akun” Instagram membuat pemilik bisa mengkurasi siapa yang boleh mengikuti dan melihat isi akun. Berdasarkan pengakuan responden, para pengikut umumnya adalah teman dekat sejak SMP-SMA hingga dari masa kuliah. Dalam beberapa kasus, sebagian memperbolehkan pasangan dan anggota keluarga untuk mengikuti akun mereka."
		]}
	/>

	<Image />

	<Paragraph
		--font-color ='#f9f9e1'
		para={[
			"Kepercayaan menjadi token terpenting karena <em>second account</em> merupakan ruang aman para penggunanya. Mengklik tombol “<em>follow</em>” berarti meneken kontrak kepercayaan bahwa apa yang terjadi di <em>second account</em> tetap ada di <em>second account</em>.",
			"Sayangnya ada beberapa pihak tak bertanggung jawab yang membeberkan isi akun mereka ke publik. Tak ada yang bisa dilakukan selain menegur pelaku dan menendangnya dari akun pribadi.",
			"Di bagian akhir tulisan, Rugun mempertanyakan “rasa aman” yang didapatkan dari <em>second account</em>. Untuk menjawabnya ia beralih ke McRobbie (2015) yang menyatakan orang-orang melarikan diri dari tatapan publik tanpa henti di akun pertama. Sayang ia tidak mengelaborasikan lebih lanjut tentang rasa waswas yang dirasakan responden soal pembeberan isi <em>second account</em> ke orang luar. Padahal, hal ini cukup krusial mengingat orang-orang menggunakan <em>second account</em> karena isu privasi."
		]}
	/>

	<Image />

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