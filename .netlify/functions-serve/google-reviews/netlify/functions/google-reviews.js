// netlify/functions/google-reviews.js
var https = require("https");
async function refreshAccessToken() {
  const clientId = process.env.GOOGLE_CLIENT_ID;
  const clientSecret = process.env.GOOGLE_CLIENT_SECRET;
  const refreshToken = process.env.GOOGLE_REFRESH_TOKEN;
  if (!clientId || !clientSecret || !refreshToken) {
    throw new Error("Missing Google OAuth credentials in environment variables");
  }
  const params = new URLSearchParams({
    client_id: clientId,
    client_secret: clientSecret,
    refresh_token: refreshToken,
    grant_type: "refresh_token"
  });
  return new Promise((resolve, reject) => {
    const options = {
      hostname: "oauth2.googleapis.com",
      path: "/token",
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        "Content-Length": Buffer.byteLength(params.toString())
      }
    };
    const req = https.request(options, (res) => {
      let data = "";
      res.on("data", (chunk) => data += chunk);
      res.on("end", () => {
        try {
          const parsed = JSON.parse(data);
          if (parsed.error) {
            reject(new Error(`OAuth error: ${parsed.error_description || parsed.error}`));
          } else {
            resolve(parsed.access_token);
          }
        } catch (e) {
          reject(new Error("Failed to parse OAuth response"));
        }
      });
    });
    req.on("error", reject);
    req.write(params.toString());
    req.end();
  });
}
async function fetchGoogleReviews(accessToken, locationId) {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: "mybusiness.googleapis.com",
      path: `/v4/accounts/-/locations/${locationId}/reviews`,
      method: "GET",
      headers: {
        "Authorization": `Bearer ${accessToken}`,
        "Content-Type": "application/json"
      }
    };
    const req = https.request(options, (res) => {
      let data = "";
      res.on("data", (chunk) => data += chunk);
      res.on("end", () => {
        try {
          const parsed = JSON.parse(data);
          if (parsed.error) {
            reject(new Error(`GMB API error: ${parsed.error.message || JSON.stringify(parsed.error)}`));
          } else {
            resolve(parsed);
          }
        } catch (e) {
          reject(new Error(`Failed to parse GMB response: ${data}`));
        }
      });
    });
    req.on("error", reject);
    req.end();
  });
}
function transformReviews(gmbData) {
  if (!gmbData || !gmbData.reviews) {
    return {
      reviews: [],
      averageRating: 0,
      totalReviewCount: 0
    };
  }
  const ratingMap = {
    "ONE": 1,
    "TWO": 2,
    "THREE": 3,
    "FOUR": 4,
    "FIVE": 5
  };
  const reviews = gmbData.reviews.map((review) => ({
    reviewId: review.reviewId || review.name,
    reviewer: {
      displayName: review.reviewer?.displayName || "Anonyme",
      profilePhotoUrl: review.reviewer?.profilePhotoUrl || null
    },
    starRating: ratingMap[review.starRating] || 5,
    comment: review.comment || "",
    createTime: review.createTime,
    updateTime: review.updateTime,
    reviewReply: review.reviewReply ? {
      comment: review.reviewReply.comment,
      updateTime: review.reviewReply.updateTime
    } : null
  }));
  const totalRating = reviews.reduce((sum, r) => sum + r.starRating, 0);
  const averageRating = reviews.length > 0 ? (totalRating / reviews.length).toFixed(1) : 0;
  return {
    reviews,
    averageRating: parseFloat(averageRating),
    totalReviewCount: gmbData.totalReviewCount || reviews.length
  };
}
exports.handler = async (event) => {
  const headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Allow-Methods": "GET, OPTIONS",
    "Content-Type": "application/json",
    // Cache for 1 hour
    "Cache-Control": "public, max-age=3600, s-maxage=3600"
  };
  if (event.httpMethod === "OPTIONS") {
    return { statusCode: 200, headers, body: "" };
  }
  if (event.httpMethod !== "GET") {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: "Method not allowed" })
    };
  }
  try {
    const locationId = process.env.GMB_LOCATION_ID;
    if (!locationId) {
      throw new Error("GMB_LOCATION_ID not configured");
    }
    const accessToken = await refreshAccessToken();
    const gmbData = await fetchGoogleReviews(accessToken, locationId);
    const reviewData = transformReviews(gmbData);
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify(reviewData)
    };
  } catch (error) {
    console.error("Error fetching Google reviews:", error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({
        error: "Failed to fetch reviews",
        message: error.message
      })
    };
  }
};
//# sourceMappingURL=google-reviews.js.map
