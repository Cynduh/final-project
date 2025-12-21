import { supabase } from '../../lib/supabase';

export default async function handler(req, res) {
    if (req.method !== 'DELETE') {
        return res.status(405).json({ message: 'Method not allowed' });
    }

    const { name } = req.body;
    try {
        const { error } = await supabase
            .from('deck')
            .delete()
            .eq('name', name);

        if (error) throw error;

        return res.status(200).json({ message: 'Deleted successfully' });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}