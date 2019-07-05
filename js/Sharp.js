(function () {
	const number = 65;
	let Sharp = function (options) {
		const path = `pitches/${options.parent.attr('type')}/`;

		let audio = new Audio(),
			note = String.fromCharCode(options.indexSharp + number).toLowerCase(),
			$elem = $('<sharp>').addClass(`sharp ${note}_sharp`)
				.appendTo(options.parent)
				.append($('<span>'))
				.on({
					mousedown: function () {

						let $assistd = $('#assistd'),
							activatedClass = $assistd.hasClass('assist_off') ? 'black_activated' : 'black_assist_activated',
							removeKeyClass = $assistd.hasClass('assist_off') ? 'black_key' : 'black_assist_key',
							removeHoverClass = $assistd.hasClass('assist_off') ? 'black_hover' : 'black_assist_hover';
						audio.src = `${path}${note}.wav`
						audio.play();
						$elem
							.addClass(activatedClass)
							.removeClass(removeHoverClass)
							.removeClass(removeKeyClass);
					},
					mouseup: function () {
						let $assistd = $('#assistd'),
							keyClass = $assistd.hasClass('assist_off') ? 'black_key' : 'black_assist_key',
							removeActiveClass = $assistd.hasClass('assist_off') ? 'black_activated' : 'black_assist_activated';
						$(this)
							.removeClass(removeActiveClass)
							.addClass(keyClass);
					},
					mouseenter: function (e) {
						let $assistd = $('#assistd'),
							hoverClass = $assistd.hasClass('assist_off') ? 'black_hover' : 'black_assist_hover',
							removeKeyClass = $assistd.hasClass('assist_off') ? 'black_key' : 'black_assist_key';
						if (e.which) {
							$(this)
								.trigger('mousedown')
								.removeClass(removeKeyClass)
								.addClass(hoverClass);
						}
					},
					mouseout: function () {
						let keyClass = $('#assistd').hasClass('assist_off') ? 'black_key' : 'black_assist_key';

						$(`sharp[class!=${keyClass}]`).addClass(keyClass);
					}
				});

	}
	window.Sharp = Sharp;
})();