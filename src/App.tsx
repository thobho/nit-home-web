import React, { ChangeEvent, useRef, useState, useEffect } from 'react';
import './App.css';
import styled from 'styled-components';
import Slider from '@material-ui/core/Slider';

console.log("RERENDER")

function App() {

  const LED_COUNT = 150;
  const [red, setRed] = useState<number>(0)
  const [green, setGreen] = useState(0)
  const [blue, setBlue] = useState(0)
  const [wsClient, setWsClient] = useState<WebSocket>()

  useEffect(() => {
    console.log("CRATE WEB SCOKET")
    setWsClient(new WebSocket("ws://192.168.1.1:8765"))
  }, [])

  const setLed = (id: number, r, g, b) => {
    if (wsClient!.readyState === wsClient!.OPEN) {
      console.log("SENDING...")
      wsClient!.send(`${id} ${r} ${g} ${b}`)
    }
  }

  const onRedChange = (event: ChangeEvent<{}>, value: number | number[]) => {
    console.log(wsClient)
    setRed(value as number)
    
    for(var i = 0 ;i<LED_COUNT; i++) {
      setLed(i, red, green, blue);
   }
  }


  const onGreenChange = (event: ChangeEvent<{}>, value: number | number[]) => {
    setGreen(value as number)
    for(var i = 0 ;i<LED_COUNT; i++) {
      setLed(i, red, green, blue);
   }
  }

  const onBlueChange = (event: ChangeEvent<{}>, value: number | number[]) => {
    setBlue(value as number)
    for(var i = 0 ;i<LED_COUNT; i++) {
      setLed(i, red, green, blue);
   }
  }

  return (
    <div className="App">
      <SliderBox>
        Green: <Slider min={0} max={255} value={red} onChange={onRedChange}></Slider>
      </SliderBox>
      <SliderBox>
        Red: <Slider min={0} max={255} value={green} onChange={onGreenChange}></Slider>
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
