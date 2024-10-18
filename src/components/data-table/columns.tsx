import { ColumnDef } from "@tanstack/react-table"

export type Payment = {
  id?: string
  rider: number
  distance: number
  savings: number
  finalPayment: number
}

export const englishColumns: ColumnDef<Payment>[] = [
  {
    accessorKey: "rider",
    header: "Rider",
    cell: ({ getValue }) => `Rider ${getValue()}`
  },
  {
    accessorKey: "distance",
    header: "Distance",
    cell: ({ getValue }) => `${getValue()}km`
  },
  {
    accessorKey: "savings",
    header: "Savings",
    cell: ({ getValue }) => `¥${getValue()} `
  },
  {
    accessorKey: "finalPayment",
    header: "Amount To Pay",
    cell: ({ getValue }) => `¥${getValue()} `
  },
]


export const japaneseColumns: ColumnDef<Payment>[] = [
  {
    accessorKey: "rider",
    header: "乗客",
    cell: ({ getValue }) => `乗客 ${getValue()}`
  },
  {
    accessorKey: "distance",
    header: "距離（km）",
    cell: ({ getValue }) => `${getValue()}km`
  },
  {
    accessorKey: "savings",
    header: "割引",
    cell: ({ getValue }) => `¥${getValue()} `
  },
  {
    accessorKey: "finalPayment",
    header: "支払金額",
    cell: ({ getValue }) => `¥${getValue()} `
  },
]
