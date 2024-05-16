// import { StyleSheet, Text, View } from "@react-pdf/renderer";
// import { ReactNode } from "react";

// interface TagComponentProps {
//   children?: ReactNode;
// }

// // Define styles
// const styles = StyleSheet.create({
//   body: {
//     // padding: 10,
//   },
//   header: {
//     fontSize: 8,
//     // margin: 10,
//     fontWeight: "bold",
//   },
//   paragraph: {
//     // margin: 10,
//   },
//   listItem: {
//     marginLeft: 20,
//     // marginBottom: 5,
//   },
// });

// // Function to convert HTML to React PDF components
// export const convertHtmlToPdf = (html: string): ReactNode => {
//   const parser = new DOMParser();
//   const doc = parser.parseFromString(html, "text/html");
//   console.log(doc);

//   return convertNodeToComponent(doc.body);
// };

// const convertNodeToComponent = (node: ChildNode): ReactNode => {
//   switch (node.nodeType) {
//     case Node.ELEMENT_NODE:
//       const element = node as Element;
//       const Component = getElementComponent(element.tagName);
//       const children = Array.from(element.childNodes).map(
//         convertNodeToComponent
//       );
//       return <Component key={element.outerHTML}>{children}</Component>;
//     case Node.TEXT_NODE:
//       return node.textContent;
//     default:
//       return null;
//   }
// };

// const getElementComponent = (
//   tagName: string
// ): React.ComponentType<TagComponentProps> => {
//   const tagMap: { [key: string]: React.ComponentType<TagComponentProps> } = {
//     H1: ({ children }) => <Text style={styles.header}>{children}</Text>,
//     H2: ({ children }) => <Text style={styles.header}>{children}</Text>,
//     P: ({ children }) => <Text style={styles.paragraph}>{children}</Text>,
//     UL: ({ children }) => <View>{children}</View>,
//     LI: ({ children }) => <Text style={styles.listItem}>• {children}</Text>,
//   };
//   return tagMap[tagName] || View;
// };

// type PDFNode = PDFElementNode | PDFTextNode;

// interface PDFElementNode {
//   type: "element";
//   tagName: string;
//   children: PDFNode[];
//   attributes?: { [key: string]: string };
// }

// interface PDFTextNode {
//   type: "text";
//   content: string;
// }

// export function parseHTML(html: string): PDFNode[] {
//   const rootNode: PDFElementNode = {
//     type: "element",
//     tagName: "root",
//     children: [],
//   };
//   let currentParent = rootNode;
//   const parentStack: PDFElementNode[] = [];
//   const tagRegex = /<\/?([a-zA-Z]+)([^>]*)>|([^<]+)/g;
//   let match;

//   while ((match = tagRegex.exec(html))) {
//     if (match[3]) {
//       // Text node
//       const textContent = decodeHtmlEntities(match[3]).trim();
//       if (textContent) {
//         currentParent.children.push({
//           type: "text",
//           content: textContent,
//         });
//       }
//     } else if (match[0][1] === "/") {
//       // Closing tag
//       if (currentParent.tagName === match[1]) {
//         currentParent = parentStack.pop(); // Return to the previous parent
//       }
//     } else {
//       // Opening tag
//       const newElement: PDFElementNode = {
//         type: "element",
//         tagName: match[1],
//         attributes: parseAttributes(match[2]),
//         children: [],
//       };
//       currentParent.children.push(newElement);
//       parentStack.push(currentParent);
//       currentParent = newElement;
//     }
//   }

//   return rootNode.children;
// }

// function parseAttributes(attributesString: string): { [key: string]: string } {
//   const attrs: { [key: string]: string } = {};
//   attributesString.replace(/([a-zA-Z0-9-]+)="([^"]+)"/g, (_, key, value) => {
//     attrs[key] = value;
//     return "";
//   });
//   return attrs;
// }

// function decodeHtmlEntities(text: string): string {
//   return text.replace(/&nbsp;/gi, " "); // Replace &nbsp; with space
// }

// export function renderPDFNode(node: PDFNode): React.ReactNode {
//   if (node.type === "text") {
//     return <Text>{node.content}</Text>;
//   } else if (node.type === "element") {
//     const children = node.children.map(renderPDFNode);
//     switch (node.tagName) {
//       case "h1":
//       case "h2":
//         return <Text style={{ fontSize: 1 }}>{children}</Text>;
//       case "p":
//         return <Text style={{lineHeight: 1,}}>{children}</Text>;
//       case "ul":
//         return <View>{children}</View>;
//       case "li":
//         return <Text style={{ marginLeft: 10, lineHeight: 1, }}>• {children}</Text>;
//       case "strong":
//         return <Text style={{ fontWeight: 'bold', lineHeight: 1, fontSize: 8 }}>{children}</Text>;
//       default:
//         return <View>{children}</View>;
//     }
//   }
// }
