<script>
    import { get } from "./api";
    import * as ihttp from './constants/initialHttp';

    export let params = {}

    const fetchData = (async () => {
        const mergeParams = {...params, kind: 'person'}
        const result = await get(ihttp.URI_NEWS_TOP_ENTITY, mergeParams);
        return await result.data;
    })()

    $: console.table(fetchData)
</script>

<div class="container">
    <div class="slider">
        {#await fetchData}
        <p>...waiting</p>
        {:then data}
            {#each data as d}
            <div class="sentiment-container">
                <div class="sentiment">
                    <div class="person">
                        <img class='people' src={d.thumbnail} alt={d.name} />
                    </div>
                    <div class="name">{d.name}</div>
                </div>
            </div>
                
            {/each}
        {:catch error}
            <p>An error occurred!</p>
        {/await}
    </div>
</div>

<style>
    .container {
        margin-left: 5px;
        margin-bottom: 1rem;
        margin-top: 1rem;
    }
    .slider {
        overflow-x: scroll;
        white-space: nowrap;
        display: flex;
    }
    .sentiment {
        display:inline-block;
        width:25vw;
        height:25vw;
        margin:0.5rem;
    }
    .person{
        clip-path: circle(50%);
        width: 25vw;
        height: 25vw;
    }
    .people {
        width:100%;
    }
    .name {
        font-family: var(--fontfamily2);
        font-size: 1rem;
        text-align: center;
        margin: 0.5rem 0;
        font-weight: 500;
        display: inline-block;
        overflow-wrap: break-word;
        width:25vw;
        white-space:pre-wrap;
    }
    .slider::-webkit-scrollbar {
        display: none;
    }

    .slider {
        -ms-overflow-style: none;  /* IE and Edge */
        scrollbar-width: none;  /* Firefox */
    }
</style>