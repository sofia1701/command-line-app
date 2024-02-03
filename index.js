import { readFile } from "fs";

const fileReader = (filePath) => {
  readFile(filePath, "utf8", (err, text) => {
    if (err) throw err;

    //Object
    const wordCountObject = text
      .replace(/[.,]/g, "")
      .split(/\s/)
      .reduce(
        (map, word) =>
          Object.assign(map, {
            [word]: map[word] ? map[word] + 1 : 1,
          }),
        {}
      );

    //Convert object to array
    const wordCountArray = Object.entries(wordCountObject);

    //Sort array based on number of occurrences
    wordCountArray.sort((a, b) => b[1] - a[1]);

    //Convert back to object
    const sortedWordCountObject = Object.fromEntries(wordCountArray);

    console.log(sortedWordCountObject);
  });
};

export { fileReader };

