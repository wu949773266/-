import { pgTable, serial, timestamp, varchar, boolean, integer, jsonb, index } from "drizzle-orm/pg-core"
import { sql } from "drizzle-orm"

// 活动表（每期活动独立问卷）
export const activities = pgTable(
  "activities",
  {
    id: serial().primaryKey(),
    name: varchar("name", { length: 255 }).notNull(),        // 活动名称，如"雨崩徒步第12期"
    date: varchar("date", { length: 50 }),                   // 活动日期
    description: varchar("description", { length: 500 }),     // 活动描述/备注
    is_active: boolean("is_active").default(true).notNull(), // 是否开放填写
    created_at: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
    updated_at: timestamp("updated_at", { withTimezone: true }),
  },
  (table) => [
    index("activities_active_idx").on(table.is_active),
    index("activities_created_at_idx").on(table.created_at),
  ]
)

// 活动问卷表（每个活动一份独立的问卷模板）
export const activitySurveys = pgTable(
  "activity_surveys",
  {
    id: serial().primaryKey(),
    activity_id: integer("activity_id").notNull().references(() => activities.id, { onDelete: "cascade" }),
    title: varchar("title", { length: 255 }).notNull(),      // 问卷标题
    description: varchar("description", { length: 500 }),   // 问卷说明
    created_at: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
    updated_at: timestamp("updated_at", { withTimezone: true }),
  },
  (table) => [
    index("activity_surveys_activity_id_idx").on(table.activity_id),
  ]
)

// 活动问卷问题表
export const activitySurveyQuestions = pgTable(
  "activity_survey_questions",
  {
    id: serial().primaryKey(),
    survey_id: integer("survey_id").notNull().references(() => activitySurveys.id, { onDelete: "cascade" }),
    question_text: varchar("question_text", { length: 500 }).notNull(),
    question_type: varchar("question_type", { length: 20 }).notNull(), // 'rating' | 'single_choice' | 'multi_choice' | 'text'
    options: jsonb("options"),                                          // 存储选项列表
    required: boolean("required").default(true).notNull(),
    order_index: integer("order_index").default(0).notNull(),
    created_at: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
  },
  (table) => [
    index("activity_survey_questions_survey_id_idx").on(table.survey_id),
    index("activity_survey_questions_order_idx").on(table.order_index),
  ]
)

// 活动问卷回答表（匿名，管理员通过活动ID查看）
export const activitySurveyResponses = pgTable(
  "activity_survey_responses",
  {
    id: serial().primaryKey(),
    survey_id: integer("survey_id").notNull().references(() => activitySurveys.id),
    answers: jsonb("answers").notNull(),                           // 存储回答
    created_at: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
  },
  (table) => [
    index("activity_survey_responses_survey_id_idx").on(table.survey_id),
    index("activity_survey_responses_created_at_idx").on(table.created_at),
  ]
)

// 旧问卷表（可保留或删除）
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

// 旧问卷问题表
export const surveyQuestions = pgTable(
  "survey_questions",
  {
    id: serial().primaryKey(),
    survey_id: integer("survey_id").notNull().references(() => surveys.id, { onDelete: "cascade" }),
    question_text: varchar("question_text", { length: 500 }).notNull(),
    question_type: varchar("question_type", { length: 20 }).notNull(),
    options: jsonb("options"),
    required: boolean("required").default(true).notNull(),
    order_index: integer("order_index").default(0).notNull(),
    created_at: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
  },
  (table) => [
    index("survey_questions_survey_id_idx").on(table.survey_id),
    index("survey_questions_order_idx").on(table.order_index),
  ]
)

// 旧问卷回答表
export const surveyResponses = pgTable(
  "survey_responses",
  {
    id: serial().primaryKey(),
    survey_id: integer("survey_id").notNull().references(() => surveys.id),
    user_name: varchar("user_name", { length: 100 }).notNull(),
    answers: jsonb("answers").notNull(),
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
