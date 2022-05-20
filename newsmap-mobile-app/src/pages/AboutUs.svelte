<script>
    import { get } from "../api";
    import * as ihttp from "../constants/initialHttp";
    import Head from '../Head.svelte';
    import Footer from '../Footer.svelte';
    import Fa from 'svelte-fa'
    import { faSpinner, faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';

    const fetchData = (async () => {
        const result = await get(ihttp.URI_SETTING, { group:'about' });
        return await result;
    });

    let height;
    let page= 'indeks'

</script>

<svelte:head>
    <title>Tentang Kami</title>
</svelte:head>

<Head 
    bind:height = {height}
    bind:page
/>

<div class="container" style='margin-top:{height}px'>

    <h1>Tentang Jurno</h1>

    <div class="content">
        {#await fetchData()}
            <div class="placeholder-container">
                <Fa icon={faSpinner} size="3x" pulse />
            </div>
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
    .placeholder-container {
        background-color: #fafafa;
        width:100vw;
        height:100vh;
        position:fixed;
        z-index:9999;
    }
    .container {
        width:88%;
        max-width:650px;
        margin:0 auto;
        padding-bottom: 1rem;
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

