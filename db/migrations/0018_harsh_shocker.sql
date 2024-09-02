ALTER TYPE "gender" ADD VALUE 'Other';--> statement-breakpoint
ALTER TABLE "user" ALTER COLUMN "phone" SET DATA TYPE numeric(10, 0);--> statement-breakpoint
ALTER TABLE "user" ADD COLUMN "countryCode" varchar NOT NULL;