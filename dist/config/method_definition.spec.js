"use strict";

var _method_definition = _interopRequireDefault(require("./method_definition"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe("Method Definition", () => {
  let newMethodConfig;
  beforeEach(() => {
    newMethodConfig = {
      "security": "api_key",
      "payloadSchema": "create_user"
    };
  });
  it(" - Should throw if no configuration is present", () => {
    try {
      const badMethod = new _method_definition.default();
      fail();
    } catch (error) {
      expect(error.message).toBe("A method configuration is required");
    }
  });
});