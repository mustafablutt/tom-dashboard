import React, { createContext, useContext, useEffect, useState } from "react";
import {
    addComponentToPageService ,fetchPageComponents
} from "../services/apiService";

interface IComponentValue {
    propertyName: string;
    valueName: string;
  }
  
  interface IAddComponentData {
    componentName: string;
    name: string|null;
    pageName: string|null;
    values: IComponentValue[];
  }
interface IContext {
  components: IAddComponentData[] | undefined;
  loading: boolean;
  succeeded : boolean;
  addMessage : string;
  showAlert:boolean;
  setShowAlert: React.Dispatch<React.SetStateAction<boolean>>;
  addComponent: (componentData: IAddComponentData) => Promise<void>;
}

const PageComponentContext = createContext<IContext | undefined>(undefined);

export const PageComponentProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [components, setComponents] = useState<IAddComponentData[] | undefined>(undefined);
  const [loading, setLoading] = useState<boolean>(false);
  const [succeeded, setSucceeded] = useState<boolean>(false);
  const [addMessage, setAddMessage] = useState<string>("");
  const [showAlert, setShowAlert] = React.useState(false);

  useEffect(() => {
    fetchPageComponents()
      .then((response) => {
        setComponents(response.data.data);
        console.log("context içindeyim",response.data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching tabs", error);
        setLoading(false);
      });
  }, []);

  const addComponent = async (componentData: IAddComponentData) => {
    try {
      setLoading(true);
      const response2= await addComponentToPageService(componentData);
      // Assuming the data is successfully added, update the current pageComponent list
      const response = await fetchPageComponents();
      setComponents(response.data.data);
      console.log("new component values", componentData);
      console.log("mesajım var", response2.data.message);
      setAddMessage(response2.data.message);
      setShowAlert(true);
      setLoading(false);
    } catch (error) {
      console.error("Error adding new component", error);
      setAddMessage("Error adding new component")
      setLoading(false);
      setShowAlert(true);
    }
  };
  return (
    <PageComponentContext.Provider
      value={{
        addComponent,
        components,
        loading,
        succeeded,
        addMessage,
        showAlert,
        setShowAlert
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