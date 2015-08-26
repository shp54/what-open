$(document).ready( function(){

if(geoPosition.init()){
	geoPosition.getCurrentPosition(geoSuccess, geoError);
}

function showResults(results){	

		//Builds ordered list of results	
		var arr = ["<h2>Where you can eat right now, ranked by distance</h2>", "<ul class='list-group'>"];
	
		$.each(results, function(index, item){
			icon = item.icon;
			name = item.name;
			address = item.vicinity;
			var html = "<li class='list-group-item'>" + "<h3>" + name + "</h3><span class='address'>" + address + "</span><img src='" + icon + "' width='53' height='53'></li>";
			arr.push(html);
		});

		arr.push("</ul>");
		$("#results").html(arr.join("\n"));
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