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
    Venue.hasMany(models.Concert, { foreingKey: "venueId" })
    Venue.hasMany(models.WatchList, { foreingKey: "venueId" })
    Venue.hasMany(models.VenueCommemnt, { foreingKey: "venueId" })
  };
  return Venue;
};