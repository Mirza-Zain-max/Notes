import { Typography } from 'antd';
import React from 'react';

const CopyRights = () => {
  const { Title , Paragraph } = Typography;
  return (
    <footer className="footer">
      <div className=' p-2 text-center'>
      <Paragraph className='fs-5'>&copy; {new Date().getFullYear()} Your Company. All rights reserved.</Paragraph>
      </div>
    </footer>
  );
};

export default CopyRights;