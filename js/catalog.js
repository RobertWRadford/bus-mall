/* global Product, Cart */

'use strict';

// Set up an empty cart for use on this page.
var cart = new Cart([]);

// On screen load, we call this method to put all of the busmall options
// (the things in the Product.allProducts array) into the drop down list.
function populateForm() {
  //TODO: Add an <option> tag inside the form's select for each product
  var selectElement = document.getElementById('items');
  for (var i in Product.allProducts) {
    var productName = Product.allProducts[i].name;
    var productUrl = Product.allProducts[i].filePath;
    var newSelection = document.createElement('option');
    selectElement.append(newSelection);
    newSelection.setAttribute('value', productName);
    newSelection.innerHTML = productName;
  }
  if (lootChest.getItem('cart') && !cart.items.length){
    for (let i = 0; i < JSON.parse(lootChest.getItem('cart')).length; i++){
      cart.items.push(JSON.parse(lootChest.getItem('cart'))[i]);
    }
  }
  cart.saveToLocalStorage();
  updateCounter();
  updateCartPreview();
}

// When someone submits the form, we need to add the selected item to the cart
// object, save the whole thing back to local storage and update the screen
// so that it shows the # of items in the cart and a quick preview of the cart itself.
function handleSubmit(event) {
  // TODO: Prevent the page from reloading
  event.preventDefault();
  // Do all the things ...
  addSelectedItemToCart();
  cart.saveToLocalStorage();
  updateCounter();
  updateCartPreview();
}

// TODO: Add the selected item and quantity to the cart
function addSelectedItemToCart() {
  // TODO: suss out the item picked from the select list
  var selectElement = document.getElementById('items');
  var selectedItem = selectElement.value;
  // TODO: get the quantity
  var quantityForm = document.getElementById('quantity');
  var quantityDesired = quantityForm.value;
  // TODO: using those, add one item to the Cart
  var alreadyExists = false;
  for (let i = 0; i < cart.items.length; i+=2){
    if (cart.items[i] == selectedItem) {
      alreadyExists = true;
      cart.items[i+1] = parseInt(cart.items[i+1]) + parseInt(quantityDesired);
    }
  }
  if (!alreadyExists) {
    cart.items.push(selectedItem);
    cart.items.push(quantityDesired);
  }
}

// TODO: Update the cart count in the header nav with the number of items in the Cart
function updateCounter() {
  var cartCount = document.getElementById('itemCount');
  var cartItems = JSON.parse(lootChest.getItem('cart'));
  cartCount.innerHTML = cartItems.length/2;
}

// TODO: As you add items into the cart, show them (item & quantity) in the cart preview div
function updateCartPreview() {
  // TODO: Get the item and quantity from the form
  var selectElement = document.getElementById('items');
  var selectedItem = selectElement.value;
  var quantityForm = document.getElementById('quantity');
  var quantityDesired = quantityForm.value;
  // TODO: Add a new element to the cartContents div with that information
  var cartPreview = document.getElementById('cartContents');
  cartPreview.innerHTML = '';
  for (let i = 0; i < cart.items.length; i+=2) {
    var previewItem = document.createElement('p');
    cartPreview.append(previewItem);
    previewItem.textContent = '• '+cart.items[i]+' '+cart.items[i+1];
  }
  //clear form vlaues
  selectElement.value = '';
  quantityForm.value = '';
}

var quantityForm = document.getElementById('quantity');
quantityForm.setAttribute('min', '0');
// Set up the "submit" event listener on the form.
// This is the trigger for the app. When a user "submits" the form, it will
// Call that handleSubmit method above and kick off the whole process
var catalogForm = document.getElementById('catalog');
catalogForm.addEventListener('submit', handleSubmit);

// Before anything else of value can happen, we need to fill in the select
// drop down list in the form.
populateForm();
