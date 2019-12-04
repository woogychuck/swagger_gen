import SchemaFieldDefinition from './schema_field_definition';

export default class SchemaDefinition{
    constructor(schemaDefinitionConfig){
        this.requiredFields = [];
        if(!schemaDefinitionConfig){
            throw new Error('A schema configuration must be provided');
        }

        if(!schemaDefinitionConfig.title || typeof schemaDefinitionConfig.title !== 'string'){
            throw new Error('Schema configuration title is required and must be a string');
        }
        this.title = schemaDefinitionConfig.title.trim();

        if(schemaDefinitionConfig.description && typeof schemaDefinitionConfig.description !== 'string'){
            throw new Error('Schema configuration description must be a string');
        }
        if(schemaDefinitionConfig.description){
            this.description = schemaDefinitionConfig.description.trim();
        }else{
            this.description = '';
        }

        if(!schemaDefinitionConfig.fields || schemaDefinitionConfig.fields.length == 0){
            throw new Error('A schema must have at least one field');
        }
        this.fields = [];
        for (let fieldIndex = 0; fieldIndex < schemaDefinitionConfig.fields.length; fieldIndex++) {
            const schemaFieldDefinition = schemaDefinitionConfig.fields[fieldIndex];
            const newField = new SchemaFieldDefinition(schemaFieldDefinition);
            this.fields.push(newField);
            if(newField.required){
                this.requiredFields.push(newField.name);
            }
        }
    }
}