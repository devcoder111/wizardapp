import { Icon } from '@iconify/react';
import React from 'react';
import { experimentalStyled as styled, makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import DirectionsIcon from '@material-ui/icons/Directions';
import { display } from '@material-ui/system';
import { motion } from 'framer-motion';
import searchFill from '@iconify/icons-eva/search-fill';
import { Link as RouterLink } from 'react-router-dom';
// material
import { Button, TextField, Box, Link, Container, Typography, Stack } from '@material-ui/core';
// routes
import { PATH_DASHBOARD } from '../../../routes/paths';
//
import { varFadeIn, varFadeInUp, varWrapEnter, varFadeInRight } from '../../animate';

// ----------------------------------------------------------------------

const RootStyle = styled(motion.div)(({ theme }) => ({
  position: 'relative',
  backgroundColor: theme.palette.grey[100],
  [theme.breakpoints.up('md')]: {
    top: 0,
    left: 0,
    width: '100%',
    height: '100vh',
    display: 'flex',
    position: 'fixed',
    alignItems: 'center'
  }
}));

const useStyles = makeStyles((theme) => ({
  root: {
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
    width: 400
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1
  },
  iconButton: {
    padding: 10
  },
  divider: {
    height: 28,
    margin: 4
  }
}));

const ContentStyle = styled((props) => <Stack spacing={5} {...props} />)(({ theme }) => ({
  zIndex: 10,
  maxWidth: 520,
  margin: 'auto',
  textAlign: 'center',
  position: 'relative',
  paddingTop: theme.spacing(15),
  paddingBottom: theme.spacing(15),
  [theme.breakpoints.up('md')]: {
    margin: 'unset',
    textAlign: 'left'
  }
}));

const HeroOverlayStyle = styled(motion.img)({
  zIndex: 9,
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  position: 'absolute'
});

const HeroImgStyle = styled(motion.img)(({ theme }) => ({
  top: 0,
  right: 0,
  bottom: 0,
  zIndex: 8,
  width: '100%',
  margin: 'auto',
  position: 'absolute',
  filter: `drop-shadow(40px 80px 80px rgba(0, 0, 0, 0.48))`,
  [theme.breakpoints.up('lg')]: {
    right: '8%',
    width: 'auto',
    height: '75vh'
  }
}));

// ----------------------------------------------------------------------

export default function LandingHero() {
  const classes = useStyles();

  return (
    <>
      <RootStyle initial="initial" animate="animate" variants={varWrapEnter}>
        {/* <HeroOverlayStyle alt="overlay" src="/static/overlay.svg" variants={varFadeIn} /> */}

        <HeroImgStyle
          noBlur
          noPlaceholder
          variants={varFadeInUp}
          alt="Seylabs_Image"
          src="/static/home/directions.svg"
          display={{ xs: 'none', md: 'block' }}
        />

        <Container maxWidth="lg">
          <ContentStyle>
            <motion.div variants={varFadeInRight}>
              <Typography variant="h1" sx={{ color: 'primary.main' }}>
                Find Labs. <br />
                Quality
                <Typography component="span" variant="h1" sx={{ color: 'primary.main' }}>
                  &nbsp;Labs.
                </Typography>
              </Typography>
            </motion.div>

            <motion.div variants={varFadeInRight}>
              <Typography sx={{ color: 'primary.light' }}>
                Looking for a medical laboratory to do a test? <br />
                Use seylabs to Find labs, Book appointments, Receive and Share your test Results, all in one place.
              </Typography>
            </motion.div>

            <Stack
              component={motion.div}
              variants={varFadeInRight}
              direction="row"
              spacing={1}
              justifyContent={{ xs: 'center', md: 'flex-start' }}
            >
              {/* <img alt="sketch icon" src="/static/home/ic_sketch.svg" width={20} height={20} /> */}
              <Link
                component={RouterLink}
                to="/auth/register-laboratory"
                underline="always"
                sx={{ color: 'primary.lighter' }}
              >
                Own a Lab? Partner with Us
              </Link>
            </Stack>

            <motion.div variants={varFadeInRight}>
              <Paper component="form" className={classes.root}>
                <IconButton className={classes.iconButton} aria-label="menu">
                  <MenuIcon />
                </IconButton>
                <InputBase
                  className={classes.input}
                  placeholder="Search Google Maps"
                  inputProps={{ 'aria-label': 'search google maps' }}
                />
                <IconButton type="submit" className={classes.iconButton} aria-label="search">
                  <SearchIcon />
                </IconButton>
                <Divider className={classes.divider} orientation="vertical" />
                <IconButton color="primary" className={classes.iconButton} aria-label="directions">
                  <DirectionsIcon />
                </IconButton>
              </Paper>
            </motion.div>

            <motion.div variants={varFadeInRight}>
              <Button
                size="large"
                variant="contained"
                component={RouterLink}
                to={PATH_DASHBOARD.root}
                startIcon={<Icon icon={searchFill} width={20} height={20} />}
              >
                Find Labs
              </Button>
            </motion.div>

            {/* <Stack direction="row" spacing={1.5} justifyContent={{ xs: 'center', md: 'flex-start' }}>
              <motion.img variants={varFadeInRight} src="/static/home/ic_m_sketch.svg" />
              <motion.img variants={varFadeInRight} src="/static/home/ic_m_figma.svg" />
              <motion.img variants={varFadeInRight} src="/static/home/ic_m_material.svg" />
              <motion.img variants={varFadeInRight} src="/static/home/ic_m_react.svg" />
              <motion.img variants={varFadeInRight} src="/static/home/ic_m_js.svg" />
              <motion.img variants={varFadeInRight} src="/static/home/ic_m_ts.svg" />
            </Stack> */}
          </ContentStyle>
        </Container>
      </RootStyle>
      <Box sx={{ height: { md: '100vh' } }} />
    </>
  );
}
