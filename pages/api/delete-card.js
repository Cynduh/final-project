import { supabase } from '../../lib/supabase';

export default async function handler(req, res) {
    if (req.method !== 'DELETE') {
        return res.status(405).json({ message: 'Method not allowed' });
    }

    const { id } = req.body;
        const { error } = await supabase
            .from('deck')
            .delete()
            .eq('id', id);

        if (error) throw error;
        return res.status(200).json({ message: 'Deleted successfully' });
}
    