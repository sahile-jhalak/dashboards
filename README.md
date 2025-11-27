# Dashboard Project
Starter structure placeholder ZIP for final submission.
Data Visualization Dashboard (React + D3 + Node.js + MongoDB)

A full-stack data analytics dashboard built using:

React + Vite

Tailwind CSS (utility-based styling)

D3.js for visualizations

Node.js + Express backend

MongoDB Atlas database

Axios for API communication

Multi-select filters

Dark mode + collapsible sidebar

Vuexy-style UI layout

This project is developed as part of a test assignment.

Features
UI/UX

Vuexy-inspired layout

Collapsible sidebar

Light/Dark theme toggle

Responsive design

Notification bell with red indicator

Sidebar filter panel

Filters (Multi-Select)

End Year

Topics

Sector

Region

PESTLE

Source

SWOT

Country

City

Min/Max filtering:

Intensity

Likelihood

Relevance

Data Visualizations (D3.js)

Region distribution pie chart (with labels)

Topic distribution pie chart

Yearly trend line chart

Country comparison visual

Intensity / Likelihood / Relevance charts

City-based visualization

Backend

Node.js + Express REST API

MongoDB Atlas integration

/api/data — fetch dataset

/api/insert — insert dataset

Auto-clean invalid fields

Installation & Setup
1. Clone Repository
git clone https://github.com/your-username/your-repo.git
cd your-repo

Backend Setup
Install dependencies
cd backend
npm install

Create .env
PORT=5000
MONGODB_URI=your_mongodb_connection_string

Start server
npm run start


Expected output:

MongoDB Connected
Server listening on 5000

Frontend Setup
Install dependencies
cd frontend
npm install

Create .env
VITE_API_URL=http://localhost:5000/api

Start development server
npm run dev


Open URL shown by Vite, usually:

http://localhost:5173

API Endpoints
GET /api/data

Returns all dashboard records.

POST /api/insert

Insert full dataset into MongoDB.

Importing Dataset

Place the dataset file here:

backend/data/jsondata.json


To insert using curl:

curl -X POST http://localhost:5000/api/insert \
-H "Content-Type: application/json" \
-d @backend/data/jsondata.json

MongoDB Atlas Setup

Visit https://www.mongodb.com/atlas

Create a free cluster

Create a database user (username + password)

Add IP Whitelist → 0.0.0.0/0

Click "Connect" → "Connect your application"

Copy provided connection string

Paste into backend/.env

Example:

MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/dashboard

TailwindCSS

All styling uses Tailwind utility classes.
No standalone CSS files are required.

Example:

className="p-4 bg-white dark:bg-gray-800 rounded-xl shadow"

Troubleshooting
d3 version error
npm install d3@7.8.5

Vite plugin-react issue
npm install -D @vitejs/plugin-react

MongoDB "auth required" error

Incorrect username/password

IP not whitelisted

Database name missing

Pie chart labels not visible

Slices too small

Auto-positioned labels applied

Deployment
Backend Options

Render

Railway

Vercel Serverless

Heroku

Frontend Options

Vercel (recommended)

Netlify

Firebase Hosting

Update frontend environment variable before deploying:

VITE_API_URL=your_backend_production_url

License

MIT License — Free to use for academic and personal projects.