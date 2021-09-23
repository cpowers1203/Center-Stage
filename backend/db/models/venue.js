'use strict';
module.exports = (sequelize, DataTypes) => {
  const Venue = sequelize.define('Venue', {
    pictureUrl: DataTypes.TEXT,
    name: DataTypes.STRING,
    address: DataTypes.TEXT,
    city: DataTypes.STRING,
    state: DataTypes.STRING,
    country: DataTypes.STRING,
    lat: DataTypes.INTEGER,
    lon: DataTypes.INTEGER
  }, {});
  Venue.associate = function(models) {
    // associations can be defined here
    Venue.hasMany(models.Concert, { foreignKey: "venueId" })
    Venue.hasMany(models.WatchList, { foreignKey: "venueId" })
    Venue.hasMany(models.VenueComment, { foreignKey: "venueId" })
  };
  return Venue;
};