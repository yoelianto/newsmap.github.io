<script>
    import Icon from 'svelte-awesome';
    import { angleRight } from 'svelte-awesome/icons';
    import { createEventDispatcher } from 'svelte';

    export let searchIn = false
    export let searchValue

    const searchOut = () => {
        searchIn = false
    }

</script>

<nav style='right:{ searchIn ? '0px' : '-100vw'}'>
    <section>
        <form action='/search?keywords={searchValue}'>
            <input type="search" placeholder="Cari Artikel..." bind:value ={searchValue}>
            <button type="submit">Search</button>
        </form>
        <div
            class="close"
            on:click={searchOut}
        >
            <Icon
                data={angleRight}
                style='color:#fafafa'
                scale ={1.5}
            />
        </div>
        
    </section>
</nav>

<style>
    nav {
        top:0;
        width:100vw;
        height:calc(25px + 0.6rem);
        z-index:1001;
        position: fixed;
        background-color: var(--color-brand-red);
        transition: right 200ms ease-in-out;
    }
    section {
        display: flex;
        margin-left: 12%;
        margin-right: 6%;
        align-items: center;
        justify-content: space-between;
    }

    .close {
        height:calc(25px + 0.6rem);
        display: flex;
        justify-content: flex-end;
        align-items: center;
    }
    form {
        width: 90%;
        font-size: 0.8rem;
        border-radius: 2rem;
        display: flex;
        border:1px solid transparent;
        justify-content: space-between;
        align-items: center;
        background-color: #fafafa;
        height:25px;
    }
    input[type="search"] {
        border: none;
        background: #fafafa;
        width:90%;
        margin: 0;
        padding: 7px 8px;
        font-size: 0.8rem;
        color: inherit;
        border: 1px solid transparent;
        border-radius: inherit;
        height:25px;
    }
    button[type="submit"] {
        background: transparent url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' class='bi bi-search' viewBox='0 0 16 16'%3E%3Cpath d='M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z'%3E%3C/path%3E%3C/svg%3E") no-repeat center;
        width: 2rem;
        height:1rem;
        margin: 0;
        text-indent: -999px;
        overflow: hidden;
        border: 0 solid transparent;
        border-radius: inherit;
    }

    input[type="search"]::placeholder {
        color: #bbb;
    }
</style>