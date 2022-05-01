import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { appSettings } from '@const';
import { RootState } from '@store/rootReducer';

export const useShowDrawer = () => {
  const { drawerData } = useSelector((state: RootState) => state.options);
  const [showDrawer, setShowDrawer] = useState(false);
  
  useEffect(() => {
    setShowDrawer(!appSettings.moduleWithoutDrawer.includes(drawerData.module))
  }, [drawerData])

  return showDrawer;
}