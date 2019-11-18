export default class MethodDefinition {
    constructor(newMethod){
        if(!newMethod){
            throw new Error("A method configuration is required");
        }
    }
}