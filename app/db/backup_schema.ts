import {
  pgTable,
  text,
  varchar,
  date,
  unique,
  index,
  integer,
  timestamp,
  serial,
  pgEnum,
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { createId } from "@paralleldrive/cuid2";

export const cow_activity_enum = pgEnum("cow_activity", [
  "Sentada",
  "Parada",
  "Caminando",
  "Corriendo",
]);

export const users = pgTable(
  "users",
  {
    user_id: text("user_id")
      .primaryKey()
      .notNull()
      .$defaultFn(() => createId()),
    user_nit: varchar("user_nit", { length: 100 }).notNull().unique(),
    user_name: varchar("user_name", { length: 50 }).notNull(),
    user_lastname: varchar("user_lastname", { length: 50 }).notNull(),
    date_of_birth: date("date_of_birth", { mode: "string" }).notNull(),
    phone_number: varchar("phone_number", { length: 10 }).notNull(),
  },
  (t) => ({
    unq: unique("all_fields_are_unique_users")
      .on(t.user_name, t.user_lastname, t.date_of_birth, t.phone_number)
      .nullsNotDistinct(),
    idx: index("user_nit_index")
      .onOnly(t.user_id, t.user_nit)
      .with({ fillfactor: "70" }),
  })
);

export const userRelations = relations(users, ({ many }) => ({
  cows: many(cows),
}));

export const cows = pgTable(
  "cows",
  {
    cow_id: text("cow_id")
      .primaryKey()
      .notNull()
      .$defaultFn(() => createId()),
    user_id: text("user_id")
      .notNull()
      .references(() => users.user_id, {
        onDelete: "cascade",
        onUpdate: "cascade",
      }),
    user_nit: varchar("user_nit", { length: 100 })
      .notNull()
      .references(() => users.user_nit),
    cow_name: varchar("cow_name", { length: 20 }).notNull().default("Vaca"),
    cow_code: varchar("cow_code", { length: 10 }).notNull(),
    cow_breed: varchar("cow_breed", { length: 50 })
      .notNull()
      .default("Criollo"),
    cow_age: integer("cow_age").notNull().default(0),
    cow_weight: integer("cow_weight").notNull().default(0),
    cow_weight_date: timestamp("cow_weight_date").notNull().defaultNow(),
  },
  (t) => ({
    unq: unique("all_fields_are_unique_cows").on(t.cow_id),
    idx: index("cows_indexes")
      .onOnly(t.cow_id, t.user_id, t.user_nit, t.cow_name)
      .with({ fillfactor: "70" }),
  })
);

export const cowRelations = relations(cows, ({ one, many }) => ({
  users: one(users, { fields: [cows.user_id], references: [users.user_id] }),
  iot_data: many(iot_data),
}));

export const iot_data = pgTable(
  "iot_data",
  {
    data_id: serial("data_id").primaryKey(),
    cow_id: text("cow_id")
      .notNull()
      .references(() => cows.cow_id, {
        onDelete: "cascade",
        onUpdate: "cascade",
      }),
    cow_coordenate: varchar("cow_coordenate", { length: 100 }).notNull(),
    cow_activity: cow_activity_enum("cow_activity").notNull(),
    data_date: timestamp("data_date").defaultNow(),
  },
  (t) => ({
    unq: unique("iot_data_id_unique").on(t.data_id),
    idx: index("iot_data_indexes")
      .onOnly(t.data_id, t.cow_id, t.data_date)
      .with({ fillfactor: "70" }),
  })
);

export const iot_dataRelations = relations(iot_data, ({ one }) => ({
  cows: one(cows, { fields: [iot_data.cow_id], references: [cows.cow_id] }),
}));

export type InsertUser = typeof users.$inferInsert;
export type SelectUser = typeof users.$inferSelect;

export type InsertCow = typeof cows.$inferInsert;
export type SelectCow = typeof cows.$inferSelect;

export type InsertIotData = typeof iot_data.$inferInsert;
export type SelectIotData = typeof iot_data.$inferSelect;
