import React, { Fragment, useState, useEffect, useRef } from 'react';
import { StyleProp, StyleSheet, Animated, View, Pressable, Text, AppState } from 'react-native';
import LottieView from 'lottie-react-native';
import WalletAnime from '@assets/lottie/wallet.json';
import { APP_TITLE, APP_SLOGAN } from '../../utils/consts';
import { HOME_ANIM, HOME_TEXT } from './consts';
import { Colors } from '@lego/colors';

const HomePage = ({ navigation }) => {
  const animRef = useRef<LottieView>(null);
  const textOpacity = useRef(new Animated.Value(0)).current;
  const animWidth = useRef(new Animated.Value(HOME_ANIM.widthLarge)).current;
  const animHeight = useRef(new Animated.Value(HOME_ANIM.heightLarge)).current;
  const appState = useRef(AppState.currentState);
  const [appStateVisible, setAppStateVisible] = useState(appState.current);
  const [animDone, setAnimDone] = useState(false);

  useEffect(() => {
    console.log('fucking');
    setTimeout(() => {
      animRef.current?.pause();
      setAnimDone(true);
    }, 1500);
  }, []);

  useEffect(() => {
    const subscription = AppState.addEventListener('change', nextAppState => {
      if (appState.current.match(/inactive|background/) && nextAppState === 'active') {
        console.log('App has come to the foreground!');

        console.log('Running!');
        animRef.current?.play(6, 31);
        // setTimeout(() => {
        //   animRef.current?.pause();
        // }, 1500);
      }

      appState.current = nextAppState;
      setAppStateVisible(appState.current);
      console.log('AppState', appState.current);
    });

    return () => {
      subscription.remove();
    };
  }, []);

  useEffect(() => {
    console.log('Running animations');
    if (animDone) {
      Animated.sequence([
        Animated.parallel([
          Animated.timing(animWidth, {
            toValue: HOME_ANIM.widthSmall,
            duration: 1000,
            useNativeDriver: false,
          }),
          Animated.timing(animHeight, {
            toValue: HOME_ANIM.heightSmall,
            duration: 1000,
            useNativeDriver: false,
          }),
        ]),
        Animated.timing(textOpacity, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: false,
        }),
      ]).start();
    }
  }, [animDone, animWidth, animHeight, textOpacity]);

  const renderText = (content: string, style: Animated.AnimatedProps<StyleProp<any>>) => {
    return <Animated.Text style={{ ...style }}>{content}</Animated.Text>;
  };

  const renderLottieAnim = () => {
    return (
      <Animated.View
        style={{
          ...styles.animViewContainer,
          marginBottom: animDone ? 0 : 600,
        }}>
        <LottieView
          ref={animRef}
          style={styles.anim}
          source={WalletAnime}
          speed={animDone ? 0.8 : HOME_ANIM.speed}
          loop={true}
          autoPlay
          // onAnimationFinish={() => {
          //   setAnimDone(true);
          // }}
        />
      </Animated.View>
    );
  };

  const renderButtons = () => {
    return (
      <View style={styles.btnGroup}>
        <Pressable
          style={styles.signupBtn}
          onPress={() => {
            navigation.navigate('Signup', {});
          }}>
          <Text style={styles.loginBtnText}>{HOME_TEXT.signUp}</Text>
        </Pressable>
        <Pressable
          style={styles.loginBtn}
          onPress={() => {
            navigation.navigate('Login', {});
          }}>
          <Text style={styles.loginBtnText}>{HOME_TEXT.login}</Text>
        </Pressable>
      </View>
    );
  };

  const renderMainScreen = () => {
    return (
      <Fragment>
        {renderText(APP_TITLE, styles.title)}
        {renderText(APP_SLOGAN, styles.slogan)}
        {renderLottieAnim()}
        {renderButtons()}
      </Fragment>
    );
  };

  const styles = StyleSheet.create({
    page: {
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      marginTop: 80,
    },
    animViewContainer: {
      // flex: 3,
      height: animHeight as unknown as number,
      width: animWidth as unknown as number,
      marginBottom: 200,
    },
    anim: {
      position: 'relative',
      alignSelf: 'center',
      height: '100%',
      width: '100%',
      marginRight: 'auto',
    },
    title: {
      opacity: textOpacity as unknown as number,
      // flex: 1,
      color: Colors.Black01,
      fontSize: 48,
      fontWeight: '700',
      // fontStyle: "italic",
      marginBottom: 20,
    },
    slogan: {
      // flex: 2,
      opacity: textOpacity as unknown as number,
      color: Colors.Black01,
      fontSize: 17,
      fontWeight: '300',
    },
    btnGroup: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginTop: 80,
    },
    signupBtn: {
      minWidth: 120,
      heigth: 66,
      borderRadius: 5,
      textAlign: 'center',
      backgroundColor: Colors.Green01,
      marginRight: 40,
    },
    loginBtn: {
      minWidth: 120,
      heigth: 66,
      borderRadius: 5,
      backgroundColor: Colors.Green01,
    },
    loginBtnText: {
      fontSize: 24,
      lineHeight: 45,
      fontWeight: '500',
      color: Colors.Black01,
      textAlign: 'center',
    },
  });

  return <View style={styles.page}>{renderMainScreen()}</View>;
};

export default HomePage;
