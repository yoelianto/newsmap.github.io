<script>
    import { get } from "../api";
    import * as ihttp from "../constants/initialHttp";
    import ArticleDetail from "./ArticleDetail.svelte";
    import Head from '../Head.svelte'
    import * as animateScroll from 'svelte-scrollto'
    import {onMount} from 'svelte'

    let height;

    export let params = {};
    const slug = params.slug;

    const fetchData = (async () => {
        const result = await get(ihttp.URI_REWARA_DETAIL, { slug });
        return await result;
    })();

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
            thumbnail: process["env"]["URL_IMAGE"] + "rewara/" + data.thumbnail,
            type: 'rewara'
        }}
    />
{:catch error}
    <p>An error occurred!</p>
{/await}
