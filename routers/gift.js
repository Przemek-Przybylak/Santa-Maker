const {Router} = require("express");
const {GiftRecord} = require("../records/gift.record");

const giftRouter = Router();

giftRouter
    .get('/', async (req, res) => {
        const giftList = await GiftRecord.listAll();
        res.render('gift/list', {
            giftList // przekazujemy giftsy do listy do wyświetlenia
        });
    }) // pobieramy i pokazujemy wszystkie prezenty

    .post('/', async (req, res) => {
        const data = {
            ...req.body,
            count: Number(req.body.count),
        };//zmieniamy typ na liczbę

        const newGift = new GiftRecord(data); // zmiana na obiekt typu record
        await newGift.insert(); // dodajemyy
        const giftsList = GiftRecord.listAll();  // pobiermay listę aktualną do rendera

        res.redirect('/gift'); // odsyłamy do prezentów

        res.render('gift/list', {
            giftsList
        });
    });

module.exports = {
    giftRouter,
}
