<script>
    import { get } from "./api";
    import * as ihttp from "./constants/initialHttp";
    import {truncText} from './helper';

    const fetchData = (async () => {
        const result = await get(ihttp.URI_LAST_TOPIC, { size: 18 });
        // console.log(result.data)
        result.data.forEach((d) => {
            d.width = Math.random() * 10 + 15
        })
        return await result.data;
    })()

     $: console.log(fetchData)

    export let margin;
</script>

{#await fetchData}
<p>...waiting</p>
{:then data}
<article style="margin-top:{margin}px" id="jurno">
    {#each data as d}
    <div class="cell" style="min-width:{d.width}vw">
        <p class='topichead'>{d.keywords[0]}</p>
        {#each d.keywords.slice(1,4) as keyword}
            <p class='resttopic'>{keyword}</p>
        {/each}
    </div>
    {/each}
</article>
{:catch error}
<p>An error occurred!</p>
{/await}

<style>
    article {
        width:98vw;
        margin: 0 auto;
        display:flex;
        flex-wrap: wrap;
    }
    .cell {
        background-color: gray;
        height:100px;
        margin:0.25rem;
        padding:0.5rem;
        border-radius: 0.5rem;
        color:white;
        flex-grow:1;
        
    }
    p {
        margin:0;
    }
    span {
        margin:0;
    }
    .topichead {
        font-size: 1.5rem;
        font-weight: 600;
    }
    .resttopic {
        font-size: 0.8rem;
    }
</style>