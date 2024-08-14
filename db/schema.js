import { relations } from "drizzle-orm";
import { pgTable, serial, varchar, numeric, date, timestamp, pgEnum, integer, time, uuid} from "drizzle-orm/pg-core";
import { generator } from "../utils/numberGenerator.js";

export const gender = pgEnum("gender", ["Male","Female","Others"])
export const hand = pgEnum("hand", ["Left","Right"])
export const posture = pgEnum("posture", ["Full Body Weight", "Full Arm Weight", "Forward Loading", "Backward Off Loading", "Side Loading", "Side Off Loading", "sitting" ])
export const assestmentType = pgEnum("assestmentType", ["Weekly", "Monthly", "Daily"])
export const roleType = pgEnum("roleType", ["Admin", "User", "Doctor", "Operator"])
export const status = pgEnum("status", ["Active", "Completed"])

export const user = pgTable("user", {
    id: serial("id").primaryKey(),
    name: varchar("name", { length: 256 }).notNull(),
    phone: numeric("phone").notNull().unique(),
    email: varchar("email", { length: 256 }).unique().notNull(),
    password: varchar("password", {length: 256}).notNull(),
    dob: date("dob").notNull(),
    city: varchar("city", { length: 256 }),
    country: varchar("country", { length: 256}).default('India'),
    pincode: numeric("pincode"),
    address: varchar("address", { length: 256 }),
    weight: integer("weight").notNull(),
    height: integer("height").notNull(),
    palm_length: numeric("plam_length"),
    palm_width: numeric("palm_width"),
    knuckles_length: numeric("knuckles_length"),
    dominant_hand: hand("dominant_hand").notNull(),
    gender: gender("gender").notNull(),
    accessCode: uuid("accessCode").defaultRandom(),
    role: roleType('role').default("User"),
    createdAt: timestamp("createdAt").defaultNow(),
    // assessment
    // role
    // device
    // reminder
  });
  
  export const remarks = pgTable("remarks",{
    id: serial("id").primaryKey(),
    assessmentId: integer("assessmentId").notNull().references(() => assessment.id, {onDelete: "cascade"}),
    AssignerId: integer("AssignerId").notNull().references(() => user.id, {onDelete: "cascade"}),
    remarks: varchar("remarks", { length: 256 }).notNull(),
    createdAt: timestamp("createdAt").defaultNow(),
  })

  export const device = pgTable("device",{
    id: serial("id").primaryKey(),
    userId: integer("userId").notNull().references(() => user.id, {onDelete: "cascade"}),
    deviceCode: varchar("deviceCode").notNull().unique(),
    createdAt: timestamp("createdAt").defaultNow(),
  })

  export const assessment = pgTable("assessment",{
    id: serial("id").primaryKey(),
    userId: integer("userId").notNull().references(() => user.id, {onDelete: "cascade"}).unique(),
    deviceId: integer("deviceId").notNull().references(() => device.id),
    posture: posture("posture").notNull(),
    type: assestmentType("type").notNull(),
    status: status("status").default("Active"),
    createdAt: timestamp("createdAt").defaultNow(),
  })

  export const reminder = pgTable("reminder",{
    id: serial("id").primaryKey(),
    userId: integer("userId").notNull().references(() => user.id),
    assessmentId: integer("assessmentId").notNull().references(() => assessment.id, {onDelete: "cascade"}),
    date: date("date").notNull(),
    time: time("time").notNull(),
    createdAt: timestamp("createdAt").defaultNow(),
  })

  export const test = pgTable("test",{
    id: serial("id").primaryKey(),
    userId: integer("userId").notNull().references(() => user.id, {onDelete: "cascade"}),
    deviceId: integer("deviceId").notNull().references(() => device.id),
    assestmentId: integer("assestmentId").notNull().references(() => assessment.id, {onDelete: "cascade"}),
    posture: posture("posture").notNull(),
    trial1: integer("trial1").notNull(),
    trial2: integer("trial2").notNull(),
    trial3: integer("trial3").notNull(),
    hand: hand("hand").notNull(),
    createdAt: timestamp("createdAt").defaultNow(),
  })

  export const queue = pgTable("queue",{
    id: serial("id").primaryKey(),
    userId: integer("userId").notNull().references(() => user.id),
    deviceId: integer("deviceId").notNull().references(() => device.id, {onDelete: "cascade"}),
    assessmentId: integer("assessmentId").notNull().references(() => assessment.id, {onDelete: "cascade"}),
    posture: posture("posture").notNull(),
    hand: hand("hand").notNull(),
    createdAt: timestamp("createdAt").defaultNow(),
  })


  export const accountAccess = pgTable("accountAccess", {
    id: serial("id").primaryKey(),
    userId: integer("userId").notNull().references(() => user.id, {onDelete: "cascade"}),
    accountId: integer("accountId").notNull().references(() => user.id), 
    createdAt: timestamp("createdAt").defaultNow(),
  })

  export const userRelations = relations(user, ({one, many}) => ({
    device: many(device),
    assessment: many(assessment),
    accounts: many(accountAccess, {
      relationName: "accounts"
    })
  }))

  export const assessmentRelations = relations(assessment, ({one, many}) => ({
    user: one(user, {
      fields: [assessment.userId],
      references: [user.id],
    }),
    test: many(test),
    reminder: many(reminder),
    remarks: many(remarks),
    queue: one(queue, {
      fields: [assessment.id],
      references: [queue.assessmentId],
    })
  }))

  export const testRelations = relations(test, ({one, many}) => ({
    assessment: one(assessment, {
      fields: [test.assestmentId],
      references: [assessment.id],
    }),
  }))

  export const reminderRelations = relations(reminder, ({one, many}) => ({
    assessment: one(assessment, {
      fields: [reminder.assessmentId],
      references: [assessment.id],
    }),
  }))

  export const deviceRelations = relations(device, ({one, many}) => ({
    user: one(user, {
      fields: [device.userId],
      references: [user.id],
    }),
  }))

  export const accountRelations = relations( accountAccess, ({one, many}) => ({
    acc_connect: one(user, {
      fields: [accountAccess.accountId],
      references: [user.id]
    }),
    accounts: one(user, {
      fields: [accountAccess.userId],
      references: [user.id],
      relationName: "accounts"
    })
  }))

  export const remarksRelations = relations(remarks, ({one, many}) => ({
    assessment: one(assessment, {
      fields: [remarks.userId],
      references: [user.id],
    }),
  }))

  export const queueRelations = relations(queue, ({one, many}) => ({
    assessment: one(assessment, {
      fields: [queue.assessmentId],
      references: [assessment.id],
    }),
  }))

