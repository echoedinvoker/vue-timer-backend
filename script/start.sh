#!/bin/bash

# Check if the target directory is provided as an argument
if [ "$#" -eq 2 ]; then
    TARGET_DIR="$1"
    TARGET_URL="$2"
else
    echo "Usage: ./open_terminal.sh /path/to/your/directory"
    exit 1
fi

# Open a new terminal window and go to the target directory
mkdir -p "$TARGET_DIR/pic"
gnome-terminal --working-directory="$TARGET_DIR" -e "nvim memo.md"
google-chrome "$TARGET_URL"

