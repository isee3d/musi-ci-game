import Link from 'next/link'
import { useCallback } from 'react'

const footer: React.FC = () => {
  const getCurrentYear = useCallback(() => {
    const currentDate = new Date()
    return currentDate.getFullYear()
  }, [])

  return (
    <div className="relative bottom-0 flex w-full justify-end gap-2 border-t-4 bg-background px-4 py-2 text-xs">
      <h3>V2.0.1</h3>
      <Link href="https://www.musi-ci.nl/">Musi-CI Game ©{getCurrentYear()} JokeVeltmanMuziek</Link>
    </div>
  )
}

export default footer
