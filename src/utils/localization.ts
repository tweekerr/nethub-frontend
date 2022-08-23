import {ILanguage} from "../react-app-env";
import Localizations from "../constants/localizations";
import moment from "moment/moment";

export const switchLocal = (language: ILanguage) => {
  switch (language) {
    case Localizations.Ukrainian:
      moment.locale(Localizations.Ukrainian);
      break;
    case Localizations.English:
      moment.locale(Localizations.English);
      break;
  }
};
