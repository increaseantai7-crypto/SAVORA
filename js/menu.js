/* =========================================
   SAVORA — MENU & UI
========================================= */


/* =========================================
   MENU DATA
========================================= */

const menuItems = [
    {
        id: 1,
        name: "Savora Jollof",
        category: "mains",
        price: 8500,
        description: "Smoky Nigerian-style jollof rice served with grilled chicken and vegetables.",
        image: "https://images.unsplash.com/photo-1603133872878-684f208fb84b?auto=format&fit=crop&w=900&q=85"
    },

    {
        id: 2,
        name: "Herb Grilled Chicken",
        category: "mains",
        price: 9500,
        description: "Tender grilled chicken finished with fresh herbs and a delicate house sauce.",
        image: "https://images.unsplash.com/photo-1532550907401-a500c9a57435?auto=format&fit=crop&w=900&q=85"
    },

    {
        id: 3,
        name: "Creamy Seafood Pasta",
        category: "mains",
        price: 11000,
        description: "Creamy pasta with prawns, herbs, garlic, and carefully selected seafood.",
        image: "https://images.unsplash.com/photo-1473093295043-cdd812d0e601?auto=format&fit=crop&w=900&q=85"
    },

    {
        id: 4,
        name: "Crispy Calamari",
        category: "starters",
        price: 6500,
        description: "Lightly seasoned calamari served crisp with our signature dipping sauce.",
        image: "https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?auto=format&fit=crop&w=900&q=85"
    },

    {
        id: 5,
        name: "Savora Bruschetta",
        category: "starters",
        price: 5000,
        description: "Toasted artisan bread topped with tomatoes, herbs, olive oil, and fresh basil.",
        image: "https://images.unsplash.com/photo-1572695157366-5e585ab2b69f?auto=format&fit=crop&w=900&q=85"
    },

    {
        id: 6,
        name: "Golden Cheesecake",
        category: "desserts",
        price: 5500,
        description: "Smooth baked cheesecake finished with a delicate golden caramel glaze.",
        image: "https://images.unsplash.com/photo-1565958011703-44f9829ba187?auto=format&fit=crop&w=900&q=85"
    },

    {
        id: 7,
        name: "Chocolate Obsession",
        category: "desserts",
        price: 6000,
        description: "Rich chocolate dessert layered with smooth cream and dark chocolate.",
        image: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=900&q=85"
    },

    {
        id: 8,
        name: "Savora Citrus",
        category: "drinks",
        price: 3500,
        description: "Refreshing citrus blend with lemon, orange, mint, and sparkling water.",
        image: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=900&q=85"
    },

    {
        id: 9,
        name: "Berry Fizz",
        category: "drinks",
        price: 4000,
        description: "A refreshing blend of berries, citrus, and sparkling water.",
        image: "https://images.unsplash.com/photo-1544145945-f90425340c7e?auto=format&fit=crop&w=900&q=85"
    }
];


/* =========================================
   DOM ELEMENTS
========================================= */

const menuGrid = document.getElementById("menuGrid");
const filterButtons = document.querySelectorAll(".filter-btn");

const menuToggle = document.getElementById("menuToggle");
const mobileMenu = document.getElementById("mobileMenu");
const mobileMenuClose = document.getElementById("mobileMenuClose");

const mobileMenuLinks = document.querySelectorAll(".mobile-menu a");

const openAiButton = document.getElementById("openAiButton");
const closeAiButton = document.getElementById("closeAiButton");
const aiModal = document.getElementById("aiModal");

const aiSendButton = document.getElementById("aiSendButton");
const aiInput = document.getElementById("aiInput");
const aiResponse = document.getElementById("aiResponse");

const reservationForm = document.getElementById("reservationForm");


/* =========================================
   FORMAT PRICE
========================================= */

function formatPrice(price) {
    return new Intl.NumberFormat("en-NG", {
        style: "currency",
        currency: "NGN",
        maximumFractionDigits: 0
    }).format(price);
}


/* =========================================
   CREATE MENU CARD
========================================= */

