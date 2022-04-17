import React from "react";
import { NavLink } from "react-router-dom";
import { Accordion, AccordionDetails, AccordionSummary, Drawer, IconButton } from "@mui/material";
import ArrowCircleLeftIcon from "@mui/icons-material/ArrowCircleLeft";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import AddIcon from "@mui/icons-material/Add";
import { TheDrawerProps } from "./theDrawer.interfaces";
import "./theDrawer.scss";

const drawerTest = {
  main: [
    {
      id: "1",
      title: "Javascript",
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
      title: "Scss",
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
      title: "Java",
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
  footer: {
    title: "Dodaj nową kategorie",
    link: "/dashboard/snippets/add",
  },
};

export const TheDrawer = ({ open, setOpen, drawerContent = drawerTest }: TheDrawerProps) => {
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
            {drawerContent.main.map(rowData => (
              <Accordion disableGutters key={rowData.id}>
                <AccordionSummary expandIcon={<ExpandMoreIcon className="menu-drawer-icon" />}>
                  <p className="drawer-menu-title">{rowData.title}</p>
                </AccordionSummary>
                {rowData.children.map(child => (
                  <AccordionDetails key={child.id}>
                    <NavLink to={child.link} className="drawer-nav-link">
                      <p className="drawer-menu-content">{child.title}</p>
                    </NavLink>
                  </AccordionDetails>
                ))}
              </Accordion>
            ))}
          </div>
        </div>
        {drawerContent.footer && (
          <div className="drawer-menu-footer">
            <NavLink to={drawerContent.footer.link} className="drawer-nav-link">
              <p>{drawerContent.footer.title}</p>
            </NavLink>
            <AddIcon />
          </div>
        )}
      </Drawer>
    </div>
  );
};
