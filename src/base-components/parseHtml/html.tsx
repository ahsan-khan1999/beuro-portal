import parse from "html-react-parser";

export const Html = () => {
  const html = "<h1>This is html</h1>";
  return <>{parse(html)}</>;
};
