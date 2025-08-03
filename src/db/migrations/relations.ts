import { relations } from "drizzle-orm/relations";
import { user, comment, session, userProfile, vote, account } from "./schema";

export const commentRelations = relations(comment, ({one, many}) => ({
	user: one(user, {
		fields: [comment.authorId],
		references: [user.id]
	}),
	votes: many(vote),
}));

export const userRelations = relations(user, ({many}) => ({
	comments: many(comment),
	sessions: many(session),
	userProfiles: many(userProfile),
	votes: many(vote),
	accounts: many(account),
}));

export const sessionRelations = relations(session, ({one}) => ({
	user: one(user, {
		fields: [session.userId],
		references: [user.id]
	}),
}));

export const userProfileRelations = relations(userProfile, ({one}) => ({
	user: one(user, {
		fields: [userProfile.userId],
		references: [user.id]
	}),
}));

export const voteRelations = relations(vote, ({one}) => ({
	user: one(user, {
		fields: [vote.userId],
		references: [user.id]
	}),
	comment: one(comment, {
		fields: [vote.commentId],
		references: [comment.id]
	}),
}));

export const accountRelations = relations(account, ({one}) => ({
	user: one(user, {
		fields: [account.userId],
		references: [user.id]
	}),
}));