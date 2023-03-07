import express from 'express';
import * as dotenv from 'dotenv';
import cors from 'cors';

import connectDB from './mongodb/connect.js';
import postRoutes from './routes/postRoutes.js';
import gifterRoutes from './routes/gifterRoutes.js';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json({ limit: '50mb' }));

app.use('/api/v1/post', postRoutes);
app.use('/api/v1/gifter', gifterRoutes);

const port = process.env.PORT || 8080;

app.get('/', async (req, res) => {
     res.send("Hello from Gifter Server!")
})

const startServer = async () => {
     try {
          connectDB(process.env.MONGODB_URL);
          app.listen(port, () => console.log(`Server has started at port http://localhost:${port}`));          
     }
     catch (error) {
          console.log(error);
     }
}

startServer();