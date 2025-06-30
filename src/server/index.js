// Express + Lowdb pour stocker les tentatives de connexion avec infos utilisateur
const express = require('express');
const cors = require('cors');
const { Low } = require('lowdb');
const { JSONFile } = require('lowdb/node');
const path = require('path');

const app = express();
app.use(cors());
app.use(express.json());

// Initialisation de la base Lowdb
const dbFile = path.join(__dirname, 'age-verification-attempts.json');
const adapter = new JSONFile(dbFile);
const db = new Low(adapter, { attempts: [] });

// Initialiser la base si vide
async function initDB() {
  await db.read();
  db.data ||= { attempts: [] };
  await db.write();
}
initDB();

// Endpoint pour enregistrer une tentative
app.post('/age-verification-attempt', async (req, res) => {
  const { user, imageUrl, estimatedAge, success, timestamp } = req.body;
  if (!user || !imageUrl || typeof success === 'undefined') {
    return res.status(400).json({ error: 'Missing required fields' });
  }
  await db.read();
  db.data.attempts.push({ user, imageUrl, estimatedAge, success, timestamp });
  await db.write();
  res.status(201).json({ message: 'Attempt saved' });
});

// Endpoint pour récupérer les tentatives (optionnel)
app.get('/age-verification-attempts', async (req, res) => {
  await db.read();
  res.json(db.data.attempts);
});

const PORT = process.env.PORT || 3100;
app.listen(PORT, () => {
  console.log(`API running on port ${PORT}`);
});
