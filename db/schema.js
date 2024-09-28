import { relations } from "drizzle-orm";
import { pgTable, serial, varchar, numeric, date, timestamp, pgEnum, integer, time, uuid, primaryKey} from "drizzle-orm/pg-core";

export const gender = pgEnum("gender", ["Male","Female","Prefer not to say"])
export const hand = pgEnum("hand", ["Left","Right"])
export const posture = pgEnum("posture", ["Full Body Weight", "Full Arm Weight", "Forward Loading", "Backward Off Loading", "Side Loading", "Side Off Loading", "sitting" ])
export const assestmentType = pgEnum("assestmentType", ["Weekly", "Monthly", "Daily"])
export const status = pgEnum("status", ["Active", "Completed"])

export const user = pgTable("user", {
    id: serial("id").primaryKey(),
    name: varchar("name", { length: 256 }).notNull(),
    countryCode: varchar("countryCode").notNull(),
    phone: numeric("phone", {precision: 10, scale: 0}).notNull().unique(),
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
    createdAt: timestamp("createdAt").defaultNow(),
    // assessment
    // role
    // device
    // reminder
  });
  
  export const remarks = pgTable("remarks",{
    id: serial("id").primaryKey(),
    assessmentId: integer("assessmentId").notNull().references(() => assessment.id, {onDelete: "cascade"}),
    AssignerId: integer("AssignerId").notNull().references(() => Specialist.id, {onDelete: "cascade"}),
    remarks: varchar("remarks", { length: 256 }).notNull(),
    createdAt: timestamp("createdAt").defaultNow(),
  })

  export const device = pgTable("device",{
    id: serial("id").primaryKey(),
    userId: integer("userId").notNull().references(() => user.id, {onDelete: "cascade"}),
    deviceName: varchar("deviceName", { length: 256 }).notNull(),
    deviceCode: varchar("deviceCode").notNull().unique(),
    createdAt: timestamp("createdAt").defaultNow(),
  })

  export const assessment = pgTable("assessment",{
    id: serial("id").primaryKey(),
    userId: integer("userId").notNull().references(() => user.id, {onDelete: "cascade"}),
    posture: posture("posture").notNull(),
    type: assestmentType("type").notNull(),
    status: status("status").default("Active"),
    createdAt: timestamp("createdAt").defaultNow(),
  })

  export const test = pgTable("test",{
    id: serial("id").primaryKey(),
    userId: integer("userId").notNull().references(() => user.id, {onDelete: "cascade"}),
    deviceId: integer("deviceId").notNull().references(() => device.id),
    assestmentId: integer("assestmentId").notNull().references(() => assessment.id, {onDelete: "cascade"}),
    posture: posture("posture").notNull(),
    trial1: numeric("trial1").notNull(),
    trial2: numeric("trial2").notNull(),
    trial3: numeric("trial3").notNull(),
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


  export const DeviceQueue = pgTable("deviceQueue", {
    id: serial("id").primaryKey(),
    deviceCode: uuid("accessCode").defaultRandom(),
  })

  export const Specialist = pgTable("specialist", {
    id: serial("id").primaryKey(),
    name: varchar("name", { length: 256 }).notNull(),
    countryCode: varchar("countryCode").notNull(),
    phone: numeric("phone", {precision: 10, scale: 0}).notNull().unique(),
    email: varchar("email", { length: 256 }).unique().notNull(),
    password: varchar("password", {length: 256}).notNull(),
    dob: date("dob").notNull(), 
    city: varchar("city", { length: 256 }),
    country: varchar("country", { length: 256}).default('India'),
    pincode: numeric("pincode"),
    address: varchar("address", { length: 256 }),
    createdAt: timestamp("createdAt").defaultNow(),
  })

  export const SpecialistQueue = pgTable("specialistQueue", {
    id: serial("id").primaryKey(),
    name: varchar("name", { length: 256 }).notNull(),
    countryCode: varchar("countryCode").notNull(),
    phone: numeric("phone", {precision: 10, scale: 0}).notNull().unique(),
    email: varchar("email", { length: 256 }).unique().notNull(),
    password: varchar("password", {length: 256}).notNull(),
    dob: date("dob").notNull(), 
    city: varchar("city", { length: 256 }),
    country: varchar("country", { length: 256}).default('India'),
    pincode: numeric("pincode"),
    address: varchar("address", { length: 256 }),
    createdAt: timestamp("createdAt").defaultNow(),
  })

  export const accountAccess = pgTable("accountAccess",{
    id: serial("id").primaryKey(),
    userId: integer('userId').notNull().references(()=>user.id, {onDelete: "cascade"}),
    specialistId: integer('specialistId').notNull().references(()=>Specialist.id, {onDelete: "cascade"})
  }
  )

  export const userRelations = relations(user, ({one, many}) => ({
    device: many(device),
    assessment: many(assessment),
    accounts: many(accountAccess)
  }))

  export const accountAccessRelations = relations(accountAccess, ({one}) => ({
    user: one(user, {
      fields: [accountAccess.userId],
      references: [user.id],
    }),
    specialist: one(Specialist, {
      fields: [accountAccess.specialistId],
      references: [Specialist.id],
    }),
  }))

  export const assessmentRelations = relations(assessment, ({one, many}) => ({
    user: one(user, {
      fields: [assessment.userId],
      references: [user.id],
    }),
    test: many(test),
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


  export const deviceRelations = relations(device, ({one, many}) => ({
    user: one(user, {
      fields: [device.userId],
      references: [user.id],
    }),
  }))


  export const specialistRelations = relations(Specialist, ({one, many}) => ({
    accounts: many(accountAccess)
  }))

  export const remarksRelations = relations(remarks, ({one, many}) => ({
    assessment: one(assessment, {
      fields: [remarks.assessmentId],
      references: [user.id],
    }),
  }))

  export const queueRelations = relations(queue, ({one, many}) => ({
    assessment: one(assessment, {
      fields: [queue.assessmentId],
      references: [assessment.id],
    }),
  }))

