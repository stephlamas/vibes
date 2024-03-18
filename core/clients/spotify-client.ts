class SpotifyClient {

    async call(path : string) {

        await this.refresh();

        let regex = /accessToken=(.[^;]*)/ig;
        let match = regex.exec(document.cookie);
        const accessToken = match && match[1];

        return fetch("https://api.spotify.com/v1" + path, {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          })
        .then(r => r.json())
        .catch(() => {
            throw new Error("Failed!");
        });        
    }

    private refresh() {
        let regex = /refreshToken=(.[^;]*)/ig;
        let match = regex.exec(document.cookie);
        const refreshToken = match && match[1];
            
        fetch('/api/spotify-refresh-token', { 
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                refreshToken: refreshToken
            })
        })
        .then(response => {
            if (response.ok && response.status !== 204) {
                return response.json();
            } else {
                return response.text().then(text => {
                    let errorMsg = `Network response was not ok. Status: ${response.status}`;
                    if (text) {
                        errorMsg += ` - Body: ${text}`;
                    }
                    throw new Error(errorMsg);
                });
            }
        })
    }
    getTopItems(type: string, time_range = 'long_term', limit = 50) {
        return this.call(`/me/top/${type}?time_range=${time_range}&limit=${limit}`);
    }

    async getUserId() {
        const userData = await this.call('/me');
        return userData.id;
    }

    async getUserCountryCode() {
        const userData = await this.call('/me');
        return userData.country;
    }
}

export default SpotifyClient;