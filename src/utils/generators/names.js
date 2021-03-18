import en from "./locales/en.json";
import pl from "./locales/pl.json";
import { sample } from "lodash";

const languages = { en, pl };

export function generateName(lang) {
  const langDict = languages[lang] || languages.en;
  const adjective = sample(langDict.adjective);
  const noun = sample(langDict.noun);
  return [adjective, noun].join(" ");
}
