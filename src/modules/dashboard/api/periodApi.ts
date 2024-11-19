import { createApi, fakeBaseQuery } from '@reduxjs/toolkit/query/react';
import {
  collection,
  query,
  where,
  getDocs,
  doc,
  updateDoc,
  addDoc,
  deleteDoc,
} from 'firebase/firestore';
import { db } from '../../../../firebaseConfig';
import { PeriodType } from '../types';

export const periodApi = createApi({
  baseQuery: fakeBaseQuery(),
  tagTypes: ['Period'],
  endpoints: (builder) => ({
    fetchPeriodsForUser: builder.query<{ period: PeriodType; docId: string }, string | void>({
      async queryFn(userId) {
        try {
          const q = query(collection(db, 'periods'), where('userId', '==', userId));
          const querySnapshot = await getDocs(q);
          let period: PeriodType = {
            id: '',
            days: [],
          };
          let docId: string = '';
          querySnapshot.forEach((doc) => {
            docId = doc.id;
            period = { ...doc.data(), id: doc.id } as PeriodType;
          });
          return { data: { period, docId } };
        } catch (error: any) {
          console.error(error.message);
          return { error: error.message };
        }
      },
      providesTags: ['Period'],
    }),
    updatePeriodDocument: builder.mutation<void, { documentId: string; newData: any }>({
      //@ts-ignore
      async queryFn({ documentId, newData }) {
        try {
          const documentRef = doc(db, 'periods', documentId);
          await updateDoc(documentRef, newData);
          return { data: null };
        } catch (error: any) {
          console.error(error.message);
          return { error: error.message };
        }
      },
      invalidatesTags: ['Period'],
    }),
    savePeriodToFirestore: builder.mutation<void, { userId?: string; periodData?: PeriodType }>({
      async query({ periodData, userId }) {
        try {
          const docRef = await addDoc(collection(db, 'periods'), {
            ...periodData,
            userId: userId,
          });
          console.log('Document reference:', docRef);
          return { data: null };
        } catch (error: any) {
          console.error(error.message);
          return { error: error.message };
        }
      },
      invalidatesTags: ['Period'],
    }),
    deletePeriodDocument: builder.mutation<void, { documentId: string }>({
      //@ts-ignore
      async queryFn({ documentId }) {
        try {
          await deleteDoc(doc(db, 'periods', documentId));
          return { data: null };
        } catch (error: any) {
          console.error(error.message);
          return { error: error.message };
        }
      },
      invalidatesTags: ['Period'],
    }),
  }),
});

export const {
  useFetchPeriodsForUserQuery,
  useLazyFetchPeriodsForUserQuery,
  useUpdatePeriodDocumentMutation,
  useSavePeriodToFirestoreMutation,
  useDeletePeriodDocumentMutation,
} = periodApi;
