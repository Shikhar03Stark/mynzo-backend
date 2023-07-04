import User from "./User.js";
import ProfilePicture from "./ProfilePicture.js";
import Address from "./Address.js";
import Country from "./Country.js";
import State from "./State.js";
import City from "./City.js";

// Associations

/**
 * User owns uploaded media. Media can only exists if User exists
 */
User.hasOne(ProfilePicture, {
    foreignKey: `user_id`,
    constraints: true,
});
ProfilePicture.belongsTo(User, {
    foreignKey: 'user_id',
    constraints: true,
});

/**
 * User has an Address. Address exists for a User.
 */
User.hasOne(Address, {
    foreignKey: `user_id`,
    constraints: true,
});
Address.belongsTo(User, {
    foreignKey: 'user_id',
    constraints: true
});
/**
 * Country has many states
 */
Country.hasMany(State, {
    foreignKey: 'country_id',
});
State.belongsTo(Country, {
    foreignKey: 'country_id',
});

/**
 * State has many cities
 */
State.hasMany(City, {
    foreignKey: 'state_id',
});
City.belongsTo(State, {
    foreignKey: 'state_id',
});

/**
 * Country has multiple Addresses
 */
Country.hasMany(Address, {
    foreignKey: 'country_id',
});
Address.belongsTo(Country, {
    foreignKey: 'country_id',
});

/**
 * State has multiple address
 */
State.hasMany(Address, {
    foreignKey: 'state_id',
});
Address.belongsTo(State, {
    foreignKey: 'state_id',
});

/**
 * City has multiple address
 */
City.hasMany(Address, {
    foreignKey: 'city_id',
});
Address.belongsTo(City, {
    foreignKey: 'city_id',
});



export default {
    User,
    ProfilePicture,
    Address,
    Country,
    State,
    City,
}