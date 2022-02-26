<script>
    import { cubicInOut, quintInOut } from 'svelte/easing';
    import { tweened } from 'svelte/motion';
    import * as animateScroll from "svelte-scrollto";
    export let height;
    
    const tweenConfig1 = {
        duration: 500,
        easing: cubicInOut
    };
    const tweenConfig2 = {
        duration: 500,
        easing: cubicInOut,
        delay:20
    };
    const tweenConfig3 = {
        duration: 500,
        easing: cubicInOut,
        delay:40
    };
    const barPosition1 = tweened(0, tweenConfig1);
    const barPosition2 = tweened(0, tweenConfig2);
    const barPosition3 = tweened(0, tweenConfig3);

    let menus = [
        {menu:'Newsmap',id:0, active:true, link:"#newsmap"},
        {menu:'Original',id:1, active:false, link:"#original"},
        {menu:'Deduktif',id:2, active:false, link:"#deduktif"},
        {menu:'Podcast',id:3, active:false, link:"#podcast"}
    ]

    const menuClick = (id) => {
        menus.forEach((menu) => {
            menu.active = false;
        })
        menus[id].active = true;

        animateScroll.scrollTo({element: menus[id].link, offset: -150})

        barPosition1.set(id)
        barPosition2.set(id)
        barPosition3.set(id)
    }
   
</script>

<nav>
    <div class="container" bind:clientHeight={height}>
        <div class="header-logo">
            <h1>Newsmap.id (logo)</h1>
        </div>
        <div class="header-menu">
            <div class="headertext">
                {#each menus as list, key}
                    <h4 class="menu"
                        id={list.id}
                        on:click={()=> {menuClick(key)}}
                        class:selected ="{list.active === true}"
                    >
                        {list.menu}
                    </h4>
                {/each}
            </div>
            <div class="bar" style="left:{$barPosition1*25+8.5}vw"></div>
            <div class="bar" style="left:{$barPosition2*25+8.5}vw"></div>
            <div class="bar" style="left:{$barPosition3*25+8.5}vw"></div>
        </div>
    </div>
    
</nav>

<style>
    .container {
        height:35vw;
        z-index: 99;
        position: fixed;
        background-color: #EAE9E5;
        width:100vw;
    }
    .headertext {
        display:flex;
        justify-content: center;
        color:#B9B5A8;
    }
    .selected {
        color:black;
    }
    .menu {
        width:25vw;
        text-align: center;
        color:#B9B5A8;
    }
    .header-menu {
        display: flex;
        flex-direction: column;
    }

    .bar {
        width:12.5vw;
        height:0.25rem;
        background-color: #2EAFBE;
        border-radius: 0.25rem;
        display: block;
        position: absolute;
        z-index: 200;
        bottom: 1rem;
        left: 8.5vw;
        width: 10vw;
        pointer-events: none;
    }
    .bar:nth-child(1) {
		transition: calc(500 * .8);
	}
	.bar:nth-child(2) {
		transition: calc(500 * 1.2);
	}

    h4 {
        font-family: 'Jost';
        font-size:1rem;
        font-weight:700; 
        margin: 1rem 1rem;
    }
</style>