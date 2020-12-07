import { IColumnHeader } from '@/services/definitions'


export const HCatalogsTable: Partial<IColumnHeader> [] = [            // H means headers
    { title: '', chk: true, width: 2 },
    { title: 'Id', navKey: '_id', hidden: true },
    { title: 'Name', sorting: 'none' },
    { title: 'Active', toCenter: true, navKey: 'isEnable', switch: true },
    { title: 'Size(MB)', navKey: 'size', width: 8, sorting: 'none'},
    { title: 'Items', toCenter: true, width: 8 },
    { title: 'Actions', toRight: true, width: 40}
]
export const PAGE_SIZE = 10
