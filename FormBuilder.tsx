import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import uuid from 'uuid/v4';

import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

import {
  Button,
  ButtonText,
  Container,
  Clone,
  Content,
  Handle,
  Item,
  Kiosk,
  Notice,
} from './src/Components';

// import console = require('console');

// a little function to help us with reordering the result
const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};
/**
 * Moves an item from one list to another list.
 */
const copy = (source, destination, droppableSource, droppableDestination) => {
  console.log('==> dest', destination);

  const sourceClone = Array.from(source);
  const destClone = Array.from(destination);
  const item = sourceClone[droppableSource.index];

  destClone.splice(droppableDestination.index, 0, { ...item, id: uuid() });
  return destClone;
};

const ITEMS = [
  {
    id: uuid(),
    content: 'Input',
    name: 'input',
    type: 'text',
  },
  {
    id: uuid(),
    content: 'Row',
    name: '',
    type: 'text',
  },
  {
    id: uuid(),
    content: 'Column',
    name: '',
    type: 'text',
  },
  {
    id: uuid(),
    content: 'Date',
    name: '',
    type: 'text',
  },
  {
    id: uuid(),
    content: 'Buttom',
    name: '',
    type: 'text',
  },
];

 class FormBuilder extends Component {
  state = {
    [uuid()]: [],
  };
  onDragEnd = (result) => {
    const { source, destination } = result;

    console.log('==> result', result);

    // dropped outside the list
    if (!destination) {
      return;
    }

    switch (source.droppableId) {
      case destination.droppableId:
        this.setState({
          [destination.droppableId]: reorder(
            this.state[source.droppableId],
            source.index,
            destination.index
          ),
        });
        break;
      case 'ITEMS':
        this.setState({
          [destination.droppableId]: copy(
            ITEMS,
            this.state[destination.droppableId],
            source,
            destination
          ),
        });
        break;
      default:
        break;
    }
  };

  addList = () => {
    this.setState({ [uuid()]: [] });
  };

  // Normally you would want to split things out into separate components.
  // But in this example everything is just done in one place for simplicity
  render() {
    return (
      <DragDropContext onDragEnd={this.onDragEnd}>
        <Droppable droppableId='ITEMS' isDropDisabled={true}>
          {(provided, snapshot) => (
            <Kiosk
              innerRef={provided.innerRef}
              isDraggingOver={snapshot.isDraggingOver}
            >
              {ITEMS.map((item, index) => (
                <Draggable key={item.id} draggableId={item.id} index={index}>
                  {(provided, snapshot) => (
                    <React.Fragment>
                      <Item
                        innerRef={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        isDragging={snapshot.isDragging}
                        style={provided.draggableProps.style}
                      >
                        {item.content}
                      </Item>
                      {snapshot.isDragging && <Clone>{item.content}</Clone>}
                    </React.Fragment>
                  )}
                </Draggable>
              ))}
            </Kiosk>
          )}
        </Droppable>
        <Content>
          <Button onClick={this.addList}>
            <svg width='24' height='24' viewBox='0 0 24 24'>
              <path
                fill='currentColor'
                d='M19,13H13V19H11V13H5V11H11V5H13V11H19V13Z'
              />
            </svg>
            <ButtonText>Add List</ButtonText>
          </Button>
          {Object.keys(this.state).map((list, i) => {
            console.log('==> list', list);
            return (
              <Droppable key={list} droppableId={list}>
                {(provided, snapshot) => (
                  <Container
                    innerRef={provided.innerRef}
                    isDraggingOver={snapshot.isDraggingOver}
                  >
                    {this.state[list].length
                      ? this.state[list].map((item, index) => (
                          <Draggable
                            key={item.id}
                            draggableId={item.id}
                            index={index}
                          >
                            {(provided, snapshot) => (
                              <Item
                                innerRef={provided.innerRef}
                                {...provided.draggableProps}
                                isDragging={snapshot.isDragging}
                                style={provided.draggableProps.style}
                              >
                                <Handle {...provided.dragHandleProps}></Handle>
                                <input />
                                {item.content}
                              </Item>
                            )}
                          </Draggable>
                        ))
                      : !provided.placeholder && (
                          <Notice>Drop items here</Notice>
                        )}
                    {provided.placeholder}
                  </Container>
                )}
              </Droppable>
            );
          })}
        </Content>
      </DragDropContext>
    );
  }
}
