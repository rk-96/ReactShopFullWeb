import Link from 'next/link';

export default function ProductCard(props) {

    return (
        <div className="col">
            <div className="card" >
                <img src={props.image} className="card-img-top" alt={props.name} height="200px" />
                <div className="card-body">
                    <h5 className="card-title">{props.name}</h5>
                    <Link href="/product/[id]" as={`/product/${props.id}`}>
                        <a className="btn btn-primary">View Detail</a>
                    </Link>

                </div>
            </div>
        </div>

    );
}