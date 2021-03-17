import en from "./locales/en.json";
import pl from "./locales/pl.json";
import { sample } from "lodash";

const languages = { en, pl };

function conjugateAdj(lang, adjective) {
  if (lang === "pl") {
    // we only support plurals for now
    return adjective + "e";
  }

  return adjective;
}

export function generateName(lang) {
  const langDict = languages[lang] || languages.en;
  const adjective = sample(langDict.adjective);
  const noun = sample(langDict.noun);
  const name = [conjugateAdj(lang, adjective), noun].join(" ");
  return name;
}
