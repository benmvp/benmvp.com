#!/bin/bash

## Migrate images from within the posts directory to the public directory

# Source directory with posts and their images
source_dir="src/content/posts"

# Destination directory for images
dest_dir="public/images/posts"

# Loop through all directories in the source directory
for slug_dir in "$source_dir"/*; do
  # Check if it's a directory (avoid files)
  if [[ -d "$slug_dir" ]]; then
    # Extract the slug from directory name
    slug="${slug_dir##*/}"

    # Create the destination directory for the slug if it doesn't exist
    mkdir -p "$dest_dir/$slug"

    # Move all image files within the current directory to the destination
    mv "$slug_dir"/*.jpg  "$slug_dir"/*.jpeg "$slug_dir"/*.png "$slug_dir"/*.gif "$dest_dir/$slug/"
  fi
done

echo "Image files moved successfully!"
