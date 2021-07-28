import { Link as ScrollLink } from 'react-scroll';
import { useLocation, Outlet } from 'react-router-dom';
// material
import { Box, Link, Container, Typography } from '@material-ui/core';
// components
import Logo from '../../components/Logo';
//
import MainNavbar from './MainNavbar';
import MainFooter from './MainFooter';

// ----------------------------------------------------------------------

export default function MainLayout() {
  const { pathname } = useLocation();
  const isHome = pathname === '/';

  return (
    <>
      <MainNavbar />
      <div>
        <Outlet />
      </div>

      {!isHome ? (
        <MainFooter />
      ) : (
        <Box
          sx={{
            py: 5,
            textAlign: 'center',
            position: 'relative',
            bgcolor: 'background.default'
          }}
        >
          <Container maxWidth="lg">
            <ScrollLink to="move_top" spy smooth>
              <Logo sx={{ mb: 1, mx: 'auto', cursor: 'pointer' }} />
            </ScrollLink>

            <Typography variant="caption">
              <Link href="https://seylabs.com/">Privacy Policy</Link> |
              <Link href="https://seylabs.com/"> Terms & Conditions</Link> |
              <Link href="https://seylabs.com/"> Data Protection</Link>
            </Typography>
            <br />
            <Typography variant="caption">
              2021 | © All rights reserved
              <br /> &nbsp;
              <Link href="https://seylabs.com/">Seylabs Inc.</Link>
            </Typography>
          </Container>
        </Box>
      )}
    </>
  );
}
