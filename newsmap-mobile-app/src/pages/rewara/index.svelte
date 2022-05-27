<script>
    import { get } from "../../api";
    import * as ihttp from "../../constants/initialHttp";
    import Head from '../../Head.svelte'
    import * as animateScroll from 'svelte-scrollto'
    import {onMount} from 'svelte'

    export let colorBrandDarkBlue, colorBrandRed, colorBrandWhite
    let height
    let placeholder = [1,2,3,4,5,6]
    let searchValue

    const fetchData = (async () => {
        const result = await get(ihttp.URI_REWARA_LIST, {size: 10});
        return await result.data;
    })
    const searchData = (async () => {
        let searchResult = await get(ihttp.URI_SEARCH, { keywords:searchValue , type:'rewara' })
        return searchResult.data;
    })

    let dataPromise = fetchData()
    const search = () => {
        dataPromise = searchData()
    }

    const submit = (event) => {
        if (event.key === 'Enter') {
            dataPromise = searchData()
        }
    }

    onMount(()=>{
        animateScroll.scrollToTop()
    })
</script>

<svelte:head>
    <title>Rewara - Indeks</title>

</svelte:head>

<Head 
    bind:height
    page='indeks'
    bind:colorBrandDarkBlue
    bind:colorBrandRed
    bind:colorBrandWhite
     />
<article style="margin-top:{height}px">
    <h1>REWARA</h1>
    <!-- <form> -->
        <input type="search" placeholder="Cari Artikel Rewara..." on:keydown={submit} bind:value={searchValue}>
        <button type="submit" on:click={search}>Search</button>
    <!-- </form> -->
    {#await dataPromise}
        {#each placeholder as d}
        <div class="article">
            <div class="left">
                <div class='placeholder img'></div>
            </div>
            <div class="credit">
                <p class="placeholder author"></p>
                <p class="placeholder article-title"></p>
                <p class="placeholder article-title"></p>
                <p class="placeholder article-title"></p>
            </div>
        </div>
        {/each}
    {:then data}
    {#if data.length > 0}
        {#each data as d}
        <a class='indeks-link' style='cursor:pointer' href={`/rewara/${d.slug}`}>
            <div class="article">
                <div class="left">
                    <img src={`${process['env']['URL_IMAGE']}images/rewara/${d.thumbnail}`} alt={d.title} />
                </div>
                <div class="credit">
                    <p class="author">Rewara</p>
                    <p class="article-title">
                        {d.title}
                    </p>
                </div>
            </div>
        </a>
        {/each}
        {:else if data.length == 0}
        <p style='text-align:center; font-size:0.8rem;'>Artikel tidak ditemukan</p>
        {/if}
    {:catch error}
    <p>an error occured</p>
    {/await}
</article>

<style>
    a.indeks-link {
        text-decoration: none !important;
    }
    a.indeks-link:hover {
        text-decoration: none !important;
    }
    a.indeks-link:active {
        text-decoration: none !important;
    }
    article {
        width:88%;
        max-width: 650px;
        margin: 0 auto;
    }
    .placeholder {
        background-color: hsl(0, 0%, 88%);
    }
    .img {
        aspect-ratio: 4/3;
        width: 100%;
        border-radius:0.5rem;
        object-fit: cover;
    }
    .placeholder.author {
        width:50%;
        height:0.8rem;
        border-radius:0.25rem;
    }
    .placeholder.article-title {
        width:100%;
        height:1rem;
        margin-bottom:0.2rem;
        border-radius:0.25rem;
    }
    a {
        color:black;
    }
    h1 {
        font-family: 'Roboto Mono';
        font-weight:700;
        font-size:1.5rem;
        margin-left: 6%;
    }
    article {
        width:100%;
    }
    form {
        margin-left: 6%;
        width: 84%;
        font-size: 0.8rem;
        border-radius: 2rem;
        display: flex;
        border:1px solid black;
        margin-bottom: 1rem;
        justify-content: space-between;
        align-items: center;
    }
    input[type="search"] {
        border: none;
        background: transparent;
        width:90%;
        margin: 0;
        padding: 7px 8px;
        font-size: 14px;
        color: inherit;
        border: 1px solid transparent;
        border-radius: inherit;
    }
    button[type="submit"] {
        background: transparent url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' class='bi bi-search' viewBox='0 0 16 16'%3E%3Cpath d='M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z'%3E%3C/path%3E%3C/svg%3E") no-repeat center;
        width: 2rem;
        height:2rem;
        margin: 0;
        text-indent: -999px;
        overflow: hidden;
        border: 1px solid transparent;
        border-radius: inherit;
    }

    input[type="search"]::placeholder {
        color: #bbb;
    }
    .article {
        width:90%;
        margin:0.5rem auto;
        display: flex;
        flex-direction: row;
        justify-content: space-evenly;
    }
    .left {
        width: 35%;
    }
    .credit {
        width:60%;
        display: flex;
        flex-direction: column;
        white-space: normal;
    }
    img {
        aspect-ratio: 4/3;
        width: 100%;
        border-radius:0.5rem;
        object-fit: cover;
    }
    .author {
        font-family: 'Roboto';
        font-size: 0.8rem;
        font-weight:500;
        white-space: normal;
        margin: 0.2rem 0;
    }
    .article-title {
        font-family: 'Roboto';
        font-size: 1rem;
        font-weight:700;
        white-space: normal;
        line-height: 1rem;
        margin: 0;
    }

</style>