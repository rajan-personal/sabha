import { pgTable, foreignKey, text, integer, timestamp, unique, boolean, pgEnum } from "drizzle-orm/pg-core"
import { sql } from "drizzle-orm"

export const governanceLevel = pgEnum("governance_level", ['national', 'state', 'local'])
export const postStatus = pgEnum("post_status", ['open', 'in_review', 'acknowledged', 'resolved', 'rejected'])
export const postType = pgEnum("post_type", ['issue', 'feedback', 'suggestion'])
export const priorityLevel = pgEnum("priority_level", ['low', 'medium', 'high'])
export const reactionType = pgEnum("reaction_type", ['like', 'dislike', 'love', 'angry', 'sad', 'laugh', 'upvote', 'downvote'])


export const comment = pgTable("comment", {
	id: text().primaryKey().notNull(),
	content: text().notNull(),
	authorId: text("author_id").notNull(),
	topicId: text("topic_id").notNull(),
	parentId: text("parent_id"),
	upvotes: integer().notNull(),
	downvotes: integer().notNull(),
	createdAt: timestamp("created_at", { mode: 'string' }).notNull(),
	updatedAt: timestamp("updated_at", { mode: 'string' }).notNull(),
}, (table) => [
	foreignKey({
			columns: [table.authorId],
			foreignColumns: [user.id],
			name: "comment_author_id_user_id_fk"
		}).onDelete("cascade"),
]);

export const session = pgTable("session", {
	id: text().primaryKey().notNull(),
	expiresAt: timestamp("expires_at", { mode: 'string' }).notNull(),
	token: text().notNull(),
	createdAt: timestamp("created_at", { mode: 'string' }).notNull(),
	updatedAt: timestamp("updated_at", { mode: 'string' }).notNull(),
	ipAddress: text("ip_address"),
	userAgent: text("user_agent"),
	userId: text("user_id").notNull(),
}, (table) => [
	foreignKey({
			columns: [table.userId],
			foreignColumns: [user.id],
			name: "session_user_id_user_id_fk"
		}).onDelete("cascade"),
	unique("session_token_unique").on(table.token),
]);

export const category = pgTable("category", {
	id: text().primaryKey().notNull(),
	name: text().notNull(),
	description: text(),
	color: text(),
	icon: text(),
	isActive: boolean("is_active").notNull(),
	createdAt: timestamp("created_at", { mode: 'string' }).notNull(),
	updatedAt: timestamp("updated_at", { mode: 'string' }).notNull(),
});

export const userProfile = pgTable("user_profile", {
	id: text().primaryKey().notNull(),
	userId: text("user_id").notNull(),
	bio: text(),
	location: text(),
	website: text(),
	totalTopics: integer("total_topics").notNull(),
	totalComments: integer("total_comments").notNull(),
	createdAt: timestamp("created_at", { mode: 'string' }).notNull(),
	updatedAt: timestamp("updated_at", { mode: 'string' }).notNull(),
}, (table) => [
	foreignKey({
			columns: [table.userId],
			foreignColumns: [user.id],
			name: "user_profile_user_id_user_id_fk"
		}).onDelete("cascade"),
]);

export const vote = pgTable("vote", {
	id: text().primaryKey().notNull(),
	userId: text("user_id").notNull(),
	topicId: text("topic_id"),
	commentId: text("comment_id"),
	type: text().notNull(),
	createdAt: timestamp("created_at", { mode: 'string' }).notNull(),
	updatedAt: timestamp("updated_at", { mode: 'string' }).notNull(),
}, (table) => [
	foreignKey({
			columns: [table.userId],
			foreignColumns: [user.id],
			name: "vote_user_id_user_id_fk"
		}).onDelete("cascade"),
	foreignKey({
			columns: [table.commentId],
			foreignColumns: [comment.id],
			name: "vote_comment_id_comment_id_fk"
		}).onDelete("cascade"),
]);

export const notification = pgTable("notification", {
	id: text().primaryKey().notNull(),
	userId: text("user_id").notNull(),
	type: text().notNull(),
	title: text().notNull(),
	message: text().notNull(),
	postId: text("post_id"),
	commentId: text("comment_id"),
	isRead: boolean("is_read").notNull(),
	createdAt: timestamp("created_at", { mode: 'string' }).notNull(),
	readAt: timestamp("read_at", { mode: 'string' }),
});

