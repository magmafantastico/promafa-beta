Modal = {};

Modal.open = function(viewport) {

	console.log('he');

	viewport.classList.add('active');

};

Modal.close = function(viewport) {

	viewport.classList.remove('active');

};

Modal.init = function(viewport, openBtn, closeBtn) {

	openBtn.addEventListener('click', function() {

		Modal.open(viewport);

	});

	closeBtn.addEventListener('click', function() {

		Modal.close(viewport);

	});

};