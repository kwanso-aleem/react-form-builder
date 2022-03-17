import React, { useState } from 'react';

import { v4 as uuid } from 'uuid';
import styled from 'styled-components';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import {
  Dialog,
  Button as MuiButton,
  DialogContent,
  TextField,
  Grid,
  Box,
  MenuItem,
} from '@mui/material';
import { Formik, Form } from 'formik';
import FormPreview from './FormPreview';
// import console = require('console');

// a little function to help us with reordering the result
const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

const Content = styled.div`
  border: 2px solid black;
  margin: 20px;
  max-height: 500px;
  overflow-x: auto;
`;

const Item = styled.div`
  display: flex;
  user-select: none;
  padding: 0.5rem;
  margin: 0 0 0.5rem 0;
  align-items: flex-start;
  align-content: flex-start;
  line-height: 1.5;
  border-radius: 3px;
  background: #fff;
  border: 1px ${(props) => (props.isDragging ? 'dashed #4099ff' : 'solid #ddd')};
`;

const ContentItem = styled.div`
  display: flex;
  user-select: none;
  padding: 0.5rem;
  margin: 0.5rem;
  align-items: flex-start;
  align-content: flex-start;
  line-height: 1.5;
  border-radius: 3px;
  background: #fff;
  border: 1px ${(props) => (props.isDragging ? 'dashed #4099ff' : 'solid #ddd')};
`;

const Clone = styled(Item)`
  + div {
    display: none !important;
  }
`;

const Handle = styled.div`
  display: flex;
  align-items: center;
  align-content: center;
  user-select: none;
  margin: -0.5rem 0.5rem -0.5rem -0.5rem;
  padding: 0.5rem;
  line-height: 1.5;
  border-radius: 3px 0 0 3px;
  background: #fff;
  border-right: 1px solid #ddd;
  color: #000;
`;

const Container = styled.div`
  border: 1px
    ${(props) => (props.isDraggingOver ? 'dashed #000' : 'solid #ddd')};
  background: #fff;
  padding: 0.5rem 0.5rem;
  border-radius: 3px;
  flex: 0 0 150px;
  font-family: sans-serif;
  margin: 0.5rem 0.5rem 1.5rem;
  background: #ccc;
  min-height: 100px;
`;

const Notice = styled.div`
  display: flex;
  align-items: center;
  align-content: center;
  justify-content: center;
  padding: 0.5rem;
  margin: 0 0.5rem 0.5rem;
  border: 1px solid transparent;
  line-height: 1.5;
  color: #aaa;
`;

const Button = styled.button`
  display: flex;
  align-items: center;
  align-content: center;
  justify-content: center;
  margin: 0.5rem;
  padding: 0.5rem;
  color: #000;
  border: 1px solid #ddd;
  background: #fff;
  border-radius: 3px;
  font-size: 1rem;
  cursor: pointer;
`;

const ButtonText = styled.div`
  margin: 0 1rem;
`;

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const INPUT_TYPES = {
  TEXT: 'text',
  DATE: 'date',
  TIME: 'time',
  SELECT: 'select',
  RADIO: 'radio',
  CHECKBOX: 'checkbox',
  TEL: 'tel',
  NUMBER: 'number',
};

const ITEMS = [
  {
    id: uuid(),
    content: 'Text Input',
    name: 'input',
    type: INPUT_TYPES.TEXT,
    objectName: uuid(),
    css: '',
    column: 12,
    placeholder: '',
    required: false,
  },
  {
    id: uuid(),
    content: 'Date Input',
    name: 'input',
    type: INPUT_TYPES.DATE,
    objectName: uuid(),
    css: '',
    column: 12,
    placeholder: '',
    required: false,
  },
  {
    id: uuid(),
    content: 'Number Input',
    name: 'input',
    type: INPUT_TYPES.NUMBER,
    objectName: uuid(),
    css: '',
    column: 12,
    placeholder: '',
    required: false,
  },
  {
    id: uuid(),
    content: 'Time Field',
    name: 'input',
    type: INPUT_TYPES.TIME,
    objectName: uuid(),
    css: '',
    column: 12,
    placeholder: '',
    required: false,
  },
];

const COL_TYPES = {
  COL_1: 'col-1',
  COL_2: 'col-2',
  COL_3: 'col-3',
};

const columnLength = [12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1];

