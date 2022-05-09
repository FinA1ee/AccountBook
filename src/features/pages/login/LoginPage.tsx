import { Colors } from '@lego/colors';
import React, { useRef, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Input, Text } from 'react-native-elements';
import Icon from 'react-native-vector-icons/AntDesign';
import i18n from '../../../common/i18n';

const prefix = 'login';

interface UserInfo {
  /**
   * @description 用户名
   */
  username: string;
  /**
   * @description 密码
   */
  password: string;
}

const initalInfo: UserInfo = {
  username: '',
  password: '',
};

const LoginPage = () => {
  const [userInfo, setUserInfo] = useState<UserInfo>(initalInfo);

  /** 提交表单 */
  const clickSubmit = async () => {
    const res = await SignUpApi.addNewUser({
      username: userInfo.username,
      password: userInfo.password,
    });
    if (res.code === 0 && res.result) {
      setSignupDone(true);
      setTimeout(() => {
        navigation.navigate('Login', {});
      }, 3000);
    }
  };

  const renderLoginPage = () => {
    return (
      <>
        <Text style={styles.title}>{i18n.t(`${prefix}.title`)}</Text>
        <View style={styles.section}>
          <Text style={styles.inputTitle}>{i18n.t(`${prefix}.username`)}</Text>
          <Input
            style={styles.inputBox}
            value={userInfo?.username}
            leftIcon={<Icon name={'user'} size={20} />}
            placeholder={i18n.t(`${prefix}.usernamePlaceholder`)}
            keyboardType={'default'}
            onChangeText={(text: string) => {
              setUserInfo({
                ...userInfo,
                username: text,
              });
            }}
            autoCompleteType={undefined}
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.inputTitle}>{i18n.t(`${prefix}.password`)}</Text>
          <Input
            style={styles.inputBox}
            value={userInfo?.password}
            placeholder={i18n.t(`${prefix}.passwordPlaceholder`)}
            leftIcon={<Icon name={'lock'} size={20} />}
            secureTextEntry={true}
            onChangeText={(text: string) => {
              setUserInfo({
                ...userInfo,
                password: text,
              });
            }}
            autoCompleteType={undefined}
          />
        </View>

        <Button
          type={'solid'}
          containerStyle={styles.confirmBtnContainer}
          buttonStyle={validForm ? styles.confirmBtn : styles.confirmBtnDisabled}
          onPress={() => clickSubmit()}
          title={i18n.t(`${prefix}.clickSignup`)}
          // titleStyle={styles.confirmText}
        />
      </>
    );
  };

  return <View style={styles.page}>{renderLoginPage()}</View>;
};

const styles = StyleSheet.create({
  page: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    marginTop: 40,
    marginLeft: 50,
    marginRight: 50,
    flex: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 40,
    marginRight: 'auto',
    marginLeft: 'auto',
  },
  section: {
    marginLeft: -10,
    marginBottom: 20,
    width: '100%',
  },
  inputBox: {
    height: 40,
    width: '100%',
    paddingLeft: 10,
  },
  inputTitle: {
    marginLeft: 10,
    marginTop: 8,
    fontSize: 18,
    fontWeight: '700',
  },
  confirmBtnContainer: {
    width: '100%',
    height: 40,
    marginTop: 50,
    borderRadius: 5,
  },
  confirmBtn: {
    backgroundColor: Colors.Red01,
  },
  confirmBtnDisabled: {
    backgroundColor: Colors.Red01,
    opacity: 0.5,
  },
});

export default LoginPage;
