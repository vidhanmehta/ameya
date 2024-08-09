ALTER TABLE "assessment" ALTER COLUMN "status" SET DEFAULT 'Active';--> statement-breakpoint
ALTER TABLE "assessment" ALTER COLUMN "status" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "user" ALTER COLUMN "access_code" SET DEFAULT 34055333;