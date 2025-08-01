#!/bin/bash

echo "Building Splitty for Netlify deployment..."

# Clean previous builds
rm -rf .next out

# Build the project
npm run build

# Check if build was successful
if [ $? -eq 0 ]; then
    echo "Build successful! Static files are in the 'out' directory."
    echo "Ready for Netlify deployment."
else
    echo "Build failed. Please check the errors above."
    exit 1
fi