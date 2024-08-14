ALTER TABLE "user" ADD COLUMN "accessCode" uuid DEFAULT gen_random_uuid();--> statement-breakpoint
ALTER TABLE "user" DROP COLUMN IF EXISTS "access_code";
ALTER TABLE "device" ADD COLUMN "deviceCode" varchar NOT NULL;--> statement-breakpoint
ALTER TABLE "device" ADD CONSTRAINT "device_deviceCode_unique" UNIQUE("deviceCode");