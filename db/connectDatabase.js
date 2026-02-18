import sequelize from "./sequelize.js";

const connectDatabase = async () => {
  try {
    await sequelize.authenticate();
    console.log("Successfully connect database");
  } catch (error) {
    console.log("Faled connect database", error.message);
    throw error;
  }
};

export default connectDatabase;
