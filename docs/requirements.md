// schema.prisma
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

generator client {
  provider = "prisma-client-js"
}

model User {
  id       String   @id @default(uuid())
  username String   @unique
  role     Role     @default(VIEWER)
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  edits    Edit[]
}

enum Role {
  ADMIN
  EDITOR
  VIEWER
}

model Stream {
  id          String   @id @default(uuid())
  youtubeId   String   @unique
  title       String
  publishedAt DateTime
  thumbnail   String?
  performances Performance[]
}

model Song {
  id             String   @id @default(uuid())
  title          String
  artist         String
  normalizedTitle String   @unique
  notes          String?
  performances   Performance[]
}

model Performance {
  id         String   @id @default(uuid())
  stream     Stream   @relation(fields: [streamId], references: [id])
  streamId   String
  song       Song     @relation(fields: [songId], references: [id])
  songId     String
  startTime  Int?      // 秒
  confidence Confidence @default(AUTO)
  memo       String?
}

enum Confidence {
  AUTO          // 自動解析
  USER_VERIFIED // ファンが確認
  MANUAL        // 管理者手動
}

model Edit {
  id        String   @id @default(uuid())
  user      User     @relation(fields: [userId], references: [id])
  userId    String
  targetType String   // Song / Performance / Stream
  targetId  String
  action    String   // create / update / delete
  timestamp DateTime @default(now())
  notes     String?
}