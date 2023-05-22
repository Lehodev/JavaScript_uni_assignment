import React, {useEffect, useState} from "react";
import {useLocation, useNavigate} from "react-router-dom";
import config from "../../config";
import Loading from "../Loading";

const NftForm = () => {
    const [errors, setErrors] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);
    const [creators, setAuthors] = useState([]);
    const location = useLocation();
    const navigate = useNavigate();

    let token = location.state ? location.state.nft.token : '';
    let title = location.state ? location.state.nft.title : '';
    let creator = location.state ? location.state.nft.creator : '';

    useEffect(() => {
        if (!isLoaded) {
            const url = `${config.API_URL}/creators`;
            fetch(url)
                .then(res => res.json())
                .then(data => setAuthors(data))
                .then(() => setIsLoaded(true));
        }
    });

    function handleTitleChange(e) {
        title = e.target.value;
    }

    function handleTokenChange(e) {
        token = e.target.value;
    }

    function handleCreatorChange(e) {
        creator = creators[e.target.value];
    }

    if (!isLoaded) {
        return <Loading/>;
    }

    function handleSubmit(e) {
        const url = `${config.API_URL}/nfts/${location.state ? token : ''}`;
        const method = location.state ? 'PUT' : 'POST';

        const nft = {
            token: token,
            title: title,
            creator: creator.id
        };
        fetch(url, {
            method: method,
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(nft)
        }).then(res => {
            if (res.status === 200) {
                navigate('/nfts');
            } else if (res.message) {
                setErrors([...errors, 'Hiba!']);
            }
        }).catch(() => {
        });

        e.preventDefault();
    }

    return (
        <div>
            {errors}
            <h1>{location.state ? 'Edit' : 'Edit new'}</h1>
            <form>
                <div className="mb-3">
                    <label htmlFor="nftToken" className="form-label">Token</label>
                    <input type="text" className="form-control" id="nftToken" maxLength="10"
                           placeholder="Token" defaultValue={token} onChange={handleTokenChange}/>
                </div>
                <div className="mb-3">
                    <label htmlFor="nftTitle" className="form-label">Title</label>
                    <input type="text" className="form-control" id="nftTitle"
                           placeholder="Title" defaultValue={title} onChange={handleTitleChange}/>
                </div>
                <div className="mb3">
                    <label htmlFor="nftCreator">Creator</label>
                    <select id='nftCreator' className="form-select" defaultValue={location.state ? creator.name : 0}
                            onChange={handleCreatorChange}>
                        <option value='0' disabled>Choose from the creators listed!</option>
                        {creators.map((a, index) =>
                            <option key={a.id} value={index}>{a.name}</option>
                        )}
                    </select>
                </div>
                <div>
                    <button className='btn btn-primary' onClick={handleSubmit}>SAVE</button>
                </div>
            </form>
        </div>
    );
}

export default NftForm;