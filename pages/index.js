import Layout from "../components/layout";
import ProductCard from "../components/productcard";
import axios from "axios";

export default function HomePage(props) {
  return (
    <Layout>
      <div className="row row-cols-3">
      {props.data.map((prod) => <ProductCard name={prod.title} image={prod.image} id={prod.id} key={prod.id} />)} 
      </div>
    </Layout>
  );
}

export async function getStaticProps(){

 let url = "http://localhost:3000/api/products";
 const res = await axios.get(url,
  {
    headers: {
      apikey: 'e555396ad0e7f074d62b90c5862b9e42'
    }
  });

  // const res = await axios.get('https://fakestoreapi.com/products');
  const data = res.data.data;
  return {
    props:{
      data
    }
  }

}