import GeneratorBase from './generator_base';
import ApiIntegrationGenerator from './api_integration_generator';

export default class PathGenerator extends GeneratorBase{
  constructor(configuration){
      super(configuration);
      this.paths = configuration.paths;
      this.json = {};
      const apiIntegrationGenerator = new ApiIntegrationGenerator(this.configuration);
      this.apiIntegration = apiIntegrationGenerator.json;
      this.generate();
  }

  generate(){
    for(let pathIndex = 0; pathIndex < this.paths.length; pathIndex++){
      const currentPathDefinition = this.paths[pathIndex];
      this.json[currentPathDefinition.path] = {};
      let currentPathObj = this.json[currentPathDefinition.path];

      let methodList = ['OPTIONS'];
      for(const method in currentPathDefinition.methods){
        const currentMethodDefinition = currentPathDefinition.methods[method];
        methodList.push(method.toUpperCase());
        currentPathObj[method] = {};
        let currentMethodObj = currentPathObj[method];
        currentMethodObj.produces = [currentPathDefinition.produces];
        
        if(method !== 'get'){
          currentMethodObj.consumes = [currentPathDefinition.produces];
        }

        let parametersArr = [];
      
        if(currentMethodDefinition.payloadSchema){
          let payloadObj = {
            in: 'body',
            name: currentMethodDefinition.payloadSchema,
            required: true,
            schema:{
              '$ref':`#/definitions/${currentMethodDefinition.payloadSchema}`
            }
          }
          parametersArr.push(payloadObj);
        }
        
        //TODO: Pretty much everythign in follow block should use regular expressions...
        if(currentPathDefinition.path.indexOf('{') >= 0){
            //Add path parameters
            const paramName = currentPathDefinition.path.substring(currentPathDefinition.path.indexOf('{')+1,currentPathDefinition.path.indexOf('}'));
            let pathObj = {
              in: 'path',
              name: paramName,
              required: true,
              type: 'string'
            }
            parametersArr.push(pathObj)
        }

        if(parametersArr.length > 0){
          currentPathObj[method].parameters = parametersArr;
        }

        currentPathObj[method].responses = {
          '200': {
            description: '200 response'
          }
        };
        
        if(currentMethodDefinition.security){
          let securityObj = {};
          securityObj[currentMethodDefinition.security] = [];
          currentPathObj[method].security = [securityObj];
        }

        //Add the gateway integration
        currentPathObj[method]['x-amazon-apigateway-integration'] = this.apiIntegration;
      }

      if(currentPathDefinition.includeOptions){
        let optionsObj = {
          consumes:['application/json'],
          produces:['application/json'],
          responses:{
            '200':{
              description: '200 response',
              headers:{
                'Access-Control-Allow-Origin': {type:'string'},
                'Access-Control-Allow-Methods': {type:'string'},
                'Access-Control-Allow-Headers': {type:'string'},
              }
            }
          },
          'x-amazon-apigateway-integration':{
            responses:{
              default:{
                statusCode:'200',
                responseParameters:{
                  'method.response.header.Access-Control-Allow-Origin':"'*'",
                  'method.response.header.Access-Control-Allow-Methods':`'${methodList.join(',')}'`,
                  'method.response.header.Access-Control-Allow-Methods':"'Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token'"
                }
              }
            },
            requestTemplates:{
              'application/json':"{\"statusCode\": 200}"
            },
            passthroughBehavior: 'when_no_match',
            type:'mock'
          }
        }
        
        currentPathObj.options = optionsObj;
      }
    }
  }
}
