import clsx from 'clsx';
import React from 'react';
import PropTypes from 'prop-types';
import { OpacityRounded } from '@material-ui/icons';
import { alpha, makeStyles } from '@material-ui/core/styles';
import { Grid, Card, Container, Typography } from '@material-ui/core';
import breakpoints from '../../../theme/breakpoints';
import { varFadeInUp, MotionInView, varFadeInDown } from '../../animate';

// ----------------------------------------------------------------------

const CARDS = [
  {
    icon: '/static/images/Search.svg',
    title: '1',
    description: 'Search for Labs based on your location and test requirements.'
  },
  {
    icon: '/static/images/Schedule.svg',
    title: '2',
    description: 'Schedule an appointment to visit a lab or to receive the sample collection kit.'
  },
  {
    icon: '/static/images/Payment.svg',
    title: '3',
    description: 'Pay for test online, directly via bank transfer or using your Debit/Credit Cards.'
  },
  {
    icon: '/static/images/Message.svg',
    title: '4',
    description: 'Receive test results as SMS, Email or other shareable document format.'
  }
];

const useStyles = makeStyles((theme) => {
  const isLight = theme.palette.mode === 'light';

  const shadowCard = (opacity) =>
    isLight ? alpha(theme.palette.grey[500], OpacityRounded) : alpha(theme.palette.common.black, OpacityRounded);

  const shadowIcon = (color) =>
    isLight ? alpha(theme.palette.grey[500], OpacityRounded) : alpha(theme.palette.common.black, OpacityRounded);

  return {
    root: {
      paddingTop: theme.spacing(15),
      [theme.breakpoints.up('md')]: {
        paddingBottom: theme.spacing(15)
      }
    },
    heading: {
      marginBottom: theme.spacing(10),
      [theme.breakpoints.up('md')]: {
        marginBottom: theme.spacing(15)
      }
    },
    card: {
      maxWidth: 250,
      minHeight: 440,
      backgroundColor: theme.palette.primary,
      margin: 'auto',
      textAlign: 'center',
      padding: theme.spacing(5, 5, 0),
      boxShadow: `-40px 40px 80px 0 ${shadowCard(0.4)}`,
      [theme.breakpoints.up('md')]: {
        backgroundColor: theme.palette.grey[isLight ? 200 : 800]
      }
    },
    cardLeft: {
      [theme.breakpoints.up('md')]: {
        marginTop: -40
      }
    },
    cardRight: {
      [theme.breakpoints.up('md')]: {
        marginTop: -40
      }
    },
    cardCenter: {
      [theme.breakpoints.up('md')]: {
        marginTop: -40
      }
    },
    cardMiddle: {
      [theme.breakpoints.up('md')]: {
        marginTop: -40
      }
    },
    cardIcon: {
      width: 150,
      height: 150,
      margin: 'auto',
      marginTop: theme.spacing(8)
    },
    cardIconLeft: shadowIcon('info'),
    cardIconCenter: shadowIcon('info'),
    cardIconMiddle: shadowIcon('info'),
    cardIconRight: shadowIcon('info')
  };
});

// ----------------------------------------------------------------------

LandingHowItWorks.propTypes = {
  className: PropTypes.string
};

function LandingHowItWorks({ className }) {
  const classes = useStyles();
  const isDesktop = breakpoints.values.lg;

  return (
    <div className={clsx(classes.root, className)}>
      <Container maxWidth="lg">
        <div className={classes.heading}>
          <MotionInView variants={varFadeInUp}>
            <Typography gutterBottom variant="h2" align="center" sx={{ color: 'text.primary', display: 'block' }}>
              How it Works
            </Typography>
          </MotionInView>
          <MotionInView variants={varFadeInDown}>
            <Typography variant="overline" align="center" sx={{ color: 'text.secondary', display: 'block' }}>
              Using our platform is broken down into four simple steps.
            </Typography>
          </MotionInView>
        </div>

        <Grid container spacing={isDesktop ? 10 : 5}>
          {CARDS.map((card, index) => (
            <Grid key={card.title} item xs={12} md={3}>
              <MotionInView variants={varFadeInUp}>
                <Card
                  className={clsx(classes.card, {
                    [classes.cardLeft]: index === 0,
                    [classes.cardCenter]: index === 1,
                    [classes.cardMiddle]: index === 2,
                    [classes.cardRight]: index === 3
                  })}
                >
                  <Typography variant="h2" paragraph>
                    {card.title}
                  </Typography>
                  <Typography sx={{ color: 'text.secondary' }}>{card.description}</Typography>
                  <img
                    src={card.icon}
                    alt={card.title}
                    className={clsx(classes.cardIcon, {
                      [classes.cardIconLeft]: index === 0,
                      [classes.cardIconCenter]: index === 1,
                      [classes.cardIconMiddle]: index === 2,
                      [classes.cardIconRight]: index === 3
                    })}
                  />
                </Card>
              </MotionInView>
            </Grid>
          ))}
        </Grid>
      </Container>
    </div>
  );
}

export default LandingHowItWorks;
