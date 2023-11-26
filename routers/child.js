const {Router} = require("express");

const childRouter = Router();

childRouter.get('/child', (req, res) => {
    res.render('children/list');
});

module.exports = {
    childRouter,
}
