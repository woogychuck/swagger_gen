import GeneratorBase from './generator_base';

export default class SecurityDefinitionGenerator extends GeneratorBase {
    constructor(configuration){
        super(configuration);
        this.securityDefinitions = this.configuration.securityDefinitions;
        this.yaml = '';
        this.generate();
    }

    generate(){
        this.yaml += 'securityDefinitions:\n';
    for(let securityDefinitionName in this.securityDefinitions){
        const securityDefinition = this.securityDefinitions[securityDefinitionName];
        this.yaml += `  ${securityDefinitionName}:
    type: "${securityDefinition.type}"
    name: "${securityDefinition.name}"
    in: "${securityDefinition.in}"\n`
    }
    }
}