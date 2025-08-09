const { apiHttpStatusCode } = require("../utils/utils-api-http-status-code");

const validateBody = (schema) => { 
    return (request, response, nextFunction) => {
        const body = request.body;
        const isNotBody = (!request.body);
       
        // caso 1: nenhum corpo enviado
        if(isNotBody){
            return response.status(apiHttpStatusCode._400__bad_request).json(
                {
                    message: "Requisição inválida, favor enviar um corpo."

                }
            );
        }

        // caso: corpo vazio ({}) - validar com Joi
        const {error} = schema.validate(body, {abortEarly:false});
        if(error){
            return response.status(apiHttpStatusCode._400__bad_request).json(
                {
                    message: "erro de validação",
                    details: error.details.map(err=>err.message),
                }
            )
        }

        nextFunction();
    }
};

module.exports = validateBody;