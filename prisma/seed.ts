import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  const genres = [
    { genre_name: 'Rock' },
    { genre_name: 'Pop' },
    { genre_name: 'Hip Hop' },
    { genre_name: 'Jazz' },
    { genre_name: 'Classical' },
    { genre_name: 'Electronic' },
    { genre_name: 'Blues' },
    { genre_name: 'Country' },
    { genre_name: 'R&B' },
    { genre_name: 'Reggae' },
    { genre_name: 'Folk' },
    { genre_name: 'Punk' },
    { genre_name: 'Metal' },
    { genre_name: 'Soul' },
    { genre_name: 'Disco' },
    { genre_name: 'Funk' },
    { genre_name: 'House' },
    { genre_name: 'Techno' },
    { genre_name: 'Dubstep' },
    { genre_name: 'Ambient' },
    { genre_name: 'Soundtrack' },
    { genre_name: 'Gospel' },
    { genre_name: 'Latin' },
    { genre_name: 'K-Pop' },
    { genre_name: 'Alternative' },
    { genre_name: 'Indie' },
    { genre_name: 'Opera' },
    { genre_name: 'Ska' },
    { genre_name: 'Grunge' },
    { genre_name: 'Trap' },
    { genre_name: 'Synthwave' },
    { genre_name: 'Dance' },
    { genre_name: 'Trance' },
    { genre_name: 'Afrobeat' },
    { genre_name: 'Bossa Nova' },
    { genre_name: 'Flamenco' },
    { genre_name: 'Bluegrass' },
    { genre_name: 'Chillout' },
    { genre_name: 'Industrial' },
    { genre_name: 'Garage' },
    { genre_name: 'Experimental' },
    { genre_name: 'Orchestral' },
    { genre_name: 'Meditative' },
    { genre_name: 'World' },
  ];

  await prisma.genre.createMany({
    data: genres,
    skipDuplicates: true,
  });

  console.log('Genres seeded successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
