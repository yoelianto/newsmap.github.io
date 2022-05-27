<script>
    import { get } from "../../api";
    import * as ihttp from "../../constants/initialHttp";
    import ArticleDetail from "../ArticleDetail.svelte";
    import Head from '../../Head.svelte';
    import Foot from '../../Foot.svelte';
    import * as animateScroll from 'svelte-scrollto'
    import { onMount } from 'svelte';
    import Share from '../../Share.svelte'
    import Fa from 'svelte-fa'
    import { faSpinner, faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons'
    import { params } from '@roxi/routify';
    import { fade } from 'svelte/transition';

    const slug = $params.slug;
    const type = "article";

    let url, title;

    const fetchData = (async () => {
        const result = await get(`${ihttp.URI_ARTICLE_DETAIL}/${slug}`);
        return await result;
    });
    let height;
    let page= 'artikel'

    url = document.location.href
    let urlReplace = url.replace('#/','')

    $: slug, fetchData().then((data) => {return title = data.title})

    onMount(()=>{
    animateScroll.scrollToTop()
  })
</script>
<svelte:head>
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0">
</svelte:head>

<Head 
    bind:height = {height}
    bind:page
/>

{#await fetchData()} <!-- hanya untuk konten jurno original -->
    <div class="placeholder-container"
    transition:fade="{{duration:50, delay:2000}}">
        <Fa icon={faSpinner} size="3x" pulse />
    </div>
{:then data}
    <ArticleDetail
        data={{
            ...data,
            type,
            thumbnail: process["env"]["URL_IMAGE"] + type + "/" + data.thumbnail,
            thumbnail_social: data.thumbnail_social === undefined ? '' : process["env"]["URL_IMAGE"] + type + "/" + data.thumbnail_social,
        }}
    />
{:catch error}
    <p>An error occurred!</p>
{/await}

{#await fetchData()} <!-- hanya footer & tombol share -->
    <div class="placeholder-container footer-placeholder"
    transition:fade="{{duration:50, delay:2000}}">
        <Fa icon={faSpinner} size="3x" pulse />
    </div>
{:then data}
    <Share 
        bind:url
        bind:title
    />
    <nav in:fade="{{duration:50, delay:3000}}">
        <Foot
        uri = {ihttp.URI_ARTICLE_LIST}
        params = {{except:data.id, size:3}}
        thumbnailFolder= "article"
        {type} 
        bgFooter = {data.footer_background_color}
        txtFooter= {data.article_background_color}
    />
    </nav>
    
{:catch error}
    <p>An error occurred!</p>
{/await}

<style>
    .placeholder-container {
        width:100vw;
        height:100vh;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 0.8rem;
        background-color: #fafafa;
        position: fixed;
        z-index: 99999;
        color: hsl(0,0%,50%);
    }

    .footer-placeholder {
        background-color: transparent !important;
    }
</style>