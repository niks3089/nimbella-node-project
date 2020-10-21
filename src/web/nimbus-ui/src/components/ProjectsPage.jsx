import React, { useState, useEffect } from 'react';

import Box from '@material-ui/core/Box';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import MaterialTable from 'material-table';

import { Projects } from '../Style';

import NimbusApi from '../NimbusApi';

export default function ProjectsPage(props) {

  const classes = Projects();
  const [open, setOpen] = useState(false);
  const [newProjectName, setNewProjectName] = useState(null);
  const [newProjectDescription, setNewProjectDescription] = useState(null);
  const [projectList, setProjectList] = useState([
    {
      name: 'args.name',
      description: 'args.description',
      user: 'res.body.email'
    }
  ]);


  useEffect(() => {
    NimbusApi.get('project')
      .then((response) => {
        setProjectList([
          {
            id: 1,
            name: 'args.name',
            description: 'args.description',
            user: 'res.body.email'
          },
          {
            id: 2,
            name: 'args.name',
            description: 'args.description',
            user: 'res.body.email'
          },
          {
            id: 3,
            name: 'args.name',
            description: 'args.description',
            user: 'res.body.email'
          }
        ]);
      });
  }, [])

  async function callLogin() {
  }

  function handleChange(e) {
    const { id, name, value } = e.target;
    switch (name) {
      case 'project_name':
        setNewProjectName(value.trim());
        break;
      case 'project_description':
        setNewProjectDescription(value.trim());
        break;
    }
  }

  function handleClick(e) {
    handleClickOpen();
    const { id, name, value } = e.currentTarget;
    switch (id) {
      case 'submit':
        return callLogin();
      case 'cancel':
        setNewProjectName(null);
        setNewProjectDescription(null);
        break;
    }
  }

  function handleDelete(e) {
    const { id, name, value } = e.currentTarget;
    switch (id) {
      case 'submit':
        return callLogin();
      case 'cancel':
        setNewProjectName(null);
        setNewProjectDescription(null);
        break;
    }
  }

  function handleClickOpen() {
    setOpen(!open);
  };

  function ListProjects({ project }) {
    console.log("project")
    console.log(project)
    const columns = [
      { title: 'Name', field: 'name', editable: 'onUpdate' },
      { title: 'Description', field: 'description', editable: 'onUpdate' },
    ];

    return (
      <MaterialTable
        components={{
          /* this just removes the shadow around the table */
          Container: props => <Paper {...props} elevation={0} />
        }}
        columns={columns}
        data={project}
        options={{
          padding: 'dense',
          showTitle: false,
          pageSize: 6,
          pageSizeOptions: [6, 12, 24],
          sorting: true,
          thirdSortClick: false,
          search: true
        }}
        editable={{
          onRowUpdate: (newData, oldData) =>
            new Promise((resolve, reject) => {
              let dataUpdate = [...project];
              let index = oldData.tableData.id;
              dataUpdate[index] = newData;

              setProjectList(dataUpdate);


              console.log("newData");
              console.log(newData);
              console.log("oldData");
              console.log(oldData);
              console.log("dataUpdate");
              console.log(dataUpdate);
              resolve();
            }),
          onRowDelete: oldData =>
            new Promise((resolve, reject) => {
              setTimeout(() => {
                let dataDelete = [...project];
                let index = oldData.tableData.id;
                dataDelete.splice(index, 1);
                setProjectList([...dataDelete]);

                console.log("index")
                console.log(index)
                resolve()
              }, 1000)
            }),
        }}
      />
    );
  }

  return (
    <div className={classes.root}>
      <Card className={classes.card}>

        <Typography variant="h4" className={classes.headPadding}>
          Project List
        </Typography>

        <Button variant="contained" color="primary" id="create_new_project" name="netlifyToken" onClick={handleClickOpen}> Create new project </Button>

        {
          projectList && projectList.length > 0 ?
            <ListProjects project={projectList} /> :
            <Typography variant="h6">
              No projects were found
            </Typography>
        }

        <Dialog open={open} onClose={handleClickOpen} aria-labelledby="form-dialog-title">
          <DialogTitle id="form-dialog-title">New Project</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Please provide the following details
          </DialogContentText>
            <TextField
              fullWidth
              id="outlined-basic"
              variant="outlined"
              label="Project name"
              type="text"
              name="project_name"
              defaultValue={null}
              onChange={handleChange}
            />
            <Box m={2} />
            <TextField
              fullWidth
              id="outlined-basic"
              variant="outlined"
              label="Project description"
              type="text"
              name="project_description"
              defaultValue={null}
              onChange={handleChange}
            />
          </DialogContent>
          <DialogActions>
            <Button variant="contained" id="submit" className={classes.form_submit_submit} onClick={handleClick}>Submit</Button>
            <Button variant="contained" id="cancel" className={classes.form_submit_cancel} onClick={handleClick}>Cancel</Button>
          </DialogActions>
        </Dialog>
        <Box m={4} />
      </Card>
    </div >
  );
}
