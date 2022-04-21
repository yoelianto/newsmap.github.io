<script>

	import VoronoiNewsmap from './VoronoiNewsmap.svelte'
	import Newstensity from './Newstensity.svelte'
	// import LabelNewsmap from './LabelNewsmap.svelte'
	import Header from './Header.svelte'
	// import Newsmap from './Newsmap.svelte'
	import Original from './JurnoOriginal.svelte'
	import Sentiment from './Sentiment.svelte'
	import Deduktif from './Deduktif.svelte'
	import News from './News.svelte'
	import Podcast from './Podcast.svelte'
	import Menu from './Menu.svelte'
	import Rewara from './Rewara.svelte'
	import Video from './Video.svelte'
	import moment from 'moment';
	import { afterUpdate, onMount } from 'svelte'
	// import DeviceDetector from "svelte-device-detector"

	let y
	let showHeader = true
	let showMenu = false
	let moveIn = false
	let name, pos, neg, neu, count, img

	const modalIn = () => {
		moveIn = true
	}
	const modalOut = () => {
		moveIn = false
	}

	let margin;
	let fontfamily1 = "Roboto Mono",
		fontfamily2 = "Roboto",
		fontfamily3 = "Jost";
		
	let colorBrandWhite = "#fafafa",
		colorBrandRed = "#ef5959",
		colorBrandDarkBlue = "#242053",
		colorBrandBlue ="#A4D9D2";

	let author = "Ahsan Ridhoi";
	let authorprofileimage = "./image/ahsan.png";

	let params = {
		from: moment().subtract(7, 'd').format('YYYY-MM-DD'),
		to: moment().format('YYYY-MM-DD'),
		sort_by: 'published_date', 
		sort_dir: 'desc',
		per_page: 10
	}

	let paramsNasional = {
		from: moment().subtract(7, 'd').format('YYYY-MM-DD'),
		to: moment().format('YYYY-MM-DD'),
		sort_by: 'published_date', 
		sort_dir: 'desc',
		per_page: 10,
		media_scope: 'Nasional'
	}

	let paramsDaerah = {
		from: moment().subtract(7, 'd').format('YYYY-MM-DD'),
		to: moment().format('YYYY-MM-DD'),
		sort_by: 'published_date', 
		sort_dir: 'desc',
		per_page: 10,
		media_scope: 'Daerah'
	}

	afterUpdate(() => {
		for(const element of document.body.querySelectorAll('main')) {
			if(element.nextElementSibling) {
				element.nextElementSibling.remove();
			}
		}
	});

</script>

<svelte:head>
	<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
</svelte:head>

<svelte:window bind:scrollY={y} />

<!-- svelte-ignore empty-block -->
<main>
	<div class="container">
		<Newstensity
			bind:moveIn
			bind:name
			bind:pos
			bind:neg
			bind:neu
			bind:count
			bind:img
			on:modalOut = {modalOut}
			params={params}
		/>

		<Header
			bind:height={margin}
			--fontfamily3={fontfamily3}
			--color-brand-white={colorBrandWhite}
			--color-brand-red={colorBrandRed}
			--color-brand-blue={colorBrandBlue}
			showHeader = { y < 50}
		/>

		<!-- <LabelNewsmap
			bind:margin={margin}
			--fontfamily2={fontfamily2}
		/> -->
		<article class='headlines'>
			<VoronoiNewsmap
			/>

			<Sentiment
				--fontfamily1={fontfamily1}
				--fontfamily2={fontfamily2}
				params={params}
				on:modalIn = {modalIn}
				bind:name
				bind:pos
				bind:neg
				bind:neu
				bind:count
				bind:img
			/>
		</article>
		
		<Original
			--fontfamily1={fontfamily1}
			--fontfamily2={fontfamily2}
			--color-brand-red={colorBrandRed}
		/>
		<Deduktif 
			title="Menelusuri Indahnya Jalur Pantai Pangandaran"
			author = {author}
			authorprofileimage = {authorprofileimage}
			authorprofilealt = {author}
			--fontfamily1={fontfamily1}
			--fontfamily2={fontfamily2}
			--color-brand-darkblue={colorBrandDarkBlue}
		/>
		<News 
			title='INFOGRAM'  
			--fontfamily1 ={fontfamily1}
			--fontfamily2={fontfamily2}
		/>
		<Video
			title='VIDEO'
			--fontfamily1 ={fontfamily1}
			--fontfamily2={fontfamily2}
		/>
		<Podcast  
			--fontfamily1 ={fontfamily1}
			--fontfamily2={fontfamily2}
		/>
		<News 
			title='NASIONAL'  
			--fontfamily1 ={fontfamily1}
			--fontfamily2={fontfamily2}
			params={paramsNasional}
		/>
		<News 
			title='DAERAH'  
			--fontfamily1 ={fontfamily1}
			--fontfamily2={fontfamily2}
			params={paramsDaerah}
		/>
		<Rewara
			title='REWARA'  
			--fontfamily1 ={fontfamily1}
			--fontfamily2={fontfamily2}
		/>
		
		<Menu
			--fontfamily3={fontfamily3}
			showMenu = { y < 50}
		/>
	</div>
</main>

<style>
	main {
		margin: 0 auto;
		overflow-x: hidden;	
	}
	.headlines {
		display: flex;
		flex-direction: row;
		margin: 0 auto;
	}

	.container {
		display: flex;
		flex-direction: column;
	}


	@media only screen /*xtrasmall*/
	and (max-width: 575px) {
		.headlines {
			flex-direction: column;
			margin-top: 31vw;
		}
	}
	@media only screen /*small*/
	and (min-width: 576px)
	and (max-width: 767px) {
		.headlines {
			flex-direction: column;
		}
	}
	@media only screen /*medium*/
	and (min-width: 768px)
	and (max-width: 991px) {
		.headlines {
			flex-direction: column;
		}
	}
	@media only screen /*large*/
	and (min-width: 992px)
	and (max-width: 1199px) {

	}
	@media only screen /*xtralarge*/
	and (min-width: 1200px) {
		.headlines {
			margin-top:8vw;
		}
	}

</style>