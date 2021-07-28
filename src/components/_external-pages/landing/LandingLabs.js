import clsx from 'clsx';
import React from 'react';
import PropTypes from 'prop-types';
import { Link as RouterLink } from 'react-router-dom';
import { alpha, makeStyles } from '@material-ui/core/styles';
import { Button, Box, Grid, Container, Typography } from '@material-ui/core';
import { PATH_AUTH, PATH_PAGE } from '../../../routes/paths';
import breakpoints from '../../../theme/breakpoints';
import { varFadeInUp, varFadeInRight, MotionInView, varFadeInDown } from '../../animate';

// ----------------------------------------------------------------------

const useStyles = makeStyles((theme) => {
  const isRTL = theme.direction === 'rtl';

  return {
    root: {
      padding: theme.spacing(15, 0),
      backgroundImage:
        theme.palette.mode === 'light'
          ? `linear-gradient(180deg, ${alpha(theme.palette.grey[300], 0)} 0%, ${theme.palette.grey[300]} 100%)`
          : 'none'
    },
    content: {
      maxWidth: 520,
      margin: 'auto',
      textAlign: 'center',
      marginBottom: theme.spacing(10),
      [theme.breakpoints.up('md')]: {
        height: '100%',
        marginBottom: 5,
        textAlign: 'left',
        display: 'inline-flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'center',
        paddingRight: theme.spacing(5)
      }
    },
    screen: {
      bottom: 0,
      maxWidth: 460,
      position: 'absolute'
    },
    screenLeft: { zIndex: 3 },
    screenRight: { zIndex: 1 },
    screenCenter: {
      position: 'relative',
      zIndex: 2,
      bottom: 20,
      transform: isRTL ? 'translateX(-24%)' : 'translateX(24%)',
      [theme.breakpoints.up('sm')]: {
        bottom: 40,
        transform: isRTL ? 'translateX(-32%)' : 'translateX(32%)'
      }
    }
  };
});

const variantScreenLeftMoblie = {
  initial: { x: '22%', y: -10, opacity: 0 },
  animate: { x: 0, y: 0, opacity: 1 }
};
const variantScreenRightMobile = {
  initial: { x: '26%', y: -30, opacity: 0 },
  animate: { x: '48%', y: -40, opacity: 1 }
};
const variantScreenLeft = {
  initial: { x: '30%', y: -30, opacity: 0 },
  animate: { x: 0, y: 0, opacity: 1 }
};
const variantScreenCenter = {
  initial: { opacity: 0 },
  animate: { opacity: 1 }
};
const variantScreenRight = {
  initial: { x: '34%', y: -50, opacity: 0 },
  animate: { x: '64%', y: -80, opacity: 1 }
};
const transition = { duration: 0.5, ease: 'easeOut' };

// ----------------------------------------------------------------------

LandingLabs.propTypes = {
  className: PropTypes.string
};

function LandingLabs({ className }) {
  const classes = useStyles();
  const upSm = breakpoints.values.sm;
  const upMd = breakpoints.values.md;
  const textAnimate = upMd ? varFadeInRight : varFadeInUp;
  const screenLeftAnimate = upSm ? variantScreenLeft : variantScreenLeftMoblie;
  const screenCenterAnimate = variantScreenCenter;
  const screenRightAnimate = upSm ? variantScreenRight : variantScreenRightMobile;

  // const getImg = (width, index) =>
  //   `${BASE_IMG}w_${width}/v1611472901/upload_minimal/home/screen_${
  //     theme.palette.mode === 'light' ? 'light' : 'dark'
  //   }_${index + 1}.png`;

  return (
    <div className={clsx(classes.root, className)}>
      <Container maxWidth="lg">
        <Grid container spacing={5}>
          <Grid item xs={12} md={4} lg={5}>
            <div className={classes.content}>
              <MotionInView variants={textAnimate}>
                <Typography gutterBottom variant="overline" sx={{ color: 'text.secondary', display: 'block' }}>
                  How it Works
                </Typography>
              </MotionInView>

              <MotionInView variants={textAnimate}>
                <Typography variant="h2" paragraph>
                  For Medical Laboratories
                </Typography>
              </MotionInView>

              <MotionInView variants={textAnimate}>
                <Typography sx={{ color: 'text.secondary' }}>
                  As a medical laboratory, you can work with us to increase your revenue, grow your customer base, and
                  be a part of the future of medical testing in your community. While our focus is on providing great
                  service to our customers, we also recognize fact that fruitful partnerships with medical laboratories
                  in the community is vital.
                </Typography>
              </MotionInView>

              <MotionInView variants={textAnimate} sx={{ mt: 5 }}>
                <Button size="large" color="primary" variant="outlined" component={RouterLink} to={PATH_AUTH.register}>
                  Partner with Us
                </Button>
              </MotionInView>
            </div>
          </Grid>

          <Grid
            dir="ltr"
            item
            xs={12}
            md={8}
            lg={7}
            sx={{
              position: 'relative',
              pl: { sm: '16% !important', md: '0 !important' }
            }}
          >
            {[...Array(3)].map((screen, index) => (
              <MotionInView
                key={index}
                variants={
                  (index === 0 && screenLeftAnimate) || (index === 1 && screenCenterAnimate) || screenRightAnimate
                }
                transition={transition}
                className={clsx(classes.screen, {
                  [classes.screenLeft]: index === 0,
                  [classes.screenCenter]: index === 1,
                  [classes.screenRight]: index === 2
                })}
              >
                <Box
                  component="img"
                  alt={`screen ${index + 1}`}
                  src="/static/icons/Laboratory.svg"
                  variants={varFadeInUp}
                  className="lazyload"
                  sx={{ width: { xs: '80%', sm: '100%' } }}
                />
              </MotionInView>
            ))}
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}

export default LandingLabs;
