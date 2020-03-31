const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

const routes = require('./routes');

const app = express();

var config = {
      "USER"     : "onmistack10", 
      "PASS"     : "onmistack10",
      "DATABASE" : "air-cnc",
      "CLUSTER"  : "<CLUSTER_MONGO_DB_ID>" 
};

var dbUrl = "mongodb+srv://"
    + config.USER
    + ":"
    + config.PASS
    + config.CLUSTER
    + config.DATABASE
    +"?retryWrites=true&w=majority";

mongoose.connect(
    dbUrl, 
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }
);

// connection failed event handler
mongoose.connection.on("error", function(err) {
  console.log("Could not connect to mongo server! " + err);
});

mongoose.connection.on("open", function(ref) {
  console.log("Connected to mongo server.");
});

// GET, POST, PUT, DELETE

// req.query = acessar query params (para filtros)
// req.params = acessar route params (para edicao, delete)
// req.body = acessar corpo da requisição (para criacao, edicao)

//app.use(cors( { origin: 'http://localhost:3333' }));
app.use(cors());
// fazer browser receber requisicoes json
app.use(express.json());
app.use('/files', express.static(path.resolve(__dirname, '..', 'uploads')));
app.use(routes);

app.listen(3333);
