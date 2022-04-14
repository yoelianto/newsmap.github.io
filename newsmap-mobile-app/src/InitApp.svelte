<script>
    import App from "./App.svelte";
    import { getToken } from "./api";
    import JurnoDetail from "./pages/JurnoDetail.svelte";
    import DeduktifDetail from "./pages/DeduktifDetail.svelte";
    import RewaraDetail from "./pages/RewaraDetail.svelte";
    import NotFound from "./pages/NotFound.svelte";
    import Router from "svelte-spa-router";

    const routes = {
        "/": App,
        "/article/:slug/:custom?": JurnoDetail,
        "/deduktif/:slug/:custom?": DeduktifDetail,
        "/rewara/:slug/:custom?": RewaraDetail,
        "*": NotFound,
    };
</script>

{#await getToken()}
    <p>...waiting</p>
{:then data}
    <Router {routes} />
{:catch error}
    <p>An error occurred!</p>
{/await}
