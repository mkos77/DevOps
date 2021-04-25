import './App.css';
import React, {useState} from 'react';
import AddMovie from './AddMovie';
import MovieList from './MovieList';

function App() {

  const [setId] = useState(0);
  const [setIdUpdate] = useState([]);

  return (
    <div>
      <AddMovie/>
      <MovieList changeParentHandlerId={setId} changeParentHandlerUpdate={setIdUpdate}/>
    </div>
  );
}

export default App;
