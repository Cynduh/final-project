export default async function handler(req, res) {
  const { term } = req.query;

  if (!term) {
    return res.status(400).json({ error: "Search term is required" });
  }

  try {
    const url = new URL("https://api.pokemontcg.io/v2/cards");
    url.search = new URLSearchParams({
      q: `name:${term}*`,
      pageSize: "250",
      orderBy: "name",
      select: "name,images,tcgplayer"
    }).toString();

    const response = await fetch(url, {
      headers: { "X-Api-Key": process.env.POKEMON_TCG_API_KEY }
    });

    const data = await response.json();

    const Cards = data.data.map(card => {
      const priceInfo = card.tcgplayer?.prices;
      const marketPrice = Object.values(priceInfo || {})[0]?.market ?? "N/A";
      
      return {
        name: card.name,
        img: card.images.small,
        price: marketPrice
      };
    });

    res.status(200).json(Cards);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch from Pokémon API" });
  }
}