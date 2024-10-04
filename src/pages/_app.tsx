import { store } from "@/api/store";
import "@/styles/globals.css";
import "@/styles/calendarStyles.css";

import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import { appWithTranslation } from "next-i18next";
import ErrorBoundary from "./error-boundry";
import ToastProvider from "./toast-provider";

function App({ Component, pageProps }: AppProps) {
  return (
    <ErrorBoundary>
      <Provider store={store}>
        <ToastProvider>
          <Component {...pageProps} />
        </ToastProvider>
      </Provider>
    </ErrorBoundary>
  );
}

export default appWithTranslation(App);
