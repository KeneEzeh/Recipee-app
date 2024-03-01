'use client';

import React, { useEffect, useState } from 'react';
import { Loader } from '@googlemaps/js-api-loader';

interface Location {
    latitude: number;
    longitude: number;
}
export default function GoogleMaps() {
	const [location, setLocation] = useState<Location>();
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
	const mapRef = React.useRef<HTMLDivElement>(null);

	
	useEffect(() => {
		const initializeMap = async () => {
			const loader = new Loader({
				apiKey: process.env.NEXT_PUBLIC_MAPS_API_KEY as string,
				version: 'quartely',
				libraries: ["places"]

			});
			const { Map } = await loader.importLibrary('maps');
			
			console.log(location);
			const locationInMap = {
				lat: location?.latitude as number,
				lng: location?.longitude as number,
			};

			// MARKER
			const { Marker } = (await loader.importLibrary(
				'marker'
			)) as google.maps.MarkerLibrary;

			const options: google.maps.MapOptions = {
				center: locationInMap,
				zoom: 15,
				mapId: 'NEXT_MAPS_TUTS',
			};

			const map = new Map(mapRef.current as HTMLDivElement, options);

			// add the marker in the map
			const marker = new Marker({
				map: map,
				position: locationInMap,
			});

			
		};

		if(location) {
			initializeMap();
		}
	}, [location]);
	{!location && <div>Loading...</div>}
	return (
		<>
		{!location && <div className='flex animate-pulse bg-white-400 h-screen'>
			<h1 className='flex m-auto text-7xl font-bold items-center  '> 
			<svg className="animate-spin h-12 w-12 mr-3 bg-gray-400 rounded-full text-white-900 text-4xl ..." viewBox="0 0 24 24">
				<text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle">.</text></svg> Loading...</h1>
			</div>}
		{location && <div className="h-[600px]" ref={mapRef} />}
		</>
	);
}