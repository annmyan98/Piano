'use strict';

(function () {

	let colors = [
		'gray',
		'blue',
		'green',
		'red',
		'yellow'
	],
		Piano = function (options) {
			let $mainDiv = $('<div>', { class: 'mainDiv' }).appendTo(options.parent),
				$piano = $('<piano>').appendTo($mainDiv),
				$innerDiv = $('<div>', { class: 'innerDiv' })
					.appendTo($piano)
					.append($('<img>', {
						class: 'speaker1',
						src: 'image/virtual-piano-sterio-sound.png'
					}),
					$('<img>', {
						class: 'speaker2',
						src: 'image/virtual-piano-sterio-sound.png'
					}),
					$('<img>', {
						class: 'vpianologo',
						id: 'logo',
						src: 'image/logo_selected.png'
					}),
					$('<div>', { class: 'btns' })
						.append($('<img>', {
							class: 'play',
							id: 'play',
							src: 'image/menuMain.png'
						}),
						$('<div>', {
							class: 'menu',
							id: 'menu'
						}).append($('<a>', { class: 'pbuttons music' }),
							$('<div>', {
								class: 'pbuttons assist_off',
								id: 'assistd'
							}),
							$('<a>', { class: 'pbuttons world' }),
							$('<div>', { class: 'pbuttons style' }),
							$('<a>', {
								class: 'pbuttons help',
								id: 'aboutd'
							})),
						$('<div>', { class: 'divFoot' })
							.append($('<button>', { class: 'menuButton' }))));

			let $mainRowDiv = $('<div>').addClass('mainRowDiv').appendTo($innerDiv),
				$rowDivSharp = $('<div>').addClass('rowDivSharp').appendTo($mainRowDiv),
				$rowDivFlat = $('<div>').addClass('rowDivFlat').appendTo($mainRowDiv);

			$('.menuButton').on('click', function () {
				let $that = $(this);
				$('#play').toggleClass('dispNone');
				$('#menu').toggleClass('displayButton');
				$that.toggleClass('back');
				$that.toggleClass('menuButton');
			});

			$('.style').on('click', function () {
				$piano.attr('class', colors[Math.floor(Math.random() * colors.length)]);
			});

			for (let i = 0; i < options.octave; i++) {
				let indexOctave = i;
				if (options.sub_contra && 0 == i) {
					new Octave({ parent: $innerDiv, indexOctave: indexOctave, flat: 2, sharp: 1 });
					continue;
				}

				if (options.five_line && options.octave - 1 == i) {
					new Octave({ parent: $innerDiv, indexOctave: indexOctave, flat: 1 });
					continue;
				}

				new Octave({ parent: $innerDiv, indexOctave: indexOctave, flat: 7, sharp: 5 });
			}

			let symbol = {};
			Object.defineProperties(symbol, {
				arrowUp: {
					value: '\u21E7'
				}
			});

			let KeyValArr = ['`', `1 + ${symbol.arrowUp}`, '1', '2', `2 + ${symbol.arrowUp}`, '3', `3 + ${symbol.arrowUp}`, '4', '5', `5 + ${symbol.arrowUp}`, '6', `6 + ${symbol.arrowUp}`, '7', `7 + ${symbol.arrowUp}`, '8', '9', `9 + ${symbol.arrowUp}`,
				'0', `0 + ${symbol.arrowUp}`, '-', '=', `= + ${symbol.arrowUp}`, 'q', `q + ${symbol.arrowUp}`, 'w', `w + ${symbol.arrowUp}`, 'e', 'r', `r + ${symbol.arrowUp}`, 't', `t + ${symbol.arrowUp}`, 'y', 'u', `u + ${symbol.arrowUp}`, 'i',
				`i + ${symbol.arrowUp}`, 'o', `o + ${symbol.arrowUp}`, 'p', '[', `[ + ${symbol.arrowUp}`, ']', `] + ${symbol.arrowUp}`, '\\', 'a', `a + ${symbol.arrowUp}`, 's', `s + ${symbol.arrowUp}`, 'd', `d + ${symbol.arrowUp}`, 'f', 'g', `g + ${symbol.arrowUp}`,
				'h', `h + ${symbol.arrowUp}`, 'j', 'k', `k + ${symbol.arrowUp}`, 'l', `l + ${symbol.arrowUp}`, ';', `; + ${symbol.arrowUp}`, '\'', 'z', `z + ${symbol.arrowUp}`, 'x', `x + ${symbol.arrowUp}`, 'c', 'v', `v + ${symbol.arrowUp}`, 'b',
				`b + ${symbol.arrowUp}`, 'n', `n + ${symbol.arrowUp}`, 'm', ',', `, + ${symbol.arrowUp}`, '.', `. + ${symbol.arrowUp}`, '\/'];

			KeyValArr.forEach((item, i) => {
				let $span = $('span');
				$span.each(() => {
					$($span[i])
						.text(item)
						.addClass('span');
				});
			});

			$('span').addClass('visible');
				$('flat').children().toggleClass('visibleFlatBack');
				$('sharp').children().toggleClass('visibleSharpBack');

			$('#assistd').on('click', function () {
				let $flat = $('flat'),
					$sharp = $('sharp');
				$(this)
					.toggleClass('assist_off')
					.toggleClass('assist_on');
				$flat
					.removeClass('white_key white_activated white_assist_hover white_hover white_assist_activated')
					.toggleClass('white_assist_key');
				$sharp
					.removeClass('black_key black_activated black_assist_hover black_hover black_assist_activated')
					.toggleClass('black_assist_key');
				
				$sharp.children().toggleClass('visibleSharp visibleSharpBack');
				$flat.children().toggleClass('visibleFlat visibleFlatBack');
			});
		

			$('octave').each(function (index, element) {
				let flatCount = 0,
					sharpCount = 0;

				$(element).children()
					.each(function (ind, elem) {

						if ($(elem).hasClass('flat')) {

							let $elem = $(elem),
								point = $elem.offset().left,
								note = String.fromCharCode(flatCount + 65),
								$textDiv = $('<div>')
									.addClass('textDivFlat')
									.text(`${note}${index}`)
									.css('left', point)
									.appendTo('div.rowDivFlat');

							flatCount++;

							$textDiv.on({
								mouseenter: function () {
									let $assistd = $('#assistd'),
										hoverClass = $assistd.hasClass('assist_off') ? 'white_hover' : 'white_assist_hover',
										removeKeyClass = $assistd.hasClass('assist_off') ? 'white_key' : 'white_assist_key';

									if (1 == $(this).parent().css('opacity')) {
										$elem
											.removeClass(removeKeyClass)
											.addClass(hoverClass);
									}
								},
								mouseleave: () => {
									let $assistd = $('#assistd'),
										removeHoverClass = $assistd.hasClass('assist_off') ? 'white_hover' : 'white_assist_hover',
										keyClass = $assistd.hasClass('assist_off') ? 'white_key' : 'white_assist_key';

									$elem
										.removeClass(removeHoverClass)
										.addClass(keyClass);
								}
							});
						}

						else {
							let $elem = $(elem),
								point = $elem.offset().left,
								note = String.fromCharCode(sharpCount + 65),
								$textDiv = $('<div>')
									.addClass('textDivSharp')
									.text(`${note}${index}#`)
									.css('left', point)
									.appendTo('div.rowDivSharp');
							sharpCount++;

							$textDiv.on({
								mouseenter: function () {
									let $assistd = $('#assistd'),
										hoverClass = $assistd.hasClass('assist_off') ? 'black_hover' : 'black_assist_hover',
										removeKeyClass = $assistd.hasClass('assist_off') ? 'black_key' : 'black_assist_key';

									if (1 == $(this).parent().css('opacity')) {
										$elem
											.removeClass(removeKeyClass)
											.addClass(hoverClass);
									}
								},
								mouseleave: () => {
									let $assistd = $('#assistd'),
										removeHoverClass = $assistd.hasClass('assist_off') ? 'black_hover' : 'black_assist_hover',
										keyClass = $assistd.hasClass('assist_off') ? 'black_key' : 'black_assist_key';

									$elem
										.removeClass(removeHoverClass)
										.addClass(keyClass);
								}
							});
						}
					});
			});

			$rowDivFlat.add($rowDivSharp).click(function () {
				$(this).toggleClass('rowDivDisplay');
			});

			let arrFlat = [96, 49, 50, 51, 52, 53, 54, 55, 56, 57, 48, 45, 61, 113, 119, 101, 114, 116, 121, 117, 105, 111, 112, 91, 93, 92, 97, 115, 100, 102, 103, 104, 106, 107, 108, 59, 39, 122, 120, 99, 118, 98, 110, 109, 44, 46, 47],
				arrSharp = [126, 64, 35, 37, 94, 38, 40, 41, 43, 81, 87, 82, 84, 85, 73, 79, 123, 125, 65, 83, 68, 71, 72, 75, 76, 58, 90, 88, 86, 66, 78, 60, 62];

			function combine(arr, elemName) {
				arr.forEach((item, i) => {
					$($(elemName)[i]).attr('keyCode', item);
				});
			}

			combine(arrFlat, 'flat');
			combine(arrSharp, 'sharp');

			var lastKey,
				keycode;

			$(window).on({
				keypress: (event) => {
					keycode = event.keyCode;

					if (lastKey != event.which) {
						$(`[keyCode=${keycode}]`).trigger('mousedown');

						lastKey = event.which;
					}
				},
				keyup: () => {
					lastKey = null;
					$(`[keyCode=${keycode}]`)
						.trigger('mouseup')
						.trigger('mouseout');
				}
			});

		}

	window.Piano = Piano;
})();