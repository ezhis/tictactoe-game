const express = require('express');
const app = new express();

app.use(express.json());

app.get('/api-url', async (req, res) => {
  res.json({
    url: process.env.API_URL || 'http://localhost:8080',
  });
})

app.use('/', express.static('../client/build'));


const port = process.env.PORT || 8081;
app.listen(port, ()=> {
  console.log(`App is running on port ${port}`);
})