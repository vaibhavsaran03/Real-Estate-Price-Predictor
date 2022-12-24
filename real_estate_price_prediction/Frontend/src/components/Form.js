import React, { useState } from 'react';



const Form = ({title}) => {
  const [formData , setformData] = useState({
    TDate : new Date(),
    Hage : 0,
    MRT : 0,
    CStore : 0,
    Latitude : 0,
    Longitude : 0
  });

  const [res , setres] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(formData);

    const url = 'http://localhost:5000/predict';
    fetch(url,
      {
        headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify(formData)
      })  
      .then(response => response.json())
      .then(response => {
          setres(response.res);
      })
      .catch(err => {console.log("Error Reading data: " + err)});


      console.log(res);
  
  };

  const handleChange = (event) => {
    const value = event.target.value;
    const name = event.target.id;
    let inputData = {...formData};
    inputData[name]=value;
    setformData(inputData);
};

  return (
    <div>
        <h2 className='title'>
          {title}
        </h2>
        <form className='form' onSubmit={handleSubmit}>
            <label htmlFor='TDate'>Transaction Date: </label>
            <input type='date' id='TDate'  onChange={handleChange} />

            <label htmlFor='Hage'>House age: </label>
            <input type='number' id='Hage' step='.01' placeholder='0'  onChange={handleChange} />

            <label htmlFor='MRT'>Distance to the nearest Metro Station(Metres): </label>
            <input type='number' id='MRT' step='0.00001' placeholder='0'  onChange={handleChange} />

            <label htmlFor='CStore'>Convinience Store: </label>
            <input type='number' id='CStore' placeholder='0'  onChange={handleChange} />

            <label htmlFor='Latitude'>Latitude: </label>
            <input type='number' id='Latitude' step='0.00001' placeholder='0'  onChange={handleChange} />

            <label htmlFor='Longitude'>Longitude: </label>
            <input type='number' id='Longitude' step='0.00001' placeholder='0' onChange={handleChange} />

            <input type='submit'  value='Predict' className='submit' />
        </form>
        <form className='answer'>
          <label htmlFor='Prediction'>Predicted Price: </label>
          <input type='text' id='Prediction' value={res} placeholder='Predicted Price will appear here'/>
        </form>
    </div>
  ) 
}

export default Form


