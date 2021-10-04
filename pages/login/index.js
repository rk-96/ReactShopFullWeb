import Layout from "../../components/layout";
import axios from "axios";
import React, { useState, useEffect } from "react";

import Cookies from "js-cookie";
import Router from "next/router";

export default function LoginPage() {

    const [email, setEmail ] = useState('');
    const [ password, setPassword] = useState('');
    async function onLogin(e){
        e.preventDefault();
        axios.post("http://localhost:3000/api/auth" , {
            email: email , password: password
        }).then(
            (res) => {

                Cookies.set("token", "Bearer " + res.data.token);
                Cookies.set("user" , JSON.stringify(res.data.data));
                Router.push("/");
            }
         ).catch((err) => alert('Wrong email and password!'))
    }

    return (
        <Layout>
            <form className="form-inline">
                <div className="form-group mb-2">
                    <label  className="sr-only">Email</label>
                    <input type="text" className="form-control" id="staticEmail2" onChange={(e) => setEmail(e.target.value) } />
                </div>
                <div className="form-group mb-2">
                    <label  className="sr-only">Password</label>
                    <input type="password" className="form-control" id="inputPassword2" placeholder="Password" onChange={(e) => setPassword(e.target.value) } />
                </div>
                <button type="submit" className="btn btn-primary mb-2" onClick={onLogin}>Login</button>
            </form>
        </Layout>
    );
}