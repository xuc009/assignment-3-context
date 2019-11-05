function getCurrentMinutes() {
	var d = new Date();
	var minutes = d.getMinutes();
	//console.log("current min:", minutes);
	return d.getMinutes();
  }
  
  
  function pageRandom() {
	var page = Math.floor(Math.random() * 2);
	return page;
  }
  
  async function getData(page) {
	const response = await fetch(
	  `https://cors-anywhere.herokuapp.com/https://archive.org/advancedsearch.php?q="metropolitanmuseumofart-gallery"%2C"vests"&fl%5B%5D=identifier&sort%5B%5D=&sort%5B%5D=&sort%5B%5D=&rows=12&page=${page}&output=json`
	);
	const json = await response.json();
	var identifiers = json.response.docs;
	console.log("IDs:", identifiers);
	var imgArray = [];
	var infoArray = [];
	var i = 0;
	for (i = 0; i < identifiers.length; i++) {
	  var individualID = identifiers[i].identifier;
	  const resp = await fetch(
		`https://cors-anywhere.herokuapp.com/https://archive.org/metadata/${individualID}?output=json`
	  );
	  const jsonResults = await resp.json();
	  var img = jsonResults.mma.image;
	  imgArray.push(img);
	  var meta = {};
		meta["place"] = jsonResults.metadata.where;
		meta["medium"] = jsonResults.mma.medium;
		meta["dimensions"] = jsonResults.mma.dimensions;
	  infoArray.push(meta);
	  
	}

	
	// var getImageUrl = async function(counter){

	// 	fetch()
	// 	.then()
	// 	.then(function(){
	// 		// once the first image url is returned
	// 		// output it
	// 		// then run the function with the second imageurl
	// 		counter++;
	// 		getImageUrl(counter)
	// 	})

	// }

	getImageUrl(0)

	console.log(imgArray);
	console.log(infoArray);
	var metadataArrays = [imgArray, infoArray];
	return metadataArrays;
  }
  
  //calling functions
  getData(pageRandom()).then(function(metaArray) {
	var imgArray = metaArray[0];
	var infoArray = metaArray[1];
	
	console.log("HELLO IMG ARRAY: ", imgArray);
	console.log("HELLO:", infoArray);
	
	var time = new Date();
	var secondsRemaining = (60 - time.getSeconds()) * 1000;
	console.log(secondsRemaining);
	
	setTimeout(function() {
	  outputSeconds(imgArray);
	}, secondsRemaining);
	
	setTimeout(function() {
	  setTimeout(function run() {
		outputSeconds(imgArray);
		setTimeout(run, 60000);
	  }, 60000);
	}, secondsRemaining);
  
	setTimeout(function() {
	  outputInitialMin(imgArray);
	}, secondsRemaining);
	
	setTimeout(function() {
	  outputMin(imgArray);
	}, secondsRemaining);
	
	setTimeout(function() {
	  setTimeout(function run() {
		outputMin(imgArray);
		setTimeout(run, 3600000);
	  }, 3600000);
	}, secondsRemaining);
  
	$(document.body).click(function(evt){
	  console.log(imgArray, infoArray)
	  var clicked = evt.target;
	  var currentID = clicked.id || "No ID!";
	  console.log("CLICKED ON:",currentID)
	  var currImg = imgArray[currentID];
	  var currPlace = infoArray[currentID].place;
	  var currMedium = infoArray[currentID].medium;
	  var currDim = infoArray[currentID].dimensions;
	  console.log("place:", infoArray[0].place)
	  console.log("currImg", currImg);
	  console.log(document.getElementById('modalpic'));
	  // document.getElementById('modalpic').src = "https://nextshark.com/wp-content/uploads/2018/04/5-42.jpg";
	  document.getElementById('modalpic').src = currImg;
	  document.getElementById('modalinfo').insertAdjacentHTML("beforeend", `<p>${currPlace}, ${currMedium}, ${currDim}</p>`);
	  console.log("working");
	})

	$("button").click(function(){
		$("#modalinfo").empty();
	  });

  });
  
  function outputSeconds(imgArray) {
	console.log("HELLO2:",imgArray);
	console.log("inside output function");
	var j = 0;
	function imgOutput(j, imgArray) {
	  document
		.getElementById("seconds")
		.insertAdjacentHTML(
		  "beforeend",
		  `<div class="image btn btn-primary" data-toggle="modal" data-target="#exampleModal" id = "${j}"style="background-image: url('${imgArray[j]}');"></div><p>${j}</p><br>`
		);
	}
	setTimeout(function remove() {
	  console.log("remove");
	  document.getElementById("seconds").innerHTML = "";
	  j = 0;
	}, 59990);
	var remove = function() {
	  console.log("removed");
	  document.getElementById("seconds").innerHTML = "";
	  j = 0;
	};
	let i = 0;
	var terminate = setTimeout(function run() {
	  if (i < 59) {
		imgOutput(i++, imgArray);
	  }
	  setTimeout(run, 1000);
	}, 1000);
	setTimeout( function () { clearTimeout(terminate)}, 60000);
  }
  
  function outputInitialMin(imgArray) {
	var minutes = getCurrentMinutes();
	for (var k = 0; k < minutes; k++){
	  var z = k + 60;
	  document.getElementById("minutes").insertAdjacentHTML("beforeend", `<div class="image btn btn-primary" data-toggle="modal" data-target="#exampleModal" id = "${z}"style="background-image: url('${imgArray[z]}');"></div><p>${k}</p><br>`);
	}
  }
  
  function outputMin(imgArray){
	console.log("BALL QUEEN")
	var minutes = getCurrentMinutes();
	var e = 60 + minutes;
	var remainingMin = (60 - minutes);
	function imgOutput(e){
	  document.getElementById("minutes").insertAdjacentHTML("beforeend", `<div class="image btn btn-primary" data-toggle="modal" data-target="#exampleModal" id = "${e}"style="background-image: url('${imgArray[e]}');"></div>${e-60}<br>`);
	}
	setTimeout(function run() {
	  if (e < 120) {
		imgOutput(e++, imgArray);
	  }
	setTimeout(run, 60000);
	}, 60000);
	setTimeout(function removeMin() {
	  console.log("removed Min");
	  document.getElementById("minutes").innerHTML = "";
	}, 60*1000*remainingMin);
  }
  