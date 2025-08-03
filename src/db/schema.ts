import { pgTable, text, timestamp, boolean, integer, pgEnum } from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm";

// Political platform enums
export const postTypeEnum = pgEnum('post_type', ['issue', 'feedback', 'suggestion']);
export const priorityLevelEnum = pgEnum('priority_level', ['low', 'medium', 'high']);
export const governanceLevelEnum = pgEnum('governance_level', ['national', 'state', 'local']);
export const postStatusEnum = pgEnum('post_status', ['open', 'in_review', 'acknowledged', 'resolved', 'rejected']);
export const reactionTypeEnum = pgEnum('reaction_type', ['like', 'dislike', 'love', 'angry', 'sad', 'laugh', 'upvote', 'downvote']);

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

export const post = pgTable("post", {
	id: text('id').primaryKey(),
	title: text('title').notNull(),
	content: text('content').notNull(),
	authorId: text('author_id').notNull().references(() => user.id, { onDelete: 'cascade' }),
	
	// Political features
	postType: postTypeEnum('post_type').notNull(),
	priorityLevel: priorityLevelEnum('priority_level').default('medium').notNull(),
	governanceLevel: governanceLevelEnum('governance_level').notNull(),
	status: postStatusEnum('status').default('open').notNull(),
	location: text('location'), // For local/city level posts
	deadline: timestamp('deadline'), // For time-sensitive posts
	officialResponse: text('official_response'), // Government response
	
	// Existing fields
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
	postId: text('post_id').notNull().references(() => post.id, { onDelete: 'cascade' }),
	parentId: text('parent_id'), // for nested comments
	upvotes: integer('upvotes').$defaultFn(() => 0).notNull(),
	downvotes: integer('downvotes').$defaultFn(() => 0).notNull(),
	createdAt: timestamp('created_at').$defaultFn(() => /* @__PURE__ */ new Date()).notNull(),
	updatedAt: timestamp('updated_at').$defaultFn(() => /* @__PURE__ */ new Date()).notNull()
});

export const vote = pgTable("vote", {
	id: text('id').primaryKey(),
	userId: text('user_id').notNull().references(() => user.id, { onDelete: 'cascade' }),
	postId: text('post_id').references(() => post.id, { onDelete: 'cascade' }),
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

// New political tables
export const officialTag = pgTable("official_tag", {
	id: text('id').primaryKey(),
	name: text('name').notNull(),
	title: text('title').notNull(), // Official title/position
	organization: text('organization').notNull(), // Government department/ministry
	governanceLevel: governanceLevelEnum('governance_level').notNull(),
	location: text('location'), // State/city for local officials
	twitterHandle: text('twitter_handle'),
	isVerified: boolean('is_verified').$defaultFn(() => false).notNull(),
	verifiedAt: timestamp('verified_at'),
	verifiedBy: text('verified_by').references(() => user.id),
	email: text('email'),
	phone: text('phone'),
	createdAt: timestamp('created_at').$defaultFn(() => /* @__PURE__ */ new Date()).notNull(),
	updatedAt: timestamp('updated_at').$defaultFn(() => /* @__PURE__ */ new Date()).notNull()
});

export const postTag = pgTable("post_tag", {
	id: text('id').primaryKey(),
	postId: text('post_id').notNull().references(() => post.id, { onDelete: 'cascade' }),
	officialTagId: text('official_tag_id').references(() => officialTag.id, { onDelete: 'cascade' }),
	customTag: text('custom_tag'), // For non-official tags
	createdAt: timestamp('created_at').$defaultFn(() => /* @__PURE__ */ new Date()).notNull()
});

export const attachment = pgTable("attachment", {
	id: text('id').primaryKey(),
	postId: text('post_id').references(() => post.id, { onDelete: 'cascade' }),
	commentId: text('comment_id').references(() => comment.id, { onDelete: 'cascade' }),
	fileName: text('file_name').notNull(),
	originalName: text('original_name').notNull(),
	fileSize: integer('file_size').notNull(),
	mimeType: text('mime_type').notNull(),
	fileUrl: text('file_url').notNull(),
	isVerified: boolean('is_verified').$defaultFn(() => false).notNull(),
	verifiedAt: timestamp('verified_at'),
	verifiedBy: text('verified_by').references(() => user.id),
	uploadedBy: text('uploaded_by').notNull().references(() => user.id, { onDelete: 'cascade' }),
	createdAt: timestamp('created_at').$defaultFn(() => /* @__PURE__ */ new Date()).notNull(),
	updatedAt: timestamp('updated_at').$defaultFn(() => /* @__PURE__ */ new Date()).notNull()
});

export const reaction = pgTable("reaction", {
	id: text('id').primaryKey(),
	userId: text('user_id').notNull().references(() => user.id, { onDelete: 'cascade' }),
	postId: text('post_id').references(() => post.id, { onDelete: 'cascade' }),
	commentId: text('comment_id').references(() => comment.id, { onDelete: 'cascade' }),
	type: reactionTypeEnum('type').notNull(),
	createdAt: timestamp('created_at').$defaultFn(() => /* @__PURE__ */ new Date()).notNull(),
	updatedAt: timestamp('updated_at').$defaultFn(() => /* @__PURE__ */ new Date()).notNull()
});

export const notification = pgTable("notification", {
	id: text('id').primaryKey(),
	userId: text('user_id').notNull().references(() => user.id, { onDelete: 'cascade' }),
	type: text('type').notNull(), // 'tag', 'response', 'status_change', 'deadline'
	title: text('title').notNull(),
	message: text('message').notNull(),
	postId: text('post_id').references(() => post.id, { onDelete: 'cascade' }),
	commentId: text('comment_id').references(() => comment.id, { onDelete: 'cascade' }),
	isRead: boolean('is_read').$defaultFn(() => false).notNull(),
	createdAt: timestamp('created_at').$defaultFn(() => /* @__PURE__ */ new Date()).notNull(),
	readAt: timestamp('read_at')
});

// Backward compatibility - export post as topic for existing code
export const topic = post;

// Location management tables
export const state = pgTable("state", {
	id: text('id').primaryKey().default(sql`gen_random_uuid()`),
	name: text('name').notNull().unique(),
	code: text('code').notNull().unique(), // State code like 'UP', 'MH', etc.
	type: text('type').notNull(), // 'state' or 'ut' (Union Territory)
	isActive: boolean('is_active').$defaultFn(() => true).notNull(),
	createdAt: timestamp('created_at').$defaultFn(() => /* @__PURE__ */ new Date()).notNull(),
	updatedAt: timestamp('updated_at').$defaultFn(() => /* @__PURE__ */ new Date()).notNull()
});

export const city = pgTable("city", {
	id: text('id').primaryKey().default(sql`gen_random_uuid()`),
	name: text('name').notNull(),
	stateId: text('state_id').notNull().references(() => state.id, { onDelete: 'cascade' }),
	type: text('type').notNull(), // 'metropolitan', 'city', 'district', 'municipality', 'town'
	population: integer('population'), // Optional population data
	isCapital: boolean('is_capital').$defaultFn(() => false).notNull(),
	isActive: boolean('is_active').$defaultFn(() => true).notNull(),
	createdAt: timestamp('created_at').$defaultFn(() => /* @__PURE__ */ new Date()).notNull(),
	updatedAt: timestamp('updated_at').$defaultFn(() => /* @__PURE__ */ new Date()).notNull()
});
