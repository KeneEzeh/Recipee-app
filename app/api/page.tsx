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

	return <div className="h-[600px]" ref={mapRef} />;
}