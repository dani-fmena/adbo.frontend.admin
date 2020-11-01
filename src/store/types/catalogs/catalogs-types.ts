export interface ICatalog {
    _id: string,
    name: string,
    size: string,
    item: string,
    isEnable: string,
    createdAt: string,
    updatedAt: string
}

export interface ICatalogState {
    catalogs: Array<ICatalog>
}
