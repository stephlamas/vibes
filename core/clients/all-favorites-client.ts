const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

export default function allFavoritesClient() {
    const res = `${apiUrl}/api/user-all-favorite-events`;
    return {
        allFav: async function (userId: any) {
            const r = await fetch(`${res}?userId=${userId}`);
            const j = await r.json();
            return j.favoriteEvents;
        }
    }
}
