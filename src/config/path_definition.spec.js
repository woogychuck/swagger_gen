import PathDefinition from './path_definition';


describe("Path Definition", () => {
    let newPathConfig;

    beforeEach(()=>{
        newPathConfig = {
            "security":"api_key",
            "payloadSchema":"create_user"
        };
    });

    it(" - Should throw if no configuration is present", () => {
        try{
            const badPath = new PathDefinition();
            fail();
        }catch(error){
            expect(error.message).toBe("A path configuration is required");
        }
    });
});