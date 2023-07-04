import User from "./User.js";
import ProfilePicture from "./ProfilePicture.js";
import Address from "./Address.js";
import GeoLocation from './GeoLocation.js';

// Associations

/**
 * User owns uploaded media. Media can only exists if User exists
 */
User.hasOne(ProfilePicture, {
    foreignKey: `user_id`,
});
ProfilePicture.belongsTo(User);

/**
 * User has an Address. Address exists for a User.
 */
User.hasOne(Address, {
    foreignKey: `user_id`
});
Address.belongsTo(User);

/**
 * GeoLocation can contain multiple smaller location. Country has many states, states has many cities.
 */
GeoLocation.hasMany(GeoLocation, {
    foreignKey: `under_location`,
    constraints: false,
})


export default {
    User,
    ProfilePicture,
    Address,
    GeoLocation,
}