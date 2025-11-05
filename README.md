# No Money

A co-working space reservation app. 

## Installation

**Steps:**

1.  **Clone the Repository:**
    ```bash
    git clone https://github.com/miramsalp/swdev_project.git
    cd swdev_project
    ```

2.  **Create Backend `.env` File:**
    Create a file at `/backend/.env` 
    ```env
    # DB
    MONGO_URI=your_uri

    # JWT
    JWT_SECRET=your_super_secret_key_for_jwt
    JWT_EXPIRE=30d
    JWT_COOKIE_EXPIRE=30

    # CLIENT URI
    FRONTEND_URL=http://localhost:5173

    # STRIPE
    STRIPE_SECRET_KEY=sk_test_YOUR_STRIPE_SECRET_KEY
    STRIPE_WEBHOOK_SECRET=whsec_YOUR_STRIPE_WEBHOOK_SECRET
    ```

3.  **Create Frontend `.env` File:**
    Create a file at `/frontend/.env` 
    ```env
    # This one have to connect to your backend path
    VITE_API_URL=http://localhost:5000/api/v1
    ```

4.  **Build and Run:**
    From the root of the project, run:
    ```bash
        cd frontend
        npm run dev
    ```
    ```bash
        cd backend
        npm run dev
    ```

> * Your backend API is running at `http://localhost:5000`
> * Your frontend app is running at `http://localhost:5173`

