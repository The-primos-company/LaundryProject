import { RouterProvider } from './context/RouterContext'
import { HomePage } from './pages/HomePage'

export const App = () => {
  return (
    <RouterProvider>
      <HomePage />
    </RouterProvider>
  )

};
