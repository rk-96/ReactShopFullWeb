import Header from "./header";
import Head from 'next/head';
import Footer from "./footer";

export default function Layout({ children }) {
    return (<>
        <Head>
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.1/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-F3w7mX95PdgyTmZZMECAngseQB83DfGTowi0iMjiWaeVhAn4FJkqJByhZMI3AhiU" crossOrigin="anonymous"></link>
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.1/dist/js/bootstrap.bundle.min.js" integrity="sha384-/bQdsTh/da6pkI1MST/rWKFNjaCP5gBSY4sEBT38Q/9RBh9AH40zEOg7Hlq2THRZ" crossOrigin="anonymous"></script>
        </Head>
        <div>
            <Header>Header</Header>
            <div className="container">{children}</div>
            <Footer>Myfooter</Footer>
        </div>
    </>);
}