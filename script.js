// Replace this URL with your server's Query API or backend endpoint
const SERVER_API = 'https://api.mcsrvstat.us/2/it24.feathermc.gg';

// Fetch server stats and update the page
async function fetchServerStats() {
  try {
    const response = await fetch(SERVER_API);
    const data = await response.json();

    // Check if the server is online
    if (data.online) {
      // Update Uptime
      document.getElementById('uptime').textContent = 'Online';

      // Update Players Online
      document.getElementById('players-online').textContent = `${data.players.online} / ${data.players.max}`;

      // Update Player List
      const playerList = data.players.list ? data.players.list.join(', ') : 'No players online';
      document.getElementById('player-list').textContent = playerList;
    } else {
      document.getElementById('uptime').textContent = 'Offline';
      document.getElementById('players-online').textContent = '0';
      document.getElementById('player-list').textContent = 'No players online';
    }
  } catch (error) {
    console.error('Failed to fetch server stats:', error);
    document.getElementById('uptime').textContent = 'Error fetching data';
    document.getElementById('players-online').textContent = 'N/A';
    document.getElementById('player-list').textContent = 'N/A';
  }
}

// Fetch stats every 30 seconds
fetchServerStats();
setInterval(fetchServerStats, 30000);
