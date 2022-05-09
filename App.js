/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
// import type {Node} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import messaging from '@react-native-firebase/messaging';
// import Notifications from 'react-native-notifree';
import {useEffect} from 'react/cjs/react.development';
// import { Platform } from 'react-native';

const Section = ({children, title}) => {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <View style={styles.sectionContainer}>
      <Text
        style={[
          styles.sectionTitle,
          {
            color: isDarkMode ? Colors.white : Colors.black,
          },
        ]}>
        {title}
      </Text>
      <Text
        style={[
          styles.sectionDescription,
          {
            color: isDarkMode ? Colors.light : Colors.dark,
          },
        ]}>
        {children}
      </Text>
    </View>
  );
};

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const handleMessagingToken = token => {
    console.log('handleMessagingToken', token);
  };

  const handleMessagingRecieved = msg => {
    console.log('handleMessagingRecieved', msg);
  };

  const handleNotificationOpenedApp = msg => {
    console.log('handleClickInNotification', msg);
  };

  const handleInitialNotification = async () => {
    const notification = await messaging().getInitialNotification();
    console.log('handleInitialNotification', notification);
  };

  // const createAndroidNotificationsChannels = async () => {
  //   const group = new Notifications.Android.ChannelGroup('default', 'Padrão');
  //   await Notifications().android.createChannelGroup(group);

  //   const channelDefault = new Notifications.Android.Channel(
  //     'defautl',
  //     'Padrão',
  //     Notifications.Android.importance.Default,
  //   )
  //     .setDescription('Padrão')
  //     .enableVibration(true)
  //     .setByPassDnd(true)
  //     .enableLigths(true)
  //     .setSound('default')
  //     .setGroup(group.groupId);

  //   await notifications.android.createChannels([channelDefault]);
  // };

  useEffect(() => {
    // if (Platform.OS === 'android') {
    //   createAndroidNotificationsChannels();
    // }
    handleInitialNotification;
    messaging().getToken().then(handleMessagingToken);

    const removeOnTokenRefresh =
      messaging().onTokenRefresh(handleMessagingToken);

    const handleMsg = messaging().onMessage(handleMessagingRecieved);
    const handleNotificatonOpenApp = messaging().onNotificationOpenedApp(
      handleNotificationOpenedApp,
    );

    //canais e grupos de notificaçoes

    return () => {
      removeOnTokenRefresh;
      handleMsg;
      handleNotificatonOpenApp;
    };
  }, []);

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}>
        <Header />
        <View
          style={{
            backgroundColor: isDarkMode ? Colors.black : Colors.white,
          }}>
          <Section title="Step One">
            Edit <Text style={styles.highlight}>App.js</Text> to change this
            screen and then come back to see your edits :) d-9.
          </Section>
          {/* <Section title="See Your Changes">
            <ReloadInstructions />
          </Section>
          <Section title="Debug">
            <DebugInstructions />
          </Section>
          <Section title="Learn More">
            Read the docs to discover what to do next:
          </Section> */}
          {/* <LearnMoreLinks /> */}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
