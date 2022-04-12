<script>
  import { getDeduktif } from "../api";
  import * as ihttp from "../constants/initialHttp";
  import ArticleDetail from "./ArticleDetail.svelte";

  export let slug = "";

  const fetchData = (async () => {
    const result = await getDeduktif(ihttp.URI_ARTICLE_DETAIL, { slug });
    return await result;
  })();
</script>

<!-- <svelte:head>
  <link rel="stylesheet" href={`./deduktif/${slug}/global.css`} />
  <link rel="stylesheet" href={`./deduktif/${slug}/bundle.css`} />
  <script src={`./deduktif/${slug}/bundle.js`}></script>
</svelte:head> -->

{#await fetchData}
  <p>...waiting</p>
{:then data}
  <ArticleDetail {data} />
{:catch error}
  <p>An error occurred!</p>
{/await}
