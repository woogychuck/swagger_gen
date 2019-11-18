import ConfigModel from './config_model';
import * as fs from 'fs';

/**
 * Loads config data from a config file and generates ConfigModels
 */
export default class ConfigLoader {
    static load(path){
        let configFileContents;
        if(path){
            //Load config from custom path
            configFileContents = fs.readFileSync(path,'UTF8');
        }else{
            //Load config from default path
            configFileContents = fs.readFileSync('./open_api.json','UTF8');
        }
        this.config = new ConfigModel(JSON.parse(configFileContents));
        return this.config;
    }
}