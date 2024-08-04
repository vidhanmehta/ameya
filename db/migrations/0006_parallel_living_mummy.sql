ALTER TABLE "user" ALTER COLUMN "access_code" SET DEFAULT 10056121;--> statement-breakpoint
ALTER TABLE "queue" ADD COLUMN "assessmentId" integer NOT NULL;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "queue" ADD CONSTRAINT "queue_assessmentId_assessment_id_fk" FOREIGN KEY ("assessmentId") REFERENCES "public"."assessment"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
