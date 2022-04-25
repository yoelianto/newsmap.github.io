<script>
    import { get } from "./api";
    import * as ihttp from './constants/initialHttp';
    import Icon from 'svelte-awesome';
    import { angleLeft } from 'svelte-awesome/icons';
    import { createEventDispatcher } from 'svelte';
    import PieChart from "./PieChart.svelte";
    import Fa from 'svelte-fa'
    import { faSpinner } from '@fortawesome/free-solid-svg-icons'
    import moment from "moment";

    let today = moment().format("YYYY-MM-DD")
    let yesterday = moment().subtract(1, 'days').format("YYYY-MM-DD")

    let keywordPlaceholder = [1,2,3,4,5]

    const dispatch = createEventDispatcher()

    function forward(event) {
        dispatch('modalOut')
    }

    export let moveIn

    export let id
    export let topicId, newsId
    export let type

    let width
    let profilewidth
    let fgColor1 = 'hsl(244, 30%, 30%)'
    let fgColor2 = 'hsl(244, 30%, 70%)'
    let fgColor3 = 'hsl(0, 82%, 64%)'

    let dataPromise, entityPromise, sosmed

    export let params = {}

    const fetchData = (async () => {
        const mergeParams = {...params, kind: 'person', size:10}

        const result = await get(ihttp.URI_NEWS_TOP_ENTITY, mergeParams);
        const result2 = await get(ihttp.URI_ENTITY_PROFILE, {entity_id:id});
        const result3 = await get(ihttp.URI_ENTITY_VOICES, {from:yesterday, to:today,entity_id:id});

        let filter = result.data.filter((data) => {
             return data.id == id
        })

        let allResult = [{...filter[0], ...result2, ...result3}]
        return allResult
    })


    const fetchEntity = (async () => {
        const topicResult = await get(ihttp.URI_LAST_TOPIC, {_id:topicId})
        const result = await get(ihttp.URI_NEWS_TOP_ENTITY, { from:yesterday, to:today, topic_id:topicId, type:'person' });
        const newsList = await get(ihttp.URI_NEWS_LIST, {topic_id:newsId})
        //const statResult = await get(ihttp.URI_NEWS_LAST_TOPIC_STAT)
        let filter = topicResult.data.filter((data) => {
             return data._id == topicId
        })
        console.log(newsList)
        //console.log(statResult)
        let allResult = [...filter, ...result.data]
        return allResult
    })

    $: id, dataPromise = fetchData()
    $: topicId, entityPromise = fetchEntity()

</script>

<svelte:window bind:innerWidth={width}></svelte:window>

<article style:left='{moveIn ? `0` : `${width}px`}' >
    {#if type == 'topic'}
    {#if topicId != undefined}
        <div class="top">
            <div class="close" on:click={forward}>
                <Icon data={angleLeft} scale={2} />
            </div>
            {#await entityPromise}
                <div class="keywords">
                    {#each keywordPlaceholder as d}
                        <div class='placeholder keyword' style='width:{Math.random() * 50 + 100}px'></div>
                    {/each}
                </div>
                {:then data}
                    <div class="keywords">
                        {#each data[0].keywords as d}
                            <div class='keyword'>{d}</div>
                        {/each}
                    </div>
                {:catch error}
                <p style='margin-left:5%'>An error occured</p>
            {/await}           
        </div>
        <div class="bottom">
            {#await entityPromise}
                <div class="placeholder-container">
                    <Fa icon={faSpinner} size="3x" pulse />
                </div>
            {:then data}
                <section>
                    <h3>Newsmaker</h3>
                    <div class="inner-section" style='justify-content:center'>
                        {#each data as d}
                        {#if d.name != undefined}
                        <div class="person">
                            <div class="imgperson">
                                <img
                                    src={d.thumbnail != null ? d.thumbnail : './images/logo-jurno-web.svg'}
                                    alt={d.name}>
                            </div>
                            <p>{d.name}</p>
                        </div>
                        {/if}
                        {/each}
                    </div>
                </section>
                <section>
                    <h3>News List</h3>
                    <div class="inner-section">
                        
                    </div>
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
    {/if}

    <!----------------------------------------------------------------------->

    {#if type == 'people'}
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
                <h3>{data[0][0].positions[0]}</h3>
                <div class="detail">
                    <p>Jumlah artikel : {data[0].count.toLocaleString('de-DE')}</p>
                    <p>Cakupan media sosial : {(data[0].Facebook+data[0].Instagram+data[0].Twitter+data[0].Youtube).toLocaleString('de-DE')}</p>
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
                <h3>Media Sentiment Analysis</h3>
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
    {/if}
</article>

<style>
    .topic {
        justify-content: center;
    }
    .person {
        display: flex;
        flex-direction: column;
        margin-left: 0.25rem;
        margin-right:0.25rem;
    }
    .person p {
        width: 15vw;
        white-space:normal;
        font-family: var(--fontfamily2);
        font-size: 0.6rem;
        text-align: center;
        margin-top: 0.5rem;
    }
    .imgperson {
        width: 15vw;
        height: 15vw;
        overflow: hidden;
        background-color: hsl(0, 0%, 88%);
        border-radius: 50%;
    }
    .imgperson img {
        width: 100%;
    }
    .keywords {
        margin-left: 5%;
        display: flex;
        width:90vw;
        flex-wrap: wrap;
    }
    .placeholder.keyword {
        height:0.8rem;
    }
    .keyword {
        background-color: var(--color-brand-dark-blue);
        color: #fafafa;
        padding: 0.5rem;
        margin-right: 0.5rem;
        margin-bottom: 0.5rem;
        border-radius: 0.25rem;
        font-family: var(--fontfamily1);
        font-size:0.8rem;
    }
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
        color: var(--color-brand-dark-blue)
    }
    h3 {
        margin-left: 5%;
        font-family: var(--fontfamily1);
        font-weight: 500;
        font-size: 1rem;
        color: var(--color-brand-dark-blue);
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