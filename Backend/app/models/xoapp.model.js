module.exports = (sequelize, Sequelize) => {
    const xo = sequelize.define("XOAPP", {
        history: {
            type: Sequelize.STRING
        },
        stepnumber: {
            type: Sequelize.STRING
        },
        xisnext: {
            type: Sequelize.BOOLEAN
        }
    });

    return xo;
};
