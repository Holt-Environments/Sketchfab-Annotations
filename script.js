<!-- This script is necassary for sketchfab to work. -->
<script src="https://static.sketchfab.com/api/sketchfab-viewer-1.0.0.js"></script>

<!--
    This div serves as the anchor point for where the sketchfab
    viewer and popup will be generated.
-->
<div id="skfb-root" style="width: 100%; height: 100%; overflow: hidden;"></div>

<script>

    var sketch_id = "5160e16e98ed4c9081f9da21239a1c81";

	var useModals = true;

	var annotation_modals = [
		'#sec-63ca',
		'#sec-63ca',
		'#sec-63ca',
		'#sec-63ca'
	]

    var annotation_pages = [
        './page_1.html',	        /* Page for annotation 1 */
		'./page_1.html',	        /* Page for annotation 2 */
		'./page_1.html',	        /* Page for annotation 3 */
		'./page_1.html'	        	/* Page for annotation 4 */
    ];

    /* ======================================================================================================= */
    /* Establish the root for this script to propogate elements inside of. */
    const root = document.querySelector('#skfb-root');
    /* This div and iframe constitue the popup (initially hidden) and the sketchfab iframe to be used. */
    root.innerHTML = `
    <div id="skfb_pop">
        <div id="skfb_pop_content">
            <div id="skfb_pop_info">
            </div>
            <button id="skfb_pop_close_button">X</button> 
        </div>
	</div>
	<button id="modal_button" class="u-dialog-link" href="" style="display: none;"></button>
    <iframe src="" id="skfb_api_frame" frameborder="0" allow="autoplay; fullscreen; vr" mozallowfullscreen="true" webkitallowfullscreen="true" height="100%" width="100%"></iframe>
    `;
    /* Get sketchfab iframe and set version. */
    var iframe = document.getElementById( 'skfb_api_frame' );
    var version = '1.0.0';
    
	/* Create Sketchfab client API object using above info. */
    var client = new Sketchfab( version, iframe );
	
	/* Initialize the API. */
    client.init( sketch_id, {
      
	  /* API is ready to use. You can interact with the viewer using the api object passed to the success function. */
      success: function onSuccess( api ){
        
		/* Start the viewer immediately. */
		api.start();

		if(useModals){
			api.addEventListener('annotationFocus', function(info) {
				var button = document.getElementById("modal_button");
				console.log(annotation_modals[info]);
				button.setAttribute('href', annotation_modals[info]);
				button.click();
				console.log('clicked ' + info);
			});
			console.log('added modal event listener');
		} else {
			/* Create an event listener that catches any user annotation interactions. (assigning popup function)*/
			api.addEventListener('annotationFocus', function(info) {
				Popup(info, "skfb_pop");
			});
			console.log('added page event listener');
		}
      },
      /* If initialization fails, throw an error. */
      error: function onError() {
        console.log( 'Viewer error' );
      },
      /* Parameters determine initial state of sketchfab after loading. */
	  autostart: 1,
	  transparent: 1,
	  ui_controls: 0,
	  ui_infos: 0,
	  ui_inspector: 0,
	  ui_stop: 0,
	  ui_watermark: 0,
	  ui_watermark_link: 0
	} );
	
	var scrollbar_style = `
	<style>
		/* Let's get this party started */
		::-webkit-scrollbar {
			width: 5px;
		}
		/* Track */
		::-webkit-scrollbar-track {
			-webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3); 
			-webkit-border-radius: 5px;
			border-radius: 5px;
		}
		/* Handle */
		::-webkit-scrollbar-thumb {
			-webkit-border-radius: 5px;
			border-radius: 5px;
			background: rgba(0,0,0,0.5); 
			-webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.5); 
		}
		::-webkit-scrollbar-thumb:window-inactive {
			background: rgba(0,0,0,0.4); 
		}
	</style>`;
	
	var sketchfab_style = `
	<style>
		.tooltip-content{
			display: none !important;
			visibility: hidden !important;
		}
		.controls{
			display: none !important;
			visibility: hidden !important;
		}
		.titlebar{
			display: none !important;
			visibility: hidden !important;
		}
	</style>
	`;

    /* Shows elements with or without a fade effect */
	function Show(elements, isFade, time){
		document.documentElement.style.setProperty('--fade-speed', time + " !important");
		for(each of elements){
			if(isFade == 1){
				var fade_element = document.getElementById(each),
					computed_style = window.getComputedStyle(fade_element);
				if(computed_style.getPropertyValue('opacity') > 0){
					fade_element.style.opacity = 0;
				}

				fade_element.style.visibility = 'visible';

				setTimeout(function(){
					fade_element.classList.add('fade_in');
					fade_element.classList.remove('fade_out');
				}, 500);

			}else{
				var current_element = document.getElementById(each);
				current_element.style.visibility = "visible";
			}
		}
    }
	/* Hides elements with or without a fade effect */
    function Hide(elements, isFade, time){
		document.documentElement.style.setProperty('--fade-speed', time + " !important");
		for(each of elements){
			if(isFade == 1){
				var fade_element = document.getElementById(each),
					computed_style = window.getComputedStyle(fade_element);
				if(computed_style.getPropertyValue('opacity') < 1){
					fade_element.style.opacity = 1;
				}
				
				fade_element.classList.add('fade_out');
				fade_element.classList.remove('fade_in');

				setTimeout(function(){
					fade_element.style.visibility = "hidden";
				}, 500);
	        }else{
				var current_element = document.getElementById(each);
				current_element.style.visibility = "hidden";
			}
		}
	}

    function ClosePopup(popup_name){
		Hide([popup_name], 1, "0.5s");
		setTimeout(function(){
			var info = document.getElementById(popup_name.concat("_info"));
			while(info.hasChildNodes()){ info.removeChild(info.firstChild); }
		}, 500);
	}

    function Popup(index, popup_id)
	{		
        var info = document.getElementById(popup_id.concat("_info"));
		info.innerHTML = `<iframe class="skfb_pop_iframe" src="` + annotation_pages[index] + `" onload="ScrollbarInject()"></iframe>`;
		Show([popup_id], 1, "0.5s");
	}
	
	function SketchfabInject(){
		var skfb_iframe = document.getElementById('skfb_api_frame');
		var win = skfb_iframe.contentWindow;
		var doc = skfb_iframe.contentDocument? skfb_iframe.contentDocument: skfb_iframe.contentWindow.document;
        doc.body.innerHTML = doc.body.innerHTML + sketchfab_style;
    }
    
    function ScrollbarInject(){
		var popup_iframe = document.getElementsByClassName('skfb_pop_iframe')[0];
		var win = popup_iframe.contentWindow;
		var doc = popup_iframe.contentDocument? popup_iframe.contentDocument: popup_iframe.contentWindow.document;
        doc.body.innerHTML = doc.body.innerHTML + scrollbar_style;
    }

    document.getElementById("skfb_pop_close_button").addEventListener("click",  () => { ClosePopup("skfb_pop"); });
