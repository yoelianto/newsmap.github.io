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
  import { params } from '@roxi/routify';
  import Foot from '../../Foot.svelte';
  import { fade } from 'svelte/transition';

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

<Head 
bind:height = {height}
bind:page
/>

{#await fetchData()} <!-- hanya untuk konten deduktif -->
  <div class="placeholder-container"
  transition:fade="{{duration:50, delay:2000}}">
    <Fa icon={faSpinner} size="3x" pulse />
  </div>
{:then data}
  <ArticleDetail
    data={{
      ...data,
      type,
      thumbnail: process["env"]["URL_IMAGE"] + type + "/" + data.thumbnail,
      thumbnail_social: data.thumbnail_social === undefined ? '' : process["env"]["URL_IMAGE"] + type + "/" + data.thumbnail_social,
    }}
  />  
{:catch error}
  <p>An error occurred!</p>
{/await}

{#await fetchData()} <!-- hanya footer & tombol share -->
    <div class="placeholder-container footer-placeholder"
    transition:fade="{{duration:50, delay:2000}}">
        <Fa icon={faSpinner} size="3x" pulse />
    </div>
{:then data}
    <Share 
        bind:url
        bind:title
    />
    <nav in:fade="{{duration:50, delay:3000}}">
        <Foot
        uri = {ihttp.URI_DEDUKTIF_LIST}
        params = {{except:data.id, size:3}}
        thumbnailFolder= "news"
        {type} 
        bgFooter = {data.footer_background_color}
        txtFooter= {data.article_background_color}
    />
    </nav>
    
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

    .footer-placeholder {
        background-color: transparent !important;
    }
</style>
