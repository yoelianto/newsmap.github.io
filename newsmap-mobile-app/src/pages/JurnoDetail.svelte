<script>
    import { get } from "../api";
    import * as ihttp from "../constants/initialHttp";
    import ArticleDetail from "./ArticleDetail.svelte";
    import Head from '../Head.svelte'
    import * as animateScroll from 'svelte-scrollto'
    import {onMount} from 'svelte';
    import Share from '../Share.svelte'
    import Fa from 'svelte-fa'
    import { faSpinner, faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons'

    export let params = {};
    const slug = params.slug;
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

{#await fetchData()}
    <div class="placeholder-container">
        <Fa icon={faSpinner} size="3x" pulse />
    </div>
{:then data}
    <Head 
    bind:height = {height}
    bind:page
    />
    <Share 
        bind:url
        bind:title
    />
    <ArticleDetail
        data={{
            ...data,
            type,
            footer: {
                uri: ihttp.URI_ARTICLE_LIST,
                params: { except: data.id, size: 3 },
                thumbnailFolder: "article",
            },
            thumbnail: process["env"]["URL_IMAGE"] + type + "/" + data.thumbnail,
            thumbnail_social: data.thumbnail_social === undefined ? '' : process["env"]["URL_IMAGE"] + type + "/" + data.thumbnail_social,
        }}
    />
{:catch error}
    <p>An error occurred!</p>
{/await}

<style>
    .placeholder-container {
        width:100vh;
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
</style>