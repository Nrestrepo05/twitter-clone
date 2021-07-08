import { Formik } from 'formik';
import { useRouter } from 'next/router';
import Link from 'next/link';

const Login = ({backendHost}) => {
  const router = useRouter();
  return (
    <>
      <div className="main light-pallete">
        <Formik 
          initialValues={{ username: "", password: ""}}
          validate={values => {
            const errors = {};
            if (!values.username) {errors.username = "Username is required"}
            if (!values.password) {errors.password = "Password is required"}
            return errors;
          }}
          onSubmit={async (values, { setSubmitting, setErrors }) => {
            const response = await fetch(`${backendHost}/users/login`, {
              method: 'POST',
              mode: 'cors',
              headers: {
                'Content-Type': 'application/json'
              },
              referrerPolicy: 'no-referrer',
              body: JSON.stringify({ user: values })
            });
            const data = await response.json();
            if (data.error) {
              const errors = {}
              if (data.error) {
                errors.username = "user and password do not match"
              }
              setErrors(errors)
              setSubmitting(false);
            } else {
              localStorage.setItem("userId", data.body._id)
              router.push('/');
            }
          }}
          >
            {({
              values,
              errors,
              touched,
              handleChange,
              handleBlur,
              handleSubmit,
              isSubmitting,
            }) => (
              <form onSubmit={handleSubmit}>
                <h2>Log In!</h2>
                <div className={errors.username ? "field error" : "field"}>
                  <label htmlFor="username">Username or Email</label>
                  <input
                    type="text"
                    name="username"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.username}
                    placeholder="Username"
                    className={errors.username ? "error" : ""}
                  />
                  {errors.username && touched.username && <span>{errors.username}</span>}
                </div>
                <div className={errors.password ? "field error" : "field"}>
                  <label htmlFor="password">Password</label>
                  <input
                    type="password"
                    name="password"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.password}
                    placeholder="Password"
                    className={errors.password ? "error" : ""}
                  />
                  <span>
                    {errors.password && touched.password && <span>{errors.password}</span>}
                  </span>
                </div>
                <div className="links">
                  <Link href="/signup">
                    <a>
                      Create an account here!
                    </a>
                  </Link>
                </div>
                <button type="submit" disabled={isSubmitting}>
                  Submit
                </button>
              </form>
            )}
        </Formik>
      </div>
      <style jsx>
        {`
          .main {
            display: flex;
            align-items: center;
            justify-content: center;
            min-height: 100vh;
            background: var(--accent-four);
          }
          form {
            width: 50%;
            display: flex;
            align-items: center;
            flex-direction: column;
            justify-content: center;
            background: var(--secondary);
            padding: 30px 0;
            border-radius: 20px;
          }
          .field {
            margin: 5px 0;
            width: 80%;
          }
          .field span {
            font-size: 14px;
          }
          .field.error {
            color: var(--primary-error);
          }
          input {
            width: calc(100% - 20px);
            height: 50px;
            border-radius: 7px;
            padding: 0 10px;
            border: 1px solid var(--accent-three);
          }
          input.error {
            border-color: var(--primary-error);
          }
          input:focus {
            outline: none;
            border: 2px solid var(--primary);
          }
          button {
            width: 80%;
            height: 40px;
            margin-top: 10px;
            border-radius: 20px;
            border: none;
            background-color: var(--primary);
            color: white;
            font-weight: bold;
          }
          label {
            margin-left: 5px;
          }
          .links {
            width: 80%;
            display: flex;
            justify-content: start;
            margin-bottom: 5px;
          }
          a {
            color: var(--primary);
            text-decoration: none;
          }
          @media screen and (max-width: 767px) {
            form {
              width: 80%;
            }
          }
          @media screen and (max-width: 475px) {
            form {
              width: 90%;
            }
          }
        `}
      </style>
    </>
  );
};

export async function getServerSideProps() {
  return {props: {backendHost: process.env.BACKEND_HOST}}
}

export default Login;
