import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  FormHelperText,
  Grid,
} from "@mui/material";

const ProductsDetail = ({ onLogout }) => {  
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [openAddDialog, setOpenAddDialog] = useState(false);
  const [newProduct, setNewProduct] = useState({
    title: "",
    price: "",
    description: "",
    category: "",
    image: "", 
  });
  const [validationError, setValidationError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://fakestoreapi.com/products");
        if (!response.ok) {
          throw new Error(`HTTP Error: ${response.status}`);
        }
        const result = await response.json();
        setData(result);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleView = (product) => {
    setSelectedProduct(product);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedProduct(null);
  };

  const handleAddProduct = () => {
    setOpenAddDialog(true);
  };

  const handleCloseAddDialog = () => {
    setOpenAddDialog(false);
    setNewProduct({ title: "", price: "", description: "", category: "", image: "" });
    setValidationError("");
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProduct({ ...newProduct, [name]: value });
  };

  const handleImageChange = (e) => {
    const { value } = e.target;
    setNewProduct({ ...newProduct, image: value }); 
  };

  const validateForm = () => {
    if (!newProduct.title || !newProduct.price || !newProduct.description) {
      setValidationError("All fields are required.");
      return false;
    }
    if (isNaN(newProduct.price) || parseFloat(newProduct.price) <= 0) {
      setValidationError("Price must be a valid positive number.");
      return false;
    }
    setValidationError("");
    return true;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    const newProductData = {
      title: newProduct.title,
      price: parseFloat(newProduct.price),
      description: newProduct.description,
      category: newProduct.category,
      image: newProduct.image, 
    };

    try {
      const response = await fetch("https://fakestoreapi.com/products", {
        method: "POST",
        body: JSON.stringify(newProductData),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const result = await response.json();
      if (response.ok) {
        setData((prevData) => [...prevData, result]);
        handleCloseAddDialog();
      } else {
        setValidationError("Failed to add product. Please try again.");
      }
    } catch (err) {
      setValidationError("Failed to add product. Please try again.");
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div style={{ margin: "20px" }}>
      <h1>Product List</h1>
      <Button
        variant="contained"
        color="primary"
        onClick={handleAddProduct}
        style={{ marginBottom: "20px" }}
      >
        Add Product
      </Button>
      <Button
        variant="contained"
        color="secondary"
        onClick={onLogout}  
        style={{ marginBottom: "20px", marginLeft: "10px" }}
      >
        Logout
      </Button>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Title</TableCell>
              <TableCell>Price ($)</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Image</TableCell> 
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((product) => (
              <TableRow key={product.id}>
                <TableCell>{product.id}</TableCell>
                <TableCell>{product.title}</TableCell>
                <TableCell>${product.price.toFixed(2)}</TableCell>
                <TableCell>{product.description}</TableCell>
                <TableCell>
                  <img
                    src={product.image}
                    alt={product.title}
                    style={{
                      width: "50px",
                      height: "50px",
                      objectFit: "cover",
                    }}
                  />
                </TableCell>
                <TableCell>
                  <Button variant="contained" color="primary" onClick={() => handleView(product)}>
                    View
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Product Details</DialogTitle>
        <DialogContent>
          {selectedProduct && (
            <>
              <div><strong>Title:</strong> {selectedProduct.title}</div>
              <div><strong>Description:</strong> {selectedProduct.description}</div>
              <div><strong>Price:</strong> ${selectedProduct.price.toFixed(2)}</div>
              <div><strong>Image:</strong> <img src={selectedProduct.image} alt={selectedProduct.title} style={{ width: "100px", height: "100px", objectFit: "cover" }} /></div>
            </>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog open={openAddDialog} onClose={handleCloseAddDialog}>
        <DialogTitle>Add New Product</DialogTitle>
        <DialogContent>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                label="Title"
                name="title"
                value={newProduct.title}
                onChange={handleInputChange}
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Price"
                name="price"
                value={newProduct.price}
                onChange={handleInputChange}
                type="number"
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Description"
                name="description"
                value={newProduct.description}
                onChange={handleInputChange}
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Category"
                name="category"
                value={newProduct.category}
                onChange={handleInputChange}
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Image URL"
                name="image"
                value={newProduct.image}
                onChange={handleImageChange}
                fullWidth
                required
              />
            </Grid>
          </Grid>
          {validationError && (
            <FormHelperText error>{validationError}</FormHelperText>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseAddDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSubmit} color="primary">
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ProductsDetail;
