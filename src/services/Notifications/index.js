import { api } from 'services/axios';

export const getNotifUnreadCount = () => (api.get(`/notifications/unread_count/`));

export const getNotifications = ({page = 1, limit=10}) => (api.get(`/notifications?page=${page}&limit=${limit}`));

export const markAllNotifsAsRead = () => (api.put(`/notifications/mark_all_as_read/`));
