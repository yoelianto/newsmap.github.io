<script>
    import { get } from "../../api";
    import * as ihttp from "../../constants/initialHttp";
    import Head from '../../Head.svelte';
    import Footer from '../../Footer.svelte';
    import { afterUpdate } from 'svelte';
    import * as animateScroll from "svelte-scrollto";
    import Fa from 'svelte-fa'
    import { faSpinner, faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';

    const fetchData = (async () => {
        const result = await get(ihttp.URI_SETTING, { group:'about' });
        return await result;
    });

    let height;
    let page= 'indeksdeduktif'
    let subpage = 'about'

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
    <title>Tentang Deduktif</title>
</svelte:head>
<main>
    <Head 
    bind:height = {height}
    bind:page
    bind:subpage
/>

<div class="container" style='margin-top:{height}px'>

    <h1>Tentang Deduktif</h1>

    <div class="content">
        {#await fetchData()}
            <div class="placeholder-container">
                <Fa icon={faSpinner} size="3x" pulse />
            </div>
        {:then data}
            {@html data[1].value}
        {:catch error}
            <p>An error occurred!</p>
        {/await}
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
    .placeholder-container {
        width:100vh;
        height:100vh;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 0.8rem;
        background-color: #050505;
        position: fixed;
        z-index: 99999;
        color: hsl(0,0%,50%);
    }
    main {
        background-color:#050505;
        padding-top:1rem;
        margin-bottom: -0.25rem;
    }
    .container {
        width:88%;
        max-width:650px;
        margin:0 auto;
        color:#fafafa !important;
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
        color:#fafafa !important; 
    }

</style>

