import { Router, Request, Response } from "express";
import { UniqueItemData } from "../data/uniques";

export const itemApi = Router();

itemApi.get("/uniques", (req: Request, res: Response) => {
  res.setHeader("Cache-Control", "public, max-age=86400"); // Cache for 1 day
  return res.json(UniqueItemData);
});
