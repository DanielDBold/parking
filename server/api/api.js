const axios = require("axios");
const {
  BASE_URL,
  COMPANY_ENDPOINT,
  PARKS_ENDPOINT,
  PASSWORD,
  TOKEN_ENDPOINT,
  USERNAME,
} = require("../config/config");

const fetchToken = async () => {
  const data = {
    grant_type: "password",
    username: USERNAME,
    password: PASSWORD,
  };

  try {
    const response = await axios.post(TOKEN_ENDPOINT, data, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Origin: BASE_URL,
        Referer: `${BASE_URL}/login`,
      },
    });

    return response.data.access_token;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const fetchParksInfo = async (token) => {
  const headers = {
    Authorization: `Bearer ${token}`,
  };

  const response = await axios.get(PARKS_ENDPOINT, { headers });
  return response.data;
};

const fetchCompanyInfo = async (token) => {
  const headers = {
    Authorization: `Bearer ${token}`,
  };

  const response = await axios.get(COMPANY_ENDPOINT, { headers });
  return response.data;
};

module.exports = {
  fetchToken,
  fetchParksInfo,
  fetchCompanyInfo,
};
