export default function favoritesClient() {
    const res = 'http://localhost:3000/api/user-favorite-event';
    return {
        fav: async function (userId: any, eventId: any) {
            const cfg = { method: 'POST', body: JSON.stringify({ userId, eventId }) };
            await fetch(res, cfg);
        },
        unfav: async function (userId: any, eventId: any) {
            const cfg = { method: 'DELETE', body: JSON.stringify({ userId, eventId }) };
            await fetch(res, cfg);

        },
        isFav: async function (userId: any, eventId: any) {
            const r = await fetch(`${res}?userId=${userId}&eventId=${eventId}`);
            const j = await r.json();
            return j.isFavorite;
        }
    }
}