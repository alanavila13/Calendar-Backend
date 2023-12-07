/*
 Rutas de Usuarios / auth
 host + /api/auth
 */

const express = require("express");
const { check } = require("express-validator");
const { fieldValidator } = require("../middlewares/field-validators");
const router = express.Router();
const {
  createUser,
  loginUser,
  revalidateToken,
} = require("../controllers/auth");
const { validateJWT } = require('../middlewares/validate-jwt')

router.post(
  "/new",
  [
    check("name", "El nombre es obligatorio").not().isEmpty(),
    check("email", "El email es obligatorio").isEmail(),
    check("password", "El password debe de ser de 6 caracteres").isLength({
      min: 6,
    }),
    fieldValidator
  ],
  createUser
);
router.post(
  "/",
  [
    check("email", "El email es obligatorio").isEmail(),
    check("password", "El password debe de ser de 6 caracteres").isLength({
      min: 6,
    }),
    fieldValidator
  ],
  loginUser
);
router.get("/renew", validateJWT, revalidateToken);

module.exports = router;
