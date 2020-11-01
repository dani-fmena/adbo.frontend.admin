import { ById, Indexable, IShell } from '@/services/definitions'


/***
 * Convert a dictionary mapped by Id to an array of the collection objects
 * @param collection The collection of object mapped by the Ids
 */
export function toArray<T> (collection: ById<T>): T[] {
    return Object.keys(collection).reduce<T[]>((pv, cv) => {
        pv.push(collection[cv])
        return pv
    }, [])
}

/***
 * Convert the collection params array to a dictionary mapped by objects ID
 * @param collection Data collection
 */
export function toDicIds<T extends Indexable> (collection: T[]): ById<T> {
    return collection.reduce<ById<T>>((pv, cv) => {
        pv[cv._id] = cv
        return pv
    }, {})
}

export function toShell<T extends Indexable> (items: Array<T>): IShell<T> {
    const dictionary = toDicIds(items)
    
    return {
        array: toArray(dictionary),
        dic: dictionary
    }
}
