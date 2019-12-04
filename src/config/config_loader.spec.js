import * as openAPIConf from '../../open_api.json';
import ConfigModel from './config_model';
import ConfigLoader from './config_loader';

describe("Config loader", () => {
    let fsMoc,
        configLoader;

    beforeEach(() => {
        fsMoc = jasmine.createSpyObj("fsMoc",['readFileSync']);

        fsMoc.readFileSync.and.callFake((path) => {
            if(path == 'boom'){
                throw new Error("BOOM");
            }else{
                return JSON.stringify(openAPIConf);
            }
        });

        configLoader = new ConfigLoader(fsMoc);
    });

    it('- Should generate a valid ConfigModel object', () => {
        const exampleConfig = configLoader.load();
        expect(exampleConfig instanceof ConfigModel).toEqual(true);
    });

    it('- Should load from the default path', () => {
        const exampleConfig = configLoader.load();
        expect(fsMoc.readFileSync).toHaveBeenCalledWith('./open_api.json', 'UTF8');
    });

    it('- Should load from a custom path', () => {
        const exampleConfig = configLoader.load('./custom_config.json');
        expect(fsMoc.readFileSync).toHaveBeenCalledWith('./custom_config.json', 'UTF8');
    });
});