<script>
    import { get } from "./api";
    import * as ihttp from './constants/initialHttp';

    export let params = {}

    const fetchData = (async () => {
        const mergeParams = {...params, kind: 'person'}
        mergeParams.per_page = 10

        const result = await get(ihttp.URI_NEWS_TOP_ENTITY, mergeParams);

        //percentage calculation
        result.data.forEach((data) => {
            data.percent = Math.ceil((data.positive-data.negative)/(data.positive+data.negative)*100)
            data.percentAbs = Math.abs(data.percent)
            if (data.percent > 0) {
                data.sentiment = "positive"
                data.color = "hsl(244, 30%, 30%)"
            } else {
                data.sentiment = "negative"
                data.color = "hsl(0, 82%, 64%)"
            }
        });

        return await result.data;
    })()


</script>

<div class="container">
    <div class="slider">
        {#await fetchData}
        <p>...waiting</p>
        {:then data}
            {#each data as d}
            <div class="sentiment-container">
                <div class="sentiment">

                    <div class="personcontainer">
                        <div class="person">
                            <img class='people' src={d.thumbnail} alt={d.name} />
                        </div>
                        <div class="pie" style="--p:{d.percentAbs};--c:{d.color};"></div>
                    </div>
                    
                    <div class='namecontainer'>
                        <div class="percent" style="color:{d.color}">{d.percent}%</div>
                        <div class="name">{d.name}</div>
                    </div>
                    
                </div>
            </div>
                
            {/each}
        {:catch error}
            <p>An error occurred!</p>
        {/await}
    </div>
</div>

<style>
    .container {
        margin-left: 5px;
        margin-bottom: 1rem;
        margin-top: 1rem;
    }

    .namecontainer {
        display: flex;
    }
    .personcontainer {
        display:inline-flex;
        flex-direction: column;
        width:25vw;
        margin:0.5rem;
        position:relative;
    }
    .slider {
        overflow-x: scroll;
        overflow-y:hidden;
        white-space: nowrap;
        display: flex;
    }
    .sentiment {
        display: flex;
        flex-direction: row;
    }
    .person{
        clip-path: circle(40%);
        width: 25vw;
        height: 25vw;
    }
    .people {
        width:100%;
    }
    .percent {
        font-family: var(--fontfamily2);
        font-size: 1.2rem;
        text-align: center;
        margin: 0.5rem 0;
        font-weight: 700;
        display: inline-block;
        overflow-wrap: break-word;
        width:25vw;
        white-space:pre-wrap;
        margin-bottom: 0;
    }
    .name {
        font-family: var(--fontfamily2);
        font-size: 0.8rem;
        text-align: center;
        margin: 0.5rem 0;
        font-weight: 500;
        display: inline-block;
        overflow-wrap: break-word;
        width:25vw;
        white-space:pre-wrap;
        margin-top:0.25rem;
    }
    .slider::-webkit-scrollbar {
        display: none;
    }
    .slider {
        -ms-overflow-style: none;  /* IE and Edge */
        scrollbar-width: none;  /* Firefox */
    }

    /* pie chart */
    .pie {
        --p:20;
        --b:6px;
        --c:darkred;
        --w:25vw;
        
        width:var(--w);
        aspect-ratio:1;
        position:absolute;
        /* display:inline-grid;
        margin:5px; */
        place-content:center;
        font-size:25px;
        font-weight:bold;
        font-family:sans-serif;
        transform:rotate( calc(((100 - var(--p)) / 2 ) * 3.6deg ) );
    }
    .pie:before,
    .pie:after {
        content:"";
        position:absolute;
        border-radius:50%;
    }
    .pie:before {
        inset:0;
        background:
            radial-gradient(farthest-side,var(--c) 98%,#0000) top/var(--b) var(--b) no-repeat,
            conic-gradient(var(--c) calc(var(--p)*1%),#0000 0);
        -webkit-mask:radial-gradient(farthest-side,#0000 calc(99% - var(--b)),#000 calc(100% - var(--b)));
                mask:radial-gradient(farthest-side,#0000 calc(99% - var(--b)),#000 calc(100% - var(--b)));
    }
    .pie:after {
        inset:calc(50% - var(--b)/2);
        background:var(--c);
        transform:rotate(calc(var(--p)*3.6deg)) translateY(calc(50% - var(--w)/2));
    }
    @media only screen /*xtrasmall*/
	and (max-width: 575px) {
        .container {
            width:100vw;
        }
        .sentiment {
            flex-direction: column;
        }
        .namecontainer {
            flex-direction: column;
            justify-content: center;
            align-items: center;
        }

	}
	@media only screen /*small*/
	and (min-width: 576px)
	and (max-width: 767px) {

	}
	@media only screen /*medium*/
	and (min-width: 768px)
	and (max-width: 991px) {

	}
	@media only screen /*large*/
	and (min-width: 992px)
	and (max-width: 1199px) {

	}
	@media only screen /*xtralarge*/
	and (min-width: 1200px) {
        .sentiment-container {
            width:18vw;
        }
        .slider {
            flex-direction: column;
        }
        .namecontainer {
            flex-direction: column;
            justify-content: center;
        }
        .sentiment {
            width:10vw;
            cursor: pointer;
            flex-direction: row;
        }
        .person {
            width: 6vw;
            height:6vw;
        }
        .slider {
            margin: 0 auto;
        }
        .pie {
            --w:6vw;
            --b:6px;
        }
        .percent{
            width:10vw;
            font-size: 1.5rem;
        }

        .name {
            width:10vw;
            font-size: 1rem;
        }
        .container {
            display: flex;
        }
	}
</style>