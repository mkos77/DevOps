import './App.css';
import React, {useState} from 'react';
import AddMovie from './AddMovie';
import MovieList from './MovieList';
import EditMovie from './EditMovie';

function App() {

  const [setId] = useState(0);
  const [idUpdate, setIdUpdate] = useState([]);

  const ShowEditMovie = (props) => {
    return <EditMovie id={props.id} />
  }

  return (
    <div> 
      <div class="header">
        <AddMovie/>
        <ShowEditMovie id={idUpdate}/>
      </div>
      <MovieList changeParentHandlerId={setId} changeParentHandlerUpdate={setIdUpdate}/>
    </div>
  );
}

export default App;
