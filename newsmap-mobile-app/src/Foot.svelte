<script>

    export let data = {}
    console.log('footer', data)

    import { get } from "./api";
    import { link } from "svelte-spa-router";

    export let uri = null;
    export let params = {};
    export let type = null;
    export let thumbnailFolder = "";

    console.log(type)

    const fetchData = (async () => {
        const result = await get(uri, params);
        console.log(result)
        return await result.data;
    });

</script>

<nav class="footer">
    <div class="container">
        <p class="title">Artikel Lainnya</p>
        <div class="slider-container">
                {#await fetchData()}
                <p>...waiting</p>
                {:then data}
                    {#each data as d}
                    <a href={`/${type}/${d.slug}`} class='newspart' use:link>
                        <div class="news">
                            <div class="images">
                                <!--  -->
                                <img class='imgthumb'
                                src={`${process["env"]["URL_IMAGE"]}${thumbnailFolder}/${d.thumbnail}`}
                                title={d.title} alt={d.title}
                                onError={(e) => {e.target.onerror = null;e.target.src = process["env"]["NO_IMAGE"];}} />
                            </div>
                            <div class="credit">
                                <p class="author">{d.author_name}</p> <!-- harusnya {d.author_name}-->
                                <p class="article-title">
                                    {d.title}
                                </p>
                            </div>
                        </div>
                    </a>
                    {/each}
                {:catch error}
                    <p>An error occurred!</p>
                {/await}
        </div>
    </div>
</nav>



<style>
    nav {
        width:100%;
        background-color: #fafafa;
    }
    .container {
        width:90%;
        max-width: 650px;
        margin: 1rem auto 1rem auto;
        text-align: left;
        padding-bottom: 4rem;
        padding-top: 1rem;

    }
    .newspart {
        width:30%;
    }
    .title {
        font-family: 'Roboto Mono';
        font-weight:700;
        font-size:1.5rem;
        margin-left: 6%;
    }
    .slider-container {
        display: flex;
        flex-direction: row;
        justify-content: center;
    }
    .news {
        margin-right:0.8rem;
        display: flex;
        flex-direction: column;
    }
    .images {
        width: 160px;
        height: 125px;
        background-color: indianred;
        border-radius:0.5rem;
    }
    .imgthumb {
        width:100%;
        height:100%;
        border-radius:0.5rem;
        object-fit: cover;
    }
    .author {
        font-family: 'Roboto';
        font-size: 0.8rem;
        font-weight:500;
        white-space: normal;
        margin: 0.2rem 0;
    }
    .article-title {
        font-family: 'Roboto';
        font-size: 1rem;
        font-weight:700;
        white-space: normal;
        line-height: 1rem;
        margin: 0;
    }
    .credit {
        color: black;
    }

    @media only screen /*xtrasmall*/
	and (max-width: 575px) {
        .slider-container {
            flex-direction: column;
        }
        .news {
            flex-direction: row;
            margin-bottom: 1rem;
        }
        .newspart {
            width:100%;
        }
        .images {
            margin-right: 1rem;
        }
        .title {
            margin-left: 0;
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
            width:100%;
            height:100%;
            border-radius:0.5rem;
            object-fit: cover;
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
            width:100%;
            height:100%;
            border-radius:0.5rem;
            object-fit: cover;
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
            width:100%;
            height:100%;
            border-radius:0.5rem;
            object-fit: cover;
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
            max-width:650px;
            width:70.4%;
            margin:1rem auto 0 auto;
        }
        .imgthumb {
            width:100%;
            height:100%;
            border-radius:0.5rem;
            object-fit: cover;
        }

	}
</style>