import React from 'react';
import { useParams } from 'react-router-dom';

import PlaceList from '../components/PlaceList';

const DUMMY_PLACES = [
    {
        id: 'p1',
        title: 'Monument Makam Echahid ',
        description: 'One of the most iconic monument of Algeria which marks the French Kick out which was the most Epic kick out in modern history',
        imageUrl: 'https://i.pinimg.com/originals/fa/45/75/fa45752d307e897908135ad4e8dd7704.jpg',
        address: 'Chemin Omar Kechkar, Algiers, Algérie',
        location: {
            lat: 36.7456417,
            lng: 3.0675888
        },
        creator: 'u1'
    },
    {
        id: 'p2',
        title: 'Madame Afrique',
        description: 'One of the hidden GEm of Algiers.',
        imageUrl: 'https://www.podcastjournal.net/photo/art/grande/10446444-17127965.jpg?v=1477495678',
        address: 'Chemin El biar, Algiers, Algérie',
        location: {
            lat: 32.7456417,
            lng: 3.0675888
        },
        creator: 'u2'
    }
]

const UserPlaces = props => {
    const userId = useParams().userId;
    const loadedPlaces = DUMMY_PLACES.filter(place => place.creator === userId);
    return <PlaceList items={loadedPlaces} />
};

export default UserPlaces;