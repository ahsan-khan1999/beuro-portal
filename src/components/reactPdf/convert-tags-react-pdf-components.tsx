import React from "react";
import { Text, View, StyleSheet } from "@react-pdf/renderer";
import { parseDocument } from "htmlparser2";
import DOMPurify from "dompurify";

const styles: any = StyleSheet.create({
  h1: {
    fontSize: 11.5,
    fontWeight: 600,
    fontStyle: "semibold",
  },
  h2: {
    fontSize: 9.5,
    fontWeight: 600,
    fontStyle: "semibold",
  },
  h3: {
    fontSize: 8.5,
  },
  h4: {
    fontSize: 7.5,
  },
  h5: {
    fontSize: 7,
  },
  h6: {
    fontSize: 7,
  },
  p: {
    fontSize: 9.5,
    fontWeight: 400,
    fontStyle: "normal",
  },
  span: {
    fontSize: 9.5,
    fontWeight: 400,
    fontStyle: "normal",
  },
  strong: {
    fontWeight: 600,
    fontStyle: "semibold",
  },
  li: {
    fontSize: 9.5,
    fontWeight: 400,
    fontStyle: "normal",
    marginLeft: 6,
  },
  ul: {
    paddingLeft: 8,
  },
  ol: {
    paddingLeft: 8,
  },
  div: {
    fontSize: 9.5,
    fontWeight: 400,
    fontStyle: "normal",
  },
});

const tagMapping: any = {
  h1: (props: any) => <Text style={props.style}>{props.children}</Text>,
  h2: (props: any) => <Text style={props.style}>{props.children}</Text>,
  h3: (props: any) => <Text style={props.style}>{props.children}</Text>,
  h4: (props: any) => <Text style={props.style}>{props.children}</Text>,
  h5: (props: any) => <Text style={props.style}>{props.children}</Text>,
  h6: (props: any) => <Text style={props.style}>{props.children}</Text>,
  p: (props: any) => <Text style={props.style}>{props.children}</Text>,
  strong: (props: any) => <Text style={props.style}>{props.children}</Text>,
  b: (props: any) => <Text style={props.style}>{props.children}</Text>,
  em: (props: any) => <Text style={props.style}>{props.children}</Text>,
  i: (props: any) => <Text style={props.style}>{props.children}</Text>,
  u: (props: any) => <Text style={props.style}>{props.children}</Text>,
  sup: (props: any) => <Text style={props.style}>{props.children}</Text>,
  sub: (props: any) => <Text style={props.style}>{props.children}</Text>,
  tr: (props: any) => <View style={props.style}>{props.children}</View>,
  th: (props: any) => <Text style={props.style}>{props.children}</Text>,
  td: (props: any) => <Text style={props.style}>{props.children}</Text>,
  caption: (props: any) => <Text style={props.style}>{props.children}</Text>,
  label: (props: any) => <Text style={props.style}>{props.children}</Text>,
  cite: (props: any) => <Text style={props.style}>{props.children}</Text>,
  code: (props: any) => <Text style={props.style}>{props.children}</Text>,
  pre: (props: any) => <Text style={props.style}>{props.children}</Text>,
  iframe: (props: any) => <View style={props.style}>{props.children}</View>,
  dl: (props: any) => <View style={props.style}>{props.children}</View>,
  dt: (props: any) => <Text style={props.style}>{props.children}</Text>,
  dd: (props: any) => <Text style={props.style}>{props.children}</Text>,
  a: (props: any) => <Text style={props.style}>{props.children}</Text>,
  s: (props: any) => <Text style={props.style}>{props.children}</Text>,
  ul: (props: any) => <View style={props.style}>{props.children}</View>,
  ol: (props: any) => <View style={props.style}>{props.children}</View>,
  li: (props: any) => <Text style={props.style}>• {props.children}</Text>,
  div: (props: any) => <View style={props.style}>{props.children}</View>,
  hr: (props: any) => <View style={props.style}>{props.children}</View>,
  nav: (props: any) => <View style={props.style}>{props.children}</View>,
  main: (props: any) => <View style={props.style}>{props.children}</View>,
  section: (props: any) => <View style={props.style}>{props.children}</View>,
  table: (props: any) => <View style={props.style}>{props.children}</View>,
  span: (props: any) => <Text style={props.style}>{props.children}</Text>,
  br: (props: any) => <Text style={props.style}>{"\n"}</Text>,
};

const cssToJsStyleMap: any = {
  "font-size": "fontSize",
  "font-weight": "fontWeight",
  "font-style": "fontStyle",
  "line-height": "lineHeight",
  "border-width": "borderwidth",
  "border-color": "borderColor",
  "border-style": "borderStyle",
  "box-sizing": "boxSizing",
  "font-family": "fontFamily",
  "tab-size": "tabSize",
  "flex-direction": "flexDirection",
  "align-items": "alignItems",
  "align-content": "alignContent",
  "justify-content": "justifyContent",
  "flex-end": "flexEnd",
  "flex-start": "flexStart",
};

const valueMaps: any = {
  fontSize: {
    "8px": "5.5px",
    "9px": "6px",
    "10px": "6.5px",
    "11px": "7px",
    "12px": "7.5px",
    "13px": "8px",
    "14px": "8.5px",
    "16px": "9.5px",
    "20px": "11.5px",
    "24px": "12.5px",
  },
  fontWeight: {
    thin: "100",
    light: "300",
    normal: "400",
    medium: "500",
    semibold: "600",
    bold: "700",
    bolder: "800",
  },
};

type FontSizeMap = { [key: string]: string };

function adjustStyles(cssStyle: string): object {
  const styleObject: any = {};
  const styles = cssStyle.split(";");

  styles.forEach((style) => {
    let [key, value] = style.split(":").map((s) => s.trim());
    if (!key || !value) return;

    if (cssToJsStyleMap[key]) {
      const jsStyleKey = cssToJsStyleMap[key];
      value = valueMaps[jsStyleKey][value] || value;
      styleObject[jsStyleKey] = value;
    }
  });

  return styleObject;
}

export const transformHtmlToPdf = (htmlContent: string) => {
  const cleanHtml = DOMPurify.sanitize(htmlContent);
  const document = parseDocument(cleanHtml);

  const transformNode = (node: any) => {
    if (node.type === "tag" && tagMapping[node.name]) {
      const TagComponent = tagMapping[node.name];
      let newAttribs = { ...node.attribs };
      if (newAttribs.style) {
        const defaultStyles = styles[node.name] || {};
        const adjustedStyles = adjustStyles(newAttribs.style);
        newAttribs.style = { ...defaultStyles, ...adjustedStyles };
      } else {
        newAttribs.style = styles[node.name] || {};
      }
      return (
        <TagComponent key={node.key + node.name} {...newAttribs}>
          {node.children.map((child: any, index: number) =>
            transformNode({ ...child, key: index })
          )}
        </TagComponent>
      );
    } else if (node.type === "text") {
      if (node.data.trim() === "") return <Text>{"\n"}</Text>;
      return node.data;
    } else {
      return null;
    }
  };

  const traverse = (nodes: any) => {
    return nodes.map((node: any, index: number) =>
      transformNode({ ...node, key: Math.random() + index + node.name })
    );
  };

  return traverse(document.children);
};
