import React, {useState} from "react";
import {useNavigate, useLocation, useParams} from "react-router-dom";
import config from "../../config";

const CreatorForm = () => {
    const [errors, setErrors] = useState([]);
    const {id} = useParams();
    const location = useLocation();
    const navigate = useNavigate();
    let name = location.state ? location.state.creator.name : '';

    const handleSubmit = (e) => {
        const url =  `${config.API_URL}/creators/${location.state ? id : ''}`;
        const method = location.state ? 'PUT' : 'POST';

        const creator = {id: id, name: name};
        fetch(url, {
            method: method,
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(creator)
        }).then(res => {
            if (res.status === 200) {
                navigate('/creators');
            } else if (res.message) {
                setErrors([...errors, `Hiba!`]);
            }
        }).catch(() => {});

        e.preventDefault();
    }

    const handleChange = (e) => {
        name = e.target.value;
    }

    return (
        <div>
            {errors}
            <h1>{location.state ? 'Edit' : 'Edit new'}</h1>
            <form>
                <div className="mb-3">
                    <label htmlFor="creatorName" className="form-label">Name</label>
                    <input type="text" className="form-control" id="creatorName"
                           placeholder="Name" defaultValue={name} onChange={handleChange}/>
                </div>
                <div>
                    <button className='btn btn-primary' onClick={handleSubmit}>SAVE</button>
                </div>
            </form>
        </div>
    );
}

export default CreatorForm;
