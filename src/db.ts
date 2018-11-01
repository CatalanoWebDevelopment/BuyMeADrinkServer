const Sequelize = require("sequelize");

export const sequelize = new Sequelize(
	"buy_me_a_drink",
	"postgres",
	process.env.PASS,
	{
		host: "localhost",
		dialect: "postgres"
	}
);

sequelize.authenticate().then(
	function() {
		console.log("Connected to Buy_Me_A_Drink Database.");
	},
	function(err) {
		console.log(err);
	}
);