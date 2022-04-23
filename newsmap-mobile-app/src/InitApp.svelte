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

    const routes = {
        "/": App,
        "/article/": IndeksJurno,
        "/deduktif/": IndeksDeduktif,
        "/rewara/": IndeksRewara,
        "/search/": IndeksCari,
        "/infogram/": IndeksInfogram,
        "/about/": AboutUs,
        "/contact/":Contact,
        "/redaksi/":Redaksi,
        "/article/:slug/:custom?": JurnoDetail,
        "/deduktif/:slug/:custom?": DeduktifDetail,
        "/rewara/:slug/:custom?": RewaraDetail,
        "*": NotFound,
    };
</script>

{#await getToken()}
    <!-- Put Loading Animation Here-->
    <div class="loading">
        Loading...
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
    }
    .error {
        background-color:hsla(353, 100%, 75%, 1);
        padding:1rem;
        border-radius: 0.5rem;
        color: hsla(353, 100%, 48%, 1);
    }
</style>
