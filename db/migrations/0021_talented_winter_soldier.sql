CREATE TABLE IF NOT EXISTS "specialist" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(256) NOT NULL,
	"countryCode" varchar NOT NULL,
	"phone" numeric(10, 0) NOT NULL,
	"email" varchar(256) NOT NULL,
	"password" varchar(256) NOT NULL,
	"dob" date NOT NULL,
	"city" varchar(256),
	"country" varchar(256) DEFAULT 'India',
	"pincode" numeric,
	"createdAt" timestamp DEFAULT now(),
	CONSTRAINT "specialist_phone_unique" UNIQUE("phone"),
	CONSTRAINT "specialist_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "specialistQueue" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(256) NOT NULL,
	"countryCode" varchar NOT NULL,
	"phone" numeric(10, 0) NOT NULL,
	"email" varchar(256) NOT NULL,
	"password" varchar(256) NOT NULL,
	"dob" date NOT NULL,
	"city" varchar(256),
	"country" varchar(256) DEFAULT 'India',
	"pincode" numeric,
	"createdAt" timestamp DEFAULT now(),
	CONSTRAINT "specialistQueue_phone_unique" UNIQUE("phone"),
	CONSTRAINT "specialistQueue_email_unique" UNIQUE("email")
);
--> statement-breakpoint
DROP TABLE "reminder";--> statement-breakpoint
ALTER TABLE "accountAccess" DROP CONSTRAINT "accountAccess_accountId_user_id_fk";
--> statement-breakpoint
ALTER TABLE "accountAccess" ADD CONSTRAINT "accountAccess_userId_specialistId_pk" PRIMARY KEY("userId","specialistId");--> statement-breakpoint
ALTER TABLE "accountAccess" ADD COLUMN "specialistId" integer NOT NULL;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "accountAccess" ADD CONSTRAINT "accountAccess_specialistId_specialist_id_fk" FOREIGN KEY ("specialistId") REFERENCES "public"."specialist"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
ALTER TABLE "accountAccess" DROP COLUMN IF EXISTS "id";--> statement-breakpoint
ALTER TABLE "accountAccess" DROP COLUMN IF EXISTS "accountId";--> statement-breakpoint
ALTER TABLE "accountAccess" DROP COLUMN IF EXISTS "createdAt";--> statement-breakpoint
ALTER TABLE "user" DROP COLUMN IF EXISTS "role";