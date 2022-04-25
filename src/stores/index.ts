import create from 'zustand';
import { ResumeIntrf } from './index.interface';
import ResumeData from 'src/helpers/constants/resume-data.json';

export const useResumeStore = create<ResumeIntrf>((set) => ({
  ...ResumeData,
}));
