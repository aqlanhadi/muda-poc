import React, { useRef, useEffect } from 'react'
import { Wrapper } from '@googlemaps/react-wrapper'
import mapStyle from '../../app/mapStyle.json'

const Status = {
    LOADING: 'LOADING',
    FAILURE: 'FAILURE',
    SUCCESS: 'SUCCESS'
}

const render = (status) => {
    if (status === Status.FAILURE) return <>Error</>;
    return <>Loading..</>;
};

function Dashboard() {
    const [count, setCount] = React.useState({})

    const center = { lat: -34.397, lng: 150.644 };
    const zoom = 4;

    console.log(process.env.REACT_APP_GOOGLE_MAPS_API_KEY)

    return (
        <Wrapper 
            apiKey={'AIzaSyAj1Jz8Yh53Wqe7YEypisJyb4MK-nQWnEc'}
            region="MY"
            libraries={['geometry']}
            render={render}>
            <div className='absolute w-1/4 top-5 left-5 rounded-lg bg-slate-900 z-10 p-8'>
                <div className='flex items-center gap-4'>
                    <div className='bg-white font-bold text-lg w-fit px-4 py-2'>MUDA</div>
                    <div className='text-white text-3xl font-semibold'>Selangor</div>
                </div>
            </div>
            <Map center={center} zoom={zoom} setCount={setCount} />
        </Wrapper>

    )
}

const Map = ({ center, zoom, setCount }) => {


  
    const ref = useRef()
    useEffect(() => {

        let geocoder = new window.google.maps.Geocoder();
        let map = new window.google.maps.Map(ref.current, { 
            zoom: 10,
            streetViewControl: false,
            mapTypeControl: false,
            styles: mapStyle
        });

        geocoder.geocode({ 'address': "Jeram" }, (results, status) => {
            if (status == window.google.maps.GeocoderStatus.OK) {
                map.setCenter(results[0].geometry.location)
            } else {
                alert("Geocode was not successful for the following reason: " + status);
            }
        })

        let markers = []

        window.google.maps.event.addListenerOnce(map, 'idle', () => {

            fetch('http://localhost:5000/v1/membership')
                .then(res => res.json())
                .then(data => {
                    data.forEach(member => {
                        let marker = new window.google.maps.Marker({
                            position: { lat: member.homeAddress.loc.lat, lng: member.homeAddress.loc.lng },
                            map,
                            title: member.name
                        })
                        markers.push(marker)
                        //console.log(marker.getPosition().lat())
                    })                    
                })
                .then(() => {
                    let count = {}
    
                    console.log(window.google.maps.geometry)
            
                    map.data.loadGeoJson('https://raw.githubusercontent.com/TindakMalaysia/Selangor-Maps/master/Selangor_DUN_2015/Selangor_DUN_2015.geojson', {}, (features) => {
                        let mapPolies = 
                        features.forEach(feature => {
                            // count how many markers in the area
                            //console.log(feature.getProperty('DUN'))
                            count[feature.getProperty('DUN')] = 0
            
                            markers.forEach(marker => {
                                console.log(marker.getPosition())
                                if(window.google.maps.geometry.poly.containsLocation(marker.getPosition(), feature.getGeometry().getArray())) {
                                    console.log('found')
                                    count[feature.getProperty('DUN')]++
                                }
                            })
                            //console.log(feature.getGeometry())
                        })
                    })
                    
                    console.log(markers.length)
                    console.log(count)
                })
        })

        
        
        // home

        
    })

    return <div className='body' ref={ref} id="map" />
}


export default Dashboard