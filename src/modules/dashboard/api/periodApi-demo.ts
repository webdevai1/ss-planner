import { collection, query, where, getDocs, doc, updateDoc, addDoc } from 'firebase/firestore';
import { PeriodType } from '../types';
import { db } from '../../../../firebaseConfig';

export const fetchPeriodsForUser = async (userId?: string) => {
  try {
    const q = query(collection(db, 'periods'), where('userId', '==', userId));
    const querySnapshot = await getDocs(q);
    const periods: PeriodType[] = [];
    querySnapshot.forEach((doc) => {
      periods.push({ id: doc.id, ...doc.data() } as PeriodType);
    });
    return periods;
  } catch (error) {
    console.error('Error fetching periods: ', error);
    return [];
  }
};

export const updateDocument = async (collectionName: string, documentId: string, newData: any) => {
  try {
    const documentRef = doc(db, collectionName, documentId);

    await updateDoc(documentRef, newData);

    console.log('Document updated successfully');
  } catch (error) {
    console.error('Error updating document: ', error);
  }
};

export const savePeriodToFirestore = async ({
  userId,
  periodData,
}: {
  userId?: string;
  periodData?: PeriodType;
}) => {
  try {
    const docRef = await addDoc(collection(db, 'periods'), {
      ...periodData,
      userId: userId,
    });
    console.log('%c jordan docRef', 'color: lime;', docRef);
  } catch (e) {
    console.log('%c jordan e', 'color: red;', e);
  }
};
