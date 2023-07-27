import axios, { AxiosResponse } from "axios";

export async function addComponentToPageService(data: {
  componentName: string;
  name: string|null;
  pageName: string|null;
  values: { propertyName: string; valueName: string }[];
}): Promise<AxiosResponse<any>> {
  return axios.post("https://localhost:7136/api/PageComponent/AddComponentToPage", data);
}
export async function fetchPageComponents(): Promise<AxiosResponse<any>> {
    return axios.get("https://localhost:7136/api/PageComponent/GetAllComponentToPage");
  }