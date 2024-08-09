ALTER TABLE "user" ALTER COLUMN "access_code" SET DEFAULT 65198541;--> statement-breakpoint
ALTER TABLE "device" ADD COLUMN "deviceCode" varchar NOT NULL;--> statement-breakpoint
ALTER TABLE "device" ADD CONSTRAINT "device_deviceCode_unique" UNIQUE("deviceCode");