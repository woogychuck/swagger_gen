"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _generator_base = _interopRequireDefault(require("./generator_base"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class SecurityDefinitionGenerator extends _generator_base.default {
  constructor(configuration) {
    super(configuration);
    this.securityDefinitions = this.configuration.securityDefinitions;
    this.yaml = '';
    this.generate();
  }

  generate() {
    this.yaml += 'securityDefinitions:\n';

    for (let securityDefinitionName in this.securityDefinitions) {
      const securityDefinition = this.securityDefinitions[securityDefinitionName];
      this.yaml += `  ${securityDefinitionName}:
    type: "${securityDefinition.type}"
    name: "${securityDefinition.name}"
    in: "${securityDefinition.in}"\n`;
    }
  }

}

exports.default = SecurityDefinitionGenerator;