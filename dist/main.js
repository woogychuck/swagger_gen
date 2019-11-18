"use strict";

var _root_generator = _interopRequireDefault(require("./generators/root_generator"));

var _config_loader = _interopRequireDefault(require("./config/config_loader"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const configuration = _config_loader.default.load();

const rootGenerator = new _root_generator.default(configuration);
rootGenerator.writeFile();