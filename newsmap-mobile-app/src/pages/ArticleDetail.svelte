<script>
    import { stringToDom } from "../helper";
	import moment from 'moment';
    import Head from '../Head.svelte'
    import Foot from '../Foot.svelte'
    import { afterUpdate } from "svelte";

    export let data = {};

    const format = (text) => {
        return text !== undefined ? text : null;
    };

    let y;
    export let height;
    
    if (data.is_custom_html) {
        setTimeout(() => {
            const footer = document.querySelector("nav.footer");
            document.querySelector("body").append(footer);
        }, 1000);
    }
</script>

<svelte:window bind:scrollY={y} />

<svelte:head>
    <title>{data.title}</title>
    {#if data.is_custom_html}
        <link rel="stylesheet" href={`/${data.type}/${data.slug}/global.css`} />
        <link rel="stylesheet" href={`/${data.type}/${data.slug}/bundle.css`} />
        <script src={`/${data.type}/${data.slug}/bundle.js`}></script>
    {/if}
    <meta data-n-head="true" data-hid="charset" charset="utf-8" />
    <meta
        data-n-head="true"
        data-hid="mobile-web-app-capable"
        name="mobile-web-app-capable"
        content="yes"
    />
    <meta
        data-n-head="true"
        data-hid="description"
        name="description"
        content=""
    />
    <meta
        data-n-head="true"
        http-equiv="x-ua-compatiable"
        content="IE=edge,chrome=1"
    />
    <meta
        data-n-head="true"
        name="title"
        content={data.title}
    />
    <meta
        data-n-head="true"
        name="googlebot-news"
        content="index,follow"
    />
    <meta data-n-head="true" name="googlebot" content="index,follow" /><meta
        data-n-head="true"
        name="robots"
        content="index,follow"
    />
    <meta
        data-n-head="true"
        name="robots"
        content="max-snippet:50, max-image-preview:large"
    />
    <meta data-n-head="true" name="language" content="id" /><meta
        data-n-head="true"
        name="geo.country"
        content="id"
    />
    <meta data-n-head="true" name="geo.placename" content="Indonesia" /><meta
        data-n-head="true"
        http-equiv="content-language"
        content="In-Id"
    />
    <meta
        data-n-head="true"
        property="og:image"
        content={data.thumbnail_social}
    />
    <meta data-n-head="true" property="og:locale" content="id_ID" /><meta
        data-n-head="true"
        property="og:type"
        content="article"
    />
    <meta
        data-n-head="true"
        property="og:title"
        content={data.title}
    />
    <!-- <meta
        data-n-head="true"
        property="og:url"
        content="https://tirto.id/setelah-ada-gocorp-sampai-kapan-mau-reimburse-uang-transport-gr65"
    />
    <meta
        data-n-head="true"
        data-hid="description_fb"
        property="og:description"
        content="Kendaraan operasional tak bisa dipisahkan dari keseharian para pekerja dan pelaku usaha."
    /> -->
    <!-- <meta
        data-n-head="true"
        property="og:image:type"
        content="image/jpg"
    /> -->
    <meta data-n-head="true" property="og:image:width" content="600" /><meta
        data-n-head="true"
        property="og:image:height"
        content="315"
    />
    <meta
        data-n-head="true"
        property="og:site_name"
        content="jurno.id"
    />
    <!-- <meta
        data-n-head="true"
        property="article:author"
        content="https://www.facebook.com/TirtoID"
        itemprop="author"
    /> -->
    <meta
        data-n-head="true"
        name="twitter:card"
        content="summary_large_image"
    />
    <meta
        data-n-head="true"
        data-hid="description_tw"
        name="twitter:description"
        content=""
    />
    <meta
        data-n-head="true"
        name="twitter:image"
        content={data.thumbnail_social}
    />
    <meta
        data-n-head="true"
        name="twitter:image:src"
        content={data.thumbnail_social}
    />
    <meta
        data-n-head="true"
        name="thumbnail"
        content={data.thumbnail_social}
    />
    <meta
        data-n-head="true"
        data-hid="viewport"
        name="viewport"
        content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
    />
</svelte:head>

{#if data.is_custom_html}
    {#if data.footer !== undefined}
        <!-- <Foot
            {...data.footer}
            type={data.type}    
            bgFooter = {data.footer_background_color}
            txtFooter= {data.article_background_color}
        /> -->
    {/if}
{:else}
    <main class="content-section">
        <div class="container">
            {#if format(data.thumbnail)} <!-- thumbnail image -->
                <div class="header"
                    style:transform="translate(0px, {-y/4}px)"
                    style:margin-top={height}px>
                    <img
                        src={data.thumbnail}
                        title={data.title}
                        alt={data.title}
                        onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = process["env"]["NO_IMAGE"];
                        }}
                    />
                </div>
            {/if}
            {#if format(data.video)}
                <div class="mt-5 text-center">
                    <!-- svelte-ignore a11y-media-has-caption -->
                    <video width="480" height="360" controls preload="metadata">
                        <source src={data.video} type="video/mp4" />
                        Your browser doesn\'t support HTML5 video tag.<br />
                    </video>
                </div>
            {/if}
            {#if format(data.article)} <!-- article content -->
                <article>
                    <section class="content">
                        <h1>{format(data.title)}</h1> <!-- title -->
                        <!-- <span>{moment(data.post_date).format('ddd, DD MMM YYYY, HH:mm')}</span> -->
                        <div class="author">
                            {#if format(data.author_image)}
                            <img class='authorpic'
                                src={process["env"]["URL_IMAGE"] + "author/" + data.author_image}
                                alt={data.author_name}>
                            {/if}
                            {#if data.type != 'rewara'}
                            <span class='authorname'>{data.author_name}</span>
                            {:else if data.type == 'rewara'}
                            <span class='authorname'>Rewara</span>
                            {/if}
                        </div>
                        <div>
                            {@html stringToDom(data.article)}
                        </div> 
                    </section>
                    
                    {#if data.footer !== undefined}
                        <Foot
                            {...data.footer}
                            type={data.type}
                        />
                    {/if}
                </article>
                                      
            {/if}
            {#if format(data.source_link)}
                <div class="mt-5">
                    <a href={data.source_link} target="_blank" rel="noreferrer"
                        >Source link</a
                    >
                </div>
            {/if}
        </div>
    </main>
{/if}

<style>
    .header {
        position: fixed;
        z-index: -1;
        top: -40vh;
        width: 100%;
        display: flex;
        justify-content: center;
    }
    .author {
        display: flex;
        flex-direction: row;
        align-items: center;
    }
    .authorpic {
        width:50px;
        height: 50px;
        background-color: steelblue;
        clip-path: circle(50%);
    }
    .authorname {
        color:hsl(0, 0%, 50%);
        font-weight: 500;
        margin-left: 0.5rem;
    }
    .container {
        width: 100%;
        margin-right: auto;
        margin-left: auto;
        white-space: normal;
        line-height: 2;
    }
    .content-section {
        width: 100%;
        display: block;
        position: relative;
    }
    /* .text-center {
        text-align: center !important;
    } */
    article {
        width:100%;
        background-color: #fafafa;
        border-radius: 2rem 2rem 0 0;
        position: relative;
        top:40vh;
    }
    h1 {
        font-family: 'Roboto Mono';
    }
    .content {
        padding:1rem;
        margin:0 auto;
    }
    img {
        object-fit: cover;
    }
    @media only screen /*xtrasmall*/
	and (max-width: 575px) {
        .header {
            top: 0;
            height:50vh;
        }
        img {
            height:50vh;
        }
        h1 {
            font-size: 1.8rem;
            line-height: 2rem;
        }

	}
	@media only screen /*small*/
	and (min-width: 576px)
	and (max-width: 767px) {
        .header {
            top: 0
        }

	}
	@media only screen /*medium*/
	and (min-width: 768px)
	and (max-width: 991px) {
        .header {
            top: 0
        }
        .content {
            max-width:650px;
        }
        h1 {
            font-size: 1.8rem;
            line-height: 2rem;
        }

	}
	@media only screen /*large*/
	and (min-width: 992px)
	and (max-width: 1199px) {
        .header {
            top: 0;
        }
        .content {
            max-width:650px;
        }
        h1 {
            font-size: 1.8rem;
            line-height: 2rem;
        }
        img {
            width: 100vw;
        }

	}
	@media only screen /*xtralarge*/
	and (min-width: 1200px) {
        .header {
            top: -40vh
        }
        .content {
            max-width:650px;
        }
        h1 {
            font-size: 1.8rem;
            line-height: 2rem;
        }
        img {
            width: 100vw;
        }
	}

</style>
