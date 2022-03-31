<script>
import { get } from "./api";
import * as ihttp from './constants/initialHttp';
import {truncText, stringToDom} from './helper';

export let title = ''
export let params = {}

const fetchData = (async () => {
    const result = await get(ihttp.URI_NEWS_LIST, {...params, media_type: 'print,online'});
    return await result.data;
})()

// const fetchImage = (async () => {
// 		const response = await fetch('https://jsonplaceholder.typicode.com/photos')
//     return await response.json()
// 	})()

</script>

<div class="container">
    <p class="title">{title}</p>
    <div class="slider-container">
        <div class="slider">
            {#await fetchData}
            <p>...waiting</p>
            {:then data}
                {#each data as d}
                <a href={d.source_url}>
                    <div class="news">
                        <img class='imgthumb' src={d.origin_images} alt={d.title} />
                        <p class="author">{d.media}</p>
                        <p class="article-title">
                            {@html truncText(d.title, 40)}
                        </p>
                    </div>
                </a>
                {/each}
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
    .slider-container {
        overflow-x: scroll;
        overflow-y:hidden;
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
        font-family: var(--fontfamily2);
        font-size: 0.8rem;
        font-weight:500;
        color:#A29E90;
        white-space: normal;
        margin: 0.2rem 0;
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
    .slider-container::-webkit-scrollbar {
        display: none;
    }
    .slider-container {
        -ms-overflow-style: none;  /* IE and Edge */
        scrollbar-width: none;  /* Firefox */
    }
    @media only screen and (min-width:1200px) {
        .title {
            font-family: var(--fontfamily1);
            font-weight:700;
            font-size:2.5rem;
            margin-left: 6%;
            margin-top: 1rem;
            margin-bottom:1rem;
        }
    }
</style>