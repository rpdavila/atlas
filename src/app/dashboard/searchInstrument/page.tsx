"use client";
import SearchInstrument from "@/app/components/searchInstruments/searchInstruments"
import { getInstruments, setInstrumentsInitialized } from "@/app/lib/ReduxSSR/features/instrumentSLice";
import { getDropDownList, getStudents } from "@/app/lib/ReduxSSR/features/studentListSlice";
import { useAppDispatch, useAppSelector } from "@/app/lib/ReduxSSR/hooks";
import { InstrumentList, StudentList } from "@/app/types/formTypes";
import { convertObjectIdToString } from "@/app/utilities/mongodb";
import { useMongoDbDataAccess } from "@/app/hooks/useMongoDbDataAccess";
import { setStudentsInitialized } from "@/app/lib/ReduxSSR/features/studentListSlice";

export default function InstrumentPage() {
  const dispatch = useAppDispatch();
  const { instrumentData, loading: instrumentLoading, error: instrumentError, } = useMongoDbDataAccess({ collectionName: 'instrumentInfo' });
  const { studentData, loading: studentLoading, error: studentError, } = useMongoDbDataAccess({ collectionName: 'studentInfo' });

  const instrumentsInitialized: boolean = useAppSelector((state) => state.instruments.initialized);
  const instruments: InstrumentList = useAppSelector((state) => state.instruments.instrumentList);

  const convertedInstrumentData = convertObjectIdToString(instrumentData as InstrumentList)
  const convertedStudentData = convertObjectIdToString(studentData as StudentList)
  if (!instrumentsInitialized) {
    dispatch(setInstrumentsInitialized(convertedInstrumentData as InstrumentList));
    dispatch(setStudentsInitialized(convertedStudentData as StudentList));
  } else {
    dispatch(getInstruments());
    dispatch(getStudents());
    dispatch(getDropDownList());
  }
  return (
    <>
      <SearchInstrument data={instruments} />
    </>
  )
}