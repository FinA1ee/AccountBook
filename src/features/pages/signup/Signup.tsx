import {Colors} from '@lego/colors';
import React, {useEffect, useState} from 'react';
import {StyleSheet, View, Text, TextInput, Pressable} from 'react-native';
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

  useEffect(() => {}, []);

  return (
    <View style={styles.page}>
      <Text style={styles.title}>{i18n.t(`${prefix}.title`)}</Text>
      <View style={styles.section}>
        <Text style={styles.inputTitle}>{i18n.t(`${prefix}.username`)}</Text>
        <TextInput
          style={styles.inputBox}
          value={userInfo?.username}
          placeholder={i18n.t(`${prefix}.usernamePlaceholder`)}
          keyboardType={'default'}
          onChange={(e: any) => {
            console.log(e.target.value);
            setUserInfo({
              ...userInfo,
              username: e.target.value,
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
        />
      </View>

      <View style={styles.section}>
        <Text style={styles.inputTitle}>{i18n.t(`${prefix}.password`)}</Text>
        <TextInput
          style={styles.inputBox}
          value={userInfo?.password}
          placeholder={i18n.t(`${prefix}.passwordPlaceholder`)}
        />
      </View>

      <View style={styles.section}>
        <Text style={styles.inputTitle}>{i18n.t(`${prefix}.confirmPassword`)}</Text>
        <TextInput
          style={styles.inputBox}
          value={userInfo?.password}
          secureTextEntry={true}
          onChange={(e: any) => {
            setUserInfo({
              ...userInfo,
              password: e.target.value,
            });
          }}
        />
      </View>

      <Pressable style={styles.confirm}>
        <Text style={styles.confirmText}>{'SIGN UP'}</Text>
      </Pressable>
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
  confirm: {
    backgroundColor: Colors.Red01,
    width: '100%',
    height: 40,
    marginTop: 50,
    borderRadius: 5,
    borderWidth: 2,
    borderColor: Colors.Red01,
    shadowColor: Colors.Black01,
  },
  confirmText: {
    textAlign: 'center',
    lineHeight: 40,
    color: Colors.White01,
  },
});

export default SignupPage;
