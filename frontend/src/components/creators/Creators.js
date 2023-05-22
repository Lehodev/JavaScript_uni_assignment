import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";

import Loading from "../Loading";
import config from "../../config";

const Creators = () => {
    const [isLoaded, setIsLoaded] = useState(false);
    const [creators, setCreators] = useState([]);
    const [errors, setErrors] = useState([]);

    useEffect(() => {
        if (!isLoaded) {
            const url = `${config.API_URL}/creators`;
            fetch(url)
                .then(res => res.json())
                .then(data => setCreators(data))
                .then(() => setIsLoaded(true));
        }
    });

    function deleteCreator(id) {
        const url = `${config.API_URL}/creators/${id}`;
        fetch(url, {
            method: 'DELETE'
        }).then(res => {
            if (res.status === 200) {
                setCreators(creators.filter(creator => creator.id !== id));
            } else {
                setErrors([...errors, `Hiba a törlés során!`]);
            }
        }).catch(() => {
        });
    }

    if (!isLoaded) {
        return <Loading/>;
    }

    return (
        <div>
            {errors}

            <div className='row align-items-bottom'>
                <div className='col-md-8'>
                    <h1>Creators</h1>
                </div>
                <div className='col-md-4 text-right'>
                    <Link to='/creators/new' className='btn btn-primary'>
                        <strong><i className="bi bi-plus-lg"/>&nbsp;Add new</strong>
                    </Link>
                </div>
            </div>
            <table className='table table-striped'>
                <thead>
                <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th className='text-center'>Operations</th>
                </tr>
                </thead>
                <tbody>

                {creators.map((creator, index) =>
                    <tr key={creator.id}>
                        <td>{index + 1}</td>
                        <td>{creator.name}</td>
                        <td className='text-center'>
                            <Link to={`/creators/${creator.id}`} state={{creator: creator}}
                                  className='btn btn-outline-primary btn-sm'>
                                <i className="bi bi-pencil-fill"/>&thinsp;
                                Edit
                            </Link>
                            &nbsp;

                            <button className='btn btn-outline-danger btn-sm'
                                    onClick={() => deleteCreator(creator.id)}>
                                <i className="bi bi-trash-fill"/>&thinsp;
                                Delete
                            </button>
                        </td>
                    </tr>
                )}
                </tbody>
            </table>
        </div>
    );
}

export default Creators;
