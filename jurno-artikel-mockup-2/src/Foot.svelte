<script>
    let data = [{
        title: 'Lorem Ipsum',
        source_url: '',
        origin_images:'',
        author:'Ann Putri'
        },{
        title: 'Lorem Ipsum Dolor',
        source_url: '',
        origin_images:'',
        author:'Ahsan Ridhoi'
        },{
        title: 'Sit Amet',
        source_url: '',
        origin_images:'',
        author:'Ann Putri'
        },
        ]
</script>

<nav>
    <div class="container">
        <p class="title">Artikel Populer</p>
        <div class="slider-container">
                <!-- {#await fetchData}
                <p>...waiting</p>
                {:then data} -->
                    {#each data as d}
                    <a href={d.source_url} class='newspart'>
                        <div class="news">
                            <div class="images">
                                <img class='imgthumb' src={d.origin_images} alt={d.title} />
                            </div>
                            <div class="credit">
                                <p class="author">{d.author}</p>
                                <p class="article-title">
                                    {d.title}
                                </p>
                            </div>
                        </div>
                    </a>
                    {/each}
                <!-- {:catch error}
                    <p>An error occurred!</p>
                {/await} -->
    
        </div>
    </div>
</nav>



<style>
    nav {
        background-color: var(--bgColorDark);
    }
    .container {
        color: var(--font-color);
        width:90%;
        max-width: 650px;
        margin: 4rem auto 4rem auto;
        text-align: left;
        padding-bottom: 4rem;
        padding-top: 1rem;

    }
    .newspart {
        width:30%;
    }
    .title {
        font-family: var(--fontfamily1);
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
        color: var(--font-color);
        display: flex;
        flex-direction: column;
    }
    .images {
        width: 160px;
        height: 125px;
        background-color: indianred;
    }
    .imgthumb {
        width:90%;
        height:67.5%;
        border-radius:0.5rem;
        object-fit: cover;
    }
    .author {
        font-family: var(--fontfamily2);
        font-size: 0.8rem;
        font-weight:500;
        white-space: normal;
        margin: 0.2rem 0;
    }
    .article-title {
        font-family: var(--fontfamily2);
        font-size: 1rem;
        font-weight:700;
        white-space: normal;
        line-height: 1rem;
        margin: 0;
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
            width:18vw;
            height:13.5vw;
        }

	}
</style>