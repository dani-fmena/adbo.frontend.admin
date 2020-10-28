export interface IColumnHeader {
    hidden: boolean | undefined
    title: string
    navKey: string | undefined                                      // To v-for can navigate in the data array. if isn't present, uf lower-cased title then
    toLeft: boolean | undefined
    toRight: boolean | undefined
    toCenter: boolean | undefined
    width: number | undefined                                       // percent
}
