# Stage 1: Compile and Build angular codebase

# Use official node image as the base image
FROM node:18 as build

# Set the working directory
WORKDIR /app

# Add the package.json file to the workspace
COPY package.json /app

# Install all the dependencies
RUN npm install

# Install Angular CLI globally
RUN npm install -g @angular/cli

# Add the entire codebase to the workspace
COPY . .

# Generate the build of the application
RUN ng build --configuration production

# Stage 2: Serve app with nginx server

# Use official nginx image as the base image
FROM nginx:latest

# Copy the build output to replace the default nginx contents.
COPY --from=build /app/dist/destinations-spa /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Start Nginx server
CMD ["/bin/bash", "-c", "nginx -g \"daemon off;\""]
