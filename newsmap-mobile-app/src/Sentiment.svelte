<script>
    const fetchImage = (async () => {
		const response = await fetch('https://jsonplaceholder.typicode.com/photos')
    return await response.json()
	})()

    const sentiment = [
        {
            name:"Joko Widodo",
            url:"https://cdn.newstensity.com/image/9222a02f1e8748ce8b74d27231da39ab/phpj4jvde.jpeg"
        },
        {
            name:"Muhammad Luthfi",
            url:"https://cdn.newstensity.com/image/cda36ff6c0a74d75a2868026b5b78039/phpioom9v.jpg"
        },
        {
            name:"Marc Marquez",
            url:"https://cdn.newstensity.com/image/72090f1326ee49c0a703e4d5ea5929f4/image.jpg"
        },
        {
            name:"Luhut Binsar Pandjaitan",
            url:"https://cdn.newstensity.com/image/b803d03f3a6a4ee5985a56174a24239c/phpijmeie.jpg"
        },
        {
            name:"Doni Salmanan",
            url:"https://cdn.newstensity.com/image/fd43d585386f4424a8cdbc5377cbfa3e/phplctpor.jpg"
        }
    ];
</script>

<div class="container">
    <div class="slider">
        <!-- {#await fetchImage}
        <p>...waiting</p>
        {:then data} -->
            {#each sentiment as sentiment, i}
            <div class="sentiment-container">
                <div class="sentiment">
                    <div class="person">
                        <img class='people' src={sentiment.url} alt={sentiment.name} />
                    </div>
                    <div class="name">{sentiment.name}</div>
                </div>
            </div>
                
            {/each}
        <!-- {:catch error}
            <p>An error occurred!</p>
        {/await} -->
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
        display: flex;
    }
    .sentiment {
        display:inline-block;
        width:25vw;
        height:25vw;
        margin:0.5rem;
    }
    .person{
        clip-path: circle(50%);
        width: 25vw;
        height: 25vw;
    }
    .people {
        width:100%;
    }
    .name {
        font-family: var(--fontfamily2);
        font-size: 1rem;
        text-align: center;
        margin: 0.5rem 0;
        font-weight: 500;
        display: inline-block;
        overflow-wrap: break-word;
        width:25vw;
        white-space:pre-wrap;
    }
    .slider::-webkit-scrollbar {
        display: none;
    }

    .slider {
        -ms-overflow-style: none;  /* IE and Edge */
        scrollbar-width: none;  /* Firefox */
    }
</style>