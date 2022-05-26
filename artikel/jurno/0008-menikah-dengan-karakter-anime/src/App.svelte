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
	let headerBackground='hsl(0,0%,100%)'
	let titleColor='#148ba6'
	let subtitleColor='black'
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
	<link href="https://fonts.googleapis.com/css2?family=Quicksand:wght@300;400;500;600;700&display=swap" rel="stylesheet">
</svelte:head>

<main style="background-color: {mainBackground}">
	<div class="headerilustrasi" style="margin-top:{height}px;">
		<div id="g-menikah-dengan-karakter-anime_19-box" class="ai2html">
			<!-- Artboard: smallplus-cover -->
	<div id="g-menikah-dengan-karakter-anime_19-smallplus-cover" class="g-artboard" style="max-width: 320px;max-height: 320px" data-aspect-ratio="1" data-min-width="0" data-max-width="509">
		<div style="padding: 0 0 100% 0;"></div>
				<img id="g-menikah-dengan-karakter-anime_19-smallplus-cover-img" class="g-aiImg" alt="" src="./images/menikah-dengan-karakter-anime_19-smallplus-cover.png"/>
			</div>
		
			<!-- Artboard: submedium-cover -->
			<div id="g-menikah-dengan-karakter-anime_19-submedium-cover" class="g-artboard" style="width:510px; height:320px;" data-aspect-ratio="1.594" data-min-width="510" data-max-width="689">
		<div style=""></div>
				<img id="g-menikah-dengan-karakter-anime_19-submedium-cover-img" class="g-aiImg" alt="" src="./images/menikah-dengan-karakter-anime_19-submedium-cover.png"/>
			</div>
		
			<!-- Artboard: medium-cover -->
			<div id="g-menikah-dengan-karakter-anime_19-medium-cover" class="g-artboard" style="width:690px; height:320px;" data-aspect-ratio="2.156" data-min-width="690" data-max-width="919">
		<div style=""></div>
				<img id="g-menikah-dengan-karakter-anime_19-medium-cover-img" class="g-aiImg" alt="" src="./images/menikah-dengan-karakter-anime_19-medium-cover.png"/>
			</div>
		
			<!-- Artboard: large-cover -->
			<div id="g-menikah-dengan-karakter-anime_19-large-cover" class="g-artboard" style="width:920px; height:319px;" data-aspect-ratio="2.884" data-min-width="920" data-max-width="1399">
		<div style=""></div>
				<img id="g-menikah-dengan-karakter-anime_19-large-cover-img" class="g-aiImg" alt="" src="./images/menikah-dengan-karakter-anime_19-large-cover.png"/>
			</div>
		
			<!-- Artboard: xlarge-cover -->
			<div id="g-menikah-dengan-karakter-anime_19-xlarge-cover" class="g-artboard" style="width:1400px; height:313.5px;" data-aspect-ratio="4.466" data-min-width="1400">
		<div style=""></div>
				<img id="g-menikah-dengan-karakter-anime_19-xlarge-cover-img" class="g-aiImg" alt="" src="./images/menikah-dengan-karakter-anime_19-xlarge-cover.png"/>
			</div>
		</div>

	</div>
	

	<Header 
		--headerBackground={headerBackground}
		--titleColor={titleColor}
		--subtitleColor={subtitleColor}
		--subheadColor={subheadColor}

		fullHeader={false}

		title='Ayo Menikah dengan Karakter Anime:'
		subtitle='Ketika Ide Lebih Menarik Daripada Karakter Nyata'	

		author='Ann Putri'
		date='16 Mei 2022'		
	/>

	<div class="divider"></div>

	<Paragraph
		--font-color ={fontColor}
		subjudul = 'Selamat Tinggal Manusia, Halo Karakter Anime'
		para={[
		"Percaya tidak percaya, ini kejadian nyata. Akihiko Kondo, seorang pekerja kantoran, <a class='link-article' target='_blank' href='https://www.youtube.com/watch?v=dtu4t_Zc3d4'>menikahi idola virtualnya Hatsune Miku</a> pada November 2018. Kondo berpacaran dengan Miku selama 10 tahun sebelum akhirnya menikah dalam resepsi yang dihadiri 39 orang. Meski mahal (ia harus merogoh kocek sebesar 2 juta yen atau sekitar Rp229 juta) dan tidak diakui negara, ia sangat bahagia dengan keputusannya.",
		"Banyak yang menganggap aneh pernikahan Kondo. <a class='link-article' target='_blank' href='https://twitter.com/AFP/status/1061894564762464256'>Keluarganya tidak mau menghadiri pernikahannya</a>. Ia mendapat banyak komentar miring di internet. Namun hal-hal ini tidak membuatnya gentar—ia justru terus <a class='link-article' target='_blank' href='https://twitter.com/akihikokondosk'>mengupdate kehidupan percintaannya ke Twitter</a>. Kisah Kondo menginspirasi banyak otaku untuk menikahi pacar dua dimensi."
		]}
	/>

	<div id="g-menikah-dengan-karakter-anime_19-box" class="ai2html">
		<!-- Artboard: smallplus-1 -->
		<div id="g-menikah-dengan-karakter-anime_19-smallplus-1" class="g-artboard" style="max-width: 320px;max-height: 200px" data-aspect-ratio="1.6" data-min-width="0" data-max-width="509">
		<div style="padding: 0 0 62.5% 0;"></div>
				<img id="g-menikah-dengan-karakter-anime_19-smallplus-1-img" class="g-aiImg" alt="" src="./images/menikah-dengan-karakter-anime_19-smallplus-1.png"/>
			</div>
		
			<!-- Artboard: submedium-1 -->
			<div id="g-menikah-dengan-karakter-anime_19-submedium-1" class="g-artboard" style="width:510px; height:340px;" data-aspect-ratio="1.5" data-min-width="510" data-max-width="689">
		<div style=""></div>
				<img id="g-menikah-dengan-karakter-anime_19-submedium-1-img" class="g-aiImg" alt="" src="./images/menikah-dengan-karakter-anime_19-submedium-1.png"/>
			</div>
		
			<!-- Artboard: medium-1 -->
			<div id="g-menikah-dengan-karakter-anime_19-medium-1" class="g-artboard" style="width:690px; height:420px;" data-aspect-ratio="1.643" data-min-width="690" data-max-width="919">
		<div style=""></div>
				<img id="g-menikah-dengan-karakter-anime_19-medium-1-img" class="g-aiImg" alt="" src="./images/menikah-dengan-karakter-anime_19-medium-1.png"/>
			</div>
		
			<!-- Artboard: large-1 -->
			<div id="g-menikah-dengan-karakter-anime_19-large-1" class="g-artboard" style="width:920px; height:540px;" data-aspect-ratio="1.704" data-min-width="920" data-max-width="1399">
		<div style=""></div>
				<img id="g-menikah-dengan-karakter-anime_19-large-1-img" class="g-aiImg" alt="" src="./images/menikah-dengan-karakter-anime_19-large-1.png"/>
			</div>
		
			<!-- Artboard: xlarge-1 -->
			<div id="g-menikah-dengan-karakter-anime_19-xlarge-1" class="g-artboard" style="width:1400px; height:590px;" data-aspect-ratio="2.373" data-min-width="1400">
		<div style=""></div>
				<img id="g-menikah-dengan-karakter-anime_19-xlarge-1-img" class="g-aiImg" alt="" src="./images/menikah-dengan-karakter-anime_19-xlarge-1.png"/>
			</div>
	</div>


	<Paragraph
		--font-color ={fontColor}
		para={[
		"Kenapa Kondo memilih untuk menikah dengan karakter yang tak nyata? Jawabannya tak jauh dari isu perundungan. Hobi Kondo sebagai otaku anime membuatnya dikucilkan oleh teman-temannya sejak masa sekolah.",
		"Perundungan ini terus berlanjut di tempat kerja. Dua kolega perempuannya, satu berusia sebaya dan satunya lagi jauh lebih tua, merundungnya sampai ia keluar dari pekerjaan. Saking depresinya ia mengurung diri di kamar selama dua tahun. Di masa kelam itu, ia menemukan video menyanyi Hatsune Miku.",
		"“Mendengar lagu-lagunya membuatku emosional. Bagaimana ia menari, bergerak, dan berbicara membuatku merasakan sesuatu. Hatiku tergerak lagi,” <a class='link-article' target='_blank' href='https://www.bbc.com/news/stories-49343280'>katanya</a>. Perasaan Kondo ke Miku begitu kuat sampai-sampai ia merasa telah menjalin hubungan romantis dengannya. Hubungan ini pula yang membangun kepercayaan dirinya untuk kembali ke kantor.",
		"Begitu kuat perasaan Kondo ke Miku hingga ia memberanikan diri untuk melangsungkan pesta pernikahan dan dihadiri oleh 39 orang—simbolisasi untuk nama Miku yang bisa dibaca sebagai 39 dalam bahasa Jepang.",
		"Kondo sadar keputusannya aneh, tapi ia melakukan ini karena ingin mendukung orang-orang yang bernasib sama dengannya. Dan ia tidak sepenuhnya salah; Gatebox, perusahaan yang membuat hologram Miku, telah <a class='link-article' target='_blank' href='https://nypost.com/2018/11/13/i-married-my-16-year-old-hologram-because-she-cant-cheat-or-age'>menjual 3.700 “sertifikat pernikahan” ke konsumen</a> yang ingin menikahi karakter fiksi. ",
		"Kondo memang tidak sendiri. Dengan sampel sebanyak ini, apa yang dilakukan Kondo dan 3.700 orang lainnya sama nyatanya dengan perasaan pasangan konvensional. Namun, fenomena ini juga menimbulkan pertanyaan baru: kenapa dan bagaimana orang-orang bisa jatuh cinta pada sesuatu yang tidak nyata?"
		]}
	/>

	<div id="g-menikah-dengan-karakter-anime_19-box" class="ai2html">
		<!-- Artboard: smallplus-2 -->
		<div id="g-menikah-dengan-karakter-anime_19-smallplus-2" class="g-artboard" style="max-width: 320px;max-height: 225px" data-aspect-ratio="1.422" data-min-width="0" data-max-width="509">
		<div style="padding: 0 0 70.3125% 0;"></div>
				<img id="g-menikah-dengan-karakter-anime_19-smallplus-2-img" class="g-aiImg" alt="" src="./images/menikah-dengan-karakter-anime_19-smallplus-2.png"/>
			</div>
		
			<!-- Artboard: submedium-2 -->
			<div id="g-menikah-dengan-karakter-anime_19-submedium-2" class="g-artboard" style="width:510px; height:340px;" data-aspect-ratio="1.5" data-min-width="510" data-max-width="689">
		<div style=""></div>
				<img id="g-menikah-dengan-karakter-anime_19-submedium-2-img" class="g-aiImg" alt="" src="./images/menikah-dengan-karakter-anime_19-submedium-2.png"/>
			</div>
		
			<!-- Artboard: medium-2 -->
			<div id="g-menikah-dengan-karakter-anime_19-medium-2" class="g-artboard" style="width:690px; height:460px;" data-aspect-ratio="1.5" data-min-width="690" data-max-width="919">
		<div style=""></div>
				<img id="g-menikah-dengan-karakter-anime_19-medium-2-img" class="g-aiImg" alt="" src="./images/menikah-dengan-karakter-anime_19-medium-2.png"/>
			</div>
		
			<!-- Artboard: large-2 -->
			<div id="g-menikah-dengan-karakter-anime_19-large-2" class="g-artboard" style="width:920px; height:560px;" data-aspect-ratio="1.643" data-min-width="920" data-max-width="1399">
		<div style=""></div>
				<img id="g-menikah-dengan-karakter-anime_19-large-2-img" class="g-aiImg" alt="" src="./images/menikah-dengan-karakter-anime_19-large-2.png"/>
			</div>
		
			<!-- Artboard: xlarge-2 -->
			<div id="g-menikah-dengan-karakter-anime_19-xlarge-2" class="g-artboard" style="width:1400px; height:600px;" data-aspect-ratio="2.333" data-min-width="1400">
		<div style=""></div>
				<img id="g-menikah-dengan-karakter-anime_19-xlarge-2-img" class="g-aiImg" alt="" src="./images/menikah-dengan-karakter-anime_19-xlarge-2.png"/>
			</div>
	</div>

	<Paragraph
		--font-color ={fontColor}
		subjudul='Hubungan Parasosial'
		para={[
		"Istilah ini pertama kali dicetuskan oleh <a class='link-article' target='_blank' href='https://www.tandfonline.com/doi/abs/10.1080/00332747.1956.11023049'>Horton dan Wohl pada 1965</a>. Mereka mengatakan hubungan ini mungkin terjadi karena media baru seperti TV dan radio memberikan ilusi kehadiran orang lain yang tak bisa diberikan media tulis. Orang-orang kota yang kesepian dan kesulitan berteman akhirnya menjalin hubungan dengan karakter di radio dan TV. ",
		"Disebut sebagai hubungan parasosial karena hubungan yang dibangun antara sang aktor (persona dalam bahasa Horton dan Wohl) di TV dengan penonton hanya bersifat satu arah. Para penontonlah yang membangun narasi dan fantasi akan persona yang mereka lihat. Dan karena hubungan ini tidak nyata, tidak akan ada timbal balik emosi antara keduanya.",
		"Meski begitu, banyak orang yang nyaman dengan tipe hubungan ini. Ketiadaan timbal balik yang seharusnya membuat hubungan tersebut terasa hampa, justru dicari atau bahkan dipertahankan. Mereka bisa terus mendapatkan hal-hal positif dari persona yang digandrungi, terlindungi dari hal-hal negatif yang sudah pasti ada di hubungan normal.",
		"Perkembangan teknologi membuat hubungan parasosial semakin menjamur. Penelitian yang dilakukan oleh Theran, dkk (2010) menunjukkan banyak remaja perempuan memiliki ketertarikan dengan karakter fiksi dari film atau acara TV bergenre romansa. Ada pula yang membangun koneksi erat dengan persona idola, seperti para fans idola Kpop."
		]}
	/>

	<Paragraph
		--font-color ={fontColor}
		para={[
		"Di masa yang penuh ketidakpastian seperti masa puber, keputusan untuk membangun hubungan romantis dengan karakter fiksi adalah hal yang logis. Mereka bisa mengeksplorasi hubungan lebih aman tanpa takut mengalami penolakan dan ejekan dari laki-laki yang baru puber.",
		"Namun, hubungan parasosial tidak selalu positif. Orang-orang yang memiliki hubungan parasosial biasanya memiliki pola ketertarikan yang cenderung cemas atau menghindari orang lain. Mereka yang punya pola ketertarikan ini cenderung kesulitan mempertahankan hubungan karena terlalu butuh afirmasi pasangan (<em>anxious</em>) atau menghindari orang lain yang berujung ke menghindari komitmen (<em>avoidant</em>).",
		"Tak mengherankan apabila orang-orang dengan pola ketertarikan ini beralih ke hubungan parasosial. Dalam hubungan parasosial, orang-orang tak perlu takut ditolak karena hubungannya hanya bersifat satu arah. Hubungan ini bisa memenuhi kebutuhan sosial yang tak terpenuhi sebelumnya sekaligus menjadi medium untuk lari dari kenyataan yang penuh tekanan. Meskipun tak nyata, hubungan parasosial bisa terasa senyata hubungan dengan manusia asli."
		]}
	/>

	<div id="g-menikah-dengan-karakter-anime_19-box" class="ai2html">
		<!-- Artboard: smallplus-3 -->
		<div id="g-menikah-dengan-karakter-anime_19-smallplus-3" class="g-artboard" style="max-width: 320px;max-height: 700px" data-aspect-ratio="0.457" data-min-width="0" data-max-width="509">
		<div style="padding: 0 0 218.75% 0;"></div>
				<img id="g-menikah-dengan-karakter-anime_19-smallplus-3-img" class="g-aiImg" alt="" src="./images/menikah-dengan-karakter-anime_19-smallplus-3.png"/>
				<div id="g-ai15-1" class="g-Layer_1 g-aiAbs g-aiPointText" style="top:10.3183%;margin-top:-32.2px;left:11.9489%;width:254px;">
					<p class="g-pstyle0">1st WAVE</p>
				</div>
				<div id="g-ai15-2" class="g-Layer_1 g-aiAbs g-aiPointText" style="top:15.45%;margin-top:-19.2px;left:11.9489%;width:253px;">
					<p class="g-pstyle1">DIGISEXUALITY</p>
				</div>
				<div id="g-ai15-3" class="g-Layer_1 g-aiAbs g-aiPointText" style="top:18.9746%;margin-top:-12.8px;left:11.9489%;width:253px;">
					<p class="g-pstyle2">MEDIATING TECHNOLOGY</p>
				</div>
				<div id="g-ai15-4" class="g-Layer_1 g-aiAbs" style="top:21%;left:12.3319%;width:71.5625%;">
					<p>Allow for new or enhanced forms of partnered sexual activity.</p>
				</div>
				<div id="g-ai15-5" class="g-Layer_1 g-aiAbs" style="top:33.1429%;left:12.3319%;width:71.5625%;">
					<p>Examples: digital pornography, social media, online dating/hook-up apps, web camming, teledidonics, new sex toys, body hacking, tracking and quantification</p>
				</div>
				<div id="g-ai15-6" class="g-Layer_1 g-aiAbs g-aiPointText" style="top:59.3183%;margin-top:-32.2px;left:13.439%;width:254px;">
					<p class="g-pstyle0">2nd WAVE</p>
				</div>
				<div id="g-ai15-7" class="g-Layer_1 g-aiAbs g-aiPointText" style="top:64.3072%;margin-top:-19.2px;left:13.439%;width:253px;">
					<p class="g-pstyle1">DIGISEXUALITY</p>
				</div>
				<div id="g-ai15-8" class="g-Layer_1 g-aiAbs g-aiPointText" style="top:67.9746%;margin-top:-12.8px;left:13.439%;width:253px;">
					<p class="g-pstyle2">IMMERSIVE TECHNOLOGY</p>
				</div>
				<div id="g-ai15-9" class="g-Layer_1 g-aiAbs" style="top:70%;left:13.8221%;width:71.5625%;">
					<p>Create opportunities for new forms of sexual experience not dependent on human partners.</p>
				</div>
				<div id="g-ai15-10" class="g-Layer_1 g-aiAbs" style="top:82%;left:13.8221%;width:71.5625%;">
					<p>Examples: robots, artificial agents, virtual reality, augmented reality.</p>
				</div>
			</div>
		
			<!-- Artboard: submedium-3 -->
			<div id="g-menikah-dengan-karakter-anime_19-submedium-3" class="g-artboard" style="width:510px; height:800px;" data-aspect-ratio="0.638" data-min-width="510" data-max-width="689">
		<div style=""></div>
				<img id="g-menikah-dengan-karakter-anime_19-submedium-3-img" class="g-aiImg" alt="" src="./images/menikah-dengan-karakter-anime_19-submedium-3.png"/>
				<div id="g-ai16-1" class="g-Layer_1 g-aiAbs g-aiPointText" style="top:12.2033%;margin-top:-34.6px;left:24.0217%;width:275px;">
					<p class="g-pstyle0">1st WAVE</p>
				</div>
				<div id="g-ai16-2" class="g-Layer_1 g-aiAbs g-aiPointText" style="top:17.0771%;margin-top:-21.6px;left:24.0217%;width:273px;">
					<p class="g-pstyle1">DIGISEXUALITY</p>
				</div>
				<div id="g-ai16-3" class="g-Layer_1 g-aiAbs g-aiPointText" style="top:20.4719%;margin-top:-13.8px;left:24.0217%;width:273px;">
					<p class="g-pstyle2">MEDIATING TECHNOLOGY</p>
				</div>
				<div id="g-ai16-4" class="g-Layer_1 g-aiAbs" style="top:22.375%;left:24.2833%;width:49.0196%;">
					<p>Allow for new or enhanced forms of partnered sexual activity.</p>
				</div>
				<div id="g-ai16-5" class="g-Layer_1 g-aiAbs" style="top:33.875%;left:24.2833%;width:49.0196%;">
					<p>Examples: digital pornography, social media, online dating/hook-up apps, web camming, teledidonics, new sex toys, body hacking, tracking and quantification</p>
				</div>
				<div id="g-ai16-6" class="g-Layer_1 g-aiAbs g-aiPointText" style="top:58.8283%;margin-top:-34.6px;left:25.0393%;width:275px;">
					<p class="g-pstyle0">2nd WAVE</p>
				</div>
				<div id="g-ai16-7" class="g-Layer_1 g-aiAbs g-aiPointText" style="top:63.7021%;margin-top:-21.6px;left:25.0393%;width:273px;">
					<p class="g-pstyle1">DIGISEXUALITY</p>
				</div>
				<div id="g-ai16-8" class="g-Layer_1 g-aiAbs g-aiPointText" style="top:67.0969%;margin-top:-13.8px;left:25.0393%;width:273px;">
					<p class="g-pstyle2">IMMERSIVE TECHNOLOGY</p>
				</div>
				<div id="g-ai16-9" class="g-Layer_1 g-aiAbs" style="top:69%;left:25.3008%;width:49.0196%;">
					<p>Create opportunities for new forms of sexual experience not dependent on human partners.</p>
				</div>
				<div id="g-ai16-10" class="g-Layer_1 g-aiAbs" style="top:80.5%;left:25.3008%;width:49.0196%;">
					<p>Examples: robots, artificial agents, virtual reality, augmented reality.</p>
				</div>
			</div>
		
			<!-- Artboard: medium-3 -->
			<div id="g-menikah-dengan-karakter-anime_19-medium-3" class="g-artboard" style="width:690px; height:570px;" data-aspect-ratio="1.211" data-min-width="690" data-max-width="919">
		<div style=""></div>
				<img id="g-menikah-dengan-karakter-anime_19-medium-3-img" class="g-aiImg" alt="" src="./images/menikah-dengan-karakter-anime_19-medium-3.png"/>
				<div id="g-ai17-1" class="g-Layer_1 g-aiAbs g-aiPointText" style="top:14.145%;margin-top:-34.6px;left:7.5234%;width:275px;">
					<p class="g-pstyle0">1st WAVE</p>
				</div>
				<div id="g-ai17-2" class="g-Layer_1 g-aiAbs g-aiPointText" style="top:20.9854%;margin-top:-21.6px;left:7.5234%;width:273px;">
					<p class="g-pstyle1">DIGISEXUALITY</p>
				</div>
				<div id="g-ai17-3" class="g-Layer_1 g-aiAbs g-aiPointText" style="top:25.9255%;margin-top:-13.8px;left:7.5234%;width:273px;">
					<p class="g-pstyle2">MEDIATING TECHNOLOGY</p>
				</div>
				<div id="g-ai17-4" class="g-Layer_1 g-aiAbs" style="top:28.5965%;left:7.7167%;width:36.2319%;">
					<p>Allow for new or enhanced forms of partnered sexual activity.</p>
				</div>
				<div id="g-ai17-5" class="g-Layer_1 g-aiAbs g-aiPointText" style="top:48.3555%;margin-top:-34.6px;left:54.8261%;width:275px;">
					<p class="g-pstyle0">2nd WAVE</p>
				</div>
				<div id="g-ai17-6" class="g-Layer_1 g-aiAbs" style="top:44.7368%;left:7.7167%;width:36.2319%;">
					<p>Examples: digital pornography, social media, online dating/hook-up apps, web camming, teledidonics, new sex toys, body hacking, tracking and quantification</p>
				</div>
				<div id="g-ai17-7" class="g-Layer_1 g-aiAbs g-aiPointText" style="top:55.1959%;margin-top:-21.6px;left:54.8261%;width:273px;">
					<p class="g-pstyle1">DIGISEXUALITY</p>
				</div>
				<div id="g-ai17-8" class="g-Layer_1 g-aiAbs g-aiPointText" style="top:60.136%;margin-top:-13.8px;left:54.8261%;width:273px;">
					<p class="g-pstyle2">IMMERSIVE TECHNOLOGY</p>
				</div>
				<div id="g-ai17-9" class="g-Layer_1 g-aiAbs" style="top:62.807%;left:55.0194%;width:36.2319%;">
					<p>Create opportunities for new forms of sexual experience not dependent on human partners.</p>
				</div>
				<div id="g-ai17-10" class="g-Layer_1 g-aiAbs" style="top:78.9474%;left:55.0194%;width:36.2319%;">
					<p>Examples: robots, artificial agents, virtual reality, augmented reality.</p>
				</div>
			</div>
		
			<!-- Artboard: large-3 -->
			<div id="g-menikah-dengan-karakter-anime_19-large-3" class="g-artboard" style="width:920px; height:490px;" data-aspect-ratio="1.878" data-min-width="920" data-max-width="1399">
		<div style=""></div>
				<img id="g-menikah-dengan-karakter-anime_19-large-3-img" class="g-aiImg" alt="" src="./images/menikah-dengan-karakter-anime_19-large-3.png"/>
				<div id="g-ai18-1" class="g-Layer_1 g-aiAbs g-aiPointText" style="top:19.7209%;margin-top:-46.6px;left:7.3827%;width:360px;">
					<p class="g-pstyle0">1st WAVE</p>
				</div>
				<div id="g-ai18-2" class="g-Layer_1 g-aiAbs g-aiPointText" style="top:19.7209%;margin-top:-46.6px;left:54.8421%;width:360px;">
					<p class="g-pstyle0">2nd WAVE</p>
				</div>
				<div id="g-ai18-3" class="g-Layer_1 g-aiAbs g-aiPointText" style="top:30.3542%;margin-top:-28.7px;left:7.3827%;width:358px;">
					<p class="g-pstyle1">DIGISEXUALITY</p>
				</div>
				<div id="g-ai18-4" class="g-Layer_1 g-aiAbs g-aiPointText" style="top:30.3542%;margin-top:-28.7px;left:54.8421%;width:358px;">
					<p class="g-pstyle1">DIGISEXUALITY</p>
				</div>
				<div id="g-ai18-5" class="g-Layer_1 g-aiAbs g-aiPointText" style="top:37.9087%;margin-top:-18.8px;left:7.3827%;width:358px;">
					<p class="g-pstyle2">MEDIATING TECHNOLOGY</p>
				</div>
				<div id="g-ai18-6" class="g-Layer_1 g-aiAbs g-aiPointText" style="top:37.9087%;margin-top:-18.8px;left:54.8421%;width:358px;">
					<p class="g-pstyle2">IMMERSIVE TECHNOLOGY</p>
				</div>
				<div id="g-ai18-7" class="g-Layer_1 g-aiAbs" style="top:42.2449%;left:7.5767%;width:36.3043%;">
					<p>Allow for new or enhanced forms of partnered sexual activity.</p>
				</div>
				<div id="g-ai18-8" class="g-Layer_1 g-aiAbs" style="top:42.2449%;left:55.036%;width:36.3043%;">
					<p>Create opportunities for new forms of sexual experience not dependent on human partners.</p>
				</div>
				<div id="g-ai18-9" class="g-Layer_1 g-aiAbs" style="top:67.1429%;left:7.5767%;width:36.3043%;">
					<p>Examples: digital pornography, social media, online dating/hook-up apps, web camming, teledidonics, new sex toys, body hacking, tracking and quantification</p>
				</div>
				<div id="g-ai18-10" class="g-Layer_1 g-aiAbs" style="top:67.1429%;left:55.036%;width:36.3043%;">
					<p>Examples: robots, artificial agents, virtual reality, augmented reality.</p>
				</div>
			</div>
		
			<!-- Artboard: xlarge-3 -->
			<div id="g-menikah-dengan-karakter-anime_19-xlarge-3" class="g-artboard" style="width:1400px; height:670px;" data-aspect-ratio="2.09" data-min-width="1400">
		<div style=""></div>
				<img id="g-menikah-dengan-karakter-anime_19-xlarge-3-img" class="g-aiImg" alt="" src="./images/menikah-dengan-karakter-anime_19-xlarge-3.png"/>
				<div id="g-ai19-1" class="g-Layer_1 g-aiAbs g-aiPointText" style="top:17.4022%;margin-top:-67.6px;left:10.1553%;width:465px;">
					<p class="g-pstyle0">1st WAVE</p>
				</div>
				<div id="g-ai19-2" class="g-Layer_1 g-aiAbs g-aiPointText" style="top:17.4022%;margin-top:-67.6px;left:55.0838%;width:509px;">
					<p class="g-pstyle0">2nd WAVE</p>
				</div>
				<div id="g-ai19-3" class="g-Layer_1 g-aiAbs g-aiPointText" style="top:28.6438%;margin-top:-40.9px;left:10.1553%;width:458px;">
					<p class="g-pstyle1">DIGISEXUALITY</p>
				</div>
				<div id="g-ai19-4" class="g-Layer_1 g-aiAbs g-aiPointText" style="top:28.6438%;margin-top:-40.9px;left:55.0838%;width:506px;">
					<p class="g-pstyle1">DIGISEXUALITY</p>
				</div>
				<div id="g-ai19-5" class="g-Layer_1 g-aiAbs g-aiPointText" style="top:36.6706%;margin-top:-26.7px;left:10.1553%;width:506px;">
					<p class="g-pstyle2">MEDIATING TECHNOLOGY</p>
				</div>
				<div id="g-ai19-6" class="g-Layer_1 g-aiAbs g-aiPointText" style="top:36.6706%;margin-top:-26.7px;left:55.0838%;width:506px;">
					<p class="g-pstyle2">IMMERSIVE TECHNOLOGY</p>
				</div>
				<div id="g-ai19-7" class="g-Layer_1 g-aiAbs" style="top:41.0448%;left:10.3389%;width:34.3571%;">
					<p>Allow for new or enhanced forms of partnered sexual activity.</p>
				</div>
				<div id="g-ai19-8" class="g-Layer_1 g-aiAbs" style="top:41.0448%;left:55.2674%;width:34.3571%;">
					<p>Create opportunities for new forms of sexual experience not dependent on human partners.</p>
				</div>
				<div id="g-ai19-9" class="g-Layer_1 g-aiAbs" style="top:67.4627%;left:10.3389%;width:34.3571%;">
					<p>Examples: digital pornography, social media, online dating/hook-up apps, web camming, teledidonics, new sex toys, body hacking, tracking and quantification</p>
				</div>
				<div id="g-ai19-10" class="g-Layer_1 g-aiAbs" style="top:67.4627%;left:55.2674%;width:34.3571%;">
					<p>Examples: robots, artificial agents, virtual reality, augmented reality.</p>
				</div>
			</div>
	</div>

	<Paragraph
		--font-color ={fontColor}
		para={[
		"Selain menjalani hubungan parasosial, Kondo kemungkinan juga mengidap <a class='link-article' target='_blank' href='https://www.fastcompany.com/90303947/digisexuality-is-stepping-out-of-the-closet-keep-an-open-mind'><em>digisexual</em> gelombang kedua</a>. Memang Hatsune Miku yang dimiliki oleh Kondo belum mencapai ke titik itu. Namun intensitas perasaan Kondo, ditambah <a class='link-article' target='_blank' href='https://www.ndtv.com/world-news/2d-characters-cant-cheat-age-or-die-japanese-man-marries-a-hologram-of-hatsune-miku-1945838'>ketidaktertarikannya untuk berhubungan dengan perempuan nyata</a> membuatnya bisa dimasukkan ke kategori ini."
		]}
	/>

	<Paragraph
		--font-color ={fontColor}
		subjudul='Karnivora & Herbivora'
		para={[
		"Kondo adalah manifestasi dari pengasingan yang ia alami sejak masa remaja. Lebih dari itu, Kondo adalah hasil dari masyarakat yang tak lagi percaya lembaga pernikahan.",
		"Masyarakat Jepang yang patriarkis menempatkan perempuan sebagai warga kelas dua; tugas mereka hanya mengurus rumah tangga dan memberikan anak bagi sang suami yang bekerja mencari nafkah. Standar usang ini justru membuat pasangan muda Jepang sulit menikah. Sebagai gambaran, sekitar 40% pekerja Jepang sekarang merupakan <a class='link-article' target='_blank' href='https://www.theatlantic.com/business/archive/2017/07/japan-mystery-low-birth-rate/534291/'>pekerja serabutan</a> yang tak memiliki asuransi dan jaring pengaman lainnya. Sialnya, hanya 20% pekerja serabutan yang bisa mendapatkan pekerjaan permanen."
		
		]}
	/>

	<div id="g-menikah-dengan-karakter-anime_19-box" class="ai2html">
		<!-- Artboard: smallplus-4 -->
	<div id="g-menikah-dengan-karakter-anime_19-smallplus-4" class="g-artboard" style="max-width: 320px;max-height: 350px" data-aspect-ratio="0.914" data-min-width="0" data-max-width="509">
		<div style="padding: 0 0 109.375% 0;"></div>
				<img id="g-menikah-dengan-karakter-anime_19-smallplus-4-img" class="g-aiImg" alt="" src="./images/menikah-dengan-karakter-anime_19-smallplus-4.jpg"/>
				<div id="g-ai20-1" class="g-Layer_1 g-aiAbs g-aiPointText" style="top:89.2072%;margin-top:-20.2px;left:18.7538%;width:225px;">
					<p class="g-pstyle0">40% Pekerjanya adalah</p>
					<p class="g-pstyle0">pekerja serabutan</p>
				</div>
			</div>
		
			<!-- Artboard: submedium-4 -->
			<div id="g-menikah-dengan-karakter-anime_19-submedium-4" class="g-artboard" style="width:510px; height:460px;" data-aspect-ratio="1.109" data-min-width="510" data-max-width="689">
		<div style=""></div>
				<img id="g-menikah-dengan-karakter-anime_19-submedium-4-img" class="g-aiImg" alt="" src="./images/menikah-dengan-karakter-anime_19-submedium-4.jpg"/>
				<div id="g-ai21-1" class="g-Layer_1 g-aiAbs g-aiPointText" style="top:91.5707%;margin-top:-20.2px;left:30.3945%;width:225px;">
					<p class="g-pstyle0">40% Pekerjanya adalah</p>
					<p class="g-pstyle0">pekerja serabutan</p>
				</div>
			</div>
		
			<!-- Artboard: medium-4 -->
			<div id="g-menikah-dengan-karakter-anime_19-medium-4" class="g-artboard" style="width:690px; height:600px;" data-aspect-ratio="1.15" data-min-width="690" data-max-width="919">
		<div style=""></div>
				<img id="g-menikah-dengan-karakter-anime_19-medium-4-img" class="g-aiImg" alt="" src="./images/menikah-dengan-karakter-anime_19-medium-4.jpg"/>
				<div id="g-ai22-1" class="g-Layer_1 g-aiAbs g-aiPointText" style="top:90.6065%;margin-top:-26.6px;left:30.9916%;width:289px;">
					<p class="g-pstyle0">40% Pekerjanya adalah</p>
					<p class="g-pstyle0">pekerja serabutan</p>
				</div>
			</div>
		
			<!-- Artboard: large-4 -->
			<div id="g-menikah-dengan-karakter-anime_19-large-4" class="g-artboard" style="width:920px; height:470px;" data-aspect-ratio="1.957" data-min-width="920" data-max-width="1399">
		<div style=""></div>
				<img id="g-menikah-dengan-karakter-anime_19-large-4-img" class="g-aiImg" alt="" src="./images/menikah-dengan-karakter-anime_19-large-4.jpg"/>
				<div id="g-ai23-1" class="g-Layer_1 g-aiAbs g-aiPointText" style="top:65.6679%;margin-top:-26.6px;left:59.1336%;width:289px;">
					<p class="g-pstyle0">40% Pekerjanya adalah</p>
					<p class="g-pstyle0">pekerja serabutan</p>
				</div>
			</div>
		
			<!-- Artboard: xlarge-4 -->
			<div id="g-menikah-dengan-karakter-anime_19-xlarge-4" class="g-artboard" style="width:1400px; height:550px;" data-aspect-ratio="2.545" data-min-width="1400">
		<div style=""></div>
				<img id="g-menikah-dengan-karakter-anime_19-xlarge-4-img" class="g-aiImg" alt="" src="./images/menikah-dengan-karakter-anime_19-xlarge-4.jpg"/>
				<div id="g-ai24-1" class="g-Layer_1 g-aiAbs g-aiPointText" style="top:64.2577%;margin-top:-30.4px;left:62.1021%;width:324px;">
					<p class="g-pstyle0">40% Pekerjanya adalah</p>
					<p class="g-pstyle0">pekerja serabutan</p>
				</div>
			</div>
	</div>

	<Paragraph
		--font-color ={fontColor}
		para={[
		"Kerentanan ekonomi ini melahirkan fenomena kebudayaan baru: <a class='link-article' target='_blank' href='https://slate.com/news-and-politics/2009/06/japan-panics-about-the-rise-of-herbivores-young-men-who-shun-sex-don-t-spend-money-and-like-taking-walks.html'>perempuan ‘karnivora' dan laki-laki 'herbivora’</a>. Disebut begitu karena para perempuan bertingkah seperti karnivora: dominan dan lebih mengutamakan kehidupan mereka sendiri alih-alih tunduk kepada tekanan masyarakat untuk menikah. Sementara laki-laki yang lebih memilih untuk submisif, tidak mau berhubungan seks, dan merasa cukup dengan kehidupan mereka disebut ‘herbivora’.",
		"Sebagian lelaki herbivora beralih ke cinta virtual seperti Kondo. Alasannya sederhana: perempuan fiksi tidak bisa bohong, tidak mungkin selingkuh, dan yang terpenting, bisa mereka bentuk sesuai dengan keinginan. Pada akhirnya yang dicintai bukanlah suatu hal yang konkret, tapi sebuah ide yang tak bisa melawan."
		]}
	/>

	<div id="g-menikah-dengan-karakter-anime_19-box" class="ai2html">
		<!-- Artboard: smallplus-5 -->
	<div id="g-menikah-dengan-karakter-anime_19-smallplus-5" class="g-artboard" style="max-width: 320px;max-height: 240px" data-aspect-ratio="1.333" data-min-width="0" data-max-width="509">
		<div style="padding: 0 0 75% 0;"></div>
				<img id="g-menikah-dengan-karakter-anime_19-smallplus-5-img" class="g-aiImg" alt="" src="./images/menikah-dengan-karakter-anime_19-smallplus-5.png"/>
			</div>
		
			<!-- Artboard: submedium-5 -->
			<div id="g-menikah-dengan-karakter-anime_19-submedium-5" class="g-artboard" style="width:510px; height:390px;" data-aspect-ratio="1.308" data-min-width="510" data-max-width="689">
		<div style=""></div>
				<img id="g-menikah-dengan-karakter-anime_19-submedium-5-img" class="g-aiImg" alt="" src="./images/menikah-dengan-karakter-anime_19-submedium-5.png"/>
			</div>
		
			<!-- Artboard: medium-5 -->
			<div id="g-menikah-dengan-karakter-anime_19-medium-5" class="g-artboard" style="width:690px; height:480px;" data-aspect-ratio="1.438" data-min-width="690" data-max-width="919">
		<div style=""></div>
				<img id="g-menikah-dengan-karakter-anime_19-medium-5-img" class="g-aiImg" alt="" src="./images/menikah-dengan-karakter-anime_19-medium-5.png"/>
			</div>
		
			<!-- Artboard: large-5 -->
			<div id="g-menikah-dengan-karakter-anime_19-large-5" class="g-artboard" style="width:920px; height:600px;" data-aspect-ratio="1.533" data-min-width="920" data-max-width="1399">
		<div style=""></div>
				<img id="g-menikah-dengan-karakter-anime_19-large-5-img" class="g-aiImg" alt="" src="./images/menikah-dengan-karakter-anime_19-large-5.png"/>
			</div>
		
			<!-- Artboard: xlarge-5 -->
			<div id="g-menikah-dengan-karakter-anime_19-xlarge-5" class="g-artboard" style="width:1400px; height:650px;" data-aspect-ratio="2.154" data-min-width="1400">
		<div style=""></div>
				<img id="g-menikah-dengan-karakter-anime_19-xlarge-5-img" class="g-aiImg" alt="" src="./images/menikah-dengan-karakter-anime_19-xlarge-5.png"/>
			</div>
	</div>

	<Credit
		--fontfamily1={fontfamily1}
		--font-color = {fontColor}
		{ credit }
	/>
