import { sequelize } from "../db";
const Message = sequelize.import("../models/message");

interface ErrorWithStatus extends Error {
	status?: number;
}

class MessageService {
	async messageCreate(messageObj) {
		try {
			const createdMessage = await Message.create({
				comment: messageObj.comment,
				userId: messageObj.userId
			});

			return createdMessage;
		} catch (e) {
			return {
				error: true,
				e: e.errors[0].message
			};
		}
	}

	async messageFind(id) {
		const foundMessage = await Message.findOne({
			where: { id }
		});

		if (!foundMessage) {
			const e: ErrorWithStatus = new Error("message Not Found");
			e.status = 404;
			throw `${e.message}, Status: ${e.status}`;
		}

		return foundMessage;
	}

	async messageFindAll() {
		const messages = await Message.findAll();

		if (!messages) {
			const e: ErrorWithStatus = new Error("No Currently Existing messages");
			e.status = 404;
			throw `${e.message}, Status: ${e.status}`;
		}

		return messages;
	}

	async messageDelete(id) {
		const foundMessage = await Message.findOne({
			where: { id }
		});

		if (!foundMessage) {
			const e: ErrorWithStatus = new Error("Message Not Found");
			e.status = 404;
			throw `${e.message}, Status: ${e.status}`;
		} else {
			await Message.destroy({
				where: { id }
			});

			return { success: true };
		}
	}

	async messageUpdate(id, messageObj) {
		const updatedMessage = await Message.update(
			{ messageObj },
			{ where: { id } }
		);

		return updatedMessage;
	}
}

export const messageController = new MessageService();
