(function () {
	const number = 65;
	let Flat = function (options) {
		const path = `pitches/${options.parent.attr('type')}/`;

		let audio = new Audio(),
			note = String.fromCharCode(options.indexFlat + number).toLowerCase(),
			$elem = $('<flat>', { class: `flat ${note}` })
				.appendTo(options.parent)
				.append($('<span>'))
				.on({
					mousedown: function (e) {
						let $assistd = $('#assistd'),
							activatedClass = $assistd.hasClass('assist_off') ? 'white_activated' : 'white_assist_activated',
							removeKeyClass = $assistd.hasClass('assist_off') ? 'white_key' : 'white_assist_key',
							removeHoverClass = $assistd.hasClass('assist_off') ? 'white_hover' : 'white_assist_hover';
						audio.src = `${path}${note}.wav`
						audio.play();
						$(this)
							.removeClass(removeHoverClass)
							.removeClass(removeKeyClass)
							.addClass(activatedClass);
					},
					mouseup: function () {
						let $assistd = $('#assistd'),
							keyClass = $assistd.hasClass('assist_off') ? 'white_key' : 'white_assist_key',
							removeActiveClass = $assistd.hasClass('assist_off') ? 'white_activated' : 'white_assist_activated';

						$(this)
							.removeClass(removeActiveClass)
							.addClass(keyClass);
					},
					mouseenter: function (e) {
						let $assistd = $('#assistd'),
							hoverClass = $assistd.hasClass('assist_off') ? 'white_hover' : 'white_assist_hover',
							removeKeyClass = $assistd.hasClass('assist_off') ? 'white_key' : 'white_assist_key';
						if (1 == e.which) {
							$(this)
								.trigger('mousedown')
								.removeClass(removeKeyClass)
								.addClass(hoverClass);
						}
					},
					mouseout: function () {
						let keyClass = $('#assistd').hasClass('assist_off') ? 'white_key' : 'white_assist_key';

						$(`flat[class!=${keyClass}]`).addClass(keyClass);
					}
				});
	}
	window.Flat = Flat;
})();