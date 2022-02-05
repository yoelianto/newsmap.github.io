var $slide1 = $('#slide-1');
var $slide2 = $('#slide-2');
var $slide3 = $('#slide-3');
var $slide4 = $('#slide-4');
var $slide5 = $('#slide-5');
var $slide6 = $('#slide-6');
var $slide7 = $('#slide-7');
var $slide8 = $('#slide-8');
var $slide9 = $('#slide-9');
var $slide10 = $('#slide-10');

var $slide = $('.slide')

var prev = document.getElementById('previous');
var next = document.getElementById('next');

var page = 1;

var main = d3.select("main");
var slidecontainer = main.select(".slide-container");
var slide = slidecontainer.selectAll('.slide');
var navbarcontainer = slidecontainer.select(".page-nav");
var navBar = navbarcontainer.selectAll(".page-nav-bar")

// NAVIGATION BAR /////////////////////////////////////////////////////////////

function navbar() {
    var windowH = $(window).height();
    var windowW = $(window).width();
    var windowW = $(window).width();
    var navW = $(".page-nav").width();

    if (windowH > windowW) { //vertical
        let endH = 0.9* windowH;
        let endW = endH/16*9;
        let marginSlide = (windowW-endW)/2;
        let topnav = ((windowH-endH)/2)+endH;
        if (windowW > endW) {
            console.log("vertical1")
            navbarcontainer
                .style("left", marginSlide +"px")
                .style("width", endW +"px")
                .style("top", topnav +"px");
        } else {
            console.log("vertical2")
            let endH = $(".slide").height();
            let topnav = ((windowH-endH)/2) + endH;
            navbarcontainer
                .style("left", "0px")
                .style("width", "100%")
                .style("top", topnav +"px");
        }
    } else if (windowH < windowW) { //horizontal
        let endW = 0.9*windowW;
        let endH = endW/16*9;
        let marginSlide = (windowW-endW)/2;
        let topnav = ((windowH-endH)/2)+endH;
        if (windowH > endH) {
            console.log('horizontal');
            navbarcontainer
                .style("left", marginSlide +"px")
                .style("width", endW +"px")
                .style("top", topnav +"px");

        } else {
            console.log('horizontal2')
            let slideW = $(".slide").width()
            let slideH = $(".slide").height()
            let endH = 0.9*windowH;
            let endW = endH/9*16;
            let marginSlide = (windowW-endW)/2;
            let topnav = ((windowH-endH)/2)+endH;
            navbarcontainer
                .style("left", marginSlide +"px")
                .style("width", endW +"px")
                .style("top", topnav + "px");

        }
    }
    
    
}

navbar()
$(window).resize(navbar)

///////////////////////////////////////////////////////////////////////////////

function page1() {
    $slide1.css('opacity', 1)
    $slide2.css('opacity', 0) 
}

function page2() {
    $slide1.css('opacity', 0)
    $slide2.css('opacity', 1) 
    $slide3.css('opacity', 0) 
}

function page3() {
    $slide2.css('opacity', 0)
    $slide3.css('opacity', 1) 
    $slide4.css('opacity', 0) 
}

function page4() {
    $slide3.css('opacity', 0)
    $slide4.css('opacity', 1) 
    $slide5.css('opacity', 0) 
}

function page5() {
    $slide4.css('opacity', 0)
    $slide5.css('opacity', 1) 
    $slide6.css('opacity', 0) 
}

function page6() {
    $slide5.css('opacity', 0)
    $slide6.css('opacity', 1) 
    $slide7.css('opacity', 0) 
}

function page7() {
    $slide6.css('opacity', 0)
    $slide7.css('opacity', 1) 
    $slide8.css('opacity', 0) 
}

function page8() {
    $slide7.css('opacity', 0)
    $slide8.css('opacity', 1) 
    $slide9.css('opacity', 0) 
}

