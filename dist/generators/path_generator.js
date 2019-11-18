"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _generator_base = _interopRequireDefault(require("./generator_base"));

var _api_integration_generator = _interopRequireDefault(require("./api_integration_generator"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class PathGenerator extends _generator_base.default {
  constructor(configuration) {
    super(configuration);
    this.paths = configuration.paths;
    this.yaml = '';
    const apiIntegrationGenerator = new _api_integration_generator.default(this.configuration);
    this.apiIntegrationYAML = apiIntegrationGenerator.yaml;
    this.generate();
  }

  generate() {
    let pathYamls = [];

    for (let pathIndex = 0; pathIndex < this.paths.length; pathIndex++) {
      const currentPath = this.paths[pathIndex];
      let methodList = [];
      let pathYaml = '  ' + currentPath.path + ':\n';

      for (const method in currentPath.methods) {
        const currentMethodDef = currentPath.methods[method];
        methodList.push(method.toUpperCase());
        pathYaml += '    ' + method + ':\n      produces:\n      - "application/json"\n';

        if (method !== 'get') {
          pathYaml += '      consumes:\n      - "application/json"\n';
        }

        let addParameters = false;
        let parametersYaml = '      parameters:\n';

        if (currentMethodDef.payloadSchema) {
          addParameters = true;
          parametersYaml += `      - in: "body"
        name: "${currentMethodDef.payloadSchema}"
        required: true
        schema:
          $ref: "#/definitions/${currentMethodDef.payloadSchema}"\n`;
        } //TODO: Pretty much everythign in follow block should use regular expressions...


        if (currentPath.path.indexOf('{') >= 0) {
          //Add path parameters
          const paramName = currentPath.path.substring(currentPath.path.indexOf('{') + 1, currentPath.path.indexOf('}'));
          addParameters = true;
          parametersYaml += `      - in: "path"
        name: "${paramName}"
        required: true
        type: "string"\n`;
        }

        if (addParameters) {
          pathYaml += parametersYaml;
        }

        pathYaml += '      responses:\n        200:\n          description: "200 response"\n';

        if (currentMethodDef.security) {
          pathYaml += `      security:\n      - ${currentMethodDef.security}: []\n`;
        } //Add the gateway integration


        pathYaml += '      ' + this.apiIntegrationYAML;
      }

      if (currentPath.includeOptions) {
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
        type: "mock"\n`;
      }

      pathYamls.push(pathYaml);
    } //Write paths to file


    this.yaml += pathYamls.join('\n') + '\n';
  }

}

exports.default = PathGenerator;