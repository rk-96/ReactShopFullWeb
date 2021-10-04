import axios from 'axios';
import jwt from 'jsonwebtoken';

const APIKEY = "e555396ad0e7f074d62b90c5862b9e42";
const secretKEY = "MYSKEY"

export function checkapiKey(apikey) {
    if (apikey == APIKEY) {
        return true;
    }
    else {
        return false;
    }

}


export function verifyToken(token) {
    const jwtToken = token.split(" ")[1];
    try {
        return jwt.verify(jwtToken, secretKEY)
    } catch (error) {
        return false;
    }
}

export async function checkLogin(token) {
    const results = await axios.get("http://localhost:3000/api/auth/verify", {
        headers: {
            Authorization: token
        }
    }).then((res) => { 
        return res.data 
    }).catch((err) => { 
        return false 
    });

    return results;
}