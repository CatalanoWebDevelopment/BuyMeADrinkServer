import { sequelize } from "../db";
const UserLocation = sequelize.import("../models/userLocation");

class UserLocationService {
	async userLocationCreate(locationObj, userId) {
		try {
			const createdUserLocation = await UserLocation.create({
				locationId: locationObj.locationId,
				userId
			})

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
