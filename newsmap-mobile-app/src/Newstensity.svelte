<script>
    import { get } from "./api";
    import * as ihttp from './constants/initialHttp';
    import Icon from 'svelte-awesome';
    import { angleLeft } from 'svelte-awesome/icons';
    import { createEventDispatcher } from 'svelte';
    import PieChart from "./PieChart.svelte";
    import Fa from 'svelte-fa'
    import { faSpinner } from '@fortawesome/free-solid-svg-icons'

    const dispatch = createEventDispatcher()

    function forward(event) {
        dispatch('modalOut')
    }

    export let moveIn

    export let id

    let width
    let profilewidth
    let fgColor1 = 'hsl(244, 30%, 30%)'
    let fgColor2 = 'hsl(244, 30%, 70%)'
    let fgColor3 = 'hsl(0, 82%, 64%)'

    let dataPromise

    export let params = {}

    const fetchData = (async () => {
        const mergeParams = {...params, kind: 'person', size:10}

        const result = await get(ihttp.URI_NEWS_TOP_ENTITY, mergeParams);
        const result2 = await get(ihttp.URI_ENTITY_PROFILE, {entity_id:id});

        let filter = result.data.filter((data) => {
             return data.id == id
        })

        let allResult = {...filter, result2}
        return await allResult
    })

    const fetchData3 = (async () => {
        const mergeParams = {...params, entity_id:id}

        const result = await get(ihttp.URI_ENTITY_RELATED_TOPICS, mergeParams);
        return await result
    })

    $: id, dataPromise = fetchData()
    $: id, fetchData3()


</script>

<svelte:window bind:innerWidth={width}></svelte:window>

<article style:left='{moveIn ? `0` : `${width}px`}' >
    {#if id != undefined}
    <div class="top">
        <div class="close" on:click={forward}>
            <Icon data={angleLeft} scale={2} />
        </div>

        {#await dataPromise}
            <h1 class='placeholder'></h1>
            <h3 class='placeholder'></h3>
            <div class="detail">
                <p class='placeholder'></p>
                <p class='placeholder'></p>
            </div>
        {:then data}
            <h1>{data[0].name}</h1>
            <h3>{data.result2[0].positions}</h3>
            <div class="detail">
                <p>Jumlah artikel : {data[0].count.toLocaleString('de-DE')}</p>
                <p>Cakupan media sosial : {data[0].count.toLocaleString('de-DE')}</p>
            </div>
        {:catch error}
            <p>an error occured</p>
        {/await}
    </div>
    <div class="bottom">
        {#await dataPromise}
            <div class="placeholder-container">
                <Fa icon={faSpinner} size="3x" pulse />
            </div>
        {:then data}
        <section id='section-1'>
            <h3>Sentiment Analysis</h3>
            <div class="inner-section">
                <div class="profile" bind:clientWidth={profilewidth}>
                    <PieChart
                        percent1 = {100}
                        percent2 = {Math.abs(Math.ceil((parseInt(data[0].neutral))/(parseInt(data[0].positive)+parseInt(data[0].negative)+parseInt(data[0].neutral))*100))+Math.abs(Math.ceil((parseInt(data[0].negative))/(parseInt(data[0].positive)+parseInt(data[0].negative)+parseInt(data[0].neutral))*100))}
                        percent3 = {Math.abs(Math.ceil((parseInt(data[0].negative))/(parseInt(data[0].positive)+parseInt(data[0].negative)+parseInt(data[0].neutral))*100))}
                        imagelink = {data[0].thumbnail}
                        size = {profilewidth}
                        bind:fgColor1
                        bind:fgColor2
                        bind:fgColor3
                    />
                </div>
                <div class="right">
                    <div class="data pos">
                        <p>positive</p>
                        <p class='percent positive' style:color={fgColor1}>
                            {Math.abs(Math.ceil((parseInt(data[0].positive))/(parseInt(data[0].positive)+parseInt(data[0].negative)+parseInt(data[0].neutral))*100))}%
                        </p>
                    </div>
                    <div class="data neg">
                        <p>negative</p>
                        <p class='percent negative' style:color={fgColor3}>
                            {Math.abs(Math.ceil((parseInt(data[0].negative))/(parseInt(data[0].positive)+parseInt(data[0].negative)+parseInt(data[0].neutral))*100))}%
                        </p>
                    </div>
                    <div class="data neu">
                        <p>neutral</p>
                        <p class='percent neutral' style:color={fgColor2}>
                            {Math.abs(Math.ceil((parseInt(data[0].neutral))/(parseInt(data[0].positive)+parseInt(data[0].negative)+parseInt(data[0].neutral))*100))}%
                        </p>
                    </div>
                </div>
            </div>
            
        </section>
        <section>
            <h3>Statement List</h3>
        </section>
        {:catch error}
            <p>an error occured</p>
        {/await}
    </div>
    <div class="foot">
        <button>
            Selengkapnya
        </button>
    </div>

    {/if}
</article>

<style>
    .placeholder-container {
        width:100%;
        height:60vh;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 0.8rem;
        color: hsl(0,0%,50%);
    }
    .placeholder {
        background-color:hsl(0, 0%, 88%);
        border-radius: 0.25rem;
    }
    h1.placeholder {
        height:1.5rem;
        width:50%;
    }
    h3.placeholder {
        height:1rem;
        width:80%;
    }
    p.placeholder {
        height:0.8rem;
        width:40%;
        margin-bottom: 0.25rem;
    }
    h1 {
        font-family: var(--fontfamily1);
        font-weight: 500;
        font-size: 1.5rem;
        margin-bottom: 0.2rem;
        margin-top: 0.5rem;
        margin-left: 5%;
        color: var(--color-brand-darkblue)
    }
    h3 {
        margin-left: 5%;
        font-family: var(--fontfamily1);
        font-weight: 500;
        font-size: 1rem;
        color: var(--color-brand-darkblue);
        margin-top: 0.2rem;
        margin-bottom: 0.5rem;
    }
    .detail {
        font-family: var(--fontfamily2);
        margin-left: 5%;
        padding-bottom: 1rem;
        font-size: 0.8rem;
    }
    article {
        position: fixed;
        height:100vh;
        width:100vw;
        background-color: hsla(0, 0%, 93%, 1);
        z-index: 1000;
        transition: left 200ms ease-in-out;
    }
    .top {
        padding-left: 1rem;
        padding-right: 1rem;
        background-color: #fafafa;
        width:100%;
    }
    .bottom {
        margin-top: 1rem;
        margin-left: 1rem;
        margin-right: 1rem;
        width:calc(100% - 2rem);
    }
    .close {
        padding-top: 1rem;
    }
    section {
        width:100%;
        margin-top: 0.5rem;
        margin-bottom: 0.5rem;
        border-radius: 1rem;
        background-color: #fafafa;
        padding-top: 0.5rem;
        padding-bottom: 0.5rem;
    }
    .profile {
        width:45%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        text-align: center;
    }
    .inner-section {
        display: flex;
        flex-direction: row;
        justify-content: space-evenly;
    }
    .right {
        width:45%;
        display: flex;
        flex-direction: column;
    }
    p {
        margin-top: 0;
        margin-bottom: 0;
    }
    .data {
        margin-bottom: 0.5rem;
        font-size:0.8rem;
        font-family: var(--fontfamily2);
    }
    .percent {
        font-size: 1.5rem;
        font-weight: 800;
        font-family: var(--fontfamily1);
    }
    .foot {
        position: fixed;
        bottom: 0;
        height: 50px;
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    button {
        border-radius: 0.25rem;
        background-color: var(--color-brand-red);
        color: #fafafa;
    }

</style>