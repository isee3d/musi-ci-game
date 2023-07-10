import { Fragment } from "@prisma/client"

export interface FragmentGroup {
    id: number
    name: string
    description: string | null
    fragments: Fragment[]
}
