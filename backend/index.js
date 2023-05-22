const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

const creatorsRouter = require('./routes/creators');
const nftsRouter = require('./routes/nfts');
const buyersRouter = require('./routes/buyers');

app.use(cors());
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/creators', creatorsRouter);
app.use('/nfts', nftsRouter);
app.use('/buyers', buyersRouter);

db = require('./config/db');

const port = Number(process.env.port || 4000)
app.listen(port, () => {
    console.log(`Server running on port ${port}`)
});
