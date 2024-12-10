import json

# Sample data, you need to extract real data from your server
playtime_data = {
    "player1": {"playtime": 1200},  # 1200 seconds = 20 minutes
    "player2": {"playtime": 5400},  # 5400 seconds = 90 minutes
}

# Save playtime data to a JSON file
with open("playtime.json", "w") as file:
    json.dump(playtime_data, file, indent=4)
