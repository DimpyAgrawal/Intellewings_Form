import React, { useContext, useEffect, useState } from 'react';
import { NavLink, useParams, useHistory } from 'react-router-dom';
import { updatedata } from './context/ContextProvider';

const Edit = () => {
    const { updata, setUPdata } = useContext(updatedata);
    const history = useHistory();

    const [inpval, setINP] = useState({
        firstName: "",
        middleName: "",
        lastName: "",
        email: "",
        phoneNumber1: "",
        phoneNumber2: "",
        age: "",
        mobile: "",
        work: "",
        add: "",
        desc: ""
    });

    const setdata = (e) => {
        const { name, value } = e.target;
        setINP(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const { id } = useParams();

    const getdata = async () => {
        try {
            const res = await fetch(`/induser/${id}`);
            if (res.ok) {
                const data = await res.json();
                setINP(data);
            } else {
                console.error("Failed to fetch user data");
            }
        } catch (error) {
            console.error("Error fetching user data:", error);
        }
    };

    useEffect(() => {
        getdata();
    }, []);

    const updateuser = async (e) => {
        e.preventDefault();

        const { firstName, middleName, lastName, email, phoneNumber1, phoneNumber2, age, mobile, work, add, desc } = inpval;

        try {
            const res = await fetch(`/updateuser/${id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    firstName, middleName, lastName, email, phoneNumber1, phoneNumber2, age, mobile, work, add, desc
                })
            });
            if (res.ok) {
                const data = await res.json();
                setUPdata(data);
                history.push("/");
            } else {
                console.error("Failed to update user");
            }
        } catch (error) {
            console.error("Error updating user:", error);
        }
    };

    return (
        <div className="container">
            <NavLink to="/">Home</NavLink>
            <form className="mt-4">
                <div className="row">
                    <div className="mb-3 col-lg-6 col-md-6 col-12">
                        <label htmlFor="firstName" className="form-label">First Name</label>
                        <input type="text" value={inpval.firstName} onChange={setdata} name="firstName" className="form-control" id="firstName" />
                    </div>
                    <div className="mb-3 col-lg-6 col-md-6 col-12">
                        <label htmlFor="middleName" className="form-label">Middle Name</label>
                        <input type="text" value={inpval.middleName} onChange={setdata} name="middleName" className="form-control" id="middleName" />
                    </div>
                    <div className="mb-3 col-lg-6 col-md-6 col-12">
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
                    <div className="mb-3 col-lg-6 col-md-6 col-12">
                        <label htmlFor="age" className="form-label">Age</label>
                        <input type="text" value={inpval.age} onChange={setdata} name="age" className="form-control" id="age" />
                    </div>
                    <div className="mb-3 col-lg-6 col-md-6 col-12">
                        <label htmlFor="mobile" className="form-label">Mobile</label>
                        <input type="text" value={inpval.mobile} onChange={setdata} name="mobile" className="form-control" id="mobile" />
                    </div>
                    <div className="mb-3 col-lg-6 col-md-6 col-12">
                        <label htmlFor="work" className="form-label">Work</label>
                        <input type="text" value={inpval.work} onChange={setdata} name="work" className="form-control" id="work" />
                    </div>
                    <div className="mb-3 col-lg-6 col-md-6 col-12">
                        <label htmlFor="add" className="form-label">Address</label>
                        <input type="text" value={inpval.add} onChange={setdata} name="add" className="form-control" id="add" />
                    </div>
                    <div className="mb-3 col-lg-12 col-md-12 col-12">
                        <label htmlFor="desc" className="form-label">Description</label>
                        <textarea name="desc" value={inpval.desc} onChange={setdata} className="form-control" id="desc" cols="30" rows="5"></textarea>
                    </div>

                    <button type="submit" onClick={updateuser} className="btn btn-primary">Submit</button>
                </div>
            </form>
        </div>
    );
};

export default Edit;
