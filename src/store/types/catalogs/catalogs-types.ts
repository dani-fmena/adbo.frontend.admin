export interface ICatalog {
    _id: string,
    name: string,
    size: string,
    item: string,
    isEnable: boolean,
    createdAt: string,
    updatedAt: string
}

export interface ICatalogState {                                                    // Vuex state
    catalogs: Array<ICatalog>
}
