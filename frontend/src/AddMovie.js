import React, {useState} from 'react';
import axios from 'axios';

const AddMovie = (props) => {

    const [name, setName] = useState("");

    const submit = (event) => {
        axios.post('http://localhost:5000/movie', {
            name: name,
        })
        .then((response) => {
            console.log(response)
        })
        .catch((error) => {
            console.log(error)
        });
    };

    return (
        <div>
            <h2>Dodaj film</h2>
            <form>
                <input type='text' placeholder='Nazwa' value={name} onChange={event => setName(event.target.value)} /><br/>
                <input type='submit' value='Dodaj film' onClick={submit} />
            </form>
        </div>
    );
};

export default AddMovie;