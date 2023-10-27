class SpotifyClient {

    call(path : string) {

        this.refresh();

        let regex = /accessToken=(.[^;]*)/ig;
        let match = regex.exec(document.cookie);
        const accessToken = match && match[1];

        console.error(accessToken);
        return fetch("https://api.spotify.com/v1" + path, {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          })
        .then(r => r.json())
        .catch(e => {
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
        .then(r => r.json())
    }
}

export default SpotifyClient;