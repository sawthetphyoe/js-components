// DOM elements
const carousel = document.querySelector(".carousel");
const slider = document.querySelector(".slider");
const slides = document.querySelectorAll(".slide");
const btnLeft = document.querySelector(".carousel__btn--left");
const btnRight = document.querySelector(".carousel__btn--right");

//////////// Default values and customization ////////////
// Transition second(s)
let transSec = slider.dataset.transSec;
!transSec && (transSec = 0.5);

// For AUTOMATIC slide changes
const autoSlide = slider.classList.contains("slider--autoslide") ? true : false;
let autoSlideInterval = slider.dataset.interval * 1000;
!autoSlideInterval && (autoSlideInterval = 5000);

// For DOTS
const addDots = slider.classList.contains("slider--dots") ? true : false;
let dotColorActive = slider.dataset.dotColorActive;
let dotColor = slider.dataset.dotColor;
let dotSize = slider.dataset.dotSize;
let dotPosition = slider.dataset.dotPosition;
let dotGap = slider.dataset.dotGap;

!dotColorActive && (dotColorActive = "#222");
!dotColor && (dotColor = "#676767");
!dotSize && (dotSize = "7px");
!dotPosition && (dotPosition = "3%");
!dotGap && (dotGap = "8px");
//////////// Default values and customization END /////////////

// Global variables
const numberOfSlides = slides.length;
let direction = -1; //default is next slide (go to right)
let curSlide = 1;
let slideDif = 1;
let targetSlide;
let autoEffect;
let activateDot;
let transitionEnd = true;

/////////////////// Initial Condition ///////////////////
// for carousel
carousel.style.display = "flex";
carousel.style.justifyContent = "flex-start";
carousel.style.overflow = "hidden";

// for slider
slider.style.width = `${100 * numberOfSlides}%`;
slider.style.height = "100%";
slider.style.display = "flex";
slider.style.flexShrink = 0;

// for slides
slides.forEach(function (s, i) {
	s.style.flex = 1;
	s.dataset.slideNumber = i + 1;
});

/////////////////// Functions ///////////////////
const transition = (sec) => (slider.style.transition = `transform ${sec}s`);

const slideEffect = function (dir, amt) {
	transition(transSec);
	slider.style.transform = `translate(${(dir * amt * 100) / numberOfSlides}%)`;
};

const goToRight = function (sDif) {
	if (direction === 1) {
		slider.prepend(slider.lastElementChild);
		direction = -1;
	}
	carousel.style.justifyContent = "flex-start";
	slideEffect(direction, sDif);
	transitionEnd = false;
};

const goToLeft = function (sDif) {
	if (direction === -1) {
		slider.appendChild(slider.firstElementChild);
		direction = 1;
	}
	carousel.style.justifyContent = "flex-end";
	slideEffect(direction, sDif);
	transitionEnd = false;
};

/////////////////// Adding dots and dot-click event handler ///////////////////
if (addDots) {
	const dotContainerStyle = {
		position: "absolute",
		bottom: dotPosition,
		left: "50%",
		transform: "translateX(-50%)",
		zIndex: "99",
		display: "flex",
		gap: dotGap,
	};

	const dotStyle = {
		width: dotSize,
		height: dotSize,
		backgroundColor: dotColor,
		border: "none",
		borderRadius: "50%",
		cursor: "pointer",
	};

	const dotContainer = document.createElement("div");
	slides.forEach(function (_, i) {
		dotContainer.insertAdjacentHTML(
			"beforeend",
			`<button class="dot" data-slide-num= "${i + 1}"></button>`
		);
	});

	for (p in dotContainerStyle) {
		dotContainer.style[p] = `${dotContainerStyle[p]}`;
	}

	const dots = dotContainer.querySelectorAll(".dot");
	for (p in dotStyle) {
		dots.forEach(function (el) {
			el.style[p] = `${dotStyle[p]}`;
		});
	}

	carousel.style.position = "relative";
	carousel.appendChild(dotContainer);

	activateDot = function (slide) {
		dots.forEach(function (el, i) {
			el.style.backgroundColor = slide === i + 1 ? dotColorActive : dotColor;
		});
	};
	activateDot(1);

	////////// Event handler for dot clicks  //////////
	dotContainer.addEventListener("click", function (e) {
		if (!transitionEnd) return;
		if (e.target.classList.contains("dot")) {
			targetSlide = Number(e.target.dataset.slideNum);
			if (targetSlide !== curSlide) {
				if (targetSlide > curSlide) {
					slideDif = targetSlide - curSlide;
					goToRight(slideDif);
				} else {
					slideDif = curSlide - targetSlide;
					goToLeft(slideDif);
				}
			}
		}
	});
}

/////////////////// Event handlers for button clicks ///////////////////
btnRight.addEventListener("click", function () {
	if (!transitionEnd) return;
	goToRight(slideDif);
});

btnLeft.addEventListener("click", function () {
	if (!transitionEnd) return;
	goToLeft(slideDif);
});

// Autoslide
autoSlide && (autoEffect = setInterval(goToRight, autoSlideInterval, slideDif));

/////////////////// Event handler after transiton end ///////////////////
slider.addEventListener("transitionend", function () {
	transitionEnd = true;
	if (direction === -1) {
		for (let i = 0; i < slideDif; i++) {
			slider.appendChild(slider.firstElementChild);
		}
		curSlide = Number(slider.firstElementChild.dataset.slideNumber);
	} else {
		for (let i = 0; i < slideDif; i++) {
			slider.prepend(slider.lastElementChild);
		}
		curSlide = Number(slider.lastElementChild.dataset.slideNumber);
	}
	// reset only-one-slide-change for button clicks and autoslide
	slideDif = 1;

	// change dot color of current slide
	addDots && activateDot(curSlide);

	// reset autoslide timer
	if (autoSlide) {
		clearInterval(autoEffect);
		autoEffect = setInterval(goToRight, autoSlideInterval, slideDif);
	}

	transition(0);
	slider.style.transform = "translate(0)";
	setTimeout(transition, 0, transSec);
});
