import React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import RegularButton from "../CustomButtons/Button";
import Danger from "../Typography/Danger";
import httpClient from "../../services/httpService.tsx";
import Success from "../Typography/Success";
export default function MasterDialog() {
  const [open, setOpen] = React.useState(false);
  const [error, setError] = React.useState(false);
  const [successfully, setSuccessfully] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleSeedDataBase = async (event) => {
    const res = await httpClient.post("api/seedDatabase", { password: event });
    if (res.error) {
      setError(true);
    } else setSuccessfully(true);
    setTimeout(() => {
      setOpen(false);
      setSuccessfully(false);
      setError(false);
    }, 5000);
  };
  return (
    <>
      <span>
        <RegularButton
          variant="outlined"
          color="danger"
          onClick={handleClickOpen}
        >
          Seed Database
        </RegularButton>
      </span>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSeedDataBase(e.target.password.value);
          }}
        >
          <DialogTitle id="form-dialog-title">Seed Database</DialogTitle>
          <DialogContent>
            <DialogContentText>
              To seed Database for this website, please enter admin password
              here. We will send updates occasionally. (for test reason, it will
              be : cs2zx3x6C)
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="password"
              label="Admin password"
              type="password"
              fullWidth
            />
            {error && (
              <Danger>
                It's wrong, you're liar, you not Admin !!! Contact Long for real
                password :D
              </Danger>
            )}
            {successfully && <Success>Seed successfully !!!</Success>}
          </DialogContent>
          <DialogActions>
            <RegularButton onClick={handleClose} color="info">
              Cancel
            </RegularButton>
            <RegularButton type="submit" color="danger">
              Subscribe
            </RegularButton>
          </DialogActions>
        </form>
      </Dialog>
    </>
  );
}
