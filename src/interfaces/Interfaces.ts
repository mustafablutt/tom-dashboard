export interface IComponentValue {
  propertyName: string;
  valueName: string | any;
}


export interface IAddComponentData {
  componentName: string;
  name: string | null;
  pageName: string | null;
  values: IComponentValue[];
}
export interface IUpdateComponentData {
  _id: number;
  componentName: string;
  name: string | null;
  pageName: string | null;
  values: IComponentValue[];
}
export interface IFetchComponentData {
  _id: number;
  componentName: string|undefined;
  name: string | null;
  values: IComponentValue[];
}

interface IComponentProperties {
  name: string;
}

export interface IComponent {
  _id: number;
  name: string;
  properties: IComponentProperties[];
}
