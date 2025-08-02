import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import { BrowserRouter, MemoryRouter } from "react-router-dom";
import { persistor, store } from "./context/store";
import { SearchProductContextProvider } from "./context/SearchProductContextApi";
import { MediaQueryContextProvider } from "./context/MediaQueryContextApi";
import { PersistGate } from "redux-persist/integration/react";
import Spinner from "./components/ui/Spinner";

export const renderWithProviders = (ui, {route="/", ...options} = {}) => {
  const queryClient = new QueryClient();
  window.history.pushState({}, "Test page", route);
  console.log("SearchProductContextProvider", SearchProductContextProvider);
  return render(
    <Provider store={store}>
      {/* <PersistGate loading={<Spinner />} persistor={persistor}> */}
      
      <QueryClientProvider client={queryClient}>
        <SearchProductContextProvider>
        <MediaQueryContextProvider>
        <MemoryRouter initialEntries={[route]}>
          {ui}
        </MemoryRouter>
        {/* <BrowserRouter>{ui}</BrowserRouter> */}
        </MediaQueryContextProvider>
        </SearchProductContextProvider>
      </QueryClientProvider>
      {/* </PersistGate> */}
    </Provider>,
    options
  );
};
