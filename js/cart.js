/* global Cart */
'use strict';

// Create an event listener so that when the delete link is clicked, the removeItemFromCart method is invoked.
var table = document.getElementById('cart');
var cart;

function orderSubmitted(){
  var animationContainer = document.createElement('div');
  cartContent.append(animationContainer);
  var animation = document.createElement('animation');
  animationContainer.append(animation);
  animation.innerHTML = 'Thank you for shopping with us';
  animationContainer.setAttribute('style', 'height:10vh;background-color:red;animation-name:processedOrder;animation-duration:2s');

  nameInput.value = '';
  streetInput.value = '';
  cityInput.value = '';
  stateInput.value = '';
  zipInput.value = '';
  phoneInput.value = '';
  creditInput.value = '';
}

function loadCart() {
  var cartItems = JSON.parse(localStorage.getItem('cart')) || [];
  cart = new Cart(cartItems);
}

// Make magic happen --- re-pull the Cart, clear out the screen and re-draw it
function renderCart() {
  loadCart();
  clearCart();
  showCart();
}

// TODO: Remove all of the rows (tr) in the cart table (tbody)
function clearCart() {
  var tbodyContent = table.children.item(1);
  tbodyContent.innerHTML = '';
}

// TODO: Fill in the <tr>'s under the <tbody> for each item in the cart
function showCart() {  
  // TODO: Find the table body
  var tbodyContent = table.children.item(1);
  tbodyContent.innerHTML = '';
  // TODO: Iterate over the items in the cart
  var shoppingCart = JSON.parse(lootChest.getItem('cart'));
  for (let i = 0; i < shoppingCart.length; i+=2){
    // TODO: Create a TR
    var cartItem = document.createElement('tr');
    tbodyContent.append(cartItem);
    // TODO: Create a TD for the delete link, quantity,  and the item
    var deleteLink = document.createElement('td');
    cartItem.append(deleteLink);
    var theLink = document.createElement('input');
    deleteLink.append(theLink);
    theLink.setAttribute('id', shoppingCart[i]);
    theLink.setAttribute('type', 'submit');
    theLink.setAttribute('value', 'Delete');
    theLink.addEventListener('click', function(e){
      e.preventDefault();
      console.log(e.target.id);
      removeItemFromCart(e.target.id);
    });
    var quantityCell = document.createElement('td');
    cartItem.append(quantityCell);
    quantityCell.textContent = shoppingCart[i+1];
    var itemPhoto = document.createElement('td');
    cartItem.append(itemPhoto);
    var thePhoto = document.createElement('img');
    thePhoto.setAttribute('style', 'height:10vw;width:10vw;');
    itemPhoto.append(thePhoto);
    for (let j = 0; j < Product.allProducts.length; j++) {
      if (Product.allProducts[j].name == shoppingCart[i]) {
        thePhoto.setAttribute('src', Product.allProducts[j].filePath);
      }
    }
    // TODO: Add the TR to the TBODY and each of the TD's to the TR
  }
}

function removeItemFromCart(targetId) {
  // TODO: When a delete link is clicked, use cart.removeItem to remove the correct item
  var desiredItem = String(targetId);
  cart.removeItem(desiredItem);
  // TODO: Save the cart back to local storage
  cart.saveToLocalStorage();
  // TODO: Re-draw the cart table
  showCart();
}

console.log(document.getElementsByTagName('main'));
var cartContent = document.getElementsByTagName('main')[0];
var formDiv = document.createElement('div');
cartContent.append(formDiv);
var formsHere = document.createElement('form');
cartContent.append(formsHere);
var nameLabel = document.createElement('label');
nameLabel.innerHTML = 'Name:';
formsHere.append(nameLabel);
var nameInput = document.createElement('input');
formsHere.append(nameInput);
nameInput.setAttribute('type', 'text');
nameInput.required = true;
var streetLabel = document.createElement('label');
streetLabel.innerHTML = 'Street Address:';
formsHere.append(streetLabel);
var streetInput = document.createElement('input');
formsHere.append(streetInput);
streetInput.setAttribute('type', 'text');
streetInput.required = true;
var cityLabel = document.createElement('label');
cityLabel.innerHTML = 'City:';
formsHere.append(cityLabel);
var cityInput = document.createElement('input');
formsHere.append(cityInput);
cityInput.setAttribute('type', 'text');
cityInput.required = true;
var stateLabel = document.createElement('label');
stateLabel.innerHTML = 'State:';
formsHere.append(stateLabel);
var stateInput = document.createElement('input');
formsHere.append(stateInput);
stateInput.setAttribute('type', 'text');
stateInput.required = true;
var zipLabel = document.createElement('label');
zipLabel.innerHTML = 'ZIP Code:';
formsHere.append(zipLabel);
var zipInput = document.createElement('input');
formsHere.append(zipInput);
zipInput.setAttribute('type', 'text');
zipInput.required = true;
var phoneLabel = document.createElement('label');
phoneLabel.innerHTML = 'Phone Number:';
formsHere.append(phoneLabel);
var phoneInput = document.createElement('input');
formsHere.append(phoneInput);
phoneInput.setAttribute('type', 'text');
phoneInput.required = true;
var creditLabel = document.createElement('label');
creditLabel.innerHTML = 'Credit Card Number:';
formsHere.append(creditLabel);
var creditInput = document.createElement('input');
formsHere.append(creditInput);
creditInput.setAttribute('type', 'number');
creditInput.setAttribute('minlength', '16');
creditInput.setAttribute('maxlength', '16');
creditInput.required = true;
var processOrder = document.createElement('input');
formsHere.append(processOrder);
processOrder.setAttribute('type', 'submit');
processOrder.setAttribute('value', 'Process Order');

formsHere.addEventListener('submit', function(e){
  e.preventDefault();
  orderSubmitted();
});


// This will initialize the page and draw the cart on screen
renderCart();
