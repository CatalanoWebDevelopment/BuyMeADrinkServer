import { sequelize } from "../db";
const UserMessage = sequelize.import("../models/message");

interface ErrorWithStatus extends Error {
	status?: number;
}

class UserMessageService {
	async userMessageCreate(messageId, userId) {
		try {
			const createdUserMessage = await UserMessage.create(messageId, userId);

			return createdUserMessage;
		} catch (e) {
			return {
				error: true,
				e: e.errors[0].message
			};
		}
	}

	async userMessageMasterFetch(userId) {
		const fetchedUserMessages = await UserMessage.findAll({
			where: { userId },
			include: ["message"]
		});

		return fetchedUserMessages;
	}
}

export const userMessageController = new UserMessageService();
