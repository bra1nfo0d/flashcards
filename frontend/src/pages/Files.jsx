import { useState } from "react";
import AppNavbar from "../components/common/AppNavbar";
import CreatingStackFrom from "../components/files/CreatingStackForm";
import CreatingFolderForm from "../components/files/CreatingFolderForm";
import CreatingCardForm from "../components/files/CreatingCardForm";
import FilesNavbar from "../components/files/FilesNavbar";
import PopWindow from "../components/common/PopWindow";

export default function Files() {
  const [showWarning, setShowWarning] = useState(false);
  const [activeDisplayType, setActiveDisplayType] = useState(null);
  const [pendingDisplayType, setPendingDisplayType] = useState(null);
  const [activeStackId, setActiveStackId] = useState(null);

  function handleCreatingButton(type) {
    if (
      (type === "folder" && activeDisplayType === "stack") ||
      (type === "stack" && activeDisplayType === "folder")
    ) {
      setShowWarning(true);
      setPendingDisplayType(type);
    } else {
      setActiveDisplayType(type);
    }
  }

  function handleWarningButtons(type) {
    if (!pendingDisplayType || !type) {
      setShowWarning(false);
      return;
    } else {
      setActiveDisplayType(pendingDisplayType);
      setPendingDisplayType(null);
      setShowWarning(false);
    }
  }

  function handleStackCreate(stackId) {
    setActiveStackId(stackId);
    setActiveDisplayType("card");
  }

  return (
    <>
      <AppNavbar />
      <FilesNavbar onCreateClick={handleCreatingButton} />
      {activeDisplayType === "stack" && (
        <CreatingStackFrom
          onCreated={handleStackCreate}
          onClose={() => setActiveDisplayType(null)}
        />
      )}
      {activeDisplayType === "folder" && (
        <CreatingFolderForm onClose={() => setActiveDisplayType(null)} />
      )}
      {activeDisplayType === "card" && (
        <CreatingCardForm
          stackId={activeStackId}
          onClose={() => setActiveDisplayType(null)}
        />
      )}
      <PopWindow show={showWarning} onButtonClick={handleWarningButtons} />
    </>
  );
}
