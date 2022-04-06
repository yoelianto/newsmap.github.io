<script>
    import { get } from "./api";
    import * as ihttp from "./constants/initialHttp";
    import {truncText} from './helper';

    const fetchData = (async () => {
        const result = await get(ihttp.URI_LAST_TOPIC, { size: 10 });
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
    <div class="cell" style="width:{d.width}vw">
        <!-- <p class='topichead'>{d.keywords[0]}</p> -->
        <!-- {#each d.keywords.slice(1,4) as keyword}
            <p class='resttopic'>{keyword}</p>
        {/each} -->
            <p class="topichead">
                {@html truncText(d.title, 50)}
            </p>
        
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
        height:70px;
        margin:0.25rem;
        padding:0.5rem;
        border-radius: 0.5rem;
        color:white;
        flex-grow:1;
        
    }
    p {
        margin:0;
    }
    /* span {
        margin:0;
    } */
    .topichead {
        font-size: 0.6rem;
        font-weight: 500;
        line-height: 0.8rem;
        font-family: var(--fontfamily2);
    }
    /* .resttopic {
        font-size: 0.6rem;
    } */
    .cell:nth-child(1) {
        background-color:hsla(245, 25%, 34%, 1);
    }
    .cell:nth-child(2) {
        background-color:hsla(245, 25%, 42%, 1);
    }
    .cell:nth-child(3) {
        background-color:hsla(245, 25%, 49%, 1);
    }
    .cell:nth-child(4) {
        background-color:rgba(239, 89, 89, 0.8)
    }
    .cell:nth-child(5) {
        background-color:rgba(239, 89, 89, 0.75)
    }
    .cell:nth-child(6) {
        background-color:rgba(239, 89, 89, 0.7)
    }
    .cell:nth-child(7) {
        background-color:rgba(239, 89, 89, 0.65)
    }
    .cell:nth-child(8) {
        background-color:rgba(239, 89, 89, 0.6)
    }
    .cell:nth-child(9) {
        background-color:rgba(239, 89, 89, 0.55)
    }
    .cell:nth-child(10) {
        background-color:rgba(239, 89, 89, 0.5)
    }
    
</style>