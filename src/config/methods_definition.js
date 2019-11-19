export default class MethodsDefinition {
    constructor(methodsConf){
        if(!methodsConf){
            throw new Error("A methods configuration is required");
        }
    }
}