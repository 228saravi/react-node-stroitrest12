import {OrderedMap, Map} from 'immutable'


export function fbDatatoEntities(data, RecordModel = Map) {
    console.log(data)
    return (new OrderedMap(data)).mapEntries(([uid, value]) => {
        console.log(value)
        return([uid, new RecordModel(value)]
    )})
}