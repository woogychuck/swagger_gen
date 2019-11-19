export default class CliOptions {
    constructor(options){
        this.output = options.output || null;
        this.config = options.config || null;
    }
}