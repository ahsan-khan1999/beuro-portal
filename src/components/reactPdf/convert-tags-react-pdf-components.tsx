import React from "react";
import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";
import { parseDocument } from "htmlparser2";

import DOMPurify from "dompurify";

const tagMapping: any = {
  p: (props: any) => (
    <Text style={styles.paragraph} {...props}>
      {props.children}
    </Text>
  ),
  strong: (props: any) => (
    <Text style={styles.paragraph} {...props}>
      {props.children}
    </Text>
  ),
  h1: (props: any) => (
    <Text style={styles.heading1} {...props}>
      {props.children}
    </Text>
  ),
  h2: (props: any) => (
    <Text style={styles.heading2} {...props}>
      {props.children}
    </Text>
  ),
  ul: (props: any) => (
    <View style={styles.unorderedList} {...props}>
      {props.children}
    </View>
  ),
  ol: (props: any) => (
    <View style={styles.orderedList} {...props}>
      {props.children}
    </View>
  ),
  li: (props: any) => (
    <Text style={styles.listItem} {...props}>
      • {props.children}
    </Text>
  ),
  div: (props: any) => (
    <View style={styles.div} {...props}>
      {props.children}
    </View>
  ),
  span: (props: any) => <Text {...props}>{props.children}</Text>,
  br: () => <Text>{"\n"}</Text>,
};

const styles = StyleSheet.create({
  paragraph: {
    fontSize: 8,
    // marginBottom: 10,
  },
  heading1: {
    fontSize: 14,
    // marginBottom: 20,
  },
  heading2: {
    fontSize: 12,
    // marginBottom: 15,
  },
  listItem: {
    fontSize: 10,
    // marginBottom: 5,
    marginLeft: 6,
  },
  unorderedList: {
    // marginBottom: 10,
    paddingLeft: 8,
  },
  orderedList: {
    // marginBottom: 10,
    paddingLeft: 8,
  },
  div: {
    // marginBottom: 10,
  },
});

export const transformHtmlToPdf = (htmlContent: string) => {
  const cleanHtml = DOMPurify.sanitize(htmlContent);
  const document = parseDocument(cleanHtml);

  const transformNode = (node: any) => {
    if (node.type === "tag" && tagMapping[node.name]) {
      const TagComponent = tagMapping[node.name];
      console.log(node);
      
      return (
        <TagComponent key={node.attribs.key || node.name}>
          {node.children.map((child: any, index: number) =>
            transformNode({ ...child, key: index })
          )}
        </TagComponent>
      );
    } else if (node.type === "text") {
      if (node.data.trim() === "")
        return (
          <Text style={{marginVertical: 8}}>{'\n'}
          </Text>
        );
      return node.data;
    } else {
      return null;
    }
  };

  const traverse = (nodes: any) => {
    return nodes.map((node: any, index: number) =>
      transformNode({ ...node, key: index })
    );
  };

  return traverse(document.children);
};
