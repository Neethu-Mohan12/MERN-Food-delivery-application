import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../components/Loader";
import { useLoginMutation } from "../../redux/api/usersApiSlice";
import { setCredentials } from "../../redux/features/auth/authSlice";
import { toast } from "react-toastify";
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import Navigation from "./Navigation";

// Validation schema using Yup
const validationSchema = Yup.object({
  email: Yup.string().email('Invalid email address').required('Email is required'),
  password: Yup.string().required('Password is required')
});

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [login, { isLoading }] = useLoginMutation();
  const { userInfo } = useSelector((state) => state.auth);
  const { search } = useLocation();
  const sp = new URLSearchParams(search);
  const redirect = sp.get("redirect") || "/";

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [navigate, redirect, userInfo]);

  const submitHandler = async (values, { setSubmitting }) => {
    try {
      const res = await login(values).unwrap();
      dispatch(setCredentials({ ...res }));
      toast.success('Signed in successfully');
      navigate(redirect);
    } catch (error) {
      toast.error(error?.data?.message || error.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <Navigation />
      <div className="relative bg-cover bg-center bg-no-repeat min-h-screen flex items-center" style={{ backgroundImage: `url('./images/bg.jpg')` }}>
        <section className="flex flex-wrap m-auto p-4">
          <div className="p-4 bg-white m-auto rounded-xl w-full max-w-lg">
            <h1 className="text-2xl font-semibold mb-4 text-center">Sign In</h1>

            <Formik
              initialValues={{ email: '', password: '' }}
              validationSchema={validationSchema}
              onSubmit={submitHandler}
            >
              {({ isSubmitting }) => (
                <Form className="w-full">
                  <div className="mb-4">
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-400"
                    >
                      Email Address
                    </label>
                    <Field
                      type="email"
                      id="email"
                      name="email"
                      className="mt-1 p-2 border rounded w-full"
                      placeholder="Enter email"
                    />
                    <ErrorMessage name="email" component="p" className="text-red-500 text-sm mt-1" />
                  </div>

                  <div className="mb-4">
                    <label
                      htmlFor="password"
                      className="block text-sm font-medium text-gray-400"
                    >
                      Password
                    </label>
                    <Field
                      type="password"
                      id="password"
                      name="password"
                      className="mt-1 p-2 border rounded w-full"
                      placeholder="Enter password"
                    />
                    <ErrorMessage name="password" component="p" className="text-red-500 text-sm mt-1" />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting || isLoading}
                    className="bg-orange-500 text-white px-4 py-2 rounded cursor-pointer w-full"
                  >
                    {isLoading ? "Signing In..." : "Sign In"}
                  </button>

                  {isLoading && <Loader />}
                </Form>
              )}
            </Formik>

            <div className="mt-4 text-center">
              <p className="text-gray-700">
                New Customer?{" "}
                <Link
                  to={redirect ? `/register?redirect=${redirect}` : "/register"}
                  className="text-orange-600 hover:underline"
                >
                  Register
                </Link>
              </p>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Login;

