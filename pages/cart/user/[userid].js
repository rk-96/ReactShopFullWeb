import useSWR from "swr";
import Layout from "../../../components/layout";
import axios from "axios";

import {useRouter, userRouter} from "next/router";


async function fetcher(url) {
    const res = await axios.get(url);
    const cart = res.data[0];
    const data = cart.products.map(async (prod) => {
        const res = await axios.get('https://fakestoreapi.com/products/' + prod.productId)
        const productDetails = { ...res.data, ...prod }
        return productDetails;
    })


    return await Promise.all(data);
}

export default function CartPage() {
    const router = useRouter();


    const { data, error } = useSWR('https://fakestoreapi.com/carts/user/'+router.query.userid, fetcher)

    if (error) return <Layout>{error}</Layout>
    if (!data) return (<Layout>
        <div className="spinner-grow text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
        </div>
        <div className="spinner-grow text-secondary" role="status">
            <span className="visually-hidden">Loading...</span>
        </div>
        <div className="spinner-grow text-success" role="status">
            <span className="visually-hidden">Loading...</span>
        </div>
        <div className="spinner-grow text-danger" role="status">
            <span className="visually-hidden">Loading...</span>
        </div>
        <div className="spinner-grow text-warning" role="status">
            <span className="visually-hidden">Loading...</span>
        </div>
        <div className="spinner-grow text-info" role="status">
            <span className="visually-hidden">Loading...</span>
        </div>
        <div className="spinner-grow text-light" role="status">
            <span className="visually-hidden">Loading...</span>
        </div>
        <div className="spinner-grow text-dark" role="status">
            <span className="visually-hidden">Loading...</span>
        </div>

    </Layout>)

    return (
        <Layout>
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">Name</th>
                        <th scope="col">Price</th>
                        <th scope="col">Qty</th>
                        <th scope="col">Sum</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((prod) => (
                        <tr>
                            <th scope="row">{prod.title}</th>
                            <td>{prod.price}</td>
                            <td>{prod.quantity}</td>
                            <td>{prod.price * prod.quantity}</td>
                        </tr>

                    ))}


                </tbody>
            </table>
        </Layout>
    )


}
