// initialize function called when script loads
function initialize(){			// function definition
    cities();			// call constructor
};

// function to create a table with cities and their populations
function cities(){			// function definition
    var cityPop = [			// array declaration with JSON object format
		{			// JSON object with city and population keys
			city: 'Madison',			// city key
			population: 233209			// population key
		},
		{
			city: 'Milwaukee',
			population: 594833
		},
		{
			city: 'Green Bay',
			population: 104057
		},
		{
			city: 'Superior',
			population: 27244
		}
	];

    // create a table element
    var table = document.createElement("table");

    // create a header row
    var headerRow = document.createElement("tr");

    // add city column to header row
    var cityHeader = document.createElement("th");
    cityHeader.innerHTML = "City";							
    headerRow.appendChild(cityHeader);

    // add population column to header row
    var popHeader = document.createElement("th");
    popHeader.innerHTML = "Population";
    headerRow.appendChild(popHeader);

    // add the header row
    table.appendChild(headerRow);

    // loop to add a new row for each city
    for (var i = 0; i < cityPop.length; i++){
        var tr = document.createElement("tr");

        var city = document.createElement("td");
        city.innerHTML = cityPop[i].city;
        tr.appendChild(city);

        var pop = document.createElement("td");
        pop.innerHTML = cityPop[i].population;
        tr.appendChild(pop);

        table.appendChild(tr);
    };

    // add the table to the div in index.html
    var mydiv = document.getElementById("mydiv");
    mydiv.appendChild(table);

	// add additional column to table
	addSizeDescriptor(cityPop);

	// add ways the page can react to user interaction
	addEvents();

	debugAjax();
};

window.onload = initialize();

// loop to add new column to each row in the page
function addSizeDescriptor(cityPop){   
	// find all row elements in page
    document.querySelectorAll("tr").forEach(
		function(row, i) {
			if (i == 0) {			
				// insert and write new column header
				row.insertAdjacentHTML('beforeend', '<th>City Size</th>');
			} else {
				var citySize;

				// write conditions for descriptor 
				// assignment for each row in column
				if (cityPop[i-1].population < 100000){
					citySize = 'Small';
				} else if (cityPop[i-1].population < 500000){
					citySize = 'Medium';
				} else {
					citySize = 'Large';
				};

				// right assignment to element
				row.insertAdjacentHTML('beforeend', '<td>' + citySize + '</td>');
			};
    	}
	);
};

function addEvents() {
	// find first instance of table and 
	// add a page reaction to user mousing over
	document.querySelector("table").addEventListener("mouseover", 
		function() {
			var color = "rgb(";

			// randomize color components for color model
			for (var i = 0; i < 3; i++) {
				var random = Math.round(Math.random() * 255);
				color += random;

				if (i < 2) {
					color += ",";
				} else {
					color += ")";
				};

				// find first instance of table and assign
				// randomized color model to table style
				document.querySelector("table").style.color = color;
			};
		}
	);

	// find first instance of table element in page
	// and add page reaction to user clicking on it
	document.querySelector("table").addEventListener("click", 
		function() {
			// generate popup for user to close
			alert('Hey, you clicked me!');
		}
	);

	function debugCallback(response){
		document.querySelector("#mydiv")
			.insertAdjacentHTML('beforeend', 
				'GeoJSON data: ' + JSON.stringify(myData))
	};
};

function debugAjax() {
	//define a variable to hold the data
    var myData;

    //basic fetch
    fetch('data/MegaCities.geojson')
        .then(function(response){
            return response.json();
        }) 
        .then(function(response){
            myData = response;

            //check the data
            console.log(myData);

			document.querySelector("#mydiv")
				.insertAdjacentHTML(
					'beforeend', 
					'<br>GeoJSON data:<br>' + JSON.stringify(myData)
				);
        });
};