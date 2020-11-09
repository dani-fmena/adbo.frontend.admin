import { IColumnHeader } from '@/services/definitions'


export const HCatalogsTable: Partial<IColumnHeader> [] = [            // H means headers
    { title: 'Id', navKey: '_id', hidden: true },
    { title: 'Name' },
    { title: 'Active', toCenter: true, navKey: 'isEnable', switch: true },
    { title: 'Size(MB)', navKey: 'size', width: 6 },
    { title: 'Items', toCenter: true, width: 6 },
    { title: 'Actions', toRight: true, width: 40}
]
