import { fireEvent } from "@testing-library/react";
import LoginPage from "../../components/loginComponents/LoginPage";
import { renderWithProviders } from "../../utils/test-utils";

describe("Login component test suite", () => {
  const renderComponent = () => renderWithProviders(<LoginPage />);

  it("should render login page", () => {
    const { getByTestId } = renderComponent();
    expect(getByTestId("login-page")).toBeVisible();
  });

  it("should render email input field and input changes", () => {
    const { queryByPlaceholderText } = renderComponent();
    const emailPlaceholder = queryByPlaceholderText(
      "email"
    )! as HTMLInputElement;

    expect(emailPlaceholder).toBeVisible();
    fireEvent.change(emailPlaceholder, { target: { value: "test" } });
    expect(emailPlaceholder.value).toBe("test");
  });

  it("should render password input field and input changes", () => {
    const { queryByPlaceholderText } = renderComponent();
    const passwordPlaceholder = queryByPlaceholderText(
      "password"
    )! as HTMLInputElement;

    expect(passwordPlaceholder).toBeVisible();
    fireEvent.change(passwordPlaceholder, { target: { value: "test" } });
    expect(passwordPlaceholder.value).toBe("test");
  });

  it("should show verifying after clicking on login button ", () => {
    const { getByText } = renderComponent();
    fireEvent.click(getByText("Login"));
    expect(getByText("Verifying...")).toBeVisible();
  });
});
