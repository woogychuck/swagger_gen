import PathDefinition from './path_definition';


describe('Path Definition', () => {
    let newPathConfig;

    beforeEach(()=>{
        newPathConfig = {
            path:'/widgets',
            methods:{
                'get':{}
            }
        };
    });

    describe('Constructor valdidation', ()=>{

        it('- Should throw if no configuration is present', () => {
            try{
                const badPath = new PathDefinition();
                fail();
            }catch(error){
                expect(error.message).toBe('A path configuration is required');
            }
        });

        it('- Should throw if no path property is present', () => {
            newPathConfig.path = null;
            try{
                const badPath = new PathDefinition(newPathConfig);
                fail();
            }catch(error){
                expect(error.message).toBe('A valid path property must be provided for path configurations');
            }
        });

        it('- Should throw if path property is not a string', () => {
            newPathConfig.path = ['turtle'];
            try{
                const badPath = new PathDefinition(newPathConfig);
                fail();
            }catch(error){
                expect(error.message).toBe('A valid path property must be provided for path configurations');
            }
        });

        it('- Should throw if no methods are present', () => {
            newPathConfig.methods = null;
            try{
                const badPath = new PathDefinition(newPathConfig);
                fail();
            }catch(error){
                expect(error.message).toBe('A path must have a valid methods definition');
            }
        });
    });

    describe('- Default values', () => {
        it(' - Should set includeOptions to false by default', () => {
            const goodPath = new PathDefinition(newPathConfig);

            expect(goodPath.includeOptions).toEqual(false);
        });
    })

});