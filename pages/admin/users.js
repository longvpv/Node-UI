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
import { Button, IconButton, Snackbar } from "@material-ui/core";
import { DataGrid } from "@material-ui/data-grid";
import httpClient from "../../services/httpService.tsx";
import Avatar from "@material-ui/core/Avatar";
import Alert from "@material-ui/lab/Alert";
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
    display: "none",
  },
  large: {
    width: "75px",
    height: "75px",
  },
};

const Users = () => {
  const useStyles = makeStyles(styles);
  const classes = useStyles();
  const [users, setUsers] = useState([]);
  const [open, setOpen] = useState(false);
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };
  const getData = async () => {
    const res = await httpClient.get("api/userlist");
    const newData = res.map((item) => {
      item["id"] = item["_id"];
      delete item["_id"];
      return item;
    });
    setUsers(newData);
  };
  const handleUploadAvatar = (e, row) => {
    if (e.target.files[0].size > 10240) {
      setOpen(true);
      return;
    }

    const formData = new FormData();
    formData.append("avatar", e.target.files[0]);
    formData.append("id", row.id);
    httpClient
      .post("api/users/uploadPhoto", formData)
      .then((value) => getData());
  };
  let columns = [
    { field: "id", headerName: "ID", width: 75 },
    {
      field: "avatar",
      headerName: "Avatar",
      renderCell: (params) => {
        return (
          <>
            <Avatar src={params.value} className={classes.large} />
            <input
              accept="image/png, image/jpeg"
              className={classes.input}
              id={`icon-button-file-for-${params.id}`}
              type="file"
              data-id={params.id}
              onChange={(event) => handleUploadAvatar(event, params)}
            />
            <label htmlFor={`icon-button-file-for-${params.id}`}>
              <Button
                variant="contained"
                color="secondary"
                aria-label="upload picture"
                component="span"
              >
                Upload avatar
              </Button>
            </label>
          </>
        );
      },
      width: 250,
    },
    // {
    //   field: "action",
    //   headerName: "Action",
    //   disableClickEventBubbling: true,
    //   renderCell: (rows, a, b) => {

    //     return (
    //       <>
    //         <input
    //           accept="image/*"
    //           className={classes.input}
    //           id="icon-button-file"
    //           type="file"
    //           onChange={(event) => handleUploadAvatar(event, rows)}
    //         />
    //         <label htmlFor="icon-button-file">
    //           <Button
    //             variant="contained"
    //             color="secondary"
    //             aria-label="upload picture"
    //             component="span"
    //           >
    //             Upload new avatar
    //           </Button>
    //         </label>
    //       </>
    //     );
    //   },
    //   width: 200,
    // },
    { field: "firstName", headerName: "First Name", width: 150 },
    { field: "lastName", headerName: "Last Name", width: 150 },
    { field: "gender", headerName: "Gender", width: 150 },
    { field: "email", headerName: "Email", width: 250 },
    { field: "dob", headerName: "Date of birth", width: 150 },

    { field: "username", headerName: "User Name", width: 100 },
  ];
  useEffect(() => {
    getData();
  }, []);
  return (
    <div>
      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          <Card plain>
            <CardHeader plain color="success">
              <h4 className={classes.cardTitleWhite}>Table of product</h4>
            </CardHeader>
            <CardBody>
              <div style={{ height: 500, width: "100%" }}>
                <DataGrid rows={users} columns={columns} />
              </div>
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>
      <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error">
          Only support image file under 10kb !
        </Alert>
      </Snackbar>
    </div>
  );
};
Users.layout = Admin;
export default Users;
