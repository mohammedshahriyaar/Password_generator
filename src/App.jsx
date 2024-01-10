import { useCallback, useEffect, useState } from 'react'
import './App.css';
import './index.css'
import { useRef } from 'react';


function App() {
  
  //4 use states required to set 
  const [length ,setlength] = useState(8);
  const [password, setpassword] = useState("")
  const [numberallow, setnumberallow] = useState(false)
  const [charallow, setcharallow] = useState(false);

  //ref hook
  const passref = useRef(null);

  //password generator 
  //usecallback hook because we need to call that multiple times when a slight change occurs
  const passwordgenerator = useCallback(()=>
  {
    let pass =""
    let str="abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"

    if(numberallow)
    {
      str += "0123456789"
    }
    if(charallow)
    {
      str += "!@#$%^&*-_+=[]{}~`"
    }

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1)
      pass += str.charAt(char)
      
    }

    setpassword(pass);
  }
  ,[length,charallow,numberallow,setpassword])

  const copytoclipboard = useCallback( ()=>
  {
    passref.current?.select() //select only when not empty
    window.navigator.clipboard.writeText(password)

  }, [password])
  //useeffect
  useEffect(()=>
  {
    passwordgenerator()
  } ,[length,charallow,numberallow,passwordgenerator])
  return (
    <>
      <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 bg-gray-800 text-orange-500">
        <h1 className='text-white text-center mb-6'>Password generator</h1>
        <div className="flex shadow rounded-lg overflow-hidden mb-4">
          <input
            type="text"
            value={password}
            className="outline-none w-full py-1 px-3"
            placeholder="Password"
            readOnly
            ref ={passref}
          />
          <button
            className='outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0'
            onClick={copytoclipboard}
          >copy</button>

        </div>
        <div className="flex items-center gap-x-2">
          <div className="flex items-center gap-x-1">
            <input type="range" min={8} max={100} value={length} className='cursor-pointer'
              onChange={(e) => {
                setlength(e.target.value)
              }} />
            <label> length :{length}</label>
          </div>
          <div className="flex items-center gap-x-1">
            <input type="checkbox"
            defaultChecked={numberallow}
            id = "numberInput" onChange={
              ()=>{
                setnumberallow((prev)=> !prev)
              }
            } />
            <label >Number</label>

          </div>
          <div className="flex items-center gap-x-1">
            <input type="checkbox"
            defaultChecked={charallow}
            id = "charrInput" onChange={
              ()=>{
                setcharallow((prev)=> !prev)
              }
            } />
            <label >Characters</label>
            
          </div>
          
        </div>
        
      </div>
  </>
  )
}

export default App
