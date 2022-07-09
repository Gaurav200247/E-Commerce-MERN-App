import React, { useState } from "react";
import Loading from "../Layouts/Loader/Loading";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { clearErrors, forgotPassword } from "../../Actions/UserAction";
import { useAlert } from "react-alert";
import EmailIcon from "@mui/icons-material/Email";
import { TextField } from "@mui/material";

import MetaData from "../Layouts/MetaData";
import "./ForgotPassword.css";

const ForgotPassword = () => {
  const dispatch = useDispatch();
  const alert = useAlert();

  const { loading, error, message } = useSelector(
    (state) => state.forgotPassword
  );

  const [email, setEmail] = useState("");

  const ForgotPasswordSubmit = (e) => {
    e.preventDefault();

    const myForm = new FormData();
    myForm.set("email", email);
    console.log(email);
    dispatch(forgotPassword(myForm));
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
  }, [alert, dispatch, error]);

  useEffect(() => {
    if (message) {
      alert.success(message);
    }
  }, [alert, dispatch, message]);

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <>
          <MetaData title="Forgot Password" />

          <div className="forgotPasswordContainer">
            <div className="forgotPasswordBox">
              <h2 className="forgotPasswordHeading">Forgot Password</h2>

              <form
                className="forgotPasswordForm"
                onSubmit={ForgotPasswordSubmit}
              >
                <div className="forgot-pass-email">
                  <EmailIcon className="mr-5" />
                  <TextField
                    label="Email"
                    name="email"
                    variant="outlined"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                <input
                  type="submit"
                  value="Send Mail"
                  className="forgotPasswordBtn bg-indigo-600 text-white hover:bg-indigo-500"
                />
              </form>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default ForgotPassword;
