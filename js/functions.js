var ele = 0;
var previous = "home";
var unfill = true;
var slowFill = false;
var scrollPortfolio;
var open = true;

function slowScroll(element){
    var distance =  $(element).offset().top;
    if (element == "#portfolio")
        distance = scrollPortfolio;
    $('html, body').animate({
        scrollTop: distance
    }, 1000);
    window.location.hash = element;
    slowFill = true;
}

function percentageFill(){
    if ($("div").hasClass("html"))
        fill("html", "75%");
    if ($("div").hasClass("css"))
        fill("css", "75%");
    if ($("div").hasClass("js"))
        fill("js", "62%");
    if ($("div").hasClass("java"))
        fill("java", "50%");
    if ($("div").hasClass("sql"))
        fill("sql", "50%");
    if ($("div").hasClass("photoshop"))
        fill("photoshop", "45%");
    if ($("div").hasClass("python"))
        fill("python", "40%");
    if ($("div").hasClass("php"))
        fill("php", "40%");
    slowFill = false;
}

function percentageUnfill(){
    if (!unfill){
        $(".fill.html").css("height", "0");
        $(".fill.css").css("height", "0");
        $(".fill.js").css("height", "0");
        $(".fill.java").css("height", "0");
        $(".fill.sql").css("height", "0");
        $(".fill.photoshop").css("height", "0");
        $(".fill.python").css("height", "0");
        $(".fill.php").css("height", "0");
        unfill = true;
    }
}

function fill(_ele,percentage){
    var time;
    if (slowFill)
        time = 2500; 
    else 
        time = 1000;
    $(".fill."+_ele).animate({ height: percentage }, time);
    unfill = false;
}

// the font color of the menu changes to the parameter
function menuColor(color){
        $("#menu").css("color", color);
}

function showMenu() {
    $(".menu").animate({width: 'toggle'}); 
    if ($("#menu").hasClass("hidden")) {
        $("#menu").animate({"right": "+=228px"}).removeClass("hidden");
        $(".content").animate({"padding-right": "130px"});
    } 
    else {
        $(".content").animate({"padding-right": "0"});
        $("#menu").animate({"right": "-=228px"}).addClass("hidden");
    }
}

function colorActive(section){
    if (section!=previous) {
        $("."+section).addClass("active");
        $("."+previous).removeClass("active");
        previous = section; 
    }
}

function hoverProjects(element){
    $(element+" .project-text").css("z-index", '0'); 
    $(element+" .project-text").stop(true, false).animate({left: '30px'});  
    $(element+" .project-hover").stop(true, false).animate({width: 'toggle'}); 
}

function outHoverProjects(element){     
    $(element+" .project-text").stop(true, false).animate({left: '0px'});
    $(element+" .project-text").css("z-index", '-1'); 
    $(element+" .project-hover").stop(true, false).animate({width: 'toggle'}); 
}

function theDinoIsAlive(){
    interval2 = setInterval(function(){
        if (open){
            $(".projects.dinokiki-proj img").attr("src", "images/dinokiki-p2.png");
            open = false;
        }
        else{
            open = true;
            $(".projects.dinokiki-proj img").attr("src", "images/dinokiki-p1.png");
        }
    }, 5000);
}

function defineMenuColor(){
    var color;
    switch (location.pathname.substring(location.pathname.lastIndexOf("/") + 1)){
        case "dinokiki.html": {color= "#5A7BD1"; break;}
        case "whysp.html": {color= "#BA1A1E"; break;}
        case "marina.html": {color= "#852A4A"; break;}
        case "giulia.html": {color= "#602a6d"; break;}
        case "dinokikipt.html": {color= "#5A7BD1"; break;}
        case "whysppt.html": {color= "#BA1A1E"; break;}
        case "marinapt.html": {color= "#852A4A"; break;}
        case "giuliapt.html": {color= "#602a6d"; break;}
    }
    return color;
}

function macAnimation(element, path, num_imgs, time){
    interval = setInterval(function(){
            ele++;
            $(element).attr("src", "images/"+path+ele+".png");
            if (ele == num_imgs)
                ele = 0;
        }, time);
}

