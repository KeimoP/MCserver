const SERVER_API = 'peaminister.aternos.me:37118';

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
            document.getElementById('player-avatars').textContent = 'No players online';
            return;
        }

        // Server stats
        document.getElementById('uptime').textContent = data.online ? 'Online' : 'Offline';
        document.getElementById('last-updated').textContent = `Last updated at ${new Date().toLocaleTimeString()}`;
        document.getElementById('server-version').textContent = data.version || 'Unknown';
        document.getElementById('players-online').textContent = `${data.players.online || 0} / ${data.players.max || 0}`;

        // Display player faces and names if players are online
        const avatarsContainer = document.getElementById('player-avatars');
        avatarsContainer.innerHTML = ''; // Clear previous player faces
        if (data.players.list && data.players.list.length > 0) {
            data.players.list.forEach(player => {
                const playerDiv = document.createElement('div');
                playerDiv.classList.add('player');

                const playerImg = document.createElement('img');
                playerImg.src = `https://minotar.net/avatar/${player}`;
                playerImg.alt = player;

                const playerName = document.createElement('span');
                playerName.classList.add('name');
                playerName.textContent = player;

                playerDiv.appendChild(playerImg);
                playerDiv.appendChild(playerName);

                avatarsContainer.appendChild(playerDiv);
            });
        } else {
            avatarsContainer.textContent = 'No players online';
        }

    } catch (error) {
        console.error('Error fetching server stats:', error);
        document.getElementById('uptime').textContent = 'Error';
        document.getElementById('players-online').textContent = 'N/A';
        document.getElementById('server-version').textContent = 'N/A';
        document.getElementById('player-avatars').textContent = 'Error fetching player data';
    }
}

// Fetch data on page load and set interval for every 30 seconds
fetchServerStats();
setInterval(fetchServerStats, 30000);