</script>

<style>
:root
{
	--fade-speed: 0.2s;	
}
#skfb_api_frame{
	display: block;
	position: absolute;
	left: 0;
	width: 100%;
	height: calc(100%);
}
#skfb_pop{
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	display: block;
	background: rgba(0, 0, 0, .7);
	z-index: 300;
	opacity: 0;
	visibility: hidden;
}
#skfb_pop_close_button{
	position: absolute;
	background-color: #00000069;
	border: none;
	color: white;
	border-radius: 30px;
	text-align: center;
	text-decoration: none;
	display: inline-block;
	width: 30px;
	font-size: 16px;
	font-family: Roboto, sans-serif;
	font-weight: 100;
	height: 30px;
	line-height: .01;
	cursor: pointer;	
	left: 100%;
    bottom: 100%;
}
#skfb_pop_content{
	position: absolute;
	left: 50%;
	top: 50%;
	transform: translate(-50%, -50%);
	width: 70%;
	height: 70%;
	border-radius: 5px;
	background: rgba(255, 255, 255, 255);
	color: black;
}
#skfb_pop_info{
	width: 100%;
    height: 100%;
  	overflow: hidden;
    font-weight: 100;
    font-family: Roboto,sans-serif;    
    font-size: .8rem;
    line-height: 1.5;
  	text-align: justify;
  	text-justify: inter-word;
    padding: 5px;
  	-webkit-scrollbar-width: thin;
}
.skfb_pop_iframe{
	scrollbar-width: thin;
	width: 100%;
	height: 100%;
	overflow: hidden;
	border: none;	
}
.skfb_pop_title
{
	text-align: center;
    color: rgba(0, 0, 0, .7);
  	text-transform: uppercase;
    font-weight: 100;
    font-family: Roboto,sans-serif;
    font-size: 1.5rem;
}
.fade_in{
    -webkit-transition: var(--fade-speed);
    -moz-transition: var(--fade-speed);
    -ms-transition: var(--fade-speed);
    -o-transition: var(--fade-speed);
    transition: var(--fade-speed);
    opacity: 1 !important;
}
.fade_out
{
  	-webkit-transition: var(--fade-speed);
  	-moz-transition: var(--fade-speed);
  	-ms-transition: var(--fade-speed);
  	-o-transition: var(--fade-speed);
  	transition: var(--fade-speed);
  	opacity: 0 !important;
}
</style>
