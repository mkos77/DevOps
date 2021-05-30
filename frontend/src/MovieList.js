import React, {useState, useEffect} from "react";
import axios from 'axios';
import DeleteMovie from './DeleteMovie';

const MovieList = (props) => {

    const [movie, setMovie] = useState([]);

    useEffect(() => {
        axios.get('/movie')
            .then(response => setMovie(response.data))
            .catch(error => console.log(error));
    }, []);
    
    const Movie = (props) => {
        return (
            <>
                <tr>
                    <td>{props.movie.id}</td>
                    <td>{props.movie.name}</td>
                    <td>
                        <DeleteMovie id={props.movie.id}/>
                    </td>
                </tr>
            </>
        );
    }

    return (
        <>
            <h4>Lista Filmów</h4>
            <table>
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Nazwa</th>
                    </tr>
                </thead>
                <tbody>
                    {movie.map(movie => (<Movie movie={movie} key={movie.id}></Movie>))}
                </tbody>
            </table>
        </>
    );
}

export default MovieList;