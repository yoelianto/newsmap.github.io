<script>
const fetchImage = (async () => {
		const response = await fetch('https://jsonplaceholder.typicode.com/photos')
    return await response.json()
	})()

const fetchPlaylist = (async () => {
    const response = await fetch('https://jsonplaceholder.typicode.com/todos')
return await response.json()
})()
</script>

<div class="container" id="podcast">
    <div class="title-container">
        <p class="title">PODCAST</p>
        <p class="viewall">View all</p>
    </div>
    <div class="inner">
        <div class="album">
            {#await fetchImage}
            <p>...waiting</p>
            {:then data}
                {#each {length: 2} as _, i}
                    <div class="podcast">
                        <img class='imgpod' src={data[i].url} alt={data[i].title} />
                    </div>
                {/each}
            {:catch error}
                <p>An error occurred!</p>
            {/await}
        </div>
        <p class="playlist-title">Playlist</p>
        <div class="playlist">
            {#await fetchImage}
            <p>...waiting</p>
            {:then data}
                {#each {length: 10} as _, i}
                    <div class="podlist">
                        <div class="play"><i class="fa fa-play"></i></div>
                        <div class="poddetail">
                            <div class="podtitle">{data[i].title}</div>
                            <div class="podauthor"></div>
                        </div>
                        <div class="duration">15.00</div>
                    </div>
                {/each}
            {:catch error}
                <p>An error occurred!</p>
            {/await}
        </div>
    </div>

</div>


<style>
    .title-container {
        margin-left: 6%;
        width:88%;
        display: flex;
        justify-content: space-between;
    }
    .title {
        font-family: var(--fontfamily1);
        font-weight:700;
        font-size:1.5rem;
        color: #242053;
    }
    .viewall {
        color: #004EFF;
        font-family: var(--fontfamily2);
        font-size:0.8rem;
    }
    
    .inner {
        margin:0 auto;
        width:88vw;
        display: flex;
        flex-direction: column;
    }
    .album {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        margin-bottom:2rem;
    }
    .podcast {
        width:41vw;
    }
    .imgpod {
        width:100%;
        border-radius: 0.5rem;
    }
    .playlist-title {
        margin: 0;
        font-family: 'Roboto';
        font-weight: bolder;
    }
    .playlist {
        display: flex;
        flex-direction: column;
    }
    .podlist {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
    }
    .play {
        color:#004EFF;
        margin:1rem;
        width:4vw;
    }
    .poddetail {
        width:60vw;
        font-family: 'Roboto';
        font-weight: bold;
    }
    .duration {
        width:10vw;
        color:#7B7A7C;
    }
</style>