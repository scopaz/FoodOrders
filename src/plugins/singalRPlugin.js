import { provide, ref } from 'vue';
import connection from '@/services/signalRService';

export default {
  install: (app) => {
    app.provide('signalRConnection', connection);
  },
};