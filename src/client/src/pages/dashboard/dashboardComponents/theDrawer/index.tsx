import React from "react";
import { NavLink } from "react-router-dom";
import { Accordion, AccordionDetails, AccordionSummary, Drawer, IconButton } from "@mui/material";
import ArrowCircleLeftIcon from "@mui/icons-material/ArrowCircleLeft";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import AddIcon from "@mui/icons-material/Add";
import { TheDrawerProps } from "./theDrawer.interfaces";
import "./theDrawer.scss";
import { DialogTypeEnum } from "@interfaces";

const drawerTest = {
  main: [
    {
      id: "1",
      title: "javascript",
      withAdd: true,
      children: [
        {
          id: "21313",
          title: "Snipet1",
          link: "/dashboard/snippets/javascript/1",
        },
        {
          id: "123",
          title: "Snipet2",
          link: "/dashboard/snippets/javascript/2",
        },
      ],
    },
    {
      id: "2",
      title: "scss",
      withAdd: true,
      children: [
        {
          id: "21313",
          title: "Snipet1",
          link: "/dashboard/snippets/scss/1",
        },
        {
          id: "33",
          title: "Snipet2",
          link: "/dashboard/snippets/scss/2",
        },
      ],
    },
    {
      id: "3",
      title: "java",
      withAdd: true,
      children: [
        {
          id: "3124",
          title: "Snipet1",
          link: "/dashboard/snippets/java/1",
        },
        {
          id: "2343243",
          title: "Snipet2",
          link: "/dashboard/snippets/java/2",
        },
        {
          id: "3234423",
          title: "Snipet3",
          link: "/dashboard/snippets/java/3",
        },
        {
          id: "23432",
          title: "Snipet4",
          link: "/dashboard/snippets/java/4",
        },
      ],
    },
  ],
  simple: [
    { id: "1", title: "a", link: "/dashboard/snippets/add" },
    { id: "2", title: "b", link: "/dashboard/snippets/add" },
  ],
  footer: {
    title: "Dodaj nową kategorie",
  },
};

export const TheDrawer = ({
  open,
  setOpen,
  drawerContent = drawerTest,
  openManageDataModal = () => {},
}: TheDrawerProps) => {
  return (
    <div className="the-drawer-wrapper">
      <Drawer
        sx={{
          width: 240,
          flexShrink: 0,
        }}
        variant="persistent"
        anchor="left"
        transitionDuration={700}
        open={open}
      >
        <div>
          <div className="hide-btn-wrapper">
            <IconButton onClick={() => setOpen(!open)}>
              <ArrowCircleLeftIcon />
            </IconButton>
          </div>
          <div className="drawer-menu-wrapper">
            <Accordion disableGutters className="display-none">
              <span />
            </Accordion>
            {drawerContent.main &&
              drawerContent.main.map(rowData => (
                <Accordion disableGutters key={rowData.id}>
                  <AccordionSummary expandIcon={<ExpandMoreIcon className="menu-drawer-icon" />}>
                    <p className="drawer-menu-title">{rowData.title}</p>
                  </AccordionSummary>
                  {rowData.children.map(child => (
                    <AccordionDetails key={child.id}>
                      <NavLink to={child.link} className="drawer-nav-item">
                        <p className="drawer-menu-content">{child.title}</p>
                      </NavLink>
                    </AccordionDetails>
                  ))}
                  {rowData.withAdd && (
                    <AccordionDetails>
                      <div
                        onClick={() => openManageDataModal(DialogTypeEnum.ELEMENT, rowData.title)}
                        className="drawer-nav-item drawer-nav-item-with-icon"
                      >
                        <p className="drawer-menu-content">Add</p>
                        <AddIcon />
                      </div>
                    </AccordionDetails>
                  )}
                </Accordion>
              ))}
            {drawerContent.simple &&
              drawerContent.simple.map(simpleItem => (
                <div className="drawer-item-simple" key={simpleItem.id}>
                  <NavLink to={simpleItem.link} className="drawer-nav-item">
                    <p>{simpleItem.title}</p>
                  </NavLink>
                </div>
              ))}
          </div>
        </div>
        {drawerContent.footer && (
          <div
            className="drawer-menu-footer"
            onClick={() => {
              openManageDataModal(DialogTypeEnum.CATEGORY);
            }}
          >
            <div className="drawer-nav-item">
              <p>{drawerContent.footer.title}</p>
            </div>
            <AddIcon />
          </div>
        )}
      </Drawer>
    </div>
  );
};
