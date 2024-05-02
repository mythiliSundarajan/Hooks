import logo from './logo.svg';
import './App.css';
import React ,{Suspense}from 'react';
const FirstFile =React.lazy(()=>import('./FirstFile'));
function App() {
  return (
    <div className="App">
      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header> */}
      <Suspense fallback={<div>Loading Data</div>}>
      <FirstFile></FirstFile>
      </Suspense>
    </div>
  );
}

export default App;
