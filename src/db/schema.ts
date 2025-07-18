import { pgTable, text, timestamp, boolean, integer } from "drizzle-orm/pg-core";

export const user = pgTable("user", {
	id: text('id').primaryKey(),
	name: text('name').notNull(),
	email: text('email').notNull().unique(),
	emailVerified: boolean('email_verified').$defaultFn(() => false).notNull(),
	image: text('image'),
	createdAt: timestamp('created_at').$defaultFn(() => /* @__PURE__ */ new Date()).notNull(),
	updatedAt: timestamp('updated_at').$defaultFn(() => /* @__PURE__ */ new Date()).notNull()
});

export const session = pgTable("session", {
	id: text('id').primaryKey(),
	expiresAt: timestamp('expires_at').notNull(),
	token: text('token').notNull().unique(),
	createdAt: timestamp('created_at').notNull(),
	updatedAt: timestamp('updated_at').notNull(),
	ipAddress: text('ip_address'),
	userAgent: text('user_agent'),
	userId: text('user_id').notNull().references(() => user.id, { onDelete: 'cascade' })
});

export const account = pgTable("account", {
	id: text('id').primaryKey(),
	accountId: text('account_id').notNull(),
	providerId: text('provider_id').notNull(),
	userId: text('user_id').notNull().references(() => user.id, { onDelete: 'cascade' }),
	accessToken: text('access_token'),
	refreshToken: text('refresh_token'),
	idToken: text('id_token'),
	accessTokenExpiresAt: timestamp('access_token_expires_at'),
	refreshTokenExpiresAt: timestamp('refresh_token_expires_at'),
	scope: text('scope'),
	password: text('password'),
	createdAt: timestamp('created_at').notNull(),
	updatedAt: timestamp('updated_at').notNull()
});

export const verification = pgTable("verification", {
	id: text('id').primaryKey(),
	identifier: text('identifier').notNull(),
	value: text('value').notNull(),
	expiresAt: timestamp('expires_at').notNull(),
	createdAt: timestamp('created_at').$defaultFn(() => /* @__PURE__ */ new Date()),
	updatedAt: timestamp('updated_at').$defaultFn(() => /* @__PURE__ */ new Date())
});

export const category = pgTable("category", {
	id: text('id').primaryKey(),
	name: text('name').notNull(),
	description: text('description'),
	color: text('color'),
	icon: text('icon'),
	isActive: boolean('is_active').$defaultFn(() => true).notNull(),
	createdAt: timestamp('created_at').$defaultFn(() => /* @__PURE__ */ new Date()).notNull(),
	updatedAt: timestamp('updated_at').$defaultFn(() => /* @__PURE__ */ new Date()).notNull()
});

export const topic = pgTable("topic", {
	id: text('id').primaryKey(),
	title: text('title').notNull(),
	content: text('content').notNull(),
	authorId: text('author_id').notNull().references(() => user.id, { onDelete: 'cascade' }),
	categoryId: text('category_id').references(() => category.id),
	upvotes: integer('upvotes').$defaultFn(() => 0).notNull(),
	downvotes: integer('downvotes').$defaultFn(() => 0).notNull(),
	commentCount: integer('comment_count').$defaultFn(() => 0).notNull(),
	viewCount: integer('view_count').$defaultFn(() => 0).notNull(),
	createdAt: timestamp('created_at').$defaultFn(() => /* @__PURE__ */ new Date()).notNull(),
	updatedAt: timestamp('updated_at').$defaultFn(() => /* @__PURE__ */ new Date()).notNull()
});

export const comment = pgTable("comment", {
	id: text('id').primaryKey(),
	content: text('content').notNull(),
	authorId: text('author_id').notNull().references(() => user.id, { onDelete: 'cascade' }),
	topicId: text('topic_id').notNull().references(() => topic.id, { onDelete: 'cascade' }),
	parentId: text('parent_id'), // for nested comments
	upvotes: integer('upvotes').$defaultFn(() => 0).notNull(),
	downvotes: integer('downvotes').$defaultFn(() => 0).notNull(),
	createdAt: timestamp('created_at').$defaultFn(() => /* @__PURE__ */ new Date()).notNull(),
	updatedAt: timestamp('updated_at').$defaultFn(() => /* @__PURE__ */ new Date()).notNull()
});

export const vote = pgTable("vote", {
	id: text('id').primaryKey(),
	userId: text('user_id').notNull().references(() => user.id, { onDelete: 'cascade' }),
	topicId: text('topic_id').references(() => topic.id, { onDelete: 'cascade' }),
	commentId: text('comment_id').references(() => comment.id, { onDelete: 'cascade' }),
	type: text('type').notNull(), // 'upvote' or 'downvote'
	createdAt: timestamp('created_at').$defaultFn(() => /* @__PURE__ */ new Date()).notNull(),
	updatedAt: timestamp('updated_at').$defaultFn(() => /* @__PURE__ */ new Date()).notNull()
});

export const userProfile = pgTable("user_profile", {
	id: text('id').primaryKey(),
	userId: text('user_id').notNull().references(() => user.id, { onDelete: 'cascade' }),
	bio: text('bio'),
	location: text('location'),
	website: text('website'),
	totalTopics: integer('total_topics').$defaultFn(() => 0).notNull(),
	totalComments: integer('total_comments').$defaultFn(() => 0).notNull(),
	createdAt: timestamp('created_at').$defaultFn(() => /* @__PURE__ */ new Date()).notNull(),
	updatedAt: timestamp('updated_at').$defaultFn(() => /* @__PURE__ */ new Date()).notNull()
});
