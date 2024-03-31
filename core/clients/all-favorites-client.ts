const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

export default function allFavoritesClient() {
    const res = `${apiUrl}/api/user-all-favorite-events`;
    return {
        allFav: async function (userId: any) {
            try {
                const r = await fetch(`${res}?userId=${userId}`);
                if(r.status === 404) {
                    return []
                }
                if (!r.ok) {
                    throw new Error('Failed to fetch favorite events');
                }
                const j = await r.json();
                if (!j || !j.favoriteEvents) {
                    throw new Error('Favorite events not found in response');
                }
                return j.favoriteEvents;
            } catch (error) {
                console.error('Error fetching favorite events:', error);
                throw error; 
            }
        }
    }
}
