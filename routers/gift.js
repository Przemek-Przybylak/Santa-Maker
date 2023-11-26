const {Router} = require("express");
const {ChildRecord} = require("../records/child.record");

const giftsRouter = Router();

giftsRouter.get('/', (req, res) => {
    const giftsList = ChildRecord.listAll();
    res.render('children/list', {
        childrenList
    });
});

module.exports = {
    giftsRouter,
}
