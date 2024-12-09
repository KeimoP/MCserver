const SERVER_API = 'https://api.mcsrvstat.us/2/it24.feathermc.gg';

async function fetchServerStats() {
    try {
        const response = await fetch(SERVER_API);
        const data = await response.json();

        // Current time for "Last Updated"
        const now = new Date();
        const formattedTime = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });

        // Server stats
        document.getElementById('uptime').textContent = data.online ? 'Online' : 'Offline';
        document.getElementById('last-updated').textContent = `Last updated at ${formattedTime}`;
        document.getElementById('server-version').textContent = data.version || 'Unknown';
        document.getElementById('players-online').textContent = `${data.players.online || 0} / ${data.players.max || 0}`;

        // Player faces
        const facesContainer = document.getElementById('player-faces');
        facesContainer.innerHTML = '';
        if (data.players.list) {
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
    } catch (error) {
        console.error('Failed to fetch server stats:', error);
        document.getElementById('uptime').textContent = 'Error fetching data';
        document.getElementById('players-online').textContent = 'N/A';
        document.getElementById('player-faces').textContent = '';
    }
}

// Fetch data every 30 seconds
fetchServerStats();
setInterval(fetchServerStats, 30000);

// Create snowflakes
for (let i = 0; i < 50; i++) {
    const snowflake = document.createElement('div');
    snowflake.classList.add('snowflake');
    snowflake.style.setProperty('--i', i);
    document.body.appendChild(snowflake);
}
