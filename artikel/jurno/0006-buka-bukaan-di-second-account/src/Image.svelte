<script>
    export let img = [{
        url: '',
        title: ''
    }];
    export let imageTitle, imageSource

    let len = img.length;
</script>

<figure>
	{#if img}
    <div class="container">
        {#each img as image}
        <img src={ image.url } alt={ image.title } style="width: {98 / len}%">
        {/each}
    </div>
	{/if}
	{#if imageTitle && imageSource}
    <aside>
        <div class="source">{ imageTitle }<br>Sumber foto: { imageSource }</div>
    </aside>
	{/if}
</figure>

<style>
    figure {
        max-width:88vw;
        margin:0 auto;
        text-align: left;
        display: flex;
        flex-direction:column;
        align-items: center;
    }

    /* .container {
        width:100%;
        display: flex;
        justify-content: space-evenly;
        flex-wrap: wrap;
        align-items: center;
    } */

    img {
        max-height:500px;
        max-width:500px;
        margin-bottom: 1rem;
    }
    .source {
        color:var(--font-color);
        width:88vw;
        max-width: 800px;
    }
    @media only screen and (max-width: 800px) {
        figure {
            width:80%;
        }
        .source {
            max-width:80%;
            margin:0 auto;
        }
        img {
            min-width:300px;
        }
    }
    @media only screen and (max-width: 400px) {
        figure {
            width: 90%;
        }
        .source {
            max-width:80%;
        }
        img {
            min-width:300px;
        }
    }


    
</style>