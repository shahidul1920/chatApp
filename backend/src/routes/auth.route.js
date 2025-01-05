import express from "express";

const router = express.Router();

router.post("/signoup", );

router.post("/login", (req, res) => {
    res.send("log in");
});

router.post("/logout", (req, res) => {
    res.send("log out");
});

export default router;