const searchInput = document.getElementById('searchInput');
const searchBtn = document.getElementById('searchBtn');
const clearBtn = document.getElementById('clearBtn');
const searchStatus = document.getElementById('searchStatus');
const loader = document.getElementById('loader');
const noResultsMsg = document.getElementById('noResultsMsg');
const resultsDiv = document.getElementById("results");
const deckContent = document.getElementById("deckContent");
const numCardsBadge = document.querySelector(".num-cards");

let deck = [];

function addToDeck(name, img, price) {
    if (deck.length >= 60) {
        alert("Deck is full! (60/60)");
        return;
    }
    const cardPrice = price === "N/A" ? 0 : parseFloat(price);
    deck.push({ name, img, price: cardPrice });
    updateDeck();
}

function updateDeck() {
    deckContent.innerHTML = "";
    let totalPrice = 0;

    deck.forEach((card, index) => {
        totalPrice += card.price;
        
        const deckCardHTML = `
            <div class="deck-card">
                <img src="${card.img}" alt="${card.name}" loading="lazy">
                <p class="deck-card-price">Price: $${card.price.toFixed(2)}</p>
                <button class="remove-btn" onclick="removeFromDeck(${index})">-</button>
            </div>
        `;
        deckContent.insertAdjacentHTML("beforeend", deckCardHTML);
    });

    updateTotalPrice(totalPrice);
    numCardsBadge.textContent = `${deck.length}/60 cards`;
}

function updateTotalPrice(total) {

    let totalElement = document.getElementById("deckTotalDisplay");
    if (!totalElement) {
        totalElement = document.createElement("div");
        totalElement.id = "deckTotalDisplay";
        document.getElementById("deck-view").appendChild(totalElement);
    }
    totalElement.innerHTML = `<h3>Total Deck Value: $${total.toFixed(2)}</h3>`;
}

function removeFromDeck(index) {
    deck.splice(index, 1);
    updateDeck();
}

function clearSearch() {
    searchInput.value = '';
    searchStatus.textContent = '';
}



async function loadDeckFromDatabase() {
    const response = await fetch('/api/get-deck');
    const data = await response.json();
        
    if (response.ok) {

        deck = data.map(card => ({
            name: card.name,
            img: card.image_url,
            price: card.market_price
        }));
        updateDeck();
    }
}

searchBtn.addEventListener("click", async () => {
    const term = searchInput.value.trim();
    if (!term) return;
    
    resultsDiv.innerHTML = "";
    noResultsMsg.classList.add("hidden");
    loader.classList.remove("hidden");

    const response = await fetch(`/api/search?term=${term}`);
    const cards = await response.json();
    
    loader.classList.add("hidden");
    
    if (!data.data || data.data.length === 0) {
        noResultsMsg.classList.remove("hidden");
        return;
    }

    cards.forEach(card => {
        const cardHTML = `
            <div class="result-card">
                <img src="${card.img}" alt="${card.name}" loading="lazy">
                <p class="price">Price: ${card.price !== "N/A" ? `$${card.price.toFixed(2)}` : card.price}</p>
                <button class="add-to-deck-btn" onclick="addToDeck('${card.name}', '${card.img}', '${card.price}')">Add to Deck</button>
            </div>
        `;
        resultsDiv.insertAdjacentHTML("beforeend", cardHTML);
    });
});

clearBtn.addEventListener('click', clearSearch);
loadDeckFromDatabase();