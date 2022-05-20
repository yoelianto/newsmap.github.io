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
	import Footer from './Footer.svelte';
	// import DeviceDetector from "svelte-device-detector"


	let y
	let showHeader = true
	let showMenu = false
	let moveIn = false
	let id
	let topicId, newsId
	let type

	const modalIn = () => {
		moveIn = true
		type = 'people'
	}
	const modalTopicIn = () => {
		moveIn = true
		type = 'topic'
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
		from: moment().subtract(6, 'hour').format('YYYY-MM-DD h:mm:ss'),
		to: moment().format('YYYY-MM-DD h:mm:ss'),
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
			bind:id
			bind:topicId
			bind:type
			on:modalOut = {modalOut}
			params={params}
			--fontfamily1 = {fontfamily1}
			--fontfamily2 = {fontfamily2}
			--color-brand-dark-blue = {colorBrandDarkBlue}
			--color-brand-red = {colorBrandRed}
		/>

		<Header
			--fontfamily3={fontfamily3}
			--color-brand-white={colorBrandWhite}
			--color-brand-red={colorBrandRed}
			--color-brand-blue={colorBrandBlue}
			showHeader = { y < 50}
			page = 'indeks'
		/>

		<!-- <LabelNewsmap
			bind:margin={margin}
			--fontfamily2={fontfamily2}
		/> -->
		<article class='headlines'>
			<VoronoiNewsmap
				on:modalIn = {modalTopicIn}
				bind:topicId
				bind:newsId
				--color-brand-dark-blue={colorBrandDarkBlue}
			/>

			<Sentiment
				--fontfamily1={fontfamily1}
				--fontfamily2={fontfamily2}
				params={params}
				on:modalIn = {modalIn}
				bind:id
			/>
		</article>
		
		<Original
			--fontfamily1={fontfamily1}
			--fontfamily2={fontfamily2}
			--color-brand-red={colorBrandRed}
		/>
		<Deduktif 
			--fontfamily1={fontfamily1}
			--fontfamily2={fontfamily2}
			--color-brand-darkblue={colorBrandDarkBlue}
		/>
		<div class="discord-container">
			<h1 class='title'>KLUB SOSIAL JURNO</h1>

			<iframe class='discord' title='Klub Sosial Jurno' src="https://discord.com/widget?id=947748065794736168&theme=dark" allowtransparency="true" frameborder="0" sandbox="allow-popups allow-popups-to-escape-sandbox allow-same-origin allow-scripts"></iframe>
		</div>
		
		
		<News 
			title='INFOSIGHT'  
			--fontfamily1 ={fontfamily1}
			--fontfamily2={fontfamily2}
			params={params}
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

		<Footer 
			--color-brand-dark-blue = {colorBrandDarkBlue}
			--color-brand-white = {colorBrandWhite}
			--fontfamily2 = {fontfamily2}
		/>
		
		<Menu
			--fontfamily3={fontfamily3}
			showMenu = { y < 50}
		/>
	</div>
</main>

<style>
	.title {
        font-family: 'Roboto Mono', monospace;
        font-weight:700;
        font-size:1.5rem;
        color: #242053;
    }
	.discord-container {
		width:88%;
		max-width: 650px;
		
		margin: 0 auto;
	}
	.discord {
		width:100%;
		height: 400px;
	}
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
			margin-top: calc(0.6rem + 25px + 2.5rem)
		}
	}
	@media only screen /*small*/
	and (min-width: 576px)
	and (max-width: 767px) {
		.headlines {
			flex-direction: column;
		}
		.title {
            font-size:2rem;
        }
		.discord-container {
            max-width:900px;
            width:90%;
            margin:1rem auto;
        }
	}
	@media only screen /*medium*/
	and (min-width: 768px)
	and (max-width: 991px) {
		.headlines {
			flex-direction: column;
		}
		.title {
            font-size:2rem;
        }
		.discord-container {
            max-width:900px;
            width:90%;
            margin:1rem auto;
        }
	}
	@media only screen /*large*/
	and (min-width: 992px)
	and (max-width: 1199px) {
		.title {
            font-size:2rem;
        }
		.discord-container {
            max-width:800px;
            width:80%;
            margin:1rem auto;
        }
	}
	@media only screen /*xtralarge*/
	and (min-width: 1200px) {
		.headlines {
			margin-top:8vw;
		}
		.title {
            font-size:2rem;
            margin-left:0;
            margin-bottom:1rem;
        }
        .discord-container {
            max-width:1100px;
            width:70.4%;
            margin:1rem auto 0 auto;
        }
	}

</style>