import Link from 'next/link'
import React from 'react'
import { Button } from '~/components/ui/button'
import { routePaths } from '~/config/routing'
import { useLuisterenStore } from '~/stores/gameModes/luisterenStore'

interface BackToOverViewProps {
  levelId: string
  sublevelId: string
}

const BackToOverView: React.FC<BackToOverViewProps> = ({ levelId, sublevelId }) => {
  const { reset } = useLuisterenStore()
  return (
    <Button variant={'outline'} asChild>
      <Link
        onClick={() => {
          reset
        }}
        href={routePaths.sublevelSelectPage('1', parseInt(levelId))}
      >
        <h3>Terug naar overzicht</h3>
      </Link>
    </Button>
  )
}

export default BackToOverView
