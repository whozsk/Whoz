const express = require('express');
const cors = require('cors');
const fs = require('fs');
const app = express();
const port = 3000;
const keysFile = './keys.json';

app.use(cors());
app.use(express.json());

app.post('/api/validate-key', (req, res) => {
  const { key } = req.body;
  if (!key) return res.status(400).json({ valid: false, message: 'Key is required' });

  const keys = fs.existsSync(keysFile) ? JSON.parse(fs.readFileSync(keysFile)) : {};
  if (!keys[key]) return res.status(400).json({ valid: false, message: 'Invalid key' });
  if (keys[key].used) return res.status(400).json({ valid: false, message: 'Key already used' });

  keys[key].used = true;
  fs.writeFileSync(keysFile, JSON.stringify(keys, null, 2));
  res.json({ valid: true });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});