const https = require('https');

// Google OAuth token refresh
async function refreshAccessToken() {
  const clientId = process.env.GOOGLE_CLIENT_ID;
  const clientSecret = process.env.GOOGLE_CLIENT_SECRET;
  const refreshToken = process.env.GOOGLE_REFRESH_TOKEN;

  if (!clientId || !clientSecret || !refreshToken) {
    throw new Error('Missing Google OAuth credentials in environment variables');
  }

  const params = new URLSearchParams({
    client_id: clientId,
    client_secret: clientSecret,
    refresh_token: refreshToken,
    grant_type: 'refresh_token',
  });

  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'oauth2.googleapis.com',
      path: '/token',
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Content-Length': Buffer.byteLength(params.toString()),
      },
    };

    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => (data += chunk));
      res.on('end', () => {
        try {
          const parsed = JSON.parse(data);
          if (parsed.error) {
            reject(new Error(`OAuth error: ${parsed.error_description || parsed.error}`));
          } else {
            resolve(parsed.access_token);
          }
        } catch (e) {
          reject(new Error('Failed to parse OAuth response'));
        }
      });
    });

    req.on('error', reject);
    req.write(params.toString());
    req.end();
  });
}

// Make HTTPS request helper
function makeRequest(options) {
  return new Promise((resolve, reject) => {
    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => (data += chunk));
      res.on('end', () => {
        try {
          const parsed = JSON.parse(data);
          resolve({ data: parsed, statusCode: res.statusCode });
        } catch (e) {
          reject(new Error(`Failed to parse response: ${data}`));
        }
      });
    });
    req.on('error', reject);
    req.end();
  });
}

// Get the account name first
async function getAccountName(accessToken) {
  const response = await makeRequest({
    hostname: 'mybusinessaccountmanagement.googleapis.com',
    path: '/v1/accounts',
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
  });

  if (response.data.error) {
    throw new Error(`Account API error: ${response.data.error.message || JSON.stringify(response.data.error)}`);
  }

  if (!response.data.accounts || response.data.accounts.length === 0) {
    throw new Error('No Google Business accounts found');
  }

  // Return the account name (format: accounts/123456789)
  return response.data.accounts[0].name;
}

// Build the full location path for the reviews API
function buildLocationPath(accountName, locationId) {
  // accountName is like "accounts/123456789"
  // We need to return "accounts/123456789/locations/locationId"
  return `${accountName}/locations/${locationId}`;
}

// Fetch reviews from Google My Business API
async function fetchGoogleReviews(accessToken, locationName) {
  // The reviews endpoint uses the v4 API with the full location name
  // Format: accounts/{accountId}/locations/{locationId}/reviews
  const response = await makeRequest({
    hostname: 'mybusiness.googleapis.com',
    path: `/v4/${locationName}/reviews`,
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
  });

  if (response.data.error) {
    throw new Error(`Reviews API error: ${response.data.error.message || JSON.stringify(response.data.error)}`);
  }

  return response.data;
}

// Transform GMB review data to our frontend format
function transformReviews(gmbData) {
  if (!gmbData || !gmbData.reviews) {
    return {
      reviews: [],
      averageRating: 0,
      totalReviewCount: 0,
    };
  }

  const ratingMap = {
    'ONE': 1,
    'TWO': 2,
    'THREE': 3,
    'FOUR': 4,
    'FIVE': 5,
  };

  const reviews = gmbData.reviews.map((review) => ({
    reviewId: review.reviewId || review.name,
    reviewer: {
      displayName: review.reviewer?.displayName || 'Anonyme',
      profilePhotoUrl: review.reviewer?.profilePhotoUrl || null,
    },
    starRating: ratingMap[review.starRating] || 5,
    comment: review.comment || '',
    createTime: review.createTime,
    updateTime: review.updateTime,
    reviewReply: review.reviewReply ? {
      comment: review.reviewReply.comment,
      updateTime: review.reviewReply.updateTime,
    } : null,
  }));

  // Calculate average rating
  const totalRating = reviews.reduce((sum, r) => sum + r.starRating, 0);
  const averageRating = reviews.length > 0 ? (totalRating / reviews.length).toFixed(1) : 0;

  return {
    reviews,
    averageRating: parseFloat(averageRating),
    totalReviewCount: gmbData.totalReviewCount || reviews.length,
  };
}

exports.handler = async (event) => {
  // CORS headers
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'GET, OPTIONS',
    'Content-Type': 'application/json',
    // Cache for 1 hour
    'Cache-Control': 'public, max-age=3600, s-maxage=3600',
  };

  // Handle preflight requests
  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers, body: '' };
  }

  // Only allow GET requests
  if (event.httpMethod !== 'GET') {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: 'Method not allowed' }),
    };
  }

  try {
    const locationId = process.env.GMB_LOCATION_ID;

    if (!locationId) {
      throw new Error('GMB_LOCATION_ID not configured');
    }

    // Get fresh access token
    const accessToken = await refreshAccessToken();

    // Get account name using Account Management API
    const accountName = await getAccountName(accessToken);

    // Build the full location path
    const locationName = buildLocationPath(accountName, locationId);

    // Fetch reviews
    const gmbData = await fetchGoogleReviews(accessToken, locationName);

    // Transform to frontend format
    const reviewData = transformReviews(gmbData);

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify(reviewData),
    };
  } catch (error) {
    console.error('Error fetching Google reviews:', error);

    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({
        error: 'Failed to fetch reviews',
        message: error.message,
      }),
    };
  }
};
