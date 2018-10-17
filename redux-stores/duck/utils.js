import {OrderedMap, Map} from 'immutable'


export function fbDatatoEntities(arr, DataRecord = Map) {
    return arr.reduce((acc, item) =>
        acc.set(item._id, new DataRecord(item))
    , new OrderedMap({}))
}

export function mapToArr(obj) {
    return obj.valueSeq().toArray()
}