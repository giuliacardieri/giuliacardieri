var currentProject = null
	, listOfProjects = ['keepmeposted', 'codepen', 'dinokiki', 'floresciencia', 'reed', 'whysp', 'qualprofessor', 'pao', 'sanduiche', 'bauru', 'dinovr', 'dinoapp']
	, lang = 'en-us';


var menu = function menu() {
    if ($('.menu-btn').hasClass('menu-showing'))
        hideMenu();
    else
        showMenu();
}

var showMenu = function showMenu() {
    $('.menu-row').removeClass('hidden');
    $('.menu-row nav').animate({
        'right': '0vw'
    });
    $('.menu-btn').addClass('menu-showing');
}

var hideMenu = function hideMenu() {
    $('.menu-btn').removeClass('menu-showing');
    setTimeout(function(){
        $('.menu-row').removeClass('hidden');
    }, 500);
    $('.menu-row nav').animate({
        'right': '-150vw'
    })
}

// makes the slow scroll effect when clicked on the menu
var slowScroll = function slowScroll(element) {
    $('html, body').animate({
        scrollTop: $(element).offset().top
    }, 1000);
    window.location.hash = element;
};

// makes the slow scroll effect when a project circle is clicked - NEEDS TO FIX
var slowScrollProject = function slowScrollProject(element) {
	$('.work-content').scrollTop(0);
    $('.work-content').animate({
        scrollTop: $(element).offset().top - $('.work-content').offset().top
    }, 500);
};

// change the active color on the menu to the current element
var colorActive = function colorActive(element) {
	$('nav ul li a').removeClass('active');
	$("a[href^='" + element + "']").addClass('active');
};

var showResume = function showResume() {
	var size = checkSize();	

	// animations to show the resume
	$('.about-content').animate({
		'width': size,
	}, 500);

	setTimeout(function(){
		$('.about-content').removeClass('col-4').addClass('col-6');
	}, 500);

	if ($(window).width() > 1023)
		$('.about').animate({
			'width': '25%'
		}, 500).removeClass('col-4').addClass('col-2');

	setTimeout(function(){
		$('.about-close-btn').removeClass('hidden');
	}, 500);
};

var hideResume = function hideResume() {
	var size = checkSize(1);

	// animations to hide the resume
	$('.about-content').animate({
		'width': size,
	}, 500);

	setTimeout(function(){
		$('.about-content').removeClass('col-6').addClass('col-4');
	}, 500);

	if ($(window).width() > 1023)
		$('.about').animate({
			'width': '50%'
		}, 500).removeClass('col-2').addClass('col-4');
	
	$('.about-close-btn').addClass('hidden');
};

var checkSize = function checkSize(hide) {
	if ($(window).width() > 1023) 
		if (hide) 
			return '50%';
		else return '75%';
	else
		return '100%';
}

var showProject = function showProject() {
	var size = checkSize();

	// animations to show the project content and hide the others
	$('.work-content').animate({
		'width': size,
	}, 500);

	setTimeout(function(){
		$('.work-content').removeClass('col-4').addClass('col-6');
	}, 500);

	if ($(window).width() > 1023)
		$('.work').animate({
			'width': '25%'
		}, 500).removeClass('col-4').addClass('col-2');

	// fix problem with the title that was displayed as table when smaller
	$('.project-wrapper-row').css('display', 'block');

	// show the info from the current project
	$('.detail-project').find('.project-info').removeClass('hidden');

	// hide the project viewer
	$('.projects-bar-wrapper').addClass('hidden');

	setTimeout(function(){
		$('.detail-project').find('.close-btn').removeClass('hidden');
	}, 500);
};

var hideProject = function hideProject() {
	var size = checkSize(1);

	// animations to hide the project content and show the others
	$('.work-content').animate({
		'width': size,
	}, 500);

	setTimeout(function(){
		$('.work-content').removeClass('col-6').addClass('col-4');

		// show the project viewer
		$('.projects-bar-wrapper').removeClass('hidden');
	}, 500);

	if ($(window).width() > 1023)
		$('.work').animate({
			'width': '50%'
		}, 500).removeClass('col-2').addClass('col-4');

	$('.project-wrapper-row').css('display', 'table');

	// hide the info from the current project
	$('.detail-project').find('.project-info').addClass('hidden');
	
	$('.close-btn').addClass('hidden');

	$('.project-wrapper').removeClass('detail-project');

	$('.project-wrapper').removeClass('hidden');

	$('.project-btn').removeClass('hidden');
};

