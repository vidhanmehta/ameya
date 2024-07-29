CREATE TABLE IF NOT EXISTS "accountAccess" (
	"id" serial PRIMARY KEY NOT NULL,
	"userId" integer NOT NULL,
	"accountId" integer NOT NULL,
	"createdAt" timestamp DEFAULT now()
);
--> statement-breakpoint
DROP TABLE "role";--> statement-breakpoint
ALTER TABLE "remarks" DROP CONSTRAINT "remarks_userId_user_id_fk";
--> statement-breakpoint
/* 
    Unfortunately in current drizzle-kit version we can't automatically get name for primary key.
    We are working on making it available!

    Meanwhile you can:
        1. Check pk name in your database, by running
            SELECT constraint_name FROM information_schema.table_constraints
            WHERE table_schema = 'public'
                AND table_name = 'user'
                AND constraint_type = 'PRIMARY KEY';
        2. Uncomment code below and paste pk name manually
        
    Hope to release this update as soon as possible
*/

-- ALTER TABLE "user" DROP CONSTRAINT "<constraint_name>";--> statement-breakpoint
ALTER TABLE "user" ALTER COLUMN "id" SET DATA TYPE uuid;--> statement-breakpoint
ALTER TABLE "user" ALTER COLUMN "id" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "user" ALTER COLUMN "email" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "remarks" ADD COLUMN "assessmentId" integer NOT NULL;--> statement-breakpoint
ALTER TABLE "user" ADD COLUMN "password" varchar(256) NOT NULL;--> statement-breakpoint
ALTER TABLE "user" ADD COLUMN "role" "roleType" DEFAULT 'User';--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "accountAccess" ADD CONSTRAINT "accountAccess_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "accountAccess" ADD CONSTRAINT "accountAccess_accountId_user_id_fk" FOREIGN KEY ("accountId") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "remarks" ADD CONSTRAINT "remarks_assessmentId_assessment_id_fk" FOREIGN KEY ("assessmentId") REFERENCES "public"."assessment"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
ALTER TABLE "remarks" DROP COLUMN IF EXISTS "userId";