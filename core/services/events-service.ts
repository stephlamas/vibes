export async function getEventById(id: string) {
    const res = await fetch(`/api/event-by-id?id=${id}`);
    return await res.json();
}
