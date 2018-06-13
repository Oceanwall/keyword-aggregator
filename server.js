const express = require('express');

const app = express();
const port = process.env.PORT || 5000;

app.get('/api/hello', (req, res) => {
  res.send({ express: 'To do: Put server side code here (like API calls) and return the information in JSON form' });
});

app.listen(port, () => console.log(`Listening on port ${port}`));
