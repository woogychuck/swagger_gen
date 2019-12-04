export default class ArrayUtils {
    static dedup(array){
        let dedupedArray = [];
        for (let index = 0; index < array.length; index++) {
            if(!dedupedArray.includes(array[index])){
                dedupedArray.push(array[index]);
            }
        }
        return dedupedArray;
    }

    static mergeDedup(array1, array2){
        if(!array1){
            array1 = [];
        }
        let dupedArray = array1.concat(array2);
        return ArrayUtils.dedup(dupedArray);
    }
}