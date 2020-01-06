import React, { useState, useEffect, Fragment } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { withRouter } from 'react-router-dom';
import styled from 'styled-components';
import ContainerDimensions from 'react-container-dimensions';
import UUID from 'uuid/v1';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import {
  Paper,
  Drawer,
  CircularProgress,
  Typography,
  GridList,
  GridListTile
} from '@material-ui/core';

import ElementWrapper from './ElementWrapper';
import TemplateItem from './TemplateItem';
import TemplateItemEdit from './TemplateItemEdit';
import {
  reorder,
  addToForm,
  ELEMENTS,
  FORM_EDIT,
  FORM_TEMPLATE_ITEMS,
  toastrFail,
  debounced,
  renderIf,
  APP_HOME
} from '../../commons';
import {
  pushTemplate,
  fetchTemplateItems,
  putTemplate,
  putTemplateItems,
  pushTemplateItems,
  destroyTemplateItem,
  pushMessage
} from '../actions';
import { CoverPage, COVER_DATA_DEFAULT } from '../../input-version-1';
import { getUserEditableField } from '../../input-option-version-1';

const styles = theme => ({
  toolbar: theme.mixins.toolbar,
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden'
  },
  gridList: {
    width: 300
  }
});

const initialData = {
  name: '',
  documentTemplateItem: []
};

