'use client';
import { useEffect, useState } from 'react';
import { GoogleMap, InfoWindowF, MarkerF, useJsApiLoader } from '@react-google-maps/api'
import axios from 'axios';

interface Location {
    latitude: number;
    longitude: number;
}

interface Restaurant {
    place_id: string;
    name: string;
    vicinity: string;
    // Add other properties as needed
  }

const NearbyRestaurantsPage = () => {
  const [location, setLocation] = useState<Location>();
  const [nearbyRestaurants, setNearbyRestaurants] = useState([]);

  useEffect(() => {
    // Get user's location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setLocation({ latitude, longitude });
        },
        (error) => {
          console.error('Error getting location:', error);
        }
      );
    }
  }, []);

  useEffect(() => {
    const fetchNearbyRestaurants = async (location: Location) => {
      try {
        const response = await axios.get(
            `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${location.latitude},${location.longitude}&radius=500&type=restaurant&key=AIzaSyCIkwbPl27UP-aWNFqnmzSiZujGPsJUhnM`
          );
            console.log(response.data.results);
        setNearbyRestaurants(response.data.results);
      } catch (error) {
        console.error('Error fetching nearby restaurants:', error);
      }
    };

    if (location) {
      fetchNearbyRestaurants(location);
    }
  }, [location]);

  return (
    <div className='px-5'>
      {/* Display map and nearby restaurants */}
      <h1 className='text-xl'>Latitude: <span className='text-gray-600'>{location?.latitude}</span></h1>
        <h1 className='text-xl'>Longitude: <span className='text-gray-600'>{location?.longitude}</span></h1>
          <div className='flex justify-center items-center'>
            <h1 className='text-3xl'>
                Checkout these restuarants 
            </h1>
          </div>
          <ul>
            {/* Display the list of nearby restaurants */}
            <li>Restaurant 1</li>
            <li>Restaurant 2</li>
            {/* ... */}
          </ul>
    </div>
  );
};

export default NearbyRestaurantsPage;
