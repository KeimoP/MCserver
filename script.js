const SERVER_API = 'https://api.mcsrvstat.us/2/it24.feathermc.gg';

async function fetchServerStats() {
    try {
        // Fetching server data from the API
        const response = await fetch(SERVER_API);

        // Check if the response is successful
        if (!response.ok) {
            throw new Error('Server not reachable');
        }

        const data = await response.json();

        // Log the entire response to debug
        console.log(data);

        if (!data.online) {
            document.getElementById('uptime').textContent = 'Offline';
            document.getElementById('players-online').textContent = 'N/A';
            document.getElementById('server-version').textContent = 'N/A';
            return;
        }

        // Server stats
        document.getElementById('uptime').textContent = data.online ? 'Online' : 'Offline';
        document.getElementById('last-updated').textContent = `Last updated at ${new Date().toLocaleTimeString()}`;
        document.getElementById('server-version').textContent = data.version || 'Unknown';
        document.getElementById('players-online').textContent = `${data.players.online || 0} / ${data.players.max || 0}`;

        // Display player faces if players are online
        const facesContainer = document.getElementById('player-faces');
        facesContainer.innerHTML = ''; // Clear previous player faces
        if (data.players.list && data.players.list.length > 0) {
            data.players.list.forEach(player => {
                const img = document.createElement('img');
                img.src = `https://minotar.net/avatar/${player}`;
                img.alt = player;
                img.title = player;
                facesContainer.appendChild(img);
            });
        } else {
            facesContainer.textContent = 'No players online';
        }

        // Display player playtimes
        const playtimeList = document.getElementById('playtime-list');
        playtimeList.innerHTML = ''; // Clear previous playtimes
        if (data.players.list) {
            data.players.list.forEach(player => {
                const listItem = document.createElement('li');
                listItem.textContent = `${player}: Playing time - Unknown`; // Replace with actual playtime if available
                playtimeList.appendChild(listItem);
            });
        }
    } catch (error) {
        console.error('Error fetching server stats:', error);
        document.getElementById('uptime').textContent = 'Error';
        document.getElementById('players-online').textContent = 'N/A';
        document.getElementById('server-version').textContent = 'N/A';
        document.getElementById('player-faces').textContent = 'Error fetching player data';
    }
}

// Fetch data on page load and set interval for every 30 seconds
fetchServerStats();
setInterval(fetchServerStats, 30000);
