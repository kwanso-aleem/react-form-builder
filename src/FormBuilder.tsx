import React, { useState } from 'react';
//package imports
import { v4 as uuid } from 'uuid';
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from 'react-beautiful-dnd';
import { TextField, Grid, Box, Button } from '@mui/material';

//user imports

import FormPreview from './FormPreview';
import EditModal from './EditModal';
import { COL_TYPES, INPUT_TYPES, ITEMS, COL_TYPES_ARRAY } from './constants';
import { formValuesTypes, itemTypes, formInitialType } from './interfaces';
import { PlusIcon } from './PlusIcon';

const App = () => {
  //states

  const [formValues, setFormValues] = useState<formValuesTypes[]>([
    {
      id: uuid(),
      col: 12,
      fields: [],
    },
  ]);
  const [open, setOpen] = useState<boolean>(false);
  const [selected, setSelected] = useState<formInitialType>({
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
  });
  const [previewOpen, setPreviewOpen] = useState<boolean>(false);

  //drag end

  const onDragEnd = (result: DropResult) => {
    const { source, destination, draggableId } = result;
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
          const itemField = ITEMS?.find((item) => item?.id === draggableId);
          const newField: itemTypes = {
            content: itemField?.content ?? '',
            name: itemField?.name ?? '',
            type: itemField?.type ?? INPUT_TYPES.TEXT,
            css: itemField?.css ?? '',
            column: itemField?.column ?? 12,
            placeholder: itemField?.placeholder ?? '',
            required: itemField?.required ?? false,
            id: uuid(),
            objectName: uuid(),
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
          const itemField = ITEMS?.find((item) => item?.id === draggableId);
          const newField: itemTypes = {
            content: itemField?.content ?? '',
            name: itemField?.name ?? '',
            type: itemField?.type ?? INPUT_TYPES.TEXT,
            css: itemField?.css ?? '',
            column: itemField?.column ?? 12,
            placeholder: itemField?.placeholder ?? '',
            required: itemField?.required ?? false,
            id: uuid(),
            objectName: uuid(),
          };
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

  const addList = (type: string) => {
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
  const changeValues = (id: string, item: itemTypes) => {
    setSelected({
      ...item,
      list: id,
    });

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

  const submitHandler = (values: any) => {
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
              placeholder: values?.placeholder,
              required: values?.required,
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
          <Box
            sx={{
              border: '2px solid black',
              margin: '20px',
              maxHeight: '500px',
              overflowX: 'auto',
            }}
          >
            <Grid container spacing={2}>
              {formValues?.map((list) => {

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
                        <Box
                          ref={provided.innerRef}
                          sx={{
                            padding: '0.5rem',
                            borderRadius: ' 5px',
                            margin: '0.5rem',
                            background: '#ccc',
                            minHeight: '100px',
                            border: `1px
                            ${snapshot.isDraggingOver
                                ? 'dashed #000'
                                : 'solid #ddd'
                              }`,
                          }}
                        >
                          <Grid container spacing={1}>
                            {list?.fields
                              ? list?.fields?.map(
                                (item: itemTypes, index: number) => (
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

                                          <Box
                                            sx={{
                                              padding: '0.5rem',
                                              borderRadius: '5px',
                                              background: '#fff',
                                              border: `1px ${snapshot.isDragging
                                                  ? 'dashed #4099ff'
                                                  : 'solid #ddd'
                                                }`,
                                              ...provided.draggableProps
                                                .style,
                                            }}
                                            ref={provided.innerRef}
                                            {...provided.draggableProps}
                                          >
                                            <Box
                                              sx={{
                                                background: '#fff'
                                              }}
                                              {...provided.dragHandleProps}
                                            ></Box>
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
                                                        list.id,
                                                        item
                                                      )
                                                    }
                                                  >
                                                    edit
                                                  </button>
                                                ),
                                              }}
                                              fullWidth
                                            />
                                          </Box>
                                        </Grid>
                                      );
                                    }}
                                  </Draggable>
                                )
                              )
                              : !provided.placeholder && (
                                <Box
                                  sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    alignContent: 'center',
                                    justifyContent: 'center',
                                    padding: '0.5rem',
                                    margin: '0 0.5rem 0.5rem',
                                    border: '1px solid transparent',
                                    lineHeight: '1.5',
                                    color: '#aaa',
                                  }}
                                >
                                  Drop items here
                                </Box>
                              )}

                            {provided.placeholder}
                          </Grid>
                        </Box>
                      )}
                    </Droppable>
                  </Grid>
                );
              })}
            </Grid>
          </Box>
        </Grid>
        <Grid item md={4}>
          <Box width={'100%'} display={'flex'}>
            {COL_TYPES_ARRAY.map((item, index) => (
              <Box
                key={`${index}-add-${item.value}-column-${item.text}`}
                margin={1}
              >
                <Button
                  onClick={() => addList(item.value)}
                  startIcon={<PlusIcon />}
                  variant={'outlined'}
                >
                  {item.text}
                </Button>
              </Box>
            ))}
          </Box>
          <Droppable droppableId='ITEMS' isDropDisabled={true}>
            {(provided, snapshot) => (
              <Box
                sx={{
                  padding: '0.5rem',
                  borderRadius: ' 5px',
                  margin: '0.5rem',
                  background: '#ccc',
                  minHeight: '100px',
                  border: `1px
                  ${snapshot.isDraggingOver ? 'dashed #000' : 'solid #ddd'}`,
                }}
                ref={provided.innerRef}
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
                          <Box
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            sx={{
                              border: `1px ${snapshot.isDragging
                                  ? 'dashed #4099ff'
                                  : 'solid #ddd'
                                }`,
                              display: 'flex',
                              userSelect: 'none',
                              padding: '0.5rem',
                              margin: '0 0 0.5rem 0',
                              alignItems: 'flex-start',
                              alignContent: 'flex-start',
                              lineHeight: '1.5',
                              borderRadius: '3px',
                              background: '#fff',
                              ...provided.draggableProps.style,
                            }}
                            // style={provided.draggableProps.style}
                            aria-label={item.name}
                          >
                            {item.content}
                          </Box>
                          {snapshot.isDragging && (
                            <Box
                              sx={{
                                userSelect: 'none',
                                padding: '0.5rem',
                                margin: '0 0 0.5rem 0',
                                alignItems: 'flex-start',
                                alignContent: 'flex-start',
                                lineHeight: '1.5',
                                borderRadius: '3px',
                                background: '#fff',
                                display: 'none',
                              }}
                            >
                              {item.content}
                            </Box>
                          )}

                        </React.Fragment>
                      );
                    }}
                  </Draggable>
                ))}
                {provided.placeholder}
              </Box>
            )}
          </Droppable>
        </Grid>
      </Grid>
      <Box display={'flex'} justifyContent={'flex-start'}>
        <Box marginX={2}>
          <Button onClick={saveHandler} variant={'outlined'}>Save</Button>
        </Box>
        <Button onClick={previewOpenModal} variant={'outlined'}>Preview Form </Button>
      </Box>

      {/* </MainContainer> */}
      <EditModal
        open={open}
        closeModalHanlder={closeModalHanlder}
        submitHandler={submitHandler}
        selected={selected}
      />

      <FormPreview
        open={previewOpen}
        closeModalHanlder={previewCloseHandler}
        data={formValues}
      />
    </DragDropContext>
  );
};

export default App;
