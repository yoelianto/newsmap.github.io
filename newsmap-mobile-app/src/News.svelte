<script>
export let title = ''

const fetchImage = (async () => {
		const response = await fetch('https://jsonplaceholder.typicode.com/photos')
    return await response.json()
	})()
</script>

<div class="container">
    <p class="title">{title}</p>
    <div class="slider-container">
        <div class="slider">
            {#await fetchImage}
            <p>...waiting</p>
            {:then data}
                {#each {length: 10} as _, i}
                    <div class="news">
                        <img class='imgthumb' src={data[i].url} alt={data[i].title} />
                        <p class="author">Author</p>
                        <p class="article-title">{data[i].title}</p>
                    </div>
                {/each}
            {:catch error}
                <p>An error occurred!</p>
            {/await}
        </div>
    </div>
</div>


<style>
    .title {
        font-family: 'Matroska';
        margin-left: 6%;
    }
    .slider-container {
        overflow-x: scroll;
        white-space: nowrap;  
    }
    .slider {
        margin-left: 6%;
        display: flex;
    }
    .news {
        margin-right:0.8rem;
        
    }
    .imgthumb {
        width:33.6vw;
        height:25.2vw;
        border-radius:0.5rem;
        object-fit: cover;
    }
    .author {
        font-family: 'Jost';
        font-size: 0.8rem;
        font-weight:500;
        color:#A29E90;
        white-space: normal;
        margin: 0.2rem 0;
    }
    .article-title {
        font-family: 'Jost';
        font-size: 1rem;
        font-weight:700;
        color:#363636;
        white-space: normal;
        line-height: 1rem;
        margin: 0;
    }
    .slider-container::-webkit-scrollbar {
        display: none;
    }
    .slider-container {
        -ms-overflow-style: none;  /* IE and Edge */
        scrollbar-width: none;  /* Firefox */
    }
</style>