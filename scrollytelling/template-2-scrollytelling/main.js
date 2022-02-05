// using d3 for convenience
var main = d3.select("main");
var scrolly = main.select("#scrolly");
var figure = scrolly.select("figure");
var article = scrolly.select("article");
var step = article.selectAll(".step");

// initialize the scrollama
var scroller = scrollama();

// generic window resize listener event
function handleResize() {
  // 1. update height of step elements
  var stepH = Math.floor(window.innerHeight);
  step.style("height", stepH + "px");

  var figureHeight = window.innerHeight * 0.9;
  var figureMarginTop = (window.innerHeight - figureHeight) / 2;

  figure
    .style("height", figureHeight + "px")
    .style("top", figureMarginTop + "px");

  // 3. tell scrollama to update new element dimensions
  scroller.resize();
}

// scrollama event handlers
function handleStepEnter(response) {
  //console.log(response);
  // response = { element, direction, index }

  // add color to current step only
  step.classed("is-active", function(d, i) {
    return i === response.index;
  });

  // update graphic based on step

  figure.select("p").text(response.index)
  let a = response.index
  console.log(a)
  if (a == 0) {
      figure.style("background-color", "#8a8a8a") // (a-0) kondisi pre-slide
  } else if (a == 1) {
    figure.style("background-color", "lightyellow") // (a-1) kondisi slide pertama, keterangan baru muncul, baiknya konten disamakan dengan a-0
  } else if (a == 2) {
    figure.style("background-color", "lightgreen") // (a-2) kondisi slide kedua, berubah sesuai cerita
  } else if (a == 3) {
    figure.style("background-color", "indianred") // (a-3) kondisi slide terakhir, berubah sesuai cerita (dan seterusnya sesuai jumlah slide)
}
}

/* Tidak perlu dipakai
function setupStickyfill() {
  d3.selectAll(".sticky").each(function() {
    Stickyfill.add(this);
  });
}
*/

function init() {
  //setupStickyfill(); Tidak perlu dipakai

  // 1. force a resize on load to ensure proper dimensions are sent to scrollama
  handleResize();

  // 2. setup the scroller passing options
  // 		this will also initialize trigger observations
  // 3. bind scrollama event handlers (this can be chained like below)
  scroller
    .setup({
      step: "#scrolly article .step",
      offset: 0.8,
      debug: false
    })
    .onStepEnter(handleStepEnter);

  // setup resize event
  window.addEventListener("resize", handleResize);
}

// kick things off
init();