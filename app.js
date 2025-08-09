const express = require("express");
const { apiEndpoints } = require("./src/utils/utils-api-endpoints");
const animalRoutes = require("./src/routes/routes-animal-route")
const app = express();
const port = 3000;

app.use(express.json());

app.use(apiEndpoints.home, animalRoutes);

app.listen(
    port, ()=>{
        console.log(`API sendo executada em http://localhost: ${port}`)
    }
);