import { DialogTypeEnum } from "@interfaces";

export interface DrawerContentChild {
  id: string;
  title: string;
  link: string;
}

export interface DrawerContentMain {
  id: string;
  title: string;
  withAdd?: boolean;
  children: DrawerContentChild[];
}

export interface TheDrawerProps {
  open: boolean;
  setOpen: (value: boolean) => void;
  openManageDataModal?: (type: DialogTypeEnum, title?: string) => void;
  drawerContent?: {
    // TODO: remove '?'
    main?: DrawerContentMain[];
    simple?: DrawerContentChild[];
    footer?: {
      title: string;
    };
  };
}
