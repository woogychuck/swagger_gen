import ArrayUtils from './array';

describe('Array Utils', () => {

    describe('- dedup', () => {
        it('- should dedup an array', () => {
            const dupArray = [1,1,2,2,3,4,5,5];
            const expectedResult = [1,2,3,4,5];
            const result = ArrayUtils.dedup(dupArray);
            expect(result).toEqual(expectedResult);
        });
    })
    
    describe('- mergeDedpu', () => {

    });
    
});