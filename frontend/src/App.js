import { RouterProvider } from './context/RouterContext'
import { HomePage } from './pages/HomePage'
import { Container } from '@mui/material'

export const App = () => {
  return (
    <RouterProvider>
      <div style={{marginLeft:100, marginRight:100}}>
      <HomePage />
      </div>
    </RouterProvider>
  )

};
