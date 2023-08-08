import React, { createContext, useContext, useEffect, useState } from "react";
import {
  addComponentToPageService,
  fetchPageComponents,
  fetchAllComponents,
  updatePageComponentService,
  fetchComponentsOfPageService,
} from "../services/apiService";
import {
  IAddComponentData,
  IComponent,
  IFetchComponentData,
  IUpdateComponentData,
} from "../interfaces/Interfaces";

interface IContext {
  componentsInPage: IUpdateComponentData[] | undefined;
  componentsInCurrentPage: IFetchComponentData[] | undefined;
  components: IComponent[] | undefined;
  loading: boolean;
  succeeded: boolean;
  addMessage: string;
  showAlert: boolean;
  setShowAlert: React.Dispatch<React.SetStateAction<boolean>>;
  addComponent: (componentData: IAddComponentData) => Promise<void>;
  updatePageComponent: (componentData: IUpdateComponentData) => Promise<void>;
  fetchComponentsOfCurrentPage: (pageName: string | null) => Promise<void>;
}

const PageComponentContext = createContext<IContext | undefined>(undefined);

export const PageComponentProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [components, setComponents] = useState<IComponent[] | undefined>(
    undefined
  );
  const [componentsInPage, setComponentsInPage] = useState<
    IUpdateComponentData[] | undefined
  >(undefined);
  const [componentsInCurrentPage, setComponentsInCurrentPage] = useState<
    IFetchComponentData[] | undefined
  >(undefined);

  const [loading, setLoading] = useState<boolean>(false);
  const [succeeded, setSucceeded] = useState<boolean>(false);
  const [addMessage, setAddMessage] = useState<string>("");

  const [showAlert, setShowAlert] = React.useState(false);

  useEffect(() => {
    fetchPageComponents()
      .then((response) => {
        setComponentsInPage(response.data.data);
        console.log("context içindeyim", response.data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching tabs", error);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    fetchAllComponents()
      .then((response) => {
        setComponents(response.data.data);
        console.log("components geliyo mu all", response.data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching components", error);
        setLoading(false);
      });
  }, []);

  const fetchComponentsOfCurrentPage = async (pageName: string | null) => {
    try {
      setLoading(true);
      const response = await fetchComponentsOfPageService(pageName);
      setComponentsInCurrentPage(response.data.data);
      console.log("edit pages on", response.data.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching components of the page", error);
      setLoading(false);
    }
  };
  const addComponent = async (componentData: IAddComponentData) => {
    try {
      setLoading(true);
      const response2 = await addComponentToPageService(componentData);

      const response = await fetchPageComponents();
      setComponentsInPage(response.data.data);
      console.log("new component values", componentData);
      console.log("mesajım var", response2.data.message);
      setAddMessage(response2.data.message);
      setShowAlert(true);
      setLoading(false);
    } catch (error) {
      console.error("Error adding new component", error);
      setAddMessage("Error adding new component");
      setLoading(false);
      setShowAlert(true);
    }
  };

  const updatePageComponent = async (componentData: IUpdateComponentData) => {
    try {
      setLoading(true);
      const updateResponse = await updatePageComponentService(componentData);
      const respone = await fetchPageComponents();
      setComponentsInPage(respone.data.data);
      setAddMessage(updateResponse.data.message);
      setShowAlert(true);
      setLoading(false);
    } catch (error) {
      console.error("Error updating component", error);
      setAddMessage("Error updating component");
      setLoading(false);
      setShowAlert(true);
    }
  };
  return (
    <PageComponentContext.Provider
      value={{
        addComponent,
        components,
        componentsInPage,
        loading,
        succeeded,
        addMessage,
        showAlert,
        setShowAlert,
        updatePageComponent,
        fetchComponentsOfCurrentPage,
        componentsInCurrentPage,
      }}
    >
      {children}
    </PageComponentContext.Provider>
  );
};

export const usePageComponent = () => {
  const context = useContext(PageComponentContext);
  if (!context) {
    throw new Error("usePage must be used within a PageProvider");
  }
  return context;
};
