#!/bin/bash

# Check if the target directory is provided as an argument
if [ "$#" -eq 2 ]; then
    TARGET_DIR="$1"
    TARGET_URL="$2"
else
    echo "Usage: ./open_terminal.sh /path/to/your/directory"
    exit 1
fi

wmctrl -s 0
wmctrl -l | awk '$2 == "0" {print $1}' | while read -r win_id; do
    wmctrl -i -r "$win_id" -t 1
done

# Open a new terminal window and go to the target directory
mkdir -p "$TARGET_DIR/pic"
gnome-terminal --working-directory="$TARGET_DIR" -e "nvim memo.md"
google-chrome --new-window "$TARGET_URL"

# wmctrl -l | grep -i "Udemy" | awk '{print $1}' | while read -r line | wmctrl -i -r "$line" -t 0 ## don't need any more, but this can be a reference

