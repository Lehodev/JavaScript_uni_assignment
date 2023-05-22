import React, {useEffect, useState} from "react";

import Loading from "../Loading";
import config from "../../config";
import {Link} from "react-router-dom";

const Buyers = () => {
    const [isLoaded, setIsLoaded] = useState(false);
    const [buyers, setBuyers] = useState([]);
    const [errors, setErrors] = useState([]);

    useEffect(() => {
       if (!isLoaded) {
           const url = `${config.API_URL}/buyers`;
           fetch(url)
               .then(res => res.json())
               .then(data => setBuyers(data))
               .then(() => setIsLoaded(true));
       }
    });

    function deleteBuyer(id) {
        const url = `${config.API_URL}/buyers/${id}`;
        fetch(url, {
            method: 'DELETE'
        }).then(res => {
            if (res.status === 200) {
                setBuyers(buyers.filter(buyer => buyer.id !== id));
            } else {
                setErrors([...errors, 'Hiba a törlés során!']);
            }
        }).catch(() => {
        });
    }

    if (!isLoaded) {
        return <Loading/>
    }

    return (
        <div>
            {errors}

            <div className='row align-items-bottom'>
                <div className='col-md-8'>
                    <h1>Buyers</h1>
                </div>
                <div className='col-md-4 text-right'>
                    <Link to='/buyers/new' className='btn btn-primary'>
                        <strong><i className="bi bi-plus-lg"/>&nbsp;Add new</strong>
                    </Link>
                </div>
            </div>
            <table className='table table-striped'>
                <thead>
                <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>Birth date</th>
                    <th className='text-center'>Operations</th>
                </tr>
                </thead>
                <tbody>

                {buyers.map((buyer, index) =>
                    <tr key={buyer.id}>
                        <td>{index + 1}</td>
                        <td>{buyer.name}</td>
                        <td>{buyer.born_date}</td>
                        <td className='text-center'>
                            <Link to={`/buyers/${buyer.id}`} state={{buyer: buyer}}
                                  className='btn btn-outline-primary btn-sm'>
                                <i className="bi bi-pencil-fill"/>&thinsp;
                                Edit
                            </Link>
                            &nbsp;

                            <button className='btn btn-outline-danger btn-sm'
                                    onClick={() => deleteBuyer(buyer.id)}>
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

export default Buyers;