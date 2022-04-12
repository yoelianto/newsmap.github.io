<script>
    import { stringToDom } from "../helper";
	import moment from 'moment';

    export let data = {};

    const format = (text) => {
        return text !== undefined ? text : null;
    };
</script>

{#if !data.is_custom_html}
    <main class="content-section">
        <div class="container">
            <div class="text-center">
                <h3>{format(data.title)}</h3>
                <span>{moment(data.post_date).format('ddd, DD MMM YYYY, HH:mm')}</span>
            </div>
            {#if format(data.thumbnail)}
                <div class="mt-5 text-center">
                    <img
                        width="50%"
                        src={`${process["env"]["URL_IMAGE"]}news/${data.thumbnail}`}
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
            {#if format(data.article)}
                <div class="row mt-5">
                    <div class="col">
                        {@html stringToDom(data.article)}
                    </div>
                </div>
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
    .container {
        width: 100%;
        padding-right: 15px;
        padding-left: 15px;
        margin-right: auto;
        margin-left: auto;
        white-space: normal;
        line-height: 2;
    }
    .content-section {
        width: 100%;
        display: block;
        padding: 20px 0;
        position: relative;
    }
    .text-center {
        text-align: center !important;
    }
    .mt-5 {
        margin-top: 3rem !important;
    }
    .row {
        display: flex;
        flex-wrap: wrap;
        margin-right: -15px;
        margin-left: -15px;
    }
    .col {
        flex-basis: 0;
        -moz-box-flex: 1;
        flex-grow: 1;
        max-width: 100%;
    }

    @media (min-width: 1280px) {
        .container {
            max-width: 1260px;
        }
    }
    @media (min-width: 1170px) {
        .container {
            max-width: 1100px;
        }
    }
</style>
