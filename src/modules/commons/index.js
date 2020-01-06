import UUID from 'uuid/v1';
import moment from 'moment';

import PrivateLayout from './components/PrivateLayout';
import PublicLayout from './components/PublicLayout';
import ConfirmDialog from './components/ConfirmDialog';
import useStateWithLocalStorage from './useHooks/useStateWithLocalStorage';
import useCookie from './useHooks/useCookie';
import ImageDefault from './asset/ImageDefault';
import { toastrSuccess, toastrFail } from './components/CustomToastr';
import {
  uploadFile,
  publishingTemplate,
  downloadFile,
  getItemInDOM
} from './action';
import Cover1 from './asset/cover-1.jpg';
import Cover2 from './asset/cover-2.jpg';
import Cover1Preview from './asset/cover-1-preview.jpg';
import Cover2Preview from './asset/cover-2-preview.jpg';
import ImagePicker from './components/ImagePicker';

const API_ROOT = 'https://ft.survivalapp.com';
const APP_HOME = '/pandadoc';
const PRIMARY_COLOR = '#16FFBD';
const PRIMARY_COLOR_DARKER = '#439F76';
const SECONDARY_COLOR = '#151f2a';
const SECONDARY_COLOR_DARKER = '#F070A1';
const FORM_TEMPLATE_ITEMS = 'formTemplateItems';
const FORM_EDIT = 'formEdit';
const DEFAULT_TIMEOUT = 1000;
const DATE_FORMAT = 'DD/MM/YYYY';

const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result.map((item, index) => {
    return { ...item, order: index };
  });
};

const addToForm = (list, position, element) => {
  const result = Array.from(list);
  if (element.itemType === 'HEADER') result.unshift(element);
  else if (element.itemType === 'FOOTER') result.push(element);
  else result.splice(position, 0, element);

  return result.map((item, index) => {
    return { ...item, order: index };
  });
};

const ELEMENTS = [
  {
    id: UUID(),
    data: {
      top: 0,
      bottom: 0,
      element: 'Table',
      rows: [
        {
          id: UUID(),
          value: [
            {
              id: UUID(),
              value: '',
              order: 0
            },
            {
              id: UUID(),
              value: '',
              order: 1
            }
          ],
          order: 0
        }
      ],
      columns: [
        {
          id: UUID(),
          value: '',
          order: 0,
          flex: 0.5
        },
        {
          id: UUID(),
          value: '',
          order: 1,
          flex: 0.5
        }
      ]
    },
    itemType: 'TABLE'
  },
  {
    id: UUID(),
    data: {
      top: 0,
      bottom: 0,
      element: 'Header',
      content: 'Type your header here'
    },
    itemType: 'HEADER'
  },
  {
    id: UUID(),
    data: {
      top: 0,
      bottom: 0,
      element: 'Footer',
      content: 'Type your footer here'
    },
    itemType: 'FOOTER'
  },
  {
    id: UUID(),
    data: {
      top: 0,
      bottom: 0,
      element: 'Paragraph',
      content: '<div>Type your text here</div>'
    },
    itemType: 'PARAGRAPH'
  },
  {
    id: UUID(),
    data: {
      top: 0,
      bottom: 0,
      element: 'Checkboxes',
      label: 'New Checkbox',
      options: [{ id: UUID(), label: 'Option 1', value: false }]
    },
    itemType: 'CHECKBOXES'
  },
  {
    id: UUID(),
    data: {
      top: 0,
      bottom: 0,
      element: 'Image',
      src: ImageDefault
    },
    itemType: 'IMAGE'
  },
  {
    id: UUID(),
    data: {
      top: 0,
      bottom: 0,
      element: 'Video',
      src: ''
    },
    itemType: 'VIDEO'
  },
  {
    id: UUID(),
    data: {
      top: 0,
      bottom: 0,
      element: 'Logo',
      src: ImageDefault,
      label: 'Logo',
      left: true
    },
    itemType: 'LOGO'
  },
  {
    id: UUID(),
    data: {
      top: 0,
      bottom: 0,
      element: 'DatePicker',
      label: 'Date',
      content: moment().format(DATE_FORMAT)
    },
    itemType: 'DATEPICKER'
  },
  {
    id: UUID(),
    data: {
      top: 0,
      bottom: 0,
      element: 'Dropdown',
      label: 'List',
      options: [{ id: UUID(), label: 'Option 1', value: true }]
    },
    itemType: 'DROPDOWN'
  },
  {
    id: UUID(),
    data: {
      top: 0,
      bottom: 0,
      element: 'Rating',
      label: 'Rating',
      value: 0
    },
    itemType: 'RATING'
  },
  {
    id: UUID(),
    data: {
      top: 0,
      bottom: 0,
      element: 'Divider',
      value: 100
    },
    itemType: 'DIVIDER'
  },
  {
    id: UUID(),
    data: {
      top: 0,
      bottom: 0,
      element: 'CoverPage'
    },
    itemType: 'COVERPAGE'
  },
  {
    id: UUID(),
    data: {
      top: 0,
      bottom: 0,
      element: 'PageBreak',
      content: `<div style='page-break-before: always;/'>`
    },
    itemType: 'PAGEBREAK'
  },
  {
    id: UUID(),
    data: {
      top: 0,
      bottom: 0,
      element: 'Signature',
      src: '',
      position: 'left'
    },
    itemType: 'SIGNATURE'
  }
];

let timer;
const debounced = (fn, timeout = DEFAULT_TIMEOUT) => {
  if (timer) {
    clearTimeout(timer);
  }
  timer = setTimeout(() => {
    fn();
    timer = null;
  }, timeout);
};

const renderIf = condition => component => (condition ? component : null);

const getBase64 = file => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
};

const BACKGROUND_IMAGE = { Cover1, Cover2, Cover1Preview, Cover2Preview };

const getTemplateId = pathname => {
  let templateId = pathname.match(/\d+$/);
  return templateId ? templateId[0] : null;
};

export {
  PrivateLayout,
  PublicLayout,
  ConfirmDialog,
  reorder,
  addToForm,
  toastrSuccess,
  toastrFail,
  debounced,
  renderIf,
  getBase64,
  uploadFile,
  useStateWithLocalStorage,
  useCookie,
  publishingTemplate,
  ImagePicker,
  getTemplateId,
  downloadFile,
  getItemInDOM
};

export {
  FORM_EDIT,
  ELEMENTS,
  SECONDARY_COLOR_DARKER,
  SECONDARY_COLOR,
  PRIMARY_COLOR_DARKER,
  PRIMARY_COLOR,
  API_ROOT,
  APP_HOME,
  FORM_TEMPLATE_ITEMS,
  DATE_FORMAT,
  BACKGROUND_IMAGE
};
