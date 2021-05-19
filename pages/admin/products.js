import React, { useEffect, useState } from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// layout for this page
import Admin from "layouts/Admin.js";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Table from "components/Table/Table.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import { Button } from "@material-ui/core";
import { DataGrid } from "@material-ui/data-grid";
const styles = {
  cardCategoryWhite: {
    "&,& a,& a:hover,& a:focus": {
      color: "rgba(255,255,255,.62)",
      margin: "0",
      fontSize: "14px",
      marginTop: "0",
      marginBottom: "0",
    },
    "& a,& a:hover,& a:focus": {
      color: "#FFFFFF",
    },
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none",
    "& small": {
      color: "#777",
      fontSize: "65%",
      fontWeight: "400",
      lineHeight: "1",
    },
  },
};

function Products() {
  const useStyles = makeStyles(styles);
  const classes = useStyles();
  const [products, setProducts] = useState([]);
  const [keyProducts, setKeyProducts] = useState([]);
  useEffect(() => {
    const data = [
      {
        _id: "5bcbf511696b664906832519",
        images: [
          "http://api.demo.nordiccoder.com/images/product_1_1.png",
          "http://api.demo.nordiccoder.com/images/product_1_2.png",
        ],
        thumbnails: [
          "http://api.demo.nordiccoder.com/images/product_1_1.png",
          "http://api.demo.nordiccoder.com/images/product_1_2.png",
        ],
        name: "Winter Coat from France",
        image: "http://api.demo.nordiccoder.com/images/product_1.png",
        thumbnail: "http://api.demo.nordiccoder.com/images/product_1.png",
        shortDescription: "product 1",
        categoryId: "men",
        salePrice: 699,
        originalPrice: 800,
      },
      {
        _id: "5bcbf511696b66490683251a",
        images: [
          "http://api.demo.nordiccoder.com/images/product_2_1.png",
          "http://api.demo.nordiccoder.com/images/product_2_2.png",
        ],
        thumbnails: [
          "http://api.demo.nordiccoder.com/images/product_2_1.png",
          "http://api.demo.nordiccoder.com/images/product_2_2.png",
        ],
        name: "Italy Bag",
        image: "http://api.demo.nordiccoder.com/images/product_2.png",
        thumbnail: "http://api.demo.nordiccoder.com/images/product_2.png",
        shortDescription: "product 2",
        categoryId: "women",
        salePrice: 199,
        originalPrice: 300,
      },
      {
        _id: "5bcbf511696b66490683251b",
        images: [
          "http://api.demo.nordiccoder.com/images/product_3_1.png",
          "http://api.demo.nordiccoder.com/images/product_3_2.png",
        ],
        thumbnails: [
          "http://api.demo.nordiccoder.com/images/product_3_1.png",
          "http://api.demo.nordiccoder.com/images/product_3_2.png",
        ],
        name: "Coat from France",
        image: "http://api.demo.nordiccoder.com/images/product_3.png",
        thumbnail: "http://api.demo.nordiccoder.com/images/product_3.png",
        shortDescription: "product 3",
        categoryId: "accessories",
        salePrice: 599,
        originalPrice: 800,
      },
    ];
    const newData = data.map((item) => {
      item["id"] = item["_id"];
      delete item["_id"];
      return item;
    });

    setProducts(newData);
    const newKey = Object.keys(data[0]).map((key) => {
      if (key === "_id") return;
      return {
        field: key,
        headerName: key,
      };
    });
    setKeyProducts(newKey);
  }, []);
  const buttonAction = (id) => (
    <Button onClick={() => console.log("go to page Product detail ID", id)}>
      Detail
    </Button>
  );
  console.log(products);
  return (
    <GridContainer>
      <GridItem xs={12} sm={12} md={12}>
        <Card plain>
          <CardHeader plain color="success">
            <h4 className={classes.cardTitleWhite}>Table of product</h4>
          </CardHeader>
          <CardBody>
            <div style={{ height: 400, width: "100%" }}>
              <DataGrid pagination rows={products} columns={keyProducts} />
            </div>
          </CardBody>
        </Card>
      </GridItem>
    </GridContainer>
  );
}

Products.layout = Admin;

export default Products;
