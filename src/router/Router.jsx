import { createBrowserRouter } from "react-router";
import AuthLayout from "../layouts/AuthLayout";
import DashboardLayout from "../layouts/DashboardLayout";
import HomeLayout from "../layouts/HomeLayout";
import AllEmployeeList from "../pages/Admin/AllEmployeeList";
import Messages from "../pages/Admin/Messages";
import Payroll from "../pages/Admin/Payroll";
import Login from "../pages/Authentication/Login";
import Register from "../pages/Authentication/Register";
import ContactUs from "../pages/Contact";
import Dashboard from "../pages/Dashboard";
import PaymentHistory from "../pages/employee/PaymentHistory";
import WorkSheet from "../pages/employee/WorkSheet";
import Home from "../pages/Home/Home";
import Details from "../pages/hr/Details";
import EmployeeList from "../pages/hr/EmplyeeList";
import Progress from "../pages/hr/Progress";
import MakeAdmin from "../pages/MakeAdmin";
import ErrorPage from "../pages/others/ErrorPage";
import Forbidden from "../pages/others/Forbidden";
import PayGate from "../pages/PayGate/PayGate";
import AdminRoute from "./AdminRoute";
import HRRoute from "./HRRoute";
import PrivateRoute from "./PrivateRoute";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayout />,
     errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Home />
      },
      {
        path:'/forbidden',
        element:<Forbidden/>
      }
    ]

  },
  {
    path: '/',
    element: <AuthLayout />,
    children: [
      {
        path: 'login',
        element: <Login />
      },
      {
        path: 'register',
        element: <Register />
      },
      {
        path: 'contact-us',
        element: <ContactUs />
      }
    ]
  },
  {
    path: '/dashboard',
    element:<PrivateRoute> <DashboardLayout></DashboardLayout></PrivateRoute>
    ,
     errorElement: <ErrorPage />,
    children: [
       {
        path: '/dashboard/home',
        element: <Dashboard />
      },
      {
        path: '/dashboard/workSheet',
        element: <WorkSheet />
      },
      {
        path: '/dashboard/payments',
        element: <PaymentHistory />
      },
      {
        path: '/dashboard/employees',
        element: <HRRoute><EmployeeList /></HRRoute>
      },
      {
        path: "/dashboard/details/:slug",
        element: <HRRoute><Details /></HRRoute>

      },
            {
        path: "/dashboard/progress",
        element: <HRRoute><Progress /></HRRoute>
      },
       {
        path: "/dashboard/all-employees",
        element:<AdminRoute> <AllEmployeeList /></AdminRoute>
      },
       {
        path: "/dashboard/payroll",
        element: <AdminRoute><Payroll /></AdminRoute>
      },
      {
        path: '/dashboard/payment/:paymentId',
        element: <AdminRoute><PayGate/></AdminRoute>
      },
      {
         
        path: '/dashboard/makeAdmin',
        element:<AdminRoute> <MakeAdmin/></AdminRoute>
      
      },
      {
          
        path: '/dashboard/messages',
        element:<AdminRoute><Messages/></AdminRoute>
      }

    ]
  }
]);