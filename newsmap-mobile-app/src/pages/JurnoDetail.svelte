<script>
    import { get } from "../api";
    import * as ihttp from "../constants/initialHttp";
    import ArticleDetail from "./ArticleDetail.svelte";

    export let params = {};
    const slug = params.slug;

    const fetchData = (async () => {
        const result = await get(ihttp.URI_ARTICLE_DETAIL, { slug });
        return await result;
    })();
</script>

<svelte:head>
    {#if params.custom}
        <link rel="stylesheet" href={`./article/${slug}/global.css`} />
        <link rel="stylesheet" href={`./article/${slug}/build/bundle.css`} />
        <script defer src={`./article/${slug}/build/bundle.js`}></script>
    {/if}
</svelte:head>

{#await fetchData}
    <p>...waiting</p>
{:then data}
    <ArticleDetail
        data={{
            ...data,
            thumbnail: process["env"]["URL_IMAGE"] + "article/" + data.thumbnail,
        }}
    />
{:catch error}
    <p>An error occurred!</p>
{/await}
