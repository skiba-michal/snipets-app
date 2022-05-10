import React, { useEffect, useState } from "react";
import { IconButton } from "@mui/material";
import ArrowCircleRightIcon from "@mui/icons-material/ArrowCircleRight";
import { Outlet } from "react-router";
import { useShowDrawer } from "@hooks";
import { DialogTypeEnum } from "@interfaces";
import { ModalDataManageController, ModalSettings, ModalSearchData, HeaderNav, TheDrawer } from "./dashboardComponents";
import "./dashboard.scoped.scss";

const Dashboard = () => {
  const [openDrawer, setOpenDrawer] = useState(false);
  const [openManageDataModal, setOpenManageDataModal] = useState(false);
  const [openSettingsModal, setOpenSettingsModal] = useState(false);
  const [openSearchModal, setOpenSearchModal] = useState(false);
  const [editElementId, setEditElementId] = useState("");
  const [elementTitle, setElementTitle] = useState("");
  const [elementType, setElementType] = useState<DialogTypeEnum | null>(null);
  const showDrawer = useShowDrawer();

  useEffect(() => {
    if (!showDrawer) {
      setOpenDrawer(false);
    }
  }, [showDrawer]);

  const onOpenManageDataModal = (dialogType: DialogTypeEnum, title?: string) => {
    setElementType(dialogType);
    setElementTitle(title || "");

    setOpenManageDataModal(true);
  };

  return (
    <div className="dashboard-wrapper">
      <HeaderNav onClickSearch={() => setOpenSearchModal(true)} onClickSettings={() => setOpenSettingsModal(true)} />
      <div className="dashboard-content-wrapper">
        {showDrawer && (
          <div className="show-nav-btn">
            <IconButton onClick={() => setOpenDrawer(!openDrawer)}>
              <ArrowCircleRightIcon />
            </IconButton>
          </div>
        )}
        <TheDrawer setOpen={setOpenDrawer} open={openDrawer} openManageDataModal={onOpenManageDataModal} />
        <div className={`dashboard-content ${openDrawer ? "open-dashboard" : "close-dashboard"}`}>
          <Outlet />
        </div>
      </div>

      <ModalDataManageController
        editElementId={editElementId}
        title={elementTitle}
        dialogType={elementType}
        setOpenModal={setOpenManageDataModal}
        openModal={openManageDataModal}
      />
      <ModalSettings open={openSettingsModal} setOpen={setOpenSettingsModal} />
      <ModalSearchData open={openSearchModal} setOpen={setOpenSearchModal} />
    </div>
  );
};
export default Dashboard;
