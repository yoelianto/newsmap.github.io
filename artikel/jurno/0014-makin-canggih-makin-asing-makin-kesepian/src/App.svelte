<script>
	import Header from './Header.svelte';
	import Paragraph from './Paragraph.svelte';
	import List from './List.svelte'
	import Quote from './Quote.svelte';
	import Image from './Image.svelte';
	import Credit from './Credit.svelte';
	import Typo from './Typo.svelte';

	//Main Font
	let fontfamily1 = "Roboto Mono"

	//Main Color
	let fontColor = '#1e1e1e'

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
	let mainBackground='#fffae6'	
	let headerBackground='hsl(0,0%,100%)'
	let titleColor='#1e1e1e'
	let subtitleColor='hsl(200,43%,50%)'
	let subheadColor='hsl(0,0%,0%)'

	let height
	let w, h

	let credit =[{
		role : 'Penulis',
		name : 'Ann Putri'
		}]
	
	let speed = 2
</script>

<svelte:window bind:innerHeight={h} bind:innerWidth={w}></svelte:window>

<svelte:head>
	<meta
		name='viewport' 
		content='width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0'
	/>
	
	<link rel="preconnect" href="https://fonts.googleapis.com">
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
	<link href="https://fonts.googleapis.com/css2?family=Josefin+Slab:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;1,100;1,200;1,300;1,400;1,500;1,600;1,700&display=swap" rel="stylesheet">
</svelte:head>

