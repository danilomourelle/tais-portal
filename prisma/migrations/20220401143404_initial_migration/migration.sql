-- CreateTable
CREATE TABLE "POSTS" (
    "id" SERIAL NOT NULL,
    "title" VARCHAR(255) NOT NULL,
    "create_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "content" TEXT,
    "published" BOOLEAN NOT NULL DEFAULT false,
    "author_id" INTEGER NOT NULL,

    CONSTRAINT "POSTS_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PROFILES" (
    "id" SERIAL NOT NULL,
    "bio" TEXT,
    "user_id" INTEGER NOT NULL,

    CONSTRAINT "PROFILES_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "USERS" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "email" VARCHAR(255) NOT NULL,

    CONSTRAINT "USERS_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "PROFILES_user_id_key" ON "PROFILES"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "USERS_email_key" ON "USERS"("email");

-- AddForeignKey
ALTER TABLE "POSTS" ADD CONSTRAINT "POSTS_author_id_fkey" FOREIGN KEY ("author_id") REFERENCES "USERS"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "PROFILES" ADD CONSTRAINT "PROFILES_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "USERS"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
