"use server"
//react imports
import { cache } from "react";
//db imports
import prisma from "@/lib/prisma";

//nextauth imports
import { revalidatePath } from "next/cache";
import { signIn, signOut } from "../auth";
import { Profile, User, Instrument, School, District } from "@/app/types/formTypes";
import { RentStatus } from "@prisma/client";


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
  const schoolNames = formData.get("school/s") as string;
  const districtName = formData.get("district") as string;
  let role = formData.get("role") as string;
  const state = formData.get("state") as string;

  const schoolNamesArray: Array<string> = schoolNames.includes(",")
    ? schoolNames.split(", ").map((name) => name.trim())
    : [schoolNames];
  role = role.charAt(0).toUpperCase() + role.slice(1);
  let districtId: Omit<District, "name" | "state" | "schools" | "instruments" | "profile" | "profileId"> | null = null
  let schools: Array<Omit<School, "districtId" | "district" | "instruments" | "profile" | "profileId" | "students" | "instrumentAssignments">> | null = null
  let schoolIds: Array<Omit<School, "name" | "districtId" | "district" | "instruments" | "profile" | "profileId" | "students" | "instrumentAssignments">> | null = null
  try {

    const response = await prisma.$transaction(async (tx) => {
      //find district
      console.log("Searching if District exists")
      districtId = await tx.district.findFirst({
        where: {
          name: districtName,
          state: state
        },
        select: {
          id: true
        }
      });

      // if district not found create the district
      if (!districtId?.id) {
        console.log("District not found, creating district")
        await tx.district.create({
          data: {
            name: districtName,
            state: state
          },
        })
      }

      //find existing schools
      console.log("finding schools")
      schools = await tx.school.findMany({
        where: {
          name: {
            in: schoolNamesArray
          },
          districtId: districtId?.id
        },
      })

      if (schools.length > 0) {
        schoolIds = schools.map(school => ({ id: school.id }));
      }

      // if no schools create the schools
      if (!schools.length) {
        console.log("No schools found in DB, creating schools")
        await tx.school.createMany({
          data: schoolNamesArray.map((name) => ({
            name: name,
            districtId: districtId?.id
          })),
        })
      }

      //find the newly created school
      if (!schools?.length) {
        console.log("finding newly created schools")
        schoolIds = await tx.school.findMany({
          where: {
            name: {
              in: schoolNamesArray
            },
            districtId: districtId?.id
          },
          select: {
            id: true
          }
        })
      }

      //find the newly created district if it was not found before
      if (!districtId?.id) {
        console.log("finding newly created district")
        districtId = await tx.district.findFirst({
          where: {
            name: districtName
          },
          select: {
            id: true
          }
        })
      }

      //get students if any
      const studentIds = await tx.student.findMany({
        where: {
          school: {
            name: {
              in: schoolNamesArray
            }
          }
        },
        select: {
          id: true
        }
      })

      const instrumentIds = await tx.instrument.findMany({
        where: {
          school: {
            name: {
              in: schoolNamesArray
            }
          }
        },
        select: {
          id: true
        }
      })

      // create the user profile and connect all related records
      const profileData = await tx.profile.create({
        data: {
          role: role as string,
          district: {
            connect: {
              id: districtId?.id
            }
          },
          schools: {
            connect: schoolIds ?? []
          },
          user: {
            connect: {
              id: userId
            }
          },
          students: {
            connect: studentIds ?? []
          },
          instruments: {
            connect: instrumentIds ?? []
          }
        },
        // return newly created profile
        select: {
          district: {
            select: {
              name: true,
            }
          },
          schools: {
            select: {
              name: true,
              id: true
            }
          },
          user: {
            select: {
              email: true
            }
          }
        }
      });
      revalidatePath("/userProfile")
      return { profileData: profileData, success: true, message: "Profile successfully created" }
    })
    return response;
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
      revalidatePath("/searchInstrument")
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
      revalidatePath("/searchInstrument")
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
      revalidatePath("/searchInstrument");
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