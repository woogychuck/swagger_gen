import PathDefinition from './path_definition';

/**
 * Ensures config data is formatted correctly and populates default values
 */
export default class ConfigModel{
    constructor(configJson){
        this.title = configJson.title;
        this.basePath = configJson.stage;
        this.paths = [];
        if(!configJson.paths || !Array.isArray(configJson.paths)){
            throw new Error("Paths configuration must be an array");
        }else{
            for(var pathIndex = 0; pathIndex < configJson.paths.length; pathIndex++){
                this.paths.push(new PathDefinition(configJson.paths[pathIndex], configJson.allPaths))
            }
        }
        this.apiIntegration = configJson.apiIntegration || null;
        this.schemas = configJson.schemas;
        this.securityDefinitions = configJson.securityDefinitions;
    };
}