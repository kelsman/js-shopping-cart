'use strict'

const addToCartBtn = document.querySelectorAll('.add-to-cart')
const closeCartBtnDOM = document.querySelector('#close-window')
const cartIcon = document.querySelector('.cart-icon')
const cartOverlay = document.querySelector('.cart-overlay')
const itemPrice = document.querySelector('.price');

//const itemQuantity = document.querySelectorAll('#quantity');//

let cart = []
let clearCartBtn = cartOverlay.querySelector('.clear-cartbtn');

//Event listerners
// adding functionaliy to the clear cart button//
clearCartBtn.addEventListener('click', () => {
    document.querySelector('#cart-no').textContent = 0;
    cartOverlay.querySelectorAll('.cart').forEach((cart) => {
        cart.remove();
        addToCartBtn.forEach((addbtn) => {
            addbtn.innerText = "add to cart";
            addbtn.setAttribute('class', 'add-to-cart');
        })
    })
})


cartIcon.addEventListener('click', () => {
    cartOverlay.style.transform = 'translateX(0)'

})

closeCartBtnDOM.addEventListener('click', () => {
    cartOverlay.style.transform = 'translateX(101%)'
})

addToCartBtn.forEach((addbtn) => {
    addbtn.addEventListener('click', () => {

        const parentDom = addbtn.parentElement

        const products = {
            image: parentDom.querySelector('.product-image').getAttribute('src'),
            name: parentDom.querySelector('.product-name').innerText,
            price: parentDom.querySelector('.price').innerText,
            quantity: 1,
        }

        //add html to the cart overlay //

        // a function that initiate the addimg of content to the cartoverlay
        const addToDom = () => {
            cartOverlay.insertAdjacentHTML(
                'beforeend',
                `
        <div class="cart">
            <div class="image-cart">
            <img class="cart-image" src="${products.image}" alt="${products.name}">
            </div>
            <div class="product-details">
                <p class="cart-name">
                 ${products.name}
                </p>
                <p class="cart-price">
                  <span>$</span>${products.price}
                </p>
                <button class="remove-btn">remove</button>
             </div>
            <div class="quantity-control">
                <button id="sort-up"><i class="fas fa-sort-up"></i></button> 
                <p id="quantity"> ${products.quantity}</p>
                <button id="sort-down"><i class="fas fa-sort-down"></i></button>     
            </div>
      
         </div>
        
            `
            );


            // increasing cartnumber value per button click//
            let cartNO = document.querySelector('#cart-no').textContent;
            cartNO = Number(cartNO);
            cartNO = cartNO + 1;
            document.querySelector('#cart-no').textContent = cartNO;

            let cartDOM = cartOverlay.querySelectorAll('.cart');

            cartDOM.forEach((cartDOM) => {
                //adding functionality to the increase button
                const increasebtn = cartDOM.querySelector('#sort-up');
                if (cartDOM.querySelector('.cart-name').innerText == products.name) {
                    increasebtn.addEventListener('click', () => {

                        products.quantity = products.quantity + 1;

                        cartDOM.querySelector('#quantity').innerText = products.quantity;
                        //updating price
                        cartDOM.querySelector('.cart-price').innerText = '$' + products.quantity * products.price + '.00';


                    })
                }
                //adding  functionality to the decreasebutton
                const decreasebtn = cartDOM.querySelector("#sort-down");
                if (cartDOM.querySelector('.cart-name').innerText == products.name) {
                    decreasebtn.addEventListener('click', () => {

                        if (cartDOM.querySelector('#quantity').innerText > 1) {
                            products.quantity = products.quantity - 1;
                            cartDOM.querySelector('#quantity').innerText = products.quantity;

                            //updating price
                            cartDOM.querySelector('.cart-price').innerText = '$' + products.quantity * products.price + '.00';
                        }
                    })

                }
                // remove cart from cartOverlay
                const removebtn = cartDOM.querySelector('.remove-btn');
                removebtn.addEventListener('click', () => {
                    if (cartDOM.querySelector('.cart-name').innerText == products.name) {

                        addbtn.innerText = "add to cart";
                        addbtn.setAttribute('class', 'add-to-cart');
                        cartDOM.remove();
                        //updating cart number
                        let cartNO = document.querySelector('#cart-no').textContent;
                        cartNO = Number(cartNO);
                        cartNO = cartNO - 1;
                        document.querySelector('#cart-no').textContent = cartNO;

                    }
                })
            })

        }
        //prevent duplicate adding to the DOM//
        if (addbtn.innerText === 'Add To Cart') {
            addToDom()
            if (addbtn.innerText = 'In Cart') {
                addbtn.setAttribute('class', 'in-cart');
            }
        }
        setTimeout(() => {
            addbtn.innerText = 'In Cart'
        }, 500);

        cart.push(products)
    })
})

