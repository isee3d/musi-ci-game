import { Fragment } from "@prisma/client"
import { FragmentWithNotes, FragmentWithNotesAndWeight } from "~/components/fragmentPlayer/audio/fragmentWithNotes"

export interface FragmentGroup {
    id: number
    name: string
    description: string | null
    fragments: FragmentWithNotes[]
}

export interface FragmentGroupWithWeights {
    id: number
    name: string
    description: string | null
    fragments: FragmentWithNotesAndWeight[]
}
