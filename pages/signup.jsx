import { Formik } from 'formik';
import { useRouter } from 'next/router';
import Link from 'next/link';

const Signup = ({backendHost}) => {
  const router = useRouter();
  return (
    <>
      <div className="main light-pallete">
        <Formik 
          initialValues={{ name: "", email: "", username: "", password: "", passwordConfirmation: ""}}
          validate={values => {
            const errors = {};
            if (!values.email) {errors.email = "Email is required"}
            if (!values.username) {errors.username = "Username is required"}
            if (!values.name) {errors.name = "Name is required"}
            if (!values.password) {errors.password = "Password is required"}
            if (!values.passwordConfirmation) {errors.passwordConfirmation = "Password confirmation is required"}
            if (
              !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
            ) {
              errors.email = 'Invalid email address';
            }
            if (
              !/^(?=[a-zA-Z0-9._]{2,20}$)(?!.*[_.]{2})[^_.].*[^_.]$/i.test(values.username)
            ) {
              errors.username = 'Username can not contain special characters';
            }
            if (values.password !== values.passwordConfirmation) {
              errors.passwordConfirmation = 'Password and Password confirmation must match';
            }
            return errors;
          }}
          onSubmit={async (values, { setSubmitting, setErrors }) => {
            const response = await fetch(`${backendHost}/users/register`, {
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
              if (data.error.username) {
                errors.username = "a user with this username already exists"
              }
              if (data.error.email) {
                errors.email = "a user with this email already exists"
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
                <h2>Create your account!</h2>
                <div className={errors.name ? "field error" : "field"}>
                  <label htmlFor="name">Name</label>
                  <input
                    type="text"
                    name="name"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.name}
                    placeholder="Name"
                    className={errors.name ? "error" : ""}
                  />
                  {errors.name && touched.name && <span>{errors.name}</span>}
                </div>
                <div className={errors.username ? "field error" : "field"}>
                  <label htmlFor="username">Username</label>
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
                <div className={errors.email ? "field error" : "field"}>
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    name="email"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.email}
                    placeholder="Email"
                    className={errors.email ? "error" : ""}
                  />
                  {errors.email && touched.email && <span>{errors.email}</span>}
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
                <div className={errors.passwordConfirmation ? "field error" : "field"}>
                  <label htmlFor="passwordConfirmation">Password Confirmation</label>
                  <input
                    type="password"
                    name="passwordConfirmation"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.passwordConfirmation}
                    placeholder="Password Confirmation"
                    className={errors.passwordConfirmation ? "error" : ""}
                  />

                  {errors.passwordConfirmation && touched.passwordConfirmation && <span>{errors.passwordConfirmation}</span>}
                </div>
                <div className="links">
                  <Link href="/login">
                    <a>
                      Login here!
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

export default Signup;
