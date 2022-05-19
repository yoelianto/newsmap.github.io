<script>
    import { get } from "../api";
    import * as ihttp from "../constants/initialHttp";
    import ArticleDetail from "./ArticleDetail.svelte";
    import Head from '../Head.svelte'
    import * as animateScroll from 'svelte-scrollto'
    import {onMount} from 'svelte';
    import Share from '../Share.svelte'

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
    <p>...waiting</p>
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
        }}
    />
{:catch error}
    <p>An error occurred!</p>
{/await}
