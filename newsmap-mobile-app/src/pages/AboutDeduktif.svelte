<script>
    import { get } from "../api";
    import * as ihttp from "../constants/initialHttp";
    import Head from '../Head.svelte';
    import Footer from '../Footer.svelte';

    const fetchData = (async () => {
        const result = await get(ihttp.URI_SETTING, { group:'about' });
        return await result;
    });

    let height;
    let page= 'indeksdeduktif'

</script>

<svelte:head>
    <title>Tentang Kami</title>
</svelte:head>
<main>
    <Head 
    bind:height = {height}
    bind:page
/>

<div class="container" style='margin-top:{height}px'>

    <h1>Tentang Deduktif</h1>

    <div class="content">
        {#await fetchData()}
        <p>waiting...</p>
        {:then data}
            {@html data[0].value}
        {:catch error}
            <p>An error occurred!</p>
        {/await}
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
        background-color:#050505;
        
    }
    .container {
        width:88%;
        max-width:650px;
        margin:0 auto;
        color:#fafafa;
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
    }

</style>

