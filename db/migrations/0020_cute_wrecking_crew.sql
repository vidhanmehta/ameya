ALTER TABLE "assessment" DROP CONSTRAINT "assessment_deviceId_device_id_fk";
--> statement-breakpoint
ALTER TABLE "assessment" DROP COLUMN IF EXISTS "deviceId";