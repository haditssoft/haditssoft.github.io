/* eslint-disable jsx-a11y/anchor-is-valid, no-alert */

import React from 'react';
import Link from '@material-ui/core/Link';

export default function ButtonLink(props) {


  return (
    <Link
      style={{ color: props.linkColor}}
      classes={props.classes || {}}
      component="button"
      variant="body2"
      onClick={props.clicked}
    >
      {props.textLabel}
    </Link>
  );
};