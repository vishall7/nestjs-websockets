CREATE TYPE "session_status" AS ENUM('draft', 'open', 'lobby', 'active', 'finished');--> statement-breakpoint
ALTER TABLE "sessions" ADD COLUMN "join_code" varchar(8);--> statement-breakpoint
ALTER TABLE "sessions" ADD COLUMN "duration_minutes" integer DEFAULT 30 NOT NULL;--> statement-breakpoint
ALTER TABLE "sessions" ADD COLUMN "status" "session_status" DEFAULT 'draft'::"session_status" NOT NULL;--> statement-breakpoint
UPDATE "sessions"
SET "join_code" = upper(substr(md5(random()::text || "id"::text), 1, 8))
WHERE "join_code" IS NULL;--> statement-breakpoint
ALTER TABLE "sessions" ALTER COLUMN "join_code" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "sessions" ADD CONSTRAINT "sessions_join_code_key" UNIQUE("join_code");