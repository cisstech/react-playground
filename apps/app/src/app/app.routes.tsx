import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Home } from './pages/Home'
import { NotFound } from './pages/NotFound'
import { formManagerRoutes } from '@react-playground/form-manager'

const router = createBrowserRouter([
  {
    path: import.meta.env.BASE_URL,
    index: true,
    element: <Home />,
  },
  ...formManagerRoutes(import.meta.env.BASE_URL),
  {
    path: '*',
    element: <NotFound />,
  },
])

export const Routes = () => <RouterProvider router={router} />
