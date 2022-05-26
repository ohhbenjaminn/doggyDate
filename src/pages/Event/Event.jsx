import React, { useEffect, useState } from 'react';
import Header from '../../components/Header/Header';
import { useParams } from 'react-router-dom';
import tokenService from '../../utils/tokenService';
import './event.css'


export default function EventPage() {
    let { _id } = useParams();
    let [event, setEvent] = useState({});

    async function grabEvent() {
        try {
            const request = await fetch(`/api/posts/event/${_id}`, {
                 method: 'POST',
                 headers: {
                   'Authorization': 'Bearer ' + tokenService.getToken()
                 },
                 body: { _id }
             });
             const response = await request.json();
             if (response) {
                 setEvent(response.post)
             }

        } catch (error) {
            console.log('error getting event', error)
        }
    }

    useEffect(() => {
        grabEvent()
    }, [])
    console.log(event)
    return (
        <div>   
            <Header/>
            { event && (
                <div className="event-container">
                    <div>{event.eventName}</div>
                    <div>{event.date}</div>
                    <div>{event.time}</div>
                    <div>{event.address}</div>
                    <div>{event.requirements}</div>
                    <div>{event.description}</div>
                    <div>{event.admission}</div>
                </div>
            )}
        </div>
    )
};

