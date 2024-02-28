// pages/api/nearbyRestaurants.ts
import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { location } = req.query;

  try {
    const response = await axios.get(
      `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${location}&radius=500&type=restaurant&key=AIzaSyCIkwbPl27UP-aWNFqnmzSiZujGPsJUhnM`
    );

    res.status(200).json(response.data.results);
  } catch (error) {
    console.error('Error fetching nearby restaurants:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
