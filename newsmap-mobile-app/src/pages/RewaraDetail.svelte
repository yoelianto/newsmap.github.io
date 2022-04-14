<script>
    import { get } from "../api";
    import * as ihttp from "../constants/initialHttp";
    import ArticleDetail from "./ArticleDetail.svelte";

    export let params = {};
    const slug = params.slug;

    const fetchData = (async () => {
        const result = await get(ihttp.URI_REWARA_DETAIL, { slug });
        return await result;
    })();
</script>

{#await fetchData}
    <p>...waiting</p>
{:then data}
    <ArticleDetail
        data={{
            ...data,
            thumbnail: process["env"]["URL_IMAGE"] + "rewara/" + data.thumbnail,
        }}
    />
{:catch error}
    <p>An error occurred!</p>
{/await}
