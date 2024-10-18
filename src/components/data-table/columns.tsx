import { ColumnDef } from "@tanstack/react-table"

// TODO: Need to add Japanese translations here. 
export type Payment = {
  id?: string
  rider: number
  distance: number
  savings: number
  finalPayment: number
}

export const columns: ColumnDef<Payment>[] = [
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
