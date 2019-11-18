"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

class MethodDefinition {
  constructor(newMethod) {
    if (!newMethod) {
      throw new Error("A method configuration is required");
    }
  }

}

exports.default = MethodDefinition;