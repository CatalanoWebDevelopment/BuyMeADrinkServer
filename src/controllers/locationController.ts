import { sequelize } from "../db";
const Location = sequelize.import("../models/location");

interface ErrorWithStatus extends Error {
	status?: number;
}

class LocationService {
	async locationCreate(locationObj) {
		try {
			const createdLocation = await Location.create({
				name: locationObj.name,
				description: locationObj.description
			});

			return createdLocation;
		} catch (e) {
			return {
				error: true,
				e: e.errors[0].message
			};
		}
	}

	async locationFind(id) {
		const foundLocation = await Location.findOne({
			where: { id }
		});

		if (!foundLocation) {
			const e: ErrorWithStatus = new Error("Location Not Found");
			e.status = 404;
			throw `${e.message}, Status: ${e.status}`;
		}

		return foundLocation;
	}

	async locationFindAll() {
		const locations = await Location.findAll();

		if (!locations) {
			const e: ErrorWithStatus = new Error("No Currently Existing Locations");
			e.status = 404;
			throw `${e.message}, Status: ${e.status}`;
		}

		return locations;
	}

	async locationDelete(id) {
		const foundLocation = await Location.findOne({
			where: { id }
		});

		if (!foundLocation) {
			const e: ErrorWithStatus = new Error("Location Not Found");
			e.status = 404;
			throw `${e.message}, Status: ${e.status}`;
		} else {
			await Location.destroy({
				where: { id }
			});

			return { success: true };
		}
	}

	async locationUpdate(id, locationObj) {
		const updatedLocation = await Location.update(
			{ locationObj },
			{ where: { id } }
		);

		return updatedLocation;
	}

	async locationMasterFetch(id) {
		const location = await Location.findAll({
			where: { id },
			include: ["user"]
		});

		return location;
	}
}

export const locationController = new LocationService();
