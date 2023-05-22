import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";

import Loading from "../Loading";
import config from "../../config";

const Nfts = () => {
    const [isLoaded, setIsLoaded] = useState(false);
    const [nfts, setNfts] = useState([]);
    const [errors, setErrors] = useState([]);

    useEffect(() => {
       if (!isLoaded) {
           const url = `${config.API_URL}/nfts`;
           fetch(url)
               .then(res => res.json())
               .then(data => setNfts(data))
               .then(() => setIsLoaded(true));
       }
    });

    function deleteNft(token) {
        const url = `${config.API_URL}/nfts/${token}`;
        fetch(url, {
            method: 'DELETE'
        }).then(res => {
            if (res.status === 200) {
                setNfts(nfts.filter(nft => nft.token !== token));
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

            <div className='row align-items-bottom'>
                <div className='col-md-8'>
                    <h1>NFTS</h1>
                </div>
                <div className='col-md-4 text-right'>
                    <Link to='/nfts/new' className='btn btn-primary'>
                        <strong><i className="bi bi-plus-lg"/>&nbsp;Add new</strong>
                    </Link>
                </div>
            </div>
            <table className='table table-striped'>
                <thead>
                <tr>
                    <th>#</th>
                    <th>Token</th>
                    <th>Title</th>
                    <th>Creator</th>
                    <th className='text-center'>Operations</th>
                </tr>
                </thead>
                <tbody>

                {nfts.map((nft, index) =>

                    <tr key={nft.token}>
                        <td>{index + 1}</td>
                        <td>{nft.token}</td>
                        <td>{nft.title}</td>
                        <td>{nft.creator.name}</td>
                        <td className='text-center'>
                            <Link to={`/nfts/${nft.token}`} state={{nft: nft}}
                                  className='btn btn-outline-primary btn-sm'>
                                <i className="bi bi-pencil-fill"/>&thinsp;
                                Edit
                            </Link>
                            &nbsp;

                            <button className='btn btn-outline-danger btn-sm'
                                    onClick={() => deleteNft(nft.token)}>
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

export default Nfts;