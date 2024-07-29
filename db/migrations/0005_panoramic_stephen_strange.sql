ALTER TABLE "accountAccess" DROP CONSTRAINT "accountAccess_userId_user_id_fk";
--> statement-breakpoint
ALTER TABLE "assessment" DROP CONSTRAINT "assessment_userId_user_id_fk";
--> statement-breakpoint
ALTER TABLE "device" DROP CONSTRAINT "device_userId_user_id_fk";
--> statement-breakpoint
ALTER TABLE "queue" DROP CONSTRAINT "queue_deviceId_device_id_fk";
--> statement-breakpoint
ALTER TABLE "remarks" DROP CONSTRAINT "remarks_assessmentId_assessment_id_fk";
--> statement-breakpoint
ALTER TABLE "remarks" DROP CONSTRAINT "remarks_AssignerId_user_id_fk";
--> statement-breakpoint
ALTER TABLE "reminder" DROP CONSTRAINT "reminder_assessmentId_assessment_id_fk";
--> statement-breakpoint
ALTER TABLE "test" DROP CONSTRAINT "test_userId_user_id_fk";
--> statement-breakpoint
ALTER TABLE "test" DROP CONSTRAINT "test_assestmentId_assessment_id_fk";
--> statement-breakpoint
ALTER TABLE "user" ALTER COLUMN "access_code" SET DEFAULT 45056706;--> statement-breakpoint
ALTER TABLE "assessment" ADD COLUMN "posture" "posture" NOT NULL;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "accountAccess" ADD CONSTRAINT "accountAccess_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "assessment" ADD CONSTRAINT "assessment_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "device" ADD CONSTRAINT "device_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "queue" ADD CONSTRAINT "queue_deviceId_device_id_fk" FOREIGN KEY ("deviceId") REFERENCES "public"."device"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "remarks" ADD CONSTRAINT "remarks_assessmentId_assessment_id_fk" FOREIGN KEY ("assessmentId") REFERENCES "public"."assessment"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "remarks" ADD CONSTRAINT "remarks_AssignerId_user_id_fk" FOREIGN KEY ("AssignerId") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "reminder" ADD CONSTRAINT "reminder_assessmentId_assessment_id_fk" FOREIGN KEY ("assessmentId") REFERENCES "public"."assessment"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "test" ADD CONSTRAINT "test_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "test" ADD CONSTRAINT "test_assestmentId_assessment_id_fk" FOREIGN KEY ("assestmentId") REFERENCES "public"."assessment"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
