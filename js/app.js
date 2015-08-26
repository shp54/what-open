$(document).ready( function(){

if(geoPosition.init()){
	geoPosition.getCurrentPosition(geoSuccess, geoError);
}

function showResults(results){	

		//Builds ordered list of results	
		str = "<h2>Where you can eat right now, ranked by distance</h2>"	
 		      + "<ol data-role='listview' data-inset='true' class='ui-listview ui-listview-inset ui-corner-all ui-shadow'>";
		$.each(results, function(index, item){
			icon = item.icon;
			name = item.name;
			address = item.vicinity
			str += "<li class='ui-li-static ui-body-inherit ui-first-child'>" 
			    +"<h3>" + name + "</h3><br>" + address + "<img src='" + icon + "' width='53' height='53'></li>";
		});

		str += "</ol>";
		//console.log(str);

		$("#results").html(str);
}

function geoSuccess(p){
	console.log("Found user's location at " + p.coords.latitude + ", " + p.coords.longitude);
	//AJAX this up - get JSON response from the server
	url = "/open?lat=" + p.coords.latitude + "&long=" + p.coords.longitude; //Build the URL string
	$.getJSON(url, function(data) {
		if(data.status == 'OK'){
			showResults(data.results);		
		} else {
			$("#results").html("Something went wrong. We're working on it!");
		}
	});	
}

function geoError(p){
	alert("Couldn't find your location. We kind of need that");
}

});