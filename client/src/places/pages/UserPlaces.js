import React from 'react';

import PlaceList from '../components/PlaceList';

const DUMMY_PLACES = [
    {
        id: 'p1',
        title: 'Monument Makam Echahid',
        description: 'One of the most historic monument of Algeria which marks the French Kick out which was the most Epic kick out in modern history',
        imageUrl: 'https://i.pinimg.com/originals/fa/45/75/fa45752d307e897908135ad4e8dd7704.jpg',
        address: 'Chemin Omar Kechkar, Algiers, Algérie',
        location: {
            lat: 36.7456417,
            long: 3.0675888
        },
        creator: 'u1'
    },
    {
        id: 'p2',
        title: 'Monument Makam Echahid',
        description: 'One of the most historic monument of Algeria which marks the French Kick out which was the most Epic kick out in modern history',
        imageUrl: 'https://i.pinimg.com/originals/fa/45/75/fa45752d307e897908135ad4e8dd7704.jpg',
        address: 'Chemin Omar Kechkar, Algiers, Algérie',
        location: {
            lat: 36.7456417,
            long: 3.0675888
        },
        creator: 'u2'
    }
]

const UserPlaces = props => {
    return <PlaceList items={DUMMY_PLACES} />
};

export default UserPlaces;