const leaderboardElement = document.getElementById('leaderboard');
let traders = {};

const socket = io('wss://client-api-2-74b1891ee9f9.herokuapp.com', {
    transports: ['websocket'],
    upgrade: false
});

// This socket listens on the same events but is focused on leaderboard updates
socket.on('tradeCreated', (newTrade) => {
    if (!traders[newTrade.user]) {
        traders[newTrade.user] = { totalTrades: 0, trades: [] };
    }
    traders[newTrade.user].totalTrades += 1;
    traders[newTrade.user].trades.push(newTrade);

    updateLeaderboard();
});

function updateLeaderboard() {
    // Sort traders by total trades
    const sortedTraders = Object.entries(traders).sort((a, b) => b[1].totalTrades - a[1].totalTrades);

    leaderboardElement.innerHTML = '';
    sortedTraders.forEach(trader => {
        const row = document.createElement('tr');
        row.innerHTML = `<td>${trader[0]}</td><td>${trader[1].totalTrades}</td>`;
        leaderboardElement.appendChild(row);
    });
}

// Optionally call updateLeaderboard at the start if needed
updateLeaderboard();