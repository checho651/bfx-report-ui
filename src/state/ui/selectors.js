export const getUI = state => state.ui

export const getIsCustomDialogOpen = state => getUI(state).isCustomDialogOpen
export const getIsFrameworkDialogOpen = state => getUI(state).isFrameworkDialogOpen
export const getIsPaginationDialogOpen = state => getUI(state).isPaginationDialogOpen
export const getLatestPaginationTimestamp = state => getUI(state).latestPaginationTimestamp
export const getDevice = state => getUI(state).device

export default {
  getIsCustomDialogOpen,
  getIsFrameworkDialogOpen,
  getIsPaginationDialogOpen,
  getLatestPaginationTimestamp,
  getDevice,
}
