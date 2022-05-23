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

    <h1>Redaksi Jurno</h1>

    <div class="content">
        <br>
        <h3><strong>Komisaris</strong></h3>
        <p>Nur Samsi</p>
        <br>
        <h3><strong>Direktur</strong></h3>
        <p>Teguh Budi Santoso</p>
        <br>
        <h3><strong>Manajer Eksekutif</strong></h3>
        <p>Arlian Buana</p>
        <br>
        <h3><strong>Creative Technologist</strong></h3>
        <p>Sabda Armandio</p>
        <br>
        <h3><strong>Editor</strong></h3>
        <p>Ann Putri</p>
        <br>
        <h3><strong>Program dan Komunitas</strong></h3>
        <p>Windu Jusuf</p>
        <br>
        <h3><strong>Social Media Officer</strong></h3>
        <p>Alya Faradisa</p>
        <p>Riesti F</p>
        <br>
        <h3><strong>Graphic Director</strong></h3>
        <p>Louis Lugas</p>
        <br>
        <h3><strong>Graphic Storyboard</strong></h3>
        <p>Faiz</p>
        <br>
        <h3><strong>Graphic Designer</strong></h3>
        <p>Rangga Putrawicaksana</p>
        <p>William Handoko</p>
        <br>
        <h3><strong>Video Editor</strong></h3>
        <p>Eric F</p>
        <p>Hamim Septian</p>
        <p>Achmad</p>
        <p>Riva Rais</p>
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
        margin-top: 0;
    }

</style>

