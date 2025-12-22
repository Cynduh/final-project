# final-project
# Part 1
1. Pokemon Deck builder
2. The Pokemon Deck builder helps create a pokemon deck for a tournament by selecting and adding cards 
from a pokemon database to your deck. The website will allow for users to add and delete cards from their decks
and they will be able to know how much their deck will cost after each addition of cards to the deck.
3. The target browser for this project is google chrome 
<a name="developer-manual"></a>

# Part 2
Develop Manual <br>
To clone the repository do:
```
https://github.com/Cynduh/final-project.git
```
This project uses Node.js and requires next, react, react-dom, and @supabase/supabase-js<br>
To install:
```
npm install
```
Create a .env.local file with the following keys<br>
- NEXT_PUBLIC_SUPABASE_URL
- NEXT_PUBLIC_SUPABASE_ANON_KEY
- POKEMON_TCG_API_KEY
# To run it
To run the application do:
```
npm run dev
```
Use the link http://localhost:3000/index.html to access the website
# Testing: 
Currently the system uses maunal testing<br>
- To see if the API is working, use the search bar to look up a pokemon to verify for a return in data<br>
- Use the add and delete buttons and see if the card is added or removed from the deck and the database<br>
# Server API documentation
- /api/search.js is a GET method that finds the pokemon card and returns certain data<br>
- /api/get-deck.js is a GET method that fetches all the data from Supabase deck table to populate the user's collection.
- /api/add-card.js is a POST method that adds the data collection to the Supabase database
- /api/delete-card.js is a DELETE method that deletes a specific card by its id
# Bugs 
- Some of the cards may have a price tag of "N/A" due to it being too new
- Some of the pokemon cards do not have pictures
- the search function takes a while to load the results
# Road map
- make the search feature fast to load results
- make it so that the user can save a deck and name it
- make more features related the uniqueness of the deck
