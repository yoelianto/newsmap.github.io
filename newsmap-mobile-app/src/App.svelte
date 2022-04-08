<script>

	import VoronoiNewsmap from './VoronoiNewsmap.svelte'
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
	import { getToken } from './api';
	import { onMount } from 'svelte'

	let y
	let showHeader = true
	let showMenu = false

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
		per_page: 5
	}

	let paramsNasional = {
		from: moment().subtract(7, 'd').format('YYYY-MM-DD'),
		to: moment().format('YYYY-MM-DD'),
		sort_by: 'published_date', 
		sort_dir: 'desc',
		per_page: 5,
		media_scope: 'Nasional'
	}

	let paramsDaerah = {
		from: moment().subtract(7, 'd').format('YYYY-MM-DD'),
		to: moment().format('YYYY-MM-DD'),
		sort_by: 'published_date', 
		sort_dir: 'desc',
		per_page: 5,
		media_scope: 'Daerah'
	}


</script>

<svelte:head>
	<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
</svelte:head>

<svelte:window bind:scrollY={y} />

<!-- svelte-ignore empty-block -->
{#await getToken()}
<p>...waiting</p>
{:then data}
<main>
	<div class="container">
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

		<VoronoiNewsmap 
			bind:margin={margin}	
		/>
		<!-- <Newsmap
			margin={margin}
			--fontfamily1 ={fontfamily1}
			--fontfamily2={fontfamily2}
			--color-brand-red={colorBrandRed}
			--color-brand-blue={colorBrandBlue}
			--color-brand-darkblue={colorBrandDarkBlue}
		/> -->
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
			author = {author}
			authorprofileimage = {authorprofileimage}
			authorprofilealt = {author}
			--fontfamily1 ={fontfamily1}
			--fontfamily2={fontfamily2}
			--color-brand-darkblue={colorBrandDarkBlue}
		/>
		<Rewara
			title='REWARA'  
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
		<Video
			title='SHORT VIDEOS'
			--fontfamily1 ={fontfamily1}
			--fontfamily2={fontfamily2}
		/>
		<Podcast  
			--fontfamily1 ={fontfamily1}
			--fontfamily2={fontfamily2}
		/>
		<Menu
			--fontfamily3={fontfamily3}
			showMenu = { y < 50}
		/>
	</div>
</main>
{:catch error}
<p>An error occurred!</p>
{/await}

<style>
	main {
		margin: 0 auto;
		width:100vw;
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
		width:100vw;
	}

	@media (min-width: 640px) {
	}
</style>