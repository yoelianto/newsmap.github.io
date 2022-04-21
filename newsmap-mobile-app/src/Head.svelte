<script>
    import Icon from 'svelte-awesome';
    import { search, bars } from 'svelte-awesome/icons';
    import { createEventDispatcher } from 'svelte'

    const dispatch = createEventDispatcher()

    export let height
    export let page
    export let burgerIn

    const forward = (event) => {
        dispatch('burgerIn')
    }

    //page == artikel (jurno, rewara), logo mepet kiri
    //page == deduktif, logo mepet kiri, tab mepet kanan --> space between
    //page == homepage & indeks, logo tengah, kiri hamburger menu --> center
</script>
<!-- CENTER -->
<!-- LEFT -->
<nav>
    <div class="container" bind:clientHeight={height}>
        <div class="header-logo" style='justify-content:{page =='artikel' ? 'flex-start' : 'space-between'}'>
            {#if page == 'artikel'}
                <a href='/'>
                    <img src="./images/logo-jurno-web.svg" alt="Logo Jurno Website">
                </a>
            {/if}
            {#if page == 'deduktif'}
                <a href='/'>
                    <img src="./images/logo-jurno-web.svg" alt="Logo Jurno Website">
                </a>
            {/if}
            {#if page == 'indeks'}
                <div class="before" on:click={forward}>
                    <Icon data={bars} />
                </div>
                <a href='/'>
                    <img src="./images/logo-jurno-web.svg" alt="Logo Jurno Website">
                </a>
                <div class="after">
                    <Icon data={search} />
                </div>
            {/if}
            
        </div>
    </div>    
</nav>

<style>
    nav {
        z-index: 999;
        background-color: #fafafa;
        position: fixed;
        top: 0;
    }
    .header-logo{
        width: 88%;
        display: flex;
        background-color: var(--color-brand-white);
        z-index: 2;
        align-items: center;
    }
    img {
        margin:0.5rem auto;
        height:35px;
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
            margin:0.5rem auto;
            height:35px;
        }
        .container {
            height:10vw;
        }
	}
	@media only screen /*small*/
	and (min-width: 576px)
	and (max-width: 767px) {
        img {
            margin: 1.25vw;
            height:7.5vw;
        }
        .container {
            height:10vw;
        }
	}
	@media only screen /*medium*/
	and (min-width: 768px)
	and (max-width: 991px) {
        img {
            margin: 1vw;
            height:7vw;
        }
        .container {
            height:9vw;
        }
	}
	@media only screen /*large*/
	and (min-width: 992px)
	and (max-width: 1199px) {
        img {
            margin: 1vw;
            height:7vw;
        }
        .container {
            height:9vw;
        }
	}
	@media only screen /*xtralarge*/
	and (min-width: 1200px) {
        img {
            margin:0.5vw;
            height:2.5vw;
        }
        .container {
            height:3.5vw;
        }
	}
</style>