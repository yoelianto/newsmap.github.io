<script>

    import { get } from "./api";
    import Fa from 'svelte-fa'
    import { faSpinner, faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons'
    import { url, goto } from '@roxi/routify'

    export let uri = null;
    export let params = {};
    export let type = null;
    export let thumbnailFolder = "";

    export let bgFooter, txtFooter


    const fetchData = (async () => {
        const result = await get(uri, params);
        return await result.data;
    });

    let changePage = (e) => {
        window.location.pathname = e.path[3].attributes[0].value
        return false
    }

</script>

<nav class="footer" style='background-color:#{bgFooter}'>
    <div class="container">
        <p class="title" style='color:#{txtFooter} !important;'>Artikel Lainnya</p>
        <div class="slider-container">
                {#await fetchData()}
                <div class="placeholder-container">
                    <Fa icon={faSpinner} size="3x" pulse />
                </div>
                {:then data}
                    {#each data as d}
                        <div data-link={`/${type}/${d.slug}`} on:click={changePage} 
                        class='newspart' style="text-decoration:none !important">
                            <div class="news">
                                <div class="images">
                                    <!--  -->
                                    <img class='imgthumb'
                                    src={`${process["env"]["URL_IMAGE"]}images/${thumbnailFolder}/${d.thumbnail}`}
                                    title={d.title} alt={d.title}
                                    onerror={`this.onerror=null;this.src='${process['env']['NO_IMAGE']}';`} />
                                </div>
                                <div class="credit" style='color:#{txtFooter};'>
                                    <p class="author">{d.author_name}</p> <!-- harusnya {d.author_name}-->
                                    <p class="article-title">
                                        {d.title}
                                    </p>
                                </div>
                            </div>
                        </div>
                    {/each}
                {:catch error}
                    <p>An error occurred!</p>
                {/await}
        </div>
    </div>
</nav>



<style>
    .placeholder-container {
        width:100%;
        height:100%;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 0.8rem;
        background-color: #fafafa;
        color: hsl(0,0%,50%);
    }
    nav {
        margin-top: -1rem;
        width:100%;
        background-color: #fafafa;
    }
    .container {
        width:90%;
        max-width: 650px;
        margin: 0 auto 1rem auto;
        text-align: left;
        padding-bottom: 4rem;
        padding-top: 1rem;

    }
    .newspart {
        width:30%;
        text-decoration: none !important;
        cursor: pointer;
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
        text-decoration: none !important;
    }
    .credit:hover {
        text-decoration: none !important;
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
        .imgthumb {
            width:160px;
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