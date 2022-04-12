<script>
    import { Router, Route } from "svelte-navigator";
    import App from "./App.svelte";
    import { getToken } from "./api";
    import JurnoDetail from "./pages/JurnoDetail.svelte";
    import DeduktifDetail from "./pages/DeduktifDetail.svelte";
</script>

{#await getToken()}
    <p>...waiting</p>
{:then data}
    <Router>
        <Route path="/" component={App} />
        <Route path="article/:slug" component={JurnoDetail} />
        <Route path="deduktif/:slug" component={DeduktifDetail} />

        <Route>
            <h3>Page not found</h3>
        </Route>
    </Router>
{:catch error}
    <p>An error occurred!</p>
{/await}
