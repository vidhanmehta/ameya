ALTER TABLE "user" ALTER COLUMN "access_code" SET DATA TYPE uuid;--> statement-breakpoint
ALTER TABLE "user" ALTER COLUMN "access_code" SET DEFAULT gen_random_uuid();
ALTER TABLE "device" ADD COLUMN "deviceCode" varchar NOT NULL;--> statement-breakpoint
ALTER TABLE "device" ADD CONSTRAINT "device_deviceCode_unique" UNIQUE("deviceCode");