#!/bin/bash

# Rename all `index.md` post files to `index.mdx` files

# Base directory containing posts
post_dir="src/content/posts"

# Loop through all subdirectories in the post directory
for slug_dir in "$post_dir"/*; do
  # Check if it's a directory (avoid files)
  if [[ -d "$slug_dir" ]]; then
    # Get the path to the index.md file
    index_file="$slug_dir/index.md"

    # Check if the file exists
    if [[ -f "$index_file" ]]; then
      # Construct the new filename with the slug directory and replace "md" with "mdx"
      new_file="${index_file%.*}.mdx"

      # Rename the file only if it doesn't already exist at the new path
      if [[ ! -f "$new_file" ]]; then
        mv "$index_file" "$new_file"
        echo "Renamed index.md to index.mdx in $slug_dir"
      fi
    fi
  fi
done

echo "All valid index.md files renamed!"
