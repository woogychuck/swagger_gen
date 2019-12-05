import GeneratorBase from './generator_base';

export default class SchemaGenerator extends GeneratorBase {
    constructor(configuration){
        super(configuration);
        this.schemas = this.configuration.schemas;
        this.json = {};
        this.generate();
    }

    generate(){
        for(let schemaName in this.schemas){
            const schemaDef = this.schemas[schemaName];

            this.json[schemaName] = {
                type: 'object',
                title: schemaDef.title || schemaName,
                description: schemaDef.description || '',
                required: [],
                properties: {}
            };

            console.log(schemaDef);

            for(let fieldIndex = 0; fieldIndex < schemaDef.fields.length; fieldIndex++){
                const fieldDef = schemaDef.fields[fieldIndex];
                this.json[schemaName].required.push(fieldDef.name);
                this.json[schemaName].properties[fieldDef.name] = {
                    name: fieldDef.name,
                    required: fieldDef.required,
                    type: fieldDef.type,
                    description: fieldDef.description
                }
            }
        }
    }
}