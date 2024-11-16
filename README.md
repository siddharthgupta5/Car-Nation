# CarNation - Car Management Application

## Project Description

This is a comprehensive full-stack Car Management Application that allows users to create, view, edit, and delete car entries. Each user can manage posts for their cars, which can include a title, description, up to 10 images, and tags such as car type, manufacturer, dealer, and more.

Note - The application may take some time to open during the initial starting of the application, please wait for some moment if you face delay.

## Features

1. **Car Management**: Posts of cars can be created, updated, deleted, and viewed by the users.
2. **User Authorization**: Users can manage only their own Posts.
3. **Image Upload**: Users can upload up to 10 car images per entry.
4. **User Authentication**: Secure login and registration.
5. **Search Functionality**: Quickly search for cars by title, description, or tags.
6. **Tags**: Users can add car-related tags like type, company, and dealer.


## Tech Stack

- **Frontend** : React.js, Tailwind CSS
- **Backend**: Node.js, Express.js
- **Database**: MongoDB (Mongoose)
- **Authentication**: JSON Web Tokens (JWT)
- **Image Upload**: Multer, Cloudinary

## Installation

### 1. Clone the repository:

```bash
git clone https://github.com/siddharthgupta5/Car-Nation.git
```

### 2. Install dependencies::

```bash
# For backend
cd backend
npm install

# For frontend
cd ../frontend
npm install
```

### 3. Environment variables: Create a .env file in the backend directory with the following variables:

```bash
MONGO_URI=mongodb://localhost:27017/car_management
PORT=5000
CLOUD_NAME=YOUR_CLOUDINARY_CLOUD_NAME
API_KEY=YOUR_CLOUDINARY_API_KEY
API_SECRET=YOUR_CLOUDINARY_API_SECRET
JWT_SECRET=your_jwt_secret
```

### 4. Run the application:

```bash
# Start the backend
cd backend
npm start

# Start the frontend
cd ../frontend
npm run dev

```
### 5. Access the application: 

Visit http://localhost:5173 in your browser.


## API Documentation

For API documentation, visit the [API Documentation](https://drive.google.com/file/d/1BwyfGSwzoFLVCJgxX9uGcV7RvLLZ67e-/view?usp=sharing).