const TemplateNew = props => {
  const { match, history, classes } = props;
  const { templateId } = match.params;

  const [templateData, setTemplateData] = useState({ ...initialData });
  const [isEdit, setIsEdit] = useState(false);
  const [itemEdit, setItemEdit] = useState({});
  const [isCollapse, setCollapse] = useState(true);
  const [userEditableField, setUserEditableField] = useState([]);

  let documentTemplateItem = [];
  const order = templateData.documentTemplateItem.length;

  useEffect(() => {
    if (templateId === 'null') {
      setTemplateData({ ...initialData });
      pushTemplate(initialData).then(([response, statusCode]) => {
        pushMessage(response, () => {
          history.push(`${APP_HOME}/template/${response.data.id}`);
        });
      });
    } else {
      fetchTemplateItems(templateId).then(([response, statusCode]) => {
        if (response.statusCode) {
          setTemplateData(response.data);
        }
      });

      getUserEditableField(templateId).then(([response, statusCode]) => {
        setUserEditableField(
          response.data.map(field => ({
            ...field,
            oldValue: field.value || field.fieldName,
            rawValue: field.value
          }))
        );
      });
    }
  }, [history, templateId]);

  useEffect(() => {
    const componentApply = ['HEADER', 'FOOTER', 'PARAGRAPH'];

    setTemplateData({
      ...templateData,
      documentTemplateItem: templateData.documentTemplateItem.map(item => {
        if (componentApply.includes(item.itemType)) {
          const content = replaceItem(item.data.content);
          return {
            ...item,
            data: { ...item.data, content }
          };
        } else {
          return item;
        }
      })
    });
    /* eslint-disable react-hooks/exhaustive-deps */
  }, [userEditableField]);

  const replaceItem = content => {
    userEditableField.forEach(field => {
      if (field.value === null) {
        content = content.replace(field.oldValue, field.fieldName);
      } else {
        content = content.replace(field.oldValue, field.value);
      }
    });

    return content;
  };

  const resetEditableField = () => {
    setUserEditableField(
      userEditableField.map(field => {
        let tempValue = field.value;
        return {
          ...field,
          value: field.rawValue,
          oldValue: tempValue
        };
      })
    );
  };

  const updateDocumentTemplateItem = () => {
    putTemplate({
      id: templateData.id,
      documentTemplateItem: templateData.documentTemplateItem
    }).then(([response, statusCode]) => {
      pushMessage(response);
    });
  };

  const onDragEnd = result => {
    const { source, destination } = result;
    // Exception: cover page
    if (source.index === 12) {
      templateData.coverData === null && updateCoverData(COVER_DATA_DEFAULT);
      return;
    }

    // dropped outside the list and not form edit
    if (
      !destination ||
      (destination && FORM_EDIT !== destination.droppableId)
    ) {
      if (!destination) {
        if (FORM_EDIT === source.droppableId) {
          outDestinationOrder(source);
        } else {
          outDestinationAdd(source);
        }
      }

      return;
    }

    // handle end drag if have destination
    if (source.droppableId === destination.droppableId) {
      destinationOrder(source, destination);
    } else {
      destinationAdd(source, destination);
    }
  };

  const updateCoverData = value => {
    debounced(() => {
      putTemplate({ id: templateData.id, coverData: value }).then(
        ([response, status]) => {
          pushMessage(response);
        }
      );
    });

    setTemplateData({ ...templateData, coverData: value });
  };

  const destinationOrder = (source, destination) => {
    documentTemplateItem = reorder(
      templateData.documentTemplateItem,
      source.index,
      destination.index
    );
    let bodyReorder = documentTemplateItem.map(item => {
      return { id: item.id, order: item.order };
    });

    putTemplate({
      id: templateData.id,
      documentTemplateItem: bodyReorder
    }).then(([response, statusCode]) => {
      pushMessage(response);
    });

    setTemplateData({ ...templateData, documentTemplateItem });
  };

  const destinationAdd = (source, destination) => {
    let newTemplateItem = {
      ...ELEMENTS[source.index],
      order: destination.index,
      id: UUID()
    };
    documentTemplateItem = addToForm(
      templateData.documentTemplateItem,
      destination.index,
      newTemplateItem
    );

    pushTemplateItems(templateData.id, newTemplateItem).then(
      ([response, status]) => {
        if (response.statusCode === 200) {
          let orderObject = documentTemplateItem.map(item => {
            return { id: item.id, order: item.order };
          });

          putTemplate({
            id: templateData.id,
            documentTemplateItem: orderObject
          }).then(([response, statusCode]) => {
            pushMessage(response);
          });
        } else {
          toastrFail('Create Template Item Fail');
        }
      }
    );

    setTemplateData({ ...templateData, documentTemplateItem });
  };

  const outDestinationOrder = source => {
    documentTemplateItem = reorder(
      templateData.documentTemplateItem,
      source.index,
      order - 1
    );

    let reorderObject = documentTemplateItem.map(item => {
      return { id: item.id, order: item.order };
    });

    putTemplate({
      id: templateData.id,
      documentTemplateItem: reorderObject
    }).then(([response, statusCode]) => {
      pushMessage(response);
    });

    setTemplateData({ ...templateData, documentTemplateItem });
  };

  const outDestinationAdd = source => {
    let newTemplateItem = {
      ...ELEMENTS[source.index],
      order: order + 1,
      id: UUID()
    };
    documentTemplateItem = [
      ...templateData.documentTemplateItem,
      newTemplateItem
    ];

    pushTemplateItems(templateData.id, newTemplateItem).then(
      ([response, statusCode]) => {
        pushMessage(response);
      }
    );

    setTemplateData({ ...templateData, documentTemplateItem });
  };

  const updateTemplateItem = (editItem, showEditDrawer = false) => {
    debounced(() =>
      putTemplateItems(templateData.id, editItem).then(
        ([response, statusCode]) => {
          pushMessage(response);
        }
      )
    );

    setTemplateData({
      ...templateData,
      documentTemplateItem: templateData.documentTemplateItem.map(element => {
        return element.id === editItem.id ? editItem : element;
      })
    });
    setItemEdit(editItem);
    setIsEdit(showEditDrawer);
  };

  const onDelete = itemId => {
    setTemplateData({
      ...templateData,
      documentTemplateItem: templateData.documentTemplateItem.filter(
        item => item.id !== itemId
      )
    });

    destroyTemplateItem(templateData.id, itemId);
  };

  const duplicateBlock = newItem => {
    documentTemplateItem = addToForm(
      templateData.documentTemplateItem,
      newItem.order,
      newItem
    );

    pushTemplateItems(templateData.id, newItem).then(([response, status]) => {
      if (response.statusCode === 200) {
        putTemplate({
          id: templateData.id,
          documentTemplateItem: documentTemplateItem.map(item => {
            return { id: item.id, order: item.order };
          })
        });
      }
    });

    setTemplateData({ ...templateData, documentTemplateItem });
  };

  const renderDetailMenu = () => (
    <Fragment>
      <DetailMenu>
        <div style={{ height: '100%', position: 'sticky', top: 60 }}>
          {renderIf(templateId !== 'null')(
            <ContainerDimensions>
              {({ height }) => (
                <CollapsibleContainer collapsed={isCollapse}>
                  {isCollapse && (
                    <div style={{}}>
                      <Typography
                        style={{
                          fontSize: 14,
                          marginBottom: 10,
                          marginLeft: 5
                        }}
                      >
                        Click or Drag & Drop to add the field
                      </Typography>
                      <Droppable droppableId={FORM_TEMPLATE_ITEMS}>
                        {provided => (
                          <div
                            {...provided.droppableProps}
                            ref={provided.innerRef}
                            className={classes.root}
                            style={{ paddingTop: 2 }}
                          >
                            <GridList
                              cols={2}
                              className={classes.gridList}
                              cellHeight={76}
                            >
                              {ELEMENTS.map((element, index) => {
                                return (
                                  <GridListTile
                                    cols={1}
                                    style={{ padding: 0 }}
                                    rows={1}
                                    key={`${element.id}-${index}`}
                                  >
                                    <Draggable
                                      key={element.id}
                                      draggableId={element.id}
                                      index={index}
                                    >
                                      {provided => (
                                        <div
                                          ref={provided.innerRef}
                                          {...provided.draggableProps}
                                          {...provided.dragHandleProps}
                                        >
                                          <ElementWrapper
                                            label={element.data.element}
                                            itemType={element.itemType}
                                          />
                                        </div>
                                      )}
                                    </Draggable>
                                  </GridListTile>
                                );
                              })}
                            </GridList>
                          </div>
                        )}
                      </Droppable>
                    </div>
                  )}
                  <Trapezoid onClick={() => setCollapse(!isCollapse)} />
                  <div
                    style={{
                      position: 'absolute',
                      right: 0,
                      top: 215,
                      width: 5,
                      height: 200,
                      zIndex: 1199,
                      backgroundColor: 'white'
                    }}
                  />
                  {isCollapse ? (
                    <ChevronLeftIcon
                      style={{
                        position: 'absolute',
                        right: -20,
                        top: 272.5,
                        zIndex: 1199,
                        width: 20,
                        height: 20
                      }}
                      onClick={() => setCollapse(!isCollapse)}
                    />
                  ) : (
                    <ChevronRightIcon
                      style={{
                        position: 'absolute',
                        right: -20,
                        top: 272.5,
                        zIndex: 1199,
                        width: 20,
                        height: 20
                      }}
                      onClick={() => setCollapse(!isCollapse)}
                    />
                  )}
                </CollapsibleContainer>
              )}
            </ContainerDimensions>
          )}
        </div>
      </DetailMenu>
      {renderIf(templateId === 'null')(<CircularProgress />)}
    </Fragment>
  );

  return (
    <TemplateWrapper className="template-new">
      <div className={classes.toolbar} />
      <DragDropContext onDragEnd={onDragEnd} className="FormTemplate">
        <div style={{ overflow: 'visible' }}>{renderDetailMenu()}</div>
        <PaperStyle id="main-content">
          {renderIf(templateData.coverData)(
            <React.Fragment>
              <CoverPage
                templateData={templateData}
                updateCoverData={updateCoverData}
                id="cover-page"
              />
              <div
                className="template-item"
                style={{
                  backgroundColor: '#e5e5e5',
                  height: '10px',
                  pageBreakBefore: 'always'
                }}
              />
            </React.Fragment>
          )}

          <TemplateMain>
            <Droppable droppableId={FORM_EDIT} direction="vertical">
              {provided => (
                <div
                  ref={provided.innerRef}
                  style={{
                    paddingBottom: '32px',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column'
                  }}
                >
                  {templateData.documentTemplateItem.map((item, index) => {
                    return (
                      <div
                        key={`${index}-${item.id}`}
                        style={
                          item.itemType === 'FOOTER'
                            ? {
                                display: 'flex',
                                flex: 1,
                                flexDirection: 'column-reverse'
                              }
                            : {}
                        }
                      >
                        <Draggable
                          key={item.id}
                          draggableId={item.id}
                          index={index}
                        >
                          {provided => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                            >
                              <TemplateItem
                                item={item}
                                provided={provided}
                                updateTemplateItem={updateTemplateItem}
                                setIsEdit={setIsEdit}
                                setItemEdit={setItemEdit}
                                onDelete={onDelete}
                                duplicateBlock={duplicateBlock}
                                templateData={templateData}
                              />
                            </div>
                          )}
                        </Draggable>
                      </div>
                    );
                  })}
                </div>
              )}
            </Droppable>
          </TemplateMain>
        </PaperStyle>
      </DragDropContext>

      <Drawer
        open={isEdit}
        onClose={() => {
          setIsEdit(false);
          resetEditableField();
        }}
        anchor="right"
        variant="temporary"
      >
        <TemplateItemEdit
          item={itemEdit}
          updateTemplateItem={updateTemplateItem}
          setIsEdit={setIsEdit}
          userEditableField={userEditableField}
          setUserEditableField={setUserEditableField}
          updateDocumentTemplateItem={updateDocumentTemplateItem}
        />
      </Drawer>
    </TemplateWrapper>
  );
};

