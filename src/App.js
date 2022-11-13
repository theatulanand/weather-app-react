import './App.css';
import React from 'react'
import { DetailedView } from './Components/DetailedView';
import { Search } from './Components/Search';
import { DaysReport } from './Components/DaysReport';


function App() {

  return (

    <>
      <Search />
      <DaysReport />
      <DetailedView />
    </>
  );
}

export default App;
