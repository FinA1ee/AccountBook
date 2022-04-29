import { Colors } from '@lego/colors';
import React, { useEffect, useState } from 'react';
import Icon from 'react-native-vector-icons/AntDesign';
import { Button, Input } from 'react-native-elements';
import { StyleSheet, View, Text, TextInput } from 'react-native';
// import SignUpApi from '@apis/SignUp';

import i18n from '../../../common/i18n';

interface UserInfo {
  /**
   * @description 用户名
   */
  username: string;
  /**
   * @description 邮箱
   */
  email: string;
  /**
   * @description 密码
   */
  password: string;
  /**
   * @description 密码验证
   */
  verifiedPassword: string;
}

const initalInfo: UserInfo = {
  username: '',
  email: '',
  password: '',
  verifiedPassword: '',
};

const prefix = 'signUp';

const SignupPage = () => {
  const [userInfo, setUserInfo] = useState<UserInfo>(initalInfo);
  const [validForm, setValidForm] = useState<boolean>(false);

  const clickSubmit = async () => {
    // const res = await SignUpApi.addNewUser({
    //   username: userInfo.username,
    //   password: userInfo.password,
    //   email: userInfo.email,
    // });
  };

  useEffect(() => {
    const isValidForm =
      userInfo.username !== '' &&
      userInfo.email !== '' &&
      userInfo.password !== '' &&
      userInfo.password === userInfo.verifiedPassword;
    setValidForm(isValidForm);
  }, [userInfo]);

  return (
    <View style={styles.page}>
      <Text style={styles.title}>{i18n.t(`${prefix}.title`)}</Text>
      <View style={styles.section}>
        <Text style={styles.inputTitle}>{i18n.t(`${prefix}.username`)}</Text>
        <Input
          leftIcon={<Icon name={'user'} />}
          autoCompleteType={''}
          style={styles.inputBox}
          value={userInfo?.username}
          placeholder={i18n.t(`${prefix}.usernamePlaceholder`)}
          keyboardType={'default'}
          onChangeText={(text: string) => {
            console.log(text);
            setUserInfo({
              ...userInfo,
              username: text,
            });
          }}
          onBlur={() => {
            console.log('Checking duplicate username: ', userInfo.username);
          }}
        />
      </View>

      <View style={styles.section}>
        <Text style={styles.inputTitle}>{i18n.t(`${prefix}.email`)}</Text>
        <TextInput
          style={styles.inputBox}
          value={userInfo?.email}
          placeholder={i18n.t(`${prefix}.emailPlaceholder`)}
          keyboardType={'email-address'}
          onChangeText={(text: any) => {
            setUserInfo({
              ...userInfo,
              email: text,
            });
          }}
        />
      </View>

      <View style={styles.section}>
        <Text style={styles.inputTitle}>{i18n.t(`${prefix}.password`)}</Text>
        <TextInput
          style={styles.inputBox}
          value={userInfo?.password}
          placeholder={i18n.t(`${prefix}.passwordPlaceholder`)}
          secureTextEntry={true}
          onChangeText={(text: string) => {
            setUserInfo({
              ...userInfo,
              password: text,
            });
          }}
        />
      </View>

      <View style={styles.section}>
        <Text style={styles.inputTitle}>{i18n.t(`${prefix}.confirmPassword`)}</Text>
        <TextInput
          style={styles.inputBox}
          value={userInfo?.verifiedPassword}
          secureTextEntry={true}
          onChangeText={(text: string) => {
            setUserInfo({
              ...userInfo,
              verifiedPassword: text,
            });
          }}
        />
      </View>

      <Button
        type={'solid'}
        containerStyle={styles.confirmBtnContainer}
        buttonStyle={styles.confirmBtn}
        onPress={() => clickSubmit()}
        disabled={false}
        // disabled={!validForm}
        title={i18n.t(`${prefix}.clickSignup`)}
        // titleStyle={styles.confirmText}
      />
    </View>
  );
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
    marginBottom: 20,
  },
  section: {
    marginBottom: 20,
    width: '100%',
  },
  inputTitle: {
    marginTop: 8,
    marginBottom: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  inputBox: {
    height: 40,
    width: '100%',
    borderRadius: 5,
    borderColor: Colors.Black01,
    borderWidth: 1,
    // padding: 5,
    paddingLeft: 10,
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

  confirmDisabled: {
    width: '100%',
    height: 40,
    marginTop: 50,
    backgroundColor: Colors.Red01,
    opacity: 0.5,
  },
  confirmText: {
    textAlign: 'center',
    lineHeight: 40,
    color: Colors.White01,
  },
  confirmTextDisabled: {
    textAlign: 'center',
    lineHeight: 40,
    color: Colors.White02,
    opacity: 0.5,
  },
});

export default SignupPage;
