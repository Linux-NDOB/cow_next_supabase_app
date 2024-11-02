CREATE TABLE IF NOT EXISTS "cows" (
	"cow_id" text PRIMARY KEY NOT NULL,
	"user_id" uuid NOT NULL,
	"cow_name" varchar(20) DEFAULT 'Vaca' NOT NULL,
	"cow_code" varchar(10) NOT NULL,
	"cow_breed" varchar(50) DEFAULT 'Criollo' NOT NULL,
	"cow_age" integer DEFAULT 0 NOT NULL,
	"cow_weight" integer DEFAULT 0 NOT NULL,
	"cow_weight_date" text NOT NULL,
	CONSTRAINT "all_fields_are_unique_cows" UNIQUE("cow_id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "iot_data" (
	"data_id" serial PRIMARY KEY NOT NULL,
	"cow_id" text NOT NULL,
	"cow_coordenate" varchar(100) NOT NULL,
	"cow_activity" varchar(20) NOT NULL,
	"data_date" timestamp DEFAULT now(),
	CONSTRAINT "iot_data_id_unique" UNIQUE("data_id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "profiles" (
	"user_id" uuid PRIMARY KEY NOT NULL,
	"user_nit" varchar(100) DEFAULT 'Nit Vacio',
	"user_name" varchar(50) DEFAULT 'Sin Nombre',
	"user_lastname" varchar(50) DEFAULT 'Sin Apellido',
	"date_of_birth" text,
	"phone_number" varchar(10) DEFAULT '',
	CONSTRAINT "profiles_user_id_unique" UNIQUE("user_id")
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "cows" ADD CONSTRAINT "cows_user_id_profiles_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."profiles"("user_id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "iot_data" ADD CONSTRAINT "iot_data_cow_id_cows_cow_id_fk" FOREIGN KEY ("cow_id") REFERENCES "public"."cows"("cow_id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "cows_indexes" ON "cows" USING btree ("cow_id","user_id","cow_name") WITH (fillfactor=70);--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "iot_data_indexes" ON "iot_data" USING btree ("data_id","cow_id","data_date") WITH (fillfactor=70);--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "user_nit_index" ON "profiles" USING btree ("user_id","user_nit") WITH (fillfactor=70);