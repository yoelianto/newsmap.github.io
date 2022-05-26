<script>
	import Head from './Head.svelte';
	import Header from './Header.svelte';
	import Paragraph from './Paragraph.svelte';
	import Quote from './Quote.svelte';
	import Image from './Image.svelte';
	import Credit from './Credit.svelte';
	import Foot from './Foot.svelte';
	import Tabungan from './Tabungan.svelte';

	import { Parallax, ParallaxLayer } from 'svelte-parallax'

	//Main Font
	let fontfamily1 = "Roboto Mono"

	//Main Color
	let fontColor = 'hsl(207, 100%, 25%)'

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
	let mainBackground='white'	
	let headerBackground='white'
	let titleColor='hsl(207, 100%, 25%)'
	let subtitleColor='hsl(207, 100%, 25%)'
	let subheadColor='hsl(207, 100%, 25%)'

	let height

	let credit =[{
		role : 'Penulis',
		name : 'Ann Putri'
		}]
	let source = 'Sed nec pellentesque massa. Vestibulum eu sem ut dolor placerat ultricies at sit amet massa'

	let left;
	let percentScrolled;
	let sectionNum;

	const handleProgress = (progress) => {
		const { parallaxProgress, section, sectionProgress } = progress;
		sectionNum = section
		if (section === 1) {
		left = sectionProgress * 100
		}
		percentScrolled = Math.floor(parallaxProgress * 100);
	};

</script>

<svelte:head>
	<meta
		name='viewport' 
		content='width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0'
	/>
	
	<link rel="preconnect" href="https://fonts.googleapis.com">
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
	<link href="https://fonts.googleapis.com/css2?family=Azeret+Mono&display=swap" rel="stylesheet">
	<link href="https://fonts.googleapis.com/css2?family=Koulen&display=swap" rel="stylesheet">
</svelte:head>

