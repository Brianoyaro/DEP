# Use an existing image as a base
FROM node:14

# Set the working directory
WORKDIR /usr/src/app

# Copy the package.json and package-lock.json files
COPY package*.json ./

# Install the dependencies
RUN npm install mysql2 nodemon express axios

# Copy the rest of the code
COPY . .

# Expose the port that the app listens on
EXPOSE 8002

# Define the command to run the app
CMD ["npm", "run dev"]