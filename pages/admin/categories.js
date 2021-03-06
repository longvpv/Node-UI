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
import httpClient from "../../services/httpService.tsx";

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

function Categories() {
  const useStyles = makeStyles(styles);
  const classes = useStyles();
  const [categories, setCategories] = useState([]);
  const [keyCategories, setKeyCategories] = useState([]);
  useEffect(() => {
    httpClient.get("/api/categories").then((value) => {
      console.log(value);
      let newCategories = value.map((i) => Object.values(i));
      setCategories(newCategories);
      setKeyCategories(Object.keys(value[0]));
    });
    // const data = [
    //   {
    //     _id: "men",
    //     name: "men",
    //     description: "Men's Wear",
    //   },
    //   {
    //     _id: "women",
    //     name: "women",
    //     description: "Women Fashion",
    //   },
    //   {
    //     _id: "accessories",
    //     name: "accessories",
    //     description: "Bags and Accessories",
    //   },
    // ];
    // let newCategories = data.map((i) => Object.values(i));
    // setCategories(newCategories);
    // setKeyCategories(Object.keys(data[0]));
  }, []);
  return (
    <GridContainer>
      <GridItem xs={12} sm={12} md={12}>
        <Card plain>
          <CardHeader plain color="success">
            <h4 className={classes.cardTitleWhite}>Table of category</h4>
          </CardHeader>
          <CardBody>
            <Table
              tableHeaderColor="success"
              tableHead={keyCategories || []}
              tableData={categories || []}
            />
          </CardBody>
        </Card>
      </GridItem>
    </GridContainer>
  );
}

Categories.layout = Admin;

export default Categories;
