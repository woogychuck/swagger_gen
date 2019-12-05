import GeneratorBase from './generator_base';
import PathGenerator from './path_generator';
import SchemaGenerator from './schema_generator';
import SecurityDefinitionGenerator from './security_definition_generator';
import * as json2yaml from 'json2yaml';
import * as fs from 'fs';

export default class RootGenerator extends GeneratorBase {
    constructor(configuration){
        super(configuration);
        this.json = {};
        this.yaml = '';
        this.generate();
    }

    generate() {
        this.json = {
            swagger: '2.0',
            info: {
                version:'2018-06-12T20:58:41Z',
                title: this.configuration.title,
                host: '',
                basePath: this.configuration.basePath,
                schemes: ['https']
            },
            paths:{}
        };

        const pathGenerator = new PathGenerator(this.configuration);
        this.json.paths = pathGenerator.json;

        const securityDefinitionGenerator = new SecurityDefinitionGenerator(this.configuration);
        this.json.securityDefinitions = securityDefinitionGenerator.json;

        const schemaGenerator = new SchemaGenerator(this.configuration);
        this.json.definitions = schemaGenerator.json; 

        this.yaml = json2yaml.stringify(this.json);
    }

    writeFile(path){
        if(!path){
            path = './swagger.yaml';
        }
        fs.writeFile(path,this.yaml,(err)=>{
            if(err){
                console.log('AN ERROR OCCURRED SAVING THE FILE');
                console.log(err);
            }else{
                console.log('File Successfully Written');
            }
        })
    }

}
