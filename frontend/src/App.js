import { RouterProvider } from './context/RouterContext'
import { HomePage } from './pages/HomePage'
import { Container } from '@mui/material'

export const App = () => {
  return (
    <RouterProvider>
      <Container maxWidth='lg'>
        <HomePage />
      </Container>
    </RouterProvider>
  )

};
