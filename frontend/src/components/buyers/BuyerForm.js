import React, {useState} from "react";
import {useLocation, useNavigate, useParams} from "react-router-dom";
import dayjs from "dayjs";

import config from "../../config";

const BuyerForm = () => {
    const [errors, setErrors] = useState([]);
    const {id} = useParams();
    const location = useLocation();
    const navigate = useNavigate();
    let name = location.state ? location.state.buyer.name : '';
    let registration_date = location.state ?
        dayjs(location.state.buyer.registration_date) : dayjs();

    const handleSubmit = (e) => {
        const url = `${config.API_URL}/buyers/${location.state ? id : ''}`;
        const method = location.state ? 'PUT' : 'POST';

        const buyer = {
            id: id,
            name: name,
            registration_date: registration_date.format('YYYY-M-D HH:mm:ss')
        };
        fetch(url, {
            method: method,
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(buyer)
        }).then(res => {
            if (res.status === 200) {
                navigate('/buyers');
            } else if (res.message) {
                setErrors([...errors, `Hiba!`]);
            }
        }).catch(() => {
        });

        e.preventDefault();
    }

    const handleNameChange = (e) => {
        name = e.target.value;
    }

    return (
        <div>
            {errors}
            <h1>{location.state ? 'Edit' : 'Edit new'}</h1>
            <form>
                <div className="mb-3">
                    <label htmlFor="buyerName" className="form-label">Name</label>
                    <input type="text" className="form-control" id="buyerName"
                           placeholder="Name" defaultValue={name} onChange={handleNameChange}/>
                </div>
                <div className="mb-3">
                    <label htmlFor="buyerRegDate" className="form-label">Birth date</label>
                    <input type="Birth date" className="form-control" id="buyerRegDate"
                           placeholder="Birth date" value={registration_date.format('YYYY-M-D HH:mm:ss')}/>
                </div>
                <div>
                    <button className='btn btn-primary' onClick={handleSubmit}>SAVE</button>
                </div>
            </form>
        </div>
    );
}

export default BuyerForm;