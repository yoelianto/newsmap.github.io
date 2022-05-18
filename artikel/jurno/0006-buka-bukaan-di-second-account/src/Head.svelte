<script>
    export let height
</script>

<nav>
    <div class="container" bind:clientHeight={height}>
        <div class="header-logo">
            <a href='https://dev.jurno.id'>
                <img src="./images/logo-jurno-web.svg" alt="Logo Jurno Website">
            </a>
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
        width: 100%;
        display: flex;
        background-color: var(--color-brand-white);
        z-index: 2;
        justify-content: center;
        align-items: center;
    }
    img {
        height:2.5vw;
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
            margin: 1vw;
            height:7vw;
        }
	}
	@media only screen /*medium*/
	and (min-width: 768px)
	and (max-width: 991px) {
        img {
            margin: 1vw;
            height:7vw;
        }
	}
	@media only screen /*large*/
	and (min-width: 992px)
	and (max-width: 1199px) {
        img {
            margin: 1vw;
            height:7vw;
        }
	}
	@media only screen /*xtralarge*/
	and (min-width: 1200px) {
        img {
            margin:0.5vw;
            height:2.5vw;
        }
	}
</style>