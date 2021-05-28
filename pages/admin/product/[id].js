import React, { useEffect, useState } from "react";
import Admin from "layouts/Admin.js";
import { useRouter } from "next/router";
import httpClient from "../../../services/httpService.tsx";
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";
import { makeStyles, MenuItem, Snackbar } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import TextFieldsIcon from "@material-ui/icons/TextFields";
import { useFormik } from "formik";
import AttachMoneyIcon from "@material-ui/icons/AttachMoney";
import ImageIcon from "@material-ui/icons/Image";
import PhotoLibraryIcon from "@material-ui/icons/PhotoLibrary";
import DescriptionIcon from "@material-ui/icons/Description";
import MuiAlert from "@material-ui/lab/Alert";
import CategoryIcon from "@material-ui/icons/Category";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}
const styles = {
  cardCategoryWhite: {
    color: "rgba(255,255,255,.62)",
    margin: "0",
    fontSize: "14px",
    marginTop: "0",
    marginBottom: "0",
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none",
  },
  fullWidth: {
    width: "100%",
    marginTop: "24px",
  },
};

const ProductDetails = (props) => {
  const [, updateState] = React.useState();
  const forceUpdate = React.useCallback(() => updateState({}), []);
  const useStyles = makeStyles(styles);
  const classes = useStyles();
  const router = useRouter();
  const [data, setData] = useState(null);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: data || {},
    onSubmit: async (values) => {
      if (router.query.id === "create") {
        await httpClient.post("api/createProduct", values);
        setOpen(true);
      } else {
        await httpClient.post("api/editProduct", values);
        setOpen(true);
      }
    },
  });
  const [categories, setCategories] = useState([]);
  const getData = async () => {
    await getCategories();
    if (router.query.id === "create") return {};
    const res = await httpClient.get(`api/product/${router.query.id}`);
    setData(res);
    forceUpdate();
  };
  const getCategories = async () => {
    const res = await httpClient.get("api/categories");
    setCategories(res);
  };
  useEffect(() => {
    getData();
  }, []);

  const [open, setOpen] = React.useState(false);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const handleDeleteProduct = async () => {
    try {
      await httpClient.delete(`api/product/${router.query.id}`);
      router.back();
    } catch (error) {
      console.log(error);
    }
  };
  const [openD, setOpenD] = React.useState(false);
  const actionClose = () => {
    setOpenD(false);
  };
  return (
    <form onSubmit={formik.handleSubmit}>
      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          <Card>
            <CardHeader color="primary">
              <h4 className={classes.cardTitleWhite}>
                {router.query.id !== "create"
                  ? "Edit Product"
                  : "Create New Product"}
              </h4>
              <p className={classes.cardCategoryWhite}>Complete your product</p>
            </CardHeader>
            <CardBody>
              <GridContainer>
                <GridItem xs={12} sm={12} md={12}>
                  <TextField
                    label="Product Name"
                    id="name"
                    name="name"
                    onChange={formik.handleChange}
                    value={formik.values.name}
                    className={classes.fullWidth}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <TextFieldsIcon />
                        </InputAdornment>
                      ),
                    }}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={4}>
                  <TextField
                    label="Categories"
                    id="categoryId"
                    name="categoryId"
                    select
                    onChange={formik.handleChange}
                    value={formik.values.categoryId || null}
                    className={classes.fullWidth}
                    option={categories}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <CategoryIcon />
                        </InputAdornment>
                      ),
                    }}
                  >
                    {categories.map((option) => (
                      <MenuItem key={option.name} value={option.name}>
                        {option.description}
                      </MenuItem>
                    ))}
                  </TextField>
                </GridItem>
                <GridItem xs={12} sm={12} md={4}>
                  <TextField
                    label="Original Price"
                    id="originalPrice"
                    name="originalPrice"
                    onChange={formik.handleChange}
                    value={formik.values.originalPrice}
                    className={classes.fullWidth}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <AttachMoneyIcon />
                        </InputAdornment>
                      ),
                    }}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={4}>
                  <TextField
                    label="Sale Price"
                    id="salePrice"
                    name="salePrice"
                    onChange={formik.handleChange}
                    value={formik.values.salePrice}
                    className={classes.fullWidth}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <AttachMoneyIcon />
                        </InputAdornment>
                      ),
                    }}
                  />
                </GridItem>
              </GridContainer>
              <GridContainer>
                <GridItem xs={12} sm={12} md={6}>
                  <TextField
                    label="Image"
                    id="image"
                    onChange={formik.handleChange}
                    value={formik.values.image}
                    className={classes.fullWidth}
                    disabled
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <ImageIcon />
                        </InputAdornment>
                      ),
                    }}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={6}>
                  <TextField
                    label="Images"
                    id="images"
                    onChange={formik.handleChange}
                    value={formik.values.images}
                    className={classes.fullWidth}
                    disabled
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <PhotoLibraryIcon />
                        </InputAdornment>
                      ),
                    }}
                  />
                </GridItem>
              </GridContainer>
              <GridContainer>
                <GridItem xs={12} sm={12} md={6}>
                  <TextField
                    label="Thumbnail"
                    id="thumbnail"
                    onChange={formik.handleChange}
                    value={formik.values.thumbnail}
                    className={classes.fullWidth}
                    disabled
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <ImageIcon />
                        </InputAdornment>
                      ),
                    }}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={6}>
                  <TextField
                    label="Thumbnails"
                    id="thumbnails"
                    onChange={formik.handleChange}
                    value={formik.values.thumbnails}
                    className={classes.fullWidth}
                    disabled
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <PhotoLibraryIcon />
                        </InputAdornment>
                      ),
                    }}
                  />
                </GridItem>
              </GridContainer>
              <GridContainer>
                <GridItem xs={12} sm={12} md={12}>
                  <TextField
                    label="Short Description"
                    id="shortDescription"
                    name="shortDescription"
                    onChange={formik.handleChange}
                    value={formik.values.shortDescription}
                    className={classes.fullWidth}
                    multiline={true}
                    rows={2}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <DescriptionIcon />
                        </InputAdornment>
                      ),
                    }}
                  />
                </GridItem>
              </GridContainer>
            </CardBody>
            <CardFooter>
              <Button color="primary" type="submit">
                {router.query.id !== "create"
                  ? "Update Product"
                  : "Create Product"}
              </Button>
              {router.query.id !== "create" && (
                <Button color="danger" onClick={() => setOpenD(true)}>
                  Delete Product
                </Button>
              )}
            </CardFooter>
          </Card>
        </GridItem>
      </GridContainer>
      <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success">
          {router.query.id === "create"
            ? "Create complete !"
            : "Update complete !"}
        </Alert>
      </Snackbar>
      <Dialog
        open={openD}
        onClose={actionClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Do you really wanna delete this product ? This action will be not
            revertable !
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={actionClose} color="primary">
            Disagree
          </Button>
          <Button
            onClick={() => handleDeleteProduct()}
            color="danger"
            autoFocus
          >
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </form>
  );
};
ProductDetails.layout = Admin;
export default ProductDetails;
