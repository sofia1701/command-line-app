import { fileReader } from "../index";
import fs from "fs";

const mockTextFile = `sed id semper. Semper eget duis at tellus at urna condimentum mattis`;

const mockPathWithInvalidFileType =
  "/Users/sofiadionis/Documents/textFile1.pdf";
const mockPathWithValidFileType = "/Users/sofiadionis/Documents/textFile1.txt";

const loggedResults = {
  at: 2,
  sed: 1,
  id: 1,
  semper: 1,
  Semper: 1,
  eget: 1,
  duis: 1,
  tellus: 1,
  urna: 1,
  condimentum: 1,
  mattis: 1,
};

describe("fileReader", () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  test("should log message when type of file is not accepted", () => {
    const logSpy = jest.spyOn(console, "log");

    let readFileCallback;
    jest
      .spyOn(fs, "readFile")
      .mockImplementation((mockPath, options, callback) => {
        readFileCallback = callback;
      });

    fileReader(mockPathWithInvalidFileType);

    expect(logSpy).toHaveBeenCalledWith(
      "Please ensure the correct type of file is being passed."
    );

    expect(fs.readFile).not.toBeCalled();
  });

  test("should call readFile", () => {
    let readFileCallback;
    jest
      .spyOn(fs, "readFile")
      .mockImplementation((mockPath, options, callback) => {
        readFileCallback = callback;
      });

    fileReader(mockPathWithValidFileType);

    expect(fs.readFile).toBeCalledWith(
      mockPathWithValidFileType,
      "utf8",
      readFileCallback
    );
  });

  test("should count and log repeated words in text file", () => {
    const logSpy = jest.spyOn(console, "log");

    let readFileCallback;
    jest
      .spyOn(fs, "readFile")
      .mockImplementation((mockPath, options, callback) => {
        readFileCallback = callback;
      });

    fileReader(mockPathWithValidFileType);

    readFileCallback(null, mockTextFile);

    expect(logSpy).toBeCalledWith(loggedResults);
  });
});
