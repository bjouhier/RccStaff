"use strict";
import React, { Component } from 'react';
import { StyleSheet, View, Picker, Platform } from 'react-native';
import {  ButtonGroup } from 'react-native-elements';
import ModalPicker from 'react-native-modal-picker'
import * as css from '../../resource/styles';

const styles = StyleSheet.create({
    root: {
        /*  flex: 1,
          flexDirection: 'row',
          alignItems: 'center',
          padding: 15,*/
    }
})
export default class Category extends Component {
    get years() {
        for (let category of this.props.categories) {
            if (category.name == this.props.seletectedCategory.name) {
                let years = [];
                category.year1 && years.push(category.year1);
                category.year2 && years.push(category.year2);
                category.year3 && years.push(category.year3);
                return years;
            }
        }
    }
    onCategoryChange = (value) => {
        this.props.onCategoryChange(this.props.categories[value]);
    }
    onYearChange = (value) => {
        this.props.onYearChange(this.years[value]);
    }
    renderYears() {
        let years = this.years;
        if (years) {            
            let selectedIndex;
            for (let year of years) {
                if (year == this.props.selectedYear) {
                    selectedIndex = this.years.indexOf(year);
                    break;
                }
            }
            return <ButtonGroup
                onPress={this.onYearChange}
                selectedIndex={selectedIndex || 0}
                buttons={years} />
        }
    }
    renderDefault() {
        return <View style={styles.root}>
            <Picker
                selectedValue={this.props.categories.indexOf(this.props.seletectedCategory)}
                onValueChange={this.onCategoryChange}>
                {
                    this.props.categories.map((item, index) => <Picker.Item key={index} label={item.name} value={index} />)
                }
            </Picker>
            {this.renderYears()}
        </View>
    }

    renderIos() {
        const initIndex = this.props.categories.indexOf(this.props.seletectedCategory);
        return <View style={{paddingVertical: 10}}>
            <View style={{paddingHorizontal: 10 }}>
                <ModalPicker selectStyle={{paddingBottom:28, alignItems: 'center'}}
                    data={this.props.categories.map((cat, i) => ({ key: i, label: cat.name }))}
                    initValue={initIndex >= 0 ? this.props.categories[initIndex].name : 'Selectionner ...'}
                    onChange={item => this.onCategoryChange(item.key)}>
                </ModalPicker>
            </View>
            {this.renderYears()}
        </View>
    }
    render() {
            return Platform.OS === 'ios' ? this.renderIos() : this.renderDefault();
    }
}