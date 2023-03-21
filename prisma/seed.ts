import { prisma } from "../src/server/db";

async function main() {
  const id = "cl9ebqhxk00003b600tymydho";
  const id2 = "cl9ebqhxk00003b600tymydhgfho";
  await prisma.example.upsert({
    where: {
      id,
    },
    create: {
      id,
    },
    update: {},
  });

  await prisma.note.upsert({
    where: {
      id: id2,
    },
    create: {
      id: id2,
      note: "test",
      velocity: 1,
      time: 1,
      dur: 1
    },
    update: {},
});
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
