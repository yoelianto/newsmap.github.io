<script>
    // export let subjudul;
    export let para = [];
</script>

<section>
    <!-- <h3>{ subjudul }</h3> -->
    {#each para as p}
        <p>{@html p}</p>
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
    /* h3{
        font-weight: 700;
        font-size: 1.5rem;
        line-height: 2.4rem;
        text-align: center;
    } */
    p {
        font-size:1.1rem;
        line-height: 1.8rem;
        display: block;
        margin-block-start: 1em;
        margin-block-end: 1em;
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
    }
</style>