import React from "react";
import { Layout } from "@/layout";
import { ChildrenProp } from "@/types";

export const withLayout = (
  PageComponent: React.ComponentType<ChildrenProp>
) => {
  const WithLayout = (props: ChildrenProp) => (
    <Layout>
      <PageComponent {...props} />
    </Layout>
  );

  return WithLayout;
};
