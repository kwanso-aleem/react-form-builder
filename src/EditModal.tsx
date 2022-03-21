import { useState, useEffect } from 'react';

import {
  Dialog,
  DialogContent,
  Grid,
  FormControlLabel,
  Checkbox,
  TextField,
  MenuItem,
  Box,
  Button,
} from '@mui/material';
import { Form, Formik } from 'formik';

//user imports

import { COLUMN_LENGTH, MENU_PROPS } from './constants';
import { formInitialType } from './interfaces';

//interfaces

interface Props {
  open: boolean;
  closeModalHanlder: () => void;
  submitHandler: (values: any) => void;
  selected: formInitialType;
}

//constants

const initialValues:formInitialType = {
  id: '',
  content: '',
  name: '',
  type: '',
  objectName: '',
  css: '',
  column: 12,
  placeholder: '',
  required: false,
  list: '',
};

//component

const EditModal = ({
  open,
  closeModalHanlder,
  submitHandler,
  selected,
}: Props) => {
  //states

  const [formInitialValues, setFormInitialValues] =
    useState<formInitialType>(initialValues);

  //life cycle hook

  useEffect(() => {
    selected && setFormInitialValues(selected);
    return () => {
      setFormInitialValues(initialValues);
    };
  }, [selected]);

  //render

  return (
    <Dialog open={!!open} onClose={closeModalHanlder} fullWidth maxWidth={'md'}>
      <DialogContent dividers>
        <Formik
          initialValues={formInitialValues}
          onSubmit={submitHandler}
          enableReinitialize
        >
          {({ values, handleChange }) => (
            <Form>
              <Grid container spacing={2}>
                <Grid item md={12}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        name='required'
                        checked={values.required}
                        onChange={handleChange}
                      />
                    }
                    label='Required'
                  />
                </Grid>
                <Grid item md={12}>
                  <TextField
                    label='Name'
                    name={'objectName'}
                    onChange={handleChange}
                    value={values.objectName}
                    fullWidth
                  />
                </Grid>
                <Grid item md={12}>
                  <TextField
                    label='Label'
                    name={'content'}
                    onChange={handleChange}
                    value={values.content}
                    fullWidth
                  />
                </Grid>
                <Grid item md={12}>
                  <TextField
                    label='Classes'
                    name={'css'}
                    onChange={handleChange}
                    value={values.css}
                    fullWidth
                  />
                </Grid>
                <Grid item md={12}>
                  <TextField
                    label='Placeholder'
                    name={'placeholder'}
                    onChange={handleChange}
                    value={values.placeholder}
                    fullWidth
                  />
                </Grid>
                <Grid item md={12}>
                  <TextField
                    label='Select a column'
                    name={'column'}
                    onChange={handleChange}
                    value={values.column}
                    select
                    SelectProps={{
                      displayEmpty: true,
                      MenuProps: MENU_PROPS,
                    }}
                    fullWidth
                  >
                    <MenuItem value={''} disabled>
                      Please Select a column length
                    </MenuItem>
                    {COLUMN_LENGTH?.map((col, index) => (
                      <MenuItem key={`${col}-${index}`} value={col}>
                        {col}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>

                <Grid item md={12}>
                  <Box display={'flex'} justifyContent={'flex-end'}>
                    <Box marginX={2}>
                      <Button onClick={closeModalHanlder} variant={'contained'}>
                        Cancel
                      </Button>
                    </Box>

                    <Button type='submit' variant={'contained'}>
                      Save changes
                    </Button>
                  </Box>
                </Grid>
              </Grid>
            </Form>
          )}
        </Formik>
      </DialogContent>
    </Dialog>
  );
};

export default EditModal;
