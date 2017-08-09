"use strict";
import { rccConfig } from '../common/config';
import * as Request from '../common/request';

export let settings;

export function fetchCategories(end) {
    Request.get('/categories', end);
}

export function fetchPlayers(category, end) {
    let url = '/presences?event=training'
        + '&date=' + new Date().toISOString().substring(0, 10)
        + '&category=' + category
        + '&coachLicense=' + rccConfig.coachLicense;
    console.log()
    Request.get(url, end);
}

export function postSelection(players, end) {
    let delta = [];
    for (let player of players) {
        delta.push({
            event: player.event,
            category: player.category,
            coachLicense: player.coachLicense,
            playerLicense: player.playerLicense,
            date: player.date,
            present: player.present,
            presentStamp: player.presentStamp
        });
    }
    Request.put('/presences', delta, end);
}
export function filterByYear(year, players) {
    let filtered = [];
    saveSelectedYear(year);
    if (players) {
        for (let player of players) {
            if (player.playerLicense && player.playerLicense.indexOf(year) == 0) {
                filtered.push(player);
            }
        }
    }
    return filtered;
}

export function getDefaultCategory(categories) {
    let training = rccConfig.training;
    if (training.category) {
        for (let category of categories) {
            if (training.category == category.name) {
                return category;
            }
        }
    }
    return categories[0];
}
export function getDefaultYear(category) {
    let training = rccConfig.training;
    if (training.category) {
        let defYear = training.year;
        if (defYear
            && ((defYear == category.year1)
                || (defYear == category.year2)
                || (defYear == category.year3))) {
            return defYear;
        }
    }
    return category.year1;
}
export function saveSelectedCategory(category) {
    let training = rccConfig.training;
    if (training.category != category) {
        training.category = category.name;
        training.year = getDefaultYear(category);
        rccConfig.write();
    }
    return training.year;
}
function saveSelectedYear(year) {
    let training = rccConfig.training;
    if (training.year != year) {
        training.year = year;
        rccConfig.write();
    }
}
