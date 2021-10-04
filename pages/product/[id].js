import axios from "axios";
import Layout from "../../components/layout";
import { checkLogin } from "../../lib/auth";
import cookie from 'cookie';

export default function ProductPage({ data }) {
    return (
        <Layout>
            {data[0]}
            <div className="card mb-3" >
                <div className="row g-0">
                    <div className="col-md-4">
                        <img src={data.image} className="img-fluid rounded-start" alt={data.title} />
                    </div>
                    <div className="col-md-8">
                        <div className="card-body">
                            <h5 className="card-title">{data.title}</h5>
                            <p className="card-text">{data.description}</p>
                            <p className="card-text">${data.price}</p>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export async function getServerSideProps(context) {

    const { req } = context;
    if (!req.headers.cookie) {
        const { res } = context;
        res.writeHead(301, { Location: "/login" });
        res.end();
        return true;
    } else {
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
    const res = await axios.get(url + context.params.id, header);
    const data = res.data;
    console.log(res);
    return {
        props: {
            data
        }
    }
}