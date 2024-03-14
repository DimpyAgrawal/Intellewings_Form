import React, { useEffect, useState } from 'react';
import CreateIcon from '@mui/icons-material/Create';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import WorkIcon from '@mui/icons-material/Work';
import PhoneAndroidIcon from '@mui/icons-material/PhoneAndroid';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { NavLink, useParams, useHistory } from 'react-router-dom';

const Details = () => {
    const [userData, setUserData] = useState({});
    const { id } = useParams();
    const history = useHistory();

    const fetchData = async () => {
        try {
            const res = await fetch(`/induser/${id}`);
            if (res.ok) {
                const data = await res.json();
                setUserData(data);
            } else {
                console.error("Failed to fetch user data");
            }
        } catch (error) {
            console.error("Error fetching user data:", error);
        }
    };

    useEffect(() => {
        fetchData();
    }, [id]);

    const deleteUser = async (id) => {
        try {
            const res = await fetch(`/deleteuser/${id}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json"
                }
            });
            if (res.ok) {
                console.log("User deleted successfully");
                history.push("/");
            } else {
                console.error("Failed to delete user");
            }
        } catch (error) {
            console.error("Error deleting user:", error);
        }
    };

    return (
        <div className="container mt-3">
            <h1 style={{ fontWeight: 400 }}>User Details</h1>
            <Card sx={{ maxWidth: 600 }}>
                <CardContent>
                    <div className="add_btn">
                        <NavLink to={`/edit/${userData.id}`}>
                            <button className="btn btn-primary mx-2"><CreateIcon /></button>
                        </NavLink>
                        <button className="btn btn-danger" onClick={() => deleteUser(userData.id)}><DeleteOutlineIcon /></button>
                    </div>
                    <div className="row">
                        <div className="left_view col-lg-6 col-md-6 col-12">
                            <img src="/profile.png" style={{ width: 50 }} alt="profile" />
                            <h3 className="mt-3">Name: <span >{userData.firstName} {userData.middleName} {userData.lastName}</span></h3>
                            <p className="mt-3"><MailOutlineIcon />Email: <span>{userData.email}</span></p>
                            <p className="mt-3"><WorkIcon />Occupation: <span>{userData.work}</span></p>
                        </div>
                        <div className="right_view  col-lg-6 col-md-6 col-12">
                            <p className="mt-5"><PhoneAndroidIcon />Phone Number 1: <span>+91 {userData.phoneNumber1}</span></p>
                            <p className="mt-3"><PhoneAndroidIcon />Phone Number 2: <span>+91 {userData.phoneNumber2}</span></p>
                            <p className="mt-3"><LocationOnIcon />Location: <span>{userData.add}</span></p>
                            <p className="mt-3">Description: <span>{userData.desc}</span></p>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default Details;
