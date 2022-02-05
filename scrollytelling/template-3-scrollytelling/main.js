// using d3 for convenience ///////////////////////////////////////////////////
var main = d3.select("main");
var scrolly = main.select("#scrolly");
var figure = scrolly.select("figure");
var article = scrolly.select("article");
var triggerStep = article.selectAll('.step');

var stepH = Math.floor(window.innerHeight);
var duration = stepH * triggerStep._groups[0].length;

//function scrollWindow() {
//  $(window).on('scroll', () => {
//    console.log(window.scrollY)
//  })
//}

//scrollWindow()

// REPSONSIVE RESIZER /////////////////////////////////////////////////////////

function resize() {
  var scroller = scrollama()
  console.log("resize")
  var stepH = $(window).height();
  var stepWidth = $(".step").width()
  var figWidth = $("#scrolly").width()
  var stepW = (figWidth-stepWidth)/2
  //console.log(figWidth, stepWidth, stepW)

  console.log(stepH, stepW)

  triggerStep.style("height", stepH + "px")
  triggerStep.style("left", stepW + "px")
  

  var figureHeight = $(window).height();
  var figureWidth = $(window).width();
  var containerWidth = $(".container").width()
  var figureMarginLeft = (figureWidth-containerWidth)/2

  console.log(figureHeight, figureWidth, containerWidth, figureMarginLeft)

  figure
    .style("height", figureHeight + "px")
    .style("width", figureWidth +"px")
    .style("left", -figureMarginLeft +"px")
    ;

  scroller.resize()
}

resize()
$(window).resize(resize)

///////////////////////////////////////////////////////////////////////////////


//SCROLL MAGIC ////////////////////////////////////////////////////////////////

var controller = new ScrollMagic.Controller();

// FUNCTION UNTUK GANTI DATA VIZ/TRANSISI KONTEN

function updateDataviz0 (e) {
  console.log("change0")
  $(".graph").css("background-color", "#8a8a8a")
}

function updateDataviz1 (e) {
  console.log("change1")
  $(".graph").css("background-color", "#666")
}

function updateDataviz2 (e) {
  console.log("change2")
  $(".graph").css("background-color", "#444")
}

function updateDataviz3 (e) {
  console.log("change3")
  $(".graph").css("background-color", "#222")
}

// SCENE SCROLL MAGIC SEBAGAI TRIGGER FUNCTION DI ATAS

var scene = new ScrollMagic.Scene({
  triggerElement: "#scrolly",
  triggerHook: "onLeave",
  duration: duration
})
  .setPin(".graph",{spacerClass: "spacer"})
  .addTo(controller);

var sceneText1 = new ScrollMagic.Scene({
  triggerElement: "#st-1",
  triggerHook: "onEnter",
  duration: stepH
})
  .on("enter", updateDataviz0)
  .addTo(controller);

var sceneText1 = new ScrollMagic.Scene({
  triggerElement: "#st-1",
  triggerHook: "onLeave",
  duration: stepH
})
  .on("enter", updateDataviz1)
  .addTo(controller);

var sceneText2 = new ScrollMagic.Scene({
  triggerElement: "#st-2",
  triggerHook: "onLeave",
  duration: stepH
})
  .on("enter", updateDataviz2)
  .addTo(controller);

var sceneText1 = new ScrollMagic.Scene({
  triggerElement: "#st-3",
  triggerHook: "onLeave",
  duration: stepH
})
  .on("enter", updateDataviz3)
  .addTo(controller);



  

