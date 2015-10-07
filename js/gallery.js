/*!
 * Mowe Gallery v1.0.0 (http://letsmowe.org/)
 * Copyright 2013-2015 Noibe Developers
 * Licensed under MIT (https://github.com/noibe/villa/blob/master/LICENSE)
 */

var hero = document.getElementById('hero-gallery');
var gallerySlides = document.getElementById('hero-gallery-slides');
var gallery = {};

/**
 * Init the gallery
 */
gallery.init = function() {

	this.viewport = hero;
	this.gallery = gallerySlides;
	this.slides = gallerySlides.querySelectorAll('.gallery-content');
	this.current = this.updateCurrent(this.getCurrent(true));

	addListener(this.viewport, 'click', 'onclick', gallery.ctrlClick, false);

	this.loopInterval = 6000;
	addListener(window, 'resize', false, gallery.ctrlResize, false);

	this.resizeGallery();
	this.resizeSlides();
	this.translateSlides();

	this.initInfiniteLoop();

};

/**
 * Get the current slide
 * @param {boolean|undefined} remove
 * @return {object} current
 */
gallery.getCurrent = function(remove) {

	var c, n;

	for (var i = gallery.slides.length; i--; )
		if (gallery.slides[i].classList.contains('current')) {
			if (remove) gallery.slides[i].classList.remove('current');
			c = gallery.slides[i];
			c.index = i;
		}

	if ( !c ) {
		n = gallery.slides[0];
		n.index = 0;
	}

	return n ? n : c;

};

/**
 * Current Setter
 * @param {object} current
 * @return {object} current
 */
gallery.setCurrent = function(current) {

	gallery.current = current;

};

/**
 * Current Update Class
 * @param {object} current
 * @return {object} current
 */
gallery.updateCurrent = function(current) {

	current.classList.add('current');
	return current;

};

/**
 * Get, update and set the current to next slide
 */
gallery.nextSlide = function() {

	var c, n, i;

	if ( c = gallery.getCurrent(true) ) {

		i = ( c.index == gallery.slides.length - 1 ) ? 0 : c.index + 1;
		n = gallery.slides[i];
		n.index = i;

		gallery.setCurrent(gallery.updateCurrent(n));

	}

	gallery.translateSlides();
	gallery.initInfiniteLoop();

};

/**
 * Set the slide translate property (webkit and ie9 support)
 * @param {object} a element
 * @param {number} b width
 */
gallery.setSlideTranslate = function(a, b) {
	a.style.transform = 'translateX(' + b + 'px)';
	a.style.webkitAlignContent = 'translateX(' + b + 'px)';
	a.style.msTransform = 'translateX(' + b + 'px)';
};

/**
 * Do the slide translate
 */
gallery.translateSlides = function() {

	var c, w;

	gallery.allowClick = false;

	c = gallery.current.index;
	w = gallery.current.offsetWidth;

	for (var i = gallery.slides.length; i--; )
		gallery.setSlideTranslate(gallery.slides[i], ( i - c ) * w);

	setTimeout(function() {
		gallery.allowClick = true;
	}, 700);

};

/**
 * Resize the .gallery-content
 */
gallery.resizeSlides = function() {

	for (var i = gallery.slides.length; i--; )
		gallery.slides[i].style.width = gallery.viewport.offsetWidth + 'px';

};

/**
 * Resize the .gallery
 */
gallery.resizeGallery = function() {

	var h, w;

	h = gallery.viewport.offsetWidth * .7;
	w = gallery.viewport.offsetWidth * gallery.slides.length;

	if (h > window.innerHeight) h = window.innerHeight;

	gallery.gallery.style.height = h + 'px';
	gallery.gallery.style.width = w + 'px';

};

/**
 * Controller of click and touch events
 */
gallery.ctrlClick = function() {

	if (gallery.allowClick) gallery.nextSlide();

};

/**
 * Controller of size of gallery and slides
 * Also do a nextSlide function after 1200 milliseconds
 */
gallery.ctrlResize = function() {

	gallery.resizeGallery();
	gallery.resizeSlides();

	gallery.initInfiniteLoop(1200);

};

gallery.doInfiniteLoop = function() {

	if (gallery.infiniteLoop) clearInterval(gallery.infiniteLoop);

	gallery.loopInterval = 5000;
	gallery.infiniteLoop = setInterval(gallery.nextSlide, gallery.loopInterval);

};

/**
 * Controller the global interval function
 */
gallery.initInfiniteLoop = function(interval) {

	if (interval) {
		if (gallery.infiniteLoop) clearInterval(gallery.infiniteLoop);
		gallery.infiniteLoop = setTimeout(function() {
			gallery.nextSlide();
			gallery.doInfiniteLoop();
		}, interval);
	} else gallery.doInfiniteLoop();

};