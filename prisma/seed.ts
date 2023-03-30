import { RestGehoor } from './generated/zod/index';
import { prisma } from "../src/server/db";

async function main() {
  const adminRole = await prisma.role.upsert({
    where: { name: 'admin' },
    update: {},
    create: {
      name: 'admin',
    },
  });

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

  const trainerRole = await prisma.role.upsert({
    where: { name: 'trainer' },
    update: {},
    create: {
      name: 'trainer',
    },
  });

  const userRole = await prisma.role.upsert({
    where: { name: 'user' },
    update: {},
    create: {
      name: 'user',
    },
  });

  // Create users
  const user1 = await prisma.user.upsert({
    where: { email: 'john.doe@example.com' },
    update: {},
    create: {
      id: '1',
      id_Team: 1,
      id_Role: adminRole.id,
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
      id: '2',
      id_Team: 2,
      id_Role: userRole.id,
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
      user: { connect: { id: '1' } },
      restGehoor: 60,
    },
  })

  const restgehoor2 = await prisma.restGehoor.upsert({
    where: { id: 2 },
    update: {},
    create: {
      id: 2,
      user: { connect: { id: '1' } },
      restGehoor: 40,
    },
  })

  const typeCi1 = await prisma.typeCI.upsert({
    where: { id: 1 },
    update: {},
    create: {
      id: 1,
      user: { connect: { id: '1' } },
      ciName: 'Type CI 1',
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
    where: { id: 1 },
    update: {},
    create: {
      id: 1,
      name: 'Spelen',
    },
  })

  const UitdagingGameMode = await prisma.gameMode.upsert({
    where: { id: 1 },
    update: {},
    create: {
      id: 1,
      name: 'Uitdaging',
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

  const level1 = await prisma.level.upsert({
    where: { id: 1 },
    update: {},
    create: {
      name: 'Level 1',
      description: 'First level',
      BPM: 120,
      correctAnswers: 5,
      cooldownTime: 10,
      fragmentToShow: 1,
      game: { connect: { id: 1 } },
    },
  })

  const fragment1 = await prisma.fragment.upsert({
    where: { id: 1 },
    update: {},
    create: {
      id: 1,
      name: 'Fragment 1',
      description: 'First fragment',
      level: { connect: { id: 1 } },
    },
  })

  const note1 = await prisma.note.upsert({
    where: { id: 1 },
    update: {},
    create: {
      // id: 1,
      name: 'Note 1',
      time: 10,
      duration: 5,
      speed: 40,
      fragment: { connect: { id: 1 } },
    },
  })

  const levelResult1 = await prisma.levelResult.upsert({
    where: { id: 1 },
    update: {},
    create: {
      // id: 1,
      user: { connect: { id: '1' } },
      gameModes: { connect: { id: 1 } },
      levels: { connect: { id: 1 } },
      playDate: new Date(),
      startTime: new Date(),
      endTime: new Date(),
      timesListenedAgain: 2,
      transposed: 6,
      reactionTime: 10,
    },
  })

  const levelResultFragmentAnswer1 = await prisma.levelResultFragmentAnswer.upsert({
    where: { id: 1 },
    update: {},
    create: {
      // id: 1,
      levelResult: { connect: { id: 1 } },
      answeredCorrectly: true,
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
