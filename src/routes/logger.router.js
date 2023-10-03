import { Router } from "express";

const router = Router();

router.get("/", (req, res) => {
  req.logger.fatal("level fatal");
  req.logger.warning("level warning");
  req.logger.info("level info");
  req.logger.http("level http");
  req.logger.debug("level debug");

  res.send({ message: "logger route" });
});

export default router;
