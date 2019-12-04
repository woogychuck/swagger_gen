export default class CliOptions {
    constructor(options){
        if(!options){
            throw new Error('Options parameter required to create CLI Options object');
        }
        this.output = options.output || null;
        this.config = options.config || null;
    }
}