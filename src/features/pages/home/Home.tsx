import React, { useEffect } from 'react';
import { Text } from 'react-native-elements';
import { connect } from 'dva';

const HomePage = () => {
  useEffect(() => {}, []);
  return <Text>This is the home page</Text>;
};

// pull the user info

export default connect(() => {})(HomePage);
