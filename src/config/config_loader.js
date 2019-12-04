import ConfigModel from './config_model';
import chalk from 'chalk';

/**
 * Loads config data from a config file and generates ConfigModels
 */
export default class ConfigLoader {
    constructor(fs){
        this.fs = fs;
    }
    load(path){
        let configFileContents;
        const defaultConfigPath = './open_api.json';
        if(path){
            console.log(chalk.green('LOADING FROM CUSTOM PATH', path));
            //Load config from custom path
            configFileContents = this.fs.readFileSync(path,'UTF8');
        }else{
            console.log(chalk.green('LOADING FROM DEFAULT PATH', defaultConfigPath));
            //Load config from default path
            configFileContents = this.fs.readFileSync(defaultConfigPath,'UTF8');
        }
        this.config = new ConfigModel(JSON.parse(configFileContents));
        return this.config;
    }
}