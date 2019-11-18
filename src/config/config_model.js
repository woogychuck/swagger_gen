/**
 * Ensures config data is formatted correctly and populates default values
 */
export default class ConfigModel{
    constructor(configJson){
        this.title = configJson.title;
        this.basePath = configJson.stage;
        this.paths = configJson.paths;
        this.apiIntegration = configJson.apiIntegration || null;
        this.schemas = configJson.schemas;
        this.securityDefinitions = configJson.securityDefinitions;

        if(configJson.allPaths){
            for(let pathIndex = 0; pathIndex < this.paths.length; pathIndex++){
                let currentPath = this.paths[pathIndex];
                if(allPaths.headers){
                }
            }
        }
    };
}