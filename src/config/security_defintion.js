//If we were really sticking with the naming convention, this should technically be
//SecurityDefinitionDefinition, but that sounds dumb so we're not doing it.

export default class SecurityDefinition{
    constructor(securityDefinitionConfig){
        if(!securityDefinitionConfig.type || typeof securityDefinitionConfig.type !== 'string'){
            throw new Error("Security definition type is required and must be a string");
        }
        this.type = securityDefinitionConfig.type;

        if(!securityDefinitionConfig.name || typeof securityDefinitionConfig.name !== 'string'){
            throw new Error("Security definition name is required and must be a string");
        }
        this.name = securityDefinitionConfig.name;

        this.in = securityDefinitionConfig.in || 'header';
    }
}