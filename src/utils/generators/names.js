import en from "./locales/en.json";
import pl from "./locales/pl.json";
import { sample } from "lodash";

const languages = { en, pl };

function conjugateAdj(lang, adjective, noun) {
  if (lang === "pl") {
    if (noun.endsWith("a")) {
      return adjective + "a";
    }
    if (noun.endsWith("o") || noun.endsWith("i")) {
      return adjective + "e";
    }
    return adjective + "y";
  }

  return adjective;
}

export function generateName(lang) {
  const langDict = languages[lang] || languages.en;
  const adjective = sample(langDict.adjective);
  const noun = sample(langDict.noun);
  const name = [conjugateAdj(lang, adjective, noun), noun].join(" ");
  return name;
}
