import MethodsDefinition from './methods_definition';

export default class PathDefinition{
    constructor(pathConfig, allPathsConfig){
        if(!pathConfig){
            throw new Error("A path configuration is required");
        }

        if(!pathConfig.path || typeof pathConfig.path !== 'string'){
            throw new Error("A valid path property must be provided for path configurations");
        }else{
            this.path = pathConfig.path;
        }

        if(!pathConfig.methods || typeof pathConfig.methods != "object"){
            throw new Error("A path must have a valid methods definition");
        }else{
            this.methods = new MethodsDefinition(pathConfig.methods);
        }

        this.includeOptions = pathConfig.includeOptions || false;
    }
}