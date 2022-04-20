<script>
    import { get } from "../api";
    import * as ihttp from "../constants/initialHttp";
    import ArticleDetail from "./ArticleDetail.svelte";
    import Head from '../Head.svelte'
    import * as animateScroll from 'svelte-scrollto'
    import {onMount} from 'svelte'

    export let params = {};
    const slug = params.slug;
    const type = "article";

    const fetchData = (async () => {
        const result = await get(ihttp.URI_ARTICLE_DETAIL, { slug });
        console.log(result)
        return await result;
    })();
    let height;

    onMount(()=>{
    animateScroll.scrollToTop()
  })
</script>

{#await fetchData}
    <p>...waiting</p>
{:then data}
    <Head 
    bind:height = {height}
    />
    <ArticleDetail
        data={{
            ...data,
            type,
            footer: {
                uri: ihttp.URI_ARTICLE_LIST,
                params: { except: data.id, size: 3 },
                thumbnailFolder: "news",
            },
            thumbnail: process["env"]["URL_IMAGE"] + type + "/" + data.thumbnail,
        }}
    />
{:catch error}
    <p>An error occurred!</p>
{/await}
