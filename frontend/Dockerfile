# Use Nginx to serve static frontend
FROM nginx:alpine

# Copy all frontend files into nginx public folder
COPY . /usr/share/nginx/html

# Expose nginx default port
EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"]
