import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { grabEvent, getAll } from '../../utils/postApi';
import { Button, Form, Grid, Segment } from 'semantic-ui-react'
import tokenService from '../../utils/tokenService';
import Loading from "../../components/Loader/Loader";
import Header from '../../components/Header/Header'

export default function EditEvent(props) {
    const { _id } = useParams();
    let [event, setEvent] = useState({});
    let [state, setState] = useState({});
    const [fetchResponse, setFetchResponse] = useState();
    const [loading, setLoading] = useState(false);

    const formData = new FormData();
    formData.append('eventName', state.eventName)
    formData.append('address', state.address)
    formData.append('description', state.description)
    formData.append('time', state.time)
    formData.append('date', state.date)
    formData.append('admission', state.admission)
    formData.append('requirements', state.requirements)

    useEffect(() => {
        grabEvent(_id)
            .then((res) => {
                const { post } = res;
                setState({
                    eventName: post.eventName,
                    description: post.description,
                    requirements: post.requirements,
                    admission: post.admission,
                    address: post.address,
                    date: post.date,
                    time: post.time,
                    photo: post.photo
                })
                setEvent(post)
            })
            .catch((err) => console.log('error grabbing event', err))
    }, []);

    function handleChange(e) {
        setState({
            ...state,
            [e.target.name]: e.target.value
        })
    }

    function handleFileInput() {
        console.log('file input')
    }

    async function editEvent() {
        const formData = new FormData()
        formData.append('eventName', state.eventName)
        formData.append('address', state.address)
        formData.append('description', state.description)
        formData.append('time', state.time)
        formData.append('date', state.date)
        formData.append('admission', state.admission)
        formData.append('requirements', state.requirements)

        return fetch(`/api/posts/edit/${_id}`, {
                method: 'POST',
                body: formData,
                headers: {
                  'Authorization': 'Bearer ' + tokenService.getToken()
                }
            })
            .catch(error => console.log(error))
        }

    function handleSubmit(e) {
        e.preventDefault()
        editEvent()
    }
   
    async function deleteEvent() {
        try {
            setLoading(true)
            const request = await fetch(`/api/posts/delete/${_id}`, {
                method: 'delete',
                headers: {
                  'Authorization': 'Bearer ' + tokenService.getToken()
                },
                body: formData
            });
            const response = await request.text();
            if (response){
                setLoading(false);
                setFetchResponse(response)
            }
        } catch (error) {
            setLoading(false);
            setFetchResponse('An error occurred while deleting the event');
        }
    }

    const { 
        eventName, 
        address, 
        requirements, 
        description, 
        time, 
        date, 
        photo, 
        admission 
    } = state;

    return (
        <div>
            <Header user={props.user}/>
                <Grid textAlign='center' style={{ height: '25vh' }} verticalAlign='middle'>
            <Grid.Column style={{ maxWidth: 450 }}>
            {fetchResponse ? (
                <div>{fetchResponse}</div>
                ) : (
                    <div>
                    <Segment>
                  <Form  autoComplete="off" onSubmit={handleSubmit}>
                    <Form.Input
                        className="form-control"
                        name="eventName"
                        value={eventName}
                        placeholder={eventName}
                        onChange={handleChange}
                        required
                    />  
                      <Form.Input
                        className="form-control"
                        name="address"
                        value={address}
                        placeholder={address}
                        onChange={handleChange}
                        required
                    />
                    <Form.Input
                        className="form-control"
                        name="description"
                        value={description}
                        placeholder={description}
                        onChange={handleChange}
                        required
                    />  
                    <Form.Input
                        className="form-control"
                        name="requirements"
                        value={requirements}
                        placeholder={requirements}
                        onChange={handleChange}
                        required
                    />  
                    <Form.Input
                        className="form-control"
                        value={date}
                        name="date"
                        // type="date"
                        placeholder={date}
                        onChange={handleChange}
                        required
                    />  
                    <Form.Input
                        className="form-control"
                        name="time"
                        value={time}
                        // type="time"
                        placeholder={time}
                        onChange={handleChange}
                        required
                    />  
                  <Form.Input
                      className="form-control"
                      name="admission"
                      value={admission}
                      placeholder={admission}
                      onChange={handleChange}
                    /> 
                    <Form.Input
                      className="form-control"
                      type="file"
                      name="photo"
                      placeholder="upload image"
                      onChange={handleFileInput}
                    />   
                    <Button
                      type="submit"
                      className="btn"
                    >
                      SUBMIT EVENT CHANGES
                    </Button>
                  </Form>
                </Segment>
                <button onClick={deleteEvent}>delete</button>
                </div>
            )}
            {loading && (
                <Loading/>
            )}
        </Grid.Column>
        </Grid>
    </div>
    )
}
