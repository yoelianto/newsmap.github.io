<script>
  import { get } from "../api";
  import * as ihttp from "../constants/initialHttp";
  import ArticleDetail from "./ArticleDetail.svelte";
  import Head from '../Head.svelte'

  export let params = {};
  const slug = params.slug;

  const fetchData = (async () => {
    const result = await get(ihttp.URI_ARTICLE_DETAIL, { slug });
    console.log(result)
    return await result;
  })();

  let height;
</script>

<svelte:head>
  {#if params.custom}
    <link rel="stylesheet" href={`./deduktif/${slug}/global.css`} />
    <link rel="stylesheet" href={`./deduktif/${slug}/bundle.css`} />
    <script defer src={`./deduktif/${slug}/bundle.js`}></script>
  {/if}
</svelte:head>

{#await fetchData}
  <p>...waiting</p>
{:then data}
  <Head 
    bind:height = {height}
  />
  <ArticleDetail
    data={{
      ...data,
      thumbnail: process["env"]["URL_IMAGE"] + "deduktif/" + data.thumbnail,
    }}
  />
  
{:catch error}
  <p>An error occurred!</p>
{/await}
