# Use official Node.js image
FROM node:14

# Set the working directory inside the container
WORKDIR /app

# Copy the package.json and package-lock.json files to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code to the working directory
COPY . .

# Expose the application's port
EXPOSE 3000

# Start the application, accepting environment variables
CMD ["npm", "start"]
