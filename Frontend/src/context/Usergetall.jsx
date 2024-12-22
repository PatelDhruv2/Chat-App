import React, { useState } from 'react';
import { useEffect } from 'react';
import cookies from 'js-cookie';

import axios from 'axios';
const Usergetall = () => {
    const [allusers, setAllusers] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
      const token =cookies.get("jwt");
        console.log("Token: from frontend", token);
        const getallusers = async () => {
            setLoading(true);
            try {
                const response = await axios.get("http://localhost:3002/api/user/getUser", {
                    withCredentials: true,
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`,
                        
                    },
                });
                console.log("Users:", response.data);
                setAllusers(response.data);
            } catch (e) {
                console.error("Error fetching users:", e);
            } finally {
                setLoading(false);
            }
        };

        getallusers();
    }, []);

    return[allusers,loading];
};

export default Usergetall;
