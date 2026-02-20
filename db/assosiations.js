import User from "./models/User";
import Contact from "./models/Contact";
User.hasMany(Contact, { foreignKey: "user_id" });
Contact.belongsTo(User, { foreignKey: "user_id" });
