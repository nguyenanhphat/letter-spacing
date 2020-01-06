import fetchHelper from '../../../helpers/FetchHelper';
import { toastrSuccess, toastrFail } from '../../commons';

const getUserEditableField = templateId => {
  return fetchHelper.fetch(`/api/documents/${templateId}/editableFields`);
};

const getRawEditableField = templateId => {
  return fetchHelper.fetch(`/api/documents/templates/${templateId}`);
};

const updateUserEditableField = (templateId, body) => {
  fetchHelper
    .fetch(`/api/documents/${templateId}/editableFields`, {
      method: 'PUT',
      body: JSON.stringify(body)
    })
    .then(([response, statusCode]) => {
      if (response.success) {
        toastrSuccess(response.message);
      } else {
        toastrFail(response.message);
      }
    });
};

const getCoverBackground = templateId => {
  return fetchHelper.fetch(
    `/api/documents/templates/${templateId}/cover-page-images`
  );
};

export {
  getUserEditableField,
  getRawEditableField,
  getCoverBackground,
  updateUserEditableField
};
