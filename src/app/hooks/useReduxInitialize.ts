
import {useState, useEffect} from 'react'
import {useAppStore} from '@/app/lib/ReduxSSR/hooks'
import {getStudents} from '@/app/lib/ReduxSSR/features/studentListSlice'
import {getInstruments} from '../lib/ReduxSSR/features/instrumentSLice'
import {getDropDownList} from '../lib/ReduxSSR/features/studentListSlice'
import {getCustomUserData} from '../lib/ReduxSSR/features/userSlice'

export function useReduxInitialize() {
  const store = useAppStore()
  const [initialized, setInitialized] = useState<boolean>(false) // only run once    
  
  useEffect(() => {
    if (!initialized) {
      store.dispatch(getStudents())
      store.dispatch(getInstruments())
      store.dispatch(getDropDownList())
      store.dispatch(getCustomUserData())
      setInitialized(true)   
    }
  }, [store, initialized])

  console.log(initialized)
  
}