import { prisma } from '../src/server/db'

//  This script should be run on a fresh database
// like planetscale so the planetscale database can be properly initialized

async function main() {
  const appSettings = await prisma.appSettings.upsert({
    where: { id: 1 },
    update: {},
    create: {},
  })

  const team1 = await prisma.team.upsert({
    where: { id: 1 },
    update: {},
    create: {
      id: 1,
      name: 'Basis Team',
      description: 'Hier vallen alle spelers standaard onder',
    },
  })

  const luisterenGameMode = await prisma.gameMode.upsert({
    where: { id: 1 },
    update: {},
    create: {
      id: 1,
      name: 'Luisteren',
    },
  })

  const spelenGameMode = await prisma.gameMode.upsert({
    where: { id: 2 },
    update: {},
    create: {
      id: 2,
      name: 'Spelen',
      one: 1000,
      two: 1000,
      three: 1000,
      go: 1000,
    },
  })

  const UitdagingGameMode = await prisma.gameMode.upsert({
    where: { id: 3 },
    update: {},
    create: {
      id: 3,
      name: 'Uitdaging',
      amountOfScenes: 5,
      one: 1000,
      two: 1000,
      three: 1000,
      go: 1000,
    },
  })

  const testMode = await prisma.gameMode.upsert({
    where: { id: 4 },
    update: {},
    create: {
      id: 4,
      name: 'Test',
      amountOfScenes: 300,
      one: 1000,
      two: 1000,
      three: 1000,
      go: 1000,
    },
  })

  const game1 = await prisma.game.upsert({
    where: { id: 1 },
    update: {},
    create: {
      id: 1,
      name: 'Basis Game',
      teams: { connect: { id: 1 } },
    },
  })
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
