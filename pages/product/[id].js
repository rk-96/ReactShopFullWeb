import axios from "axios";
import Layout from "../../components/layout";
import { checkLogin } from "../../lib/auth";
import cookie from 'cookie';

export default function ProductPage({ data }) {
    return (
        <Layout>
            <div className="card mb-3" >
                <div className="row g-0">
                    <div className="col-md-4">
                        <img src={data.data[0].image} className="img-fluid rounded-start" alt={data.data[0].title} />
                    </div>
                    <div className="col-md-8">
                        <div className="card-body">
                            <h5 className="card-title">{data.data[0].title}</h5>
                            <p className="card-text">{data.data[0].description}</p>
                            <p className="card-text">${data.data[0].price}</p>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export async function getServerSideProps(context) {

    const { req } = context;
    console.clear();
    if (!req.headers.cookie) {
        console.clear();

        const { res } = context;
        res.writeHead(301, { Location: "/login" });
        res.end();
        return true;

    } else {
        console.clear();

        const { token } = cookie.parse(req.headers.cookie);
        const profile = await checkLogin(token);

        if (!profile) {
            const { res } = context;
            res.writeHead(301, { Location: "/login" });
            res.end();
            return true;
        }

    }

    let url = "http://localhost:3000/api/products/";
    let header = {
        headers: {
            apikey: 'e555396ad0e7f074d62b90c5862b9e42'
        }
    };

    const res = await axios.get(url + context.params.id , header);
    const data = res.data;
    console.clear();
    console.log(data.data[0]);
    return {
        props: {
            data
        }
    }
}