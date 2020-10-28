import { IColumnHeader } from '@/services/definitions'


export const HCatalogsTable: Partial<IColumnHeader> [] = [            // H is for headers
    { title: 'Name' },
    { title: 'Size(MB)', navKey: 'size' },
    { title: 'Items', toCenter: true, width: 5 },
    { title: 'Active', toCenter: true, navKey: 'isEnable' },
    { title: 'Actions', toRight: true }
]
