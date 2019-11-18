"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _generator_base = _interopRequireDefault(require("./generator_base"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class APIIntegrationGenerator extends _generator_base.default {
  constructor(configuration) {
    super(configuration);
    this.yaml = '';
    this.generate();
  }

  generate() {
    const apiIntegration = this.configuration.apiIntegration;
    this.yaml = `x-amazon-apigateway-integration:
        credentials: "${apiIntegration.credentials}"
        uri: "${apiIntegration.uri}"
        passthroughBehavior: "when_no_match"
        httpMethod: "POST"
        type: "aws_proxy"\n`;
  }

}

exports.default = APIIntegrationGenerator;