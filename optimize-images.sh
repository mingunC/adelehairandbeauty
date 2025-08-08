#!/bin/bash

# Create directory for optimized images
mkdir -p optimized-images
mkdir -p optimized-images/images
mkdir -p optimized-images/images/collection

# Install required tools if not already installed
if ! command -v convert &> /dev/null; then
    echo "ImageMagick not found. Please install it first:"
    echo "brew install imagemagick"
    exit 1
fi

# Function to optimize an image
optimize_image() {
    input=$1
    output=$2
    
    # Get dimensions
    width=$(identify -format "%w" "$input")
    
    # Calculate new width (max 1200px for regular images, 1920px for hero)
    if [[ $input == *"bg"* ]]; then
        new_width=1920
    else
        new_width=1200
    fi
    
    # Only resize if the image is larger than the target width
    if [ $width -gt $new_width ]; then
        convert "$input" -resize ${new_width}x -strip -quality 85 "$output"
    else
        convert "$input" -strip -quality 85 "$output"
    fi
    
    echo "Optimized: $input → $output"
    
    # Print size reduction
    original_size=$(du -h "$input" | cut -f1)
    new_size=$(du -h "$output" | cut -f1)
    echo "  Size: $original_size → $new_size"
}

# Optimize hero images
echo "Optimizing hero images..."
optimize_image "bg1.png" "optimized-images/bg1.png"
optimize_image "bg2.png" "optimized-images/bg2.png"

# Optimize team images
echo "Optimizing team member images..."
for img in images/*.jpg; do
    if [ -f "$img" ]; then
        filename=$(basename "$img")
        optimize_image "$img" "optimized-images/images/$filename"
    fi
done

# Optimize collection images
echo "Optimizing collection images..."
for img in images/collection/*.png; do
    if [ -f "$img" ]; then
        filename=$(basename "$img")
        optimize_image "$img" "optimized-images/images/collection/$filename"
    fi
done

# Copy other small files (SVGs, etc.)
echo "Copying other image files..."
find images -name "*.svg" -exec cp {} optimized-images/{} \;

echo "Optimization complete! Optimized images are in the 'optimized-images' directory."
echo "After verifying the quality, you can replace the original images with these optimized versions."
