"use server"
//db imports
import prisma from "@/lib/prisma";

//nextauth imports
import { revalidatePath } from "next/cache";
import { signIn, signOut } from "../auth";
import { School, District } from "@/app/types/formTypes";
import { RentStatus } from "@prisma/client";
import { Selection } from "@heroui/react";
import { RxAccessibility } from "react-icons/rx";

export const handleSignIn = async (provider?: (string & {}) | undefined, options?: FormData | ({
  redirectTo?: string;
  redirect?: true | undefined;
} & Record<string, any>) | undefined, authorizationParams?: string[][] | Record<string, string> | string | URLSearchParams) => {
  await signIn(provider, options, authorizationParams);
}

export const handleSignOut = async (options?: {
  redirectTo?: string;
  redirect?: true | undefined;
} | undefined) => {
  await signOut(options);
}


// user Profile Actions
export const createProfile = async (formData: FormData, userId: string): Promise<{
  success: boolean, message: string, profileData: {
    user: {
      email: string | null;
    };
    district: {
      name: string;
    } | null;
    schools: {
      id: string;
      name: string;
    }[];
  }
}> => {
  const schoolNames = formData.getAll("schools") as string[];
  const districtName = formData.get("district") as string;
  let role = formData.get("role") as string;
  const state = formData.get("state") as string; 
  role = role.charAt(0).toUpperCase() + role.slice(1);
  try {
    const response = await prisma.$transaction(async (tx) => {
      // create a profile
      const profile = await tx.profile.create({
        data: {
          role: role,
          user: {
            connect: {
              id: userId
            }
          }
        },
        select: {
          id: true,
        }
      });

      // Check if the district exists and update if it doesnt then district
      const district = await tx.district.upsert({
        where: {
          name: districtName,
          state: state 
        },
        update: {
          profile: {
            connect: {
              id: profile.id
            }
          }
        },
        create: {
          name: districtName,
          state: state,
          profile: {
            connect: {
              id: profile.id
            }
          }        
        },
        select: {
          id: true,
        }
      })

      // find all schools that match the school names
     const existingSchools = await tx.school.findMany({
        where: {
          name: {
            in: schoolNames
          }
        },
        select: {
          id: true,
          name: true
        }
      })

      // update the schools to connect to the profile and district
      const existingSchoolNames = existingSchools.map(school => school.name)
      existingSchools.map(async school => {
        await tx.school.update({
          where: {
            id: school.id
          },
          data: {
            district: {
              connect: {
                id: district.id
              }
            },
            profile: {
              connect: {
                id: profile.id
              }
            }
          }
        })
      })
      
      // filter out the school names that dont exist
      const newSchoolNames = schoolNames.filter(name => !existingSchoolNames.includes(name))

      // create new schools if they dont exist
      await Promise.all(newSchoolNames.map(async (schoolName) => {
        return await tx.school.create({
          data: {
            name: schoolName,
            district: {
              connect: {
                id: district.id
              }
            },
            profile: {
              connect: {
                id: profile.id
              }
            }
          }
        })
      }))

      // fetch profiledata to return
      const profileData = await tx.profile.findUnique({
        where: {
          id: profile.id
        },
        include: {
          user: {
            select: {
              email: true
            }
          },
          district: {
            select: {
              name: true
            }
          },
          schools: {
            select: {
              id: true,
              name: true
            }
          }
        }
      })
      if (!profileData) {
        throw new Error("Profile data not found")
      }

      revalidatePath("/userProfile")
      return { profileData: profileData, success: true, message: "Profile successfully created" }
    })    
    return response
  } catch (error) {
    console.error(error);
    return { success: false, message: "Failed to create profile", profileData: { user: { email: null }, district: null, schools: [] } };
  }
}

export const getSchoolsByUserId = async (userId: string) => {
  const schools = await prisma.school.findMany({
    where: {
      profile: {
        userId: userId
      }
    },
    select: {
      name: true,
      id: true
    }
  });
  return schools
}

