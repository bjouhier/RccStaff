import { AsyncStorage } from 'react-native';

const SERVER_KEY = "RCC_APP_SETTINGS";
const DEFAULT_SERVER = "http://54.213.132.224";

class Config {
    data = {};
    get modeDebug() {
        return false;
    }
    read(onRead) {
        AsyncStorage.getItem(SERVER_KEY, (error, value) => {
            this.data = value && JSON.parse(value);            
            if (!this.data) {
                if (this.modeDebug) {
                    this.data = {
                        server: DEFAULT_SERVER,
                        email: "daniel.coz@sage.com",
                        password: "RCC-999",
                        coachLicense: "2001091046249"
                    };
                }
                else {
                    this.data = {
                        server: DEFAULT_SERVER
                    };
                }
            }
            onRead();
        });
    }
    write(){
        AsyncStorage.setItem(SERVER_KEY, JSON.stringify(this.data));
    }
    get email() {
        return this.data.email || "";
    }
    set email(value) {
        this.data.email = value;
    }
    get password() {
        return this.data.password || "";
    }
    set password(value) {
        this.data.password = value;
    }
    get server() {
        return this.data.server || "";
    }
    set server(value) {
        this.data.server = value;
    }
    get coachLicense() {
        return this.data.coachLicense || "";
    }
    set coachLicense(value) {
        this.data.coachLicense = value;
    }
    get training() {
        if (!this.data.training) {
            this.data.training = {};
        }
        return this.data.training;
    }
    get authenticated() {
        return !!(this.email && this.password);
    }
}


export const rccConfig = new Config();