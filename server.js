const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.static('build'))

app.listen(port, () => {
  console.log(`[server]: Server is running at https://localhost:${port}`);
});