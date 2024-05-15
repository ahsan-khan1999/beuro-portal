import React from "react";
import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";
import { parseDocument } from "htmlparser2";

import DOMPurify from "dompurify";

const styles: any = StyleSheet.create({
  p: {
    fontSize: 8,
    // marginBottom: 10,
  },
  h1: {
    fontSize: 14,
    // marginBottom: 20,
  },
  h2: {
    fontSize: 12,
    // marginBottom: 15,
  },
  li: {
    fontSize: 10,
    // marginBottom: 5,
    marginLeft: 6,
  },
  ul: {
    // marginBottom: 10,
    paddingLeft: 8,
  },
  ol: {
    // marginBottom: 10,
    paddingLeft: 8,
  },
  div: {
    // marginBottom: 10,
  },
});

const tagMapping: any = {
  p: (props: any) => <Text style={props.style}>{props.children}</Text>,
  strong: (props: any) => <Text style={props.style}>{props.children}</Text>,
  h1: (props: any) => <Text style={props.style}>{props.children}</Text>,
  h2: (props: any) => <Text style={props.style}>{props.children}</Text>,
  ul: (props: any) => <View style={props.style}>{props.children}</View>,
  ol: (props: any) => <View style={props.style}>{props.children}</View>,
  li: (props: any) => <Text style={props.style}>• {props.children}</Text>,
  div: (props: any) => <View style={props.style}>{props.children}</View>,
  span: (props: any) => <Text style={props.style}>{props.children}</Text>,
  br: (props: any) => <Text style={props.style}>{"\n"}</Text>,
};

// const fontSizeMap: FontSizeMap = {
//   "8px": "5.5px",
//   "9px": "6px",
//   "10px": "6.5px",
//   "11px": "7px",
//   "12px": "7.5px",
//   "13px": "8px",
//   "14px": "8.5px",
// };

const cssToJsStyleMap: any = {
  "font-size": "fontSize",
  "font-weight": "fontWeight",
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
  },
  fontWeight: {
    bold: "bold",
    normal: "normal",
  },
};

type FontSizeMap = { [key: string]: string };

// function adjustStyles(cssStyle: string): object {
//   const styleObject: { [key: string]: any } = {};
//   const styles = cssStyle.split(";");
//   for (let style of styles) {
//     const [key, value] = style.split(":").map((s) => s.trim());
//     if (!key || !value) continue;

//     switch (key) {
//       case "font-size":
//         styleObject.fontSize = fontSizeMap[value] || value;
//         break;
//       case "font-weight":
//         styleObject.fontWeight = value === "bold" ? "bold" : "normal";
//         break;
//     }
//   }

//   return styleObject;
// }

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
      if (node.data.trim() === "")
        return <Text>{"\n"}</Text>;
      return node.data;
    } else {
      return null;
    }
  };

  const traverse = (nodes: any) => {
    return nodes.map((node: any, index: number) =>
      transformNode({ ...node, key: (Math.random() + index + node.name) })
    );
  };

  return traverse(document.children);
};
