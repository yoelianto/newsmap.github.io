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
            font-family: 'Roboto Mono';
            font-weight:700;
            font-size:1.5rem;
            margin-left: 6%;
            color: #242053;
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
            position: relative;            
        }
        .imgthumb {
            width:33.6vw;
            height:59.7vw;
            border-radius:0.5rem;
            object-fit: cover;
        }
        .article-title {
            font-family: 'Roboto';
            font-size: 1rem;
            font-weight:400;
            color:white;
            white-space: normal;
            line-height: 1rem;
            margin: 0;
            position:absolute;
            bottom:0;
            left:0;
            padding:1rem;
        }
        .slider-container::-webkit-scrollbar {
            display: none;
        }
        .slider-container {
            -ms-overflow-style: none;  /* IE and Edge */
            scrollbar-width: none;  /* Firefox */
        }
    </style>