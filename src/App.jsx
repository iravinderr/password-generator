import { useState, useCallback, useEffect, useRef } from 'react';
import './App.css';

function App() {
  
  const [length, setLength] = useState(8);
  const [NumberAllowed, setNumberAllowed] = useState(false);
  const [CharacterAllowed, setCharacterAllowed] = useState(false);
  const [password, setPassword] = useState("");
  const passwordRef = useRef(null);


  const passwordGenerator = useCallback(() => {
    let pass = "";

    let str = "QWERTYUIOPASDFGHJKLZXCVBNMqwertyuiopasdfghjklzxcvbnm";

    if (NumberAllowed) str += "1234567890";
    if (CharacterAllowed) str += "`~!@#$%^&*()-_+=[]\{}|;',./:<>?";

    for (let i = 1; i < length; i++) {
      const index = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(index);
    }

    setPassword(pass);

  }, [length, NumberAllowed, CharacterAllowed, setPassword]);

  useEffect(() => {
    passwordGenerator();
  }, [length, NumberAllowed, CharacterAllowed, passwordGenerator]);

  const copyToClipboard = useCallback(() => {
    passwordRef.current?.select();
    window.navigator.clipboard.writeText(password);
  }, [password]);

  return (
    <div className='h-screen w-screen bg-black text-white flex justify-center items-center'>

      <div className='h-1/4 w-6/12 bg-gray-500 rounded-3xl flex flex-col justify-evenly'>

        <div className='text-black flex shadow border-2 border-black overflow-hidden'>
          <input type="text"
          value={password}
          className='h-12 outline-none w-full py-1 px-3'
          placeholder='password'
          ref={passwordRef}
          readOnly />

          <button onClick={copyToClipboard} className='h-12 w-24'>
            Copy
          </button>
        </div>

        <div className='flex w-full justify-evenly'>
          <div>
            <input 
            type="range"
            min={8}
            max={50}
            value={length}
            className='cursor-pointer'
            onChange={(e) => {setLength(e.target.value)}}
            />
            
            <label> Length : {length} </label>
          </div>

          <div>
            <input type="checkbox"
            defaultChecked={NumberAllowed}
            id='numberInput'
            onChange={() => {setNumberAllowed((prev) => !prev)}}
            />

            <label> Numbers </label>
          </div>

          <div>
            <input type="checkbox"
            defaultChecked={CharacterAllowed}
            id='characterInput'
            onChange={() => {setCharacterAllowed((prev) => !prev)}}
            />

            <label> Characters </label>
          </div>
        </div>

      </div>
    </div>
  )
}

export default App
