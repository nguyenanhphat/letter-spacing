import UUID from 'uuid/v1';

import CheckboxCustom from './components/CheckboxCustom';
import InputCustom from './components/InputCustom';
import LabelCustom from './components/LabelCustom';
import ParagraphCustom from './components/ParagraphCustom';
import ImageCustom from './components/ImageCustom';
import VideoCustom from './components/VideoCustom';
import LogoCustom from './components/LogoCustom';
import DatePickerCustom from './components/DatePickerCustom';
import DropdownCustom from './components/DropdownCustom';
import RatingCustom from './components/RatingCustom';
import DividerCustom from './components/DividerCustom';
import CoverPage from './components/CoverPage';
import PageBreak from './components/PageBreak';
import TableCustom from './components/TableCustom';
import FooterCustom from './components/FooterCustom';
import SignatureCustom from './components/SignatureCustom';
import ImageDefault from '../commons/asset/ImageDefault';
import image from '../commons/asset';

const TINY_API_KEY = 'z39fysztyoavfi56ajlyryx9feto25yc4ilnzx1u4nxpy0hp';

const COVER_DATA_DEFAULT = {
  logo: {
    id: UUID(),
    data: {
      element: 'Logo',
      src: ImageDefault,
      label: 'Logo',
      left: true
    },
    y: 100
  },
  header: {
    id: UUID(),
    data: { element: 'Paragraph', content: '<p>Type your text here</p>' },
    y: 300
  },
  content: {
    id: UUID(),
    data: [
      {
        id: UUID(),
        data: {
          element: 'Paragraph',
          content: '<p>Type your text here</p>'
        }
      },
      {
        id: UUID(),
        data: {
          element: 'Paragraph',
          content: '<p>Type your text here</p>'
        }
      }
    ],
    columnCount: 2,
    y: 500
  },
  background: null
};

const COVER_PAGE_BACKGROUND = [
  {
    imageOriginal: image.cover1,
    imagePreview: image.cover1Preview
  },
  {
    imageOriginal: image.cover2,
    imagePreview: image.cover2Preview
  }
];

export {
  CheckboxCustom,
  InputCustom,
  LabelCustom,
  ParagraphCustom,
  ImageCustom,
  VideoCustom,
  LogoCustom,
  DatePickerCustom,
  DropdownCustom,
  RatingCustom,
  DividerCustom,
  CoverPage,
  PageBreak,
  TableCustom,
  FooterCustom,
  SignatureCustom
};

export { TINY_API_KEY, COVER_DATA_DEFAULT, COVER_PAGE_BACKGROUND };
