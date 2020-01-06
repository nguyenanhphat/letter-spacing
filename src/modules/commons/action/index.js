import Cookies from 'js-cookie';
import { toastrSuccess } from '..';
import fetchHelper from '../../../helpers/FetchHelper';
import { jsonToDom } from '../../../helpers/htmlToJson';
import { toastrFail } from '../components/CustomToastr';
import DownloadFile from '../../../helpers/DownloadFileHelper';

const uploadFile = (key, file) => {
  const formData = new FormData();
  formData.append(`${key}Src`, file);

  return fetch(`/api/documents/${key}-upload`, {
    method: 'POST',
    body: formData,
    headers: {
      Authorization: `Bearer ${Cookies.get('authToken')}`
    }
  }).then(response => response.json());
};

const publishingTemplate = id => {
  fetchHelper
    .fetch(`/api/documents/${id}/publish`, {
      method: 'POST'
    })
    .then(([response, statusCode]) => {
      if (response.success) {
        toastrSuccess('Publish Template Success');
      } else {
        toastrFail('Publish Template Fail');
      }
    });
};

const getLink = (type, formatType, linkShare, ...downloadParams) => {
  // html, action, templateId, name
  const url = `/api/documents/templates/getLink`;
  let body = {
    type
  };
  if (formatType)
    body = {
      ...body,
      format: formatType,
      html: downloadParams[0],
      action: downloadParams[1],
      templateId: downloadParams[2],
      name: downloadParams[3] || 'Sample'
    };
  else body.linkShare = linkShare;
  return fetchHelper.fetch(url, {
    method: 'POST',
    body: JSON.stringify(body)
  });
};

const downloadFile = params => {
  fetch(`/api/documents/templates/getLink`, {
    method: 'POST',
    body: JSON.stringify(params),
    headers: {
      Authorization: `Bearer ${Cookies.get('authToken')}`
    }
  })
    .then(response => {
      const reader = response.body.getReader();

      return new ReadableStream({
        start(controller) {
          return pump();
          function pump() {
            return reader.read().then(({ done, value }) => {
              // When no more data needs to be consumed, close the stream
              if (done) {
                controller.close();
                return;
              }
              // Enqueue the next data chunk into our target stream
              controller.enqueue(value);
              return pump();
            });
          }
        }
      });
    })
    .then(stream => new Response(stream))
    .then(response => response.blob())
    .then(blob => {
      DownloadFile(
        blob,
        `new_file.${params.format}`,
        `application/${params.format}`
      );
    });
};

const getItemInDOM = (nodes, result = []) => {
  nodes.forEach(item => {
    item.attributes &&
      item.attributes.forEach(([key, value]) => {
        const valueArray = value.split(' ');
        if (key === 'class' && valueArray.includes('template-item')) {
          result.push(jsonToDom(item).outerHTML);
        }
      });

    if (item.childNodes.length > 0) {
      getItemInDOM(item.childNodes, result);
    }
  });

  return result.join('');
};

export { uploadFile, publishingTemplate, getLink, downloadFile, getItemInDOM };
