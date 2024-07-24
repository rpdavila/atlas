"use server"
import { cache } from "react";
import prisma from "@/lib/prisma";
import { RentStatus } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { InstrumentList, StudentList } from "@/app/types/formTypes";
import next from "next";

export const addInstrument = async (formData: FormData) => {
    const classification = formData.get("classification");
    const brand = formData.get("brand");
    const serialNumber = formData.get("serialNumber");
    const rentStatus = formData.get("rentStatus");
    await prisma.instrumentInfo.create({
      data: {
        classification: classification as string,
        brand: brand as string,
        serialNumber: serialNumber as string,
        rentStatus: rentStatus as RentStatus,
      },      
    });

    revalidatePath("/dashboard/searchInstrument")
  }

  export const addStudent = async (formData: FormData) => {
    const firstName = formData.get("firstName");
    const lastName = formData.get("lastName");  
    const studentIdNumber = formData.get("studentIdNumber");  
    await prisma.studentInfo.create({
      data: {
        firstName: firstName as string,
        lastName: lastName as string,
        studentIdNumber: studentIdNumber as string,
      },
    });

    revalidatePath("/dashboard/searchStudent")
  }

  export const getStudents = cache(async () => {
    const students: StudentList = await prisma.studentInfo.findMany();
    return students;
  })

  export const getInstruments = cache(async () => {
    const instruments: InstrumentList = await prisma.instrumentInfo.findMany();
    return instruments;
  })

  export const updateInstrument = async (formData: FormData) => {
    const assignStudent = formData.get("assignStudent");
    let student = assignStudent?.toString().split(" ");
    console.log(student)
  }

  export const getStudentDropDownListFirstQuery = cache(async (limit:number) => { 
    const firstQuery: StudentList = await prisma.studentInfo.findMany({ 
      take: limit, 
      include: {
        instrument: false
      },
      orderBy: {
        id: "asc"
      }     
    });
    return firstQuery      
  })

  export const getStudentDropDownListNextQuery = cache(async (limit:number, skip:number, cursor:string) => {
    const nextQuery: StudentList = await prisma.studentInfo.findMany({
      take: limit,
      skip: skip,
      cursor: {
        id: cursor
      },
      include: {
        instrument: false
      },
      orderBy: {
        id: "asc"
      }
    })
    return nextQuery
  })  
    
  


    


    

      
    


      
    
    
    
