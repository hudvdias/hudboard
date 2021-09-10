import axios from 'axios';

export const api = axios.create({
  baseURL: 'https://webhooks.mongodb-realm.com/api/client/v2.0/app/hudboardapp-kaoqv/service/HudboardApi/incoming_webhook/',
});