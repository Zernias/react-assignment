import { renderWithProviders } from "../../utils/test-utils";
import NotesEntryPage from "../../components/noteComponents/NotesEntryPage";
import { fireEvent } from "@testing-library/react";
import * as router from "react-router";

describe("Notes entry page component test suite", () => {
  const preloadedState = {
    login: {
      username: "",
      password: "",
      isLoading: false,
      error: "",
      isLogged: true,
      token: "",
    },
    note: {
      token: "",
      listOfNotes: [
        {
          id: "0",
          date: "12-12-2022",
          description: "test-description1",
          title: "test-title1",
        },
        {
          id: "1",
          date: "12-13-2022",
          description: "test-description2",
          title: "test-title2",
        },
      ],
      noteInputs: {
        title: "",
        description: "",
      },
      previewId: null,
      searchInput: "",
      isEditable: false,
    },
  };

  const renderComponent = () =>
    renderWithProviders(<NotesEntryPage />, { preloadedState });

  const navigate = jest.fn();

  beforeEach(() => {
    jest.spyOn(router, "useNavigate").mockImplementation(() => navigate);
  });
  it("should render a list of notes and navigation bar", () => {
    const { getByTestId } = renderComponent();
    expect(getByTestId("navigation-bar")).toBeVisible();
    expect(getByTestId("list-of-notes")).toBeVisible();
    expect(getByTestId("click-note-message")).toHaveTextContent(
      "Click a note to preview it."
    );
  });

  //Navigation Bar Tests
  it("should render only the note based on the search bar input ", () => {
    const { queryByPlaceholderText, getByTestId } = renderComponent();
    const searchbarPlaceholder = queryByPlaceholderText(
      "Search note's title..."
    )! as HTMLInputElement;
    expect(searchbarPlaceholder).toBeVisible();
    fireEvent.change(searchbarPlaceholder, {
      target: { value: "test-title1" },
    });
    expect(searchbarPlaceholder.value).toBe("test-title1");
    expect(getByTestId("card-title-0")).toHaveTextContent("test-title1");
    expect(getByTestId("card-preview-0")).toHaveTextContent(
      "test-description1"
    );
  });

  //View Note Tests
  it("should open the note card to view when clicked", () => {
    const { getByTestId } = renderComponent();
    fireEvent.click(getByTestId("note-0"));
    expect(getByTestId("view-note")).toBeVisible();
    expect(getByTestId("view-close-button")).toBeVisible();
    expect(getByTestId("view-title")).toHaveTextContent("test-title1");
    expect(getByTestId("view-description")).toHaveTextContent(
      "test-description1"
    );
    expect(getByTestId("view-buttons")).toBeVisible();
  });

  it("should navigate to path /edit/0 when edit button is clicked", () => {
    const { getByTestId } = renderComponent();
    fireEvent.click(getByTestId("note-0"));
    fireEvent.click(getByTestId("edit-button"));
    expect(navigate).toHaveBeenCalledWith("/edit/0", {
      preventScrollReset: undefined,
      relative: undefined,
      replace: false,
      state: undefined,
    });
  });

  it("should navigate to path /notes when delete button is clicked", () => {
    const { getByTestId } = renderComponent();
    fireEvent.click(getByTestId("note-0"));
    fireEvent.click(getByTestId("delete-button"));
    expect(navigate).toHaveBeenCalledWith("/notes", {
      preventScrollReset: undefined,
      relative: undefined,
      replace: false,
      state: undefined,
    });
  });

  it("should close the note card when close button is clicked", () => {
    const { getByTestId } = renderComponent();
    fireEvent.click(getByTestId("note-0"));
    fireEvent.click(getByTestId("view-close-button"));
    expect(getByTestId("notes-page")).toBeVisible();
  });

  it("should render no notes message when there are no notes", () => {
    const { getByTestId } = renderWithProviders(<NotesEntryPage />);
    expect(getByTestId("no-notes-message")).toBeVisible();
    expect(getByTestId("no-notes-message")).toHaveTextContent(
      "You have no notes yet!"
    );
  });
});
