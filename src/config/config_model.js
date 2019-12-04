import ArrayUtils from '../utils/array';
import Chalk from 'chalk';
import PathDefinition from './path_definition';
import SchemaDefinition from './schema_definition';
import SecurityDefinition from './security_defintion';

/**
 * Ensures config data is formatted correctly and populates default values
 */
export default class ConfigModel{
    constructor(configJson){
        let requiredSchemas = [];
        let requiredSecurityDefinitions = [];
        if(!configJson.title || typeof configJson.title !== 'string'){
            throw new Error('Title must be a string');
        }
        this.title = configJson.title;
        if(!configJson.title || typeof configJson.title !== 'string'){
            throw new Error('Title must be a string');
        }
        this.basePath = configJson.basePath || '/';
        this.paths = [];
        if(!configJson.paths || !Array.isArray(configJson.paths)){
            throw new Error("Paths configuration must be an array");
        }else{
            for(var pathIndex = 0; pathIndex < configJson.paths.length; pathIndex++){
                const newPath = new PathDefinition(configJson.paths[pathIndex], configJson.allPaths);
                this.paths.push(newPath);
                requiredSchemas = ArrayUtils.mergeDedup(this.requiredSchemas, newPath.methods.requiredSchemas);
                requiredSecurityDefinitions = ArrayUtils.mergeDedup(this.requiredSecurityDefinitions, newPath.methods.requiredSecurityDefinitions);
            }
        }
        this.apiIntegration = configJson.apiIntegration || null;
        //Ensure we have all required schemas
        let identifiedSchemas = JSON.parse(JSON.stringify(requiredSchemas));
        this.schemas = {};
        for(const schemaName in configJson.schemas){
            if(identifiedSchemas.includes(schemaName)){
                identifiedSchemas = identifiedSchemas.filter(element => element !== schemaName);
                this.schemas[schemaName] = new SchemaDefinition(configJson.schemas[schemaName]);
            }else{
                console.log(Chalk.yellow(`The schema: ${schemaName} is present in configuration but not required by any path`));
            }
        }
        if(identifiedSchemas.length > 0){
            console.log(Chalk.yellow(`The following schemas are required by paths, but not included in the schema configuration: ${identifiedSchemas.join(',')}`));
        }


        
        //Ensure we have all required security definitions
        let identifiedSecurityDefinitions = JSON.parse(JSON.stringify(requiredSecurityDefinitions));
        this.securityDefinitions = {};
        for(const securityDefinitionName in configJson.securityDefinitions){
            if(identifiedSecurityDefinitions.includes(securityDefinitionName)){
                identifiedSecurityDefinitions = identifiedSecurityDefinitions.filter(element => element !== securityDefinitionName);
                this.securityDefinitions[securityDefinitionName] = new SecurityDefinition(configJson.securityDefinitions[securityDefinitionName]);
            }else{
                console.log(Chalk.yellow(`The security definition: ${securityDefinitionName} is present in configuration but not required by any path`));
            }
        }
        if(identifiedSecurityDefinitions.length > 0){
            console.log(Chalk.yellow(`The following security definitions are required by paths, but not included in the security definition configuration: ${identifiedSecurityDefinitions.join(',')}`));
        }
    };
}