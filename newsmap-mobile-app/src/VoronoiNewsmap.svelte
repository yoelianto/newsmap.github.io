<script>
    import * as d3 from 'd3'
    import { voronoiMapSimulation } from 'd3-voronoi-map'
    import { onMount, tick} from 'svelte'
    import * as ihttp from "./constants/initialHttp";
    import { get } from "./api";
    import {createEventDispatcher} from 'svelte';
    import moment from "moment";
    import Fa from 'svelte-fa';
    import { faCameraAlt } from '@fortawesome/free-solid-svg-icons'
    import html2canvas from 'html2canvas';

    let today = moment().format("YYYY-MM-DD")
    let yesterday = moment().subtract(1, 'days').format("YYYY-MM-DD")

    const dispatch = createEventDispatcher()

    export let topicId, newsId

    let circleanchor, catanchor, scale, circlelen, catlen, earanchor1, earanchor2, earlen1, earlen2,
        pointcircle = [],
        pointcat = [],
        pointear1 = [],
        pointear2 = []
    let el
    let x = [],
        y = []
    let minX, minY, maxX, maxY;

    let w = document.body.clientWidth;
    let h = document.body.clientHeight;
    let width, placeholder, container;

    const fetchData = (async () => {
        const result = await get(ihttp.URI_LAST_TOPIC, { from:yesterday, to:today, size: 18 });
        placeholder.style.display = 'none';
        return result.data;
    })()

    fetchData.then((data) => {
        let primWeight = 4,
            secWeight = 3,
            tertWeight = 2,
            lastWeight = 1

        data[0].weight = primWeight
        data[0].color = 'hsla(245, 44%, 23%, 1)'
        
        for (let i = 1; i < 5; i++) {
            data[i].weight = secWeight
            data[i].color = `hsla(0, 82%, ${60 + i * 2.5}%, 1)`
        }
        for (let i = 5; i < 9; i++) {
            data[i].weight = tertWeight
            data[i].color = `hsla(0, 82%, ${60 + i * 2.5}%, 1)`
        }
        for (let i = 9; i < data.length; i++) {
            data[i].weight = lastWeight
            data[i].color = `hsla(0, 82%, ${60 + i * 2.5}%, 1)`
        }

        function drawVoronoi() {
            let num = 240
            let numear = 30
            circlelen = circleanchor.getTotalLength()
            catlen = catanchor.getTotalLength()
            earlen1 = earanchor1.getTotalLength()
            earlen2 = earanchor2.getTotalLength()
            let path = catanchor.outerHTML.substring(23)
            path = path.substring(0,1172)

            for (let i=0; i < num; i++) {
                let pt = circleanchor.getPointAtLength(i * circlelen / (num-1));
                pointcircle.push([pt.x, pt.y]);
            }

            for (let i=0; i < num; i++) {
                let pt = catanchor.getPointAtLength(i * catlen / (num-1));
                pointcat.push([pt.x, pt.y]);
            }

            for (let i=0; i < numear; i++) {
                let pt = earanchor1.getPointAtLength(i * earlen1 / (numear-1));
                pointear1.push([pt.x, pt.y]);
            }

            for (let i=0; i < numear; i++) {
                let pt = earanchor2.getPointAtLength(i * earlen2 / (numear-1));
                pointear2.push([pt.x, pt.y]);
            }

            //get X and Y coordinates
            pointcat.forEach(arr => {
            x.push(arr[0])
            y.push(arr[1])
            })

            //check min and max value for each X and Y coordinates
            minX = Math.min(...x)
            minY = Math.min(...y)
            maxX = Math.max(...x)
            maxY = Math.max(...y)

            //check screen orientation
            if (w > h) { // horizontal (desktop)
                width = 0.65 * h
                scale = width / (maxY-minY)
            } else if (h > w) { // vertical (mobile)
                width = 0.95 * w
                scale = width / (maxY-minY)
            }

            //scale function
            let scaledpoint = pointcircle.map(coord => {
                return coord.map(val => {
                    return scaleObject(val)
                })
            })
            let scaledcat = pointcat.map(coord => {
                return coord.map(val => {
                    return scaleObject(val)
                })
            })

            let scaledear1 = pointear1.map(coord => {
                return coord.map(val => {
                    return scaleObject(val)
                })
            })

            let scaledear2 = pointear2.map(coord => {
                return coord.map(val => {
                    return scaleObject(val)
                })
            })

            //scale function
            function scaleObject(val) {
                return val * scale
            }

            let simulation = voronoiMapSimulation(data)
                .weight((d) => { return d.weight * d.weight })
                .clip(scaledpoint)
                .stop();

            let state = simulation.state(); 

            while (!state.ended) {
                simulation.tick();
                state = simulation.state();
            }

            let polygons = state.polygons;
            

            let container = d3.select(el)
                .attr('width', width)
                .attr('height', width)

            let cells = container
            .append('g')
            .classed('cells', true)

            let cathead = container
            .append('g')
            .classed('cat', true)

            let catear1 = container
            .append('g')
            .classed('catear1', true)

            let catear2 = container
            .append('g')
            .classed('catear2', true)

            let text = container
            .append('g')
            .classed('labels', true)

            let polygon = cells
            .selectAll('.voronoi')
            .data(polygons)
            .enter()
            .append('path')
            .classed('voronoi', true)
            .attr("id", (d) => {
                    return d.site.originalObject.data.originalData.topicId;
                })
            .attr("d", (d) => {
                return "M" + d.join(",") + "z";
                })
            .style("stroke-linejoin", "round")
            .style("cursor", "pointer")
            .style("fill", (d) => {
                    return d.site.originalObject.data.originalData.color;
                })
            .style('z-index', 10)
            .on('click', (d)=> {
                topicId =  d.srcElement.__data__.site.originalObject.data.originalData._id
                newsId = d.srcElement.__data__.site.originalObject.data.originalData.topic_id
                dispatch('modalIn')
            })

            cathead
            .append('path')
            .classed('cathead', true)
            .attr('d', "M" + scaledcat.join(",") + "z")
            .style("fill", "#f17474")

            catear1
            .append('path')
            .classed('cathead', true)
            .attr('d', "M" + scaledear1.join(",") + "z")
            .style("fill", "#ee5151")

            catear2
            .append('path')
            .classed('cathead', true)
            .attr('d', "M" + scaledear2.join(",") + "z")
            .style("fill", "#ee5151")

            text
            .selectAll('.label')
            .data(polygons)
            .enter()
            .append('foreignObject')
            .attr('width',(d) => {
                let xpoly=[]
                d.forEach(arr => {
                    xpoly.push(arr[0])
                    })
                let xmaxpoly = Math.max(...xpoly)
                let xminpoly = Math.min(...xpoly)
                let wcell = xmaxpoly-xminpoly
                return wcell
                }
            )
            .attr('height',(d) => {
                let ypoly=[]
                d.forEach(arr => {
                    ypoly.push(arr[1])
                    })
                let ymaxpoly = Math.max(...ypoly)
                let yminpoly = Math.min(...ypoly)
                let hcell = ymaxpoly-yminpoly
                return hcell
                }
            )
            .attr('x', (d) => {
                let xpoly=[]
                d.forEach(arr => {
                    xpoly.push(arr[0])
                    })
                let xminpoly = Math.min(...xpoly)
                
                return xminpoly
                })
            .attr('y', (d) => {
                let ypoly=[]
                d.forEach(arr => {
                    ypoly.push(arr[1])
                    })
                let yminpoly = Math.min(...ypoly)
                return yminpoly
                })
            .append('xhtml:div')
            .attr("xmlns","http://www.w3.org/1999/xhtml")
            .style('display','flex')
            .style('justify-content','center')
            .style('align-items','center')
            .style('text-align', 'center')
            .style('white-space', 'normal')
            .style('height','100%')
            .style('width','60%')
            .style('margin','auto')
            .classed('label', true)
            .style("cursor", "pointer")
            .html((d) => {
                if (d.site.originalObject.data.originalData.weight >= 2) {
                    return d.site.originalObject.data.originalData.title
                }
            })
            .style('color', 'white')
            .attr('text-anchor', 'middle')
            .attr('x', (d) => {
                return d.site.x
            })
            .attr('y', (d) => {
                return d.site.y
            })
            .style('font-size', (d) => {
                if (d.site.originalObject.data.originalData.weight == 4) {
                    return '1rem'
                } else if (d.site.originalObject.data.originalData.weight == 3) {
                    return '0.6rem'
                } else {
                    return '0.4rem'
                }
            })
            .style('font-weight', (d) => {
                if (d.site.originalObject.data.originalData.weight == 4) {
                    return '700'
                } else if (d.site.originalObject.data.originalData.weight == 3) {
                    return '500'
                } else {
                    return '300'
                }
            })
            .on('click', (d)=> {
                topicId =  d.srcElement.__data__.site.originalObject.data.originalData._id
                newsId = d.srcElement.__data__.site.originalObject.data.originalData.topic_id
                dispatch('modalIn')
            })

            cells.raise()
            cathead.lower()
            text.raise()
        }
        
        drawVoronoi()

    })


    function save() {
        let a = document.querySelector('#pala-koceng')
        html2canvas(a).then(canvas => {
        container.appendChild(canvas)
    }); 
    }