function createMenuCard(item) {

    return `
        <article class="menu-card">

            <div class="menu-card-image">

                <img
                    src="${item.image}"
                    alt="${item.name}"
                    loading="lazy"
                >

            </div>

            <div class="menu-card-content">

                <div class="menu-card-top">

                    <h3>
                        ${item.name}
                    </h3>

                    <span class="menu-price">
                        ${formatPrice(item.price)}
                    </span>

                </div>

                <p class="menu-card-description">
                    ${item.description}
                </p>

                <button
                    class="add-to-cart"
                    data-id="${item.id}"
                >
                    Add to Cart
                </button>

            </div>

        </article>
    `;
}


/* =========================================
   DISPLAY MENU
========================================= */

function displayMenu(category = "all") {

    if (!menuGrid) return;

    const filteredItems =
        category === "all"
            ? menuItems
            : menuItems.filter(item => item.category === category);

    menuGrid.innerHTML = filteredItems
        .map(createMenuCard)
        .join("");
}


/* =========================================
   MENU FILTERS
========================================= */

filterButtons.forEach(button => {

    button.addEventListener("click", () => {

        filterButtons.forEach(btn => {
            btn.classList.remove("active");
        });

        button.classList.add("active");

        const category = button.dataset.category;

        displayMenu(category);

    });

});


/* =========================================
   MOBILE MENU
========================================= */

function openMobileMenu() {

    mobileMenu.classList.add("active");
    document.body.classList.add("no-scroll");

}


function closeMobileMenu() {

    mobileMenu.classList.remove("active");
    document.body.classList.remove("no-scroll");

}


if (menuToggle) {

    menuToggle.addEventListener(
        "click",
        openMobileMenu
    );

}


if (mobileMenuClose) {

    mobileMenuClose.addEventListener(
        "click",
        closeMobileMenu
    );

}


mobileMenuLinks.forEach(link => {

    link.addEventListener(
        "click",
        closeMobileMenu
    );

});


/* =========================================
   AI MODAL
========================================= */

function openAiModal() {

    aiModal.classList.add("active");
    document.body.classList.add("no-scroll");

    setTimeout(() => {

        if (aiInput) {
            aiInput.focus();
        }

    }, 200);

}


function closeAiModal() {

    aiModal.classList.remove("active");
    document.body.classList.remove("no-scroll");

}


if (openAiButton) {

    openAiButton.addEventListener(
        "click",
        openAiModal
    );

}


if (closeAiButton) {

    closeAiButton.addEventListener(
        "click",
        closeAiModal
    );

}


/* Close AI modal when clicking outside */

if (aiModal) {

    aiModal.addEventListener("click", event => {

        if (event.target === aiModal) {
            closeAiModal();
        }

    });

}


/* =========================================
   TEMPORARY AI RESPONSE
========================================= */

function handleAiMessage() {

    if (!aiInput || !aiResponse) return;

    const message = aiInput.value.trim();

    if (!message) {

        aiResponse.textContent =
            "Tell me what you're craving first.";

        return;

    }

    aiResponse.innerHTML = `
        <strong>Savora AI</strong>
        <p>
            I received your request. Soon, I'll be connected
            to Savora's AI engine to recommend dishes based
            on your preferences.
        </p>
    `;

    aiInput.value = "";

}


if (aiSendButton) {

    aiSendButton.addEventListener(
        "click",
        handleAiMessage
    );

}


if (aiInput) {

    aiInput.addEventListener("keydown", event => {

        if (event.key === "Enter") {
            handleAiMessage();
        }

    });

}


/* =========================================
   RESERVATION FORM
========================================= */

if (reservationForm) {

    reservationForm.addEventListener("submit", event => {

        event.preventDefault();

        const formData =
            new FormData(reservationForm);

        const name =
            formData.get("guestName");

        alert(
            `Thank you, ${name}! Your reservation request has been received.`
        );

        reservationForm.reset();

    });

}


/* =========================================
   INITIALIZE
========================================= */

displayMenu();