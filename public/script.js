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

async function addToDeck(name, img, price) {
    if (deck.length >= 60) {
        alert("Deck is full! (60/60)");
        return;
    }
    try {
        const response = await fetch('/api/add-card', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ 
                name: name, 
                image_url: img,
                market_price: price
            }),
        });

        if (response.ok) {
            console.log("Card successfully saved to Supabase!");
            const cardPrice = price === "N/A" ? 0 : parseFloat(price);
            deck.push({ name, img, price: cardPrice });
            updateDeck();   
        } else {
            const errorData = await response.json();
            alert("Failed to save card: " + errorData.error);
        }
    } catch (err) {
        console.error("Network error:", err);
    }
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

async function removeFromDeck(index) {
    const cardTodDelete = deck[index];
    try {
        const response = await fetch('/api/delete-card', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },  
            body: JSON.stringify({ 
                id: cardTodDelete.id
            }),
        });
        if (response.ok) {
            deck.splice(index, 1);
            updateDeck();
        } else {
            const errorData = await response.json();
            alert("Failed to delete card: " + errorData.error);
        }
    } catch (err) {
        console.error("Network error:", err);
    }
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

function clearSearch() {
    searchInput.value = '';
}



async function loadDeckFromDatabase() {
    const response = await fetch('/api/get-deck');
    const data = await response.json();
        
    if (response.ok) {

        deck = data.map(card => ({
            id:card.id,
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
    
    if (!cards || cards.length === 0) {
        noResultsMsg.classList.remove("hidden");
        return;
    }

    cards.forEach(card => {
        const cardHTML = `
            <div class="result-card">
                <img src="${card.img}" alt="${card.name}" loading="lazy">
                <p class="name"><strong>${card.name}</strong></p>
                <p class="price">Price: ${card.price !== "N/A" ? `$${card.price.toFixed(2)}` : "N/A"}</p>
                <button class="add-btn" onclick="addToDeck('${card.name.replace(/'/g, "\\'")}', '${card.img}', '${card.price}')">Add to Deck</button>
            </div>
        `;
        resultsDiv.insertAdjacentHTML('beforeend', cardHTML);
    });
});

clearBtn.addEventListener('click', clearSearch);
loadDeckFromDatabase();