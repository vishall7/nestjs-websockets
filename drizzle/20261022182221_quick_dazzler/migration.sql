ALTER TABLE "sessions" ADD COLUMN "expires_at" timestamp with time zone;--> statement-breakpoint
ALTER TABLE "sessions" ALTER COLUMN "status" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "sessions" ALTER COLUMN "status" DROP DEFAULT;--> statement-breakpoint
DROP TYPE "session_status";--> statement-breakpoint
CREATE TYPE "session_status" AS ENUM('draft', 'lobby', 'active', 'expired');--> statement-breakpoint
ALTER TABLE "sessions" ALTER COLUMN "status" SET DATA TYPE "session_status" USING "status"::"session_status";--> statement-breakpoint
ALTER TABLE "sessions" ALTER COLUMN "status" SET DEFAULT 'draft'::"session_status";--> statement-breakpoint
ALTER TABLE "sessions" DROP COLUMN "duration_minutes";