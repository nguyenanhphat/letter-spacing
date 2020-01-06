import fetchHelper from '../../../helpers/FetchHelper';
import { toastrFail, toastrSuccess } from '../../commons';

const fetchTemplate = paging => {
  return fetchHelper.fetch(
    `/api/documents/templates?pageSize=${
      paging.pageSize
    }&pageIndex=${paging.pageIndex + 1}&search=${paging.search}`
  );
};

const pushTemplate = body => {
  return fetchHelper.fetch(`/api/documents/templates`, {
    method: 'POST',
    body: JSON.stringify({
      ...body
    })
  });
};

const putTemplate = body => {
  return fetchHelper.fetch(`/api/documents/templates/${body.id}`, {
    method: 'PUT',
    body: JSON.stringify(body)
  });
};

const destroyTemplate = id => {
  return fetchHelper.fetch(`/api/documents/templates/${id}`, {
    method: 'DELETE'
  });
};

const fetchTemplateItems = templateId => {
  return fetchHelper.fetch(`/api/documents/${templateId}/templateItems`);
};

const pushTemplateItems = (templateId, body) => {
  return fetchHelper.fetch(`/api/documents/${templateId}/templateItems`, {
    method: 'POST',
    body: JSON.stringify(body)
  });
};

const putTemplateItems = (templateId, body) => {
  return fetchHelper.fetch(
    `/api/documents/${templateId}/templateItems/${body.id}`,
    {
      method: 'PUT',
      body: JSON.stringify(body)
    }
  );
};

const destroyTemplateItem = (templateId, id) => {
  return fetchHelper.fetch(`/api/documents/${templateId}/templateitems/${id}`, {
    method: 'DELETE'
  });
};

const pushMessage = (response, resolve = () => null) => {
  if (response.statusCode === 200) {
    toastrSuccess(response.message);
    resolve();
  } else {
    toastrFail(response.message);
  }
};

export {
  fetchTemplate,
  pushTemplate,
  putTemplate,
  destroyTemplate,
  fetchTemplateItems,
  pushTemplateItems,
  putTemplateItems,
  destroyTemplateItem,
  pushMessage
};
