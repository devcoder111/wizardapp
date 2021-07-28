import * as Yup from 'yup';
import { useState } from 'react';
import { Icon } from '@iconify/react';
import { useSnackbar } from 'notistack';
import { useFormik, Form, FormikProvider } from 'formik';
import eyeFill from '@iconify/icons-eva/eye-fill';
import closeFill from '@iconify/icons-eva/close-fill';
import eyeOffFill from '@iconify/icons-eva/eye-off-fill';
// material
import { TextField, IconButton, InputAdornment, Grid, Box } from '@material-ui/core';
import { LoadingButton } from '@material-ui/lab';
// hooks
import useAuth from '../../../hooks/useAuth';
import useIsMountedRef from '../../../hooks/useIsMountedRef';

import { MIconButton } from '../../@material-extend';

// ----------------------------------------------------------------------

export default function RegisterForm() {
  const { register } = useAuth();
  const isMountedRef = useIsMountedRef();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const [showPassword, setShowPassword] = useState(false);

  const RegisterSchema = Yup.object().shape({
    firstName: Yup.string().min(2, 'Too Short!').max(50, 'Too Long!').required('First name required'),
    lastName: Yup.string().min(2, 'Too Short!').max(50, 'Too Long!').required('Last name required'),
    email: Yup.string().email('Email must be a valid email address').required('Email is required'),
    phone: Yup.string().min(11, 'Too Short!').max(16, 'Too Long!').required('Phone Number is required'),
    password: Yup.string().required('Password is required'),
    dateOfBirth: Yup.string().typeError('Date of Birth must be a valid date').required('Date of Birth is required'),
    residentLocation: Yup.string().required('Location is required')
  });

  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      password: '',
      dateOfBirth: '',
      residentLocation: ''
    },
    validationSchema: RegisterSchema,
    onSubmit: async (values, { setErrors, setSubmitting }) => {
      try {
        await register({
          email: values.email,
          password: values.password,
          firstName: values.firstName,
          lastName: values.lastName,
          phone: values.phone,
          dateOfBirth: values.dateOfBirth,
          residentLocation: values.residentLocation,
          user_type: '1'
        });

        enqueueSnackbar('Register Success', {
          variant: 'success',
          action: (key) => (
            <MIconButton size="small" onClick={() => closeSnackbar(key)}>
              <Icon icon={closeFill} />
            </MIconButton>
          )
        });
        if (isMountedRef.current) {
          setSubmitting(false);
        }
      } catch (error) {
        enqueueSnackbar(error.message, {
          variant: 'fail',
          action: (key) => (
            <MIconButton size="small" onClick={() => closeSnackbar(key)}>
              <Icon icon={closeFill} />
            </MIconButton>
          )
        });
      }
    }
  });

  const { errors, touched, handleSubmit, isSubmitting, getFieldProps } = formik;

  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="First name"
              {...getFieldProps('firstName')}
              error={Boolean(touched.firstName && errors.firstName)}
              helperText={touched.firstName && errors.firstName}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Last name"
              {...getFieldProps('lastName')}
              error={Boolean(touched.lastName && errors.lastName)}
              helperText={touched.lastName && errors.lastName}
            />
          </Grid>
        </Grid>

        <Box sx={{ mb: 3 }} />
        <TextField
          fullWidth
          name="email"
          type="email"
          label="Email address"
          {...getFieldProps('email')}
          error={Boolean(touched.email && errors.email)}
          helperText={touched.email && errors.email}
        />
        <Box sx={{ mb: 3 }} />
        <TextField
          fullWidth
          name="phone"
          type="phone"
          label="Phone Number"
          {...getFieldProps('phone')}
          error={Boolean(touched.phone && errors.phone)}
          helperText={touched.phone && errors.phone}
        />
        <Box sx={{ mb: 3 }} />
        <TextField
          fullWidth
          type={showPassword ? 'text' : 'password'}
          label="Password"
          {...getFieldProps('password')}
          InputProps={{
            endAdornment: (
              <InputAdornment>
                <IconButton edge="end" onClick={() => setShowPassword((prev) => !prev)}>
                  <Icon icon={showPassword ? eyeFill : eyeOffFill} />
                </IconButton>
              </InputAdornment>
            )
          }}
          error={Boolean(touched.password && errors.password)}
          helperText={touched.password && errors.password}
        />
        <Box sx={{ mb: 3 }} />
        <TextField
          fullWidth
          name="dateOfBirth"
          id="date"
          type="date"
          label="Date of Birth"
          defaultValue="2006-01-01"
          InputLabelProps={{
            shrink: true
          }}
          {...getFieldProps('dateOfBirth')}
          error={Boolean(touched.dateOfBirth && errors.dateOfBirth)}
          helperText={touched.dateOfBirth && errors.dateOfBirth}
        />
        <Box sx={{ mb: 3 }} />
        <TextField
          fullWidth
          name="residentLocation"
          type="residentLocation"
          label="Resident Location"
          {...getFieldProps('residentLocation')}
          error={Boolean(touched.residentLocation && errors.residentLocation)}
          helperText={touched.residentLocation && errors.residentLocation}
        />
        <Box sx={{ mt: 3 }}>
          <LoadingButton fullWidth size="large" type="submit" variant="contained" pending={isSubmitting}>
            Register
          </LoadingButton>
        </Box>
      </Form>
    </FormikProvider>
  );
}
