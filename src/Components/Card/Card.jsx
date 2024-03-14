import Card from 'react-bootstrap/Card';
import './card.css';
function Cardx({ heading, description, image, subtitle, height, margin }) {
    return (
        <Card style={{ width: '20rem', height: '22rem', margin: '0 2px 0', border: 'none' }} className='card-ctn'>
            <Card.Body>
                <div className='img-ctn'>
                    <img className="card-img mb-2" src={image} style={{ width: 'auto', height: height, marginTop: margin }} />
                </div>
                <Card.Title className='card-heading'>{heading}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted mb-4 ">{subtitle}</Card.Subtitle>
                <Card.Text className='desc'>
                    {description}
                </Card.Text>
                {/* <Card.Link href="#">Card Link</Card.Link>
                <Card.Link href="#">Another Link</Card.Link> */}
            </Card.Body>
        </Card>
    );
}

export default Cardx;