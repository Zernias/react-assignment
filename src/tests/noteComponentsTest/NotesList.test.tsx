import { renderWithProviders } from "../../utils/test-utils";
import NotesList from "../../components/noteComponents/NotesList";

describe("Notes list component test suite", () => {
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
    renderWithProviders(<NotesList />, { preloadedState });

  it("should render a list of notes", () => {
    const { getByTestId } = renderComponent();
    expect(getByTestId("list-of-notes")).toBeVisible();
  });

  it("should render 2 notes", () => {
    const { getByTestId } = renderComponent();
    expect(getByTestId("note-0")).toBeVisible();
    expect(getByTestId("note-1")).toBeVisible();
  });

  it("should render the title and description of the mocked notes", () => {
    const { getByTestId } = renderComponent();
    expect(getByTestId("card-title-0")).toHaveTextContent("test-title1");
    expect(getByTestId("card-title-1")).toHaveTextContent("test-title2");
    expect(getByTestId("card-preview-0")).toHaveTextContent(
      "test-description1"
    );
    expect(getByTestId("card-preview-1")).toHaveTextContent(
      "test-description2"
    );
  });
});
