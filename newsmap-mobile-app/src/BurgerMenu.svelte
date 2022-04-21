<script>
    import Icon from 'svelte-awesome';
    import { angleLeft } from 'svelte-awesome/icons';

    export let burgerIn = false

    const burgerMenuOut = () => {
        burgerIn = false
    }
</script>

<nav style='left:{ burgerIn ? '0px' : '-150px'}'>
    <section>
        <div
            class="close"
            on:click={burgerMenuOut}
        >
            <Icon
                data={angleLeft}
                style='color:#fafafa'
                scale ={1.5}
            />
        </div>
        <div class="menu">
            <p>Menu 1</p>
            <p>Lorem</p>
            <p>Lorem Ipsum</p>
            <p>Dolor Sit</p>
            <p>Menu 5</p>
            <p>Menu 6</p>
        </div>
    </section>
</nav>

<style>
    nav {
        width:150px;
        height:100vh;
        z-index:1001;
        position: fixed;
        background-color: #ef5959;
        transition: left 200ms ease-in-out;
    }
    section {
        width:90%;
        height:50vh;
    }
    .close {
        width:100%;
        height:calc(35px + 1rem);
        display: flex;
        justify-content: flex-end;
        align-items: center;
    }
    .menu {
        color:#fafafa;
        width:90%;
        display: flex;
        flex-direction: column;
        margin-left:20px;
    }
    p {
        margin-top: 0.5rem;
        margin-bottom: 0.5rem;
    }
</style>