<script>
    export let subjudul;
    export let list = [];
</script>

<section>
    {#if subjudul}
        <h3>{ subjudul }</h3>
    {/if}
    {#each list as item, i}
        <div class="container">
            <span class="number">{i+1}</span>
            <span>{@html item}</span>
        </div>
    {/each}
</section>

<style>
    section {
        font-family: 'Roboto';
        width:90%;
        max-width: 650px;
        margin: 4rem auto 4rem auto;
        text-align: left;
    }
    h3{
        font-weight: 700;
        font-size: 1.5rem;
        line-height: 2.4rem;
        text-align: center;
        font-family: 'Roboto Mono';
        color:hsl(217, 65%, 67%)
    }
    .container {
        display: flex;
        flex-direction: row;
        width:60%;
        margin:0 auto;
        position: relative;
    }
    .number {
        font-family: 'Mulish', sans-serif;
        color:hsla(76, 69%, 41%, 0.5);
        font-weight: 700;
        font-size: 3rem;
        font-style: italic;
        left:0rem;
        top:0.5rem;
    }
    span {
        font-size:1.1rem;
        line-height: 1.8rem;
        display: block;
        margin-top: 0.5rem;
        margin-bottom: 0.5rem;
        margin-inline-start: 0px;
        margin-inline-end: 0px;
        color:var(--font-color);
        white-space: normal;
    }
    @media only screen and (max-width: 800px) {
        section {
            width:80%;
        }
    }
    @media only screen and (max-width: 400px) {
        section {
            width:90%;
        }
        .container {
            width:80%;
        }
    }
</style>