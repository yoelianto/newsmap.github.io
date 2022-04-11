<script context="module">
    import interact from 'interactjs'
</script>

<script>
    import { get } from "./api";
    import * as ihttp from './constants/initialHttp';
    // import { onMount } from 'svelte'

    const fetchData = (async () => {
        const result = await get(ihttp.URI_ARTICLE_LIST, {size: 3});
        console.log(result.data)
        return await result.data;
    })()


    const position = { x: 0, y: 0 }
    let containerWidth

    let width = document.body.clientWidth
    let height = document.body.clientHeight

    //mobile
    if (width < height && width < 768) {
        interact('.swipe[data-status="current"]').draggable({
        listeners: {
            start(event) {
                event.target.setAttribute('data-dragging', true)
            },
            move(event) {
                position.x += event.dx

                event.target.style.transform = 
                `translate(${position.x}px) rotate(${position.x * 0.05}deg)`
                event.target.style.transition =
                `transform 0s`
            },
            end(event) {
                let moved = Math.abs(position.x)

                event.target.setAttribute('data-dragging', false)

                if (moved > 150) {
                    event.target.setAttribute('data-status', 'transition')
                    if (position.x > 0) { // move right
                        position.x = containerWidth * 1.5
                    } else { // move left
                        position.x = -containerWidth * 1.5
                    }

                    event.target.style.transform = 
                    `translate(${position.x}px) rotate(${position.x * 0.05}deg)`
                    event.target.style.transition =
                    `transform 100ms ease-in-out`
                    
                    if (event.target.id < 2) {
                        event.target.nextElementSibling.setAttribute('data-status', 'current');
                    } else if (event.target.id == 2) {
                        let swipe = document.querySelectorAll('.swipe')
                        console.log(swipe)
                        swipe.forEach((item) => {
                            item.style.transition =`transform 0ms ease-in-out`
                            item.style.transform = `translate(0px) rotate(0deg)`
                            item.setAttribute('data-status', 'waiting')                    
                        })
                        swipe[0].setAttribute('data-status', 'current')
                    }
                    
                    position.x = 0
                } else {
                    position.x = 0

                    event.target.style.transform = 
                    `translate(${position.x}px) rotate(${position.x * 0.05}deg)`
                    event.target.style.transition =
                    `transform 100ms ease-in-out`

                    console.log('not-moved', moved)
                }
                
            }
        }
    })
    } else if (height < width && width >= 768) {
        
    }

    
</script>

<svelte:head>
    <script src="https://kit.fontawesome.com/f57950db7e.js" crossorigin="anonymous"></script>
</svelte:head>

<div class="container" id="original" bind:clientWidth={containerWidth}>
    <p class="title">JURNO ORIGINAL</p>
    {#await fetchData}
        <p>...waiting</p>
    {:then data}

    <div class="inner-container">
        <div class="icon">
            <i class="fas fa-long-arrow-alt-left"></i>
            <i class="far fa-hand-pointer"></i>
            <i class="fas fa-long-arrow-alt-right"></i>
        </div>
        
        {#each data as d, i}

        <div class='swipe' data-dragging='false' data-status="{i === 0 ? 'current' : 'waiting' }" id={i} style="z-index:{3-i}">
            <a class="card-link" href={`${process['env']['DOMAIN']}/article/${d.slug}`}>
                <div class="card" style="z-index:{3-i}">
                    <img class="thumb" src={`${process['env']['URL_IMAGE']}news/${d.thumbnail}`} alt="" >
                    <div class="bottom"></div>
                    <div class="inner-card">
                        <div class="sub-title">Original Jurno</div>
                        <div class="card-title">{d.title}</div>
                    </div>
                </div>
            </a>
        </div>

        {/each}
    </div>

    {:catch error}
        <p>An error occurred!</p>
    {/await}
</div>

<style>
    .icon {
        color: white;
        top:1rem;
        font-size: 1.5rem;
        position: absolute;
        width: 100%;
        justify-content: center;
        display: flex;
        z-index:10;
    }
    i {
        margin-left: 0.25rem;
        margin-right:0.25rem;
    }
    .swipe {
        position: relative;
    }
    .title {
        font-family: var(--fontfamily1);
        font-weight:700;
        font-size:1.5rem;
        margin-left: 6%;
        margin-top: 1rem;
        color: #242053;
    }
    .bottom{
        background: linear-gradient(0deg, rgba(36,32,83,0.7) 0%, rgba(36,32,83,0) 100%);
        width: 100%;
        position: absolute;
        bottom: 0;
        height:50%;
        border-radius:0 0 0.5rem 0.5rem;
    }
    .inner-container {
        display: block;
        position: relative;
        height:110vw;
        overflow-x: hidden;
        overflow-y: hidden;
    }
    .card {
        width:66vw;
        height:101vw;
        background-color: steelblue;
        border-radius:0.5rem;
        display: flex;
        justify-content: center;
        align-items: center;
        position:absolute;
        overflow: hidden;
        left: 17vw;
        touch-action: none;
        user-select: none;
    }
    .thumb {
        z-index: 0;
        height: 100%;
    }
    .inner-card {
        position: absolute;
        font-family: var(--fontfamily2);
        width:75%;
        height:80%;
        display: flex;
        flex-direction: column;
        justify-content: flex-end;
        color:white;
    }
    .sub-title {
        font-size:0.8rem;
        font-weight: 500;
        margin-bottom: 0.5rem;
    }
    .card-title {
        font-size:1.25rem;
        font-weight: 700;
        line-height: 1.25rem;
        white-space: normal;
    }
    @media only screen /*xtrasmall*/
	and (max-width: 575px) {


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

	}
	@media only screen /*xtralarge*/
	and (min-width: 1200px) {
        .title {
            font-size:2rem;
            margin-left:0;
            margin-top:2rem;
            margin-bottom: 1rem;
        }
        .container {
            width: 70.4%;
            margin:0 auto;
        }
        .inner-container {
            display: flex;
            flex-direction: row;
            height: 35vw;
            justify-content: space-evenly;
        }
        .card {
            width:18vw;
            height:35vw;
            position: relative;
            left: 0;
            filter: grayscale(0.5);
            transition: filter 400ms ease-in-out;
        }
        .card:hover {
            filter:grayscale(0);
        }
        .icon {
            display: none;
        }
        .swipe {
            height: 80vh;
        }
        
	}
</style>