</main>

<style>
	.link-article {
		color: #148ba6;
		font-weight: bold;
	}

	.link-article:hover {
		text-decoration: underline;
	}

	.link-article:visited {
		color: #148ba6;
	}
	.divider {
		height:0.2rem;
		width:60%;
		background-color:black ;
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
	#g-menikah-dengan-karakter-anime_19-box ,
	#g-menikah-dengan-karakter-anime_19-box .g-artboard {
		margin:0 auto;
	}
	#g-menikah-dengan-karakter-anime_19-box p {
		margin:0;
	}
	#g-menikah-dengan-karakter-anime_19-box .g-aiAbs {
		position:absolute;
	}
	#g-menikah-dengan-karakter-anime_19-box .g-aiImg {
		position:absolute;
		top:0;
		display:block;
		width:100% !important;
	}
	#g-menikah-dengan-karakter-anime_19-box .g-aiSymbol {
		position: absolute;
		box-sizing: border-box;
	}
	#g-menikah-dengan-karakter-anime_19-box .g-aiPointText p { white-space: nowrap; }
	#g-menikah-dengan-karakter-anime_19-smallplus-cover {
		position:relative;
		overflow:hidden;
	}
	#g-menikah-dengan-karakter-anime_19-submedium-cover {
		position:relative;
		overflow:hidden;
	}
	#g-menikah-dengan-karakter-anime_19-medium-cover {
		position:relative;
		overflow:hidden;
	}
	#g-menikah-dengan-karakter-anime_19-large-cover {
		position:relative;
		overflow:hidden;
	}
	#g-menikah-dengan-karakter-anime_19-xlarge-cover {
		position:relative;
		overflow:hidden;
	}
	#g-menikah-dengan-karakter-anime_19-smallplus-1 {
		position:relative;
		overflow:hidden;
	}
	#g-menikah-dengan-karakter-anime_19-submedium-1 {
		position:relative;
		overflow:hidden;
	}
	#g-menikah-dengan-karakter-anime_19-medium-1 {
		position:relative;
		overflow:hidden;
	}
	#g-menikah-dengan-karakter-anime_19-large-1 {
		position:relative;
		overflow:hidden;
	}
	#g-menikah-dengan-karakter-anime_19-xlarge-1 {
		position:relative;
		overflow:hidden;
	}
	#g-menikah-dengan-karakter-anime_19-smallplus-2 {
		position:relative;
		overflow:hidden;
	}
	#g-menikah-dengan-karakter-anime_19-submedium-2 {
		position:relative;
		overflow:hidden;
	}
	#g-menikah-dengan-karakter-anime_19-medium-2 {
		position:relative;
		overflow:hidden;
	}
	#g-menikah-dengan-karakter-anime_19-large-2 {
		position:relative;
		overflow:hidden;
	}
	#g-menikah-dengan-karakter-anime_19-xlarge-2 {
		position:relative;
		overflow:hidden;
	}
	#g-menikah-dengan-karakter-anime_19-smallplus-3 {
		position:relative;
		overflow:hidden;
	}
	#g-menikah-dengan-karakter-anime_19-smallplus-3 p {
		font-weight:500;
		line-height:14px;
		opacity:1;
		letter-spacing:0em;
		font-size:11px;
		text-align:left;
		color:rgb(0,0,0);
		text-transform:none;
		padding-bottom:0;
		padding-top:0;
		mix-blend-mode:normal;
		font-style:normal;
		height:auto;
		position:static;
		font-family: 'Roboto Mono', monospace;
		white-space: normal;
	}
	#g-menikah-dengan-karakter-anime_19-smallplus-3 .g-pstyle0 {
		line-height:58px;
		height:58px;
		font-size:48px;
	}
	#g-menikah-dengan-karakter-anime_19-smallplus-3 .g-pstyle1 {
		line-height:35px;
		height:35px;
		font-size:30px;
	}
	#g-menikah-dengan-karakter-anime_19-smallplus-3 .g-pstyle2 {
		line-height:23px;
		height:23px;
		font-size:19px;
	}
	#g-menikah-dengan-karakter-anime_19-submedium-3 {
		position:relative;
		overflow:hidden;
	}
	#g-menikah-dengan-karakter-anime_19-submedium-3 p {
		font-weight:500;
		line-height:15px;
		opacity:1;
		letter-spacing:0em;
		font-size:12px;
		text-align:left;
		color:rgb(0,0,0);
		text-transform:none;
		padding-bottom:0;
		padding-top:0;
		mix-blend-mode:normal;
		font-style:normal;
		height:auto;
		position:static;
		font-family: 'Roboto Mono', monospace;
		white-space: normal;
	}
	#g-menikah-dengan-karakter-anime_19-submedium-3 .g-pstyle0 {
		line-height:63px;
		height:63px;
		font-size:53px;
	}
	#g-menikah-dengan-karakter-anime_19-submedium-3 .g-pstyle1 {
		line-height:39px;
		height:39px;
		font-size:32px;
	}
	#g-menikah-dengan-karakter-anime_19-submedium-3 .g-pstyle2 {
		line-height:25px;
		height:25px;
		font-size:21px;
	}
	#g-menikah-dengan-karakter-anime_19-medium-3 {
		position:relative;
		overflow:hidden;
	}
	#g-menikah-dengan-karakter-anime_19-medium-3 p {
		font-weight:500;
		line-height:15px;
		opacity:1;
		letter-spacing:0em;
		font-size:12px;
		text-align:left;
		color:rgb(0,0,0);
		text-transform:none;
		padding-bottom:0;
		padding-top:0;
		mix-blend-mode:normal;
		font-style:normal;
		height:auto;
		position:static;
		font-family: 'Roboto Mono', monospace;
		white-space: normal;
	}
	#g-menikah-dengan-karakter-anime_19-medium-3 .g-pstyle0 {
		line-height:63px;
		height:63px;
		font-size:53px;
	}
	#g-menikah-dengan-karakter-anime_19-medium-3 .g-pstyle1 {
		line-height:39px;
		height:39px;
		font-size:32px;
	}
	#g-menikah-dengan-karakter-anime_19-medium-3 .g-pstyle2 {
		line-height:25px;
		height:25px;
		font-size:21px;
	}
	#g-menikah-dengan-karakter-anime_19-large-3 {
		position:relative;
		overflow:hidden;
	}
	#g-menikah-dengan-karakter-anime_19-large-3 p {
		font-weight:500;
		line-height:20px;
		opacity:1;
		letter-spacing:0em;
		font-size:17px;
		text-align:left;
		color:rgb(0,0,0);
		text-transform:none;
		padding-bottom:0;
		padding-top:0;
		mix-blend-mode:normal;
		font-style:normal;
		height:auto;
		position:static;
		font-family: 'Roboto Mono', monospace;
		white-space: normal;
	}
	#g-menikah-dengan-karakter-anime_19-large-3 .g-pstyle0 {
		line-height:84px;
		height:84px;
		font-size:70px;
	}
	#g-menikah-dengan-karakter-anime_19-large-3 .g-pstyle1 {
		line-height:52px;
		height:52px;
		font-size:43px;
	}
	#g-menikah-dengan-karakter-anime_19-large-3 .g-pstyle2 {
		line-height:34px;
		height:34px;
		font-size:28px;
	}
	#g-menikah-dengan-karakter-anime_19-xlarge-3 {
		position:relative;
		overflow:hidden;
	}
	#g-menikah-dengan-karakter-anime_19-xlarge-3 p {
		font-weight:500;
		line-height:29px;
		opacity:1;
		letter-spacing:0em;
		font-size:24px;
		text-align:left;
		color:rgb(0,0,0);
		text-transform:none;
		padding-bottom:0;
		padding-top:0;
		mix-blend-mode:normal;
		font-style:normal;
		height:auto;
		position:static;
		font-family: 'Roboto Mono', monospace;
		white-space: normal;
	}
	#g-menikah-dengan-karakter-anime_19-xlarge-3 .g-pstyle0 {
		line-height:122px;
		height:122px;
		font-size:101px;
	}
	#g-menikah-dengan-karakter-anime_19-xlarge-3 .g-pstyle1 {
		line-height:74px;
		height:74px;
		font-size:62px;
	}
	#g-menikah-dengan-karakter-anime_19-xlarge-3 .g-pstyle2 {
		line-height:48px;
		height:48px;
		font-size:40px;
	}
	#g-menikah-dengan-karakter-anime_19-smallplus-4 {
		position:relative;
		overflow:hidden;
	}
	#g-menikah-dengan-karakter-anime_19-smallplus-4 p {
		font-weight:500;
		line-height:19px;
		height:auto;
		opacity:1;
		letter-spacing:0em;
		font-size:16px;
		text-align:left;
		color:rgb(0,0,0);
		text-transform:none;
		padding-bottom:0;
		padding-top:0;
		mix-blend-mode:normal;
		font-style:normal;
		position:static;
		font-family: 'Roboto Mono', monospace;
		white-space: normal;
	}
	#g-menikah-dengan-karakter-anime_19-smallplus-4 .g-pstyle0 {
		height:19px;
	}
	#g-menikah-dengan-karakter-anime_19-submedium-4 {
		position:relative;
		overflow:hidden;
	}
	#g-menikah-dengan-karakter-anime_19-submedium-4 p {
		font-weight:500;
		line-height:19px;
		height:auto;
		opacity:1;
		letter-spacing:0em;
		font-size:16px;
		text-align:left;
		color:rgb(0,0,0);
		text-transform:none;
		padding-bottom:0;
		padding-top:0;
		mix-blend-mode:normal;
		font-style:normal;
		position:static;
		font-family: 'Roboto Mono', monospace;
		white-space: normal;
	}
	#g-menikah-dengan-karakter-anime_19-submedium-4 .g-pstyle0 {
		height:19px;
	}
	#g-menikah-dengan-karakter-anime_19-medium-4 {
		position:relative;
		overflow:hidden;
	}
	#g-menikah-dengan-karakter-anime_19-medium-4 p {
		font-weight:500;
		line-height:25px;
		height:auto;
		opacity:1;
		letter-spacing:0em;
		font-size:21px;
		text-align:left;
		color:rgb(0,0,0);
		text-transform:none;
		padding-bottom:0;
		padding-top:0;
		mix-blend-mode:normal;
		font-style:normal;
		position:static;
		font-family: 'Roboto Mono', monospace;
		white-space: normal;
	}
	#g-menikah-dengan-karakter-anime_19-medium-4 .g-pstyle0 {
		height:25px;
	}
	#g-menikah-dengan-karakter-anime_19-large-4 {
		position:relative;
		overflow:hidden;
	}
	#g-menikah-dengan-karakter-anime_19-large-4 p {
		font-weight:500;
		line-height:25px;
		height:auto;
		opacity:1;
		letter-spacing:0em;
		font-size:21px;
		text-align:left;
		color:rgb(0,0,0);
		text-transform:none;
		padding-bottom:0;
		padding-top:0;
		mix-blend-mode:normal;
		font-style:normal;
		position:static;
		font-family: 'Roboto Mono', monospace;
		white-space: normal;
	}
	#g-menikah-dengan-karakter-anime_19-large-4 .g-pstyle0 {
		height:25px;
	}
	#g-menikah-dengan-karakter-anime_19-xlarge-4 {
		position:relative;
		overflow:hidden;
	}
	#g-menikah-dengan-karakter-anime_19-xlarge-4 p {
		font-weight:500;
		line-height:29px;
		height:auto;
		opacity:1;
		letter-spacing:0em;
		font-size:24px;
		text-align:left;
		color:rgb(0,0,0);
		text-transform:none;
		padding-bottom:0;
		padding-top:0;
		mix-blend-mode:normal;
		font-style:normal;
		position:static;
		font-family: 'Roboto Mono', monospace;
		white-space: normal;
	}
	#g-menikah-dengan-karakter-anime_19-xlarge-4 .g-pstyle0 {
		height:29px;
	}
	#g-menikah-dengan-karakter-anime_19-smallplus-5 {
		position:relative;
		overflow:hidden;
	}
	#g-menikah-dengan-karakter-anime_19-submedium-5 {
		position:relative;
		overflow:hidden;
	}
	#g-menikah-dengan-karakter-anime_19-medium-5 {
		position:relative;
		overflow:hidden;
	}
	#g-menikah-dengan-karakter-anime_19-large-5 {
		position:relative;
		overflow:hidden;
	}
	#g-menikah-dengan-karakter-anime_19-xlarge-5 {
		position:relative;
		overflow:hidden;
	}

	@media only screen and (max-width:509px) {
		#g-menikah-dengan-karakter-anime_19-xlarge-cover,
		#g-menikah-dengan-karakter-anime_19-xlarge-1,
		#g-menikah-dengan-karakter-anime_19-xlarge-2,
		#g-menikah-dengan-karakter-anime_19-xlarge-3,
		#g-menikah-dengan-karakter-anime_19-xlarge-4,
		#g-menikah-dengan-karakter-anime_19-xlarge-5 {
			display:none;
		}

		#g-menikah-dengan-karakter-anime_19-large-cover,
		#g-menikah-dengan-karakter-anime_19-large-1,
		#g-menikah-dengan-karakter-anime_19-large-2,
		#g-menikah-dengan-karakter-anime_19-large-3,
		#g-menikah-dengan-karakter-anime_19-large-4,
		#g-menikah-dengan-karakter-anime_19-large-5 {
			display:none;
		}

		#g-menikah-dengan-karakter-anime_19-medium-cover,
		#g-menikah-dengan-karakter-anime_19-medium-1,
		#g-menikah-dengan-karakter-anime_19-medium-2,
		#g-menikah-dengan-karakter-anime_19-medium-3,
		#g-menikah-dengan-karakter-anime_19-medium-4,
		#g-menikah-dengan-karakter-anime_19-medium-5{
			display:none;
		}

		#g-menikah-dengan-karakter-anime_19-submedium-cover,
		#g-menikah-dengan-karakter-anime_19-submedium-1,
		#g-menikah-dengan-karakter-anime_19-submedium-2,
		#g-menikah-dengan-karakter-anime_19-submedium-3,
		#g-menikah-dengan-karakter-anime_19-submedium-4,
		#g-menikah-dengan-karakter-anime_19-submedium-5 {
			display:none;
		}

		#g-menikah-dengan-karakter-anime_19-smallplus-cover,
		#g-menikah-dengan-karakter-anime_19-smallplus-1,
		#g-menikah-dengan-karakter-anime_19-smallplus-2,
		#g-menikah-dengan-karakter-anime_19-smallplus-3,
		#g-menikah-dengan-karakter-anime_19-smallplus-4,
		#g-menikah-dengan-karakter-anime_19-smallplus-5 {
			display:block;
		}
	}

	@media only screen and (min-width:510px) and (max-width:689px) {
		#g-menikah-dengan-karakter-anime_19-xlarge-cover,
		#g-menikah-dengan-karakter-anime_19-xlarge-1,
		#g-menikah-dengan-karakter-anime_19-xlarge-2,
		#g-menikah-dengan-karakter-anime_19-xlarge-3,
		#g-menikah-dengan-karakter-anime_19-xlarge-4,
		#g-menikah-dengan-karakter-anime_19-xlarge-5{
			display:none;
		}

		#g-menikah-dengan-karakter-anime_19-large-cover,
		#g-menikah-dengan-karakter-anime_19-large-1,
		#g-menikah-dengan-karakter-anime_19-large-2,
		#g-menikah-dengan-karakter-anime_19-large-3,
		#g-menikah-dengan-karakter-anime_19-large-4,
		#g-menikah-dengan-karakter-anime_19-large-5 {
			display:none;
		}

		#g-menikah-dengan-karakter-anime_19-medium-cover,
		#g-menikah-dengan-karakter-anime_19-medium-1,
		#g-menikah-dengan-karakter-anime_19-medium-2,
		#g-menikah-dengan-karakter-anime_19-medium-3,
		#g-menikah-dengan-karakter-anime_19-medium-4,
		#g-menikah-dengan-karakter-anime_19-medium-5 {
			display:none;
		}

		#g-menikah-dengan-karakter-anime_19-submedium-cover,
		#g-menikah-dengan-karakter-anime_19-submedium-1,
		#g-menikah-dengan-karakter-anime_19-submedium-2,
		#g-menikah-dengan-karakter-anime_19-submedium-3,
		#g-menikah-dengan-karakter-anime_19-submedium-4,
		#g-menikah-dengan-karakter-anime_19-submedium-5{
			display:block;
		}

		#g-menikah-dengan-karakter-anime_19-smallplus-cover,
		#g-menikah-dengan-karakter-anime_19-smallplus-1,
		#g-menikah-dengan-karakter-anime_19-smallplus-2,
		#g-menikah-dengan-karakter-anime_19-smallplus-3,
		#g-menikah-dengan-karakter-anime_19-smallplus-4,
		#g-menikah-dengan-karakter-anime_19-smallplus-5 {
			display:none;
		}
	}

	@media only screen and (min-width:690px) and (max-width:919px) {
		#g-menikah-dengan-karakter-anime_19-xlarge-cover,
		#g-menikah-dengan-karakter-anime_19-xlarge-1,
		#g-menikah-dengan-karakter-anime_19-xlarge-2,
		#g-menikah-dengan-karakter-anime_19-xlarge-3,
		#g-menikah-dengan-karakter-anime_19-xlarge-4,
		#g-menikah-dengan-karakter-anime_19-xlarge-5 {
			display:none;
		}

		#g-menikah-dengan-karakter-anime_19-large-cover,
		#g-menikah-dengan-karakter-anime_19-large-1,
		#g-menikah-dengan-karakter-anime_19-large-2,
		#g-menikah-dengan-karakter-anime_19-large-3,
		#g-menikah-dengan-karakter-anime_19-large-4,
		#g-menikah-dengan-karakter-anime_19-large-5 {
			display:none;
		}

		#g-menikah-dengan-karakter-anime_19-medium-cover,
		#g-menikah-dengan-karakter-anime_19-medium-1,
		#g-menikah-dengan-karakter-anime_19-medium-2,
		#g-menikah-dengan-karakter-anime_19-medium-3,
		#g-menikah-dengan-karakter-anime_19-medium-4,
		#g-menikah-dengan-karakter-anime_19-medium-5{
			display:block;
		}

		#g-menikah-dengan-karakter-anime_19-submedium-cover,
		#g-menikah-dengan-karakter-anime_19-submedium-1,
		#g-menikah-dengan-karakter-anime_19-submedium-2,
		#g-menikah-dengan-karakter-anime_19-submedium-3,
		#g-menikah-dengan-karakter-anime_19-submedium-4,
		#g-menikah-dengan-karakter-anime_19-submedium-5 {
			display:none;
		}

		#g-menikah-dengan-karakter-anime_19-smallplus-cover,
		#g-menikah-dengan-karakter-anime_19-smallplus-1,
		#g-menikah-dengan-karakter-anime_19-smallplus-2,
		#g-menikah-dengan-karakter-anime_19-smallplus-3,
		#g-menikah-dengan-karakter-anime_19-smallplus-4,
		#g-menikah-dengan-karakter-anime_19-smallplus-5 {
			display:none;
		}
	}

	@media only screen and (min-width:920px) and (max-width:1399px) {
		#g-menikah-dengan-karakter-anime_19-xlarge-cover,
		#g-menikah-dengan-karakter-anime_19-xlarge-1,
		#g-menikah-dengan-karakter-anime_19-xlarge-2,
		#g-menikah-dengan-karakter-anime_19-xlarge-3,
		#g-menikah-dengan-karakter-anime_19-xlarge-4,
		#g-menikah-dengan-karakter-anime_19-xlarge-5{
			display:none;
		}

		#g-menikah-dengan-karakter-anime_19-large-cover,
		#g-menikah-dengan-karakter-anime_19-large-1,
		#g-menikah-dengan-karakter-anime_19-large-2,
		#g-menikah-dengan-karakter-anime_19-large-3,
		#g-menikah-dengan-karakter-anime_19-large-4,
		#g-menikah-dengan-karakter-anime_19-large-5	 {
			display:block;
		}

		#g-menikah-dengan-karakter-anime_19-medium-cover,
		#g-menikah-dengan-karakter-anime_19-medium-1,
		#g-menikah-dengan-karakter-anime_19-medium-2,
		#g-menikah-dengan-karakter-anime_19-medium-3,
		#g-menikah-dengan-karakter-anime_19-medium-4,
		#g-menikah-dengan-karakter-anime_19-medium-5{
			display:none;
		}

		#g-menikah-dengan-karakter-anime_19-submedium-cover,
		#g-menikah-dengan-karakter-anime_19-submedium-1,
		#g-menikah-dengan-karakter-anime_19-submedium-2,
		#g-menikah-dengan-karakter-anime_19-submedium-3,
		#g-menikah-dengan-karakter-anime_19-submedium-4,
		#g-menikah-dengan-karakter-anime_19-submedium-5 {
			display:none;
		}

		#g-menikah-dengan-karakter-anime_19-cover_smallplus,
		#g-menikah-dengan-karakter-anime_19-smallplus_1,
		#g-menikah-dengan-karakter-anime_19-smallplus_2,
		#g-menikah-dengan-karakter-anime_19-smallplus_3,
		#g-menikah-dengan-karakter-anime_19-smallplus_4,
		#g-menikah-dengan-karakter-anime_19-smallplus_5
		 {
			display:none;
		}
	}

	@media only screen and (min-width:1400px) {
		#g-menikah-dengan-karakter-anime_19-xlarge-cover,
		#g-menikah-dengan-karakter-anime_19-xlarge-1,
		#g-menikah-dengan-karakter-anime_19-xlarge-2,
		#g-menikah-dengan-karakter-anime_19-xlarge-3,
		#g-menikah-dengan-karakter-anime_19-xlarge-4,
		#g-menikah-dengan-karakter-anime_19-xlarge-5 {
			display:block;
		}

		#g-menikah-dengan-karakter-anime_19-large-cover,
		#g-menikah-dengan-karakter-anime_19-large-1,
		#g-menikah-dengan-karakter-anime_19-large-2,
		#g-menikah-dengan-karakter-anime_19-large-3,
		#g-menikah-dengan-karakter-anime_19-large-4,
		#g-menikah-dengan-karakter-anime_19-large-5 {
			display:none;
		}

		#g-menikah-dengan-karakter-anime_19-medium-cover,
		#g-menikah-dengan-karakter-anime_19-medium-1,
		#g-menikah-dengan-karakter-anime_19-medium-2,
		#g-menikah-dengan-karakter-anime_19-medium-3,
		#g-menikah-dengan-karakter-anime_19-medium-4,
		#g-menikah-dengan-karakter-anime_19-medium-5 {
			display:none;
		}

		#g-menikah-dengan-karakter-anime_19-submedium-cover,
		#g-menikah-dengan-karakter-anime_19-submedium-1,
		#g-menikah-dengan-karakter-anime_19-submedium-2,
		#g-menikah-dengan-karakter-anime_19-submedium-3,
		#g-menikah-dengan-karakter-anime_19-submedium-4,
		#g-menikah-dengan-karakter-anime_19-submedium-5 {
			display:none;
		}

		#g-menikah-dengan-karakter-anime_19-smallplus-cover,
		#g-menikah-dengan-karakter-anime_19-smallplus-1,
		#g-menikah-dengan-karakter-anime_19-smallplus-2,
		#g-menikah-dengan-karakter-anime_19-smallplus-3,
		#g-menikah-dengan-karakter-anime_19-smallplus-4,
		#g-menikah-dengan-karakter-anime_19-smallplus-5 {
			display:none;
		}
	}

</style>