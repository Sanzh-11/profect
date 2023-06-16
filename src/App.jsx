import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Button from '@mui/material/Button';
import { Registration } from './Registration.jsx'


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Registration test={() => setCount(count + 1)} value={count} />
    </>
  )
}

export default App
