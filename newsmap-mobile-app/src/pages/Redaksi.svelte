<script>
    import { get } from "../api";
    import * as ihttp from "../constants/initialHttp";
    import Head from '../Head.svelte';
    import Footer from '../Footer.svelte';

    const fetchData = (async () => {
        const result = await get(ihttp.URI_SETTING, { group:'redaksi' });
        return await result;
    });

    let height;
    let page= 'indeks'

</script>

<svelte:head>
    <title>Redaksi</title>
</svelte:head>

<Head 
    bind:height = {height}
    bind:page
/>

<div class="container" style='margin-top:{height}px'>

    <h1>Redaksi</h1>

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

<Footer 
    --color-brand-dark-blue = '#242053'
    --color-brand-white = "#fafafa"
    --fontfamily2 = 'Roboto'
/>


<style>
    .container {
        width:88%;
        margin:0 auto;
    }
    h1 {
        font-family: 'Roboto Mono';
    }
    .content {
        font-family: 'Roboto';
        width: 100%;
        white-space: normal;
        text-align: center;
    }

</style>

