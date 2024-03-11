export async function getEventById(id: string) {
    const res = await fetch(`/api/event-by-id?id=${id}`);
    return await res.json();
}

export async function getEventByArtist(artist: string) {
    const res = await fetch(`/api/event-by-artist?artist=${artist}`);
    return await res.json();
}

export async function getEventsByCountryCode(countryCode: string) {
    const res = await fetch(`/api/events-by-country?countryCode=${countryCode}`);
    console.log('Eventos por código de país:', res);
    return await res;
}