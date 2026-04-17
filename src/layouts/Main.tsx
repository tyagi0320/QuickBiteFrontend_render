import NavBar from "../pages/Main/NavBar"
import {Outlet} from 'react-router-dom'
import Container from '@mui/material/Container';
const Main = () => {
  return (
    <main>
        <NavBar />
        <Container>
             <Outlet />
        </Container>
    </main>
  )
}

export default Main