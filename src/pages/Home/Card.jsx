import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";
import { DataTable } from "../../constants";

export default function CardComponent() {
  return (
    <Card>
      <Card.Header>Products</Card.Header>
      <Card.Body>
        <Card.Title>Product Name</Card.Title>
        <Card.Text>There's no products here, add some ?</Card.Text>
        <Link to={DataTable}>
          <Button variant="primary">Check it Out !</Button>
        </Link>
      </Card.Body>
    </Card>
  );
}
