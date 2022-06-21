import React from 'react';

export default function Card(props) {

    return (
        <div className='card'>
            <img className='card-image' src={props.imageUrl}/>
            <div className='card--info'>
                <div className='card--location'>
                    <img src='images/pin.png'/>
                    <span>{props.location}</span>
                    <a href={props.googleMapsUrl}>View on Google Maps</a>
                </div>
                <h1 className='card--title'>{props.title}</h1>
                <p className='card--date'>{props.startDate} - {props.endDate}</p>
                <div className='card--description'>{props.description}</div>
            </div>
        </div>
    )
}