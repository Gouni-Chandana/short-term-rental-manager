Hyderabad Stays – Frontend 🏨

This is the frontend for Hyderabad Stays, a rental property platform where users can browse listings, view details, sign up, log in, and leave reviews.

🚀 Features

Responsive UI built with HTML, CSS, Bootstrap 5

Property listings with images, price & details page

Login & Signup forms connected to backend APIs

Review system on property detail page

🛠️ Tech Stack

HTML5, CSS3, Bootstrap – UI & styling

JavaScript (Fetch API) – API calls & form handling

📂 Structure
├── index.html     # Home page with property listings
├── listing.html   # Property details + reviews
├── login.html     # Login form
├── signup.html    # Signup form
├── style.css      # Custom styles

backend

🏡 Listings & Users Backend API

This is a simple Express + MongoDB (Mongoose) backend API for managing users and listings.
It supports user authentication (signup/login) and CRUD operations for listings with reviews.

🚀 Features

User signup & login

MongoDB connection with Mongoose

CRUD operations for listings

Add reviews to listings

REST API with Express

Modular controllers & routes

📦 Tech Stack

Node.js + Express.js

MongoDB with Mongoose

JavaScript (ES Modules)

⚙️ Installation & Setup
1. Clone the repo
git clone https://github.com/your-username/backend-listings.git
cd backend-listings

2. Install dependencies
npm install

3. Create .env file
MONGO_URI=mongodb://localhost:27017/listingsDB
PORT=5000

4. Run backend server
npm start


The backend server will run at http://localhost:5000

📂 Project Structure
backend/
├── controllers/
│   ├── listingController.js   # Listing logic
│   └── userController.js      # User auth logic
├── models/
│   ├── Listing.js             # Listing schema
│   └── User.js                # User schema
├── routes/
│   ├── listingRoutes.js       # Listing routes
│   └── userRoutes.js          # User routes
├── config/
│   └── db.js                  # MongoDB connection
├── server.js                  # Entry point
└── package.json

📌 API Endpoints
🔹 Users
Method	Endpoint	Description
GET	/api/users/	Test route
POST	/api/users/signup	Signup a new user
POST	/api/users/login	Login a user
🔹 Listings
Method	Endpoint	Description
GET	/api/listings/	Get all listings

Docker

🌐 Frontend Docker Setup

This project uses Docker and Nginx to serve a static frontend application.
The provided Dockerfile builds a lightweight container that serves files from /usr/share/nginx/html using Nginx.

📦 Prerequisites

Docker
 installed on your system

⚙️ Build & Run
1. Build Docker image
docker build -t my-frontend .

2. Run container
docker run -d -p 8080:80 my-frontend


Now your frontend will be available at 👉 http://localhost:8080

📂 Dockerfile Explained
 Use Nginx to serve static frontend
FROM nginx:alpine

Copy all frontend files into nginx public folder
COPY . /usr/share/nginx/html

Expose nginx default port
EXPOSE 80

Start nginx
CMD ["nginx", "-g", "daemon off;"]


nginx:alpine → lightweight Nginx base image

COPY . /usr/share/nginx/html → copies frontend build files into Nginx’s default web directory

EXPOSE 80 → exposes port 80 inside the container

CMD ["nginx", "-g", "daemon off;"] → runs Nginx in the foreground

🔧 Useful Commands
Stop container
docker stop <container_id>

Remove container
docker rm <container_id>

Remove image
docker rmi my-frontend

🚀 Deployment Notes

Make sure your frontend build (e.g., React, Vue, Angular) is compiled before building the Docker image.
Example (React):

npm run build


Then copy the build/ folder contents into the Docker context (same directory as the Dockerfile).

You can also customize Nginx config by mounting or replacing /etc/nginx/conf.d/default.conf.
GET	/api/listings/:id	Get a single listing
POST	/api/listings/	Create new listing
DELETE	/api/listings/:id	Delete listing
POST	/api/listings/:id/reviews	Add review to listing


