import "./styles/main.scss";

let bgExit;
let exitURL = 'https://www.google.se/';
let urlParams = '';

// Confirm if Creative is visible & initialize 
const enablerInitHandler = () => {
	if(Enabler.isVisible()) {
		startAd();
	} else {
		Enabler.addEventListener(studio.events.StudioEvent.VISIBLE, startAd);
	} 
};

window.onload = () => {
	if (Enabler.isInitialized()) {
	  	enablerInitHandler();
	} else {
	  	Enabler.addEventListener(studio.events.StudioEvent.INIT, enablerInitHandler);
	}
};	

const bgExitHandler = () => {	
	Enabler.exitOverride("SampleCompany", exitURL); 
};

const addListeners = () => {
	bgExit.addEventListener('touchEnd', bgExitHandler, false);
	bgExit.addEventListener('click', bgExitHandler, false);
};

const loadImg = (el, src) => {
	if(src !== ''){
		el.src = src;
		el.addEventListener('load', function() {
			el.classList.add('show');
		});
	}
}

// Start ad
const startAd = () => {
	/* Setup elements */
	bgExit = document.getElementById('background-exit');

	/* Setup data */
	const data = dynamicContent.SampleElement[0];

	/* Setup url and url params */
	urlParams = '?productId=' + data._id + '?campaign_' + data.campaign;
	exitURL = data.landing_url.Url + urlParams;

	/* Add listeners */
	addListeners();

	/*** setup content images ***/
	if(data.campaign_image_background.Url){
		loadImg(document.getElementById('background-image'), data.campaign_image_background.Url);
	}

	loadImg(document.getElementById('product-image'), data.image_url.Url);

	/*** setup content texts ***/
	// document.getElementById('product-title').innerHTML = data.title;
	// document.getElementById('btn-text').innerHTML = data.cta;

	// ANIMATIONS
	let duration = 8500;
	let loops = 3;
	let count = 0;

	const initAnimation = () => {
    	let elems = document.querySelectorAll('.animated');
		[].forEach.call(elems, function(el) {
			void el.offsetWidth;
		    el.classList.add("story");
		});

		setTimeout(function() {
	      	loop();
	    }, duration);
	}

	const loop = () => {
		count++;

		if(count >= loops){
			var elems = document.querySelectorAll('.animated');
			resetAnimation();

			[].forEach.call(elems, function(el) {
			    void el.offsetWidth;
			    el.classList.add("finalstory");
			});
		} else {
			count++;
			resetAnimation();
			initAnimation();
		}
	}

	const resetAnimation = () => {
		let elems = document.querySelectorAll('.animated');
		[].forEach.call(elems, function(el) {
			el.classList.remove('story');
			void el.offsetWidth;
		});
	}

	/* hide loader */
	var elems = document.querySelectorAll('.onload');
	[].forEach.call(elems, function(el) {
		void el.offsetWidth;
		el.classList.add("init");
	});

	/* start animation after loading images - put last in file */
	let introImg = document.getElementById('introduction-image');
	if(introImg.src = data.campaign_image_intro.Url){
		introImg.addEventListener('load', function() {
			introImg.classList.add('show');
			initAnimation();
		});
	} else {
		initAnimation();
	}
};