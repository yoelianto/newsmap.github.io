<script>
    import * as d3 from 'd3'
    import { voronoiMapSimulation } from 'd3-voronoi-map'
    import { onMount } from 'svelte'
    import * as ihttp from "./constants/initialHttp";
    import { get } from "./api";
    import { truncText, stringToDom } from './helper';

    let circleanchor, catanchor, scale, circlelen, catlen,
        pointcircle = [],
        pointcat = []
    let el, pointsArray, catCoordinate;
    let x = [],
        y = []
    let minX, minY, maxX, maxY;

    export let margin;

    let width = 375,
        height = width
    
    const fetchData = (async () => {
        const result = await get(ihttp.URI_LAST_TOPIC, { size: 18 });
        // console.log(result.data)
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

        let num = 240
        circlelen = circleanchor.getTotalLength()
        catlen = catanchor.getTotalLength()
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

        // console.log(minX, minY, maxX, maxY)

        scale = height / (maxY-minY)

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

        console.log(polygons)

        let container = d3.select(el)
        .attr('width', width)
        .attr('height', height)  

        let cells = container
        .append('g')
        .classed('cells', true)

        let cathead = container
        .append('g')
        .classed('cat', true)

        let text = container
        .append('g')
        .classed('labels', true)

        cells
        .selectAll('.voronoi')
        .data(polygons)
        .enter()
        .append('path')
        .classed('voronoi', true)
        .attr("d", (d) => {
            return "M" + d.join(",") + "z";
            })
        .style("stroke", "lightblue")
        .style("stroke-width", "4px")
        .style("stroke-linejoin", "round")
        .style("fill", (d) => {
                return d.site.originalObject.data.originalData.color;
            })
        .style('z-index', 10)

        cathead
        .append('path')
        .classed('cathead', true)
        .attr('d', "M" + scaledcat.join(",") + "z")
        .style("fill", "lightblue")

        text
        .selectAll('.label')
        .data(polygons)
        .enter()
        .append('text')
        .classed('label', true)
        .text((d) => {
            if (d.site.originalObject.data.originalData.weight >= 2) {
                return d.site.originalObject.data.originalData.keywords[0]
            }
        })
        .style('fill', 'white')
        .attr('text-anchor', 'middle')
        .attr('x', (d) => {
            return d.site.x
        })
        .attr('y', (d) => {
            return d.site.y
        })
        .style('font-size', (d) => {
            if (d.site.originalObject.data.originalData.weight == 4) {
                return '2rem'
            } else if (d.site.originalObject.data.originalData.weight == 3) {
                return '1rem'
            } else {
                return '0.5rem'
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

        text
        .selectAll('.secondarylabel')
        .data(polygons)
        .enter()
        .append('text')
        .classed('secondarylabel', true)
        .text((d) => {
            if (d.site.originalObject.data.originalData.weight >= 2) {
                return d.site.originalObject.data.originalData.keywords[1]
            }
        })
        .style('fill', 'white')
        .attr('text-anchor', 'middle')
        .attr('x', (d) => {
            return d.site.x
        })
        .attr('y', (d) => {
            return d.site.y + (d.site.originalObject.data.originalData.weight * 5)
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

        text
        .selectAll('.tersierlabel')
        .data(polygons)
        .enter()
        .append('text')
        .classed('tersierlabel', true)
        .text((d) => {
            if (d.site.originalObject.data.originalData.weight >= 2) {
                return d.site.originalObject.data.originalData.keywords[2]
            }
        })
        .style('fill', 'white')
        .attr('text-anchor', 'middle')
        .attr('x', (d) => {
            return d.site.x
        })
        .attr('y', (d) => {
            return d.site.y + (d.site.originalObject.data.originalData.weight * 5 * 1.7)
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

        cells.raise()
        cathead.lower()
        text.raise()

    })    

</script>

<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" class='example' fill='none'>
    <path bind:this={catanchor} class="cls-1" d="M94.6,14.335v3.81l-.09,4.17-.19,4.65-.31,5.31-.3,4.3-.45,5.47-.54,5.6,.22,1.07,.59,4.55,.08,4.58-.4,4.54-.83,4.46-1.31,4.34-1.76,4.16-2.16,3.95-2.53,3.7-2.93,3.38-3.25,3.05-3.53,2.71-3.76,2.35-3.98,1.93-4.14,1.53-4.27,1.11-4.36,.69-4.38,.26-4.38-.26-4.36-.69-4.26-1.11-4.15-1.53-3.98-1.93-3.76-2.35-3.52-2.71-3.26-3.05-2.92-3.38-2.54-3.7-2.16-3.95-1.75-4.16-1.31-4.34-.84-4.46-.4-4.54,.08-4.58,.6-4.55,.21-1.07-.53-5.6-.45-5.47-.31-4.3-.31-5.31-.19-4.65-.08-4.17v-3.81l.15-3.65,.22-2.8,.32-2.46,.5-1.95,.14-.41,.14-.4,.15-.4,.18-.38,.2-.39,.25-.33,.3-.35,.34-.28,.37-.23,.41-.17,.43-.11,.43-.02h.43l.42,.05,.41,.08,.39,.12,.38,.14,.36,.17s1.29,.71,1.58,.86c.03,.02,.05,.03,.05,.03l2.48,1.9,1.56,1.47,1.68,1.81,1.54,1.8,1.73,2.13,1.47,1.91,1.43,1.91,1.02,1.43,1.34,1.95,1.1,1.67,2.98-1.38,4.28-1.57,4.39-1.2,4.49-.76,4.53-.29,4.53,.29,4.5,.76,4.39,1.2,4.27,1.57,2.98,1.38,1.11-1.67,1.34-1.95,1.02-1.43,1.42-1.91,1.48-1.91,1.72-2.13,1.55-1.8,1.68-1.81,1.56-1.47,2.47-1.9,.06-.03c.28-.15,1.58-.86,1.58-.86l.36-.17,.38-.14,.39-.12,.4-.08,.42-.05h.43l.44,.02,.43,.11,.4,.17,.38,.23,.34,.28,.29,.35,.26,.33,.2,.39,.18,.38,.15,.4,.14,.4,.13,.41,.5,1.95,.33,2.46,.22,2.8,.15,3.65Z"/>
    <ellipse bind:this={circleanchor} class="cls-1" cx="50.025" cy="57.118" rx="40.737" ry="40.125"/>
</svg>

<svg bind:this={el} style="margin-top:{margin}px" class='build'>
</svg>

<style>
    .build {
        margin:0 auto;
    }
    .example{
        position: absolute;
    }
</style>

