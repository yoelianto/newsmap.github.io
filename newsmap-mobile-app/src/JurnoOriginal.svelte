<script>
    // let jurno = [
    //     {
    //         title: "Kenapa Bimbel Bisa Booming Banget?",
	// 		url:"https://newsmap.id/article/kenapa-bimbel-bisa-booming-banget",
	// 		thumb:"https://admin-dev.newsmap.id/uploads/news/1637749717_Bimbel-compress.jpg"
    //     },
    //     {
    //         title: "Asam Garam Driver Ojol: Stres, Cemas, dan Kesepian",
	// 		url:"https://newsmap.id/article/asam-garam-driver-ojol-stres-cemas-dan-kesepian",
	// 		thumb:"https://admin-dev.newsmap.id/uploads/news/1637737865_Asam-Garam-Driver-Ojol--Orderan-Anyep,-Cemas,-dan-Kesepian.jpg"
    //     },
    //     {
    //         title: "Into the Ambisverse: Mengulik Komunitas Ambis Anak Sekolah Indonesia",
	// 		url:"https://newsmap.id/article/into-the-ambisverse-mengulik-komunitas-ambis-anak-sekolah-indonesia",
	// 		thumb:"https://admin-dev.newsmap.id/uploads/news/1637751242_Ambisverse-compress.jpg"
    //     }
    //     ]
    import { get } from "./api";
    import * as ihttp from './constants/initialHttp';

    const fetchData = (async () => {
        const result = await get(ihttp.URI_ARTICLE_LIST, {size: 3});
        return await result.data;
    })()

</script>

<div class="container" id="original">
    <p class="title">JURNO ORIGINAL</p>
    {#await fetchData}
        <p>...waiting</p>
    {:then data}
    <div class="inner-container">
        {#each data as d, i}
        <div class='swipe'>
            <a class="card-link" href={`${process['env']['DOMAIN']}/article/${d.slug}`}>
                <div class="card" >
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
    }
    @media only screen and (min-width:1200px) {
        .card {
            width:30vw;
            height:30vw;
            margin-left: 1rem;
            margin-right: 1rem;
            filter: grayscale(1);
            transition: filter 1000ms ease-in-out;
            -webkit-transition: -webkit-filter 200ms ease-in-out;
        }
        .card:hover {
            filter: grayscale(0);
        }
        .inner-container {
            display: flex;
            flex-direction: row;
            justify-content: center;
            align-items: center;
        }
        .card-title {
            font-size:2rem;
            font-weight: 700;
            line-height: 2rem;
            z-index: 15;
        }
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