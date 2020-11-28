import { api } from 'services/axios';

export const validateSCUser = ({username}) => (
    api.get(`/exports/sc_data?user=${username}`)
);

export const launchExport = (data) => (
    api.post(`/exports/`, data)
);

export const listExports = () => (
    api.get(`/exports/`)
);

export const getExport = (id) => (
    api.get(`/exports/${id}`)
);

export const getExportNew = (id) => api.get(`/exports/${id}/new`);
export const getExportConflicts = (id) => api.get(`/exports/${id}/conflicts`);
export const getExportNotFound = (id) => api.get(`/exports/${id}/not_found`);
