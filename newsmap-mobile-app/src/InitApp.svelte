<script>
    import App from "./App.svelte";
    import { getToken } from "./api";
    import JurnoDetail from "./pages/JurnoDetail.svelte";
    import DeduktifDetail from "./pages/DeduktifDetail.svelte";
    import RewaraDetail from "./pages/RewaraDetail.svelte";
    import NotFound from "./pages/NotFound.svelte";
    import IndeksCari from "./pages/IndeksCari.svelte";
    import IndeksDeduktif from "./pages/IndeksDeduktif.svelte";
    import IndeksJurno from "./pages/IndeksJurno.svelte";
    import IndeksRewara from "./pages/IndeksRewara.svelte";
    import Router from "svelte-spa-router";
    import IndeksInfogram from "./pages/IndeksInfogram.svelte";
    import AboutUs from "./pages/AboutUs.svelte";
    import Contact from "./pages/Contact.svelte";
    import Redaksi from "./pages/Redaksi.svelte";
    import RedaksiDeduktif from "./pages/RedaksiDeduktif.svelte";
    import AboutDeduktif from "./pages/AboutDeduktif.svelte";
    import Fa from 'svelte-fa'
    import { faSpinner } from '@fortawesome/free-solid-svg-icons'

    const routes = {
        "/": App,
        "/article/": IndeksJurno,
        "/deduktif/": IndeksDeduktif,
        "/rewara/": IndeksRewara,
        "/search/": IndeksCari,
        "/paralaks/": IndeksInfogram,
        "/about/": AboutUs,
        "/contact/":Contact,
        "/redaksi/":Redaksi,
        "/deduktif/redaksi/":RedaksiDeduktif,
        "/deduktif/about/":AboutDeduktif,
        "/article/:slug/": JurnoDetail,
        "/deduktif/:slug/": DeduktifDetail,
        "/rewara/:slug/": RewaraDetail,
        "*": NotFound,
    };
</script>

{#await getToken()}
    <!-- Put Loading Animation Here-->
    <div class="loading">
        <Fa icon={faSpinner} size="3x" pulse />
    </div>
{:then data}
    <Router {routes} />
{:catch error}
    <div class="loading">
        <p class="error">
            An error occured
        </p>
    </div>
{/await}

<style>
    .loading {
        width:100vw;
        height:100vh;
        position:absolute;
        top:0;
        left:0;
        display: flex;
        justify-content: center;
        align-items: center;
        color:hsl(0, 0%, 50%);
    }
    .error {
        background-color:hsla(353, 100%, 75%, 1);
        padding:1rem;
        border-radius: 0.5rem;
        color: hsla(353, 100%, 48%, 1);
    }
</style>
