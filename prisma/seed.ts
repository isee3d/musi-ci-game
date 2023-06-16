import { prisma } from "../src/server/db";

async function main() {
  // const adminRole = await prisma.role.upsert({
  //   where: { name: 'admin' },
  //   update: {},
  //   create: {
  //     name: 'admin',
  //   },
  // });

  // // Create teams
  const team1 = await prisma.team.upsert({
    where: { id: 1 },
    update: {},
    create: {
      id: 1,
      name: 'Team A',
      description: 'First team',
    },
  });

  const team2 = await prisma.team.upsert({
    where: { id: 2 },
    update: {},
    create: {
      id: 2,
      name: 'Team B',
      description: 'Second team',
    },
  });

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
  });

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
  });

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
    },
  })

  const UitdagingGameMode = await prisma.gameMode.upsert({
    where: { id: 3 },
    update: {},
    create: {
      id: 3,
      name: 'Uitdaging',
    },
  })

  const game1 = await prisma.game.upsert({
    where: { id: 1 },
    update: {},
    create: {
      id: 1,
      name: 'Game 1',
      teams: { connect: { id: 2 } },
    },
  })

  const sublevel1 = await prisma.subLevel.upsert({
    where: { id: 1 },
    update: {},
    create: {
      name: 'gelijk anders',
      description: 'een gelijk fragment en een anders fragment',
      playTime: 60,
      BPM: 60,
      correctAnswers: 10,
      cooldownTime: 0,
      fragmentToShow: 2,
      gameModes: { connect: [{ id: 1 }, { id: 2 }, { id: 3 }] },
    },
  })

  const level = await prisma.level.upsert({
    where: { id: 1 },
    update: {},
    create: {
      // id: 1,
      name: 'Level 1',
      description: 'Een level',
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



  const levelResult = await prisma.levelResult.upsert({
    where: { id: 1 },
    update: {},
    create: {
      user: { connect: { id: "ckry3i9q20000rnokcau72egt" } },
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
      await prisma.$disconnect();
    })
    .catch(async (e) => {
      console.error(e);
      await prisma.$disconnect();
      process.exit(1);
    });
