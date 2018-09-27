import { Router, Request, Response } from "express";
import { Item } from "../../../exile-builds-core/models/Item";
import { findUniques, UniqueItemData } from "../data/uniques";

export const itemApi = Router();

itemApi.get("/", (req: Request, res: Response) => {
  const query: Item = req.query;

  if (Object.keys(query).length > 0) {
    return res.send(findUniques(query));
  }

  return res.send(findUniques({}));
});

itemApi.get("/raw", (req: Request, res: Response) => {
  return res.send(UniqueItemData);
});
