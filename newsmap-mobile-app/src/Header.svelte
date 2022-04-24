<script>
    import { cubicInOut, quintInOut } from 'svelte/easing';
    import Head from './Head.svelte';
    import { tweened } from 'svelte/motion';
    import * as animateScroll from "svelte-scrollto";
    
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
        {menu:'Jurno',id:0, active:true, link:"#jurno"},
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

    export let showHeader

</script>

<nav>
    <div class="container">
        <Head
            page='indeks'
        />
        <div class="header-menu" class:moveUp={!showHeader}>
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
            <!-- <div class="headerbar">
                <div class="bar" style="left:{$barPosition1*25+8.5}vw"></div>
                <div class="bar" style="left:{$barPosition2*25+8.5}vw"></div>
                <div class="bar" style="left:{$barPosition3*25+8.5}vw"></div>
            </div> -->
        </div>
    </div>
    
</nav>

<style>
    nav {
        z-index: 999;
    }
    /* .header-logo{
        width: 100%;
        display: flex;
        background-color: var(--color-brand-white);
        position: absolute;
        z-index: 2;
    }
    img {
        margin:0.5rem auto;
        height:35px;
    } */
    .container {
        z-index: 99;
        position: fixed;
        width:100vw;
        display: flex;
        flex-direction: column;
        align-items: center;
        height: calc(35px + 1rem);
    }
    .headertext {
        display:flex;
        justify-content: center;
        color:#B9B5A8;
        margin-bottom: 0.5rem;
    }
    .selected {
        color:black;
    }
    .menu {
        width:25vw;
        text-align: center;
        color:var(--color-brand-red);
        cursor: pointer;
    }
    .header-menu {
        display: flex;
        flex-direction: column;
        background-color: var(--color-brand-white);
        width:100vw;
        position: absolute;
        transition: top 400ms ease-in-out;
        top: calc(0.6rem + 25px);
        /* box-shadow: 0rem -1rem 1rem 1rem rgba(0,0,0,0.1); */
    }
    .moveUp {
        top:0;
        transition: top 400ms ease-in-out;
    }
    /* .headerbar {
        position: relative;
        width: 100vw;
        height:0.25rem;
    }
    .bar {
        width:12.5vw;
        height:0.25rem;
        background-color: var(--color-brand-blue);
        border-radius: 0.25rem;
        display: block;
        position: absolute;
        z-index: 200;
        top: 0;
        left: 8.5vw;
        width: 10vw;
        pointer-events: none;
    }
    .bar:nth-child(1) {
		transition: calc(500 * .8);
	}
	.bar:nth-child(2) {
		transition: calc(500 * 1.2);
	} */

    h4 {
        font-family: var(--fontfamily3);
        font-size:1rem;
        font-weight:700; 
        margin: 0.2rem 1rem;
    }

    @media only screen /*xtrasmall*/
	and (max-width: 575px) {
        .container {
           height: calc(25px + 0.6rem);
        }

	}
	@media only screen /*small*/
	and (min-width: 576px)
	and (max-width: 767px) {
 
	}
	@media only screen /*medium*/
	and (min-width: 768px)
	and (max-width: 991px) {
        .container {
            height:calc(35px + 1rem);;
            width:100%;
        }
        .header-menu {
            width: 60vw;
            margin:0 auto;
        }
        h4 {
            font-size:1.5rem;
        }
	}
	@media only screen /*large*/
	and (min-width: 992px)
	and (max-width: 1199px) {

	}
	@media only screen /*xtralarge*/
	and (min-width: 1200px) {
        .container {
            height: calc(35px + 1rem);
        }
        .header-menu {
            width: 60vw;
            margin:0 auto;
        }
        h4 {
            font-size:1.5rem;
        }
        h4:hover {
            color:#242053;
            transition:color 400ms ease-in-out;
        }
	}
</style>