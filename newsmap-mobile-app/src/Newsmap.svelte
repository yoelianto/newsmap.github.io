<script>
    import { get } from "./api";
    import * as ihttp from "./constants/initialHttp";
    import {truncText, stringToDom} from './helper';

    const fetchData = (async () => {
        const result = await get(ihttp.URI_LAST_TOPIC, { size: 18 });
        return await result.data;
    })()

    // $: console.log(fetchData)

    export let margin;
</script>

<article style="margin-top:{margin}px" id="jurno">
    <div class="grid">
        <div class="grid0">
            {#await fetchData}
                <p>...waiting</p>
            {:then data}
                <div class="grid1">
                    <!-- <img class='imggrid' src={data[0].url} alt={data[0].title} /> -->
                    <p>{data[0].title}</p>
                </div>
            {:catch error}
                <p>An error occurred!</p>
            {/await}
        </div>
        <div class="grid0">
            {#await fetchData}
                <p>...waiting</p>
            {:then data}
                {#each {length: 4} as _, i}
                    {#if data[i + 1] !== undefined}
                        <div class="grid4">
                            <!-- <img class='imggrid' src={data[i+1].url} alt={data[i+1].title} /> -->
                            <p>
                                {@html truncText(data[i+1].title, 40)}
                            </p>
                        </div>
                    {:else}
                        <div class="grid4" />
                    {/if}
                {/each}
            {:catch error}
                <p>An error occurred!</p>
            {/await}
        </div>
        <div class="grid0">
            {#await fetchData}
                <p>...waiting</p>
            {:then data}
                {#each {length: 4} as _, i}
                    {#if data[i + 5] !== undefined}
                        <div class="grid4">
                            <!-- <img class='imggrid' src={data[i+5].url} alt={data[i+5].title} /> -->
                            <p>
                                {@html truncText(data[i+5].title, 40)}
                            </p>
                        </div>
                    {:else}
                        <div class="grid4" />
                    {/if}
                {/each}
            {:catch error}
                <p>An error occurred!</p>
            {/await}
        </div>
        <div class="grid0">
            {#await fetchData}
                <p>...waiting</p>
            {:then data}
                {#each {length: 9} as _, i}
                    {#if data[i + 9] !== undefined}
                        <div class="grid9">
                            <!-- <img class='imggrid' src={data[i+9].url} alt={data[i+9].title} /> -->
                            <p>
                                {@html truncText(data[i+9].title, 30)}
                            </p>
                        </div>
                    {:else}
                        <div class="grid9" />
                    {/if}
                {/each}
            {:catch error}
                <p>An error occurred!</p>
            {/await}
        </div>
    </div>
</article>

<style>
    article {
        margin-top: 40vw;
    }
    .grid {
        margin: 0 auto;
        width: 96.5vw;
        height: 96.5vw;
        background-color: indianred;
        display: flex;
        flex-wrap: wrap;
        font-family: var(--fontfamily2);
        color:white;
        font-weight: 500;
    }
    p {
        margin: 0.5rem;
    }
    .grid4 > p {
        margin: 0.3rem;
    }
    .grid9 > p {
        margin: 0.2rem;
    }
    .grid0 {
        width: 50%;
        height: 50%;
        background-color: white;
        display: flex;
        flex-wrap: wrap;
        font-size:1.2rem;
    }
    .grid1 {
        background-color: #393664;
    }
    .grid4 {
        width: 50%;
        height: 50%;
        background-color: var(--color-brand-red);
        font-size:0.8rem;
    }
    .grid9 {
        width: 33.33%;
        height: 33.33%;
        background-color: var(--color-brand-darkblue) ;
        font-size:0.6rem;
        line-height: 0.8rem;
    }
    .grid4:nth-child(2) {
        background-color:rgba(239, 89, 89, 0.9)
    }
    .grid4:nth-child(3) {
        background-color:rgba(239, 89, 89, 0.75)
    }
    .grid4:nth-child(4) {
        background-color:rgba(239, 89, 89, 0.5)
    }
    .grid9:nth-child(1) {
        background-color:rgba(36, 32, 83,0.9)
    }
    .grid9:nth-child(2) {
        background-color:rgba(36, 32, 83,0.85)
    }
    .grid9:nth-child(3) {
        background-color:rgba(36, 32, 83,0.8)
    }
    .grid9:nth-child(4) {
        background-color:rgba(36, 32, 83,0.75)
    }
    .grid9:nth-child(5) {
        background-color:rgba(36, 32, 83,0.7)
    }
    .grid9:nth-child(6) {
        background-color:rgba(36, 32, 83,0.65)
    }
    .grid9:nth-child(7) {
        background-color:rgba(36, 32, 83,0.6)
    }
    .grid9:nth-child(8) {
        background-color:rgba(36, 32, 83,0.55)
    }
    .grid9:nth-child(9) {
        background-color:rgba(36, 32, 83,0.5)
    }

    @media only screen and (min-width:1200px) {
        article {
            margin-top: 8vw;
        }
        .grid {
            margin: 0 auto;
            width: 96.5vw;
            height: calc(96.5vw/4);
            background-color: indianred;
            display: flex;
            flex-wrap: wrap;
            font-family: var(--fontfamily2);
            color:white;
            font-weight: 500;
            cursor: pointer;
        }
        .grid0 {
            width: 25%;
            height: 100%;
            background-color: white;
            display: flex;
            flex-wrap: wrap;
            font-size:2rem;
        }
        .grid1{
            font-size:2.4rem;
        }
        .grid4{
            font-size:1.6rem;
        }
        .grid9{
            font-size:1.2rem;
            line-height: 1.2rem;
        }
    }
</style>