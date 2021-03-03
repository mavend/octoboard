import { omit } from "lodash";
import en from "./en";
import pl from "./pl";

const languages = { pl, en };

// list of languages and categories without actual phrases data
export const phrasesSets = Object.values(languages).map(({ key, name, categories }) => ({
  key,
  name,
  categories: categories.map((c) => omit(c, "phrases")),
}));

export function getPhrases(language = "en", categories = null) {
  let selectedCategories = languages[language].categories;

  if (categories || categories.length > 0) {
    selectedCategories = selectedCategories.filter(({ key }) => categories.includes(key));
  }

  return selectedCategories.map((c) => c.phrases).flat();
}
