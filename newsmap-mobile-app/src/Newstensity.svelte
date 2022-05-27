<script>
    import { get } from "./api";
    import * as ihttp from './constants/initialHttp';
    import Icon from 'svelte-awesome';
    import { angleLeft, angleRight } from 'svelte-awesome/icons';
    import { createEventDispatcher } from 'svelte';
    import PieChart from "./PieChart.svelte";
    import Fa from 'svelte-fa'
    import { faSpinner, faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons'
    import moment from "moment";
    import { onMount } from 'svelte';
    import Siema from 'siema'

    let width

    let slider, radioSlider
    let select = 0;

    const siema = (node, options) => {
        slider = new Siema({
                selector: '.siema',
                duration: 200,
                easing: 'ease-in-out',
                perPage: 1,
                startIndex: 0,
                draggable: true,
                multipleDrag: true,
                threshold: 20,
                loop: true,
                rtl: false,
                onInit: () => {},
                onChange: () => {select = slider.currentSlide},
        }); //end Siema constructor
    }

    const prev = () => {
		if (!slider) return;
		slider.prev()
		select = slider.currentSlide;
	}

	const next = () => {
		if (!slider) return;
		slider.next()
		select = slider.currentSlide;
	}


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

    let profilewidth
    let fgColor1 = 'hsl(244, 30%, 30%)'
    let fgColor2 = 'hsl(244, 30%, 70%)'
    let fgColor3 = 'hsl(0, 82%, 64%)'

    let dataPromise, entityPromise


    const fetchData = (async () => {
        const result = await get(ihttp.URI_NEWS_TOP_ENTITY, { size:1, from:yesterday, to:today, entities:id, type:'person'})
        const result2 = await get(ihttp.URI_ENTITY_PROFILE, { entity_id:id });
        const result3 = await get(ihttp.URI_ENTITY_VOICES, { from:yesterday, to:today, entity_id:id });
        const statementlist = await get(ihttp.URI_NEWS_STATEMENT_LIST, { from:yesterday, to:today, size:20, entities:id })

        let filter = result.data.filter((data) => {
             return data.id == id
        })

        let statement = statementlist.data

        let allResult = [{...filter,result2,...result3, statement}]
        return allResult
    })


    const fetchEntity = (async () => {
        const topicResult = await get(ihttp.URI_LAST_TOPIC, {_id:topicId})
        const result = await get(ihttp.URI_NEWS_TOP_ENTITY, { from:yesterday, to:today, topic_id:topicId, type:'person' });
        const newsList = await get(ihttp.URI_NEWS_LIST, { topic_id:topicId, from:yesterday, to:today })

        //const statResult = await get(ihttp.URI_NEWS_LAST_TOPIC_STAT)
        let filter = topicResult.data.filter((data) => {
             return data._id == topicId
        })

        let news = newsList.data
        let allResult = [...filter, news, ...result.data ]
        return allResult
    })
    
    $: if (id) {
        dataPromise = fetchData()
    }
    $: if (topicId) {
        entityPromise = fetchEntity()
    } 


</script>

<svelte:window bind:innerWidth={width}></svelte:window>
<svelte:head>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/tiny-slider/2.9.2/min/tiny-slider.js"></script>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/tiny-slider/2.9.4/tiny-slider.css">
</svelte:head>
<article style:left='{moveIn ? `0` : `${width}px`}' >
    {#if type == 'topic'}
        {#if topicId != undefined}
            <div class="top">
                <div class="close" on:click={forward}>
                    <Icon data={angleRight} scale={2} />
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
                        <div class="inner-section" id='newslist'>

                            <div class="news-container">
                                {#each data[1] as d}
                                <a class='newstensity-link' href={d.source_url}>
                                    <p style='color:hsl(0,0%,50%);font-size:0.8rem'>{d.media}</p>
                                    <div class="news-tab">
                                        <p class='news-title'>{d.title}</p>
                                        <p class="sentiment"
                                            style='background-color:{d.sentiment == 'positive' ? '#242053' : d.sentiment == 'neutral' ? 'hsl(0,0%,50%)' : '#ef5959' }'>
                                            {d.sentiment}
                                        </p>
                                    </div>
                                </a>
                                {/each}
                            </div>

                        </div>
                    </section>
                {:catch error}
                    <p>an error occured</p>
                {/await}
            </div>
            <div class="foot">
                <button on:click={forward}>
                    Tutup
                </button>
            </div>

            {/if}
    {/if}

    <!----------------------------------------------------------------------->

    {#if type == 'people'}
        {#if id != undefined}
        <div class="top">
            <div class="close" on:click={forward}>
                <Icon data={angleRight} scale={2} />
            </div>

            {#await dataPromise}
                <h1 class='placeholder'></h1>
                <h3 class='placeholder'></h3>
                <div class="detail">
                    <p class='placeholder'></p>
                    <p class='placeholder'></p>
                </div>
            {:then data}
                {#each data as d}
                    <h1>{d[0].name}</h1>
                    <h3>{d['result2'][0].positions[0]}</h3>
                    <div class="detail">
                        <p>Jumlah artikel : {d[0].count.toLocaleString('de-DE')}</p>
                        <p>Cakupan media sosial : {(d.Facebook+d.Instagram+d.Twitter+d.Youtube).toLocaleString('de-DE')}</p>
                    </div>
                {/each}
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
            {#each data as d}
            <section id='section-1'>
                <h3>Media Sentiment Analysis</h3>
                <div class="inner-section">
                    <div class="profile" bind:clientWidth={profilewidth}>
                        <PieChart
                            percent1 = {100}
                            percent2 = {Math.abs(Math.ceil((parseInt(d[0].neutral))/(parseInt(d[0].positive)+parseInt(d[0].negative)+parseInt(d[0].neutral))*100))+Math.abs(Math.ceil((parseInt(d[0].negative))/(parseInt(d[0].positive)+parseInt(d[0].negative)+parseInt(d[0].neutral))*100))}
                            percent3 = {Math.abs(Math.ceil((parseInt(d[0].negative))/(parseInt(d[0].positive)+parseInt(d[0].negative)+parseInt(d[0].neutral))*100))}
                            imagelink = {d[0].thumbnail}
                            size = {profilewidth}
                            bind:fgColor1
                            bind:fgColor2
                            bind:fgColor3
                        />
                    </div>
                    <div class="right">
                        <div class="percentage">
                            <div class="data pos">
                                <p>positive</p>
                                <p class='percent positive' style:color={fgColor1}>
                                    {Math.abs(Math.ceil((parseInt(d[0].positive))/(parseInt(d[0].positive)+parseInt(d[0].negative)+parseInt(d[0].neutral))*100))}%
                                </p>
                            </div>
                            <div class="data neg">
                                <p>negative</p>
                                <p class='percent negative' style:color={fgColor3}>
                                    {Math.abs(Math.ceil((parseInt(d[0].negative))/(parseInt(d[0].positive)+parseInt(d[0].negative)+parseInt(d[0].neutral))*100))}%
                                </p>
                            </div>
                            <div class="data neu">
                                <p>neutral</p>
                                <p class='percent neutral' style:color={fgColor2}>
                                    {Math.abs(Math.ceil((parseInt(d[0].neutral))/(parseInt(d[0].positive)+parseInt(d[0].negative)+parseInt(d[0].neutral))*100))}%
                                </p>
                            </div>
                        </div>
                        <!-- <div class="persepsi">
                            Persentase diambil dari besaran persepsi publik yang ada di sosial media.
                        </div> -->
                        
                    </div>
                </div>
                
            </section>
            {/each}
            <section>
                <h3>Statement List</h3>
                <div class="inner-section" id='statementlist'>

                    <div class="news-container">
                        {#each data[0]['statement'] as d}
                        <a class='statement-link' href={d.sourceUrl} >
                            <div class="statement">
                                <p style='color:hsl(0,0%,50%);font-size:0.8rem'>{d.media}</p>
                                <div class="news-tab">
                                    <div>
                                        <p class='news-title'>{d.statement_text}</p>
                                        <p class='statement-entity'>{d.statement_entity}</p>
                                    </div>
                                    <p class="sentiment"
                                        style='background-color:{d.statement_sentiment == 'positive' ? '#242053' : d.statement_sentiment == 'neutral' ? 'hsl(0,0%,50%)' : '#ef5959' }'>{d.statement_sentiment}</p>
                                </div>
                            </div>
                        </a>
                        {/each}
                    </div>
                        
                </div>
                    
            </section>
            
            {:catch error}
                <p>an error occured</p>
            {/await}
        </div>
        <div class="foot">
            <button on:click={forward}>
                Tutup
            </button>
        </div>

        {/if}
    {/if}
</article>

<style>
    a.newstensity-link {
        text-decoration: none !important;
    }
    a.newstensity-link:hover {
        text-decoration: none !important;
    }
    a.newstensity-link:active {
        text-decoration: none !important;
    }
    a.statement-link {
        text-decoration: none !important;
    }
    a.statement-link:hover {
        text-decoration: none !important;
    }
    a.statement-link:active {
        text-decoration: none !important;
    }
    .news-container {
        display: flex;
        flex-direction: column;
        width: 100%;
        white-space: normal;
    }
    .statement {
        margin-right:1rem;
        white-space: normal;
        width:90%;
    }
    .news-tab {
        width:100%;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
    }
    .sentiment {
        font-size: 0.6rem;
        padding:0.25rem;
        border-radius: 0.25rem;
        color:#fafafa;
        background-color: black;
        margin-left: 1rem;
        height: fit-content;
    }
    .statement-entity {
        font-size: 0.8rem;
        font-family: var(--fontfamily2);
        margin-top:0;
        margin-bottom: 0.8rem;
        color:hsl(0,0%,50%);
        white-space: normal;
    }
    .news-title {
        font-size: 0.8rem;
        font-family: var(--fontfamily2);
        font-weight: 500;
        margin-bottom: 0.2rem;
        color:black;
        white-space: normal;
    }
    .person {
        display: flex;
        flex-direction: column;
        margin-left: 0.25rem;
        margin-right:0.25rem;
        width:15%;
    }
    .person p {
        width: 100%;
        white-space:normal;
        font-family: var(--fontfamily2);
        font-size: 0.6rem;
        text-align: center;
        margin-top: 0.5rem;
    }
    .persepsi {
            width:100%;
            white-space: normal;
            font-size: 0.6rem;
        }
    .imgperson {
        width: 100%;
        aspect-ratio: 1/1;
        overflow: hidden;
        background-color: hsl(0, 0%, 88%);
        border-radius: 50%;
    }
    .imgperson img {
        width: 100%;
    }
    .keywords {
        display: flex;
        width:80vw;
        max-width:650px;
        flex-wrap: wrap;
        margin:0 auto;
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
        width:80%;
        max-width:650px;
        margin:0 auto;
        padding-bottom: 1rem;
        font-size: 0.8rem;
    }
    h1 {
        width:80%;
        max-width:650px;
        margin:0.5rem auto;
        white-space: normal;
    }
    h3 {
        width:80%;
        max-width:650px;
        margin:0.5rem auto;
        white-space: normal;
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
        cursor: pointer;
    }
    section {
        margin-left: auto;
        margin-right: auto;
        width:80%;
        max-width:650px;
        margin-top: 0.5rem;
        margin-bottom: 0.5rem;
        border-radius: 1rem;
        background-color: #fafafa;
        padding-top: 0.5rem;
        padding-bottom: 0.5rem;
    }
    .profile {
        width:45%;
        max-width: 150px;
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
    .inner-section#newslist {
        overflow-y: scroll;
        height:250px;
        width:80%;
        max-width: 650px;
        margin-left: auto;
        margin-right: auto;
    }
    .inner-section#statementlist {
        overflow-y: scroll;
        height:150px;
        width:80%;
        max-width: 650px;
        margin-left: auto;
        margin-right: auto;
    }
    .right {
        width:45%;
        display: flex;
        flex-direction: column;
    }
    p {
        font-size: 0.6rem;
        margin-top: 0;
        margin-bottom: 0;
    }
    .data {
        margin-bottom: 0.5rem;
        font-size:0.8rem;
        font-family: var(--fontfamily2);
    }
    .percent {
        font-size: 1rem;
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
        cursor: pointer;
    }
    .inner-section::-webkit-scrollbar {
	    width: 0.5em;
    }

    .inner-section::-webkit-scrollbar-thumb {
        background-color: #A4D9D2;
        border-radius: 0.25em;
    }
    @media only screen /*large*/
	and (min-width: 992px)
	and (max-width: 1199px) {
        .right {
            flex-direction: row;
            justify-content: space-around;
            text-align: center;
            align-items: center;
        }
        .percent{
            font-size: 2.5rem;
        }
        p {
            font-size: 0.8rem;
        }
	}
	@media only screen /*xtralarge*/
	and (min-width: 1200px) {
        .right {
            flex-direction: column;
            
        }
        .percentage {
            display: flex;
            flex-direction: row;
            justify-content: space-around;
            text-align: center;
            align-items: center;
        }
        .percent{
            font-size: 3rem;
        }
        .persepsi {
            width:100%;
            white-space: normal;
            font-size: 0.8rem;
        }
        p {
            font-size: 0.8rem;
        }

	}
</style>