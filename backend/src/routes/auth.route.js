import express from "express";

const router = express.Router();

router.get("/signoup", (req, res) => {
    res.send("sign up");
});

router.get("/login", (req, res) => {
    res.send("log in");
});

router.get("/logout", (req, res) => {
    res.send("log out");
});

export default router;