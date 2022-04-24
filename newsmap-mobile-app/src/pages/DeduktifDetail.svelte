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
  const type = 'deduktif';

  const fetchData = (async () => {
    const result = await get(ihttp.URI_ARTICLE_DETAIL, { slug });
    return await result;
  });

  let height;
  let url, title;
  let page = 'deduktif'

  url = document.location.href

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
      thumbnail: process["env"]["URL_IMAGE"] + type + "/" + data.thumbnail,
    }}
  />
  
  
{:catch error}
  <p>An error occurred!</p>
{/await}
