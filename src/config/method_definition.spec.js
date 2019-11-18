import MethodDefinition from './method_definition';


describe("Method Definition", () => {
    let newMethodConfig;

    beforeEach(()=>{
        newMethodConfig = {
            "security":"api_key",
            "payloadSchema":"create_user"
        };
    });

    it(" - Should throw if no configuration is present", () => {
        try{
            const badMethod = new MethodDefinition();
            fail();
        }catch(error){
            expect(error.message).toBe("A method configuration is required");
        }
    });
});