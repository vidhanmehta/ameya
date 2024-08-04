DO $$ BEGIN
 CREATE TYPE "public"."status" AS ENUM('Active', 'Completed');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
ALTER TABLE "user" ALTER COLUMN "access_code" SET DEFAULT 58613132;--> statement-breakpoint
ALTER TABLE "assessment" ADD COLUMN "status" "status" NOT NULL;