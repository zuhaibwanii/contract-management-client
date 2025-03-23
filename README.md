# Contract Management Client

This is the frontend for the Contract Management application built with Vite and React.

## Prerequisites

Make sure you have Node.js version **>=18.18.0** installed before proceeding.

## Setup Instructions

1. **Clone the repository:**
   ```sh
   git clone https://github.com/zuhaibwanii/contract-management-client.git
   ```
2. **Navigate to the project directory:**
   ```sh
   cd contract-management-client
   ```
3. **Install dependencies:**
   ```sh
   npm install
   ```
4. **Start the development server:**
   ```sh
   npm run dev
   ```

## Environment Variables

Create a `.env` file in the root directory and add the following environment variables:

```
VITE_BASE_URL=http://localhost:5000
VITE_API_URL=http://localhost:5000/api
```

These variables ensure that the frontend connects to the local backend during development.

## Local Development Guide

- After setting up the environment variables, start the backend service to serve API requests.
- Run the frontend using `npm run dev`, which will start the Vite development server.
- The application will be accessible at `http://localhost:5173/` by default.

For any issues, ensure that your backend is running and that the API URLs are correctly set in the `.env` file.

Happy coding! 🚀

