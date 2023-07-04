import { prisma } from '../src/server/db'

async function main() {
  // const adminRole = await prisma.role.upsert({
  //   where: { name: 'admin' },
  //   update: {},
  //   create: {
  //     name: 'admin',
  //   },
  // });

  // Create App Settings
  const appSettings = await prisma.appSettings.upsert({
    where: { id: 1 },
    update: {},
    create: {},
  })

  // // Create teams
  const team1 = await prisma.team.upsert({
    where: { id: 1 },
    update: {},
    create: {
      id: 1,
      name: 'Team A',
      description: 'First team',
    },
  })

  const team2 = await prisma.team.upsert({
    where: { id: 2 },
    update: {},
    create: {
      id: 2,
      name: 'Team B',
      description: 'Second team',
    },
  })

  // const trainerRole = await prisma.role.upsert({
  //   where: { name: 'trainer' },
  //   update: {},
  //   create: {
  //     name: 'trainer',
  //   },
  // });

  // const userRole = await prisma.role.upsert({
  //   where: { name: 'user' },
  //   update: {},
  //   create: {
  //     name: 'user',
  //   },
  // });

  // Create users
  const user1 = await prisma.user.upsert({
    where: { email: 'john.doe@example.com' },
    update: {},
    create: {
      id: 'ckry3i9q20000rnokcau72egt',
      id_Team: 1,
      // id_Role: adminRole.id,
      name: 'John Doe',
      email: 'john.doe@example.com',
      hadTraining: true,
      experience: 10,
      processor: 'Intel i7',
      entreeVragenLijst: 'questions',
    },
  })

  const user2 = await prisma.user.upsert({
    where: { email: 'jane.smith@example.com' },
    update: {},
    create: {
      id: 'ckry3pjp70001lnokee5le6hs',
      id_Team: 2,
      // id_Role: userRole.id,
      name: 'Jane Smith',
      email: 'jane.smith@example.com',
      hadTraining: false,
      experience: 5,
      processor: 'AMD Ryzen 5',
      entreeVragenLijst: 'questions',
    },
  })

  // create restgehoor
  const restgehoor1 = await prisma.restGehoor.upsert({
    where: { id: 1 },
    update: {},
    create: {
      id: 1,
      user: { connect: { id: 'ckry3pjp70001lnokee5le6hs' } },
      restGehoor: 60,
    },
  })

  const restgehoor2 = await prisma.restGehoor.upsert({
    where: { id: 2 },
    update: {},
    create: {
      id: 2,
      user: { connect: { id: 'ckry3i9q20000rnokcau72egt' } },
      restGehoor: 40,
    },
  })

  const typeCi1 = await prisma.typeCI.upsert({
    where: { id: 1 },
    update: {},
    create: {
      id: 1,
      user: { connect: { id: 'ckry3i9q20000rnokcau72egt' } },
      name: 'Type CI 1',
      merk: 'Merk 1',
    },
  })

  const kliniek1 = await prisma.kliniek.upsert({
    where: { id: 1 },
    update: {},
    create: {
      id: 1,
      team: { connect: { id: 1 } },
      name: 'Kliniek 1',
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
      amountOfScenes: 9,
      one: 1000,
      two: 1000,
      three: 1000,
      go: 1000,
    },
  })

  const question1 = await prisma.question.upsert({
    where: { id: 1 },
    update: {},
    create: {
      question:
        'Wanneer ben je je eerste hoortoestellen gaan gebruiken? Voor of na de leeftijd van 7 jaar?',
    },
  })

  const question2 = await prisma.question.upsert({
    where: { id: 2 },
    update: {},
    create: {
      question:
        'Hoeveel jaar voor je je CI kreeg heb je nog een hoortoestel gebruikt aan de kant waar nu je CI zit? Minder of meer dan 10 jaar?',
    },
  })

  const question3 = await prisma.question.upsert({
    where: { id: 3 },
    update: {},
    create: {
      question: 'Aan welke kant heb je je CI? Links, rechts of aan beide oren?',
    },
  })

  const game1 = await prisma.game.upsert({
    where: { id: 1 },
    update: {},
    create: {
      id: 1,
      name: 'Game 1',
      teams: { connect: { id: 1 } },
    },
  })

  const sublevel1 = await prisma.subLevel.upsert({
    where: { id: 1 },
    update: {},
    create: {
      name: 'gelijk anders',
      description: 'een gelijk fragment en een anders fragment',
      playTime: 60,
      cooldownTime: 0,
      fragmentToShow: 2,
      gameModes: { connect: [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }] },
      questions: { connect: [{ id: 1 }, { id: 2 }, { id: 3 }] },
    },
  })

  const level = await prisma.level.upsert({
    where: { id: 1 },
    update: {},
    create: {
      // id: 1,
      name: 'Level 1',
      description: 'Een level',
      color: 'red',
      game: { connect: { id: 1 } },
      subLevels: { connect: [{ id: 1 }] },
    },
  })

  const fragment1 = await prisma.fragment.upsert({
    where: { id: 1 },
    update: {},
    create: {
      id: 1,
      name: 'gelijk',
      description: 'twee gelijke noten',
      useAlways: true,
      level: { connect: { id: 1 } },
    },
  })

  const fragment2 = await prisma.fragment.upsert({
    where: { id: 2 },
    update: {},
    create: {
      id: 2,
      name: 'anders',
      description: 'twee verschillende noten',
      level: { connect: { id: 1 } },
    },
  })

  const noteC4_fragment1 = await prisma.note.upsert({
    where: { id: 1 },
    update: {},
    create: {
      // id: 1,
      name: 'C4',
      time: 120,
      duration: 120,
      speed: 1,
      fragment: { connect: { id: 1 } },
    },
  })

  const noteC4_v2_fragment1 = await prisma.note.upsert({
    where: { id: 2 },
    update: {},
    create: {
      // id: 1,
      name: 'C4',
      time: 0,
      duration: 120,
      speed: 1,
      fragment: { connect: { id: 1 } },
    },
  })

  const noteC4_v2_fragment2 = await prisma.note.upsert({
    where: { id: 3 },
    update: {},
    create: {
      // id: 1,
      name: 'C4',
      time: 0,
      duration: 120,
      speed: 1,
      fragment: { connect: { id: 2 } },
    },
  })

  const noteA3_fragment2 = await prisma.note.upsert({
    where: { id: 4 },
    update: {},
    create: {
      // id: 1,
      name: 'A3',
      time: 120,
      duration: 120,
      speed: 1,
      fragment: { connect: { id: 2 } },
    },
  })

  const fragment3 = await prisma.fragment.upsert({
    where: { id: 3 },
    update: {},
    create: {
      id: 3,
      name: 'fragment3',
      description: 'twee verschillende noten',
      level: { connect: { id: 1 } },
    },
  })

  const noteC4_fragment3 = await prisma.note.upsert({
    where: { id: 5 },
    update: {},
    create: {
      name: 'C4',
      time: 0,
      duration: 80,
      speed: 1,
      fragment: { connect: { id: 3 } },
    },
  })

  const noteD4_fragment3 = await prisma.note.upsert({
    where: { id: 6 },
    update: {},
    create: {
      name: 'D4',
      time: 80,
      duration: 140,
      speed: 1,
      fragment: { connect: { id: 3 } },
    },
  })

  const fragment4 = await prisma.fragment.upsert({
    where: { id: 4 },
    update: {},
    create: {
      id: 4,
      name: 'fragment4',
      description: 'fragment with different notes',
      level: { connect: { id: 1 } },
    },
  })

  const noteC4_fragment4 = await prisma.note.upsert({
    where: { id: 7 },
    update: {},
    create: {
      name: 'C4',
      time: 0,
      duration: 110,
      speed: 1,
      fragment: { connect: { id: 4 } },
    },
  })

  const noteD4_fragment4 = await prisma.note.upsert({
    where: { id: 8 },
    update: {},
    create: {
      name: 'D4',
      time: 110,
      duration: 130,
      speed: 1,
      fragment: { connect: { id: 4 } },
    },
  })

  const fragment5 = await prisma.fragment.upsert({
    where: { id: 5 },
    update: {},
    create: {
      id: 5,
      name: 'fragment5',
      description: 'fragment with different notes',
      level: { connect: { id: 1 } },
    },
  })

  const noteE4_fragment5 = await prisma.note.upsert({
    where: { id: 9 },
    update: {},
    create: {
      name: 'E4',
      time: 0,
      duration: 120,
      speed: 1,
      fragment: { connect: { id: 5 } },
    },
  })

  const noteF4_fragment5 = await prisma.note.upsert({
    where: { id: 10 },
    update: {},
    create: {
      name: 'F4',
      time: 120,
      duration: 120,
      speed: 1,
      fragment: { connect: { id: 5 } },
    },
  })

  const fragment6 = await prisma.fragment.upsert({
    where: { id: 6 },
    update: {},
    create: {
      id: 6,
      name: 'fragment6',
      description: 'fragment with different notes',
      level: { connect: { id: 1 } },
    },
  })

  const noteG4_fragment6 = await prisma.note.upsert({
    where: { id: 11 },
    update: {},
    create: {
      name: 'G4',
      time: 0,
      duration: 50,
      speed: 1,
      fragment: { connect: { id: 6 } },
    },
  })

  const noteA4_fragment6 = await prisma.note.upsert({
    where: { id: 12 },
    update: {},
    create: {
      name: 'A4',
      time: 50,
      duration: 190,
      speed: 1,
      fragment: { connect: { id: 6 } },
    },
  })

  const fragment7 = await prisma.fragment.upsert({
    where: { id: 7 },
    update: {},
    create: {
      id: 7,
      name: 'fragment7',
      description: 'fragment with different notes',
      level: { connect: { id: 1 } },
    },
  })

  const noteB4_fragment7 = await prisma.note.upsert({
    where: { id: 13 },
    update: {},
    create: {
      name: 'B4',
      time: 0,
      duration: 100,
      speed: 1,
      fragment: { connect: { id: 7 } },
    },
  })

  const noteC5_fragment7 = await prisma.note.upsert({
    where: { id: 14 },
    update: {},
    create: {
      name: 'C5',
      time: 100,
      duration: 140,
      speed: 1,
      fragment: { connect: { id: 7 } },
    },
  })

  const fragment8 = await prisma.fragment.upsert({
    where: { id: 8 },
    update: {},
    create: {
      id: 8,
      name: 'fragment8',
      description: 'fragment with different notes',
      level: { connect: { id: 1 } },
    },
  })

  const noteD5_fragment8 = await prisma.note.upsert({
    where: { id: 15 },
    update: {},
    create: {
      name: 'D5',
      time: 0,
      duration: 120,
      speed: 1,
      fragment: { connect: { id: 8 } },
    },
  })

  const noteE5_fragment8 = await prisma.note.upsert({
    where: { id: 16 },
    update: {},
    create: {
      name: 'E5',
      time: 120,
      duration: 120,
      speed: 1,
      fragment: { connect: { id: 8 } },
    },
  })

  const fragment9 = await prisma.fragment.upsert({
    where: { id: 9 },
    update: {},
    create: {
      id: 9,
      name: 'fragment9',
      description: 'fragment with different notes',
      level: { connect: { id: 1 } },
    },
  })

  const noteF5_fragment9 = await prisma.note.upsert({
    where: { id: 17 },
    update: {},
    create: {
      name: 'F5',
      time: 0,
      duration: 120,
      speed: 1,
      fragment: { connect: { id: 9 } },
    },
  })

  const noteG5_fragment9 = await prisma.note.upsert({
    where: { id: 18 },
    update: {},
    create: {
      name: 'G5',
      time: 120,
      duration: 120,
      speed: 1,
      fragment: { connect: { id: 9 } },
    },
  })

  const levelResult = await prisma.levelResult.upsert({
    where: { id: 1 },
    update: {},
    create: {
      user: { connect: { id: 'ckry3i9q20000rnokcau72egt' } },
      Level: { connect: { id: 1 } },
      subLevel: { connect: { id: 1 } },
      gameMode: { connect: { id: 1 } },
      Scenes: {
        create: {
          chosenFragment: { connect: { id: 1 } },
          sceneFragments: {
            create: {
              fragment: { connect: { id: 1 } },
              fragmentIndex: 1,
              // isCorrectFragment: true,
              // isPlayedFragment: true,
              groundTone: 1,
            },
          },
        },
      },
      startTime: new Date(),
      endTime: new Date(),
      score: 100,
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
