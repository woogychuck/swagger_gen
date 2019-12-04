import CliOptions from './cli_options';
describe('CLI Options', () => {
    it('- Should throw if no params provided', () => {
        try{
            const cliOptions = new CliOptions();
            fail();
        }catch(error){
            expect(error.message).toEqual('Options parameter required to create CLI Options object');
        }
    });

    it('- Should default output and config to null', () => {
        const cliOptions = new CliOptions({});
        expect(cliOptions.config).toEqual(null);
        expect(cliOptions.output).toEqual(null);
    });

    it('- Should set config and output if provided', () => {
        const cliOptions = new CliOptions({output:'output.yaml',config:'config.json'});
        expect(cliOptions.config).toEqual('config.json');
        expect(cliOptions.output).toEqual('output.yaml');
    })
})