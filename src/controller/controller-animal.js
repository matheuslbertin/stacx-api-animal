const { apiHttpStatusCode } = require("../utils/utils-api-http-status-code");
const { readData, writeData } = require("../utils/utils-file-handler");
const {randomUUID} = require("crypto");


exports.getAllAnimals = async(request, response) => {
    try {
    const animals = await readData();
    
    response.status(apiHttpStatusCode._200__ok).json(
        {
            messsage: "Lista de animais recuperada com sucesso.",
            total: animals.length,
            data: animals
        }
    );

    }
    catch(error){
        console.error("Erro ao ler os animais.", error);
        
        response.status(apiHttpStatusCode._500__internal_server_error).json(
            {
                message: "Erro interno ao recuperar a lista de animais.",
                error: error.message
            }
            
        );

    }
    
};

exports.getAnimalById = async(request, response) => {
    try{
        const {id} = request.params;
        const animals =  await readData()
        const animalFound = animals.find(animal => animal.id === id);

        const isNotAnimalFound = (!animalFound);

        if (isNotAnimalFound) {
            return response.status(apiHttpStatusCode._404__not_found).json(
                {
                    message: `Animal com ID ${id} não encontrado.`
                }
            );
        }

        return response.status(apiHttpStatusCode._200__ok).json(
            {
                message: "Animal encontrado com sucesso",
                data: animalFound,
            }
        );
    }
    catch (error){
        console.error("Erro ao buscar animal por ID.", error);
        
        return response.status(apiHttpStatusCode._500__internal_server_error).json(
            {
                message: "Erro interno ao buscar animal",
                error: error.message,
            }
        );

    }

}

exports.createAnimal = async (request, response) => {
    try {
        const animals = await readData();
        const body = request.body;
        
        const newAnimal = {
            id: randomUUID(),
            ...body
        };

        animals.push(newAnimal);

        await writeData(animals);

        return response.status(apiHttpStatusCode._201__created).json(
            {
                message: "Animal criado com sucesso",
                data: newAnimal,
            }
        );
    } catch (error) {
        console.error("Erro ao criar animal", error);

        return response.status(apiHttpStatusCode._500__internal_server_error).json(
            {
                message: "Erro interno ao criar o animal",
                error: error.message,
            }
        );
    }
};

exports.updateAnimalById = async (request, response) => {
    try {
        const {id: AnimalId} = request.params;
    const {body} = request;
    const animals = await readData();

    const animalFoundIndex = animals.findIndex(
            animal => animal.id === AnimalId
        );

    const isNotAnimalFoundIndex = (animalFoundIndex === -1);    

    if (isNotAnimalFoundIndex) {
        return response.status(apiHttpStatusCode._404__not_found).json(
            {
                message: `Animal com id ${AnimalId} não encontrado`
            }
        );
    }
    
    const updateAnimal = {
        id: AnimalId, 
        ...body
    }

    animals[animalFoundIndex] = updateAnimal;

    await writeData(animals);

    return response.status(apiHttpStatusCode._200__ok).json(
        {
            message: "Animal atualizado com uscesso!",
            data: updateAnimal
        }
    );
        
    } catch (error) {
        console.error("Erro ao atualizar animal.", error);

        return response.status(apiHttpStatusCode._500__internal_server_error).json(
            {
                message: "Erro interno ao atualizar animal",
                error: error.message,

            }
        );
    }

}

exports.deleteAnimalById = async (request, response) => {
    try {
        const {id: animalId} = request.params;
        const animals = await readData();
        
        const animalFoundIndex = animals.findIndex(
            animal => animal.id === animalId
        );

        const isNotFoundIndex = (animalFoundIndex === -1);
        if (isNotFoundIndex) {
            return response.status(apiHttpStatusCode._404__not_found).json(
                {
                    message: `Animal não encontrado com ID ${animalId}`
                }
            );
        }

        const deletedAnimal = animals[animalFoundIndex];

        animals.splice(animalFoundIndex, 1);
        
        await writeData(animals); 

        return response.status(apiHttpStatusCode._200__ok).json(
            {
                message: "Animal deletafo com sucesso",
                data: deletedAnimal,
            }
        );
        
    } catch (error) {
        console.error("Erro ao deletar animal", error);
        return response.status(apiHttpStatusCode._500__internal_server_error).json(
          {
            message: "Erro interno ao deletar o animal.",
            error: error.message,
          }         
        );
    }
};