<script>
import { get} from "./api";
import * as ihttp from './constants/initialHttp';
import {truncText, stringToDom} from './helper';

export let title = ''
export let params = {}
export let scrollBy = 5;
let per_page = 10;
let screenWidth = document.body.clientWidth
let sliderWidth = (0.18 * screenWidth * (per_page - 4))

const fetchData = (async () => {
    const result = await get(ihttp.URI_NEWS_LIST, {...params, media_type: 'print,online'});
    return await result.data;
})()

const fetchMedium =async () => {
    const resultMedium = await fetch('https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/@binokular')
    console.log(resultMedium)
    return await resultMedium
}

// const fetchImage = (async () => {
// 		const response = await fetch('https://jsonplaceholder.typicode.com/photos')
//     return await response.json()
// 	})()

const paginationFactor = sliderWidth;
const totalPaginationPixels = Math.floor(paginationFactor / scrollBy) ;

$: offset = 0;
$: atStart = offset === 0;
$: atEnd = offset <= paginationFactor * -1;

const move = direction => {
    if (direction > 0 && !atEnd) {
        offset -= totalPaginationPixels;
    } else if (direction < 0 && !atStart) {
        offset += totalPaginationPixels;
    }
    console.log(offset)
};

</script>
<svelte:head>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
</svelte:head>

<div class="container">
    <p class="title">{title}</p>
    <div class="slider-container">
        <div class="slider" style="transform: translateX({offset}px);">
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
        <button type="button" class="nav_prev" disabled={atStart} on:click="{() => move(-1)}">
            <i class="fa fa-angle-left" ></i>
        </button>
        <button type="button" class="nav_next" disabled={atEnd} on:click="{() => move(1)}">
            <i class="fa fa-angle-right" ></i>
        </button>
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
        position: relative;
    }
    .slider {
        margin-left: 6%;
        width: calc(10 * (33.6vw + 0.8rem));
        display: flex;
        transition: transform 200ms ease-in-out;
        margin-right: 15vw;
    }
    .nav_prev {
        position: absolute;
        top: 30%;
        z-index: 9999;
        left: 15px;
        width: 30px;
        height: 30px;
        background: #fff;
        color: #000;
        text-decoration: none;
        cursor: pointer;
        border-radius: 50%;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .nav_next {
        position: absolute;
        top: 30%;
        z-index: 9999;
        width: 30px;
        height: 30px;
        background: #fff;
        color: #252154;
        cursor: pointer;
        right: 15px;
        border-radius: 50%;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .fa {
        margin: 0;
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

    @media only screen /*xtrasmall*/
	and (max-width: 575px) {
        .nav_prev {
            display: none;
        }
        .nav_next {
            display: none;
        }

	}
	@media only screen /*small*/
	and (min-width: 576px)
	and (max-width: 767px) {
        .title {
            font-size:2rem
        }
        .container {
            max-width:900px;
            width:90%;
            margin:1rem auto;
        }
        .imgthumb {
            width:20vw;
            height:15vw;
        }
        .slider {
            margin-left:0;
        }

	}
	@media only screen /*medium*/
	and (min-width: 768px)
	and (max-width: 991px) {
        .title {
            font-size:2rem
        }
        .container {
            max-width:900px;
            width:90%;
            margin:1rem auto;
        }
        .imgthumb {
            width:18vw;
            height:13.5vw;
        }
        .slider {
            margin-left:0;
        }
	}
	@media only screen /*large*/
	and (min-width: 992px)
	and (max-width: 1199px) {
        .title {
            font-size:2rem
        }
        .container {
            max-width:800px;
            width:80%;
            margin:1rem auto;
        }
        .imgthumb {
            width:18vw;
            height:13.5vw;
        }
        .slider {
            margin-left:0;
        }
	}
	@media only screen /*xtralarge*/
	and (min-width: 1200px) {
        .title {
            font-size:2rem;
            margin-left:0;
            margin-bottom:1rem;
        }
        .container {
            max-width:1100px;
            width:70.4%;
            margin:1rem auto 0 auto;
        }
        .imgthumb {
            width:18vw;
            height:13.5vw;
        }
        .slider {
            margin-left:0;
        }

        .nav_prev, .nav_next {
            width: 40px;
            height: 40px;
            top: 35%;
        }

        .nav_next {
            right: 25px;
        }
	}
</style>