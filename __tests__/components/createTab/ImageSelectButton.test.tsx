import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import ImageSelectButton from "../../../components/ImageSelectButton";
import * as utils from "../../../utils/utils";

jest.mock("../../../utils/utils");

describe("ImageSelectButton", () => {
  it("renders correctly", () => {
    const { getByText } = render(<ImageSelectButton />);
    expect(getByText("Select Image")).toBeTruthy();
  });

  it("calls pickImageAsync on button press", () => {
    jest.spyOn(utils, "pickImageAsync").mockImplementation(jest.fn()); // Mock the function implementation
    const { getByText } = render(<ImageSelectButton />);
    fireEvent.press(getByText("Select Image"));
    expect(utils.pickImageAsync).toHaveBeenCalled();
  });
});
