import express from "express";
import moviesRouter from "./moviesRouter.js";

const rootRouter = new express.Router();

rootRouter.get("/", (req, res) => {
    res.redirect("/movies")
});

rootRouter.use("/movies", moviesRouter);

export default rootRouter;
