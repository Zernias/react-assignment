import { fireEvent } from "@testing-library/react";
import { renderWithProviders } from "../../utils/test-utils";
import * as router from "react-router";
import CreateNote from "../../components/noteComponents/CreateNote";

describe("Create note component test suite", () => {
  const renderComponent = () => renderWithProviders(<CreateNote />);

  const navigate = jest.fn();

  beforeEach(() => {
    jest.spyOn(router, "useNavigate").mockImplementation(() => navigate);
  });

  it("should render create note page", () => {
    const { getByTestId } = renderComponent();
    expect(getByTestId("create-note-form")).toBeVisible();
  });

  it("should render Title input field and allow for text input", () => {
    const { queryByPlaceholderText } = renderComponent();
    const searchbarPlaceholder = queryByPlaceholderText(
      "Title"
    )! as HTMLInputElement;
    expect(searchbarPlaceholder).toBeVisible();
    fireEvent.change(searchbarPlaceholder, { target: { value: "title-test" } });
    expect(searchbarPlaceholder.value).toBe("title-test");
  });

  it("should render description textarea and allow for text input", () => {
    const { queryByPlaceholderText } = renderComponent();
    const searchbarPlaceholder = queryByPlaceholderText(
      "Type your note here..."
    )! as HTMLInputElement;
    expect(searchbarPlaceholder).toBeVisible();
    fireEvent.change(searchbarPlaceholder, {
      target: { value: "description-test" },
    });
    expect(searchbarPlaceholder.value).toBe("description-test");
  });

  it("should navigate to path /notes when submit button is clicked, also means that handleFormSubmit method is executed", () => {
    const { getByTestId } = renderComponent();
    fireEvent.click(getByTestId("submit-create-button"));
    expect(navigate).toHaveBeenCalledWith("/notes");
  });

  it("should navigate to path /notes when cancel button is clicked", () => {
    const { getByTestId } = renderComponent();
    fireEvent.click(getByTestId("cancel-button"));
    expect(navigate).toBeCalledTimes(1);
    expect(navigate).toHaveBeenCalledWith("/notes", {
      preventScrollReset: undefined,
      relative: undefined,
      replace: false,
      state: undefined,
    });
  });
});
