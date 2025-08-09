const { apiHttpStatusCode } = require("../utils/utils-api-http-status-code");

const checkIdParams =  (exampleRoute) => {
    return (request, response, nextFunction) => { 
        const {id} = request.params;
        const isNotId = (!id);
        const isNotTypeString = (typeof id !== "string");

        if(isNotId || isNotTypeString){
            return response.status(apiHttpStatusCode._400__bad_request).json(
                {
                    message: `Parâmetro ID é obrigatório. Exemplo: ${exampleRoute} ` ,
                    

                }
            );
        }

        nextFunction();
    }
};

module.exports = checkIdParams;