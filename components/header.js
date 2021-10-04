import Cookies from 'js-cookie';
import Link from 'next/link';
import { useRouter, userRouter } from "next/router";
import { useEffect, useState } from 'react';
import { checkLogin } from '../lib/auth';
import style from './header.module.css';

export default function Header() {
    const router = useRouter();
    const [profile, setProfile] = useState();

    useEffect(async () => {
        const token = Cookies.get('token');
        if (token) setProfile(await checkLogin(token))
    }, []);

    async function handleLogout(e) {
        e.preventDefault();
        Cookies.remove('token');
        Cookies.remove('user');
        router.push('/');
    }

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid">
                <a className="navbar-brand" href="#">Navbar</a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <Link href="/">
                                <a className={router.pathname == "/" ? "nav-link active" : "nav-link"}  >Home</a>
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link href="/cart/user/2" >
                                <a className={router.pathname == "/cart/user/[userid]" ? "nav-link active" : "nav-link"}>Cart</a>
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link href="/about" >
                                <a className={router.pathname == "/about" ? "nav-link active" : "nav-link"}>About</a>
                            </Link>
                        </li>
                    </ul>
                </div>
                {
                    profile ? <form className="form-inline">
                        <button className="btn btn-outline-success my-2 my-sm-0" type="submit" onClick={handleLogout}>Logout</button>
                    </form> : <Link href="/login" >
                        <a className="nav-link">Login</a>
                    </Link>
                }

            </div>
        </nav>)
}