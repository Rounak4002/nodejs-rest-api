# NodeJS Notes REST API

A minimal Notes REST API built with **Express** and **MySQL**, designed for learning and easy setup.  
This project provides full CRUD (Create, Read, Update, Delete) operations for managing notes.

---

## Project Structure

```
nodejs-rest-api/
├─ src/
│  ├─ controllers/
│  │  └─ notesController.js
│  ├─ db.js
│  └─ index.js
├─ .env.example
├─ package.json
├─ create_table.sql
└─ README.md
```

---

## Requirements

- **Node.js** 16+
- **MySQL / MariaDB**
- **npm** (comes with Node)
- *(Optional)* nodemon for auto-reload during development

---

## Setup Instructions

### Install dependencies
```bash
npm install
```

### Create your environment file
```bash
cp .env.example .env
```
Then open `.env` and update your DB credentials.

---

## Database Setup

Run the provided SQL file to create DB + table:

```bash
mysql -u root -p < create_table.sql
```

OR open `create_table.sql` manually and run the script inside MySQL Workbench / phpMyAdmin.

---

## Start the Server

### Development
(automatic restart on changes)
```bash
npm run dev
```

### Production
```bash
npm start
```

Server runs at:
```
http://localhost:3000
```

---

## API Endpoints

### ➤ Get all notes  
`GET /notes`

### ➤ Get a note by ID  
`GET /notes/:id`

### ➤ Create a note  
`POST /notes`  
**Body (JSON):**
```json
{
  "title": "My Note",
  "content": "Note details..."
}
```

### ➤ Update a note  
`PUT /notes/:id`  
or  
`PATCH /notes/:id`

### ➤ Delete a note  
`DELETE /notes/:id`

---

## Example cURL Requests

### Create a note:
```bash
curl -X POST http://localhost:3000/notes \
  -H "Content-Type: application/json" \
  -d '{"title":"Read book","content":"chapter 4"}'
```

### List notes:
```bash
curl http://localhost:3000/notes
```

### Update a note:
```bash
curl -X PUT http://localhost:3000/notes/1 \
  -H "Content-Type: application/json" \
  -d '{"title":"New Title"}'
```

### Delete a note:
```bash
curl -X DELETE http://localhost:3000/notes/1
```

---

## Tech Used

- **Node.js**
- **Express**
- **MySQL (mysql2 library)**
- **dotenv**
- RESTful routing

---

## Notes & Improvements
You may enhance this API with:

- input validation (`express-validator`)
- JWT authentication
- migrations instead of raw SQL (`sequelize`, `knex`)
- advanced logging (`morgan`, `winston`)
- pagination & searching
- Docker support

---

## License
This project is open-source under the **MIT License**.

# ROUNAK PATTANAIK | ITER SOA UNIVERSITY

