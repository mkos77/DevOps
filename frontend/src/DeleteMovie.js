import React from 'react';
import axios from 'axios';

const DeleteMovie = (props) => {

    const submit = (event) => {
        axios.delete(`api/movie/${props.id}`)
            .then((response) => {
                console.log(response);
            })
            .catch((error) => {
                console.log(error);
            });

    }

    return (
        <>
            <form>
                <input type='submit' value='Usuń' onClick={submit} />
            </form>
        </>
    );

}

export default DeleteMovie;