function page9() {
    $slide8.css('opacity', 0)
    $slide9.css('opacity', 1) 
    $slide10.css('opacity', 0) 
}

function page10() {
    $slide10.css('opacity', 1)
    $slide9.css('opacity', 0) 
}

function nextPage() {
    if (page == 1) {
        console.log(page);
        page2()   
        page++;
    } else if (page == 2) {
        console.log(page);
        page3()
        page++;
    } else if (page == 3) {
        console.log(page);
        page4()
        page++;
    } else if (page == 4) {
        console.log(page);
        page5() 
        page++;
    } else if (page == 5) {
        console.log(page);
        page6()
        page++;
    } else if (page == 6) {
        console.log(page);
        page7()  
        page++;
    } else if (page == 7) {
        console.log(page);
        page8() 
        page++;
    } else if (page == 8) {
        console.log(page);
        page9() 
        page++;
    } else if (page == 9) {
        console.log(page);
        page10() 
        page++;
    } else if (page == 10) {
        console.log(page);
    }
}

function prevPage() {
    if (page == 10) {
        console.log(page)
        page9() 
        page--
    } else if (page == 9) {
        console.log(page)
        page8()
        page--
    } else if (page == 8) {
        console.log(page)
        page7() 
        page--
    } else if (page == 7) {
        console.log(page)
        page6()
        page--
    } else if (page == 6) {
        console.log(page)
        page5()
        page--
    } else if (page == 5) {
        console.log(page)
        page4()
        page--
    } else if (page == 4) {
        console.log(page)
        page3()
        page--
    } else if (page == 3) {
        console.log(page)
        page2()
        page--
    } else if (page == 2) {
        console.log(page)
        page1()
        page--
    } else if (page == 1) {
        console.log(page)
    }
}

next.addEventListener('click', nextPage) // klik/tap next

prev.addEventListener('click', prevPage) // klik/tap previous

// REPSONSIVE RESIZER /////////////////////////////////////////////////////////

function resize() {

    var windowH = $(window).height();
    var windowW = $(window).width();
    var slideH = $slide.height();
    var slideW = $slide.width();

    if (windowH > windowW) { //vertical
        let endH = 0.9* windowH;
        let endW = endH/16*9;
        if (windowW > endW) {
            //console.log("vertical1")
            let marginSlide = (windowW-endW)/2;
            let marginSlideTop = (windowH-endH)/2;
            slide
                .style("height", endH + "px")
                .style("width", endW + "px")
                .style("left", marginSlide + "px")
                .style("top", marginSlideTop + "px");
        } else {
            //console.log("vertical2")
            let endW = windowW;
            let endH = endW/9*16;
            let marginSlideTop = (windowH-endH)/2;
            slide
                .style("height", endH + "px")
                .style("width", endW + "px")
                .style("left", "0px")
                .style("top", marginSlideTop + "px");
        }
    } else if (windowH < windowW) { //horizontal
        let endW = 0.9*windowW;
        let endH = endW/16*9;
        let marginSlide = (windowW-endW)/2;
        let marginSlideTop = (windowH-endH)/2;
        if (windowH > endH) {
            //console.log('horizontal1');
            slide
                .style("width", endW + "px")
                .style("height", endH + "px")
                .style("left", marginSlide + "px")
                .style("top", marginSlideTop + "px");
        } else {
            //console.log('horizontal2')
            let endH = 0.90*windowH;
            let endW = endH/9*16;
            let marginSlide = (windowW-endW)/2;
            let marginSlideTop = (windowH-endH)/2;
            slide
                .style("width", endW + "px")
                .style("height", endH + "px")
                .style("left", marginSlide + "px")
                .style("top", marginSlideTop + "px");
        }
        
    }

  
    //console.log(windowH, windowW, slideH, slideW)
  
  }
  
  resize()
  $(window).resize(resize)
  
  ///////////////////////////////////////////////////////////////////////////////
