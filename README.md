# Book Garden (Backend)

<p align="center">
  <img src="https://github.com/user-attachments/assets/96c7e321-7db7-4b11-8797-f6f41499e954" alt="Logo-for-GitHub">
</p>

:books: "Book Garden" is an online bookshop dedicated to selling a wide range of new books.

This app was developed as part of "Web development" course at Metropolia UAS.

📅 August - October, 2024

## :computer: Technical stack overview
- Node.js and Express
- MongoDB and mongoose
- Cors middleware for cross-origin resource sharing
- JWT for authenticating and authorizing users
- colors module for styling console output
- seeder.js for populating the database with initial data

## 🔧 How to run locally:

### 📌 Prerequisites:
Before you can run the application, ensure you have the following installed:
- Git (for cloning the repository)
- Node.js
- MongoDB

### 🏗️ Installation:
1) Clone the repository:
```
git clone https://github.com/Viktoriia-code/Book-Garden-BE.git
```

2) Move to the folder and install modules:
```
cd ./Book-Garden-BE
npm install
```

3) Populate the database with initial data:
```
npm run data:import
```

4) Run the application:
```
npm run dev
```

## :chart_with_upwards_trend: Database Seeding Commands:

:floppy_disk: To import data using seeder.js:
```
npm run data:import
```

🗑️ To destroy data using seeder.js:
```
npm run data:destroy
```
