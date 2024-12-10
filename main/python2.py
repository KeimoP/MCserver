import yaml
import json
import os

# Path to your playerdata.yml file (adjust this if necessary)
PLAYERDATA_PATH = 'C:\\Users\\Keimo\\AppData\\Roaming\\.feather\\player-server\\servers\\f209f8b7-5e1d-4ebb-b6d1-8cf0d92ec8ea\\plugins\\Essentials\\userdata'

def convert_to_json():
    playtime_data = {}

    # Loop through all the player data files (each player has a YAML file in the playerdata folder)
    for filename in os.listdir(PLAYERDATA_PATH):
        if filename.endswith('.yml'):
            player_name = filename.replace('.yml', '')
            file_path = os.path.join(PLAYERDATA_PATH, filename)

            # Open and load the YAML file for this player
            with open(file_path, 'r') as file:
                player_data = yaml.safe_load(file)

                # Get the playtime data (in ticks, which is 20 ticks per second)
                if player_data and 'stats' in player_data and 'totalPlayTime' in player_data['stats']:
                    total_playtime_ticks = player_data['stats']['totalPlayTime']
                    total_playtime_seconds = total_playtime_ticks / 20  # Convert ticks to seconds

                    playtime_data[player_name] = {
                        'playtime': total_playtime_seconds
                    }

    # Save the playtime data as a JSON file
    with open('playtime.json', 'w') as json_file:
        json.dump(playtime_data, json_file, indent=4)

# Run the function to create the JSON file
convert_to_json()
