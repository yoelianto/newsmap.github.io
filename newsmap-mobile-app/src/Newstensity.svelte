<script>
    import { get } from "./api";
    import * as ihttp from './constants/initialHttp';
    import Icon from 'svelte-awesome';
    import { angleLeft } from 'svelte-awesome/icons';
    import { createEventDispatcher } from 'svelte'

    const dispatch = createEventDispatcher()

    function forward(event) {
        dispatch('modalOut')
        // dispatch('name', event.path[2].children[1].children[1].innerHTML)
    }

    export let moveIn
    export let name
    export let params = {}
    let width

    const fetchData = (async () => {
        const mergeParams = {...params, kind: 'person'}
        mergeParams.per_page = 10

        const result = await get(ihttp.URI_NEWS_TOP_ENTITY, mergeParams);
        return await result.data;
    })()

</script>

<svelte:window bind:innerWidth={width}></svelte:window>

<article style:left='{moveIn ? `0` : `${width}px`}' >
    <div class="close" on:click={forward}>
        <Icon data={angleLeft} scale={2} />
    </div>

    {#await fetchData}
        <p>...waiting</p>
        {:then data}
            {#each data as d}
                <section style:margin-top='45px'>
                    <h1>{name}</h1>
                </section>
                <section>
                    <h1>Part 2</h1>
                </section>
                <section>
                    <h1>Part 3</h1>
                </section>
            {/each}
        {:catch error}
            <p>An error occurred!</p>
        {/await}

</article>

<style>
    article {
        position: fixed;
        height:100vh;
        width:100vw;
        background-color: #fafafa;
        z-index: 1000;
        transition: left 200ms ease-in-out;
        padding: 1rem;
    }
    section {
        width:calc(100% - 2rem);
        height: 25vh;
        margin-top: 0.5rem;
        margin-bottom: 0.5rem;
        border: 1px black solid;
    }
</style>