<main style="background-color: {mainBackground};padding-top:3rem;">

	<Header 
		--headerBackground={headerBackground}
		--titleColor={titleColor}
		--subtitleColor={subtitleColor}
		--subheadColor={subheadColor}

		fullHeader={false}

		title='Menabung Atau Tidak Menabung'
		subtitle='Jangan Atur-atur Aing'

		author='Ann Putri'
		date='12 Mei 2022'
	/>

	<div class="divider"></div>

	<Paragraph
		--font-color ={fontColor}
		para={[
		'Sejak kecil kita sudah dididik untuk menabung. Namun, peribahasa “hemat pangkal kaya” tampaknya tak lagi relevan.',
		"Generasi milenial dan Z dari berbagai negara mengaku kesulitan menabung. Anak muda Korea Selatan bahkan <a class='link-article' target='_blank' href='https://foreignpolicy.com/2019/07/04/why-young-koreans-love-to-splurge-shibal-biyong-millennial-fuck-it-expense/'>lebih memilih foya-foya</a> ketimbang menabung."
		]}
	/>

	<Parallax sections={3} config={{stiffness: 1, damping: 1}} onProgress={handleProgress}>
		<!-- SECTION 1-->
		<ParallaxLayer offset={0.6} rate={0}
			style='display: flex;z-index:2'
			>
			<p class='paralaxtext'>Lebih dari setengah milenial belanja online setidaknya sekali dalam sebulan <em><a class='link-article' target='_blank' style='color:hsl(210, 100%, 60%)' href='https://www.ipsos.com/sites/default/files/ct/publication/documents/2018-11/18-056896-01_-_e-commerce_syndicated_-_final_report_-_v2.pdf'>(IPSOS 2018)</a></em></p>
		</ParallaxLayer>
		<ParallaxLayer offset={0.3} rate={1}
			style=
				'transform: translate({left}vw,{left * 1}vh);
				top:30vh;
				left:40vw;'>
			<img id='imgparalaxleft'
				class='imgparalax'
				src="./images/orang-menabung-kiri-01.png"
				alt=""
			>
		</ParallaxLayer>
		<ParallaxLayer offset={0.3} rate={-1}
			style=
				'transform: translate({left*0.15}vw,{left * 1}vh);
				top:30vh;
				left:6vw;'
			>
			<img id='imgparalaxright'
				class='imgparalax'
				src="./images/orang-menabung-kanan-01.png"
				alt=""
				>
		</ParallaxLayer>

		<!-- SECTION 1-->
		<ParallaxLayer offset={2.6} rate={0}
			style='display: flex;z-index:2'
			>
			
			<p class="paralaxtext">
				... dan hanya <strong>10,7%</strong> yang digunakan untuk menabung <em><a class='link-article' target='_blank' style='color:hsl(210, 100%, 60%)' href='https://cdn.idntimes.com/content-documents/indonesia-millennial-report-2019-by-idn-times.pdf'>(Indonesia Millenial Report 2019)</a></em>
			</p>
		</ParallaxLayer>
		<ParallaxLayer offset={2} rate={0}
			style='display: flex;z-index:2'
			>
			
			<p class='paralaxtext'>
				<strong>51,1%</strong> pendapatan habis untuk kebutuhan bulanan...
			</p>
		</ParallaxLayer>
		
		<ParallaxLayer offset={2.2} rate={0}>
			<img style='width:100%;' src="./images/duit-menabung-01.png"
				alt=""
			>
		</ParallaxLayer>
		
	</Parallax>

	<Paragraph
		--font-color ={fontColor}
		subjudul='Betulkah Generasi Muda Enggan Menabung?'
		para={[
		'Namun survei-survei di atas tidak menunjukkan seberapa penting milenial (dan juga gen Z) memandang tabungan.',
		'Beberapa artikel malah menyudutkan generasi muda sebagai generasi yang boros, enggan menabung, dan tak mungkin punya properti.'
		]}
	/>

	<Image
		img = {[{
			url:'./images/celengan-babi-01.png',
			title:'Asal-usul gosip'
		}]}
	/>

	<Paragraph
		--font-color ={fontColor}
		para={[
		"Saya mengadakan survei kecil <a class='link-article' target='_blank' href='https://twitter.com/kimjongann/status/1381848736553308166'>lewat polling Twitter</a>. Polling ini ditujukan untuk pengguna Twitter berusia 21-30 tahun dan tidak meliputi variabel gender, domisili, status pekerjaan, kelas ekonomi, dan pendapatan per bulan.",
		"Karena ada jeda beberapa menit di tiap cuitan, ada disproporsi responden. Tapi tak apa lah ya, toh ini hanya gambaran yang sangat kasar."
		]}
	/>

	<section class='poll'>
		<div class="poll-item">
			<p>kalian yang umurnya 21-30 tahun, punya tabungan gak? bisa dalam bentuk emergency fund, tabungan beli barang, tabungan sisaan duit gaji/bulanan, dll?</p>
			<div class="top vote-bar" style='width:75.7%'>penting banget<span class='span-percent'><strong> 75.7%</strong></span></div>
			<div class="vote-bar" style='width:24.3%'>penting  <span class='span-percent'><strong> 24.3%</strong></span></div>
			<p class='vote'>255 votes - Final results</p>
		</div>
		<div class="poll-item">
			<p>menurut kalian punya tabungan itu penting atau ga?</p>
			<div class="top vote-bar" style='width:77.7%'>penting banget  <span class='span-percent'><strong> 77.7%</strong></span></div>
			<div class="vote-bar" style='width:22.3%'>penting  <span class='span-percent'><strong> 22.3%</strong></span></div>
			<div class="vote-bar" style='width:2%'>nggak terlalu penting  <span class='span-percent'><strong> 0%</strong></span></div>
			<div class="vote-bar" style='width:2%'>nggak penting  <span class='span-percent'><strong> 0%</strong></span></div>
			<p class='vote'>175 votes - Final results</p>
		</div>
		<div class="poll-item">
			<p>apakah kalian rutin menabung?</p>
			<div class="top vote-bar" style='width:57.7%'>ya, setiap bulan  <span class='span-percent'><strong> 57.7%</strong></span></div>
			<div class="vote-bar" style='width:34.3%'>kadang kalo ada sisa  <span class='span-percent'><strong> 34.3%</strong></span></div>
			<div class="vote-bar" style='width:8%'>tidak  <span class='span-percent'><strong>8%</strong></span></div>
			<p class='vote'>175 votes - Final results</p>
		</div>
		<div class="poll-item">
			<p>buat yg milih kadang nabung/tidak nabung, kenapa kalian enggak nabung?</p>
			<div class="top vote-bar" style='width:50.6%'>gaji mepet  <span class='span-percent'><strong> 50.6%</strong></span></div>
			<div class="vote-bar" style='width:32.6%'>generasi sandwich  <span class='span-percent'><strong> 32.6%</strong></span></div>
			<div class="vote-bar" style='width:16.9%'>lainnya, tolong di-reply  <span class='span-percent'><strong> 16.9%</strong></span></div>
			<p class='vote'>89 votes - Final results</p>
		</div>
	</section>

	<Paragraph
		--font-color ={fontColor}
		subjudul='Mereka & Tabungan'
	/>
	
	<Tabungan
		data={[
			{
				nama:'Maria',
				umur:'28',
				menabung:'Iya dan tidak banyak',
				domisili:'Belanda',
				alasan:'Habis karena pindahan dan menganggur',
				profesi:'Software Developer',
				catatan:'Nanti nabung lagi setelah mendapat gaji pertama',
				celengan:true
			},
			{
				nama:'Reza',
				umur:'24',
				menabung:'Iya',
				domisili:'Jakarta',
				alasan:'Sisa dari keperluan bayar tagihan, untuk dana darurat',
				profesi:'Pegawai pemerintahan',
				catatan:'Uang berlebih untuk investasi di crypto',
				celengan:true
			},
			{
				nama:'Lia',
				umur:'23',
				menabung:'Tidak',
				domisili:'Surabaya',
				alasan:'Tanggungan besar',
				profesi:'UI/UX Designer',
				catatan:'Stress membuat hidup lebih konsumtif',
				celengan:false
			},
			{
				nama:'Bim',
				umur:'29',
				menabung:'Iya tapi begitu kecil dan sulit sekali',
				domisili:'Bandung',
				alasan:'Gaji kecil dan baru saja dipecat',
				profesi:'Menganggur',
				catatan:'Biaya hidup begitu tinggi',
				celengan:false
			},
			{
				nama:'Adira',
				umur:'27',
				menabung:'Iya tapi tidak tau',
				domisili:'Jakarta',
				alasan:'Istri mengidap ODGJ dan marah apabila ditanya soal keuangan',
				profesi:'Pegawai swasta',
				catatan:'Pernah sakit dan tidak ditanggung BPJS maupun asuransi kantor, terpaksa menggunakan kartu kredit',
				celengan:false
			}
		]}
	/>

	<Paragraph
		--font-color ={fontColor}
		subjudul='Lebih dari Sekadar Boros'
		para={[
		'Dari cerita-cerita di atas bisa dilihat bahwa generasi muda sebenarnya menganggap penting tabungan. Namun faktor-faktor seperti besaran biaya hidup sehari-hari relatif ke pendapatan, tanggungan penyakit fisik/mental, baik pribadi maupun orang lain, tanggungan keluarga (<em>sandwich generation</em>), gaji mepet, dan <em>self-reward</em> memainkan peran besar dalam menentukan kemampuan menabung mereka.',
		"Persoalan gaji mepet menjadi penyebab nomor satu anak muda sulit menabung. Dibandingkan dengan generasi sebelumnya, generasi saat ini mengalami kenaikan biaya hidup yang tinggi. Riset <a class='link-article' target='_blank' href='https://lifepal.co.id/media/ump-2021-apa-cukup-penuhi-pengeluaran-bulanan-saat-ini/'>Lifepal</a> menunjukkan ada sepuluh provinsi Indonesia yang pengeluaran rata-rata per-kapitanya melebihi UMP 2021. Kebetulan para informan tinggal di daerah yang disebutkan oleh riset ini, yaitu DKI Jakarta, Jawa Timur, dan Jawa Barat.",
		'Besarnya pengeluaran relatif dengan UMP yang cenderung kecil menyebabkan kesempatan untuk menabung semakin tipis. Tak hanya itu, faktor generasi sandwich dan kesehatan juga berperan besar.'
		]}
	/>

	<div class="data">
		<h1>26%</h1>
		<p><em>Sandwich generation</em> berusia 26-29 tahun</p>
	</div>

	<Image
		img = {[{
			url:'./images/sandwich-generation-01.png',
			title:'Sandwich Generation'
		}]}
	/>

	<div class="data">
		<h1>54%</h1>
		<p>Bekerja sebagai pegawai kantoran</p>
	</div>

	<Paragraph
		--font-color ={fontColor}
		para={[
		'Sayangnya, survei ini tidak menunjukkan seberapa banyak orang yang menjadi generasi sandwich. Padahal pandemi membuat kondisi ekonomi banyak orang lebih rentan sehingga memaksa mereka yang punya lebih banyak penghasilan untuk membantu yang tidak punya. Ditambah lagi, banyak yang tidak bisa mengatakan “tidak” untuk kebutuhan orang tua karena kultur bakti anak yang sangat kuat.',
		"Kebutuhan kesehatan juga menjadi faktor penting. Survei yang sama menunjukkan generasi kebutuhan kesehatan selama pandemi semakin tinggi. Memang ada BPJS dan asuransi swasta, tapi perlindungannya terbatas. Ada beberapa penyakit, termasuk penyakit kejiwaan, yang perawatannya tidak dikover oleh BPJS. Atau mereka kurang puas dengan pelayanan BPJS sehingga memilih untuk membayar sendiri atau menggunakan asuransi swasta yang lebih mahal.",
		'Terakhir adalah <em>self-reward</em>. Banyak media yang mengkritik generasi milenial sebagai generasi yang boros. Mereka lebih suka bersenang-senang dan membeli pengalaman seperti liburan atau mencoba hal baru dibanding berinvestasi.',
		"Namun tuduhan-tuduhan ini tidak beralasan. <em>Self-reward</em> adalah mekanisme beradaptasi mereka ketika menghadapi stres tinggi. Meskipun stres berat, banyak yang <a class='link-article' target='_blank' href='https://www2.deloitte.com/content/dam/Deloitte/global/Documents/About-Deloitte/gx-deloitte-2021-mental-health-millennials-white-paper.pdf'>memilih untuk terus bekerja</a> dan menyembunyikan kondisi mental mereka dari kantor. <em>Self-reward</em> dengan makan enak, belanja barang mahal, dan liburan menjadi sarana pemulihan batin. Selain menyenangkan, kegiatan ini juga tidak menimbulkan stigma seperti pergi ke psikolog atau psikiater.",
		"Kultur <em>self-reward</em> tak hanya muncul di anak muda Indonesia. Korea Selatan lebih dulu menamai praktek ini dengan sebutan <a class='link-article' target='_blank' href='https://foreignpolicy.com/2019/07/04/why-young-koreans-love-to-splurge-shibal-biyong-millennial-fuck-it-expense/'><em>shibal-biyong</em></a> alias “biaya <em>bodo amat</em>”. Tanggal tua tapi kamu pengen makan sushi karena stres kerja? <em>Shibal-biyong</em>. Ingin ngopi cantik di cafe? <em>Shibal-biyong</em>. Sekilas boros dan melawan logika, tapi <em>shibal-biyong</em> justru memaksimalkan fungsi uang untuk kebutuhan jangka pendek. Buat apa repot-repot menabung beli rumah kalau menabung 10 tahun saja tidak cukup untuk DP rumah?",
		"Dari sini jelas bahwa stereotip anak muda tidak mau menabung adalah salah. Mereka paham akan pentingnya tabungan, tapi faktor-faktor luar membuat mereka kesulitan untuk melakukannya. Faktor seperti generasi <em>sandwich</em>, gaji mepet, dan mahalnya biaya hidup serta tempat tinggal bukanlah masalah individual yang bisa diselesaikan hanya dengan kerja lebih keras. Perlu solusi sistematis berupa kebijakan yang lebih ramah pekerja muda dan program bantuan untuk mengurangi beban generasi <em>sandwich</em>."
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
		color: hsl(210, 100%, 39%);
		text-decoration: underline;
	}

	.link-article:hover {
		text-decoration: underline;
	}

	.link-article:visited {
		color: rgb(0,80,160);
	}
	.data {
		color:hsl(207, 100%, 25%);
		text-align:center;
		width:50%;
		max-width:300px;
		margin:0 auto;
		white-space: normal;
	}
	.data>h1 {
		margin-bottom: 0.25rem;
		margin-top: 0.25rem;
		font-size: 4rem;
		font-family: 'Azeret Mono', monospace;
	}
	.data>p {
		margin-top: 0.25rem;
		font-family: 'Roboto', sans-serif;
	}
	.span-percent {
		margin-left:1rem
	}
	.vote-bar {
		background-color: hsl(210, 6%, 21%);
		height:2rem;
		width:100px;
		margin-bottom:0.5rem;
		border-radius:0.1rem;
		color:white;
		display: flex;
		justify-content: flex-start;
		align-items: center;
		padding-left:0.5rem;
		font-size: 0.8rem;
		white-space: nowrap;
	}
	.top {
		background-color: hsl(204, 72%, 31%);
	}
	.poll {
        font-family: 'Roboto';
        width:90%;
        max-width: 650px;
        margin: 4rem auto 4rem auto;
        text-align: left;
		white-space: normal;
    }
	.poll-item {
		background-color: black;
		color: white;
		padding:1rem;
		margin-top:0.5rem;
		margin-bottom:0.5rem;
		border-radius:0.5rem;
	}
	.vote {
		font-size:0.7rem;
		color: hsl(0,0%,50%)
	}
	.imgparalax {
		width:50%;
		position: absolute;
	}
	.paralaxtext {
		padding:1rem;
		background-color: hsl(207, 100%, 25%);
		width:80%;
        max-width: 650px;
        margin: 0 auto 0 auto;
		height: fit-content;
        text-align: left;
		border-radius: 1rem;
		font-family: 'Roboto-Mono', monospace;
		white-space: normal;
		color:white;
	}
	.divider {
		height:0.2rem;
		width:60%;
		background-color:hsl(207, 100%, 40%) ;
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
	main {
		background-repeat: no-repeat;
  		background-attachment: fixed;
		background-size: cover;
	}
	@media only screen and (max-width:509px) {
		main {
			background-image: url('./images/_Dilema Anak Muda- Menabung Atau Tidak Menabung__smallplus 1.png');
		}
	}

	@media only screen and (min-width:510px) and (max-width:689px) {
		main {
			background-image: url('./images/_Dilema Anak Muda- Menabung Atau Tidak Menabung__submedium 1.png');
		}
	}

	@media only screen and (min-width:690px) and (max-width:919px) {
		main {
			background-image: url('./images/_Dilema Anak Muda- Menabung Atau Tidak Menabung__medium 1.png');
		}
	}

	@media only screen and (min-width:920px) and (max-width:1399px) {
		main {
			background-image: url('./images/_Dilema Anak Muda- Menabung Atau Tidak Menabung__large 1.png');
		}
	}

	@media only screen and (min-width:1400px) {
		main {
			background-image: url('./images/_Dilema Anak Muda- Menabung Atau Tidak Menabung__xlarge 1.png');
		}
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