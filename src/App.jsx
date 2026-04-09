import "./style/Style.scss";
import { RouterProvider } from "react-router";
import { router } from "./app.routes.jsx";
import { AuthProvider } from './features/auth/auth.context.jsx';
import { InterviewProvider } from './features/interview/interview.context.jsx';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {

  return (
    <>
      <AuthProvider>
        <InterviewProvider>
          <RouterProvider router={router} />
          <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="colored"
          />
        </InterviewProvider>
      </AuthProvider>
    </>
  )
}

export default App
