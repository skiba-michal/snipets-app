import React from "react";
import { Accordion, AccordionDetails, AccordionSummary, Drawer, IconButton } from "@mui/material";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ArrowCircleLeftIcon from "@mui/icons-material/ArrowCircleLeft";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { TheDrawerProps } from "./theDrawer.interfaces";
import "./theDrawer.scss";

export const TheDrawer = ({ open, setOpen }: TheDrawerProps) => {
  return (
    <div className="the-drawer-wrapper">
      <Drawer
        sx={{
          width: 240,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: 240,
            boxSizing: "border-box",
            height: "calc(100% - 80px)",
            top: 80,
          },
        }}
        variant="persistent"
        anchor="left"
        transitionDuration={700}
        open={open}
      >
        <div className="show-hide-btn-wrapper">
          <IconButton onClick={() => setOpen(!open)}>
            <ArrowCircleLeftIcon />
          </IconButton>
        </div>
        <div className="drawer-menu-wrapper">
          <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon className="menu-drawer-icon" />}><p className="drawer-menu-title">Test1</p></AccordionSummary>
            <AccordionDetails><p className="drawer-menu-content">etete</p></AccordionDetails>
          </Accordion>
          <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon className="menu-drawer-icon" />}>
              <p className="drawer-menu-title">Test2</p>
            </AccordionSummary>
            <AccordionDetails>
              <p className="drawer-menu-content">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet
                blandit leo lobortis eget.
              </p>
            </AccordionDetails>
            <AccordionDetails>
              <p className="drawer-menu-content">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet
                blandit leo lobortis eget.
              </p>
            </AccordionDetails>
          </Accordion>
        </div>
      </Drawer>
    </div>
  );
};
