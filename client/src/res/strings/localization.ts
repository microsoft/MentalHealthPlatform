import * as englishStrings from './1033.json';
import * as frenchStrings from './1036.json';

interface IStringData {
    [key: string]: {
        description: string,
        value: string
    }
}

export default class Localization {
    static getLocalizedString = (key: string) => {
        const languageCode = 1036;
        const strings = Localization.getStrings(languageCode);

        return strings[key] && strings[key].value || key;
    }

    static getStrings = (languageCode: number) => {
        switch (languageCode) {
						case 1036:
								return frenchStrings as IStringData;
            case 1033:
            default:
                return englishStrings as IStringData;
        }
    }
}