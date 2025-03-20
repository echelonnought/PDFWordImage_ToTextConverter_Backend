# Base image with Node.js
FROM node:18

# Install Poppler and Tesseract dependencies
RUN apt-get update && apt-get install -y poppler-utils tesseract-ocr

# Set working directory
WORKDIR /app

# Copy package.json and install dependencies
COPY package.json .
RUN npm install

# Copy all files
COPY . .

# Expose port
EXPOSE 4000

# Start the app
CMD ["node", "index.js"]