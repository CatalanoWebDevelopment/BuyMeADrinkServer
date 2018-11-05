import { sequelize } from "../db";
import user from "../models/user";
import location from "../models/location";
const UserLocation = sequelize.import("../models/userLocation");

class UserLocationService {
	async userLocationCreate(locationId, userId) {
		try {
			const createdUserLocation = await UserLocation.create(
				{
					locationId,
					userId
				},
				{
					include: [user]
				}
			);

			return createdUserLocation;
		} catch (e) {
			return {
				error: true,
				e: e.errors[0].message
			};
		}
	}

	async userLocationMasterFetch(locationId) {
		const fetchedUserLocations = await UserLocation.findAll({
			where: { locationId },
			include: ["user"]
		});

		return fetchedUserLocations;
	}
}

export const userLocationController = new UserLocationService();
