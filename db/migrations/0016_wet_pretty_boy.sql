CREATE TABLE IF NOT EXISTS "deviceQueue" (
	"id" serial PRIMARY KEY NOT NULL,
	"accessCode" uuid DEFAULT gen_random_uuid()
);
