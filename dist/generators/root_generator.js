"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _generator_base = _interopRequireDefault(require("./generator_base"));

var _path_generator = _interopRequireDefault(require("./path_generator"));

var _schema_generator = _interopRequireDefault(require("./schema_generator"));

var _security_definition_generator = _interopRequireDefault(require("./security_definition_generator"));

var fs = _interopRequireWildcard(require("fs"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class RootGenerator extends _generator_base.default {
  constructor(configuration) {
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
    const pathGenerator = new _path_generator.default(this.configuration);
    this.yaml += pathGenerator.yaml;
    const securityDefinitionGenerator = new _security_definition_generator.default(this.configuration);
    this.yaml += securityDefinitionGenerator.yaml;
    const schemaGenerator = new _schema_generator.default(this.configuration);
    this.yaml += schemaGenerator.yaml;
  }

  writeFile(path) {
    if (!path) {
      path = './swagger.yaml';
    }

    fs.writeFile(path, this.yaml, err => {
      if (err) {
        console.log('AN ERROR OCCURRED SAVING THE FILE');
        console.log(err);
      } else {
        console.log('File Successfully Written');
      }
    });
  }

}

exports.default = RootGenerator;