import { Fragment } from "@prisma/client"
import { FragmentWithNotes } from "~/components/fragmentPlayer/audio/fragmentWithNotes"

export interface FragmentGroup {
    id: number
    name: string
    description: string | null
    fragments: FragmentWithNotes[]
}
