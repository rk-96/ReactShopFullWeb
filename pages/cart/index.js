import useSWR from "swr";
import Layout from "../../components/layout";
import axios from "axios";

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
    const { data, error } = useSWR('https://fakestoreapi.com/carts/user/2', fetcher)

    if (error) return <div>{error}</div>
    if (!data) return <div>Loading ...</div>

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
                            <th scope="row" key={todo.id}>{prod.title}</th>
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
