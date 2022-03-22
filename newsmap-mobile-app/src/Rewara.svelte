<script>
    export let title = ''
    
    const fetchImage = (async () => {
            const response = await fetch('https://jsonplaceholder.typicode.com/photos')
        return await response.json()
        })()
    </script>
    
    <div class="container">
        <p class="title">{title}</p>
        <div class="rewara-container">
            <div class="rewara">
                {#await fetchImage}
                <p>...waiting</p>
                {:then data}
                <div class="firstnews">
                    <img class='imgthumb' src={data[0].url} alt={data[0].title} />
                    <p class="article-title">{data[0].title}</p>
                </div>
                    <ul class="othernews">
                        {#each {length: 4} as _, i}
                            <li class="news">
                                <p class="article-title">{data[i].title}</p>
                            </li>
                        {/each}
                    </ul>
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
        .rewara-container {
            width:88vw;
            margin: 0 auto;
            white-space: nowrap;  
        }
        .rewara {
            display: flex;
        }
        .news {
            margin-right:0rem;
            margin-bottom: 0.5rem;
            
        }
        .imgthumb {
            width:35vw;
            height:25.2vw;
            border-radius:0.5rem;
            object-fit: cover;
        }
        .article-title {
            font-family: 'Roboto';
            font-size: 1rem;
            font-weight:700;
            color:#363636;
            white-space: normal;
            line-height: 1rem;
            margin: 0;
        }
        li::marker{
            color:#202523;
        }

        .othernews {
            margin: 0;
            display: flex;
            flex-direction: column;
            padding-left: 2rem;
        }
    </style>