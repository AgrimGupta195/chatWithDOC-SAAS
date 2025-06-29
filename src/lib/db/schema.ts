import { pgTable, serial, varchar, json, text, timestamp, pgEnum, integer } from "drizzle-orm/pg-core";

export const userSystemEnum = pgEnum('user_system_enum', ['user', 'system']);

export const chats = pgTable('chats', {
    id: serial('id').primaryKey().notNull(),
    pdfName: text('pdfName').notNull(),
    pdfUrl: text('pdfUrl').notNull(),
    createdAt: timestamp('createdAt').defaultNow().notNull(),
    userId: varchar('userId', { length: 256 }).notNull(),
    fileKey: text('fileKey').notNull(),
});

export const messages = pgTable('messages', {
    id: serial('id').primaryKey().notNull(),
    chatId: integer('chatId').references(() => chats.id).notNull(), // Changed to integer
    content: text('content').notNull(),
    role: userSystemEnum('role').notNull(),
    createdAt: timestamp('createdAt').defaultNow().notNull(),
});