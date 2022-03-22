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

	let margin;
	let y;

</script>

<svelte:head>
	<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
</svelte:head>

<main>
	<div class="container">
		<Header bind:height={margin} y={y}/>
		<Newsmap margin={margin}/>
		<Sentiment />
		<Original />
		<Deduktif />
		<Rewara title='REWARA'/>
		<News title='TRENDING NOW'/>
		<News title='PUBLIC NEWS'/>
		<Podcast />
		<Menu />
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