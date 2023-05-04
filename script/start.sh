#!/bin/bash

# Check if the target directory is provided as an argument
if [ "$#" -eq 2 ]; then
    TARGET_DIR="$j1"
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
gnome-terminal --working-directory="$TARGET_DIR" -e "nvim $TARGET_DIR/memo.md"
google-chrome --new-window "$TARGET_URL"


# Move vue-timer to ws0 corner
WIN_ID=$(wmctrl -l | grep -E ' vue-timer' | awk '{print $1}')

if [ -n "$WIN_ID" ]; then
    wmctrl -ir $WIN_ID -t 0
    wmctrl -ir $WIN_ID -e 0,1670,940,-1,-1
    wmctrl -ir $WIN_ID -b add,above,sticky
else
    echo "Window 'vue-timer' not found."
fi

# Move Udemy window to ws0, but if its on other monitor, this will fail

WIN_ID=$(wmctrl -l | grep -E ' Udemy' | awk '{print $1}')

if [ -n "$WIN_ID" ]; then
    wmctrl -ir $WIN_ID -t 0
    wmctrl -ir $WIN_ID -b add,fullscreen
fi


# wmctrl -l | grep -i "Udemy" | awk '{print $1}' | while read -r line | wmctrl -i -r "$line" -t 0 ## don't need any more, but this can be a reference