</script>

<div class="container" bind:this={container}>
    <svg
    bind:this={placeholder}
    xmlns="http://www.w3.org/2000/svg"
    xmlns:xlink="http://www.w3.org/1999/xlink"
    class='example'
    width={w > h ? 0.65 * h : 0.95 * w}
    height={w > h ? 0.65 * h : 0.95 * w}
    viewBox = "0 0 100 100">
    <path bind:this={catanchor} fill='hsl(0, 0%, 88%)' class="cls-1" d="M94.6,14.335v3.81l-.09,4.17-.19,4.65-.31,5.31-.3,4.3-.45,5.47-.54,5.6,.22,1.07,.59,4.55,.08,4.58-.4,4.54-.83,4.46-1.31,4.34-1.76,4.16-2.16,3.95-2.53,3.7-2.93,3.38-3.25,3.05-3.53,2.71-3.76,2.35-3.98,1.93-4.14,1.53-4.27,1.11-4.36,.69-4.38,.26-4.38-.26-4.36-.69-4.26-1.11-4.15-1.53-3.98-1.93-3.76-2.35-3.52-2.71-3.26-3.05-2.92-3.38-2.54-3.7-2.16-3.95-1.75-4.16-1.31-4.34-.84-4.46-.4-4.54,.08-4.58,.6-4.55,.21-1.07-.53-5.6-.45-5.47-.31-4.3-.31-5.31-.19-4.65-.08-4.17v-3.81l.15-3.65,.22-2.8,.32-2.46,.5-1.95,.14-.41,.14-.4,.15-.4,.18-.38,.2-.39,.25-.33,.3-.35,.34-.28,.37-.23,.41-.17,.43-.11,.43-.02h.43l.42,.05,.41,.08,.39,.12,.38,.14,.36,.17s1.29,.71,1.58,.86c.03,.02,.05,.03,.05,.03l2.48,1.9,1.56,1.47,1.68,1.81,1.54,1.8,1.73,2.13,1.47,1.91,1.43,1.91,1.02,1.43,1.34,1.95,1.1,1.67,2.98-1.38,4.28-1.57,4.39-1.2,4.49-.76,4.53-.29,4.53,.29,4.5,.76,4.39,1.2,4.27,1.57,2.98,1.38,1.11-1.67,1.34-1.95,1.02-1.43,1.42-1.91,1.48-1.91,1.72-2.13,1.55-1.8,1.68-1.81,1.56-1.47,2.47-1.9,.06-.03c.28-.15,1.58-.86,1.58-.86l.36-.17,.38-.14,.39-.12,.4-.08,.42-.05h.43l.44,.02,.43,.11,.4,.17,.38,.23,.34,.28,.29,.35,.26,.33,.2,.39,.18,.38,.15,.4,.14,.4,.13,.41,.5,1.95,.33,2.46,.22,2.8,.15,3.65h0Z"/>

    <path bind:this={circleanchor} fill='hsl(0, 0%, 88%)' class="cls-1" d="M91.153,57.13c0,22.372-18.411,40.502-41.123,40.502S8.917,79.503,8.917,57.13c0-7.001,1.806-13.594,4.981-19.343,2.865-5.176,6.836-9.662,11.614-13.167,6.846-5.011,15.333-7.982,24.518-7.982s17.624,2.952,24.47,7.943c4.768,3.486,8.739,7.953,11.614,13.099,3.214,5.778,5.04,12.4,5.04,19.45Z"/>

    <path bind:this={earanchor1} fill='hsl(0, 0%, 88%)' class="cls-1" d="M88.04,21.18v1.95l-.04,2.14-.1,2.39-.16,2.73-.16,2.21-.2,2.48c-2.88-4.7-6.64-8.81-11.06-12.12l.01-.02,.69-1,.53-.74,.72-.98,.76-.98,.89-1.09,.79-.93,.87-.93,.8-.75,1.27-.98,.03-.01c.14-.08,.81-.44,.81-.44l.18-.09,.4-.14,.2-.04,.22-.02h.22l.23,.01,.22,.05,.2,.09,.2,.12,.17,.14,.15,.18,.13,.17,.11,.2,.09,.2,.08,.2,.07,.21,.07,.21,.25,1,.17,1.26,.11,1.44,.08,1.88Z"/>

    <path bind:this={earanchor2} fill='hsl(0, 0%, 88%)' class="cls-1" d="M23.7,22.99c-4.43,3.32-8.2,7.46-11.07,12.19l-.21-2.58-.16-2.21-.16-2.73-.1-2.39-.04-2.14v-1.95l.08-1.88,.11-1.44,.17-1.26,.25-1,.07-.21,.07-.21,.08-.2,.09-.2,.11-.2,.13-.17,.15-.18,.17-.14,.2-.12,.2-.09,.22-.05,.23-.01h.22l.22,.02,.2,.04,.4,.14,.18,.09s.67,.36,.81,.44l.03,.01,1.27,.98,.8,.75,.87,.93,.79,.93,.89,1.09,.76,.98,.72,.98,.53,.74,.69,1,.03,.05Z"/>

    <text
        font-size="{0.3 * 16}" x='50%' y='50%' 
        text-anchor='middle' dominant-baseline='middle'
        fill='hsl(0, 0%, 50%)'>
        Loading...
    </text>
</svg>
<svg id='pala-koceng' bind:this={el} class='build' >
</svg>
<!--
    <button class="snapshot" on:click={save}>
    <Fa icon={faCameraAlt} size='1.2x'/>
    </button>
-->

</div>


<style>
    .container {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        position: relative;
    }
    .snapshot {
        position: absolute;
        bottom: 0;
        right: 6%;
        color: var(--color-brand-dark-blue);
        padding:0.4rem;
        border-radius: 0.5rem;
        border:solid 1px hsl(0,0%,75%);
    }
    .build {
        margin:0 auto;
    }
    .example{
        display: block;
    }
    @media only screen /*xtrasmall*/
	and (max-width: 575px) {
        .container {
            width: 100vw;
        }
	}
	@media only screen /*small*/
	and (min-width: 576px)
	and (max-width: 767px) {
        .container {
            width: 100vw;
        }
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

	}
</style>

