import Link from 'next/link'
import React from 'react'
import { Button } from '~/components/ui/button'
import { useLuisterenStore } from '~/stores/gameModes/luisterenStore'

interface BackToOverViewProps {
  levelId: string
  sublevelId: string
}

const BackToOverView: React.FC<BackToOverViewProps> = ({ levelId, sublevelId }) => {
  const { reset } = useLuisterenStore()
  return (
    <Button asChild>
      <Link onClick={() => reset} href={`/progress/${levelId}/${sublevelId}`}>
        <h3>Terug naar overzicht</h3>
      </Link>
    </Button>
  )
}

export default BackToOverView
