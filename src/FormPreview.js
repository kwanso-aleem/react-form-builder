import { Dialog, DialogContent, Grid, TextField } from '@mui/material';

const FormPreview = ({ open, closeModalHanlder, data }) => {
  return (
    <Dialog open={!!open} onClose={closeModalHanlder} fullWidth maxWidth={'md'}>
      <DialogContent dividers>
        <Grid container spacing={2}>
          {data?.map((item, index) => (
            <Grid item md={item?.col} key={`${item.id}-${index}`}>
              <Grid container spacing={2}>
                {item?.fields?.map((field) => (
                  <Grid item md={field?.column} key={`${item?.id}-${field?.id}`}>
                    <TextField
                      label={field?.content}
                      placeholder={field?.placeholder}
                      type={field?.type}
                      fullWidth
                      InputLabelProps={{
                          shrink: true
                      }}
                    />
                  </Grid>
                ))}
              </Grid>
            </Grid>
          ))}
         
        </Grid>
      </DialogContent>
    </Dialog>
  );
};

export default FormPreview;
