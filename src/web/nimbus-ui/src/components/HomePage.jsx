import React, { useState, useEffect } from 'react';
import { Link, Redirect } from "react-router-dom";

import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import { Home } from '../Style';

import NimbusApi from '../NimbusApi';

export default function HomePage(props) {

  const classes = Home();
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");

  async function callLogin() {
    const data = { "email": userEmail, "password": userPassword };

    await NimbusApi.post('login', data)
      .then(response => {
        if (response.status === 200) {
          props.setLoginInfoFunction(response.data.data)
          props.history.push('/projects');
        } else {
          alert('Login failed')
          console.log(response)
        }
      }).catch(error => {
        alert('Login failed - catch')
        console.log(error)
      });
  }

  function handleChange(e) {
    const { id, name, value } = e.target;
    switch (name) {
      case 'email':
        setUserEmail(value.trim());
        break;
      case 'password':
        setUserPassword(value.trim());
        break;
    }
  }

  function handleClick(e) {
    const { id, name, value } = e.currentTarget;
    switch (id) {
      case 'submit':
        return callLogin();
      case 'cancel':
        setUserEmail(null);
        setUserPassword(null);
        break;
    }
  }

  return (
    <div className={classes.root}>
      <Card className={classes.card}>
        <Typography variant="h5" className={classes.document_heading}>
          Login
            </Typography>
        <form className={classes.formControl}>
          <div className={classes.formControl_immidiateChilds}>
            <TextField
              id="outlined-basic"
              variant="outlined"
              label="Email Address"
              type="email"
              name="email"
              defaultValue={userEmail}
              onChange={handleChange}
            />
            <TextField
              id="outlined-basic"
              variant="outlined"
              label="Password"
              type="password"
              name="password"
              defaultValue={userPassword}
              onChange={handleChange}
            />
          </div>
        </form>
        <div className={classes.form_submit}>
          <Button variant="contained" className={classes.form_submit_submit} id="submit" onClick={handleClick}>Login</Button>
          <Button variant="contained" className={classes.form_submit_cancel} id="cancel" onClick={handleClick}>Cancel</Button>
        </div>
      </Card>
    </div >
  );
}
