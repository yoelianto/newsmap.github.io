<script>
    const fetchImage = (async () => {
		const response = await fetch('https://jsonplaceholder.typicode.com/photos')
    return await response.json()
	})()

    const sentiment = 1;
</script>

<div class="container">
    <div class="slider">
        {#await fetchImage}
        <p>...waiting</p>
        {:then data}
            {#each {length: 10} as _, i}
                <div class="sentiment">
                    <img class='people' src={data[i].url} alt={data[i].title} />
                </div>
            {/each}
        {:catch error}
            <p>An error occurred!</p>
        {/await}
    </div>
</div>

<style>
    .container {
        margin-left: 5px;
        margin-bottom: 1rem;
        margin-top: 1rem;
    }
    .slider {
        overflow-x: scroll;
        white-space: nowrap;
    }
    .sentiment {
        display:inline-block;
        width:25vw;
        height:25vw;
        margin:0.5rem;
        clip-path: circle(50%)
    }

    .people {
        max-width: 100%;
    }

    .slider::-webkit-scrollbar {
        display: none;
}

    .slider {
        -ms-overflow-style: none;  /* IE and Edge */
        scrollbar-width: none;  /* Firefox */
    }
</style>