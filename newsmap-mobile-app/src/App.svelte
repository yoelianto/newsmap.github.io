<script>
	import Header from './Header.svelte'
	import Newsmap from './Newsmap.svelte'
	import Original from './NewsmapOriginal.svelte'
	import Sentiment from './Sentiment.svelte'
	import Deduktif from './Deduktif.svelte'
	import News from './News.svelte'
	import Podcast from './Podcast.svelte'
	import Menu from './Menu.svelte'
	import Rewara from './Rewara.svelte'
	import Video from './Video.svelte'
	import moment from 'moment';
	import { getToken } from './api';

	let margin;
	let fontfamily1 = "Roboto Mono",
		fontfamily2 = "Roboto",
		fontfamily3 = "Jost";
	let author = "Ahsan Ridhoi";
	let authorprofileimage = "./image/ahsan.png";
	let deduktifheader = "./image/Menelusuri-Indahnya-Jalur-Pantai-Pangandaran.png"
	let deduktifurl = "https://newsmap.id/article/menelusuri-indahnya-jalur-pantai-pangandaran"

	let trendingnews = [
		{
			title: "Warga Batu Merah Blokir Jalan",
			web: "malukuterkini.com",
			url:"https://newsmap.id/news/warga-batu-merah-blokir-jalan",
			thumb:"https://www.malukuterkini.com/wp-content/uploads/2022/03/BATU-MERAH-230322-1-OK.jpg"
		},
		{
			title: "NATO likely to approve more troops for its eastern flank -- secretary general",
			web: "theedgemarkets.com",
			url:"https://newsmap.id/news/nato-likely-to-approve-more-troops-for-its-eastern-flank----secretary-general",
			thumb:"https://assets.theedgemarkets.com/jens_stoltenberg_20220323235228_reuters.jpg?.zxPjwhTJThV3US4d74bRpjhsRiu2fqH"
		},
		{
			title: "Gubernur Olly Larang Pejabat Pemprov Sulut ke Luar Daerah Selama Pemeriksaan BPK",
			web: "indimanado.com",
			url:"https://newsmap.id/news/gubernur-olly-larang-pejabat-pemprov-sulut-ke-luar-daerah-selama-pemeriksaan-bpk",
			thumb:"https://media.binosaurus.com/ocr/image/0b36c2b54b7a4726b10a9ed040bd7844/https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEibHJ1If-EMxrhK-T3en2rNr5RBypg3r0hlt2A70fQkhLOv2k6lwKu88yLsOqrpj3E85emQxHLI_3WK_wEjvsYsWk3Lx6yxuB5NoVpGe59C9VHp26JFP-o4vrT5SwylFt7mIv8WLgveVDkY74ovXvQ_F0g6440uX3U6g5MV7LJ8SJqUT9kugV7bO0NI/w1200-h630-p-k-no-nu/20220323_234526.jpg"
		},
		{
			title: "AHY Beri Kuliah Umum: Menyongsong Indonesia Emas 2045 Perlu Persiapan SDM",
			web: "majalahintrust.com",
			url:"https://newsmap.id/news/ahy-beri-kuliah-umum--menyongsong-indonesia-emas-2045-perlu-persiapan-sdm",
			thumb:"https://majalahintrust.com/wp-content/uploads/2022/03/IMG_20220323_164026-1024x716.jpg"
		},
		{
			title: "Sekda Kotabaru Buka Pembinaan TLHP BPK-RI",
			web: "apahabar.com",
			url:"https://newsmap.id/news/sekda-kotabaru-buka-pembinaan-tlhp-bpk-ri",
			thumb:"https://apahabar.com/wp-content/uploads/2022/03/5C66A133-2644-4F67-8D5D-842C2D333AD2-e1648050198433.jpeg"
		},
		{
			title: "Cresco Labs to buy Columbia Care in US$2 billion cannabis deal",
			web: "theedgemarkets.com",
			url:"https://newsmap.id/news/cresco-labs-to-buy-columbia-care-in-us-2-billion-cannabis-deal",
			thumb:"https://assets.theedgemarkets.com/cresco_labs_inc_20220323234305_bloomberg.jpg?J9PlSV3ippKoKI.emJuBy2nSCnNhep5v"
		},
		{
			title: "Bentuk Kepedulian, Tim Sambang Polwan Polres Kapuas Bagikan Sembako Kepada Warga",
			web: "kobarnews.com",
			url:"https://newsmap.id/news/bentuk-kepedulian--tim-sambang-polwan-polres-kapuas-bagikan-sembako-kepada-warga",
			thumb:"http://kobarnews.com/wp-content/uploads/2022/03/WhatsApp-Image-2022-03-23-at-16.41.10.jpeg"
		},
		{
			title: "Bentuk Pencegahan, Polsek Kapuas Timur Sosialisasikan Prokes 5M",
			web: "kobarnews.com",
			url:"https://newsmap.id/news/bentuk-pencegahan--polsek-kapuas-timur-sosialisasikan-prokes-5m",
			thumb:"http://kobarnews.com/wp-content/uploads/2022/03/WhatsApp-Image-2022-03-23-at-16.40.43.jpeg"
		},
		{
			title: "Noor Azri Noor Azerai now joins lingerie maker Caely as director",
			web: "theedgemarkets.com",
			url:"https://newsmap.id/news/noor-azri-noor-azerai-now-joins-lingerie-maker-caely-as-director",
			thumb:"https://assets.theedgemarkets.com/Caely-Holdings_www.caelyholdings.com__4.jpg?0pGPiPjvgy8da0PuXRLACauU24fTPm.y"
		},
		{
			title: "Sosialisasikan Imbauan Kebakaran Hutan dan Lahan Kepada Warga, Ini Yang di Sampaikan Kapolsek Kapuas Murung",
			web: "kobarnews.com",
			url:"https://newsmap.id/news/sosialisasikan-imbauan--kebakaran-hutan-dan-lahan-kepada-warga--ini-yang-di-sampaikan-kapolsek-kapuas-murung",
			thumb:"https://media.binosaurus.com/ocr/image/98932bab8ad44868b8d91a7dfd1621ea/http://kobarnews.com/wp-content/uploads/2022/03/WhatsApp-Image-2022-03-23-at-16.40.31.jpeg"
		}
		
	]

	let publicnews = [
		{
			title: "Jennifer Jill Ngebet Punya Keturunan di Usia 48 Tahun, Blak-blakan Gak Sudi Anaknya Mirip Ajun: Semoga Kayak Gue!",
			web: "rctiplus.com",
			url:"https://newsmap.id/news/jennifer-jill-ngebet-punya-keturunan-di-usia-48-tahun--blak-blakan-gak-sudi-anaknya-mirip-ajun--semoga-kayak-gue-",
			thumb:"https://img.herstory.co.id/articles/archive_20220323/ajun-perwira-20220323-154219-thumb.jpg"
		},
		{
			title: "Bantu Atasi Keluhan Tulang Belakang, Dooglee Indonesia Luncurkan Lumbar Pillow.",
			web: "mediaindonesia.com",
			url:"https://newsmap.id/news/bantu-atasi-keluhan-tulang-belakang--dooglee-indonesia-luncurkan-lumbar-pillow-",
			thumb:"https://disk.mediaindonesia.com/thumbs/590x400/news/2022/03/f37947479ae5b69fb20c44161af48bf7.jpg"
		},
		{
			title: "SMF Perluas Pembiayaan Kredit bagi Pengusaha di Lombok NTT",
			web: "rctiplus.com",
			url:"https://newsmap.id/news/smf-perluas-pembiayaan-kredit-bagi-pengusaha-di-lombok-ntt",
			thumb:"https://static.rctiplus.id/media/600/files/fta_rcti/news/2161482.jpg"
		},
		{
			title: "Ribuan Da’i Ikut Bangun Desa Terpencil, Kemenag Mendukung",
			web: "viva.co.id",
			url:"https://newsmap.id/news/ribuan-da-i-ikut-bangun-desa-terpencil--kemenag-mendukung",
			thumb:"https://thumb.viva.co.id/media/frontend/thumbs3/2022/03/23/623b434f7b51b-da-i-bangun-desa-terpencil_665_374.jpg"
		},
		{
			title: "Wiku: Jatim Sumbang Kelurahan Terbanyak Kepatuhan Pakai Masker Rendah",
			web: "rctiplus.com",
			url:"https://newsmap.id/news/wiku--jatim-sumbang-kelurahan-terbanyak-kepatuhan-pakai-masker-rendah",
			thumb:"https://img.herstory.co.id/articles/archive_20220323/ajun-perwira-20220323-154219-thumb.jpg"
		},
		{
			title: "Jennifer Jill Ngebet Punya Keturunan di Usia 48 Tahun, Blak-blakan Gak Sudi Anaknya Mirip Ajun: Semoga Kayak Gue!",
			web: "rctiplus.com",
			url:"https://newsmap.id/news/jennifer-jill-ngebet-punya-keturunan-di-usia-48-tahun--blak-blakan-gak-sudi-anaknya-mirip-ajun--semoga-kayak-gue-",
			thumb:"https://static.rctiplus.id/media/600/files/fta_rcti/news/2161483.jpg"
		},
		{
			title: "Jennifer Jill Ngebet Punya Keturunan di Usia 48 Tahun, Blak-blakan Gak Sudi Anaknya Mirip Ajun: Semoga Kayak Gue!",
			web: "rctiplus.com",
			url:"https://newsmap.id/news/jennifer-jill-ngebet-punya-keturunan-di-usia-48-tahun--blak-blakan-gak-sudi-anaknya-mirip-ajun--semoga-kayak-gue-",
			thumb:"https://img.herstory.co.id/articles/archive_20220323/ajun-perwira-20220323-154219-thumb.jpg"
		},
		{
			title: "MUI Bantah Ajukan Permohonan ke KPI Soal 'Boikot' Ayu Ting Ting: Yang Diminta Hentikan Adalah Program Tertentu",
			web: "makassar.terkini.id",
			url:"https://newsmap.id/news/mui-bantah-ajukan-permohonan-ke-kpi-soal--boikot--ayu-ting-ting--yang-diminta-hentikan-adalah-program-tertentu",
			thumb:"https://media.binosaurus.com/ocr/image/c53c1ed2d99648edbffc4d66b0f0d0c3/https://makassar.terkini.id/wp-content/uploads/2022/03/terkiniid_screenshot_20220323-220004_instagram.jpg"
		},
		{
			title: "Soal Pawang Hujan di Mandalika, BMKG: Kami Gunakan Teknologi, Beda dengan Kearifan Lokal",
			web: "hetanews.com",
			url:"https://newsmap.id/news/soal-pawang-hujan-di-mandalika--bmkg--kami-gunakan-teknologi--beda-dengan-kearifan-lokal",
			thumb:"https://www.hetanews.com/images/20220323/20220323111027-77385-rara-isti-wulandari-pawang-hujan-motogp-mandalika.jpg"
		},
		{
			title: "Ketua Jokowi Mania Dipecat dari Komisaris Anak BUMN, Gara-gara Jadi Saksi Munarman?",
			web: "kronologi.id",
			url:"https://newsmap.id/news/ketua-jokowi-mania-dipecat-dari-komisaris-anak-bumn--gara-gara-jadi-saksi-munarman-",
			thumb:"https://img.herstory.co.id/articles/archive_20220323/ajun-perwira-20220323-154219-thumb.jpg"
		}
		
	]

	let params = {
		from: moment().subtract(7, 'd').format('YYYY-MM-DD'),
		to: moment().format('YYYY-MM-DD'),
		sort_by: 'published_date', 
		sort_dir: 'desc',
		per_page: 5,
	}
