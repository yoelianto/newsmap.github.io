<script>
  import { get } from "../../api";
  import * as ihttp from "../../constants/initialHttp";
  import ArticleDetail from "../ArticleDetail.svelte";
  import Head from '../../Head.svelte'
  import * as animateScroll from 'svelte-scrollto'
  import {onMount} from 'svelte';
  import Share from '../../Share.svelte'
  import Fa from 'svelte-fa'
  import { faSpinner, faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons'
  import { params } from '@roxi/routify'

  const slug = $params.slug;
  const type = 'deduktif';

  const fetchData = (async () => {
    const result = await get(`${ihttp.URI_DEDUKTIF_DETAIL}/${slug}`);
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
      thumbnail: process["env"]["URL_IMAGE"] + type + "/" + data.thumbnail,
      thumbnail_social: data.thumbnail_social === undefined ? '' : process["env"]["URL_IMAGE"] + type + "/" + data.thumbnail_social,
      footer: {
          uri: ihttp.URI_DEDUKTIF_LIST,
          params: { except: data.id, size: 3 },
          thumbnailFolder: "news",
      }
    }}
  />
  
  
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
        background-color: #050505;
        position: fixed;
        z-index: 99999;
        color: hsl(0,0%,50%);
    }
</style>
