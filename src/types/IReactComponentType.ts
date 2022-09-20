import React from "react";

export type IProps = {
  children:
    | React.ReactElement
    | React.ReactElement[]
    | JSX.Element
    | JSX.Element[];
};

type IReactComponentType = React.FC<IProps>;
export default IReactComponentType;
