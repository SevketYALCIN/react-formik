import 'date-fns';
import { addYears } from "date-fns";
import React from "react";
import ReactDOM from "react-dom";
import { useFormik } from "formik";
import "./index.css";
import DateFnsUtils from '@date-io/date-fns';
import { KeyboardDatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import { InputLabel, Grid } from '@material-ui/core';

const SignupForm = () => {
  const formik = useFormik({
    initialValues: {
      birthdate: null,
      licenseDate: null
    },
    onSubmit: values => {
      console.log(JSON.stringify(values));
    },
  });
  return (
    <Grid container justify="space-around">
      <form onSubmit={formik.handleSubmit}>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <div className="input-row">
            <InputLabel htmlFor="birthdate">Date de naissance</InputLabel>
            <KeyboardDatePicker
              disableToolbar
              format="dd/MM/yyyy"
              margin="normal"
              id="birthdate"
              value={formik.values.birthdate}
              onChange={(date) => formik.setFieldValue("birthdate", date)}
              KeyboardButtonProps={{
                'aria-label': 'Date de naissance',
              }}
            />
          </div>
          <div className="input-row">
            <InputLabel htmlFor="licenseDate">Date d'obtention du permis</InputLabel>
            <KeyboardDatePicker
              disableToolbar
              format="dd/MM/yyyy"
              margin="normal"
              id="licenseDate"
              disabled={formik.values.birthdate === null}
              value={formik.values.licenseDate}
              minDate={addYears(formik.values.birthdate, 18)}
              onChange={(date) => formik.setFieldValue("licenseDate", date)}
              KeyboardButtonProps={{
                'aria-label': "Date d'obtention du permis",
              }}
            />
          </div>
          <button type="submit">Submit</button>
        </MuiPickersUtilsProvider>
      </form>
    </Grid>
  );
};

function App() {
  return <SignupForm />;
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
