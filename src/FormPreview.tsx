import React, { memo } from 'react';

import {
  Button,
  Dialog,
  DialogContent,
  Grid,
  TextField,
  Box,
} from '@mui/material';
import { Form, Formik } from 'formik';

import { formValuesTypes } from './interfaces';

interface formPreviewProps {
  open: Boolean;
  closeModalHanlder: () => void;
  data: formValuesTypes[];
}

const initialValues = {};

const FormPreview = ({ open, closeModalHanlder, data }: formPreviewProps) => {
  //form submit handler

  const submitHandler = (values: any) => {
    debugger;
  };

  //render

  return (
    <Dialog open={!!open} onClose={closeModalHanlder} fullWidth maxWidth={'md'}>
      <DialogContent dividers>
        <Formik initialValues={initialValues} onSubmit={submitHandler}>
          {({ touched, errors, handleChange, values, handleSubmit }) => (
            <Form onSubmit={handleSubmit}>
              <Grid container spacing={2}>
                {data?.map((item, index) => (
                  <Grid item md={item?.col} key={`${item.id}-${index}`}>
                    <Grid container spacing={2}>
                      {item?.fields?.map((field) => (
                        <Grid
                          item
                          md={field?.column}
                          key={`${item?.id}-${field?.id}`}
                        >
                          <TextField
                            label={field?.content}
                            placeholder={field?.placeholder}
                            type={field?.type}
                            name={field?.objectName}
                            className={field?.css}
                            required={field?.required || false}
                            onChange={handleChange}
                            fullWidth
                            InputLabelProps={{
                              shrink: true,
                            }}
                          />
                        </Grid>
                      ))}
                    </Grid>
                  </Grid>
                ))}
              </Grid>

              <Box marginY={2} display={'flex'} justifyContent={'flex-end'}>
                <Box marginX={2}>
                  <Button variant={'contained'} onClick={closeModalHanlder}>
                    Cancel
                  </Button>
                </Box>
                <Box>
                  <Button type={'submit'} variant={'contained'}>
                    Form Submit
                  </Button>
                </Box>
              </Box>
            </Form>
          )}
        </Formik>
      </DialogContent>
    </Dialog>
  );
};

export default memo(FormPreview);
