<script>
    import { get } from "../api";
    import * as ihttp from "../constants/initialHttp";
    import Head from '../Head.svelte';
    import Footer from '../Footer.svelte';
    import {afterUpdate} from 'svelte';

    const fetchData = (async () => {
        const result = await get(ihttp.URI_SETTING, { group:'redaksi' });
        return await result;
    });

    let height;
    let page= 'indeksdeduktif'

    afterUpdate(()=> {
        for(const element of document.body.querySelectorAll('main')) {
			if(element.nextElementSibling) {
				element.nextElementSibling.remove();
			}
		}
        animateScroll.scrollToTop()
    })

</script>

<svelte:head>
    <title>Redaksi Deduktif</title>
</svelte:head>

<main>
    <Head 
    bind:height = {height}
    bind:page
/>

<div class="container" style='margin-top:{height}px'>

    <h1>Redaksi Deduktif</h1>

    <div class="content">
        <br>
        <h3><strong>Pemimpin Redaksi</strong></h3>
        <p>Sapto Anggoro</p>
        <br>
        <h3><strong>Dewan Redaksi</strong></h3>
        <p>Teguh Budi Santoso</p>
        <p>Nurul Qomariyah</p>
        <br>
        <h3><strong>Redaktur</strong></h3>
        <p>Nurul Qomariyah</p>
        <br>
        <h3><strong>Redaksi</strong></h3>
        <p>Fajar Regal</p>
        <p>Ahsan Ridhoi</p>
    </div>

</div>
</main>


<Footer 
    --color-brand-dark-blue = '#242053'
    --color-brand-white = "#fafafa"
    --fontfamily2 = 'Roboto'
    bind:page
/>


<style>
    main {
        background-color: #050505;
        
    }
    .container {
        width:88%;
        margin:0 auto;
        color: #fafafa;
        padding-bottom:1rem;
        padding-top:0.5rem;
    }
    h1 {
        font-family: 'Roboto Mono';
        text-align: center;
    }
    .content {
        font-family: 'Roboto';
        width: 100%;
        white-space: normal;
        text-align: center;
    }
    p {
        margin:0.5rem;
    }
    h3 {
        margin-bottom: 0.5rem;
    }

</style>

