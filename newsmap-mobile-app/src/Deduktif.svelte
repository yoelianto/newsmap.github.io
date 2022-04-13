<script>
    //export let title;
    export let author;
    // let deduktifurl = "https://newsmap.id/article/";

    //export let  authorprofileimage, authorprofilealt;

	import { Link } from "svelte-navigator";
    import { getDeduktif } from "./api";
    import * as ihttp from './constants/initialHttp';
    import {truncText, stringToDom} from './helper';

    const fetchData = (async () => {
        const result = await getDeduktif(ihttp.URI_ARTICLE_LIST, {size: 1});
        console.log(result.data)
        return await result.data;
    })()

    let width = document.body.clientWidth
    let truncNum

    if (width < 575) {
        truncNum = 75
    } else if (width < 767 && width >= 576) {
        truncNum = 100
    } else if (width < 991 && width >= 768) {
        truncNum = 100
    } else if (width < 1199 && width >= 992) {
        truncNum = 100
    } else if (width >= 1200 ) {
        truncNum = 280
    }

    // $:console.log(fetchData)
</script>

<div class="container" id="deduktif">
    {#await fetchData}
        <p>...waiting</p>
    {:then data}
        {#each data as d, i}
    <div class="bottom">
        <div class="content">
            <div class="contentbot">
                <div class="left">
                    <div class="profile">
                        <img class="authorprofile" src={`${process['env']['URL_IMAGE']}/news/${d.thumbnail}`} onerror={`this.onerror=null;this.src='${process['env']['NO_IMAGE']}';`} alt="author profile">
                    </div>
                </div>
                <div class="right">
                    <div class="excerpt">
                        {@html truncText(stringToDom(d.is_custom_html ? d.html_body : d.article),truncNum)}
                    </div>
                </div>
            </div>
            <div class="contenttop">
                
                <div class="headline">
                    <img class="header" src={`${process['env']['URL_IMAGE']}/news/${d.thumbnail}`} alt={d.title} >
                    
                    <div class="headerbottom"></div>
                    <div class="detail">
                        <div class="author">oleh {author}</div>
                        <Link to={`/deduktif/${d.slug}`}>
                            <div class="title">{d.title}</div>  
                        </Link>
                         
                    </div>
                </div>
            </div>
        </div>
    </div>
        {/each}
    {:catch error}
        <p>An error occurred!</p>
    {/await}
    <p class="deduktif">DEDUKTIF</p>
</div>


<style>
    .deduktif {
        font-family: var(--fontfamily1);
        font-weight:700;
        font-size:1.5rem;
        margin-left: 6%;
        margin-top: 1rem;
        margin-bottom:30vw;
        color: var(--color-brand-darkblue);
    }
    .container {
        display: flex;
        flex-direction: column-reverse;
        height:100vw;
    }
    .bottom {
        display: flex;
        flex-direction: row;
        background-color: #ef5959;
        height: 50vw;
        border-radius: 0 0 0 2rem;
    }
    .headerbottom{
        background: linear-gradient(0deg, rgba(36,32,83,0.9) 0%, rgba(36,32,83,0) 100%);
        width: 100%;
        position: absolute;
        bottom: 0;
        height:70%;
        border-radius:0 0 0.5rem 0.5rem;
    }
    .content {
        width:88vw;
        margin:0 auto;
        display:flex;
        flex-direction: column-reverse;
    }
    .contentbot{
        display: flex;
        margin-bottom:1rem;
        margin-top:0.5rem;
        width: 88vw;
        margin-left: auto;
        margin-right: auto;
    }
    .right {
        width:70%;
        color:white;
        display: flex;
        flex-direction: column-reverse;
    }
    .left {
        width:30%;
        display: flex;
        justify-content: center;
        z-index: 99;
    }
    .authorprofile {
        height: 100%;
    }
    .headline {
        width:88vw;
        background-color: steelblue;
        height: 56vw;
        border-radius: 0.5rem;
        display: flex;
        justify-content: flex-end;
        align-items: flex-end;
        position: relative;
        overflow: hidden;
    }
    .header{
        position: absolute;
        height: 100%;
        left:0;
    }
    .detail {
        width:70%;
        margin-bottom:0.8rem;
        color: white;
        font-family: var(--fontfamily2);
        z-index: 10;
    }
    .title {
        font-size: 1.25rem;
        line-height: 1.2rem;
        font-weight: 700;
        padding-right:1rem;
        white-space: normal;
    }
    .author {
        font-size: 0.8rem;
        margin-bottom: 0.5rem;
        z-index: 20;
    }
    .excerpt {
        font-size: 0.8rem;
        width: 100%;
        white-space: normal;
    }
    .profile {
        position: relative;
        top:-10vw;
        width:15vw;
        height:15vw;
        border-radius: 50%;
        overflow: hidden;
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
            line-height: 2rem;
        }
        .container {
            max-width:1100px;
            width:70.4%;
            margin:calc(18vw + 5rem) auto 1rem auto;
            height:25vw;
        }
        .author {
            margin-bottom: 1rem;
        }
        .deduktif {
            font-family: var(--fontfamily1);
            font-weight:700;
            font-size:2rem;
            margin-top: 2rem;
            margin-bottom:17vw;
            margin-left: 0;
        }
        .headline {
            width:50vw;
            height: 31.8vw;
        }
        .bottom {
            height:25vw;
            border-radius: 0 2rem 0 2rem;
        }
        .profile {
            top:-4vw;
            width:7vw;
            height:7vw;
        }
        .contenttop {
            display: flex;
            justify-content: center;
        }
        .detail {
            width: 75%;
            margin-bottom: 1.5rem;
        }
        .left {
            justify-content: center;
            width: 25%;
        }
        .contentbot {
            width: 50vw;
        }
        .excerpt {
            width: 100%;
            white-space: normal;
            font-size: 1rem;
        }
	}
</style>