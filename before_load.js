function click_card(card) {
	if(card == "antibio_res") {
		// antibio_res_text
		document.getElementById("antibio_res_text").innerText = `Antibio Resistance: ${prompt("New Antibio Resistance?", '10.00')}`;
	} else if(card == 'color') {
		// color_text
		document.getElementById("color_text").innerText = `Color: ${prompt("New Color?", 'Orange')}`;
	} else if(card == 'position') {
		// position_text
		document.getElementById("position_text").innerText = `Position: ${prompt("New Position?", '(0, 0)')}`;
	} else if(card == 'name') {
		document.getElementById("cell-profile-name").innerText = prompt("New Name?", document.getElementById("cell-profile-name").innerText);
	}
}