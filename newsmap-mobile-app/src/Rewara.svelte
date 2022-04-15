<script>
    import { link } from "svelte-spa-router";
    import { get } from "./api";
    import * as ihttp from './constants/initialHttp';
    import {truncText, stringToDom} from './helper';

    const fetchData = (async () => {
        const result = await get(ihttp.URI_REWARA_LIST, {size: 5});
        return await result.data;
    })()


    export let title
    
    </script>
    
    <div class="container">
        <p class="title">{title}</p>
        <div class="rewara-container">
            <div class="rewara">
                {#await fetchData}
                <p>...waiting</p>
                {:then rewara}
                <a href={rewara[0].slug}>
                    <div class="firstnews">
                        <img class='imgthumb' src={rewara[0].thumbnail ? `${process['env']['URL_IMAGE']}rewara/${rewara[0].thumbnail}` : ''} onerror={`this.onerror=null;this.src='${process['env']['NO_IMAGE']}';`} alt={rewara[0].title} />
                        <p class="article-title" id='first-article'>{rewara[0].title}</p>
                    </div>
                </a>
                
                    <ul class="othernews">
                        {#each {length: 4} as _, i}
                        {#if rewara[i+1] !== undefined}
                        <a href={`/rewara/${rewara[i+1].slug}`} use:link>
                            <li class="news">
                                <p class="article-title">{rewara[i+1].title}</p>
                                <p class="excerpt">
                                    {@html truncText(stringToDom(rewara[i+1].article),130)}
                                </p>
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
        .container {
            padding-bottom: 120px;
        }
        .excerpt {
            color:#363636;
            display:none;
        }
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
            font-family: var(--fontfamily2);
        }
        .imgthumb {
            width:35vw;
            height:25.2vw;
            border-radius:0.5rem;
            object-fit: cover;
            
        }

        .firstnews {
            transition: filter 400ms ease-in-out;
        }
        #first-article {
            font-size: 1rem;
            color: #363636;
        }
        .othernews>a>li>.article-title:hover {
            transition: color 200ms ease-in-out;
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
        }
        .container {
            max-width:1100px;
            width:70.4%;
            margin:1rem auto 0 auto;
        }
        .rewara {
            margin-left: 0;
        }
        .news {
            width:30vw;
        }
        .excerpt {
            display: block;
            white-space: normal;
            margin-bottom: 1.2rem;
            margin-top: -0.5rem;
        }
        .article-title {
            font-size: 1.2rem;
            line-height: 1.2rem;
            margin-bottom: 0.8rem;
        }

        #first-article {
            font-size: 2rem;
            color: white;
            position:absolute;
            bottom: 0;
            line-height: 2rem;
            padding:1rem;
        }

        .firstnews {
            position: relative;
            filter: grayscale(0.5);
        }
        .firstnews:hover {
            filter:grayscale(0)
        }
        .othernews>a>li>.article-title:hover {
            color:#ef5959;
        }

	}
    </style>