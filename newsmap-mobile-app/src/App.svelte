<script>

	import VoronoiNewsmap from './VoronoiNewsmap.svelte'
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
			--color-brand-white={colorBrandWhite}
			--color-brand-red={colorBrandRed}
			--color-brand-blue={colorBrandBlue}
		/>

		<VoronoiNewsmap 
			bind:margin={margin}	
		/>

		<Newsmap
			margin={margin}
			--fontfamily1 ={fontfamily1}
			--fontfamily2={fontfamily2}
			--color-brand-red={colorBrandRed}
			--color-brand-blue={colorBrandBlue}
			--color-brand-darkblue={colorBrandDarkBlue}
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