<main style="background-color: {mainBackground}">
	

	<Header 
		--headerBackground={headerBackground}
		--titleColor={titleColor}
		--subtitleColor={subtitleColor}
		--subheadColor={subheadColor}

		fullHeader={false}

		title='Makin Canggih<br>Makin Terasing<br>Makin Kesepian'

		subhead={['Semua kebutuhan kita, terutama kebutuhan untuk berkomunikasi dengan manusia lain, sekarang bisa diakses hanya dalam beberapa klik. Tapi kenapa kita makin merasa kesepian?']}

		author='Ann Putri'
		date='15 Mei 2022'		
	/>

	<div class="divider"></div>

	<Paragraph
		--font-color ={fontColor}
		subjudul='Anatomi Kesepian'
		para={[
		"Ketakutan akan kesendirian sudah ada <a class='link-article' target='_blank' href='https://www.cnnindonesia.com/gaya-hidup/20200420164136-289-495357/kisah-nabi-adam-as-manusia-pertama-yang-diciptakan-allah'>sejak cerita penciptaan Adam dan Hawa</a>. Tuhan memerintahkan manusia untuk berpasangan, beranak-pinak, dan menjaga relasi dengan keluarga, tetangga, dan teman. Merasa seorang sendiri merupakan pertanda bahwa cahaya kasih Tuhan tak lagi bersinar di dalam hati.",
		"Kesendirian pun dianggap asing dan menakutkan. Para pendeta sering menggunakan fenomena sendirian di tempat yang jauh dari pertolongan Ilahi seperti kuburan dan neraka untuk menakut-nakuti umat.",
		"Secara etimologi, kesepian atau <em>loneliness</em> baru memasuki kosa kata bahasa Inggris di tahun 1600-an lewat karya Shakespeare, Hamlet. Mereka yang menerima ide kesendirian dengan tangan terbuka adalah para filsuf. Aristoteles, Montaigne, dan Nietzsche menganggap kesendirian sebagai keutamaan (<em>virtue</em>). Dalam kesendirian, manusia bisa merasakan kebebasan dan merenungi hidup beserta maknanya."
		]}
	/>

	<Typo 
		text='Meskipun kesendirian dianggap sebagai aspek kehidupan yang berharga, kesepian sebisa mungkin dihindari.'
	/>

	<Paragraph
		--font-color ={fontColor}
		para={[
		"Lalu apa yang membedakan kesepian dengan kesendirian? Secara kasar, seseorang secara sadar memilih untuk menyendiri. Sementara kesepian lahir dari <a class='link-article' target='_blank' href='https://link.springer.com/content/pdf/10.1007%2FBF01278458.pdf'>kurangnya kedekatan emosional dan fisik yang bermakna</a>.",
		"Menariknya, naiknya penggunaan kata kesepian diikuti dengan Revolusi Industri. Modernisasi tak hanya mengubah lanskap industri, tapi juga lanskap sosial kita. Jam kerja naik pesat menjadi 14-16 jam/hari, sebelum akhirnya diturunkan menjadi 8 jam/hari."
		]}
	/>

	<Image
		img = {[{
			url:'./images/02-illustration.png',
			title:'Ilustrasi kesendirian'
		}]}
	/>


	<Paragraph
		--font-color ={fontColor}
		para={[
		"Namun penurunan jam kerja tidak serta-merta membuat kita lebih sering bersosialisasi. Justru kultur sosial menjadi lebih individualistis yang kemudian berimbas ke formasi keluarga. Orang-orang dari negara maju lebih memilih untuk kumpul kebo daripada menikah. Kalaupun menikah, mereka melakukannya <a class='link-article' target='_blank' href='https://www.nytimes.com/2018/05/29/well/mind/millennials-love-marriage-sex-relationships-dating.html'>di usia yang lebih tua</a>, punya anak sedikit atau <a class='link-article' target='_blank' href='https://www.economist.com/international/2017/07/27/the-rise-of-childlessness'>tidak sama sekali</a>. Anak muda di Jepang bahkan lebih ekstrim: <a class='link-article' target='_blank' href='https://japantoday.com/category/features/kuchikomi/young-people-losing-interest-in-sex-but-why'>mereka tidak tertarik untuk pacaran, apalagi berhubungan seks</a>.",
		"Naiknya kerja ke tangga prioritas manusia modern juga membuat kita memiliki lebih sedikit teman curhat dibandingkan dulu."
		]}
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
			<div
				style="height:100vh">
					<div
						style="position:absolute;
							width:100vw;
							right:{offset * 50}vw;
							top:{w > 450 ? '0' : '30vh'}">
						<img src="./images/03-away.png" alt="Away" style='width:100%'>
					</div>
					<div
						style="position:absolute;
							width:100vw;
							right:-25vw;
							top:{w > 450 ? '0' : '30vh'}">
						<img src="./images/03-crowd.png" alt="Crowd" style='width:100%'>
				</div>
			</div>
		</div>

		<div slot="foreground">
			<section
				style="background-color:transparent;
					display:flex;
					justify-content:center;
					align-items:center;">
				<p style="color:white; background-color:#1e1e1e">
					Mengenai pertemanan, masyarakat Amerika Serikat menunjukkan kebanyakan orang hanya memiliki 2 teman curhat, turun dari 3 pada tahun 1980-an
				</p>
			</section>
		</div>
	</Scroller>

	<Paragraph
		--font-color ={fontColor}
		para={[
		"Turunnya jumlah teman curhat menunjukkan kita semakin kekurangan jaringan pendukung emosional. Berkurangnya—atau bahkan ketiadaannya—jaring pendukung ini mengkhawatirkan karena bisa mengarah ke naiknya tingkat stres dan tentu saja, kesepian yang bisa merambat ke penyakit-penyakit berbahaya."
		]}
	/>

	<Paragraph
		--font-color ={fontColor}
		subjudul = 'Teknologi penyebab kesepian?'
		para={[
		"Penelitian-penelitian awal soal kesepian di kalangan anak muda <a class='link-article' target='_blank' href='https://research.fb.com/wp-content/uploads/2016/11/growing-closer-on-facebook-changes-in-tie-strength-through-site-use.pdf'>menunjuk media sosial dan kemajuan teknologi sebagai biang kerok</a>. Ini karena anak-anak muda menggantikan komunikasi tatap wajah ke komunikasi daring yang dianggap lebih “kosong”.",
		"Pendapat ini disanggah oleh <a class='link-article' target='_blank' href='https://journals.sagepub.com/doi/abs/10.1177/1745691617713052?journalCode=ppsa'>Nowland, dkk</a>, yang menyatakan bahwa tingkat kesepian ditentukan oleh cara seseorang menggunakan media sosial. Orang-orang yang menggunakan media sosial secara aktif untuk memelihara dan membentuk pertemanan baru melaporkan rasa kesepian yang lebih rendah dibanding mereka yang pasif. Ini karena orang-orang yang kesepian cenderung menarik diri dan pasif, baik di dunia nyata maupun dunia maya.",
		"Isu kesepian ini harus dilihat dengan konteks dan gambaran yang lebih besar. Kemunculan teknologi dan Revolusi Industri meningkatkan rasa kesepian masyarakat. Sekilas teknologi yang membuat kita kesepian, kan? Tapi pelaku sebenarnya adalah ketidaksetaraan dan meningkatnya jurang kemakmuran.",
		"Awal dekade industrialisasi memang ditandai oleh tingginya ketimpangan ekonomi. Namun <a class='link-article' target='_blank' href='https://sci-hub.se/https://www.sciencedirect.com/science/article/abs/pii/S0014498399907131'>ketidaksetaraan ini mulai menurun</a> kala negara-negara industrial mulai menerima tenaga kerja asing dan demokratisasi pemerintahan yang mendistribusikan kekuasaan dari bangsawan ke masyarakat. Hal ini bisa dicapai berkat keberadaan serikat-serikat buruh dan para politikus sosialis yang mendorong kebijakan pajak tanah yang tinggi, penggratisan sekolah untuk publik, peraturan yang melindungi dan memihak tenaga kerja, serta nasionalisasi fasilitas publik.",
		"Ketika semua kebutuhan dasar sudah terpenuhi, orang-orang bisa lebih fokus membentuk hubungan yang bermakna. Kesepian bisa ditekan dan orang-orang bisa hidup dengan lebih bahagia."
		]}
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
			<div
				style="height:100vh;
					clip-path:inset(5% 5%)">
				<img
					style="width:{offset * speed + 90}vw;
						height:{offset * speed + 90}vh;
						position:absolute;
						left:{(10 - (offset * speed))/2}vw;
						top:{(10 - (offset * speed))/2}vh;"
					src="./images/01-background.png" alt="Background">
					<div
						style="position:absolute;
							left:{offset * 7}vw;
							bottom:0;">
						<img style="width:100vw" src="./images/01-shadow.png" alt="Shadow">
					</div>
					<div
					style="position:absolute;
						right:{offset * 7}vw;
						bottom:0;">
						<img style="width:100vw" src="./images/01-person.png" alt="Person">
				</div>
			</div>
		</div>

		<div slot="foreground">
			<section style='background-color:transparent'></section>
		</div>
	</Scroller>

	<Paragraph
		--font-color ={fontColor}
		para={[
		"Sayang, periode emas kehidupan manusia ini hanya bertahan sebentar. Ketidaksetaraan kembali menyeruak sejak dekade 1970-an bersama dengan lesunya partai-partai kiri dan kelahiran neoliberalisme. Pemerintah lebih memilih lepas tangan dan membiarkan tangan tak terlihat kapitalisme bekerja. Fasilitas-fasilitas dasar yang dulunya dibiayai oleh negara diambil alih oleh perusahaan swasta. Tentu ini memaksa kita untuk lebih fokus mencari uang alih-alih membangun koneksi sosial yang suportif.",
		"Sebagai obat penawar, sebagian dari kita memilih membuka Tinder, menggeser ratusan foto orang layaknya membeli barang di <em>marketplace</em>. Kalau semesta mengizinkan, kita bisa <em>match</em> dengan orang yang kita ‘sukai’, mengobrol untuk mengetes kecocokan, melanjutkan hubungan ke kasur lalu berakhir di-<em>ghosting</em>. Ada pula yang menghabiskan uang untuk <a class='link-article' target='_blank' href='https://www.theatlantic.com/business/archive/2013/08/the-loneliness-loop-why-feeling-sad-makes-us-shop-and-shopping-makes-us-sad/278443/>berbelanja demi mengenyahkan rasa kesepian</a>. Lainnya memutuskan untuk <a class='link-article' target='_blank' href='https://www.vice.com/en/article/pkeqvk/young-people-loneliness-drugs-alcohol'>mabuk atau teler</a> tiap malam supaya tidak ingat kalau kesepian.",
		"Namun apakah usaha-usaha ini bisa sukses? Sayangnya tidak. Kamu tidak bisa bertukar pikiran dengan botol Jagermeister, jam tangan Dior, sepatu Gucci, atau laptop ROG karena mereka benda mati. Kamu juga tidak bisa memaksa hubungan dengan pasangan Tinder kalau mereka hanya ingin hubungan sementara atau <em>chemistry</em> kalian berdua berhenti di kasur saja.",
		"Satu-satunya obat untuk kesepian adalah membangun relasi yang dalam dan bermakna dengan manusia lain. Tapi solusi ini pun hanya bisa benar-benar bekerja apabila kita mengubah sistem kehidupan kita agar lebih mengakomodasi hubungan sosial yang berarti."
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
		color: #1e1e1e;
		text-decoration: underline;
		font-weight: 600;
	}

	.link-article:hover {
		text-decoration: underline;
	}

	.link-article:visited {
		color: #1e1e1e;
	}
	.divider {
		height:0.2rem;
		width:60%;
		background-color:#1e1e1e;
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
		height: 300vh;
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
	

</style>