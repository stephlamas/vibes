export default function allFavoritesClient() {
    const res = 'http://localhost:3000/api/user-all-favorite-events';
    return {
        allFav: async function (userId: any) {
            const r = await fetch(`${res}?userId=${userId}`);
            const j = await r.json();
            return j.favoriteEvents;
        }
    }
}