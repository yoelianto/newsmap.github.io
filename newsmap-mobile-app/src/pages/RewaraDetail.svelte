<script>
    import { get } from "../api";
    import * as ihttp from "../constants/initialHttp";
    import ArticleDetail from "./ArticleDetail.svelte";
    import Head from '../Head.svelte'
    import * as animateScroll from 'svelte-scrollto'
    import {onMount} from 'svelte'
    import Share from '../Share.svelte'
    import Fa from 'svelte-fa'
    import { faSpinner, faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons'

    let height;
    let url, title;
    let page = 'artikel'

    export let params = {};
    const slug = params.slug;

    const fetchData = (async () => {
        const result = await get(`${ihttp.URI_REWARA_DETAIL}/${slug}`);
        return await result;
    });

    url = document.location.href

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
            thumbnail: process["env"]["URL_IMAGE"] + "rewara/" + data.thumbnail,
            type: 'rewara'
        }}
    />
{:catch error}
    <p>An error occurred!</p>
{/await}
