# Migration `20200427204806-switch-to-int`

This migration has been generated by Sebastien La Duca at 4/27/2020, 8:48:06 PM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
ALTER TABLE "public"."Course" DROP COLUMN "courseId",
ADD COLUMN "courseId" integer  NOT NULL ;
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration 20200425193721-student-unique-address..20200427204806-switch-to-int
--- datamodel.dml
+++ datamodel.dml
@@ -1,7 +1,7 @@
 datasource db {
   provider = "postgresql"
-  url = "***"
+  url      = env("DATABASE_URL")
 }
 generator client {
   provider = "prisma-client-js"
@@ -14,9 +14,9 @@
 }
 model Course {
   id String @default(cuid()) @id
-  courseId String
+  courseId Int
   name String
   instructor String
   info String? // IPFS hash
 }
```


