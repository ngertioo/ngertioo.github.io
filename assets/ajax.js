function ajaxYesterday(){
    // Declare variables to hold filtered data for each city
	var sdy = '';
	var hk = '';
	var sgp = '';

	// Make an AJAX request to fetch the JSON data
	var xhr = new XMLHttpRequest();
	xhr.onreadystatechange = function() {
		if (xhr.readyState === 4 && xhr.status === 200) {
		// Parse the received JSON data
		var jsonData = JSON.parse(xhr.responseText);

		var sdyData = jsonData.filter(function(item) {
			return item.pasar === 'sydney';
		}); var hkData = jsonData.filter(function(item) {
			return item.pasar === 'hongkong';
		}); var sgpData = jsonData.filter(function(item) {
			return item.pasar === 'hongkong';
		});

		// Assign the first person's name for each city to the variables
		if (sdyData.length > 0) {
			sdy = sdyData[0].angka;
		} else {
			sdy = 'No person found in sdy';
		}
		if (hkData.length > 0) {
			hk = hkData[0].angka;
		} else {
			hk = 'No person found in hk';
		}
		if (sgpData.length > 0) {
			sgp = sgpData[0].angka;
		} else {
			sgp = 'No person found in sgp';
		}

		// Display the results
		var resultContainer = document.getElementById('lastress');
		resultContainer.innerHTML = '<p>HK : ' + hk + ' | SDY : ' + sdy + ' | SGP : ' + sgp + ' </p><br>' ;
		}
	};

	xhr.open('GET', 'assets/api.php?ajax=full', true);
	xhr.send();
}