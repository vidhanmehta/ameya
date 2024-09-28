ALTER TABLE "remarks" DROP CONSTRAINT "remarks_AssignerId_user_id_fk";
--> statement-breakpoint
ALTER TABLE "specialist" ADD COLUMN "address" varchar(256);--> statement-breakpoint
ALTER TABLE "specialistQueue" ADD COLUMN "address" varchar(256);--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "remarks" ADD CONSTRAINT "remarks_AssignerId_specialist_id_fk" FOREIGN KEY ("AssignerId") REFERENCES "public"."specialist"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
