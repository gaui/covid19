import express from 'express';
import { getData } from '@gaui/covid19-core/src/providers';

const app = express();

app.use(express.json());
app.use('/', async (_, res) => {
  const data = await getData();
  res.json(data);
});

app.listen(8080, () => {
  console.log('Listening on port 8080');
});
