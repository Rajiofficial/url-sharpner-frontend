import React, { useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import * as yup from 'yup';
import { useFormik } from 'formik';
import axios from 'axios';
import { useState } from 'react';

function ForgotPass() {
  const [errorMsg, setErrorMsg] = useState('');
  const [succMsg, setSuccMs] = useState('');
  let formik = useFormik({
    initialValues: {
      email: '',
    },
    validationSchema: yup.object({
      email: yup
        .string('Enter your email')
        .required('* Required')
        .email('Enter a vaild Email'),
    }),
    onSubmit: async (values) => {
      try {
        let resetData = await axios.post(
          'https://shortly-qg2a.onrender.com/api/users/forget-password',
          values
        );
        setSuccMs(resetData.data.message);
      } catch (error) {
        setErrorMsg(error.response.data.message);
        console.log(error);
      }
    },
  });
  return (
    <div>
      <div className='container'>
        <div className='row'>
          <div className='col-5 mx-auto'>
            {errorMsg ? (
              <div
                className='alert alert-danger text-center mt-5 alert-dismissible fade show'
                role='alert'>
                {errorMsg}
                <button
                  type='button'
                  class='btn-close'
                  data-bs-dismiss='alert'
                  aria-label='Close'></button>
              </div>
            ) : (
              ''
            )}
            {succMsg ? (
              <div
                className='alert alert-success text-center mt-5 alert-dismissible fade show'
                role='alert'>
                {succMsg}
                <button
                  type='button'
                  class='btn-close'
                  data-bs-dismiss='alert'
                  aria-label='Close'></button>
              </div>
            ) : (
              ''
            )}
          </div>
        </div>
      </div>
      <div className='container'>
        <div className='row'>
          <div className='col-sm-10 col-md-8 col-lg-6 col-xl-5 mx-auto'>
            <div className='card border-0 shadow rounded-5 my-5'>
              <div className='card-body p-4 p-sm-5'>
                <h5 className='card-title text-center mb-3 fw-light fs-5'>
                  Forgot Password?
                </h5>
                <form onSubmit={formik.handleSubmit}>
                  <div className='form-floating mb-3'>
                    <input
                      type='email'
                      onBlur={formik.handleBlur}
                      onChange={formik.handleChange}
                      name='email'
                      value={formik.values.email}
                      className='form-control'
                      id='floatingInput'
                      placeholder='name@example.com'
                      style={{
                        border: formik.errors.email
                          ? '1px solid red'
                          : formik.values.email !== '' && !formik.errors.email
                          ? '1px solid green'
                          : '',
                      }}
                    />
                    <label htmlFor='floatingInput'>Email address</label>
                    {formik.touched.email && formik.errors.email ? (
                      <small style={{ color: 'red' }}>
                        {formik.errors.email}
                      </small>
                    ) : null}

                    {formik.values.email !== '' && !formik.errors.email ? (
                      <small style={{ color: 'green' }}>Looks good!</small>
                    ) : null}
                  </div>
                  <div className='d-grid'>
                    <button
                      className='btn btn-primary btn-login text-uppercase fw-bold'
                      type='submit'>
                      Send Recovery Email
                    </button>
                  </div>
                  <Link
                    to={'/login'}
                    className='d-block text-center mt-3 text-decoration-none'>
                    Have an account? Sign In
                  </Link>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ForgotPass;