$(function(){
    
    if (location.pathname.substring(location.pathname.lastIndexOf("/") + 1) == 'index.html' || location.pathname.substring(location.pathname.lastIndexOf("/") + 1) == 'indexpt.html' || location.pathname.substring(location.pathname.lastIndexOf("/") + 1) == ''){
        
        macAnimation("#mac", "", 12, 500);
        
        // the height of the portfolio changes when the menu opens and the about section gets more height. 
        // currently this is a bug with a not 100% fixed solution.
        scrollPortfolio = $("#portfolio").offset().top;
        
        // actions when scroll happens
        $(window).scroll(function(){
            if (($("#about").offset().top <= $(window).scrollTop()) && ($("#portfolio").offset().top) > $(window).scrollTop()){
                colorActive("about");
                if (unfill == true)
                    percentageFill();
                menuColor("#602a6d");
            }
            else if (($("#portfolio").offset().top <= $(window).scrollTop())){
                if (($("#contact").offset().top-500 <= $(window).scrollTop()))
                    colorActive("contact");
                else
                    colorActive("portfolio");
                percentageUnfill();
                menuColor("#fff");
            }
            else if (($("#home").offset().top <= $(window).scrollTop()) && ($("#about").offset().top) > $(window).scrollTop()){
                colorActive("home");
                percentageUnfill();
                menuColor("#fff");
            }
            else 
                menuColor("#fff");
        });

        if ($(window).width() > 1024){
            $(".dinokiki").hover(function(){hoverProjects(".dinokiki");},function(){outHoverProjects(".dinokiki");});
            $(".whysp").hover(function(){hoverProjects(".whysp");},function(){outHoverProjects(".whysp");});
            $(".marina").hover(function(){hoverProjects(".marina");},function(){outHoverProjects(".marina");});
            $(".giulia").hover(function(){hoverProjects(".giulia");},function(){outHoverProjects(".giulia");});
        }
        
    }
    else {
        $(window).scroll(function(){
            var color;
            if (($("#project-welcome").offset().top <= $(window).scrollTop()) && ($("#project-details").offset().top) > $(window).scrollTop())
                menuColor("#fff");
            else if (($("#project-details").offset().top <= $(window).scrollTop()) && ($("#project-history").offset().top) > $(window).scrollTop()){
                color = defineMenuColor();
                menuColor(color);
            }
            else if (($("#project-history").offset().top <= $(window).scrollTop()) && ($("#project-images").offset().top) > $(window).scrollTop())                                      menuColor("#fff");
            else if (($("#project-images").offset().top <= $(window).scrollTop()) && ($("#project-extra").offset().top) > $(window).scrollTop()){
                color = defineMenuColor();
                menuColor(color);
            }
            else if (($("#project-images").offset().top <= $(window).scrollTop()) && ($("#contact").offset().top) > $(window).scrollTop())
                menuColor("#fff");
        });
        if (location.pathname.substring(location.pathname.lastIndexOf("/") + 1) == 'dinokiki.html' || location.pathname.substring(location.pathname.lastIndexOf("/") + 1) == 'dinokikipt.html')
            theDinoIsAlive();
        else if (location.pathname.substring(location.pathname.lastIndexOf("/") + 1) == 'giulia.html' || location.pathname.substring(location.pathname.lastIndexOf("/") + 1) == 'giuliapt.html')
            macAnimation(".mac-proj", "giulia-bg", 3, 1500);
    }
    
    // menu action with swipe
    $(window).swipeleft(function() {
        if ($("#menu").hasClass("hidden"))
            showMenu();
    });
    $(window).swiperight(function() {
        if (!$("#menu").hasClass("hidden"))
            showMenu();
    });
    
    // arrow down on the home section
    $(".arrow").click(function(){
        slowScroll("#about");
    });
    
    $(".dinokiki-link").click(function(){
        window.location.href="dinokiki.html";
    });
    
    $(".whysp-link").click(function(){
        window.location.href="whysp.html";
    });
    
    $(".marina-link").click(function(){
        window.location.href="marina.html";
    });
    
    $(".giulia-link").click(function(){
        window.location.href="giulia.html";
    });
    
    $(".dinokiki-link-pt").click(function(){
        window.location.href="dinokikipt.html";
    });
    
    $(".whysp-link-pt").click(function(){
        window.location.href="whysppt.html";
    });
    
    $(".marina-link-pt").click(function(){
        window.location.href="marinapt.html";
    });
    
    $(".giulia-link-pt").click(function(){
        window.location.href="giuliapt.html";
    });
    
    // showing or hiding the menu
    $("#menu").click(function(){ 
        showMenu();
    });
    
    // changing the active item on menu on click
    $(".menu ul li a").click(function(){ 
        var sectionClass = $(this).attr("class");
        var onlyClass = sectionClass.split(" ");
        colorActive(onlyClass[0]);
        showMenu();
        if (onlyClass[0] != "language")
            slowScroll("#"+onlyClass[0]);
    });
    
});

