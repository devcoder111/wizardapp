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

export default function RegisterFormLab() {
  const { labRegister } = useAuth();
  const isMountedRef = useIsMountedRef();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const [showPassword, setShowPassword] = useState(false);

  const RegisterSchema = Yup.object().shape({
    proprietorFirstName: Yup.string().min(2, 'Too Short!').max(50, 'Too Long!').required('First name required'),
    proprietorLastName: Yup.string().min(2, 'Too Short!').max(50, 'Too Long!').required('Last name required'),
    proprietorDOB: Yup.string().typeError('Date of Birth must be a valid date').required('Date of Birth is required'),
    laboratoryName: Yup.string().min(2, 'Too Short!').max(50, 'Too Long!').required('Laboratory name required'),
    email: Yup.string().email('Email must be a valid email address').required('Email is required'),
    phone: Yup.string().min(11, 'Too Short!').max(16, 'Too Long!').required('Phone Number is required'),
    password: Yup.string().required('Password is required'),
    incorporationDate: Yup.string()
      .typeError('Incorporation date must be a valid date')
      .required('Incorporation date is required'),
    licence: Yup.string().min(5, 'Too Short!').max(20, 'Too Long!').required('Licence Number is required'),
    laboratoryAddress: Yup.string().required('Address is required'),
    city: Yup.string().required('City is required'),
    country: Yup.string().required('Country is required')
  });

  const formik = useFormik({
    initialValues: {
      proprietorFirstName: '',
      proprietorLastName: '',
      proprietorDOB: '',
      laboratoryName: '',
      email: '',
      phone: '',
      password: '',
      incorporationDate: '',
      licence: '',
      laboratoryAddress: '',
      city: '',
      country: ''
    },
    validationSchema: RegisterSchema,
    onSubmit: async (values, { setErrors, setSubmitting }) => {
      try {
        await labRegister({
          proprietorFirstName: values.proprietorFirstName,
          proprietorLastName: values.proprietorLastName,
          proprietorDOB: values.proprietorDOB,
          laboratoryName: values.laboratoryName,
          email: values.email,
          phone: values.phone,
          password: values.password,
          incorporationDate: values.incorporationDate,
          licence: values.licence,
          laboratoryAddress: values.laboratoryAddress,
          city: values.city,
          country: values.country
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
        // props.history.push('/auth/verify', { email: values.email, group: 'Users' });
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
        <Box sx={{ mb: 3 }} />
        <TextField
          fullWidth
          name="laboratoryName"
          type="laboratoryName"
          label="Laboratory Name"
          {...getFieldProps('laboratoryName')}
          error={Boolean(touched.laboratoryName && errors.laboratoryName)}
          helperText={touched.laboratoryName && errors.laboratoryName}
        />
        <Box sx={{ mb: 3 }} />
        <TextField
          fullWidth
          name="licence"
          type="licence"
          label="Licence Number"
          {...getFieldProps('licence')}
          error={Boolean(touched.licence && errors.licence)}
          helperText={touched.licence && errors.licence}
        />
        <Box sx={{ mb: 3 }} />
        <TextField
          fullWidth
          name="incorporationDate"
          id="date"
          type="date"
          label="Incorporation Date"
          defaultValue="2006-01-01"
          InputLabelProps={{
            shrink: true
          }}
          {...getFieldProps('incorporationDate')}
          error={Boolean(touched.incorporationDate && errors.incorporationDate)}
          helperText={touched.incorporationDate && errors.incorporationDate}
        />
        <Box sx={{ mb: 3 }} />
        <TextField
          fullWidth
          name="laboratoryAddress"
          type="laboratoryAddress"
          label="Laboratory Address"
          {...getFieldProps('laboratoryAddress')}
          error={Boolean(touched.laboratoryAddress && errors.laboratoryAddress)}
          helperText={touched.laboratoryAddress && errors.laboratoryAddress}
        />
        <Box sx={{ mb: 3 }} />
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="City"
              {...getFieldProps('city')}
              error={Boolean(touched.city && errors.city)}
              helperText={touched.city && errors.city}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Country"
              {...getFieldProps('country')}
              error={Boolean(touched.country && errors.country)}
              helperText={touched.country && errors.country}
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
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Proprietor First name"
              {...getFieldProps('proprietorFirstName')}
              error={Boolean(touched.proprietorFirstName && errors.proprietorFirstName)}
              helperText={touched.proprietorFirstName && errors.proprietorFirstName}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Proprietor Last name"
              {...getFieldProps('proprietorLastName')}
              error={Boolean(touched.proprietorLastName && errors.proprietorLastName)}
              helperText={touched.proprietorLastName && errors.proprietorLastName}
            />
          </Grid>
        </Grid>

        <Box sx={{ mb: 3 }} />
        <TextField
          fullWidth
          name="proprietorDOB"
          id="date"
          type="date"
          label="Proprietor Date of Birth"
          defaultValue="2006-01-01"
          InputLabelProps={{
            shrink: true
          }}
          {...getFieldProps('proprietorDOB')}
          error={Boolean(touched.proprietorDOB && errors.proprietorDOB)}
          helperText={touched.proprietorDOB && errors.proprietorDOB}
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
