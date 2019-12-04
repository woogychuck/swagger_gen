export default class MethodsDefinition {
    constructor(methodsConf){
        this.requiredSchemas = [];
        this.requiredSecurityDefinitions = [];
        if(!methodsConf){
            throw new Error('A methods configuration is required');
        }

        const allowedMethods = ['get','put','post','patch','delete','options'];

        for(const method in methodsConf){
            if(!allowedMethods.includes(method)){
                throw new Error(`Invalid HTTP Method ${method}, valid methods are ${allowedMethods.join(',')}`);
            }
            this[method] = {};
            if(methodsConf[method].security){
                this[method].security = methodsConf[method].security;
                this.requiredSecurityDefinitions.push(methodsConf[method].security);
            }
            if(methodsConf[method].payloadSchema){
                this[method].payloadSchema = methodsConf[method].payloadSchema;
                this.requiredSchemas.push(methodsConf[method].payloadSchema);
            }
        }
    }
}