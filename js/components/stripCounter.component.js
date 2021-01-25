import React from 'react';
import {useSelector} from 'react-redux';

import {Text} from 'native-base';

export const StripCounter = () => {
  const strips = useSelector(({strips}) => strips);

  return (
    <Text style={{alignSelf: 'center'}}>
      {strips.map((strip) => strip.device.id + '\n')}
    </Text>
  );
};