export async function getUserProfile(userId: string) {
  const profile = await prisma.user.findFirst({
    where: {
      id: userId
    },
    select: {
      profile: true
    }
  })
  return profile
}
export async function getDistrictFromUserId(userId: string) {
  const district = await prisma.user.findFirst({
    where: {
      id: userId
    },
    select: {
      profile: {
        select: {
          district: {
            select: {
              name: true
            }
          }
        }
      }
    }
  })
  return district
}
// student actions
export const getStudentsByUserIdWithouInstrumentAssignment = async (userId: string) => {
  try {
    const students = await prisma.user.findFirst({
      where: {
        id: userId
      },
      select: {
        profile: {
          select: {
            students: {
              select: {
                firstName: true,
                lastName: true,
                studentIdNumber: true,
                id: true,
                instrumentAssignment: false,
                school: {
                  select: {
                    name: true
                  }
                }
              }
            }
          }
        }
      }
    });
    return students
  } catch (error) {
    console.error(error);
  }
}
export const getStudentById = async (id: string) => {
  const student = await prisma.student.findUnique({
    where: {
      id: id
    },
    select: {
      firstName: true,
      lastName: true,
      studentIdNumber: true,
      school: {
        select: {
          name: true
        }
      },
      instrumentAssignment: {
        select: {
          instrument: {
            select: {
              classification: true,
              brand: true,
              serialNumber: true,
            }
          }
        },
      }
    }
  })
  return student ?? null
}
export const getStudentsByUserId = async (userId: string) => {
  const students = await prisma.profile.findUnique({
    where: {
      userId: userId
    },
    select: {
      students: {
        select: {
          firstName: true,
          lastName: true,
          studentIdNumber: true,
          id: true,
          school: {
            select: {
              name: true
            }
          },
          instrumentAssignment: {
            select: {
              instrument: {
                select: {
                  id: true,
                  classification: true,
                  brand: true,
                  serialNumber: true,
                  rentStatus: true,
                  school: {
                    select: {
                      name: true
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  });
  return students?.students
}

export const addStudent = async (formData: FormData, userId: string,) => {
  const firstName = formData.get("firstName") as string;
  const lastName = formData.get("lastName") as string;
  const studentIdNumber = formData.get("studentIdNumber") as string;
  const schoolName = formData.get("schools") as string;

  try {
    await prisma.$transaction(async (tx) => {
      const userProfile = await tx.profile.findUnique({
        where: {
          userId: userId
        },
        select: {
          id: true,
          schools: {
            where: {
              name: schoolName
            },
            select: {
              id: true
            }
          }
        }
      });

      if (!userProfile?.id) {
        throw new Error("Profile not found");
      }

      if (!userProfile.schools?.length) {
        throw new Error("School not found for user");
      }
      const student = await tx.student.create({
        data: {
          firstName: firstName,
          lastName: lastName,
          studentIdNumber: studentIdNumber,
          school: {
            connect: {
              id: userProfile.schools[0].id
            }
          }
        },
        select: {
          id: true
        }
      });

      await tx.profile.update({
        where: {
          id: userProfile.id
        },
        data: {
          students: {
            connect: {
              id: student.id
            }
          }
        }
      });
      revalidatePath("/searchStudent");
    })

    return { success: true, message: "Student successfully added" };
  } catch (error) {
    console.error(error);
    return { success: false, message: "Failed to add student" };
  }
}

// Instrument Actions
export async function getInstrumentsByUserId(userId: string): Promise<any[] | { success: boolean; message: string }> {
  try {
    const instruments = await prisma.profile.findUnique({
      where: {
        userId: userId
      },
      select: {
        instruments: {
          select: {
            id: true,
            classification: true,
            brand: true,
            serialNumber: true,
            rentStatus: true,
            instrumentAssignment: {
              select: {
                id: true,
                student: {
                  select: {
                    firstName: true,
                    lastName: true,
                    studentIdNumber: true,
                    id: true
                  }
                }
              }
            },
            school: {
              select: {
                name: true
              }
            }
          }
        }
      }
    });
    if (!instruments?.instruments || instruments.instruments.length === 0) {
      return { success: false, message: "No instruments found for this user" }
    }
    return instruments.instruments
  } catch (error) {
    console.error("Failed to get instruments", error)
    return { success: false, message: "Failed to get instruments" }
  }

}

export async function addInstrument(formData: FormData, userId: string) {
  const classification = formData.get("classification") as string;
  const brand = formData.get("brand") as string;
  const serialNumber = formData.get("serialNumber") as string;
  const rentStatus = formData.get("rentStatus") as RentStatus;
  const schoolId = formData.get("schoolId") as string;
  console.log("Form Data is: ", classification, brand, serialNumber, rentStatus, schoolId)
  if (!classification || !brand || !serialNumber || !rentStatus || !schoolId) {
    return { success: false, message: "Missing required Fields" }
  }
  try {

    await prisma.$transaction(async (tx) => {
      const userProfile = await tx.profile.findUnique({
        where: { userId },
        select: {
          schools: {
            where: { id: schoolId },
            select: { id: true }
          },
          district: {
            select: { id: true }
          },
          id: true
        },
      })
      console.log("User Profile is: ", userProfile?.schools, userProfile?.district)
      if (!userProfile?.schools?.length) {
        throw new Error("School not found for user")
      }

      if (!userProfile.district?.id) {
        throw new Error("District not Found for user")
      }

      await tx.instrument.create({
        data: {
          classification: classification,
          brand: brand,
          serialNumber: serialNumber,
          rentStatus: rentStatus,
          school: {
            connect: {
              id: userProfile.schools[0].id
            }
          },
          district: {
            connect: {
              id: userProfile.district.id
            }
          },
          Profile: {
            connect: {
              id: userProfile.id
            }
          }
        },
        select: {
          id: true
        }
      })
      revalidatePath("/dashboard/searchInstrument")
    })
    return { success: true, message: `Instrumentsuccessfully added` }
  } catch (error) {
    console.error("Failed to add instrument", error)
    return {
      success: false,
      message: error instanceof Error ? error.message : "Failed to add instrument"
    }
  }
}

export async function assignStudentToInstrument(formData: FormData, instrumentId: string) {
  const studentId = formData.get("student") as string;

  try {
    await prisma.$transaction(async (tx) => {
      const schoolId = await tx.instrument.findUnique({
        where: {
          id: instrumentId
        },
        select: {
          schoolId: true
        }
      })

      const instrumentAssignment = await tx.instrumentAssignment.create({
        data: {
          instrumentId: instrumentId,
          studentId: studentId,
          schoolId: schoolId?.schoolId as string
        },
        select: {
          id: true,
          studentId: true,
          instrumentId: true
        }
      })

      await tx.instrument.update({
        where: {
          id: instrumentAssignment.instrumentId
        },
        data: {
          rentStatus: RentStatus.Rented
        }
      })
      revalidatePath("/dashboard/searchInstrument")
    })

    return { success: true, message: "Instrument successfully assigned" }
  } catch (error) {
    console.error(error)
    return { success: false, message: "Failed to assign instrument" }
  }
}

export async function unassignStudentFromInstrument(instrumentId: string, studentId: string) {
  try {
    await prisma.$transaction(async (tx) => {
      const assignment = await tx.instrumentAssignment.findFirst({
        where: {
          instrumentId: instrumentId,
          studentId: studentId
        }
      })

      if (!assignment) {
        throw new Error("Instrument assignment not found.")
      }
      // amazonq-ignore-next-line

      await tx.instrumentAssignment.delete({
        where: {
          id: assignment.id
        },
      });
      // amazonq-ignore-next-line

      await tx.instrument.update({
        where: {
          id: instrumentId
        },
        data: {
          rentStatus: RentStatus.Available
        }
      })
      revalidatePath("/dashboard/searchInstrument");
    })
    return { success: true, message: "Instrument successfully unassigned" }
  } catch (error) {
    console.error({
      message: 'Error unassigning instrument',
      function: "unassignStudentFromInstrument",
      instrumentId,
      studentId,
      error: error instanceof Error ? error.message : String(error),
      stack: error instanceof Error ? error.stack : undefined,
      errorType: error instanceof Error ? error.constructor.name : typeof error
    });
    return { success: false, message: "Failed in unassigning instrument" }
  }
}

export async function getDropDownList(userId: string) {
  if (!userId) {
    return { success: false, message: "User not found" }
  }
  try {
    const profile = await prisma.profile.findUnique({
      where: {
        userId: userId
      },
      select: {
        students: {
          where: {
            instrumentAssignment: null,
          },
          select: {
            id: true,
            firstName: true,
            lastName: true,
            studentIdNumber: true,
            school: true
          }
        }
      }
    });
    if (!profile) {
      return { success: false, message: "Profile not found" }
    }
    return profile.students
  } catch (error) {
    console.error("Failed to get list of Students", error)
    return { success: false, message: "Failed to get list of students" }
  }
}

export async function getInstrumentsByDistrict(userId: string) {
  const result = await prisma.profile.findUnique({
    where: { userId },
    select: {
      district: {
        select: {
          instruments: {
            where: {
              rentStatus: "Available",
            },
            select: {
              brand: true,
              classification: true,
              id: true,
              rentStatus: true,
              serialNumber: true,
              school: {
                select: { name: true }
              }
            }
          }
        }
      }
    }
  })
  return result?.district?.instruments
}

export async function deleteAccount(userId: string): Promise<{ success: boolean, message: string }> {
  try {
    await prisma.$transaction(async (tx) => {
      await Promise.all([
        tx.session.deleteMany({ where: { userId } }),
        tx.authenticator.deleteMany({ where: { userId } }),
        tx.account.deleteMany({ where: { userId } }),
        tx.instrument.updateMany({
          where: { profileId: userId },
          data: { profileId: null }
        }),
        tx.student.updateMany({
          where: { profileId: userId },
          data: { profileId: null }
        }),
        // delete profile and user
        tx.profile.delete({ where: { userId } }),
        tx.user.delete({ where: { id: userId } })
      ]);
    });
    return { success: true, message: "Account deleted successfully" }
  } catch (error) {
    console.error('Error deleting user:', error);
    return { success: false, message: "Failed to delete account" }
  }
}

export async function getTeacherEmailByInstrument(instrumentId: string, school: string) {
  try {
    const userId = await prisma.profile.findFirst({
      where: {
        schools: {
          some: {
            name: school
          }
        },
        instruments: {
          some: {
            id: instrumentId
          }
        }
      },
      select: {
        userId: true
      }
    })

    const teacherData = await prisma.user.findFirst({
      where: {
        id: userId?.userId,
      },
      select: {
        email: true,
        name: true
      }
    })

    return { teacherName: teacherData?.name, teacherEmail: teacherData?.email }
  } catch (error) {
    console.log("Error retrieving teacher email", error)
  }
}

export async function getAvailableInstrumentCount(userId: string) {
  try {
    const schoolId = await prisma.profile.findUnique({
      where: {
        userId: userId
      },
      select: {
        schools: {
          select: {
            id: true
          }
        }
      }
    })

    const availableInstruments = await prisma.instrument.count({
      where: {
        schoolId: {
          in: schoolId?.schools.map(school => school.id)
        },
        rentStatus: "Available"
      },
    })
    return availableInstruments
  } catch (error) {
    console.error("Error retrieving number of inetruments", error)
    return { success: false, message: "Failed to retrieve number of available instrument" }
  }
}

export async function getAvailableInstrumentCountByDistrict(userId: string) {
  try {
    const districtId = await prisma.profile.findUnique({
      where: {
        userId: userId
      },
      select: {
        district: {
          select: {
            id: true
          }
        }
      }
    })

    const availableInstruments = await prisma.instrument.count({
      where: {
        districtId: districtId?.district?.id,
        rentStatus: "Available"
      }
    })
    return availableInstruments
  } catch (error) {
    console.error("Error retrieving number of instruments", error)
    return { success: false, message: "Failed to retrieve number of available instruments" }
  }
}

export async function removeStudentFromCourse(formData: FormData) {
  const studentId = formData.get("studentId") as string;

  if (!studentId) {
    return { success: false, message: "Student ID is required" };
  }

  try {
    await prisma.$transaction(async (tx) => {
      // Check if student has an instrument assignment
      const assignment = await tx.instrumentAssignment.findFirst({
        where: { studentId }
      });

      // If there's an assignment, delete it first and update instrument status
      if (assignment) {
        await tx.instrumentAssignment.delete({
          where: { id: assignment.id }
        });

        // Update instrument status to Available
        await tx.instrument.update({
          where: { id: assignment.instrumentId },
          data: {
            rentStatus: RentStatus.Available
          }
        });
      }

      // Delete the student
      await tx.student.delete({
        where: { id: studentId }
      });
      revalidatePath("/searchStudent");
    });
    return { success: true, message: "Student deleted successfully" };
  } catch (error) {
    console.error("Error deleting student", error);
    return {
      success: false,
      message: error instanceof Error ? error.message : "Failed to delete student"
    };
  }
}

export async function removeInstrument(formData: FormData) {
  const instrumentId = formData.get("instrumentId") as string;
  
  
  try {
    await prisma.$transaction(async (tx) => {
      const response = await tx.instrumentAssignment.findUnique({
        where:  {
          instrumentId: instrumentId
        }
      }) 

      if (response?.id) {
        throw new Error("Instrument is assigned to a student cannot remove")
      }

      await tx.instrument.delete({
        where: {
          id: instrumentId
        }
      })
      
      revalidatePath("/searchInstrument")        
    })
    return {success: true, message: "Instrument removed"}
  } catch (error) {
    console.log(error)
    return {
      success: false, 
      message: error instanceof Error? error.message: "Failed to delete instrument"
    }
 }  
}