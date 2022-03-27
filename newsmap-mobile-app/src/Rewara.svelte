<script>
    import { get } from "./api";
    import * as ihttp from './constants/initialHttp';

    const fetchData = (async () => {
        const result = await get(ihttp.URI_REWARA_LIST, {size: 5});
        return await result.data;
    })()

    export let title = ''
    
    const fetchImage = (async () => {
            const response = await fetch('https://jsonplaceholder.typicode.com/photos')
        return await response.json()
        })()
    
    let rewara = [
        {
            title: "Mengenal Kei Car, Mobil Mungil Khas Jepang",
			url:"https://newsmap.id/youtube/mengenal-kei-car-mobil-mungil-khas-jepang",
			thumb:"https://newsmap.id/_next/image?url=https%3A%2F%2Fimg.youtube.com%2Fvi%2FHqJRApyuaqY%2Fhqdefault.jpg&w=1920&q=75"
        },
        {
            title: "Mengenal Kei Car, Mobil Mungil Khas Jepang",
			url:"https://newsmap.id/youtube/mengenal-kei-car-mobil-mungil-khas-jepang",
			thumb:"https://newsmap.id/_next/image?url=https%3A%2F%2Fimg.youtube.com%2Fvi%2FHqJRApyuaqY%2Fhqdefault.jpg&w=1920&q=75"
        },
        {
            title: "Mengenal Kei Car, Mobil Mungil Khas Jepang",
			url:"https://newsmap.id/youtube/mengenal-kei-car-mobil-mungil-khas-jepang",
			thumb:"https://newsmap.id/_next/image?url=https%3A%2F%2Fimg.youtube.com%2Fvi%2FHqJRApyuaqY%2Fhqdefault.jpg&w=1920&q=75"
        }
        ]
    </script>
    
    <div class="container">
        <p class="title">{title}</p>
        <div class="rewara-container">
            <div class="rewara">
                {#await fetchData}
                <p>...waiting</p>
                {:then rewara}
                <a href={rewara[0].url}>
                    <div class="firstnews">
                        <img class='imgthumb' src={rewara[0].thumbnail? `${process['env']['URL_IMAGE']}news/${rewara[0].thumbnail}` : ''} onerror={`this.onerror=null;this.src='${process['env']['NO_IMAGE']}';`} alt={rewara[0].title} />
                        <p class="article-title">{rewara[0].title}</p>
                    </div>
                </a>
                
                    <ul class="othernews">
                        {#each {length: 4} as _, i}
                        {#if rewara[i+1] !== undefined}
                        <a href="rewara.url">
                            <li class="news">
                                <p class="article-title">{rewara[i+1].title}</p>
                            </li>
                        </a>
                        {/if}    
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
            font-family: var(--fontfamily1);
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
            font-family: var(--fontfamily2);
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