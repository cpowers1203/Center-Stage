'use strict';
module.exports = (sequelize, DataTypes) => {
  const VenueComment = sequelize.define('VenueComment', {
    comment: DataTypes.STRING,
    venueId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER
  }, {});
  VenueComment.associate = function(models) {
    // associations can be defined here
    VenueComment.belongsTo(models.Venue, { foreignKey: "venueId" })
  };
  return VenueComment;
};