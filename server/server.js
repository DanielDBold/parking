const express = require("express");
const cors = require("cors");
const { fetchToken, fetchParksInfo, fetchCompanyInfo } = require("./api/api");
const { getFreePlaces } = require("./helpers/helpers");

const app = express();
const PORT = 3000;
app.use(cors());

let token = null;
let parksInfo = null;
let companyInfo = null;

const getToken = async () => {
  try {
    token = await fetchToken();
  } catch (error) {
    console.error(error);
    throw new Error("Failed to fetch token");
  }
};

const fetchParkData = async () => {
  try {
    parksInfo = await fetchParksInfo(token);
    companyInfo = await fetchCompanyInfo(token);
  } catch (error) {
    console.error(error);
    throw new Error("Failed to fetch park data");
  }
};

const getFreePlacesData = async () => {
  if (!parksInfo || !companyInfo) {
    await fetchParkData();
  }
  return getFreePlaces(parksInfo, companyInfo);
};

app.get("/api/parks", async (req, res) => {
  try {
    let freePlaces;
    if (!token) {
      await getToken();
      await fetchParkData();
      freePlaces = await getFreePlacesData();
    } else {
      freePlaces = await getFreePlacesData();
    }
    res.json({ freePlaces });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
