import GeneratorBase from './generator_base';
import PathGenerator from './path_generator';
import SchemaGenerator from './schema_generator';
import SecurityDefinitionGenerator from './security_definition_generator';
import * as fs from 'fs';

export default class RootGenerator extends GeneratorBase {
    constructor(configuration){
        super(configuration);
        this.yaml = '';
        this.generate();
    }

    generate() {
        this.yaml = `---
swagger: "2.0"
info:
version: "2018-06-12T20:58:41Z"
title: "${this.configuration.title}"
host: ""
basePath: "${this.configuration.basePath}"
schemes:
- "https"
paths:\n`;

    const pathGenerator = new PathGenerator(this.configuration);
    this.yaml += pathGenerator.yaml;
    const securityDefinitionGenerator = new SecurityDefinitionGenerator(this.configuration);
    this.yaml += securityDefinitionGenerator.yaml;
    const schemaGenerator = new SchemaGenerator(this.configuration);
    this.yaml += schemaGenerator.yaml;
    };

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
