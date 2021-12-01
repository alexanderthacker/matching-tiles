var tiles = ['A', 'B', 'C', 'D', 'E'];

var all_tiles = tiles.concat(tiles);
all_tiles = all_tiles.sort(() => Math.random() - 0.5);

var current_choices = [];

document.addEventListener('DOMContentLoaded', function () {

		var matching_container = document.querySelector('#matching-container');

		for(var x = 0; x < all_tiles.length; x++) {
				matching_container.innerHTML += '<div class="tile" id="tile'+x+'"><div class="tile-sizer"><div class="tile-front">?</div><div class="tile-back"></div></div></div>';
		}

		var tile_dom_elems = document.querySelectorAll('.tile');
		for (i = 0; i < tile_dom_elems.length; i++) {
				tile_dom_elems[i].addEventListener('click', function() {
						chooseTile(this);
				});
		}

});

function chooseTile(tile_dom_elem) {
		var tile_id = tile_dom_elem.getAttribute('id');
		var tile_index = tile_id.substr(4);

		if(current_choices.length <= 1) {
				if(current_choices.length == 0 || tile_index != current_choices[0]) {
						showTile(tile_dom_elem, tile_index);
						current_choices.push(tile_index);
				}

				if(current_choices.length == 2) {
						if(getTileValue(current_choices[0]) == getTileValue(current_choices[1])) {								
								document.querySelector('#tile'+current_choices[0]).classList.add('matched');
								document.querySelector('#tile'+current_choices[1]).classList.add('matched');
								current_choices = [];
						} else {
								setTimeout(resetCurrentChoices, 2000);
						}
				}
		}
}

function showTile(tile_dom_elem, tile_index) {
		var tile_back = tile_dom_elem.querySelector('.tile-back');

		var tile_value = getTileValue(tile_index);
		tile_back.innerHTML = tile_value;
		tile_dom_elem.classList.add('selected');
}

function getTileValue(tile_index) {
		return all_tiles[tile_index];
}

function resetCurrentChoices() {
		for(x = 0; x < current_choices.length; x++) {
				var tile_back = document.querySelector('#tile'+current_choices[x]+' .tile-back');
				tile_back.innerHTML = '';
				var tile_dom_elem = document.querySelector('#tile'+current_choices[x]);
				tile_dom_elem.classList.remove('selected');
		}
		current_choices = [];		
}
