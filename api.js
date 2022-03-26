const axios = require("axios");


module.exports = {
  getUserDetails: async (email) => {
    try {
      const resp = await axios.get(`http://ticketappekaa.azurewebsites.net/User/getUser/${email}`);
      if (resp && resp.data) {
        return {
          status: "Success",
          data: resp.data,
        };
      }
    } catch (err) {
      if (err.response) {
        return {
          status: "Failed",
          error: err.response.data,
        };
      }
    }
  },
};
