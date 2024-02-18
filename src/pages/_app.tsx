import { store } from "@/api/store";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import { appWithTranslation } from "next-i18next";
import { Toaster } from "react-hot-toast";
import ErrorBoundary from "./error-boundry";
function App({ Component, pageProps }: AppProps) {
  return (
    <ErrorBoundary>
      <Provider store={store}>
        <Toaster
          position="top-right"
          toastOptions={{
            iconTheme: {
              primary: "#4A13E7",
              secondary: "#18d9c5",
            },
            duration: 3000,
          }}
        />

        <Component {...pageProps} />
      </Provider>
    </ErrorBoundary>
  );
}

export default appWithTranslation(App);
