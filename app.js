var productImg = {};
var bufferDict = {};
var roundsAllowed = 25;
var roundCount = roundsAllowed;

function Product(userName, codeName, imgUrl){
	this.name = userName;
	eval('productImg.'+codeName+' = \''+imgUrl+'\'');
	this.selected = 0;
	this.shown = 0;
}

var bag = new Product("R2D2 Luggage","bag", "images/bag.jpg");
var banana = new Product('Banana Slicer','banana', 'images/banana.jpg');
var bathroom = new Product('Bathroom Smart Device Stand','bathroom', 'images/bathroom.jpg');
var boots = new Product('Open Toed Boots','boots', 'images/boots.jpg');
var breakfast = new Product('All In One Breakfast Maker','breakfast', 'images/breakfast.jpg');
var bubblegum = new Product('Meatball Bubblegum','bubblegum', 'images/bubblegum.jpg');
var chair = new Product('Uncomfortable Chair','chair', 'images/chair.jpg');
var cthulu = new Product('Cthulu Figurine','cthulu', 'images/cthulhu.jpg');
var dogDuck = new Product('Dog Duck Bill','dogDuck', 'images/dog-duck.jpg');
var dragon = new Product('Canned Dragon Meat','dragon', 'images/dragon.jpg');
var pen = new Product('Utensil Pen Caps','pen', 'images/pen.jpg');
var petSweep = new Product('Pet Sweeping Booties','petSweep', 'images/pet-sweep.jpg');
var scissors = new Product('Pizza Scissors','scissors', 'images/scissors.jpg');
var shark = new Product('Shark Sleeping Bag','shark', 'images/shark.jpg');
var sweep = new Product('Baby Sweeping Outfit','sweep', 'images/sweep.png');
var tauntaun = new Product('Tauntaun Sleeping Bag','tauntaun', 'images/tauntaun.jpg');
var unicorn = new Product('Canned Unicorn Meat','unicorn', 'images/unicorn.jpg');
var usb = new Product('Tentacle USB Plugin','usb', 'images/usb.gif');
var waterCan = new Product('Water Can','waterCan', 'images/water-can.jpg');
var wineGlass = new Product('Awkward Wine Glass','wineGlass', 'images/wine-glass.jpg');

function selectProducts(items){
	var displayedProducts = [];

	//math to calculate desired width/height of photos
	var calculateWidth = (100 - (items+1)) / items;
	var viewWidth = String(calculateWidth)+'vw';

	function doTheDomStuff(key){
		//write the dom to pull images from the urls; first get the div container
		var productDisplay = document.getElementById('productDisplay');

		//Now create the image and assign attributes
		var newImage = document.createElement('img');
		newImage.setAttribute('class', 'displayedProduct');
		newImage.setAttribute('src', productImg[key]);
		newImage.setAttribute('style', 'width:'+viewWidth+';height:'+viewWidth+';margin-left:1vw;margin-top:1vw;');
		newImage.setAttribute('float', 'left');

		//add the displayed element to an array for later reference
		displayedProducts.push(key);

		eval('bufferDict.'+key+' = \''+productImg[key]+'\'');
		eval('delete productImg.'+key);

		//Create event listeners for picture clicks on images;
		newImage.addEventListener('click', function(e) {
			e.preventDefault();
			registerVote(displayedProducts, key);
		}, false);
		//append the image to the div
		productDisplay.append(newImage);
	}

	for (var i = 0; i < items; i++){
		//create an array of the key names in productImg
		var keychain = Object.keys(productImg);
		//create a random index in the length of productImg
		var useIndex = Math.floor(Math.random()*keychain.length);
		//create a variable to simplify further use of keychain at useIndex
		var currentKey = keychain[useIndex];
		doTheDomStuff(currentKey);
	}
	var deletedPairs = Object.entries(bufferDict); //if 3 items will be length 6; loop will count 0, 2,
	// console.log(deletedPairs);
	for (var i = 0; i < deletedPairs.length; i+=1){
		eval('productImg.'+deletedPairs[i][0]+' = \''+deletedPairs[i][1]+'\'');
		eval('delete bufferDict.'+deletedPairs[i][0]);
	}
}

function registerVote(displayedProducts, selectedProduct){
	//delete loaded images
	var keychain = Object.keys(productImg);
	var productDisplay = document.getElementById('productDisplay');
	productDisplay.innerHTML='';
	//reduce rounds left
	roundCount--;
	//register what URLs were listed and which of them was picked; tally a .shown for all and a .selected for the one chosen; if roundCount is > 0, run selectProducts again with the same items value (number of URLs read). If roundCount is zero reset to roundsAllowed value and remove event listeners. Display ALL products with their votes received and times on screen. "Banana Slicer had 3 votes and was shown 5 times"
	eval(selectedProduct+'.selected+=1');
	for (var i = 0; i < displayedProducts.length; i++){
		eval(displayedProducts[i]+'.shown+=1');
	}

	if (roundCount) {
		selectProducts(displayedProducts.length);
	} else {
		// roundCount = roundsAllowed;
		for (var i = 0; i < keychain.length; i++){
			var itemUserName = eval(keychain[i]+'.name');
			var itemSelected = eval(keychain[i]+'.selected');
			var itemShown = eval(keychain[i]+'.shown');
			var newContainer = document.createElement('div');
			newContainer.setAttribute('style', 'width:32vw;height:32vw;margin-left:1vw;display:inline-block;')
			productDisplay.append(newContainer);
			var newImage = document.createElement('img');
			newContainer.append(newImage);
			newImage.setAttribute('src', productImg[keychain[i]]);
			newImage.setAttribute('style', 'margin-left:3vw;margin-top:1vw;width:26vw;height:26vw;');
			var imageStats = document.createElement('p');
			imageStats.setAttribute('style', 'width:26vw;height:5vw;margin-left:3vw;text-align:center;font-size:1.5vw;');
			newContainer.append(imageStats);
			imageStats.textContent = itemUserName+' had '+itemSelected+' votes and was shown '+itemShown+' times';
		}
	}
}

var userPrompt = prompt('how many products should be shown at once?');

var numProducts = parseInt(userPrompt);
selectProducts(numProducts);