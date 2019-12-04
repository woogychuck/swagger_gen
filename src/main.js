#!/usr/bin/env node

import CliOptions from './config/cli_options';
import ConfigLoader from './config/config_loader';
import RootGenerator from './generators/root_generator';
import sywac from 'sywac';
import * as fs from 'fs';

function generateYamlFile(options){
    const configPath = options.config || null;
    const outputPath = options.output || null;
    const configLoader = new ConfigLoader(fs);
    const configuration = configLoader.load(configPath);
    const rootGenerator = new RootGenerator(configuration);
    rootGenerator.writeFile(outputPath);
}

sywac
    .string('-c,--config',{
        desc: 'The path of the configuration json to use. (Defaults to ./open_api.json)'
    })
    .string('-o,--output',{
        desc: 'The target path for the yaml output to write to. (Defaults to ./swagger.yaml)'
    })
    .help('-h, --help')
    .parseAndExit()
    .then(options => new CliOptions(options))
    .then(cliOptions => generateYamlFile(cliOptions))
    .catch(error => {
        console.log(error);
        process.exitCode = 1;
    });
