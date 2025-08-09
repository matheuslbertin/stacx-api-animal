const express = require("express");
const { apiEndpoints } = require("../utils/utils-api-endpoints");
const router = express.Router();
const controller = require("../controller/controller-animal");
const checkIdParams = require("../middlewares/middleware-check-id-params");
const validateBody = require("../middlewares/middleware-validate-body");
const animalSchema = require("../models/models-animal");


router.get(apiEndpoints.apiGetAllAnimals, controller.getAllAnimals);

// captura requisições sem ID
router.get(apiEndpoints.apiGetAnimalWithoutId, checkIdParams("/api/get-animal-by-id/id-do-animal"));

//lida com requisições válidas com ID

router.get(apiEndpoints.apiGetAnimalWithId, controller.getAnimalById)

router.post(apiEndpoints.apiCreateAnimal, validateBody(animalSchema), controller.createAnimal);

router.put(apiEndpoints.apiUpdateAnimalWithoutId, checkIdParams("/api/update-animal-by-id/id-do-animal"));

router.put(apiEndpoints.apiUpdateAnimalWithId, validateBody(animalSchema), controller.updateAnimalById);

router.delete(apiEndpoints.apiDeleteAnimalWithoutId, checkIdParams("/api/delete-animal-by-id/id-do-animal"));

router.delete(apiEndpoints.apiDeleteAnimalWithId, controller.deleteAnimalById);
module.exports = router;
