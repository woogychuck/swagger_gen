export default class SchemaFieldDefinition {
    constructor(fieldConfiguration){
        if(!fieldConfiguration){
            throw new Error("A field configuration must be provided");
        }
        this.required = true;
        this.description = '';
        this.type = 'string';
        this.name = '';

        if(typeof fieldConfiguration == 'string'){
            this.name = fieldConfiguration;
            this.description = `${fieldConfiguration} is required and must be a string`;
        }else{
            if(!fieldConfiguration.name || typeof fieldConfiguration.name !== 'string'){
                throw new Error('Field configuration name is required and must be a string');
            }
            this.name = fieldConfiguration.name;
            this.required = typeof fieldConfiguration.required == 'boolean' ? fieldConfiguration.required : true;
            this.type = fieldConfiguration.type || 'string';            
            this.description = fieldConfiguration.description || '';
        }
    }
}