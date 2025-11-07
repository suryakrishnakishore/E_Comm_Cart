import { useState } from 'react';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div className='text-3xl w-full flex justify-center '>
        <h1>Hello World</h1>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
