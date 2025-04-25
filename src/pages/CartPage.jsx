// src/pages/CartPage.jsx
import React from "react";
import { useCart } from "../contexts/CartContext";
import { Button, Container, Table } from "react-bootstrap";
import { Link } from "react-router-dom";

const CartPage = () => {
  const { cart, removeFromCart, clearCart } = useCart();

  // Calculate the total price of all cart items
  const total = cart.reduce((sum, item) => sum + item.price, 0).toFixed(2);

  return (
    <Container className="py-4">
      <h2 className="mb-4">🛒 My Cart</h2>

      {/* Display message when cart is empty */}
      {cart.length === 0 ? (
        <div>
          <p>Your cart is empty.</p>
          <Link to="/" className="btn btn-primary">
            Go back to Wheelchairs
          </Link>
        </div>
      ) : (
        <>
          {/* Display cart items in a table */}
          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th>Name</th>
                <th>Price</th>
                <th>Remove</th>
              </tr>
            </thead>
            <tbody>
              {cart.map((item) => (
                <tr key={item.id}>
                  <td>{item.name}</td>
                  <td>${item.price.toFixed(2)}</td>
                  <td>
                    <Button
                      variant="danger"
                      onClick={() => removeFromCart(item.id)}
                    >
                      Remove
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>

          {/* Display the total price */}
          <h4>Total: ${total}</h4>

          {/* Buttons to clear the cart or proceed to checkout */}
          <Button variant="secondary" onClick={clearCart} className="me-2">
            Clear Cart
          </Button>
          <Button variant="success">Proceed to Checkout</Button>
        </>
      )}
    </Container>
  );
};

export default CartPage;
