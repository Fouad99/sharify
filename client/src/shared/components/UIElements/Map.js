import React, { useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';


import './Map.css';

mapboxgl.accessToken = "pk.eyJ1IjoiZm91OTkiLCJhIjoiY2tkeXRzc3E3MmVnbzJ4bjl0bXdsbnRuMCJ9.Vf7qJ7ggvYbxdj1wG2gs3A";

const Map = props => {
    const mapContainerRef = useRef(null);

    const { center, zoom } = props;

    useEffect(() => {

        const map = new mapboxgl.Map({
            container: mapContainerRef.current,
            style: 'mapbox://styles/mapbox/streets-v11',
            center: center,
            zoom: zoom
        });

        map.addControl(new mapboxgl.NavigationControl(), 'bottom-right');

        return () => map.remove();
    }, [center, zoom]);

    return (
        <div className={`map ${props.className}`} style={props.style} ref={mapContainerRef}></div>
    );
}

export default Map;