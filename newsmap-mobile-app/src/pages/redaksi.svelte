<script>
    import { get } from "../api";
    import * as ihttp from "../constants/initialHttp";
    import Head from '../Head.svelte';
    import Footer from '../Footer.svelte';
    import {afterUpdate} from 'svelte';
    import * as animateScroll from "svelte-scrollto";


    let height;
    let page= 'indeks'

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
    <title>Redaksi Jurno</title>
</svelte:head>

<main>
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
        <p>Aliffaiz Achmad</p>
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
    bind:page
/>
</main>

<style>
    main {
        background-color: #050505;
        height: 100%;
        padding-top:1rem;
        margin-bottom: -0.25rem;
        
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

