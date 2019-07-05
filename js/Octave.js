(function () {

	let Octave = function (options) {
		let octaves = ['sub_contra', 'contra', 'great', 'small', 'one_line', 'two_line', 'three_line', 'four_line', 'five_line'],
			$octave = $('<octave>')
				.appendTo(options.parent);

		$octave.attr('type', octaves[options.indexOctave]);

		for (let i = 0, j = 0; i < options.flat; i++) {
			let indexFlat = i,
				indexSharp = j;
			if ($octave.attr('type') != 'sub_contra') {
				indexFlat += 2;
				if (7 <= indexFlat) {
					indexFlat -= 7
				}

				indexSharp += 2;
				if (indexSharp > 3) {
					indexSharp++;
				}

				if (6 < indexSharp) {
					indexSharp -= 7
				};
			}

			new Flat({ parent: $octave, indexFlat: indexFlat });

			if (2 == i) {
				continue;
			}

			if (j < options.sharp) {
				new Sharp({ parent: $octave, indexSharp: indexSharp });
				j++;
			}

		}
	}

	window.Octave = Octave;
})(); 