import { Navigate, useParams } from "react-router-dom";
import { ReactNode } from "react";

function InjectNumberParams<T extends string>({
  params,
  onFailRedirectTo,
  children,
}: {
  params: T[];
  onFailRedirectTo: string;
  children: (args: { [K in T]: number }) => ReactNode;
}) {
  const urlParams = useParams();

  // Check if all required params are valid numbers
  for (const param of params) {
    const p = urlParams[param];
    const pId = parseInt(p ?? "");

    if (Number.isNaN(pId)) {
      return <Navigate to={onFailRedirectTo} />;
    }
  }

  // Create the dictionary with confirmed params
  const confirmedParams = params.reduce((acc, param) => {
    const p = urlParams[param];
    const pId = parseInt(p ?? "");

    if (!Number.isNaN(pId)) {
      acc[param] = pId;
    }

    return acc;
  }, {} as { [K in T]: number });

  return children(confirmedParams);
}

export default InjectNumberParams;
