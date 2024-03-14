import React, { useContext, useState } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { adddata } from './context/ContextProvider';

const Register = () => {
    const { udata, setUdata } = useContext(adddata);
    const history = useHistory();

    const [inpval, setINP] = useState({
        firstName: "",
        middleName: "",
        lastName: "",
        email: "",
        phoneNumber1: "",
        phoneNumber2: "",
    });

    const setdata = (e) => {
        const { name, value } = e.target;
        setINP((prevVal) => ({
            ...prevVal,
            [name]: value
        }));
    };

    const addinpdata = async (e) => {
        e.preventDefault();

        const { firstName, middleName, lastName, email, phoneNumber1, phoneNumber2 } = inpval;

        if (!firstName || !lastName || !email) {
            alert("First Name, Last Name, and Email are required");
            return;
        }

        const res = await fetch("/create", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                firstName, middleName, lastName, email, phoneNumber1, phoneNumber2
            })
        });

        if (!res.ok) {
            alert("Failed to add contact");
            return;
        }

        const data = await res.json();
        console.log(data);

        history.push("/");
        setUdata(data);
        console.log("data added");
    };

    return (
        <div className="container">
            <NavLink to="/">Home</NavLink>
            <form className="mt-4">
                <div className="row">
                    <div className="mb-3 col-lg-4 col-md-4 col-12">
                        <label htmlFor="firstName" className="form-label">First Name</label>
                        <input type="text" value={inpval.firstName} onChange={setdata} name="firstName" className="form-control" id="firstName" />
                    </div>
                    <div className="mb-3 col-lg-4 col-md-4 col-12">
                        <label htmlFor="middleName" className="form-label">Middle Name</label>
                        <input type="text" value={inpval.middleName} onChange={setdata} name="middleName" className="form-control" id="middleName" />
                    </div>
                    <div className="mb-3 col-lg-4 col-md-4 col-12">
                        <label htmlFor="lastName" className="form-label">Last Name</label>
                        <input type="text" value={inpval.lastName} onChange={setdata} name="lastName" className="form-control" id="lastName" />
                    </div>
                    <div className="mb-3 col-lg-6 col-md-6 col-12">
                        <label htmlFor="email" className="form-label">Email</label>
                        <input type="email" value={inpval.email} onChange={setdata} name="email" className="form-control" id="email" />
                    </div>
                    <div className="mb-3 col-lg-6 col-md-6 col-12">
                        <label htmlFor="phoneNumber1" className="form-label">Phone Number 1</label>
                        <input type="tel" value={inpval.phoneNumber1} onChange={setdata} name="phoneNumber1" className="form-control" id="phoneNumber1" />
                    </div>
                    <div className="mb-3 col-lg-6 col-md-6 col-12">
                        <label htmlFor="phoneNumber2" className="form-label">Phone Number 2</label>
                        <input type="tel" value={inpval.phoneNumber2} onChange={setdata} name="phoneNumber2" className="form-control" id="phoneNumber2" />
                    </div>
                    <button type="submit" onClick={addinpdata} className="btn btn-primary">Submit</button>
                </div>
            </form>
        </div>
    );
};

export default Register;
