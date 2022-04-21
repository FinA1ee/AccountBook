import React, { Fragment, useState, useEffect, useRef } from "react";
import { StyleProp, StyleSheet, Animated, View, Dimensions } from "react-native";
import LottieView from 'lottie-react-native';
import WalletAnime from '@assets/lottie/wallet.json';
import { APP_TITLE, APP_SLOGAN } from "../utils/consts";

const ANIM_SPEED = 1;

const HomePage = () => {
  const textOpacity = useRef(new Animated.Value(0)).current;
  const animWidth = useRef(new Animated.Value(450)).current;
  const animHeight = useRef(new Animated.Value(450)).current;

  const [animDone, setAnimDone] = useState(false);

  useEffect(() => {
    console.log("width: ", Dimensions.get('window').width);
    console.log("height: ", Dimensions.get('window').height);
    if (animDone) {
      Animated.sequence([
        Animated.parallel([
          Animated.timing(animWidth, {
            toValue: 300,
            duration: 1000,
            useNativeDriver: false
          }),
          Animated.timing(animHeight, {
            toValue: 300,
            duration: 1000,
            useNativeDriver: false
          })
        ]),
        Animated.timing(textOpacity, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: false
        })
      ]).start();
    }
  }, [animDone, animWidth, animHeight, textOpacity])

  const renderText = (content: string, style: Animated.AnimatedProps<StyleProp<any>>) => {
    
    return <Animated.Text style={{...style}}>{content}</Animated.Text>
  }

  const renderLottieAnim = () => {
    return (
      <Animated.View style={{ ...styles.animViewContainer, marginBottom: animDone ? 0 : 600}}>
        <LottieView
          style={styles.anim}
          source={WalletAnime}
          speed={ANIM_SPEED}
          loop={false}
          autoPlay
          onAnimationFinish={() => {
            setAnimDone(true);
          }}
        />
      </Animated.View>
    );
  };

  const renderMainScreen = () => {
    return (
      <Fragment>
        {renderText(APP_TITLE, styles.title)}
        {renderText(APP_SLOGAN, styles.slogan)}
        {renderLottieAnim()}
      </Fragment>
    )
  };

  const styles = StyleSheet.create({
    page: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    animViewContainer: {
      flex: 3,
      height: animHeight as unknown as number,
      width: animWidth as unknown as number,
      marginBottom: 200
    },
    anim: {
      position: 'relative',
      alignSelf: 'center',
      height: '100%',
      width: '100%',
      marginRight: 'auto'
    },
    title: {
      opacity: textOpacity as unknown as number,
      marginTop: 80,
      flex: 1,
      color: '#1F2329',
      fontSize: 48,
      fontWeight: "700",
      fontStyle: "italic"
    },
    slogan: {
      flex: 2,
      opacity: textOpacity as unknown as number,
      color: '#1F2329',
      fontSize: 17,
      fontWeight: "300"
    }
  });
  
  return (
    <View style={styles.page}>
      {renderMainScreen()}
    </View>
  );
};

export default HomePage;
