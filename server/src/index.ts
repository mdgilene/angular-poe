import express from "express";
import axios from "axios";
import cors from "cors";

const CURRENT_LEAGUE = "Delve";

const app = express();

app.use(
  cors({
    origin: "http://localhost:4200"
  })
);

app.listen(4300, () => console.log("Server running on port " + 4300));

app.get("/armour", (req, res) => {
  axios
    .get(
      `http://poe.ninja/api/Data/GetUniqueArmourOverview?league=${CURRENT_LEAGUE}`
    )
    .then(response =>
      res.json({
        lines: filterUnique(response.data.lines)
      })
    );
});

app.get("/weapons", (req, res) => {
  axios
    .get(
      `http://poe.ninja/api/Data/GetUniqueWeaponOverview?league=${CURRENT_LEAGUE}`
    )
    .then(response =>
      res.json({
        lines: filterUnique(response.data.lines)
      })
    );
});

app.get("/flasks", (req, res) => {
  axios
    .get(
      `http://poe.ninja/api/Data/GetUniqueFlaskOverview?league=${CURRENT_LEAGUE}`
    )
    .then(response => {
      res.json({
        lines: filterUnique(response.data.lines).map((item: any) => ({
          ...item,
          itemType: "Flask"
        }))
      });
    });
});

app.get("/accessories", (req, res) => {
  axios
    .get(
      `http://poe.ninja/api/Data/GetUniqueAccessoryOverview?league=${CURRENT_LEAGUE}`
    )
    .then(response =>
      res.json({
        lines: filterUnique(response.data.lines)
      })
    );
});

app.get("/jewels", (req, res) => {
  axios
    .get(
      `http://poe.ninja/api/Data/GetUniqueJewelOverview?league=${CURRENT_LEAGUE}`
    )
    .then(response =>
      res.json({
        lines: filterUnique(response.data.lines)
      })
    );
});

const filterUnique = arr => {
  // return arr.filter((item, index, a) => {
  //   return a.map(mapItem => mapItem.name).indexOf(item.name) === index;
  // });
  return arr;
};
