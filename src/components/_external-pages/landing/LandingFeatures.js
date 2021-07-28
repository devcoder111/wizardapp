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
    icon: '/static/icons/quality.svg',
    title: 'Quality Labs',
    description:
      'We partner with ONLY industry certified laboratories that also meet our stringent quality requirements.'
  },
  {
    icon: '/static/icons/schedule.svg',
    title: 'Schedule Visit',
    description: 'Make appointments with your preferred labs on a date and time that works for you best.'
  },
  {
    icon: '/static/icons/authentic.svg',
    title: 'Verifiable Results',
    description: 'The authenticity of your test results can be easily verified on our platform.'
  },
  {
    icon: '/static/icons/qr-code-scan.svg',
    title: 'Sharable Results',
    description: 'Easily share test results to third parties, in document format and mobile readable QR Codes.'
  },
  {
    icon: '/static/icons/recurring.svg',
    title: 'Manage Recurring Tests',
    description: 'We also help you manage recurring tests, ensuring that you do not miss any important test updates.'
  },
  {
    icon: '/static/icons/invoice.svg',
    title: 'Invoice Management',
    description:
      'With our app, you are also able to keep track of all your test invoices which could be shared with your insurance or HMO.'
  },
  {
    icon: '/static/icons/travel.svg',
    title: 'International Travel',
    description:
      'We also help you with country specific test requirements and help you ensure that you have all you need for that trip.'
  },
  {
    icon: '/static/icons/sample.svg',
    title: 'Test Sample Delivery',
    description: 'We can also send you a sample collection kit so that you can provide test samples wherever you are.'
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
      paddingTop: theme.spacing(5),
      [theme.breakpoints.up('md')]: {
        paddingBottom: theme.spacing(5)
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
      minHeight: 330,
      backgroundColor: theme.palette.primary,
      margin: 'auto',
      textAlign: 'center',
      padding: theme.spacing(5, 5, 0),
      boxShadow: `0px 0px 0px 0 ${shadowCard(0.4)}`,
      [theme.breakpoints.up('md')]: {}
    },
    cardLeft: {
      [theme.breakpoints.up('md')]: {
        marginTop: -100
      }
    },
    cardRight: {
      [theme.breakpoints.up('md')]: {
        marginTop: -100
      }
    },
    cardCenter: {
      [theme.breakpoints.up('md')]: {
        marginTop: -100
      }
    },
    cardMiddle: {
      [theme.breakpoints.up('md')]: {
        marginTop: -100
      }
    },
    // cardCenter: {
    //   [theme.breakpoints.up('md')]: {
    //     marginTop: -40,
    //     backgroundColor: theme.palette.background.grey,
    //     boxShadow: `-20px 20px 80px 0 ${shadowCard(0.4)}`,
    //     '&:before': {
    //       top: 0,
    //       left: 0,
    //       right: 0,
    //       bottom: 0,
    //       zIndex: -1,
    //       content: "''",
    //       margin: 'auto',
    //       position: 'absolute',
    //       width: 'calc(100% - 40px)',
    //       height: 'calc(100% - 40px)',
    //       borderRadius: theme.shape.borderRadiusMd,
    //       backgroundColor: theme.palette.background.paper,
    //       boxShadow: `-20px 20px 40px 0 ${shadowCard(0.12)}`
    //     }
    //   }
    // },
    cardIcon: {
      width: 40,
      height: 40,
      margin: 'auto',
      marginBottom: theme.spacing(4)
    },
    cardIconLeft: shadowIcon('info'),
    cardIconCenter: shadowIcon('info'),
    cardIconMiddle: shadowIcon('info'),
    cardIconRight: shadowIcon('info')
  };
});

// ----------------------------------------------------------------------

LandingFeatures.propTypes = {
  className: PropTypes.string
};

function LandingFeatures({ className }) {
  const classes = useStyles();
  const isDesktop = breakpoints.values.lg;

  return (
    <div className={clsx(classes.root, className)}>
      <Container maxWidth="lg">
        <div className={classes.heading}>
          <MotionInView variants={varFadeInUp}>
            <Typography gutterBottom variant="h2" align="center" sx={{ color: 'text.primary', display: 'block' }}>
              Our Features
            </Typography>
          </MotionInView>
          <MotionInView variants={varFadeInDown}>
            <Typography variant="overline" align="center" sx={{ color: 'text.secondary', display: 'block' }}>
              Bringing you a futuristic experience of random medical testing
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
                  <Typography variant="h5" paragraph>
                    {card.title}
                  </Typography>
                  <Typography sx={{ color: 'text.secondary' }}>{card.description}</Typography>
                </Card>
              </MotionInView>
            </Grid>
          ))}
        </Grid>
      </Container>
    </div>
  );
}

export default LandingFeatures;
