import { useState } from "react";
import AppNavbar from "../components/common/AppNavbar";
import CreatingStackFrom from "../components/files/CreatingStackForm";
import CreatingFolderForm from "../components/files/CreatingFolderForm";
import CreatingCardForm from "../components/files/CreatingCardForm";
import FilesNavbar from "../components/files/FilesNavbar";
import ContentDisplay from "../components/files/ContentDisplay";
import PopWindow from "../components/common/PopWindow";
import ShowStack from "../components/files/ShowStack";

export default function Files() {
  const [showWarning, setShowWarning] = useState(false);
  const [activeDisplayType, setActiveDisplayType] = useState(null);
  const [pendingDisplayType, setPendingDisplayType] = useState(null);
  const [refreshKey, setRefreshKey] = useState(0);

  const [activeStackId, setActiveStackId] = useState(null);
  const [selectedStackId, setSelectedStackId] = useState(null);
  const [selectedFolderId, setSelectedFolderId] = useState(null);

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

  function handleStackClick(stackId) {
    setSelectedStackId(stackId);
    setActiveDisplayType("showStack");
  }

  return (
    <>
      <AppNavbar />
      <FilesNavbar
        onCreateClick={handleCreatingButton}
        selectedFolderId={selectedFolderId}
      />
      {!activeDisplayType && (
        <ContentDisplay
          onStackClick={handleStackClick}
          selectedFolderId={selectedFolderId}
          onFolderSelected={setSelectedFolderId}
          key={refreshKey}
        />
      )}
      {activeDisplayType === "stack" && (
        <CreatingStackFrom
          onCreated={handleStackCreate}
          onClose={() => setActiveDisplayType(null)}
          folderId={selectedFolderId}
        />
      )}
      {activeDisplayType === "folder" && (
        <CreatingFolderForm
          onClose={() => setActiveDisplayType(null)}
          parentFolderId={selectedFolderId}
          onCreate={(id) => {
            setRefreshKey((k) => k + 1);
            handleStackCreate(id);
          }}
        />
      )}
      {activeDisplayType === "card" && (
        <CreatingCardForm
          stackId={activeStackId}
          onClose={() => setActiveDisplayType(null)}
        />
      )}
      {activeDisplayType === "showStack" && selectedStackId && (
        <ShowStack
          stackId={selectedStackId}
          onBack={() => {
            setActiveStackId(null);
            setActiveDisplayType(null);
          }}
        />
      )}
      <PopWindow show={showWarning} onButtonClick={handleWarningButtons} />
    </>
  );
}
