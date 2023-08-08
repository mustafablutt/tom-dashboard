import axios, { AxiosResponse } from "axios";

export async function addComponentToPageService(data: {
  componentName: string;
  name: string | null;
  pageName: string | null;
  values: { propertyName: string; valueName: string }[];
}): Promise<AxiosResponse<any>> {
  return axios.post(
    "https://localhost:7136/api/PageComponent/AddComponentToPage",
    data
  );
}
export async function fetchPageComponents(): Promise<AxiosResponse<any>> {
  return axios.get(
    "https://localhost:7136/api/PageComponent/GetAllComponentToPage"
  );
}

export async function fetchAllComponents(): Promise<AxiosResponse<any>> {
  return axios.get("https://localhost:7136/api/Component/GetAllComponents");
}

export async function updatePageComponentService(data: {
  _id: number;
  componentName: string;
  name: string | null;
  pageName: string | null;
  values: { propertyName: string; valueName: string }[];
}): Promise<AxiosResponse<any>> {
  return axios.put(
    "https://localhost:7136/api/PageComponent/UpdatePageComponent",
    data
  );
}
export async function fetchComponentsOfPageService(
  pageName: string | null
): Promise<AxiosResponse<any>> {
  return axios.get(
    `https://localhost:7136/api/PageComponent/GetComponentsByPageName?pageName=${pageName}`
  );
}
