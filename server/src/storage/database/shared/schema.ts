import { pgTable, serial, timestamp, varchar, boolean, integer, jsonb, index } from "drizzle-orm/pg-core"
import { sql } from "drizzle-orm"

// 问卷表
export const surveys = pgTable(
  "surveys",
  {
    id: serial().primaryKey(),
    title: varchar("title", { length: 255 }).notNull(),
    description: varchar("description", { length: 500 }),
    is_active: boolean("is_active").default(true).notNull(),
    created_at: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
    updated_at: timestamp("updated_at", { withTimezone: true }),
  }
)

// 问卷问题表
export const surveyQuestions = pgTable(
  "survey_questions",
  {
    id: serial().primaryKey(),
    survey_id: integer("survey_id").notNull().references(() => surveys.id, { onDelete: "cascade" }),
    question_text: varchar("question_text", { length: 500 }).notNull(),
    question_type: varchar("question_type", { length: 20 }).notNull(), // 'rating' | 'single_choice' | 'multi_choice' | 'text'
    options: jsonb("options"), // 存储选项列表，如 ["非常满意", "满意", "一般", "不满意"]
    required: boolean("required").default(true).notNull(),
    order_index: integer("order_index").default(0).notNull(),
    created_at: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
  },
  (table) => [
    index("survey_questions_survey_id_idx").on(table.survey_id),
    index("survey_questions_order_idx").on(table.order_index),
  ]
)

// 问卷回答表
export const surveyResponses = pgTable(
  "survey_responses",
  {
    id: serial().primaryKey(),
    survey_id: integer("survey_id").notNull().references(() => surveys.id),
    user_name: varchar("user_name", { length: 100 }).notNull(),
    answers: jsonb("answers").notNull(), // 存储回答，如 { "question_id": "answer_value" }
    created_at: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
  },
  (table) => [
    index("survey_responses_survey_id_idx").on(table.survey_id),
    index("survey_responses_created_at_idx").on(table.created_at),
  ]
)

export const healthCheck = pgTable("health_check", {
	id: serial().notNull(),
	updatedAt: timestamp("updated_at", { withTimezone: true, mode: 'string' }).defaultNow(),
});
