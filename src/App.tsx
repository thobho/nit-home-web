import React, { ChangeEvent, useRef, useState } from 'react';
import './App.css';
import styled from 'styled-components';
import Slider from '@material-ui/core/Slider';

function App() {

  const [red, setRed] = useState<number>(0)
  const [green, setGreen] = useState(0)
  const [blue, setBlue] = useState(0)
  const wsClient: WebSocket = new WebSocket("ws://localhost:9999")

  wsClient.onmessage = (event: Event) => {
    console.log(event);
  };

  wsClient.onerror = (error: Event) => {
    console.error(error)  
  }

  const onRedChange = (event: ChangeEvent<{}>, value: number | number[]) => {
    console.info(event)
    console.info(value)
    setRed(value as number)
    wsClient.send(`${red} ${green} ${blue}`)
  }


  const onGreenChange = (event: ChangeEvent<{}>, value: number | number[]) => {
    console.info(event)
    console.info(value)
    setGreen(value as number)
    wsClient.send(`${red} ${green} ${blue}`)
  }

  const onBlueChange = (event: ChangeEvent<{}>, value: number | number[]) => {
    console.info(event)
    console.info(value)
    setBlue(value as number)
    wsClient.send(`${red} ${green} ${blue}`)
  }

  const sendToLed = () => {

  }


  return (
    <div className="App">
      <SliderBox>
        RED: <Slider min={0} max={255} value={red} onChange={onRedChange}></Slider>
      </SliderBox>
      <SliderBox>
        Green: <Slider min={0} max={255} value={green} onChange={onGreenChange}></Slider>
      </SliderBox>
      <SliderBox>
        Blue: <Slider min={0} max={255} value={blue} onChange={onBlueChange}></Slider>
      </SliderBox>
    </div>
  );
}


const SliderBox = styled.div`
  margin-top: 20px;
  margin-left: 30px;
  margin-right: 30px;
  width: 80%;
  height: 100px;
  background-color: "#eeeeee"
`

export default App;
