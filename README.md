📊 Data Visualization Dashboard (React + D3 + Node.js + MongoDB)

A full-stack data analytics dashboard built using:

React + Vite

Tailwind CSS (utility-based styling)

D3.js for visualizations

Node.js + Express backend

MongoDB Atlas cloud database

Axios for API communication

Multi-select filters

Dark mode + collapsible sidebar

Vuexy-style UI layout

This project was developed as part of a test assignment.

🚀 Features
⭐ UI/UX

Vuexy-inspired layout

Collapsible sidebar

Light/Dark theme toggle

Responsive modern design

Notification bell with red indicator

Sidebar filter panel

🎯 Filters (Multi-Select)

End Year

Topics

Sector

Region

PESTLE

Source

SWOT

Country

City

🔢 Min/Max Filters

Intensity

Likelihood

Relevance

📈 Data Visualizations (D3.js)

Region distribution pie chart (with labels)

Topic distribution pie chart

Yearly trend line chart

Country comparison chart

Intensity / Likelihood / Relevance graphs

City-based visual analytics

🖥️ Backend (Node.js)

Node.js + Express REST API

MongoDB Atlas database

/api/data → fetch dataset

/api/insert → insert dataset

Cleans and inserts JSON into MongoDB


⚙️ Installation & Setup
1️⃣ Clone Repository
git clone https://github.com/your-username/your-repo.git
cd your-repo

🛠 Backend Setup
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

🎨 Frontend Setup
Install dependencies
cd frontend
npm install

Create .env
VITE_API_URL=http://localhost:5000/api

Start development server
npm run dev


Open the URL shown by Vite (usually):

http://localhost:5173

🔌 API Endpoints
GET /api/data

Returns all dashboard records.

POST /api/insert

Insert full dataset into MongoDB.

📥 Importing Dataset

Place dataset file here:

backend/data/jsondata.json


Insert into MongoDB using:

curl -X POST http://localhost:5000/api/insert \
-H "Content-Type: application/json" \
-d @backend/data/jsondata.json

☁️ MongoDB Atlas Setup

Visit https://www.mongodb.com/atlas

Create a free cluster

Create database user (username + password)

Add IP whitelist → 0.0.0.0/0

Click Connect → Connect your application

Copy connection string

Paste into backend .env:

MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/dashboard

