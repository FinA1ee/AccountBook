import React, { useEffect } from 'react';
import { Button, Text } from 'react-native-elements';
import { connect } from 'dva';
import { UserModelState } from 'src/features/models/user';

const HomePage = ({ dispatch, userInfo, accountInfo }) => {
  useEffect(() => {
    // console.log('acc: ', ste);
    // console.log('Calling init');
    // try {
    //   dispatch({
    //     type: 'user/init',
    //   });
    // } catch (e) {
    //   console.error(e);
    // }
  }, [accountInfo]);

  return (
    <Text>
      {`This is theng home page ${accountInfo?.balance}`}
      <Button
        title={'Test Button'}
        onPress={() => {
          console.log('Calling init');
          dispatch({
            type: 'user/init',
            payload: {},
          });
        }}
      />
    </Text>
  );
};

function mapStateToProps(state) {
  console.log('state:', state);
  return { userInfo: state.user.userInfo, accountInfo: state.user.accountInfo };
}

export default connect(mapStateToProps)(HomePage);
