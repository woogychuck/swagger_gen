import MethodsDefinition from './methods_definition';


describe("Methods Definition", () => {
    let newMethodsConfig;

    beforeEach(()=>{
        newMethodsConfig = {"get":{
            "security":"api_key",
            "payloadSchema":"create_user"
        }};
    });

    it(" - Should throw if no configuration is present", () => {
        try{
            const badMethod = new MethodsDefinition();
            fail();
        }catch(error){
            expect(error.message).toBe("A methods configuration is required");
        }
    });
});