import { supabase } from '../../lib/supabase';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { name, image_url, market_price } = req.body;

    const { data, error } = await supabase
      .from('deck')
      .insert([{ name, image_url, market_price }])
      .select();

    if (error) return res.status(500).json({ error: error.message });
    return res.status(200).json({ message: 'Saved!', data });
  }
}