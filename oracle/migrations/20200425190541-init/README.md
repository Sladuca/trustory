# Migration `20200425190541-init`

This migration has been generated by Sebastien La Duca at 4/25/2020, 7:05:41 PM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
CREATE TABLE "public"."Instituiton" (
    "id" text  NOT NULL ,
    "name" text  NOT NULL ,
    "oracle" text  NOT NULL ,
    PRIMARY KEY ("id")
) 

CREATE TABLE "public"."Course" (
    "courseId" text  NOT NULL ,
    "id" text  NOT NULL ,
    "info" text   ,
    "instructor" text  NOT NULL ,
    "name" text  NOT NULL ,
    PRIMARY KEY ("id")
) 

CREATE TABLE "public"."Student" (
    "address" text  NOT NULL ,
    "id" text  NOT NULL ,
    "name" text  NOT NULL ,
    "pub" text  NOT NULL ,
    PRIMARY KEY ("id")
) 

CREATE TABLE "public"."Cert" (
    "courseId" text  NOT NULL ,
    "id" text  NOT NULL ,
    "nftId" text  NOT NULL ,
    "studentId" text  NOT NULL ,
    PRIMARY KEY ("id")
) 

CREATE UNIQUE INDEX "Instituiton.oracle" ON "public"."Instituiton"("oracle")

CREATE UNIQUE INDEX "Cert.nftId" ON "public"."Cert"("nftId")

ALTER TABLE "public"."Cert" ADD FOREIGN KEY ("courseId")REFERENCES "public"."Course"("id") ON DELETE CASCADE  ON UPDATE CASCADE

ALTER TABLE "public"."Cert" ADD FOREIGN KEY ("studentId")REFERENCES "public"."Student"("id") ON DELETE CASCADE  ON UPDATE CASCADE
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration ..20200425190541-init
--- datamodel.dml
+++ datamodel.dml
@@ -1,0 +1,39 @@
+datasource db {
+  provider = "postgresql"
+  url      = env("DATABASE_URL")
+}
+
+generator client {
+  provider = "prisma-client-js"
+}
+
+model Instituiton {
+  id String @id
+  name String
+  oracle String @unique
+}
+
+model Course {
+  id String @default(cuid()) @id
+  courseId String
+  name String
+  instructor String
+  info String? // IPFS hash
+}
+
+model Student {
+  id String @default(cuid()) @id
+  name String 
+  address String
+  pub String
+}
+
+model Cert {
+  id String @default(cuid()) @id
+  nftId String @unique
+  course Course @relation(fields: [courseId], references: [id])
+  courseId String
+  holder Student @relation(fields: [studentId], references: [id])
+  studentId String
+}
+
```

