import { type NextPage } from 'next'
import { useSession } from 'next-auth/react'
import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import ContentContainer from '~/components/contentContainer'
import { Button, buttonVariants } from '~/components/ui/button'
import { cn } from '~/lib/utils'
import { api } from '~/utils/api'

const UserGamesPage: NextPage = () => {
  const { data: session } = useSession()
  // Add loading to retrieve this data, cause it can't be prefetched
  const gamesOfUserQuery = api.user.getGamesOfUser.useQuery({ id: session?.user.id })

  return (
    <ContentContainer backPath="/podium" title="Voortgang Musi-CI Games">
      {gamesOfUserQuery.data?.map((game) => (
        <Link
          key={game.id}
          className={cn(buttonVariants({ size: 'lg' }), 'h-20 rounded-xl')}
          href={`/progress/${game.id}`}
        >
          <div className="flex w-full items-center justify-between">
            <div className="flex justify-start space-x-4">
              <div
                className=" flex h-16 w-16 items-center justify-center rounded-lg border-4 text-center text-2xl font-bold"
                style={{ borderColor: 'green' }}
              >
                {game.id}
              </div>
              <div className=" flex h-16 w-48 items-center justify-center text-2xl font-medium">
                {game.name}
              </div>
            </div>
            <div className=" flex h-16 w-16 items-center justify-center text-2xl font-medium">
              {game.description}
            </div>
          </div>
        </Link>
      ))}
    </ContentContainer>
  )
}

export default UserGamesPage
