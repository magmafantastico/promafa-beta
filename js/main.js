var main = {};

main.init = function() {

	this.body = document.body;

	this.main = document.getElementById('main');
	this.header = document.getElementById('main-header');

	addListener(window, 'scroll', 'onscroll', this.ctrlScrollEvent);

	window.addEventListener('resize', this.ctrlResize);

	//this.setHeaderHeight(this.updateHeaderHeight(this.getHeaderDefaultHeight()));

	this.initHeader();
	this.initTouchEvents();

};

main.getHeaderDefaultHeight = function() {

	return window.innerHeight * .5;

};

main.setHeaderHeight = function(headerHeight) {

	main.headerHeight = headerHeight;

};

main.updateHeaderHeight = function(headerHeight) {

	main.header.style.height = headerHeight + 'px';
	return headerHeight;

};

main.goToAnchor = function() {

	//scroll.to(3000);

};

main.ctrlMenuItemClick = function() {

	var t;

	t = 0;

	if (main.body.classList.contains('mobile')) {

		main.toggleNav(false);

		t = 1200;

	}

	setTimeout(main.goToAnchor, t);

};

main.ctrlResize = function() {

	if (isPortrait()) document.body.classList.add('mobile');
	else {

		document.body.classList.remove('mobile');
		main.disableNav();

	}

};

main.putLogoAt = function (a) {

	a.appendChild(main.logo);

};

main.disableNav = function() {

	main.body.classList.remove('active-nav');
	main.putLogoAt(main.headerLogoWrapper);

};

main.enableNav = function() {

	main.body.classList.add('active-nav');
	main.putLogoAt(main.navLogoWrapper);

};

/**
 * Toggle active-nav class
 * If a is true, this function just active/enable the nav
 * @param {boolean} a
 */
main.toggleNav = function(a) {

	if (typeof a == 'boolean') {

		if (a) main.enableNav();
		else main.disableNav();

	} else {

		if (main.body.classList.contains('active-nav')) main.disableNav();
		else main.enableNav();

	}

};

/**
 * Init the main nav
 */
main.initNav = function() {

	main.navToggle = document.getElementById('toggle');
	main.navToggle.addEventListener('click', main.toggleNav);

	main.menu = document.getElementById('main-menu');

	main.menuItems = main.menu.querySelectorAll('.menu-item');

	for (var i = main.menuItems.length; i--; )
		main.menuItems[i].addEventListener('click', main.ctrlMenuItemClick);

};

/**
 * Init the main header
 */
main.initHeader = function () {

	// get the logo
	main.logo = document.getElementById('logo');

	// get logo wrappers
	main.headerLogoWrapper = document.getElementById('logo-wrapper');
	main.navLogoWrapper = document.getElementById('nav-logo-wrapper');

	// init header things
	main.putLogoAt(main.headerLogoWrapper);
	main.initNav();

};

main.initTouchEvents = function () {

	main.touch = {};

	window.addEventListener('touchstart', main.ctrlTouchStartEvent);
	window.addEventListener('touchmove', main.ctrlTouchMoveEvent);


};

main.ctrlScrollEvent = function(evt) { };

main.ctrlTouchMoveEvent = function(evt) { };

main.ctrlTouchStartEvent = function(evt) { };