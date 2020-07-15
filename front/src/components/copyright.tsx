import React from 'react';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';

const Copyright: React.FC = () => (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://0xbc01n.com/">0xbc01n</Link>{' '}
      {new Date().getFullYear()}{'.'}
    </Typography>
);

export default Copyright;