</script>

<!-- svelte-ignore empty-block -->
{#await getToken()}
{/await}

<svelte:head>
	<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
</svelte:head>

<main>
	<div class="container">
		<Header
			bind:height={margin}
			--fontfamily3={fontfamily3}
		/>
		<Newsmap
			margin={margin}
			--fontfamily1 ={fontfamily1}
			--fontfamily2={fontfamily2}
		/>
		<Sentiment
			--fontfamily1 ={fontfamily1}
			--fontfamily2={fontfamily2}
			params={params}
		/>
		<Original
			--fontfamily1 ={fontfamily1}
			--fontfamily2={fontfamily2}
		/>
		<Deduktif 
			title="Menelusuri Indahnya Jalur Pantai Pangandaran"
			deduktifurl = {deduktifurl}
			deduktifheader = {deduktifheader}
			author = {author}
			authorprofileimage = {authorprofileimage}
			authorprofilealt = {author}
			--fontfamily1 ={fontfamily1}
			--fontfamily2={fontfamily2}
		/>
		<Rewara
			title='REWARA'  
			--fontfamily1 ={fontfamily1}
			--fontfamily2={fontfamily2}
		/>
		<News 
			title='TRENDING NOW'  
			--fontfamily1 ={fontfamily1}
			--fontfamily2={fontfamily2}
			news = {trendingnews}
			params={params}
		/>
		<News 
			title='PUBLIC NEWS'  
			--fontfamily1 ={fontfamily1}
			--fontfamily2={fontfamily2}
			news = {publicnews}
			params={params}
		/>
		<Video
			title='YOUTUBE SHORTS'
			--fontfamily1 ={fontfamily1}
			--fontfamily2={fontfamily2}
		/>
		<Podcast  
			--fontfamily1 ={fontfamily1}
			--fontfamily2={fontfamily2}
		/>
		<Menu
			--fontfamily3={fontfamily3}
		/>
	</div>
</main>

<style>
	main {
		margin: 0 auto;
		/* max-width: 600px; */
		
	}

	/* h1 {
		color: #ff3e00;
		text-transform: uppercase;
		font-size: 4em;
		font-weight: 100;
	} */

	.container {
		display: flex;
		flex-direction: column;
	}

	@media (min-width: 640px) {
	}
</style>