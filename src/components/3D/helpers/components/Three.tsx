// 'use client'

import React, { ReactNode } from "react";
import { r3f } from "~/components/3D/helpers/global"

type LayoutProps = {
  children: ReactNode;
};

export const Three: React.FC<LayoutProps> = ({ children }) => {
  return <r3f.In>{children}</r3f.In>
}
