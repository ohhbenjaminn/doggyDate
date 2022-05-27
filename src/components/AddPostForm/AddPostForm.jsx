import React, { useState } from 'react';

import { Button, Form, Grid, Segment } from 'semantic-ui-react'

export default function AddPuppyForm(props){
  const [selectedFile, setSelectedFile] = useState('')
  const [state, setState] = useState({})

  function handleFileInput(e){
    setSelectedFile(e.target.files[0])
  }


  function handleChange(e){
    setState({
      ...state,
      [e.target.name]: e.target.value
    })
  }

  function handleSubmit(e){
    e.preventDefault()
             
    const formData = new FormData()
    formData.append('photo', selectedFile)
    formData.append('eventName', state.eventName)
    formData.append('address', state.address)
    formData.append('description', state.description)
    formData.append('time', state.time)
    formData.append('date', state.date)
    formData.append('admission', state.admission)
    formData.append('requirements', state.requirements)
    // formData.append('caption', state.caption)
    props.handleAddPost(formData); 
    
  }
//   console.log('state', state)

  return (
    
    <Grid textAlign='center' style={{ height: '25vh' }} verticalAlign='middle'>
      <Grid.Column style={{ maxWidth: 450 }}>
        <Segment>
        
            <Form  autoComplete="off" onSubmit={handleSubmit}>
            
              <Form.Input
                  className="form-control"
                  name="eventName"
                  value={state.eventName}
                  placeholder="Event Name"
                  onChange={handleChange}
                  required
              />  
                <Form.Input
                  className="form-control"
                  name="address"
                  value={state.address}
                  placeholder="Address"
                  onChange={handleChange}
                  required
              />
              <Form.Input
                  className="form-control"
                  name="description"
                  value={state.description}
                  placeholder="Description"
                  onChange={handleChange}
                  required
              />  
              <Form.Input
                  className="form-control"
                  name="requirements"
                  value={state.requirements}
                  placeholder="Requirements"
                  onChange={handleChange}
                  required
              />  
              <Form.Input
                  className="form-control"
                  name="date"
                  value={state.date}
                  type="date"
                  placeholder="Date"
                  onChange={handleChange}
                  required
              />  
                  <Form.Input
                  className="form-control"
                  name="time"
                  value={state.time}
                  type="time"
                  placeholder="Time"
                  onChange={handleChange}
                  required
              />  
            <Form.Input
                className="form-control"
                name="admission"
                value={state.admission}
                placeholder="Admission"
                onChange={handleFileInput}
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
                CREATE EVENT
              </Button>
            </Form>
          </Segment>
      </Grid.Column>
    </Grid>
   
  ); 
}