var goNext = function goNext() {
	var num = listOfProjects.indexOf(currentProject) + 1;
	currentProject = listOfProjects[num];
};

var goPrev = function goPrev() {
	var num = listOfProjects.indexOf(currentProject) - 1;
	currentProject = listOfProjects[num];
};

var hideProjectNext = function showProjectNext() {
	// hide the info from the current project
	$('.detail-project').find('.project-info').addClass('hidden');
	$('.close-btn').addClass('hidden');
	$('.project-wrapper').removeClass('detail-project');
	$('.project-wrapper').removeClass('hidden');
	$('.project-btn').removeClass('hidden');
};

$(function() {  
	if (lang === 'en-us')  
		$('.pt-br').addClass('hidden');
	
	// making the project pages when a project is clicked
	$('.project-btn').on('click', function() {

		// puts the work div on the top of the screen
		slowScroll('.work-content');

		currentProject = ($(this).attr('class')).split(' ')[1];

		// add the detail-project class to the clicked project to indicate it is the active one
		$('.project-wrapper').addClass('hidden');
		$(this).parents('.project-wrapper').addClass('detail-project').removeClass('hidden');
		$(this).addClass('hidden').parents('.detail-project').removeClass('hidden');
		showProject();
    });

    $('.view-btn').on('click', function() {
    	slowScroll('.about-content');
    	$('.basic-about-wrapper').addClass('hidden');
    	$('.resume-wrapper').removeClass('hidden');
    	showResume();
    });

    $('.next-btn').on('click', function(){
    	hideProjectNext();
    	goNext();
		$('.project-wrapper').addClass('hidden');
    	$('.project.' + currentProject).parent().parent().addClass('detail-project');
    	$('.detail-project').removeClass('hidden');
    	$('.project-btn.' + currentProject).addClass('hidden');
    	slowScroll('.work-content');
    	showProject();
    });

    $('.prev-btn').on('click', function(){
    	hideProjectNext();
    	goPrev();
		$('.project-wrapper').addClass('hidden');
    	$('.project.' + currentProject).parent().parent().addClass('detail-project');
    	$('.detail-project').removeClass('hidden');
    	$('.project-btn.' + currentProject).addClass('hidden');
    	slowScroll('.work-content');
    	showProject();
    });

    $('.close-btn').on('click', function(){
    	hideProject();
    });

    $('.about-close-btn').on('click', function(){
    	slowScroll('.about-content');
    	$('.basic-about-wrapper').removeClass('hidden');
    	$('.resume-wrapper').addClass('hidden');
    	hideResume();
    });

	// showing the menu
    $('.menu-btn').on('click', function() { 
        menu();
    });

    // if any element but the menu is clicked it is hidden
    $('.main-content').on('click', function() {
        if ($('.menu-btn').hasClass('menu-showing')) 
            hideMenu();
    });

    // the menu is hidden when the user clicks over it
    $('nav ul li a').on('click', function(){
    	hideMenu();
    });

    // adding the slowScroll when the arrow is clicked
    $('.arrow-wrapper').click(function(){
        slowScroll('#about');
    });

    // using the slowScroll and adding the active color when an item is clicked on the menu
    $('nav ul li a').on('click', function() {
    	var ele = $(this).attr('href');
    	slowScroll(ele);
    	colorActive(ele);
    });

    $('.menu-img-wrapper').on('click', function() {
    	if (lang === 'en-us')
    		lang = 'pt-br';
    	else
    		lang = 'en-us';
    	$('.en-us').toggleClass('hidden');
    	$('.pt-br').toggleClass('hidden');
    });

	// actions when scroll happens
    $(window).scroll(function(){
	    if (($('#about').offset().top <= $(window).scrollTop()) && ($('#work').offset().top) > $(window).scrollTop()) {
	        colorActive('#about');
    		$('.menu-btn').addClass('secondary-color');
    	} else if (($('#work').offset().top <= $(window).scrollTop())) {
	        colorActive('#work');
    		$('.menu-btn').removeClass('secondary-color');
    	} else if (($('#home').offset().top <= $(window).scrollTop()) && ($('#about').offset().top) > $(window).scrollTop()) {
	        colorActive('#home');
    		$('.menu-btn').removeClass('secondary-color');
    	}
    });

    // when project-circle is clicked it should go to the project
    $('.project-circle').on('click', function(){
    	$('.project-circle').removeClass('active-proj');
    	$(this).addClass('active-proj');
    	var projname = ($(this).attr('class').split(' '))[2];
    	currentProject = projname;
    	slowScrollProject('.project.' + projname);

   	});

	// action for projects when scroll happens
    $('.work-content').scroll(function(){
	    if (($('.project.keepmeposted').offset().top >= 1592) && ($('.project.keepmeposted').offset().top) < 1700) {
	        $('.project-circle').removeClass('active-proj');
	        $('.project-circle.keepmeposted').addClass('active-proj');
    	} else if (($('.project.dinokiki').offset().top >= 1592) && ($('.project.dinokiki').offset().top) < 1700) {
	        $('.project-circle').removeClass('active-proj');
	        $('.project-circle.dinokiki').addClass('active-proj');
    	} else if (($('.project.reed').offset().top >= 1592) && ($('.project.reed').offset().top) < 1700) {
	        $('.project-circle').removeClass('active-proj');
	        $('.project-circle.reed').addClass('active-proj');
    	} else if (($('.project.whysp').offset().top >= 1592) && ($('.project.whysp').offset().top) < 1700) {
	        $('.project-circle').removeClass('active-proj');
	        $('.project-circle.whysp').addClass('active-proj');
    	} else if (($('.project.qualprofessor').offset().top >= 1592) && ($('.project.qualprofessor').offset().top) < 1700) {
	        $('.project-circle').removeClass('active-proj');
	        $('.project-circle.qualprofessor').addClass('active-proj');
    	} else if (($('.project.pao').offset().top >= 1592) && ($('.project.pao').offset().top) < 1700) {
	        $('.project-circle').removeClass('active-proj');
	        $('.project-circle.pao').addClass('active-proj');
    	} else if (($('.project.sanduiche').offset().top >= 1592) && ($('.project.sanduiche').offset().top) < 1700) {
	        $('.project-circle').removeClass('active-proj');
	        $('.project-circle.sanduiche').addClass('active-proj');
    	} else if (($('.project.bauru').offset().top >= 1592) && ($('.project.bauru').offset().top) < 1700) {
	        $('.project-circle').removeClass('active-proj');
	        $('.project-circle.bauru').addClass('active-proj');
    	} else if (($('.project.dinovr').offset().top >= 1592) && ($('.project.dinovr').offset().top) < 1700) {
	        $('.project-circle').removeClass('active-proj');
	        $('.project-circle.dinovr').addClass('active-proj');
    	} else if (($('.project.codepen').offset().top >= 1592) && ($('.project.codepen').offset().top) < 1700) {
	        $('.project-circle').removeClass('active-proj');
	        $('.project-circle.codepen').addClass('active-proj');
    	} else if (($('.project.floresciencia').offset().top >= 1592) && ($('.project.floresciencia').offset().top) < 1700) {
	        $('.project-circle').removeClass('active-proj');
	        $('.project-circle.floresciencia').addClass('active-proj');
    	} else if (($('.project.dinoapp').offset().top >= 1592) && ($('.project.dinoapp').offset().top) < 1700) {
	        $('.project-circle').removeClass('active-proj');
	        $('.project-circle.dinoapp').addClass('active-proj');
    	}  
    });
    

    if ($(window).width() < 1024) {
		$('.work').insertBefore($('.work-content'));
	    // show/hide menu using swipe on mobile devices
	    $(window).on('swipeleft', function() {
	        menu();
	    });
	    $(window).on('swiperight', function() {
	        menu();
	    });
	}
});