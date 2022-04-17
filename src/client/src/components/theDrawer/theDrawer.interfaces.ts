export interface DrawerContentChild {
  id: string;
  title: string;
  link: string;
}

export interface DrawerContentMain {
  id: string;
  title: string;
  children: DrawerContentChild[];
}

export interface TheDrawerProps {
  open: boolean;
  setOpen: (value: boolean) => void;
  drawerContent?: { // TODO: remove '?'
    main: DrawerContentMain[];
    footer?: {
      title: string;
      link: string;
    };
  };
}
