import Link from 'next/link';
import { Divider } from '@mui/material';
import HeaderTitle from '../atoms/HeaderTitle';
import { EditorHeaders } from 'src/helpers/constants/editor-data';

const DataHeaders = () => {
  return (
    <>
      {Object.entries(EditorHeaders).map(([link, { title }]) => (
        <Link href={`/builder/${link}`} key={title} passHref>
          <a>
            <HeaderTitle title={title} />
            <Divider />
          </a>
        </Link>
      ))}
    </>
  );
};

export default DataHeaders;
