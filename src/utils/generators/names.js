import en from "./locales/en.json";
import pl from "./locales/pl.json";
import { sample } from "lodash";

const languages = { en, pl };

export function generateName(lang) {
  // This should be possible with jest mocks, but I can't figure out how to do it 🤷‍♀️
  if (process.env.NODE_ENV === "test") return `${lang} test`;
  const langDict = languages[lang] || languages.en;
  const adjective = sample(langDict.adjective);
  const noun = sample(langDict.noun);
  return [adjective, noun].join(" ");
}
