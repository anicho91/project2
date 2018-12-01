module.exports = function(connection, Sequelize) {
    const UserEmail = connection.define('UserEmail', {
        userName: Sequelize.TEXT,
        email: Sequelize.STRING,
    });
    return UserEmail;
}

