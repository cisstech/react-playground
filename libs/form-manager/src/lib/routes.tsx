import { RouteObject } from 'react-router-dom'
import { TaskList } from './pages/TaskList'

export const formManagerRoutes = (baseUrl: string): RouteObject[] => [
  {
    path: `${baseUrl}form-manager`,
    element: <TaskList />,
  },
]
