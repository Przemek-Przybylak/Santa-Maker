const { Router } = require("express");
const { ChildRecord } = require("../records/child.record");
const { GiftRecord } = require("../records/gift.record");
const { ValidationError } = require("../utils/error");

const childRouter = Router();

childRouter
  .get("/", async (req, res) => {
    const childrenList = await ChildRecord.listAll();
    const giftsList = await GiftRecord.listAll();

    res.render("children/list", {
      childrenList,
      giftsList,
    });
  })
  .post("/", async (req, res) => {
    const newChild = new ChildRecord(req.body); // zmiana na obiekt typu record
    await newChild.insert(); // dodajemyy
    const childrenList = ChildRecord.listAll(); // pobiermay listę aktualną do rendera

    res.redirect("/child"); // odsyłamy do dzieci
  })
  .patch("/gift/:childId", async (req, res) => {
    const child = await ChildRecord.getOne(req.params.childId); // obsługa dodawania z selecta
    if (child === null) {
      throw new ValidationError("Nie znaleziono dziecka z podanym ID");
    }

    const gift =
      req.body.giftId === "" ? null : await GiftRecord.getOne(req.body.giftId);
    child.giftId = gift?.id ?? null;

    if (gift) {
      if (gift.count <= (await gift.countGivenGifts())) {
        throw new ValidationError("Ten prezent jest niedostępny :(");
      }
    }
    await child.update();

    res.redirect("/child");
  });

module.exports = {
  childRouter,
};
