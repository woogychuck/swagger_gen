import GeneratorBase from './generator_base';

export default class SecurityDefinitionGenerator extends GeneratorBase {
    constructor(configuration){
        super(configuration);
        this.securityDefinitions = this.configuration.securityDefinitions;
        this.json = {};
        this.generate();
    }

    generate(){
        for(let securityDefinitionName in this.securityDefinitions){
            const securityDefinition = this.securityDefinitions[securityDefinitionName];

            this.json[securityDefinitionName] = {
                type: securityDefinition.type,
                name: securityDefinition.name,
                in: securityDefinition.in
            }
        }
    }
}