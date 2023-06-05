const COMPANY_ID = 25;
const USERNAME = "nso";
const PASSWORD = "NsoN12!@";

const BASE_URL = "https://park.maskit14.ronimor.co.il";
const TOKEN_ENDPOINT = `${BASE_URL}/GuestsServices/token`;
const PARKS_ENDPOINT = `${BASE_URL}/GuestsServices/api/Parks/GetParks?companyId=${COMPANY_ID}`;
const COMPANY_ENDPOINT = `${BASE_URL}/GuestsServices/GetCompany?companyId=${COMPANY_ID}`;

module.exports = {
  COMPANY_ID,
  USERNAME,
  PASSWORD,
  BASE_URL,
  TOKEN_ENDPOINT,
  PARKS_ENDPOINT,
  COMPANY_ENDPOINT,
};
