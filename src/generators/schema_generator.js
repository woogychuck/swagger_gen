import GeneratorBase from './generator_base';

export default class SchemaGenerator extends GeneratorBase {
    constructor(configuration){
        super(configuration);
        this.schemas = this.configuration.schemas;
        this.yaml = '';
        this.generate();
    }

    generate(){
        this.yaml += 'definitions:\n'
    for(let schemaName in this.schemas){
        const schemaDef = this.schemas[schemaName];
        this.yaml += `  ${schemaName}:
    type: "object"
    title: "${schemaDef.title || schemaName}"
    description: "${schemaDef.description || ''}"\n`;

        let requiredYaml = '    required:\n'
        let propertiesYaml = '    properties:\n';

        for(let fieldIndex = 0; fieldIndex < schemaDef.fields.length; fieldIndex++){
            const fieldDef = schemaDef.fields[fieldIndex];
            if(typeof fieldDef === 'string'){
                requiredYaml += `    - "${fieldDef}"\n`;
                propertiesYaml += `      ${fieldDef}:
        type: "string"
        description: "Required string ${fieldDef}"\n`
            }else{
                //Add logic for complex fields her
                console.log('TYPE OF FIELD DEF: ' + typeof fieldDef);
            }
        }

        this.yaml += requiredYaml;
        this.yaml += propertiesYaml;
    }
    }
}