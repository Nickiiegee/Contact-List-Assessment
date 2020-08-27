import React, { useState, useEffect } from 'react';
import Axios from 'axios';

// import custom components
import config from './config';

export default () => {
    const [users, setUsers] = useState([]);
    const [search, setSearch] = useState('');
    const [filteredUsers, setFilteredUsers] = useState([]);

    // import api
    useEffect(() => {
        Axios.get(`${config.base}`)
        .then(res => {
            setUsers(res.data);
        })
        .catch(err => {
            console.log(err)
        })
    }, [])

    // filter names on search
    useEffect(() => {
        setFilteredUsers(
            users.filter( user => {
                return user.name.toLocaleLowerCase().includes( search.toLocaleLowerCase() )
            })
        )
    }, [search, users])

    // sort array alphabetically
    users.sort((a, b) => a.name.localeCompare(b.name))
    
  return (
    <div className="container">
        <div className="search-box">
        <input
                type="text"
                className="search-bar"
                placeholder="Search..."
                onChange={e => setSearch(e.target.value)}
            />
            </div>
             <h1 className="heading">Look for your next potential employee here:</h1>

             <ul className="users">
                {
                    filteredUsers.map(user => <li key={user.name}>
    
                        {/* user details */}
                        <span className="name">{user.name}</span><br />
                        <span className="username">Username: {user.username}</span><br />
                        <span>E-mail: </span><span className="email">{user.email}</span><br />
                        <span className="phone">Phone: {user.phone}</span><br />
                        <span className="web">Website: {user.website}</span><br />
                        <span className="addressname">Address:</span> <span className="address">{user.address.street}</span><br />
                        <span className="code">{user.address.suite}</span><br />
                        <span className="code">{user.address.zipcode}</span><br />
                        <span className="companyname">Company:</span> <span className="company">{user.company.name}</span><br />
                        <span className="code">{user.company.catchPhrase}</span><br />
                        <span className="code">{user.company.bs}</span><br />
                        </li>)
                }
            </ul>
    </div>
  )
}

