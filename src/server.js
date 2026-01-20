import dotenv from 'dotenv';
import app from './app.js';

dotenv.config();

const PORT = process.env.PORT || 4003;

app.listen(PORT, () => {
  console.log(`SMTP Microservice running on port ${PORT}`);
});
