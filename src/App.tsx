import React, { ChangeEvent, useRef, useState, useEffect } from 'react';
import './App.css';
import styled from 'styled-components';
import Slider from '@material-ui/core/Slider';
import Button from '@material-ui/core/Button'
import axios from 'axios'

const serverUrl = "http://192.168.55.102:5000/api/strip/color";

type Rgb = {
  r: number,
  g: number,
  b: number
}

function App() {

  const [currentColor, setCurrentColor] = useState<Rgb>({
      r: 0,
      g: 0,
      b: 0
  })

  const setRed = (red: number) => {
    const newColor = {...currentColor, r: red}
    setCurrentColor(newColor)
    displayLedColor(newColor)
  }

  const setGreen = (green: number) => {
    const newColor = {...currentColor, g: green}
    setCurrentColor(newColor)
    displayLedColor(newColor)
  }

  const setBlue = (blue: number) => {
    const newColor = {...currentColor, b: blue}
    setCurrentColor(newColor)
    displayLedColor(newColor)
  }

  const displayLedColor = (color: Rgb) => {
      axios.post(serverUrl, color)
  }

  return (
    <div className="App">
      <SliderBox>
        <Slider min={0} max={1} step={0.05} value={currentColor.r} onChange={(_, value: number|number[]) => setRed(value as number)}/>
        <Slider min={0} max={1} step={0.05} value={currentColor.g} onChange={(_, value: number|number[]) => setGreen(value as number)}/>
        <Slider min={0} max={1} step={0.05} value={currentColor.b} onChange={(_, value: number|number[]) => setBlue(value as number)}/>
      </SliderBox>
      <div style={{display: "flex", justifyContent: "center"}}>
        <Button color="primary" variant="contained" onClick={()=>displayLedColor({r: 0, g: 0, b:0})}>Wyłącz</Button>
      </div>
    </div>
  );
}


const SliderBox = styled.div`
  margin-top: 20px;
  margin-left: 30px;
  margin-right: 30px;
  height: 100px;
`

export default App;
