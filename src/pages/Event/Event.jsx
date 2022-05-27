import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../../components/Header/Header';
import { useParams } from 'react-router-dom';
import tokenService from '../../utils/tokenService';
import { grabEvent } from '../../utils/postApi';
import './event.css'


export default function EventPage(props) {
    let { _id } = useParams();
    let [event, setEvent] = useState({});

    useEffect(() => {
        grabEvent(_id)
            .then((res) => {
                console.log(res)
                setEvent(res.post)
            })
            .then((res) => console.log(res, event))
            .catch((err) => console.log('error grabbing event', err))
    }, [])

    function attendEvent() {
        
    }

    return (
        <div>   
            <Header/>
            { event.user === props.user._id ? (
                <div>
                    <Link to={`/event/edit/${_id}`}>
                        <button>edit</button>
                    </Link>
                </div>
            ) : (
                <div>
                    <button>attend</button>
                </div>
            )}
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

