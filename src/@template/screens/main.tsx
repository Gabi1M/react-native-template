/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const Main = () => (
    <View style={styles.root}>
        <Text>Hello World</Text>
    </View>
);

const styles = StyleSheet.create({
    root: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default Main;
