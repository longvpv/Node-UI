import React, { useEffect, useState } from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// layout for this page
import Admin from "layouts/Admin.js";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import {
  Button,
  IconButton,
  InputAdornment,
  InputBase,
  Paper,
} from "@material-ui/core";
import { DataGrid } from "@material-ui/data-grid";
import httpClient from "../../services/httpService.tsx";
import { useRouter } from "next/router";
import SearchIcon from "@material-ui/icons/Search";
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
  input: {
    marginLeft: "12px",
    flex: 1,
  },
  iconButton: {
    padding: 10,
  },
  root: {
    marginLeft: "14px",
    padding: "2px 4px",
    display: "flex",
    alignItems: "center",
    width: 800,
  },
};

function Products() {
  const useStyles = makeStyles(styles);
  const classes = useStyles();
  const router = useRouter();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [total, setTotal] = useState(null);
  const [filter, setFilter] = useState({ pageSize: 2, page: 1, keyword: "" });
  // const [keyProducts, setKeyProducts] = useState([]);
  let columns = [
    { field: "id", headerName: "ID", width: 100, sortable: false },
    { field: "name", headerName: "Name", width: 250, sortable: false },
    {
      field: "categoryId",
      headerName: "Category",
      width: 150,
      sortable: false,
    },
    { field: "image", headerName: "Image", width: 250, sortable: false },
    {
      field: "originalPrice",
      headerName: "Original Price",
      width: 150,
      sortable: false,
    },
    {
      field: "salePrice",
      headerName: "Sale Price",
      width: 150,
      sortable: false,
    },
    {
      field: "shortDescription",
      headerName: "Short Description",
      width: 150,
      sortable: false,
    },
    {
      field: "action",
      headerName: "Action",
      width: 100,
      sortable: false,
      renderCell: (params) => buttonAction(params.id),
    },
  ];
  const getData = async (filter) => {
    setLoading(true);
    const res = await httpClient.get("api/products", { params: filter });
    setTotal(res.total);
    const newData = res.items.map((item) => {
      item["id"] = item["_id"];
      delete item["_id"];
      return item;
    });
    setProducts(newData);
    setLoading(false);
  };
  useEffect(() => {
    getData(filter);
  }, [filter]);
  const handlePushToProductDetailPage = (id) => {
    router.push(`product/${id}`);
  };
  const buttonAction = (id) => (
    <Button
      onClick={() => handlePushToProductDetailPage(id)}
      variant="contained"
      color="secondary"
    >
      Detail
    </Button>
  );
  return (
    <GridContainer>
      <Paper
        component="form"
        className={classes.root}
        onSubmit={(e) => {
          e.preventDefault();
          getData({ ...filter, keyword: e.target.keyword.value });
        }}
      >
        <InputBase
          className={classes.input}
          id="keyword"
          placeholder="Search product"
          fullWidth
          startAdornment={
            <InputAdornment position="end">
              <IconButton
                className={classes.iconButton}
                aria-label="search"
                onClick={(e) => {
                  e.preventDefault();
                  console.log(e);
                }}
              >
                <SearchIcon />
              </IconButton>
            </InputAdornment>
          }
        />
      </Paper>
      <GridItem xs={12} sm={12} md={12}>
        <Card plain>
          <CardHeader plain color="success">
            <h4 className={classes.cardTitleWhite}>Table of product</h4>
          </CardHeader>

          <CardBody>
            <div
              style={{
                width: "100%",
                height: "400px",
              }}
            >
              <Button
                color="primary"
                onClick={() => router.push("product/create")}
              >
                Create new Product
              </Button>
              <DataGrid
                pagination
                paginationMode="server"
                rows={products}
                columns={columns}
                pageSize={filter.pageSize}
                onPageSizeChange={(e) =>
                  setFilter({ ...filter, page: e.page, pageSize: e.pageSize })
                }
                onPageChange={(e) =>
                  setFilter({ ...filter, page: e.page, pageSize: e.pageSize })
                }
                rowsPerPageOptions={[2, 5]}
                rowCount={total ? total : null}
                loading={loading}
              />
            </div>
          </CardBody>
        </Card>
      </GridItem>
    </GridContainer>
  );
}

Products.layout = Admin;

export default Products;