const App = () => {
  //states

  const [formValues, setFormValues] = useState([
    {
      id: uuid(),
      col: 12,
      fields: [],
    },
  ]);
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState({});
  const [formInitialValues, setFormInitialValues] = useState({
    id: '',
    content: '',
    name: '',
    type: '',
    objectName: '',
    css: '',
    column: '',
    placeholder: '',
    required: false,
  });
  const [previewOpen, setPreviewOpen] = useState(false);

  //drag end

  const onDragEnd = (result) => {
    const { source, destination, draggableId } = result;

    const resultID = result?.draggableId?.split(/@/g);

    console.log('==> result', result);

    // dropped outside the list
    if (!destination) {
      return;
    }

    if (destination.droppableId === source.droppableId) {
      // setFormValues((prev) => ({
      //   [destination.droppableId]: reorder(
      //     formValues[destination.droppableId],
      //     source.index,
      //     destination.index
      //   ),
      // }));
    } else if (source.droppableId === 'ITEMS') {
      const arr = formValues?.map((item) => {
        if (destination.droppableId === item.id) {
          const newField = {
            ...ITEMS.find((item) => item.id === draggableId),
            id: uuid(),
          };

          item?.fields?.push(newField);
          return item;
        } else {
          return item;
        }
      });
      setFormValues(arr);
    } else {
      const arr = formValues?.map((item) => {
        if (destination.droppableId === item.id) {
          const newField = ITEMS.find((item) => item.id === draggableId);
          item?.fields?.push(newField);
          return item;
        } else {
          return item;
        }
      });
      setFormValues(arr);
    }
  };

  //add list

  const addList = (type) => {
    switch (type) {
      case COL_TYPES.COL_1:
        setFormValues((prev) => [
          ...prev,
          {
            id: uuid(),
            col: 12,
            fields: [],
          },
        ]);
        break;
      case COL_TYPES.COL_2:
        setFormValues((prev) => [
          ...prev,
          {
            id: uuid(),
            col: 6,
            fields: [],
          },
          {
            id: uuid(),
            col: 6,
            fields: [],
          },
        ]);
        break;
      case COL_TYPES.COL_3:
        setFormValues((prev) => [
          ...prev,
          {
            id: uuid(),
            col: 4,
            fields: [],
          },
          {
            id: uuid(),
            col: 4,
            fields: [],
          },
          {
            id: uuid(),
            col: 4,
            fields: [],
          },
        ]);
        break;
      default:
        setFormValues((prev) => [
          ...prev,
          {
            id: uuid(),
            col: 12,
            fields: [],
          },
        ]);
        break;
    }
  };

  //save handler

  const saveHandler = () => {
    console.log('state', formValues);
  };

  //
  const changeValues = (list, item) => {
    setSelected({
      ...item,
      list: list?.id,
    });
    setFormInitialValues((prev) => ({ ...prev, ...item, list: list.id }));
    modalOpenHandler();
  };

  //modal handklers

  const modalOpenHandler = () => {
    setOpen(true);
  };

  const closeModalHanlder = () => {
    setOpen(false);
  };

  //submit handler

  const submitHandler = (values) => {
    const arr1 = formValues?.map((item) => {
      if (values?.list === item.id) {
        const fields = item?.fields?.map((field) =>
          field.id === values?.id
            ? {
                ...field,
                content: values?.content,
                objectName: values?.objectName,
                css: values?.css,
                column: values?.column,
              }
            : field
        );
        return { ...item, fields };
      } else {
        return item;
      }
    });

    setFormValues(arr1);
    closeModalHanlder();
  };

  //preview form modal

  const previewOpenModal = () => {
    setPreviewOpen(true);
  };

  const previewCloseHandler = () => {
    setPreviewOpen(false);
  };

  //render

  return (
    <DragDropContext onDragEnd={onDragEnd} enableDefaultSensors>
      <Grid container>
        <Grid item md={8}>
          <Content>
            <Grid container>
              {formValues?.map((list, i) => {
                console.log('==> list', list);
                return (
                  <Grid
                    item
                    key={list.id}
                    xs={list.col || 12}
                    sm={list.col || 12}
                    md={list.col || 12}
                    lg={list.col || 12}
                    xl={list.col || 12}
                  >
                    <Droppable droppableId={list.id}>
                      {(provided, snapshot) => (
                        <Container
                          ref={provided.innerRef}
                          isDraggingOver={snapshot.isDraggingOver}
                        >
                          <Grid container>
                            {list?.fields
                              ? list?.fields?.map((item, index) => (
                                  <Draggable
                                    key={item.id}
                                    draggableId={item.id}
                                    index={index}
                                  >
                                    {(provided, snapshot, ...rest) => {
                                      return (
                                        <Grid
                                          item
                                          xs={item.column || 12}
                                          sm={item.column || 12}
                                          md={item.column || 12}
                                          lg={item.column || 12}
                                          xl={item.column || 12}
                                        >
                                          <ContentItem
                                            ref={provided.innerRef}
                                            {...provided.draggableProps}
                                            isDragging={snapshot.isDragging}
                                            style={
                                              provided.draggableProps.style
                                            }
                                          >
                                            <Handle
                                              {...provided.dragHandleProps}
                                            ></Handle>
                                            <TextField
                                              id={item.id}
                                              label={item.content}
                                              name={'css'}
                                              type={item.type}
                                              InputProps={{
                                                endAdornment: (
                                                  <button
                                                    onClick={() =>
                                                      changeValues(
                                                        list,
                                                        item,
                                                        provided,
                                                        snapshot
                                                      )
                                                    }
                                                  >
                                                    edit
                                                  </button>
                                                ),
                                              }}
                                              fullWidth
                                            />
                                          </ContentItem>
                                        </Grid>
                                      );
                                    }}
                                  </Draggable>
                                ))
                              : !provided.placeholder && (
                                  <Notice>Drop items here</Notice>
                                )}

                            {provided.placeholder}
                          </Grid>
                        </Container>
                      )}
                    </Droppable>
                  </Grid>
                );
              })}
            </Grid>
          </Content>
        </Grid>
        <Grid item md={4}>
          <Box width={'100%'}>
            <Button onClick={() => addList(COL_TYPES.COL_1)}>
              <svg width='24' height='24' viewBox='0 0 24 24'>
                <path
                  fill='currentColor'
                  d='M19,13H13V19H11V13H5V11H11V5H13V11H19V13Z'
                />
              </svg>
              <ButtonText>Col 1</ButtonText>
            </Button>
            <Button onClick={() => addList(COL_TYPES.COL_2)}>
              <svg width='24' height='24' viewBox='0 0 24 24'>
                <path
                  fill='currentColor'
                  d='M19,13H13V19H11V13H5V11H11V5H13V11H19V13Z'
                />
              </svg>
              <ButtonText>Col 2</ButtonText>
            </Button>
            <Button onClick={() => addList(COL_TYPES.COL_3)}>
              <svg width='24' height='24' viewBox='0 0 24 24'>
                <path
                  fill='currentColor'
                  d='M19,13H13V19H11V13H5V11H11V5H13V11H19V13Z'
                />
              </svg>
              <ButtonText>Col 3</ButtonText>
            </Button>
          </Box>
          <Droppable droppableId='ITEMS' isDropDisabled={true}>
            {(provided, snapshot) => (
              <Box
                ref={provided.innerRef}
                isDraggingOver={snapshot.isDraggingOver}
              >
                {ITEMS?.map((item, index) => (
                  <Draggable
                    key={item.id}
                    draggableId={`${item.id}`}
                    index={index}
                  >
                    {(provided, snapshot, ...rest) => {
                      return (
                        <React.Fragment>
                          <Item
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            isDragging={snapshot.isDragging}
                            style={provided.draggableProps.style}
                            aria-label={item.name}
                          >
                            {item.content}
                          </Item>
                          {snapshot.isDragging && <Clone>{item.content}</Clone>}
                          {provided.placeholder}
                        </React.Fragment>
                      );
                    }}
                  </Draggable>
                ))}
              </Box>
            )}
          </Droppable>
        </Grid>
      </Grid>
      <Box display={'flex'} justifyContent={'flex-start'}>
        <Box marginX={2}>
          <Button onClick={saveHandler}>Save</Button>
        </Box>
        <Button onClick={previewOpenModal}>Preview Form </Button>
      </Box>

      {/* </MainContainer> */}
      <Dialog
        open={!!open}
        onClose={closeModalHanlder}
        fullWidth
        maxWidth={'md'}
      >
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
                      label='Input Type'
                      name={'type'}
                      onChange={handleChange}
                      value={values.type}
                      fullWidth
                      select
                      SelectProps={{
                        displayEmpty: true,
                        MenuProps: MenuProps,
                      }}
                    >
                      <MenuItem value={''} disabled>
                        Please Select a input type
                      </MenuItem>
                      {Object.values(INPUT_TYPES)?.map((col, index) => (
                        <MenuItem
                          key={`${index}-menu-item-input-type-${col}`}
                          value={col}
                        >
                          {col}
                        </MenuItem>
                      ))}
                    </TextField>
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
                      label='Select a column'
                      name={'column'}
                      onChange={handleChange}
                      value={values.column}
                      select
                      SelectProps={{
                        displayEmpty: true,
                        MenuProps: MenuProps,
                      }}
                      fullWidth
                    >
                      <MenuItem value={''} disabled>
                        Please Select a column length
                      </MenuItem>
                      {columnLength?.map((col) => (
                        <MenuItem value={col}>{col}</MenuItem>
                      ))}
                    </TextField>
                  </Grid>
                  <Grid item md={12}>
                    <Box display={'flex'} justifyContent={'flex-end'}>
                      <Box marginX={2}>
                        <MuiButton
                          onClick={closeModalHanlder}
                          variant={'contained'}
                        >
                          Cancel
                        </MuiButton>
                      </Box>

                      <MuiButton type='submit' variant={'contained'}>
                        Save changes
                      </MuiButton>
                    </Box>
                  </Grid>
                </Grid>
              </Form>
            )}
          </Formik>
        </DialogContent>
      </Dialog>

      <FormPreview open={previewOpen} closeModalHanlder={previewCloseHandler} data={formValues} />
    </DragDropContext>
  );
};

export default App;
