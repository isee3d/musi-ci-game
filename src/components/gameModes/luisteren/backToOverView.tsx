import Link from 'next/link'
import React, { useEffect } from 'react'
import { Button } from '~/components/ui/button'
import { routePaths } from '~/config/routing'
import { useLuisterenStore } from '~/stores/gameModes/luisterenStore'

interface BackToOverViewProps {
  levelId: string
}

const BackToOverView: React.FC<BackToOverViewProps> = ({ levelId }) => {
   return (
    <Button variant={'outline'} asChild>
      <Link href={routePaths.sublevelSelectPage('1', parseInt(levelId))}>
        <h3>Terug naar overzicht</h3>
      </Link>
    </Button>
  )
}

export default BackToOverView
