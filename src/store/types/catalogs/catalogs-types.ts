
export interface ICatalog {
    id: string,
    type: string,
    brand: string,
    model: string,
}

export interface ICatalogState {
    catalogs: ICatalog[]
}
