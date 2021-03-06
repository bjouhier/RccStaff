"use strict";
import React, { Component } from 'react';
import { List, ListItem } from 'react-native-elements'
import LocaleStrings from '../../resource/localeStrings';
import { rccStore } from '../navigation/rccstore';
import { View } from 'react-native';
import * as css from '../../resource/styles';
import NavHeader from '../common/navHeader';

const screens = [
    {
        title: LocaleStrings.training_title,
        route: "Training",
        icon: "school"
    },
    {
        title: LocaleStrings.playerSelect_title,
        route: "PlayerSelect",
        icon: "assignment-ind"
    }, {
        title: LocaleStrings.matchCheck_title,
        route: "MatchCheck",
        icon: "assignment-turned-in"
    },/* {
        title: LocaleStrings.contacts_title,
        route: "ContactsRoute",
        icon: "group"
    }*/];

export default class Home extends Component {
    static navigationOptions = ({ navigation, screenProps }) => ({
        headerTitle: (<NavHeader icon="home" title={LocaleStrings.home_title} />),
        ...css.header
    });
    componentDidMount() {
        if (!rccStore.authenticated) {
            this.props.navigation.navigate('Login');
        }
    }
    onGoTo(screen) {
        this.props.navigation.navigate(screen.route);
    }
    render() {
        if (rccStore.authenticated) {
            return <List containerStyle={{ marginBottom: 20 }}>
                {screens.map((item) =>
                    <ListItem
                        key={item.route}
                        title={item.title}
                        leftIcon={{ name: item.icon }}
                        onPress={() => this.onGoTo(item)} />
                )}
            </List>
        }
        return <View />;
    }
}
