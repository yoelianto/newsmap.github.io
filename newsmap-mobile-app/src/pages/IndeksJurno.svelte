<script>
    import Indeks from './Indeks.svelte'
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

<article>
    <h1>JURNO ORIGINAL</h1>
    {#await fetchData}
    <p>waiting...</p>
    {:then data}
        {#each data as d}
        <div class="article">
            <p>{d.author_name}</p>
            <h3>{d.title}</h3>
        </div>
        {/each}
    {:catch error}
    <p>an error occured</p>
    {/await}
</article>

<style>

</style>