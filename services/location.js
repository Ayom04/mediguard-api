const axios = require("axios");

/**
 * Get location information for a given IP address
 * @param {string} clientIp - The IP address to lookup
 * @returns {Promise<Object>} Location data including country, city, region, etc.
 * @throws {Error} If the IP lookup fails
 */
const getUserLocation = async (clientIp) => {
  try {
    // Input validation
    if (!clientIp || typeof clientIp !== "string") {
      throw new Error("Invalid IP address provided");
    }

    // Make request to ipapi.co service
    const response = await axios.get(`https://ipapi.co/${clientIp}/json/`, {
      timeout: 5000, // 5 second timeout
      headers: {
        Accept: "application/json",
        "User-Agent": "IP Location Lookup Service",
      },
    });

    // Validate response
    if (response.status !== 200 || !response.data) {
      throw new Error("Failed to fetch location data");
    }

    // Return the location data
    return {
      ip: response.data.ip,
      city: response.data.city,
      region: response.data.region,
      country: response.data.country_name,
      latitude: response.data.latitude,
      longitude: response.data.longitude,
      timezone: response.data.timezone,
      isp: response.data.org,
    };
  } catch (error) {
    // Handle specific error types
    if (error.response?.status === 429) {
      throw new Error("Rate limit exceeded for IP lookup service");
    } else if (error.code === "ECONNABORTED") {
      throw new Error("IP lookup service timeout");
    }

    // Re-throw with a more informative message
    throw new Error(`Failed to get location: ${error.message}`);
  }
};

module.exports = getUserLocation;

// Example usage:
// const location = await getUserLocation('8.8.8.8');
// console.log(location);
