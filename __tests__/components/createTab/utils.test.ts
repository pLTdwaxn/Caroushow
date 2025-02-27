import { pickImageAsync } from "@/components/createTab/utils";
import * as ImagePicker from "expo-image-picker";
import store from "@/store";
import { setImage } from "@/store/slices/imageSlice";

jest.mock("expo-image-picker", () => ({
  launchImageLibraryAsync: jest.fn(),
}));

jest.mock("@/store", () => ({
  dispatch: jest.fn(),
}));

jest.mock("@/store/slices/imageSlice", () => ({
  setImage: jest.fn(),
}));

describe("pickImageAsync", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  it("dispatches setImage action with selected image", async () => {
    const mockImage = { uri: "mock-uri", width: 100, height: 100 };
    (ImagePicker.launchImageLibraryAsync as jest.Mock).mockResolvedValueOnce({
      canceled: false,
      assets: [mockImage],
    });

    await pickImageAsync();

    expect(store.dispatch).toHaveBeenCalledWith(setImage(mockImage));
  });

  it("does not dispatch setImage action if image selection is canceled", async () => {
    (ImagePicker.launchImageLibraryAsync as jest.Mock).mockResolvedValueOnce({
      canceled: true,
    });

    await pickImageAsync();

    expect(store.dispatch).not.toHaveBeenCalled();
  });

  it("handles errors gracefully", async () => {
    const consoleErrorSpy = jest.spyOn(console, "error").mockImplementation();
    (ImagePicker.launchImageLibraryAsync as jest.Mock).mockRejectedValueOnce(
      new Error("Error picking image")
    );

    await pickImageAsync();

    expect(consoleErrorSpy).toHaveBeenCalledWith(
      new Error("Error picking image")
    );
    consoleErrorSpy.mockRestore();
  });
});
