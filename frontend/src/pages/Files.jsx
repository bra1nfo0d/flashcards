import { useState } from "react";
import AppNavbar from "../components/common/AppNavbar";
import CreatingStackFrom from "../components/files/CreatingStackForm";
import CreatingFolderForm from "../components/files/CreatingFolderForm";
import FilesNavbar from "../components/files/FilesNavbar";
import PopWindow from "../components/common/PopWindow";

export default function Files() {
  const [showWarning, setShowWarning] = useState(false);
  const [activeDisplayType, setActiveDisplayType] = useState(null);
  const [pendingDisplayType, setPendingDisplayType] = useState(null);

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

  return (
    <>
      <AppNavbar />
      <FilesNavbar onCreateClick={handleCreatingButton} />
      {activeDisplayType === "stack" && <CreatingStackFrom />}
      {activeDisplayType === "folder" && <CreatingFolderForm />}
      <PopWindow show={showWarning} onButtonClick={handleWarningButtons} />
    </>
  );
}
