import { Router, Request, Response } from "express";
import { UniqueItemData } from "../data/uniques";

export const itemApi = Router();

itemApi.get("/uniques", (req: Request, res: Response) => {
  return res.json(UniqueItemData);
});
