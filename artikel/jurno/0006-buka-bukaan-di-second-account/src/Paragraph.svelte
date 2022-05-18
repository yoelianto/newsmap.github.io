<script>
    export let subjudul;
    export let para = [];
</script>

<section>
    {#if subjudul}
    <h3>{@html subjudul }</h3>
    <div class="divider"></div>
    {/if}
    
    {#each para as p}
        <p>{@html p}</p>
    {/each}
</section>

<style>
    .divider {
		height:0.2rem;
		width:50%;
		background-color:#f6efa6;
		margin:1rem auto 2rem auto;
		border-radius: 0.1rem;
	}
    section {
        font-family: 'Roboto';
        width:90%;
        max-width: 650px;
        margin: 4rem auto 4rem auto;
        text-align: left;
    }
    h3{
        font-weight: 700;
        font-size: 2rem;
        line-height: 2.4rem;
        text-align: center;
        font-family: 'Neucha', cursive;
        color:#f9f9e1;
        white-space: normal;
        margin-bottom: 0.5rem;
    } 
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