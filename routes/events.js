/*
 *  Events routes
 * /api/events
 */

const express = require("express");
const { validateJWT } = require("../middlewares/validate-jwt");
const {
  getEvents,
  createEvent,
  updateEvent,
  deleteEvent,
} = require("../controllers/events");
const { fieldValidator } = require("../middlewares/field-validators");
const { check } = require("express-validator");
const { isDate } = require("../helpers/isDate");
const router = express.Router();
router.use(validateJWT);

router.get("/", getEvents);

router.post(
  "/",
  [
    check("title", "El titulo es obligatorio").not().isEmpty(),
    check("start", "La fecha de inicio es obligatoria").custom(isDate),
    check("end", "La fecha final es obligatoria").custom(isDate),
    fieldValidator,
  ],
  createEvent
);

router.put("/:id", updateEvent);

router.delete("/:id", deleteEvent);

module.exports = router;
