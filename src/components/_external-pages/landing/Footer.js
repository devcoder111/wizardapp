import clsx from 'clsx';
import React from 'react';
import PropTypes from 'prop-types';
import { Link as ScrollLink } from 'react-scroll';
import { makeStyles } from '@material-ui/core/styles';
import { Link, Container, Typography } from '@material-ui/core';
import Logo from '../../Logo';

// ----------------------------------------------------------------------

const useStyles = makeStyles((theme) => ({
  root: {
    textAlign: 'center',
    padding: theme.spacing(5, 0)
  }
}));

// ----------------------------------------------------------------------

Footer.propTypes = {
  className: PropTypes.string
};

function Footer({ className }) {
  const classes = useStyles();

  return (
    <Container maxWidth="lg" className={clsx(classes.root, className)}>
      <ScrollLink to="move_top">
        <Logo sx={{ mb: 1, mx: 'auto' }} />
      </ScrollLink>
      <Typography variant="caption">
        <Link href="https://seylabs.com/">Privacy Policy</Link> |
        <Link href="https://seylabs.com/"> Terms & Conditions</Link> |
        <Link href="https://seylabs.com/"> Data Protection</Link>
      </Typography>
      <br />
      <Typography variant="caption">
        © All rights reserved
        <br /> 2021 &nbsp;
        <Link href="https://seylabs.com/">Seylabs Inc.</Link>
      </Typography>
    </Container>
  );
}

export default Footer;
