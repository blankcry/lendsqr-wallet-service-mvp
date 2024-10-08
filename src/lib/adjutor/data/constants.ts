import dotenv from 'dotenv';
dotenv.config();

const {ADJUTOR_API_KEY, ADJUTOR_BASE_URL} = process.env;
export const BASE_URL = ADJUTOR_BASE_URL;
export const API_KEY = ADJUTOR_API_KEY;

export const URLS = {
  KARMA: '/verification/karma',
};
