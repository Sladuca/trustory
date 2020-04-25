export DATABASE_URL="postgresql://postgres:prisma@localhost:5430/prisma?connection_limit=1"
yarn prisma migrate save -c --experimental
yarn prisma migrate up -c --experimental
yarn prisma generate