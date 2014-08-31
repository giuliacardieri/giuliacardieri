var before = 'about';
var pos = 0;
var opacity = 0;
var b = document.documentElement;

b.setAttribute('data-useragent',  navigator.userAgent);
b.setAttribute('data-platform', navigator.platform );

function changeID (_eleNew) {
    document.getElementById(before).style.display = 'none';
    document.getElementById(_eleNew).style.display = 'block';
    before = _eleNew;
}

function hover (_ele) {
    document.getElementById(_ele).style.borderBottomColor = color;
    document.getElementById(_ele).style.borderBottomStyle = 'solid';
    document.getElementById(_ele).style.borderBottomWidth = '2px';   
}

function out (_ele) {
    document.getElementById(_ele).style.borderBottom = "";
}

function validate()
{
  	  var errorMsg = "";
        
  	  if (document.getElementsByName( "name" )[0].value.length === 0)
  	  {
  	  	errorMsg += " Your name must have at least one character </br>"; 
  	  }

  	  if (!document.getElementsByName( "email" )[0].value.match(/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/))
  	  {
  	  	errorMsg += " The correct format for Email is xxxxx@xxx.xx <br/>";
  	  }
    
      if (document.getElementsByTagName( "textarea" )[0].value.length === 0)
  	  {
  	  	errorMsg += " You should write something on the message! <br/>";
  	  }
  	  
  	  if (errorMsg)
  	  {
  	    errorMsg = "ERROR!<br/>" + errorMsg;
  	    document.getElementById( "error-msg" ).innerHTML = errorMsg;
        document.getElementById( "error-msg" ).style.display = "block";
  	    return false;
  	  }
  	  else 
  	  { 
  	    return true;
  	  }
  	}

function ProjImg(num)
{
    var val = parseInt(num);
    document.getElementsByClassName( "hover" )[val].style.display = 'block';
    document.getElementsByClassName( "hover" )[val].style.backgroundImage = 'url(assets/images/' + val + '.jpg)';
    document.getElementsByClassName( "ProjImg" )[val].style.display = 'none';
}

function ProjImgOut(num)
{
    var val = parseInt(num);
    document.getElementsByClassName( "hover" )[val].style.display = 'none';
    document.getElementsByClassName( "ProjImg" )[val].style.display = 'block';
}

function FadeOut()
{
    
    if (opacity <=1.06)
    {   console.log("oi");
        document.getElementsByTagName("h1")[0].style.opacity = opacity;
    
     
        setTimeout( function(){
	     FadeOut() 
	     },  50);
         opacity = opacity + 0.1;
    }
    else
    {
        document.getElementsByTagName("h1")[0].style.opacity = 1;
        opacity = 0;
    }
}