const TemplateWrapper = styled.div`
  display: flex;
  height: auto;
  .mce-edit-focus {
    :focus {
      outline: none;
    }
  }

  .tox {
    tox-collection--grid {
      tox-collection__group {
        flex-direction: column;
      }
    }
  }
`;

const PaperStyle = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  min-height: 90vh;
  margin-right: 10px;
  margin-top: 30px;
  align-items: center;
`;

const TemplateMain = styled(Paper)`
  flex: 1;
  margin: 50px 0;
  padding: 10px;
  width: 21cm;
  min-height: 29.7cm;
  height: auto;
`;

const CollapsibleContainer = styled.div`
  display: flex;
  flex-direction: row;
  overflow: hidden;
  padding: 20px 10px 10px 10px;
  width: ${props => (props.collapsed ? '320px' : '0px')} !important;
  -webkit-transition: width 500ms;
  transition: width 500ms;
`;

const Trapezoid = styled.div`
  border-left: 21px solid white;
  border-top: 15px solid transparent;
  border-bottom: 15px solid transparent;
  height: 125px;
  width: 0;
  margin-top: 200px;
  z-index: 999;
  position: absolute;
  right: -20px;
  filter: drop-shadow(0px 1px 2px rgba(0, 0, 0, 0.3));
`;

const DetailMenu = styled.div`
  display: block;
  min-height: 100%;
  box-shadow: rgba(0, 0, 0, 0.2) 0px 1px 5px 0px,
    rgba(0, 0, 0, 0.14) 0px 2px 2px 0px, rgba(0, 0, 0, 0.12) 0px 3px 1px -2px;
  margin-right: 30px;
  background-color: white;
`;

export default withStyles(styles)(withRouter(TemplateNew));
