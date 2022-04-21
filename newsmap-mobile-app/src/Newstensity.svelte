<script>
    import { get } from "./api";
    import * as ihttp from './constants/initialHttp';
    import Icon from 'svelte-awesome';
    import { angleLeft } from 'svelte-awesome/icons';
    import { createEventDispatcher } from 'svelte';
    import PieChart from "./PieChart.svelte";

    const dispatch = createEventDispatcher()

    function forward(event) {
        dispatch('modalOut')
        // dispatch('name', event.path[2].children[1].children[1].innerHTML)
    }

    export let moveIn
    export let name, pos, neg, neu, count, img
    let width
    let profilewidth
    let fgColor1 = 'hsl(244, 30%, 30%)'
    let fgColor2 = 'hsl(244, 30%, 70%)'
    let fgColor3 = 'hsl(0, 82%, 64%)'

</script>

<svelte:window bind:innerWidth={width}></svelte:window>

<article style:left='{moveIn ? `0` : `${width}px`}' >
    <div class="close" on:click={forward}>
        <Icon data={angleLeft} scale={2} />
    </div>
    <h1>{name}</h1>
    <section id='section-1'>
        <h3>Sentiment Analysis</h3>
        <div class="inner-section">
            <div class="profile" bind:clientWidth={profilewidth}>
                <PieChart 
                    percent1 = {100}
                    percent2 = {Math.abs(Math.ceil((parseInt(neu))/(parseInt(pos)+parseInt(neg)+parseInt(neu))*100))+Math.abs(Math.ceil((parseInt(neg))/(parseInt(pos)+parseInt(neg)+parseInt(neu))*100))}
                    percent3 = {Math.abs(Math.ceil((parseInt(neg))/(parseInt(pos)+parseInt(neg)+parseInt(neu))*100))}
                    imagelink = {img}
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
                        {Math.abs(Math.ceil((parseInt(pos))/(parseInt(pos)+parseInt(neg)+parseInt(neu))*100))}%
                    </p>
                </div>
                <div class="data neg">
                    <p>negative</p>
                    <p class='percent negative' style:color={fgColor3}>
                        {Math.abs(Math.ceil((parseInt(neg))/(parseInt(pos)+parseInt(neg)+parseInt(neu))*100))}%
                    </p>
                </div>
                <div class="data neu">
                    <p>neutral</p>
                    <p class='percent neutral' style:color={fgColor2}>
                        {Math.abs(Math.ceil((parseInt(neu))/(parseInt(pos)+parseInt(neg)+parseInt(neu))*100))}%
                    </p>
                </div>
            </div>
        </div>
        
    </section>
    <section>
        <h3>Statement List</h3>
    </section>
    <button>
        Trial by Combat
    </button>

</article>

<style>
    h1 {
        font-family: 'Roboto Mono';
        font-weight: 500;
        font-size: 1.5rem;
        margin-bottom: 0.2rem;
    }
    h3 {
        margin-left: 5%;
        font-family: 'Roboto Mono';
        font-weight: 500;
        font-size: 1rem;
    }
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
        margin-top: 0.5rem;
        margin-bottom: 0.5rem;
        border: 1px black solid;
        border-radius: 1rem;
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
    }
    .percent {
        font-size: 1.5rem;
        font-weight: 800;
        font-family: 'Roboto Mono';
    }

</style>