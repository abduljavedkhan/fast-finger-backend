const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express()
const ResponseBuilder = require('./app/models/CustomResponse/ResponseBuilder');
const Response = require('./app/models/CustomResponse/Response');

const corsOptions = {
  origin: '*',
  methods: [
    'GET',
    'POST',
  ],
  allowedHeaders: [
    'Access-Control-Allow-Origin',
    'Content-Type'],
};

app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

require("./app/routes/approutes")(app);

app.get("/", (req, res) => {
  res.json({ message: "Welcome to fast finger backend." });
});

app.use(function(err, req, res, next){
  console.error('Global error catch '+ err.message);
  let errorResponse = new ResponseBuilder();
  errorResponse.setStatusCode(CODES.INTERNAL_SERVER_ERROR);
  errorResponse.setStatus("fail");
  errorResponse.setMessage(err.sqlMessage || err);
  errorResponse.setData({});
  res.send(new Response(errorResponse));
})

const PORT = process.env.PORT || 7070;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
