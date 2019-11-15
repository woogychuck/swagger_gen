const conf = require('./swagger_conf.json');
const fs = require('fs');


let title = conf.title;
let basePath = conf.stage;
let paths = conf.paths;
let apiIntegration = conf.apiIntegration || null;
let schemas = conf.schemas;
let secDefs = conf.securityDefinitions;

let fileOutput = '';
let apiIntegrationYAML = '';
let pathYamls = [];

//Build Header
fileOutput += `---
swagger: "2.0"
info:
  version: "2018-06-12T20:58:41Z"
  title: "${title}"
host: ""
basePath: "${basePath}"
schemes:
- "https"
paths:\n`;

//Build API Integration Block
apiIntegrationYAML = `x-amazon-apigateway-integration:
        credentials: "${apiIntegration.credentials}"
        uri: "${apiIntegration.uri}"
        passthroughBehavior: "when_no_match"
        httpMethod: "POST"
        type: "aws_proxy"\n`;

//Build Paths
for(let pathIndex = 0; pathIndex < paths.length; pathIndex++){
    const currentPath = paths[pathIndex];
    let methodList = [];
    let pathYaml = '  ' + currentPath.path + ':\n';
    for(const method in currentPath.methods){
        const currentMethodDef = currentPath.methods[method];
        methodList.push(method.toUpperCase());
        pathYaml += '    ' + method + ':\n      produces:\n      - "application/json"\n';
        if(method !== 'get'){
            pathYaml += '      consumes:\n      - "application/json"\n';
        }

        let addParameters = false;
        let parametersYaml = '      parameters:\n'

        if(currentMethodDef.payloadSchema){
            addParameters = true;
            parametersYaml += `      - in: "body"
        name: "${currentMethodDef.payloadSchema}"
        required: true
        schema:
          $ref: "#/definitions/${currentMethodDef.payloadSchema}"\n`
        }
        
        //TODO: Pretty much everythign in follow block should use regular expressions...
        if(currentPath.path.indexOf('{') >= 0){
            //Add path parameters
            const paramName = currentPath.path.substring(currentPath.path.indexOf('{')+1,currentPath.path.indexOf('}'));
            addParameters = true;
            parametersYaml += `      - in: "path"
        name: "${paramName}"
        required: true
        type: "string"\n`
        }

        if(addParameters){
            pathYaml += parametersYaml;
        }

        pathYaml += '      responses:\n        200:\n          description: "200 response"\n';
        if(currentMethodDef.security){
            pathYaml += `      security:\n      - ${currentMethodDef.security}: []\n`;
        }

        //Add the gateway integration
        pathYaml += '      ' + apiIntegrationYAML;
    }

    if(currentPath.includeOptions){
        pathYaml += `    options:
        consumes:
        - "application/json"
        produces:
        - "application/json"
        responses:
          200:
            description: "200 response"
            headers:
              Access-Control-Allow-Origin:
                type: "string"
              Access-Control-Allow-Methods:
                type: "string"
              Access-Control-Allow-Headers:
                type: "string"
        x-amazon-apigateway-integration:
          responses:
            default:
              statusCode: "200"
              responseParameters:
                method.response.header.Access-Control-Allow-Origin: "'*'"
                method.response.header.Access-Control-Allow-Methods: "'${methodList.join(',')}'"
                method.response.header.Access-Control-Allow-Headers: "'Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token'"
          requestTemplates:
            application/json: "{\"statusCode\": 200}"
          passthroughBehavior: "when_no_match"
          type: "mock"`;
    }

    pathYamls.push(pathYaml);
}

//Write paths to file
fileOutput += pathYamls.join('\n') + '\n';

//Write security definitions
if(secDefs){
    fileOutput += 'securityDefinitions:\n';
    for(let secDefName in secDefs){
        const secDef = secDefs[secDefName];
        fileOutput += `  ${secDefName}:
    type: "${secDef.type}"
    name: "${secDef.name}"
    in: "${secDef.in}"\n`
    }
}

//Write schemas
if(schemas){
    fileOutput += 'definitions:\n'
    for(let schemaName in schemas){
        const schemaDef = schemas[schemaName];
        fileOutput += `  ${schemaName}:
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

        fileOutput += requiredYaml;
        fileOutput += propertiesYaml;
    }
}

//Write the file
fs.writeFile('./swagger_gen.yaml',fileOutput, (err) => {
    if(err){
        console.log('OH SHIT! IT BROKE')
        console.log(err);
    }else{
        console.log('FILE IS WRITTEN!!');
    }
});
