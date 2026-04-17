import {Outlet} from 'react-router-dom'
import Container from '@mui/material/Container';
import NavAdmin from '../pages/Admin/NavAdmin'
const Admin = () => {
  return (
    <main>
        <NavAdmin />
        <Container>
            <Outlet />
        </Container>
    </main>
  )
}

export default Admin