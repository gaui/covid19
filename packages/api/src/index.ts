import express from 'express';
import { provider } from '@gaui/covid19-core';

const app = express();

app.use(express.json());
app.use('/', async (_, res) => {
  const data = await provider();
  res.json(data);
});

app.listen(8080, () => {
  console.log('Listening on port 8080');
});
