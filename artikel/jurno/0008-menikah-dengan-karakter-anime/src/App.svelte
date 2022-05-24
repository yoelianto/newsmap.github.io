<script>
	import Header from './Header.svelte';
	import Paragraph from './Paragraph.svelte';
	import List from './List.svelte'
	import Quote from './Quote.svelte';
	import Image from './Image.svelte';
	import Credit from './Credit.svelte';

	//Main Font
	let fontfamily1 = "Roboto Mono"

	//Main Color
	let fontColor = 'hsl(200,43%,34%)'

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
	let titleColor='hsl(200,43%,34%)'
	let subtitleColor='hsl(200,43%,50%)'
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
	<link href="https://fonts.googleapis.com/css2?family=Carter+One&display=swap" rel="stylesheet">
</svelte:head>

<main style="background-color: {mainBackground}">
	<div class="headerilustrasi" style="margin-top:{height}px;">

	</div>
	

	<Header 
		--headerBackground={headerBackground}
		--titleColor={titleColor}
		--subtitleColor={subtitleColor}
		--subheadColor={subheadColor}

		fullHeader={false}

		title='Menikah dengan Karakter Anime:'
		subtitle='Ketika Ide Lebih Menarik Daripada Karakter Nyata'	

		author='Ann Putri'
		date='16 Mei 2022'		
	/>

	<div class="divider"></div>

	<Image 
		img = {[{
			url:'./images/capture_tilik.jpg',
			title:'Potongan adegan dari film Tilik (2018)'
		}]}
		imageTitle = 'Potongan adegan dari film Tilik (2018)'
		imageSource = 'Ravacana Films'
		/>

	<Paragraph
		--font-color ={fontColor}
		para={[
		"Potongan di atas adalah cuplikan dialog <a href='https://www.youtube.com/watch?v=GAyvgz8_zV8'>Tilik (2018)</a> besutan Wahyu Agung Prasetyo. Film yang viral pada 2020 ini tak hanya berhasil menggambarkan kehidupan kampung di Yogyakarta, tapi juga membuka banyak diskusi. Salah satunya tentang <a href='https://medium.com/binokular/menilik-tilik-dan-julidan-netizen-a623a0afa430'>stereotip perempuan dan bergosip</a>.",
		'Di <em>Tilik</em>, gosip digambarkan sebagai suatu hal yang negatif. Benarkah?'
		]}
	/>


	<Paragraph
		--font-color ={fontColor}
		subjudul = 'Menilik Asal-usul Gosip'
		para={[
		"Gosip sebetulnya memiliki sejarah panjang. Robin Dunbar, antropolog sekaligus psikolog evolusioner berteori bahwa gosip yang kita lakukan sekarang merupakan versi manusia dari perawatan diri para primata. Para primata saling menggaruk punggung satu sama lain sebagai cara untuk memperkuat hubungan sosial.",
		'Primata kemudian berkembang menjadi <em>hominid</em>, lalu berkembang lagi menjadi <em>homo</em> atau manusia purba. Berbeda dengan sepupu hominid lainnya, manusia purba jauh lebih cerdas dan sosial. Kehidupan berkelompok mereka jauh lebih besar sehingga dicarilah cara lain yang lebih efisien untuk bersosialisasi. Gosip pun akhirnya menjadi pelumas dan perekat hubungan sosial paling tokcer.'
		]}
	/>

	<Image
		img = {[{
			url:'./images/asal-usul-gosip-01.png',
			title:'Asal-usul gosip'
		}]}
	/>

	<Paragraph
		--font-color ={fontColor}
		para={[
		"Seiring waktu, manusia membentuk kelompok yang jauh lebih besar dengan tatanan sosial yang lebih rumit pula. Gosip yang awalnya bisa mendekatkan hubungan, malah menghancurkannya. Jadilah agama melarang gosip. Kitab Talmud adalah yang pertama <a href='https://www.reviewofreligions.org/32748/world-faiths-slander-gossip-foul-speech/'>melarang membicarakan hal-hal buruk</a> soal orang lain. Ajaran ini juga disebutkan di Alkitab dan Al Qur’an.",
		"Lalu kenapa gosip erat kaitannya dengan perempuan? Kemungkinan karena para <a href='https://wordhistories.net/2017/02/04/gossip/'>ibu-ibu abad ke-17</a> yang sedang menunggu kelahiran anaknya sering membicarakan suami, keluarga, dan tetangga mereka—ya pokoknya orang-orang yang tak ada di ruangan itu—bersama para suster dan bidan. Maklum, menunggu anak lahir butuh waktu berjam-jam sampai berhari-hari, jadi apa lagi yang bisa mereka lakukan selain <em>ghibah</em>?",
		"Kebiasaan mereka ini akhirnya disebut sebagai “gosip”. Saking seringnya kata ini digunakan, kata “gosip” sampai digunakan di Alkitab versi Raja James, menggantikan istilah “pembisik” (<em>whisperer</em>) dan “pembawa cerita” (<em>talebearer</em>) yang umumnya memiliki konotasi negatif.",
		"Pandangan negatif soal gosip terus eksis hingga sekarang. Pandangan negatif soal gosip paling terlihat di lingkungan kantor. Ini karena gosip, menurut orang-orang <em>Human Resources</em>, adalah <a href='https://www.syntrio.com/blog/the-negative-impact-of-gossip-in-the-workplace/'>penyebab utama</a> kondisi kantor yang tidak kondusif. Gosip dianggap memantik konflik, mengikis kepercayaan antar pegawai, menurunkan moral, serta menghambat kerja tim. Lebih pentingnya lagi, gosip kantor juga <a href='https://hbr.org/2018/10/stop-complaining-about-your-colleagues-behind-their-backs?utm_medium=social&utm_campaign=hbr&utm_source=twitter&tpcc=orgsocial_edit'>merusak usaha untuk membuat sistem komunikasi yang sehat</a>, profesional, dan terbuka di tempat kerja. Tak mengherankan kalau <a href='https://www.shrm.org/resourcesandtools/hr-topics/employee-relations/pages/office-gossip-policies.aspx'>ada yang menyebut</a> gosip sebagai bentuk kekerasan di tempat kerja.",
		"Tapi, seperti layaknya gosip, kita juga perlu mempertanyakan klaim itu. Apa betul semua jenis gosip di kantor 100% berbahaya?"
		]}
	/>

	<Paragraph
		--font-color ={fontColor}
		subjudul = 'Mematahkan Mitos dan Prasangka Tentang Gosip'
		para={[
		"Penelitian-penelitian empiris sebelumnya tentang gosip justru mematahkan mitos seputar gosip. Penelitian terbaru yang dilakukan oleh <a href='https://journals.sagepub.com/doi/abs/10.1177/1948550619837000?journalCode=sppa'>Robbins dan Karan (2020)</a> dengan responden mahasiswa S1 berbagai universitas Amerika Serikat menunjukkan sekaligus mengkonfirmasi ulang bahwa ⅔ gosip bernada netral atau bahkan positif."
		]}
	/>

	<Image
		img = {[{
			url:'./images/mitos-dan-prasangka-gosip-01.png',
			title:'Mitos dan Prasangka Gosip'
		}]}
	/>

	<Paragraph
		--font-color ={fontColor}
		para={[
		"Penelitian ini  juga mematahkan pandangan bahwa hanya perempuan yang bergosip, laki-laki juga begitu"
		]}
	/>
	<List
		--font-color ={fontColor}
		list={[
		"Perempuan cenderung lebih sering bergosip tapi bernada netral",
		"Laki-laki lebih sedikit bergosip tapi nadanya lebih negatif daripada perempuan",
		"Orang-orang ekstrovert cenderung lebih suka bergosip dibanding yang introvert",
		"Orang-orang belajar norma sosial lewat bergosip.",
		"Anak-anak muda lebih sering bergosip buruk dibanding orang-orang tua",
		]}
	/>

	<Paragraph
		--font-color ={fontColor}
		para={[
		"Karena mayoritas bersifat netral, gosip menjadi sarana yang tepat untuk mengumpulkan informasi di ruang kerja. Tak hanya itu, gosip juga membuat kita bisa mengetahui apa saja yang terjadi ketika waktu dan perhatian kita disedot oleh pekerjaan. Bayangkan, Anda sedang istirahat makan siang di <em>pantry</em> sambil membicarakan kebiasaan si anu yang sering telat kirim pekerjaan di Slack. Perilaku seperti ini bukan hanya menyindir si anu, tapi juga sebagai bentuk kontrol sosial supaya orang-orang di situ tidak melakukan hal yang sama."
		
		]}
	/>

	<Paragraph
		--font-color ={fontColor}
		para={[
		"Akhir kata, gosip tidak selalu buruk—selama tidak menjelek-jelekkan seseorang atau sampai menyakiti hati. Gosip juga bisa menjadi penanda bahwa ada sesuatu yang salah di suatu lingkungan. Orang-orang yang menjadi korban perundungan atau pelecehan cenderung menceritakan kejadiannya ke orang lain dengan janji anonimitas. Sayang keuntungan ini juga bisa disalahgunakan oleh orang-orang untuk merundung atau menyudutkan seseorang.",
		"Jadi bijaklah ketika bergosip, ya."
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
		background-color:hsl(217, 65%, 67%) ;
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
		color: hsl(200,43%,34%);
		padding: 1em;
		margin: 0 0 2em 0;
		border-radius: 1rem;
	}

	[slot="foreground"] p {
		padding:1rem;
		background-color: hsl(0, 76%, 97%);
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
	#g-_Bergosip-di-Kantor--Positif-Atau-Negatif_-Final-box ,
	#g-_Bergosip-di-Kantor--Positif-Atau-Negatif_-Final-box .g-artboard {
		margin:0 auto;
	}
	#g-_Bergosip-di-Kantor--Positif-Atau-Negatif_-Final-box p {
		margin:0;
	}
	#g-_Bergosip-di-Kantor--Positif-Atau-Negatif_-Final-box .g-aiAbs {
		position:absolute;
	}
	#g-_Bergosip-di-Kantor--Positif-Atau-Negatif_-Final-box .g-aiImg {
		position:absolute;
		top:0;
		display:block;
		width:100% !important;
	}
	#g-_Bergosip-di-Kantor--Positif-Atau-Negatif_-Final-box .g-aiSymbol {
		position: absolute;
		box-sizing: border-box;
	}
	#g-_Bergosip-di-Kantor--Positif-Atau-Negatif_-Final-box .g-aiPointText p { white-space: nowrap; }
	#g-_Bergosip-di-Kantor--Positif-Atau-Negatif_-Final-cover_smallplus {
		position:relative;
		overflow:hidden;
	}
	#g-_Bergosip-di-Kantor--Positif-Atau-Negatif_-Final-cover_smallplus p {
		font-family: 'Nanum Pen Script', cursive;
		font-weight:500;
		line-height:12px;
		height:auto;
		opacity:1;
		letter-spacing:0em;
		font-size:16px;
		text-align:left;
		color:rgb(50,75,89);
		text-transform:none;
		padding-bottom:0;
		padding-top:0;
		mix-blend-mode:normal;
		font-style:normal;
		position:static;
	}
	#g-_Bergosip-di-Kantor--Positif-Atau-Negatif_-Final-cover_smallplus .g-pstyle0 {
		height:12px;
		text-align:center;
	}
	#g-_Bergosip-di-Kantor--Positif-Atau-Negatif_-Final-cover_submedium {
		position:relative;
		overflow:hidden;
	}
	#g-_Bergosip-di-Kantor--Positif-Atau-Negatif_-Final-cover_submedium p {
		font-family: 'Nanum Pen Script', cursive;
		font-weight:500;
		line-height:12px;
		height:auto;
		opacity:1;
		letter-spacing:0em;
		font-size:16px;
		text-align:left;
		color:rgb(50,75,89);
		text-transform:none;
		padding-bottom:0;
		padding-top:0;
		mix-blend-mode:normal;
		font-style:normal;
		position:static;
	}
	#g-_Bergosip-di-Kantor--Positif-Atau-Negatif_-Final-cover_submedium .g-pstyle0 {
		height:12px;
		text-align:center;
	}
	#g-_Bergosip-di-Kantor--Positif-Atau-Negatif_-Final-cover_medium {
		position:relative;
		overflow:hidden;
	}
	#g-_Bergosip-di-Kantor--Positif-Atau-Negatif_-Final-cover_medium p {
		font-family: 'Nanum Pen Script', cursive;
		font-weight:500;
		line-height:12px;
		height:auto;
		opacity:1;
		letter-spacing:0em;
		font-size:16px;
		text-align:left;
		color:rgb(50,75,89);
		text-transform:none;
		padding-bottom:0;
		padding-top:0;
		mix-blend-mode:normal;
		font-style:normal;
		position:static;
	}
	#g-_Bergosip-di-Kantor--Positif-Atau-Negatif_-Final-cover_medium .g-pstyle0 {
		height:12px;
		text-align:center;
	}
	#g-_Bergosip-di-Kantor--Positif-Atau-Negatif_-Final-cover_large {
		position:relative;
		overflow:hidden;
	}
	#g-_Bergosip-di-Kantor--Positif-Atau-Negatif_-Final-cover_large p {
		font-family: 'Nanum Pen Script', cursive;
		font-weight:500;
		line-height:12px;
		height:auto;
		opacity:1;
		letter-spacing:0em;
		font-size:16px;
		text-align:left;
		color:rgb(50,75,89);
		text-transform:none;
		padding-bottom:0;
		padding-top:0;
		mix-blend-mode:normal;
		font-style:normal;
		position:static;
	}
	#g-_Bergosip-di-Kantor--Positif-Atau-Negatif_-Final-cover_large .g-pstyle0 {
		height:12px;
		text-align:center;
	}
	#g-_Bergosip-di-Kantor--Positif-Atau-Negatif_-Final-cover_xlarge_5 {
		position:relative;
		overflow:hidden;
	}
	#g-_Bergosip-di-Kantor--Positif-Atau-Negatif_-Final-cover_xlarge_5 p {
		font-family: 'Nanum Pen Script', cursive;
		font-weight:500;
		line-height:12px;
		height:auto;
		opacity:1;
		letter-spacing:0em;
		font-size:16px;
		text-align:left;
		color:rgb(50,75,89);
		text-transform:none;
		padding-bottom:0;
		padding-top:0;
		mix-blend-mode:normal;
		font-style:normal;
		position:static;
	}
	#g-_Bergosip-di-Kantor--Positif-Atau-Negatif_-Final-cover_xlarge_5 .g-pstyle0 {
		height:12px;
		text-align:center;
	}
	#g-_Bergosip-di-Kantor--Positif-Atau-Negatif_-Final-smallplus_1 {
		position:relative;
		overflow:hidden;
	}
	#g-_Bergosip-di-Kantor--Positif-Atau-Negatif_-Final-submedium_1 {
		position:relative;
		overflow:hidden;
	}
	#g-_Bergosip-di-Kantor--Positif-Atau-Negatif_-Final-medium_1 {
		position:relative;
		overflow:hidden;
	}
	#g-_Bergosip-di-Kantor--Positif-Atau-Negatif_-Final-large_1 {
		position:relative;
		overflow:hidden;
	}
	#g-_Bergosip-di-Kantor--Positif-Atau-Negatif_-Final-xlarge_1 {
		position:relative;
		overflow:hidden;
	}
	#g-_Bergosip-di-Kantor--Positif-Atau-Negatif_-Final-smallplus_2 {
		position:relative;
		overflow:hidden;
	}
	#g-_Bergosip-di-Kantor--Positif-Atau-Negatif_-Final-smallplus_2 p {
		font-family: 'Nanum Pen Script', cursive;
		font-weight:500;
		line-height:17px;
		height:auto;
		opacity:1;
		letter-spacing:0em;
		font-size:23px;
		text-align:left;
		color:rgb(50,75,89);
		text-transform:none;
		padding-bottom:0;
		padding-top:0;
		mix-blend-mode:normal;
		font-style:normal;
		position:static;
	}
	#g-_Bergosip-di-Kantor--Positif-Atau-Negatif_-Final-smallplus_2 .g-pstyle0 {
		height:17px;
		text-align:center;
	}
	#g-_Bergosip-di-Kantor--Positif-Atau-Negatif_-Final-submedium_2 {
		position:relative;
		overflow:hidden;
	}
	#g-_Bergosip-di-Kantor--Positif-Atau-Negatif_-Final-submedium_2 p {
		font-family: 'Nanum Pen Script', cursive;
		font-weight:500;
		line-height:18px;
		height:auto;
		opacity:1;
		letter-spacing:0em;
		font-size:25px;
		text-align:left;
		color:rgb(50,75,89);
		text-transform:none;
		padding-bottom:0;
		padding-top:0;
		mix-blend-mode:normal;
		font-style:normal;
		position:static;
	}
	#g-_Bergosip-di-Kantor--Positif-Atau-Negatif_-Final-submedium_2 .g-pstyle0 {
		line-height:20px;
		height:20px;
		font-size:27px;
		text-align:center;
	}
	#g-_Bergosip-di-Kantor--Positif-Atau-Negatif_-Final-submedium_2 .g-pstyle1 {
		height:18px;
		text-align:center;
	}
	#g-_Bergosip-di-Kantor--Positif-Atau-Negatif_-Final-medium_2 {
		position:relative;
		overflow:hidden;
	}
	#g-_Bergosip-di-Kantor--Positif-Atau-Negatif_-Final-medium_2 p {
		font-family: 'Nanum Pen Script', cursive;
		font-weight:500;
		line-height:24px;
		height:auto;
		opacity:1;
		letter-spacing:0em;
		font-size:32px;
		text-align:left;
		color:rgb(50,75,89);
		text-transform:none;
		padding-bottom:0;
		padding-top:0;
		mix-blend-mode:normal;
		font-style:normal;
		position:static;
	}
	#g-_Bergosip-di-Kantor--Positif-Atau-Negatif_-Final-medium_2 .g-pstyle0 {
		line-height:25px;
		height:25px;
		font-size:34px;
		text-align:center;
	}
	#g-_Bergosip-di-Kantor--Positif-Atau-Negatif_-Final-medium_2 .g-pstyle1 {
		height:24px;
		text-align:center;
	}
	#g-_Bergosip-di-Kantor--Positif-Atau-Negatif_-Final-large_2 {
		position:relative;
		overflow:hidden;
	}
	#g-_Bergosip-di-Kantor--Positif-Atau-Negatif_-Final-large_2 p {
		font-family: 'Nanum Pen Script', cursive;
		font-weight:500;
		line-height:24px;
		height:auto;
		opacity:1;
		letter-spacing:0em;
		font-size:32px;
		text-align:left;
		color:rgb(50,75,89);
		text-transform:none;
		padding-bottom:0;
		padding-top:0;
		mix-blend-mode:normal;
		font-style:normal;
		position:static;
	}
	#g-_Bergosip-di-Kantor--Positif-Atau-Negatif_-Final-large_2 .g-pstyle0 {
		line-height:25px;
		height:25px;
		font-size:34px;
		text-align:center;
	}
	#g-_Bergosip-di-Kantor--Positif-Atau-Negatif_-Final-large_2 .g-pstyle1 {
		height:24px;
		text-align:center;
	}
	#g-_Bergosip-di-Kantor--Positif-Atau-Negatif_-Final-xlarge_2 {
		position:relative;
		overflow:hidden;
	}
	#g-_Bergosip-di-Kantor--Positif-Atau-Negatif_-Final-xlarge_2 p {
		font-weight:500;
		line-height:31px;
		height:auto;
		opacity:1;
		letter-spacing:0em;
		font-size:42px;
		text-align:left;
		color:rgb(50,75,89);
		text-transform:none;
		padding-bottom:0;
		padding-top:0;
		mix-blend-mode:normal;
		font-style:normal;
		position:static;
	}
	#g-_Bergosip-di-Kantor--Positif-Atau-Negatif_-Final-xlarge_2 .g-pstyle0 {
		line-height:32px;
		height:32px;
		font-size:44px;
		text-align:center;
	}
	#g-_Bergosip-di-Kantor--Positif-Atau-Negatif_-Final-xlarge_2 .g-pstyle1 {
		height:31px;
		text-align:center;
	}
	#g-_Bergosip-di-Kantor--Positif-Atau-Negatif_-Final-smallplus_3 {
		position:relative;
		overflow:hidden;
	}
	#g-_Bergosip-di-Kantor--Positif-Atau-Negatif_-Final-smallplus_3 p {
		font-family: 'Nanum Pen Script', cursive;
		font-weight:500;
		line-height:17px;
		height:auto;
		opacity:1;
		letter-spacing:0em;
		font-size:13px;
		text-align:left;
		color:rgb(50,75,89);
		text-transform:none;
		padding-bottom:0;
		padding-top:0;
		mix-blend-mode:normal;
		font-style:normal;
		position:static;
	}
	#g-_Bergosip-di-Kantor--Positif-Atau-Negatif_-Final-smallplus_3 .g-pstyle0 {
		height:17px;
		text-align:center;
	}
	#g-_Bergosip-di-Kantor--Positif-Atau-Negatif_-Final-submedium_3 {
		position:relative;
		overflow:hidden;
	}
	#g-_Bergosip-di-Kantor--Positif-Atau-Negatif_-Final-submedium_3 p {
		font-family: 'Nanum Pen Script', cursive;
		font-weight:500;
		line-height:26px;
		height:auto;
		opacity:1;
		letter-spacing:0em;
		font-size:20px;
		text-align:left;
		color:rgb(50,75,89);
		text-transform:none;
		padding-bottom:0;
		padding-top:0;
		mix-blend-mode:normal;
		font-style:normal;
		position:static;
	}
	#g-_Bergosip-di-Kantor--Positif-Atau-Negatif_-Final-submedium_3 .g-pstyle0 {
		height:26px;
		text-align:center;
	}
	#g-_Bergosip-di-Kantor--Positif-Atau-Negatif_-Final-medium_3 {
		position:relative;
		overflow:hidden;
	}
	#g-_Bergosip-di-Kantor--Positif-Atau-Negatif_-Final-medium_3 p {
		font-family: 'Nanum Pen Script', cursive;
		font-weight:500;
		line-height:34px;
		height:auto;
		opacity:1;
		letter-spacing:0em;
		font-size:26px;
		text-align:left;
		color:rgb(50,75,89);
		text-transform:none;
		padding-bottom:0;
		padding-top:0;
		mix-blend-mode:normal;
		font-style:normal;
		position:static;
	}
	#g-_Bergosip-di-Kantor--Positif-Atau-Negatif_-Final-medium_3 .g-pstyle0 {
		height:34px;
		text-align:center;
	}
	#g-_Bergosip-di-Kantor--Positif-Atau-Negatif_-Final-large_3 {
		position:relative;
		overflow:hidden;
	}
	#g-_Bergosip-di-Kantor--Positif-Atau-Negatif_-Final-large_3 p {
		font-family: 'Nanum Pen Script', cursive;
		font-weight:500;
		line-height:40px;
		height:auto;
		opacity:1;
		letter-spacing:0em;
		font-size:31px;
		text-align:left;
		color:rgb(50,75,89);
		text-transform:none;
		padding-bottom:0;
		padding-top:0;
		mix-blend-mode:normal;
		font-style:normal;
		position:static;
	}
	#g-_Bergosip-di-Kantor--Positif-Atau-Negatif_-Final-large_3 .g-pstyle0 {
		height:40px;
		text-align:center;
	}
	#g-_Bergosip-di-Kantor--Positif-Atau-Negatif_-Final-xlarge_3 {
		position:relative;
		overflow:hidden;
	}
	#g-_Bergosip-di-Kantor--Positif-Atau-Negatif_-Final-xlarge_3 p {
		font-family: 'Nanum Pen Script', cursive;
		font-weight:500;
		line-height:36px;
		height:auto;
		opacity:1;
		letter-spacing:0em;
		font-size:27px;
		text-align:left;
		color:rgb(50,75,89);
		text-transform:none;
		padding-bottom:0;
		padding-top:0;
		mix-blend-mode:normal;
		font-style:normal;
		position:static;
	}
	#g-_Bergosip-di-Kantor--Positif-Atau-Negatif_-Final-xlarge_3 .g-pstyle0 {
		height:36px;
		text-align:center;
	}
	#g-_Bergosip-di-Kantor--Positif-Atau-Negatif_-Final-smallplus_4 {
		position:relative;
		overflow:hidden;
	}
	#g-_Bergosip-di-Kantor--Positif-Atau-Negatif_-Final-submedium_4 {
		position:relative;
		overflow:hidden;
	}
	#g-_Bergosip-di-Kantor--Positif-Atau-Negatif_-Final-medium_4 {
		position:relative;
		overflow:hidden;
	}
	#g-_Bergosip-di-Kantor--Positif-Atau-Negatif_-Final-large_4 {
		position:relative;
		overflow:hidden;
	}
	#g-_Bergosip-di-Kantor--Positif-Atau-Negatif_-Final-xlarge_4 {
		position:relative;
		overflow:hidden;
	}
	#g-_Bergosip-di-Kantor--Positif-Atau-Negatif_-Final-smallplus_5 {
		position:relative;
		overflow:hidden;
	}
	#g-_Bergosip-di-Kantor--Positif-Atau-Negatif_-Final-smallplus_5 p {
		font-family: 'Nanum Pen Script', cursive;
		font-weight:500;
		line-height:15px;
		height:auto;
		opacity:1;
		letter-spacing:0em;
		font-size:20px;
		text-align:left;
		color:rgb(50,75,89);
		text-transform:none;
		padding-bottom:0;
		padding-top:0;
		mix-blend-mode:normal;
		font-style:normal;
		position:static;
	}
	#g-_Bergosip-di-Kantor--Positif-Atau-Negatif_-Final-smallplus_5 .g-pstyle0 {
		height:15px;
		text-align:center;
	}
	#g-_Bergosip-di-Kantor--Positif-Atau-Negatif_-Final-submedium_5 {
		position:relative;
		overflow:hidden;
	}
	#g-_Bergosip-di-Kantor--Positif-Atau-Negatif_-Final-submedium_5 p {
		font-family: 'Nanum Pen Script', cursive;
		font-weight:500;
		line-height:24px;
		height:auto;
		opacity:1;
		letter-spacing:0em;
		font-size:33px;
		text-align:left;
		color:rgb(50,75,89);
		text-transform:none;
		padding-bottom:0;
		padding-top:0;
		mix-blend-mode:normal;
		font-style:normal;
		position:static;
	}
	#g-_Bergosip-di-Kantor--Positif-Atau-Negatif_-Final-submedium_5 .g-pstyle0 {
		height:24px;
		text-align:center;
	}
	#g-_Bergosip-di-Kantor--Positif-Atau-Negatif_-Final-medium_5 {
		position:relative;
		overflow:hidden;
	}
	#g-_Bergosip-di-Kantor--Positif-Atau-Negatif_-Final-medium_5 p {
		font-family: 'Nanum Pen Script', cursive;
		font-weight:500;
		line-height:30px;
		height:auto;
		opacity:1;
		letter-spacing:0em;
		font-size:41px;
		text-align:left;
		color:rgb(50,75,89);
		text-transform:none;
		padding-bottom:0;
		padding-top:0;
		mix-blend-mode:normal;
		font-style:normal;
		position:static;
	}
	#g-_Bergosip-di-Kantor--Positif-Atau-Negatif_-Final-medium_5 .g-pstyle0 {
		height:30px;
		text-align:center;
	}
	#g-_Bergosip-di-Kantor--Positif-Atau-Negatif_-Final-large_5 {
		position:relative;
		overflow:hidden;
	}
	#g-_Bergosip-di-Kantor--Positif-Atau-Negatif_-Final-large_5 p {
		font-family: 'Nanum Pen Script', cursive;
		font-weight:500;
		line-height:37px;
		height:auto;
		opacity:1;
		letter-spacing:0em;
		font-size:50px;
		text-align:left;
		color:rgb(50,75,89);
		text-transform:none;
		padding-bottom:0;
		padding-top:0;
		mix-blend-mode:normal;
		font-style:normal;
		position:static;
	}
	#g-_Bergosip-di-Kantor--Positif-Atau-Negatif_-Final-large_5 .g-pstyle0 {
		height:37px;
		text-align:center;
	}
	#g-_Bergosip-di-Kantor--Positif-Atau-Negatif_-Final-xlarge_5 {
		position:relative;
		overflow:hidden;
	}
	#g-_Bergosip-di-Kantor--Positif-Atau-Negatif_-Final-xlarge_5 p {
		font-family: 'Nanum Pen Script', cursive;
		font-weight:500;
		line-height:37px;
		height:auto;
		opacity:1;
		letter-spacing:0em;
		font-size:50px;
		text-align:left;
		color:rgb(50,75,89);
		text-transform:none;
		padding-bottom:0;
		padding-top:0;
		mix-blend-mode:normal;
		font-style:normal;
		position:static;
	}
	#g-_Bergosip-di-Kantor--Positif-Atau-Negatif_-Final-xlarge_5 .g-pstyle0 {
		height:37px;
		text-align:center;
	}

	@media only screen and (max-width:509px) {
		#g-_Bergosip-di-Kantor--Positif-Atau-Negatif_-Final-cover_xlarge_5,
		#g-_Bergosip-di-Kantor--Positif-Atau-Negatif_-Final-xlarge_1,
		#g-_Bergosip-di-Kantor--Positif-Atau-Negatif_-Final-xlarge_2,
		#g-_Bergosip-di-Kantor--Positif-Atau-Negatif_-Final-xlarge_3,
		#g-_Bergosip-di-Kantor--Positif-Atau-Negatif_-Final-xlarge_4,
		#g-_Bergosip-di-Kantor--Positif-Atau-Negatif_-Final-xlarge_5 {
			display:none;
		}

		#g-_Bergosip-di-Kantor--Positif-Atau-Negatif_-Final-cover_large,
		#g-_Bergosip-di-Kantor--Positif-Atau-Negatif_-Final-large_1,
		#g-_Bergosip-di-Kantor--Positif-Atau-Negatif_-Final-large_2,
		#g-_Bergosip-di-Kantor--Positif-Atau-Negatif_-Final-large_3,
		#g-_Bergosip-di-Kantor--Positif-Atau-Negatif_-Final-large_4,
		#g-_Bergosip-di-Kantor--Positif-Atau-Negatif_-Final-large_5 {
			display:none;
		}

		#g-_Bergosip-di-Kantor--Positif-Atau-Negatif_-Final-cover_medium,
		#g-_Bergosip-di-Kantor--Positif-Atau-Negatif_-Final-medium_1,
		#g-_Bergosip-di-Kantor--Positif-Atau-Negatif_-Final-medium_2,
		#g-_Bergosip-di-Kantor--Positif-Atau-Negatif_-Final-medium_3,
		#g-_Bergosip-di-Kantor--Positif-Atau-Negatif_-Final-medium_4,
		#g-_Bergosip-di-Kantor--Positif-Atau-Negatif_-Final-medium_5{
			display:none;
		}

		#g-_Bergosip-di-Kantor--Positif-Atau-Negatif_-Final-cover_submedium,
		#g-_Bergosip-di-Kantor--Positif-Atau-Negatif_-Final-submedium_1,
		#g-_Bergosip-di-Kantor--Positif-Atau-Negatif_-Final-submedium_2,
		#g-_Bergosip-di-Kantor--Positif-Atau-Negatif_-Final-submedium_3,
		#g-_Bergosip-di-Kantor--Positif-Atau-Negatif_-Final-submedium_4,
		#g-_Bergosip-di-Kantor--Positif-Atau-Negatif_-Final-submedium_5 {
			display:none;
		}

		#g-_Bergosip-di-Kantor--Positif-Atau-Negatif_-Final-cover_smallplus,
		#g-_Bergosip-di-Kantor--Positif-Atau-Negatif_-Final-smallplus_1,
		#g-_Bergosip-di-Kantor--Positif-Atau-Negatif_-Final-smallplus_2,
		#g-_Bergosip-di-Kantor--Positif-Atau-Negatif_-Final-smallplus_3,
		#g-_Bergosip-di-Kantor--Positif-Atau-Negatif_-Final-smallplus_4,
		#g-_Bergosip-di-Kantor--Positif-Atau-Negatif_-Final-smallplus_5 {
			display:block;
		}
	}

	@media only screen and (min-width:510px) and (max-width:689px) {
		#g-_Bergosip-di-Kantor--Positif-Atau-Negatif_-Final-cover_xlarge_5,
		#g-_Bergosip-di-Kantor--Positif-Atau-Negatif_-Final-xlarge_1,
		#g-_Bergosip-di-Kantor--Positif-Atau-Negatif_-Final-xlarge_2,
		#g-_Bergosip-di-Kantor--Positif-Atau-Negatif_-Final-xlarge_3,
		#g-_Bergosip-di-Kantor--Positif-Atau-Negatif_-Final-xlarge_4,
		#g-_Bergosip-di-Kantor--Positif-Atau-Negatif_-Final-xlarge_5{
			display:none;
		}

		#g-_Bergosip-di-Kantor--Positif-Atau-Negatif_-Final-cover_large,
		#g-_Bergosip-di-Kantor--Positif-Atau-Negatif_-Final-large_1,
		#g-_Bergosip-di-Kantor--Positif-Atau-Negatif_-Final-large_2,
		#g-_Bergosip-di-Kantor--Positif-Atau-Negatif_-Final-large_3,
		#g-_Bergosip-di-Kantor--Positif-Atau-Negatif_-Final-large_4,
		#g-_Bergosip-di-Kantor--Positif-Atau-Negatif_-Final-large_5 {
			display:none;
		}

		#g-_Bergosip-di-Kantor--Positif-Atau-Negatif_-Final-cover_medium,
		#g-_Bergosip-di-Kantor--Positif-Atau-Negatif_-Final-medium_1,
		#g-_Bergosip-di-Kantor--Positif-Atau-Negatif_-Final-medium_2,
		#g-_Bergosip-di-Kantor--Positif-Atau-Negatif_-Final-medium_3,
		#g-_Bergosip-di-Kantor--Positif-Atau-Negatif_-Final-medium_4,
		#g-_Bergosip-di-Kantor--Positif-Atau-Negatif_-Final-medium_5 {
			display:none;
		}

		#g-_Bergosip-di-Kantor--Positif-Atau-Negatif_-Final-cover_submedium,
		#g-_Bergosip-di-Kantor--Positif-Atau-Negatif_-Final-submedium_1,
		#g-_Bergosip-di-Kantor--Positif-Atau-Negatif_-Final-submedium_2,
		#g-_Bergosip-di-Kantor--Positif-Atau-Negatif_-Final-submedium_3,
		#g-_Bergosip-di-Kantor--Positif-Atau-Negatif_-Final-submedium_4,
		#g-_Bergosip-di-Kantor--Positif-Atau-Negatif_-Final-submedium_5{
			display:block;
		}

		#g-_Bergosip-di-Kantor--Positif-Atau-Negatif_-Final-cover_smallplus,
		#g-_Bergosip-di-Kantor--Positif-Atau-Negatif_-Final-smallplus_1,
		#g-_Bergosip-di-Kantor--Positif-Atau-Negatif_-Final-smallplus_2,
		#g-_Bergosip-di-Kantor--Positif-Atau-Negatif_-Final-smallplus_3,
		#g-_Bergosip-di-Kantor--Positif-Atau-Negatif_-Final-smallplus_4,
		#g-_Bergosip-di-Kantor--Positif-Atau-Negatif_-Final-smallplus_5
		 {
			display:none;
		}
	}

	@media only screen and (min-width:690px) and (max-width:919px) {
		#g-_Bergosip-di-Kantor--Positif-Atau-Negatif_-Final-cover_xlarge_5,
		#g-_Bergosip-di-Kantor--Positif-Atau-Negatif_-Final-xlarge_1,
		#g-_Bergosip-di-Kantor--Positif-Atau-Negatif_-Final-xlarge_2,
		#g-_Bergosip-di-Kantor--Positif-Atau-Negatif_-Final-xlarge_3,
		#g-_Bergosip-di-Kantor--Positif-Atau-Negatif_-Final-xlarge_4,
		#g-_Bergosip-di-Kantor--Positif-Atau-Negatif_-Final-xlarge_5
		 {
			display:none;
		}

		#g-_Bergosip-di-Kantor--Positif-Atau-Negatif_-Final-cover_large,
		#g-_Bergosip-di-Kantor--Positif-Atau-Negatif_-Final-large_1,
		#g-_Bergosip-di-Kantor--Positif-Atau-Negatif_-Final-large_2,
		#g-_Bergosip-di-Kantor--Positif-Atau-Negatif_-Final-large_3,
		#g-_Bergosip-di-Kantor--Positif-Atau-Negatif_-Final-large_4,
		#g-_Bergosip-di-Kantor--Positif-Atau-Negatif_-Final-large_5
		 {
			display:none;
		}

		#g-_Bergosip-di-Kantor--Positif-Atau-Negatif_-Final-cover_medium,
		#g-_Bergosip-di-Kantor--Positif-Atau-Negatif_-Final-medium_1,
		#g-_Bergosip-di-Kantor--Positif-Atau-Negatif_-Final-medium_2,
		#g-_Bergosip-di-Kantor--Positif-Atau-Negatif_-Final-medium_3,
		#g-_Bergosip-di-Kantor--Positif-Atau-Negatif_-Final-medium_4,
		#g-_Bergosip-di-Kantor--Positif-Atau-Negatif_-Final-medium_5
		{
			display:block;
		}

		#g-_Bergosip-di-Kantor--Positif-Atau-Negatif_-Final-cover_submedium,
		#g-_Bergosip-di-Kantor--Positif-Atau-Negatif_-Final-submedium_1,
		#g-_Bergosip-di-Kantor--Positif-Atau-Negatif_-Final-submedium_2,
		#g-_Bergosip-di-Kantor--Positif-Atau-Negatif_-Final-submedium_3,
		#g-_Bergosip-di-Kantor--Positif-Atau-Negatif_-Final-submedium_4,
		#g-_Bergosip-di-Kantor--Positif-Atau-Negatif_-Final-submedium_5
		 {
			display:none;
		}

		#g-_Bergosip-di-Kantor--Positif-Atau-Negatif_-Final-cover_smallplus,
		#g-_Bergosip-di-Kantor--Positif-Atau-Negatif_-Final-smallplus_1,
		#g-_Bergosip-di-Kantor--Positif-Atau-Negatif_-Final-smallplus_2,
		#g-_Bergosip-di-Kantor--Positif-Atau-Negatif_-Final-smallplus_3,
		#g-_Bergosip-di-Kantor--Positif-Atau-Negatif_-Final-smallplus_4,
		#g-_Bergosip-di-Kantor--Positif-Atau-Negatif_-Final-smallplus_5
		 {
			display:none;
		}
	}

	@media only screen and (min-width:920px) and (max-width:1399px) {
		#g-_Bergosip-di-Kantor--Positif-Atau-Negatif_-Final-cover_xlarge_5,
		#g-_Bergosip-di-Kantor--Positif-Atau-Negatif_-Final-xlarge_1,
		#g-_Bergosip-di-Kantor--Positif-Atau-Negatif_-Final-xlarge_2,
		#g-_Bergosip-di-Kantor--Positif-Atau-Negatif_-Final-xlarge_3,
		#g-_Bergosip-di-Kantor--Positif-Atau-Negatif_-Final-xlarge_4,
		#g-_Bergosip-di-Kantor--Positif-Atau-Negatif_-Final-xlarge_5
		{
			display:none;
		}

		#g-_Bergosip-di-Kantor--Positif-Atau-Negatif_-Final-cover_large,
		#g-_Bergosip-di-Kantor--Positif-Atau-Negatif_-Final-large_1,
		#g-_Bergosip-di-Kantor--Positif-Atau-Negatif_-Final-large_2,
		#g-_Bergosip-di-Kantor--Positif-Atau-Negatif_-Final-large_3,
		#g-_Bergosip-di-Kantor--Positif-Atau-Negatif_-Final-large_4,
		#g-_Bergosip-di-Kantor--Positif-Atau-Negatif_-Final-large_5
		 {
			display:block;
		}

		#g-_Bergosip-di-Kantor--Positif-Atau-Negatif_-Final-cover_medium,
		#g-_Bergosip-di-Kantor--Positif-Atau-Negatif_-Final-medium_1,
		#g-_Bergosip-di-Kantor--Positif-Atau-Negatif_-Final-medium_2,
		#g-_Bergosip-di-Kantor--Positif-Atau-Negatif_-Final-medium_3,
		#g-_Bergosip-di-Kantor--Positif-Atau-Negatif_-Final-medium_4,
		#g-_Bergosip-di-Kantor--Positif-Atau-Negatif_-Final-medium_5
		{
			display:none;
		}

		#g-_Bergosip-di-Kantor--Positif-Atau-Negatif_-Final-cover_submedium,
		#g-_Bergosip-di-Kantor--Positif-Atau-Negatif_-Final-submedium_1,
		#g-_Bergosip-di-Kantor--Positif-Atau-Negatif_-Final-submedium_2,
		#g-_Bergosip-di-Kantor--Positif-Atau-Negatif_-Final-submedium_3,
		#g-_Bergosip-di-Kantor--Positif-Atau-Negatif_-Final-submedium_4,
		#g-_Bergosip-di-Kantor--Positif-Atau-Negatif_-Final-submedium_5
		 {
			display:none;
		}

		#g-_Bergosip-di-Kantor--Positif-Atau-Negatif_-Final-cover_smallplus,
		#g-_Bergosip-di-Kantor--Positif-Atau-Negatif_-Final-smallplus_1,
		#g-_Bergosip-di-Kantor--Positif-Atau-Negatif_-Final-smallplus_2,
		#g-_Bergosip-di-Kantor--Positif-Atau-Negatif_-Final-smallplus_3,
		#g-_Bergosip-di-Kantor--Positif-Atau-Negatif_-Final-smallplus_4,
		#g-_Bergosip-di-Kantor--Positif-Atau-Negatif_-Final-smallplus_5
		 {
			display:none;
		}
	}

	@media only screen and (min-width:1400px) {
		#g-_Bergosip-di-Kantor--Positif-Atau-Negatif_-Final-cover_xlarge_5,
		#g-_Bergosip-di-Kantor--Positif-Atau-Negatif_-Final-xlarge_1,
		#g-_Bergosip-di-Kantor--Positif-Atau-Negatif_-Final-xlarge_2,
		#g-_Bergosip-di-Kantor--Positif-Atau-Negatif_-Final-xlarge_3,
		#g-_Bergosip-di-Kantor--Positif-Atau-Negatif_-Final-xlarge_4,
		#g-_Bergosip-di-Kantor--Positif-Atau-Negatif_-Final-xlarge_5 {
			display:block;
		}

		#g-_Bergosip-di-Kantor--Positif-Atau-Negatif_-Final-cover_large,
		#g-_Bergosip-di-Kantor--Positif-Atau-Negatif_-Final-large_1,
		#g-_Bergosip-di-Kantor--Positif-Atau-Negatif_-Final-large_2,
		#g-_Bergosip-di-Kantor--Positif-Atau-Negatif_-Final-large_3,
		#g-_Bergosip-di-Kantor--Positif-Atau-Negatif_-Final-large_4,
		#g-_Bergosip-di-Kantor--Positif-Atau-Negatif_-Final-large_5 {
			display:none;
		}

		#g-_Bergosip-di-Kantor--Positif-Atau-Negatif_-Final-cover_medium,
		#g-_Bergosip-di-Kantor--Positif-Atau-Negatif_-Final-medium_1,
		#g-_Bergosip-di-Kantor--Positif-Atau-Negatif_-Final-medium_2,
		#g-_Bergosip-di-Kantor--Positif-Atau-Negatif_-Final-medium_3,
		#g-_Bergosip-di-Kantor--Positif-Atau-Negatif_-Final-medium_4,
		#g-_Bergosip-di-Kantor--Positif-Atau-Negatif_-Final-medium_5 {
			display:none;
		}

		#g-_Bergosip-di-Kantor--Positif-Atau-Negatif_-Final-cover_submedium,
		#g-_Bergosip-di-Kantor--Positif-Atau-Negatif_-Final-submedium_1,
		#g-_Bergosip-di-Kantor--Positif-Atau-Negatif_-Final-submedium_2,
		#g-_Bergosip-di-Kantor--Positif-Atau-Negatif_-Final-submedium_3,
		#g-_Bergosip-di-Kantor--Positif-Atau-Negatif_-Final-submedium_4,
		#g-_Bergosip-di-Kantor--Positif-Atau-Negatif_-Final-submedium_5 {
			display:none;
		}

		#g-_Bergosip-di-Kantor--Positif-Atau-Negatif_-Final-cover_smallplus,
		#g-_Bergosip-di-Kantor--Positif-Atau-Negatif_-Final-smallplus_1,
		#g-_Bergosip-di-Kantor--Positif-Atau-Negatif_-Final-smallplus_2,
		#g-_Bergosip-di-Kantor--Positif-Atau-Negatif_-Final-smallplus_3,
		#g-_Bergosip-di-Kantor--Positif-Atau-Negatif_-Final-smallplus_4,
		#g-_Bergosip-di-Kantor--Positif-Atau-Negatif_-Final-smallplus_5 {
			display:none;
		}
	}

</style>