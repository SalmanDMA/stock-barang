import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';
import { DataTable } from '../../helper/constants';
import { useSelector } from 'react-redux';

export default function CardComponent({ type }) {
 const products = useSelector((state) => state.products.products);

 const categoryQuery = useSelector((state) => state.categories.categoryQuery);

 return (
  <Card>
   <Card.Body>
    <Card.Title>{type === 'category' ? 'Category Total' : 'Product Total'}</Card.Title>
    <Card.Text className='fw-bold'>{type === 'category' ? categoryQuery.length : products.length}</Card.Text>
    <Link to={DataTable}>
     <Button variant='primary'>Check it Out !</Button>
    </Link>
   </Card.Body>
  </Card>
 );
}
