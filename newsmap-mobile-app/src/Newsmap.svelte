<script>
    import { get } from "./api";
    import * as ihttp from "./constants/initialHttp";

    const fetchData = (async () => {
        const result = await get(ihttp.URI_LAST_TOPIC, { size: 18 });
        return await result.data;
    })()

    export let margin;
</script>

<article style="margin-top:{margin}px" id="jurno">
    <div class="grid">
        <div class="grid1">
            {#await fetchData}
                <p>...waiting</p>
            {:then data}
                <!-- <img class='imggrid' src={data[0].url} alt={data[0].title} /> -->
                {data[0].title}
            {:catch error}
                <p>An error occurred!</p>
            {/await}
        </div>
        <div class="grid1">
            {#await fetchData}
                <p>...waiting</p>
            {:then data}
                {#each {length: 4} as _, i}
                    {#if data[i + 1] !== undefined}
                        <div class="grid4">
                            <!-- <img class='imggrid' src={data[i+1].url} alt={data[i+1].title} /> -->
                            {data[i+1].title}
                        </div>
                    {:else}
                        <div class="grid4" />
                    {/if}
                {/each}
            {:catch error}
                <p>An error occurred!</p>
            {/await}
        </div>
        <div class="grid1">
            {#await fetchData}
                <p>...waiting</p>
            {:then data}
                {#each {length: 4} as _, i}
                    {#if data[i + 5] !== undefined}
                        <div class="grid4">
                            <!-- <img class='imggrid' src={data[i+5].url} alt={data[i+5].title} /> -->
                            {data[i+5].title}
                        </div>
                    {:else}
                        <div class="grid4" />
                    {/if}
                {/each}
            {:catch error}
                <p>An error occurred!</p>
            {/await}
        </div>
        <div class="grid1">
            {#await fetchData}
                <p>...waiting</p>
            {:then data}
                {#each {length: 9} as _, i}
                    {#if data[i + 9] !== undefined}
                        <div class="grid9">
                            <!-- <img class='imggrid' src={data[i+9].url} alt={data[i+9].title} /> -->
                            {data[i+9].title}
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
    }
    .grid1 {
        width: 50%;
        height: 50%;
        background-color: steelblue;
        display: flex;
        flex-wrap: wrap;
    }
    .grid4 {
        width: 50%;
        height: 50%;
        background-color: green;
    }
    .grid9 {
        width: 33.33%;
        height: 33.33%;
        background-color: slateblue;
    }
    .imggrid {
        width:100%;
    }
</style>