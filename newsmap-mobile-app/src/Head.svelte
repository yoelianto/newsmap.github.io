<script>
    import Icon from 'svelte-awesome';
    import { search, bars } from 'svelte-awesome/icons';
    import { createEventDispatcher } from 'svelte';
    import BurgerMenu from './BurgerMenu.svelte';
    import Search from './Search.svelte';
    import { url } from '@roxi/routify'

    const dispatch = createEventDispatcher()

    export let height
    export let page
    export let burgerIn, searchIn, searchValue

    let colorBrandWhite = "#fafafa",
		colorBrandRed = "#ef5959",
		colorBrandDarkBlue = "#242053",
		colorBrandBlue ="#A4D9D2";

    //page == artikel (jurno, rewara), logo mepet kiri
    //page == deduktif, logo mepet kiri, tab mepet kanan --> space between
    //page == homepage & indeks, logo tengah, kiri hamburger menu --> center
</script>
<!-- CENTER -->
<!-- LEFT -->
<BurgerMenu
    bind:burgerIn
    bind:page
    --color-brand-dark-blue= {colorBrandDarkBlue}
    --color-brand-white = {colorBrandWhite}
    --color-brand-red = {colorBrandRed}
/>
<Search
    bind:searchIn
    --color-brand-red = {colorBrandRed}
    bind:searchValue
/>
<nav>
    {#if page == 'artikel' || 'indeks'}
        <div class="container" style="background-color:#fafafa}" bind:clientHeight={height}>
            <div class="header-logo" style='justify-content:{page =='artikel' ? 'flex-start' : 'space-between'}'>
                {#if page == 'artikel'}
                    <a href={$url('/')}>
                        <img src="./images/logo-jurno-web.svg" alt="Logo Jurno Website">
                    </a>
                {/if}
                {#if page == 'indeks'}
                    <div class="before" on:click={()=> {burgerIn = true}} style="cursor:pointer">
                        <Icon data={bars} />
                    </div>
                    <a href={$url('/')}>
                        <img src="./images/logo-jurno-web.svg" alt="Logo Jurno Website">
                    </a>
                    <div class="after" on:click={()=> {searchIn = true}} style="cursor:pointer">
                        <Icon data={search} />
                    </div>
                {/if}
                
            </div>
        </div>
    {/if}
    {#if page == 'deduktif' }
        <div class="container"
            style="background-color:#050505;
                display:flex;
                justify-content:space-between;
                flex-direction:row"
            bind:clientHeight={height}>
            <div class="deduktif-logo" style="margin-left:6%">
                <a href={$url('/')}>
                    <img src="./images/deduktif.svg" alt="Logo Deduktif Website"
                    style="filter: invert(54%) sepia(65%) saturate(1029%) hue-rotate(318deg) brightness(87%) contrast(114%);">
                </a>
            </div>
            <div class="deduktif-menu" style="margin-right:6%">
                <a href={$url('/deduktif')}>
                    Laporan
                </a>
                <div class="vert"></div>
                <a href={$url('/deduktif/about')}>
                    Tentang Kami
                </a>
                <div class="vert"></div>
                <a href={$url('/deduktif/redaksi')}>
                    Redaksi
                </a>
            </div>
        </div>
    {/if}
    {#if page == 'indeksdeduktif'}
        <div class="container" style="background-color:#050505" bind:clientHeight={height}>
            <div class="header-logo" style='justify-content:{page =='artikel' ? 'flex-start' : 'space-between'}'>
                    <div class="before" on:click={()=> {burgerIn = true}} style="cursor:pointer">
                        <Icon data={bars} style='color:#fafafa'/>
                    </div>
                    <a href={$url('/')}>
                        <img src="./images/deduktif.svg" alt="Logo Deduktif Website"
                    style="filter: invert(54%) sepia(65%) saturate(1029%) hue-rotate(318deg) brightness(87%) contrast(114%);">
                    </a>
                    <div class="after" on:click={()=> {searchIn = true}} style="cursor:pointer">
                        <Icon data={search} style='color:#fafafa'/>
                    </div>
            </div>
        </div>
    {/if}
</nav>

<style>
    a {
        color:#fafafa !important;
        text-decoration: none !important;
    }
    .vert {
        border-left: 1px solid white;
        height:20px;
        margin-left: 0.5rem;
        margin-right: 0.5rem;
    }
    nav {
        z-index: 999;
        background-color: #fafafa;
        position: fixed;
        top: 0;
    }
    .deduktif-menu {
        font-family: 'Roboto Mono', monospace;
        font-size: 0.6rem;
        display: flex;
        align-items: center;
    }
    .header-logo{
        width: 88%;
        display: flex;
        background-color: var(--color-brand-white);
        z-index: 2;
        align-items: center;
    }
    img {
        margin:0.3rem auto;
        height:25px;
    }
    .container {
        z-index: 99;
        width:100vw;
        display: flex;
        flex-direction: column;
        align-items: center;
    }
    @media only screen /*xtrasmall*/
	and (max-width: 575px) {
        img {
            margin:0.3rem auto;
            height:25px;
        }
	}
	@media only screen /*small*/
	and (min-width: 576px)
	and (max-width: 767px) {
        img {
            margin: 1.25vw;
        }
        .deduktif-menu {
            font-size: 0.6rem;
        }
	}
	@media only screen /*medium*/
	and (min-width: 768px)
	and (max-width: 991px) {
        img {
            margin: 1vw;
            height:7vw;
        }
        .deduktif-menu {
            font-size: 0.8rem;
        }

	}
	@media only screen /*large*/
	and (min-width: 992px)
	and (max-width: 1199px) {
        img {
            margin: 1vw;
            height:7vw;
        }
        .deduktif-menu {
            font-size: 1rem;
        }

	}
	@media only screen /*xtralarge*/
	and (min-width: 1200px) {
        img {
            margin:0.5vw;
            height:2.5vw;
        }
        .deduktif-menu {
            font-size: 1rem;
        }

	}
</style>