export const attachment = pgTable("attachment", {
	id: text().primaryKey().notNull(),
	postId: text("post_id"),
	commentId: text("comment_id"),
	fileName: text("file_name").notNull(),
	originalName: text("original_name").notNull(),
	fileSize: integer("file_size").notNull(),
	mimeType: text("mime_type").notNull(),
	fileUrl: text("file_url").notNull(),
	isVerified: boolean("is_verified").notNull(),
	verifiedAt: timestamp("verified_at", { mode: 'string' }),
	verifiedBy: text("verified_by"),
	uploadedBy: text("uploaded_by").notNull(),
	createdAt: timestamp("created_at", { mode: 'string' }).notNull(),
	updatedAt: timestamp("updated_at", { mode: 'string' }).notNull(),
});

export const officialTag = pgTable("official_tag", {
	id: text().primaryKey().notNull(),
	name: text().notNull(),
	title: text().notNull(),
	organization: text().notNull(),
	governanceLevel: governanceLevel("governance_level").notNull(),
	location: text(),
	twitterHandle: text("twitter_handle"),
	isVerified: boolean("is_verified").notNull(),
	verifiedAt: timestamp("verified_at", { mode: 'string' }),
	verifiedBy: text("verified_by"),
	email: text(),
	phone: text(),
	createdAt: timestamp("created_at", { mode: 'string' }).notNull(),
	updatedAt: timestamp("updated_at", { mode: 'string' }).notNull(),
});

export const post = pgTable("post", {
	id: text().primaryKey().notNull(),
	title: text().notNull(),
	content: text().notNull(),
	authorId: text("author_id").notNull(),
	categoryId: text("category_id"),
	postType: postType("post_type").notNull(),
	priorityLevel: priorityLevel("priority_level").default('medium').notNull(),
	governanceLevel: governanceLevel("governance_level").notNull(),
	status: postStatus().default('open').notNull(),
	location: text(),
	deadline: timestamp({ mode: 'string' }),
	officialResponse: text("official_response"),
	upvotes: integer().notNull(),
	downvotes: integer().notNull(),
	commentCount: integer("comment_count").notNull(),
	viewCount: integer("view_count").notNull(),
	createdAt: timestamp("created_at", { mode: 'string' }).notNull(),
	updatedAt: timestamp("updated_at", { mode: 'string' }).notNull(),
});

export const postTag = pgTable("post_tag", {
	id: text().primaryKey().notNull(),
	postId: text("post_id").notNull(),
	officialTagId: text("official_tag_id"),
	customTag: text("custom_tag"),
	createdAt: timestamp("created_at", { mode: 'string' }).notNull(),
});

export const reaction = pgTable("reaction", {
	id: text().primaryKey().notNull(),
	userId: text("user_id").notNull(),
	postId: text("post_id"),
	commentId: text("comment_id"),
	type: reactionType().notNull(),
	createdAt: timestamp("created_at", { mode: 'string' }).notNull(),
	updatedAt: timestamp("updated_at", { mode: 'string' }).notNull(),
});

export const verification = pgTable("verification", {
	id: text().primaryKey().notNull(),
	identifier: text().notNull(),
	value: text().notNull(),
	expiresAt: timestamp("expires_at", { mode: 'string' }).notNull(),
	createdAt: timestamp("created_at", { mode: 'string' }),
	updatedAt: timestamp("updated_at", { mode: 'string' }),
});

export const user = pgTable("user", {
	id: text().primaryKey().notNull(),
	name: text().notNull(),
	email: text().notNull(),
	emailVerified: boolean("email_verified").notNull(),
	image: text(),
	createdAt: timestamp("created_at", { mode: 'string' }).notNull(),
	updatedAt: timestamp("updated_at", { mode: 'string' }).notNull(),
}, (table) => [
	unique("user_email_unique").on(table.email),
]);

export const account = pgTable("account", {
	id: text().primaryKey().notNull(),
	accountId: text("account_id").notNull(),
	providerId: text("provider_id").notNull(),
	userId: text("user_id").notNull(),
	accessToken: text("access_token"),
	refreshToken: text("refresh_token"),
	idToken: text("id_token"),
	accessTokenExpiresAt: timestamp("access_token_expires_at", { mode: 'string' }),
	refreshTokenExpiresAt: timestamp("refresh_token_expires_at", { mode: 'string' }),
	scope: text(),
	password: text(),
	createdAt: timestamp("created_at", { mode: 'string' }).notNull(),
	updatedAt: timestamp("updated_at", { mode: 'string' }).notNull(),
}, (table) => [
	foreignKey({
			columns: [table.userId],
			foreignColumns: [user.id],
			name: "account_user_id_user_id_fk"
		}).onDelete("cascade"),
]);
