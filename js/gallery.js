var main = document.getElementById('main');

var hero = document.getElementById('hero-gallery');
var gallerySlides = document.getElementById('hero-gallery-slides');

/**
 @param {object} element
 @param {string} type
 @param {string} crossType
 @param {Function} listener
 @param {boolean} [useCapture]
 */
var addListener = function(element, type, crossType, listener, useCapture) {
	if (window.addEventListener)
		element.addEventListener(type, listener, useCapture);
	else if (crossType)
		element.attachEvent(crossType, listener);
};

var gallery = {};

/**
 * Init the gallery
 */
gallery.init = function() {

	this.viewport = hero;
	this.gallery = gallerySlides;
	this.slides = gallerySlides.querySelectorAll('.gallery-content');
	this.current = this.updateCurrent(this.getCurrent(true));

	addListener(this.viewport, 'click', 'onclick', gallery.nextSlide, false);

	// resize things
	this.resizeGallery();
	this.resizeSlides();
	this.translateSlides();

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

};

/**
 * Do the slide translate
 */
gallery.translateSlides = function() {

	var c, w;

	c = gallery.current.index;
	w = gallery.current.offsetWidth;

	for (var i = gallery.slides.length; i--; )
		//gallery.slides[i].style.left = '' + ( ( i - c ) * w ) + 'px';
		gallery.slides[i].style.transform = 'translateX(' + ( ( i - c ) * w ) + 'px)';

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

	gallery.gallery.style.width = ( gallery.viewport.offsetWidth * gallery.slides.length ) + 'px';

};

gallery.init();