import React, { Fragment, useState } from 'react';
import SettingsIcon from '@material-ui/icons/SettingsRounded';
import { IconButton, Menu, MenuItem, Divider } from '@material-ui/core';
import { logout } from '../../auths';

const SettingApplication = () => {
  const [isSetting, setIsSetting] = useState(null);

  return (
    <Fragment>
      <Divider />
      <IconButton
        color="inherit"
        aria-owns={isSetting ? 'simple-menu' : undefined}
        aria-haspopup="true"
        onClick={event => setIsSetting(event.currentTarget)}
      >
        <SettingsIcon />
      </IconButton>

      <Divider />

      <Menu
        id="simple-menu"
        anchorEl={isSetting}
        open={Boolean(isSetting)}
        onClose={() => setIsSetting(null)}
      >
        <MenuItem
          onClick={() => {
            logout();
            setIsSetting(null);
          }}
        >
          Logout
        </MenuItem>
      </Menu>
      <Divider />
    </Fragment>
  );
};

export default SettingApplication;
