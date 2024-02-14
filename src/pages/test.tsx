import DocViewer from "react-doc-viewer";

function App() {
  const docs = [
    { uri: "https://kaufes-dev-v2.s3.me-south-1.amazonaws.com/R-2095-1-Umzugsfuchs-%282%29.1707926963724.pdf" },
  ];

  return <DocViewer documents={docs} />;
}

export default App