import ConfigModel from './config_model';
import * as fs from 'fs';
import chalk from 'chalk';

/**
 * Loads config data from a config file and generates ConfigModels
 */
export default class ConfigLoader {
    static load(path){
        let configFileContents;
        const defaultConfigPath = './open_api.json';
        if(path){
            console.log(chalk.green('LOADING FROM CUSTOM PATH', path))
            //Load config from custom path
            configFileContents = fs.readFileSync(path,'UTF8');
        }else{
            console.log(chalk.green('LOADING FROM DEFAULT PATH', defaultConfigPath));
            //Load config from default path
            configFileContents = fs.readFileSync(defaultConfigPath,'UTF8');
        }
        this.config = new ConfigModel(JSON.parse(configFileContents));
        return this.config;
    }
}