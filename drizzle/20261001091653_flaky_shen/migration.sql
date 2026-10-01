CREATE TYPE "member_status" AS ENUM('invited', 'declined', 'accepted', 'joined', 'left');--> statement-breakpoint
CREATE TABLE "session_members" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
	"session_id" uuid NOT NULL,
	"user_id" uuid NOT NULL,
	"status" "member_status" DEFAULT 'invited'::"member_status" NOT NULL,
	"invited_at" timestamp DEFAULT now() NOT NULL,
	"responded_at" timestamp,
	"joined_at" timestamp,
	"left_at" timestamp,
	CONSTRAINT "session_members_session_id_user_id_unique" UNIQUE("session_id","user_id")
);
--> statement-breakpoint
ALTER TABLE "session_members" ADD CONSTRAINT "session_members_session_id_sessions_id_fkey" FOREIGN KEY ("session_id") REFERENCES "sessions"("id");--> statement-breakpoint
ALTER TABLE "session_members" ADD CONSTRAINT "session_members_user_id_users_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id");