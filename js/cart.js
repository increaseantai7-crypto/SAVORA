/* =========================================
   SAVORA — CART SYSTEM
========================================= */

let cart = JSON.parse(localStorage.getItem("savoraCart")) || [];


/* =========================================
   DOM ELEMENTS
========================================= */

const cartButton = document.getElementById("cartButton");
const cartDrawer = document.getElementById("cartDrawer");
const closeCartButton = document.getElementById("closeCartButton");

const cartItemsContainer = document.getElementById("cartItems");
const cartCount = document.getElementById("cartCount");
const cartTotal = document.getElementById("cartTotal");


/* =========================================
   SAVE CART
========================================= */

function saveCart() {

    localStorage.setItem(
        "savoraCart",
        JSON.stringify(cart)
    );

}


/* =========================================
   FORMAT PRICE
========================================= */

function formatCartPrice(price) {

    return new Intl.NumberFormat("en-NG", {
        style: "currency",
        currency: "NGN",
        maximumFractionDigits: 0
    }).format(price);

}


/* =========================================
   ADD ITEM TO CART
========================================= */

function addToCart(id) {

    const item = menuItems.find(
        product => product.id === id
    );

    if (!item) return;

    const existingItem = cart.find(
        product => product.id === id
    );

    if (existingItem) {

        existingItem.quantity += 1;

    } else {

        cart.push({
            id: item.id,
            name: item.name,
            price: item.price,
            image: item.image,
            quantity: 1
        });

    }

    saveCart();
    renderCart();

    openCart();

}


/* =========================================
   REMOVE ITEM
========================================= */

function removeFromCart(id) {

    cart = cart.filter(
        item => item.id !== id
    );

    saveCart();
    renderCart();

}


/* =========================================
   CHANGE QUANTITY
========================================= */

function changeQuantity(id, change) {

    const item = cart.find(
        product => product.id === id
    );

    if (!item) return;

    item.quantity += change;

    if (item.quantity <= 0) {

        removeFromCart(id);
        return;

    }

    saveCart();
    renderCart();

}


/* =========================================
   CALCULATE TOTAL
========================================= */

function calculateCartTotal() {

    return cart.reduce(
        (total, item) => {

            return total +
                item.price * item.quantity;

        },
        0
    );

}


/* =========================================
   CALCULATE ITEM COUNT
========================================= */

function calculateCartCount() {

    return cart.reduce(
        (total, item) => {

            return total + item.quantity;

        },
        0
    );

}


/* =========================================
   RENDER CART
========================================= */

function renderCart() {

    if (!cartItemsContainer) return;


    /* Empty cart */

    if (cart.length === 0) {

        cartItemsContainer.innerHTML = `
            <p class="empty-cart">
                Your cart is empty.
            </p>
        `;

    } else {

        cartItemsContainer.innerHTML = cart
            .map(item => {

                return `
                    <div class="cart-item">

                        <div class="cart-item-image">

                            <img
                                src="${item.image}"
                                alt="${item.name}"
                            >

                        </div>


                        <div class="cart-item-info">

                            <h3>
                                ${item.name}
                            </h3>

                            <p>
                                ${formatCartPrice(item.price)}
                            </p>


                            <div class="cart-item-controls">

                                <button
                                    class="quantity-btn"
                                    data-action="decrease"
                                    data-id="${item.id}"
                                >
                                    −
                                </button>

                                <span>
                                    ${item.quantity}
                                </span>

                                <button
                                    class="quantity-btn"
                                    data-action="increase"
                                    data-id="${item.id}"
                                >
                                    +
                                </button>

                            </div>

                        </div>


                        <button
                            class="remove-cart-item"
                            data-action="remove"
                            data-id="${item.id}"
                            aria-label="Remove ${item.name}"
                        >
                            ×
                        </button>

                    </div>
                `;

            })
            .join("");

    }


    /* Update count */

    if (cartCount) {

        cartCount.textContent =
            calculateCartCount();

    }


    /* Update total */

    if (cartTotal) {

        cartTotal.textContent =
            formatCartPrice(
                calculateCartTotal()
            );

    }

}


/* =========================================
   CART ITEM BUTTONS
========================================= */

if (cartItemsContainer) {

    cartItemsContainer.addEventListener(
        "click",
        event => {

            const button =
                event.target.closest("button");

            if (!button) return;

            const id =
                Number(button.dataset.id);

            const action =
                button.dataset.action;


            if (action === "increase") {

                changeQuantity(id, 1);

            }


            if (action === "decrease") {

                changeQuantity(id, -1);

            }


            if (action === "remove") {

                removeFromCart(id);

            }

        }
    );

}


/* =========================================
   OPEN CART
========================================= */

function openCart() {

    if (!cartDrawer) return;

    cartDrawer.classList.add("active");

    document.body.classList.add("no-scroll");

}


/* =========================================
   CLOSE CART
========================================= */

function closeCart() {

    if (!cartDrawer) return;

    cartDrawer.classList.remove("active");

    document.body.classList.remove("no-scroll");

}


/* =========================================
   CART BUTTON
========================================= */

if (cartButton) {

    cartButton.addEventListener(
        "click",
        openCart
    );

}


/* =========================================
   CLOSE CART BUTTON
========================================= */

if (closeCartButton) {

    closeCartButton.addEventListener(
        "click",
        closeCart
    );

}


/* =========================================
   INITIALIZE
========================================= */

renderCart();