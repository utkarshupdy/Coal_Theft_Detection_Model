import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import store from './store/store.js'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import {Home, About, AddVehicle, Analyzer, Login, Signup, User, VehicleJourney} from './pages/index.js'


const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
        {
            path: "/",
            element: <Home />,
        },
        {
          path: "/login",
          element: <Login />,
        },
        {
          path: "/signup",
          element: <Signup />,
        },
        {
          path: "/about",
          element: <About />,
        },
        {
          path: "/analyzer",
          element: <Analyzer />,
        },
        {
          path: "/addvehicle",
          element: <AddVehicle />,
        },
        {
          path: "/user",
          element: <User />,
        },
        {
          path: "/vehiclejourney",
          element: <VehicleJourney />,
        }
    ],
  },
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>,
)
