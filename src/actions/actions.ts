"use server"
//react imports
import { cache } from "react";
//db imports
import prisma from "@/lib/prisma";

//nextauth imports
import { revalidatePath } from "next/cache";
import { signIn, signOut } from "../auth";
import { Profile, User, Instrument, School, District, RentStatus } from "@/app/types/formTypes";




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
export const createProfile = async (formData: FormData, userId: string) => {
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
    //find district
    console.log("Searching if District exists")
    districtId = await prisma.district.findFirst({
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
      await prisma.district.create({
        data: {
          name: districtName,
          state: state
        },
      })
    }

    //find existing schools
    console.log("finding schools")
    schools = await prisma.school.findMany({
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
      await prisma.school.createMany({
        data: schoolNamesArray.map((name) => ({
          name: name,
          districtId: districtId?.id
        })),
      })
    }

    //find the newly created school
    if (!schools?.length) {
      console.log("finding newly created schools")
      schoolIds = await prisma.school.findMany({
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
      districtId = await prisma.district.findFirst({
        where: {
          name: districtName
        },
        select: {
          id: true
        }
      })
    }

    //get students if any
    const studentIds = await prisma.student.findMany({
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

    const instrumentIds = await prisma.instrument.findMany({
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
    const profileData = await prisma.profile.create({
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
    return profileData
  } catch (error) {
    console.error(error)
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
  return student
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
    // First, get the profile associated with the user
    const userProfile = await prisma.profile.findUnique({
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

    const student = await prisma.student.create({
      data: {
        firstName: firstName,
        lastName: lastName,
        studentIdNumber: studentIdNumber,
        school: {
          connect: {
            id: userProfile.schools[0]?.id
          }
        }
      },
      select: {
        id: true
      }
    });

    // Now update the profile using the correct profile ID
    await prisma.profile.update({
      where: {
        id: userProfile.id  // Use the actual profile ID
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
  } catch (error) {
    console.error(error);
  }
}

// Instrument Actions
export async function getInstrumentsByUserId(userId: string) {
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
  return instruments?.instruments
}

export async function addInstrument(formData: FormData, userId: string) {
  const classification = formData.get("classification") as string;
  const brand = formData.get("brand") as string;
  const serialNumber = formData.get("serialNumber") as string;
  const rentStatus = formData.get("rentStatus") as RentStatus;
  const schoolName = formData.get("schools") as string;
  try {
    const schoolAndDistrict = await prisma.profile.findUnique({
      where: {
        userId: userId
      },
      select: {
        schools: {
          where: {
            name: schoolName
          },
          select: {
            id: true
          }
        },
        district: {
          select: {
            id: true
          }
        }
      },
    })

    const instrumentId = await prisma.instrument.create({
      data: {
        classification: classification,
        brand: brand,
        serialNumber: serialNumber,
        rentStatus: rentStatus,
        school: {
          connect: {
            id: schoolAndDistrict?.schools[0].id
          }
        },
        district: {
          connect: {
            id: schoolAndDistrict?.district?.id
          }
        }
      },
      select: {
        id: true
      }
    })

    await prisma.profile.update({
      where: {
        userId: userId
      },
      data: {
        instruments: {
          connect: {
            id: instrumentId.id
          }
        }
      }
    })

    revalidatePath("/searchInstrument")
  } catch (error) {
    console.error(error)
  }
}

export async function assignStudentToInstrument(formData: FormData, instrumentId: string) {
  const studentId = formData.get("student") as string;
  try {
    // get school Id
    const schoolId = await prisma.instrument.findUnique({
      where: {
        id: instrumentId
      },
      select: {
        schoolId: true
      }
    })

    // create assignment and return assignment ID
    const instrumentAssignment = await prisma.instrumentAssignment.create({
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

    await prisma.instrument.update({
      where: {
        id: instrumentAssignment.instrumentId
      },
      data: {
        rentStatus: RentStatus.Rented
      }
    })
    revalidatePath("/searchInstrument")
  } catch (error) {
    console.error(error)
  }
}

export async function unassignStudentFromInstrument(instrumentId: string, studentId: string) {
  try {
    const assignment = await prisma.instrumentAssignment.findFirst({
      where: {
        instrumentId: instrumentId,
        studentId: studentId
      }
    })

    if (!assignment) {
      throw new Error("Instrument assignment not found.")
    }


    // delete record
    await prisma.instrumentAssignment.delete({
      where: {
        id: assignment.id
      },
    });

    //update instrument record
    await prisma.instrument.update({
      where: {
        id: instrumentId
      },
      data: {
        rentStatus: RentStatus.Available
      }
    })

    revalidatePath("/searchInstrument");
  } catch (error) {
    if (error) {
      console.error('Error unassigning instrument', error);
      // Handle the error, e.g., notify the user or log the issue
    } else {
      throw error; // Re-throw if it's not a known error
    }
  }
}

export async function getDropDownList(userId: string) {
  const students = await prisma.profile.findUnique({
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
  })
  return students?.students
}

export async function getInstrumentsByDistrict(districtId: string) {
  const instruments = await prisma.district.findUnique({
    where: {
      id: districtId
    },
    select: {
      instruments: {
        select: {
          brand: true,
          classification: true,
          id: true,
          rentStatus: true,
          serialNumber: true,
          school: {
            select: {
              name: true
            }
          }
        }
      }
    }
  });
  return instruments?.instruments
}

export async function deleteAccount(userId: string) {
  try {
    // get profile
    const userProfile = await prisma.profile.findUnique({
      where: {
        userId: userId
      },
    })

    if (userProfile) {
      // update all instruments to remove profile reference
      await prisma.instrument.updateMany({
        where: {
          profileId: userProfile.id
        },
        data: {
          profileId: null
        }
      })

      await prisma.student.updateMany({
        where: {
          profileId: userProfile.id
        },
        data: {
          profileId: null
        }
      })
    }

    await prisma.profile.delete({
      where: {
        userId: userId
      }
    })

    await prisma.session.deleteMany({
      where: { userId: userId }
    })

    await prisma.authenticator.deleteMany({
      where: { userId: userId }
    })

    await prisma.account.deleteMany({
      where: { userId: userId }
    })

    await prisma.user.delete({
      where: {
        id: userId
      }
    })

    return { success: true, message: "Account deleted" }
  } catch (error) {
    console.error('Error deleting user:', error);
    return { success: false, message: "Error deleting account" }

  }
}

export async function getTeacherEmailByInstument(instrumentId: string, school: string) {
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
  } catch (e) {
    console.log(e)
  }
}

export async function getAvailableInstrumentCount(schoolId: string) {
  const availableInstruments = await prisma.school.findUnique({
    where: { id: schoolId },
    include: {
      _count: {
        select: {
          instruments: {
            where: {
              rentStatus: "Available"
            }
          }
        }
      }
    }
  })

  return availableInstruments?._count
}

export async function getAvailableInstrumentCountByDistrict(districtId: string) {
  const availableInstruments = await prisma.district.findUnique({
    where: { id: districtId },
    include: {
      _count: {
        select: {
          instruments: {
            where: {
              rentStatus: "Available"
            }
          }
        }
      }
    }
  })
  return availableInstruments?._count
}