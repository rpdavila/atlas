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
      // First, get the profile associated with the user
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

      const student = await tx.student.create({
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
      await tx.profile.update({
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
    })
    return { success: true, message: "Student successfully added" };
  } catch (error) {
    console.error(error);
    return { success: false, message: "Failed to add student" };
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
    await prisma.$transaction(async (tx) => {
      const schoolAndDistrict = await tx.profile.findUnique({
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

      const instrumentId = await tx.instrument.create({
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
      await tx.profile.update({
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
    })
    return { success: true, message: "Instrument successfully added" }
  } catch (error) {
    console.error(error)
    return { success: false, message: "Failed to add instrument" }
  }
}

export async function assignStudentToInstrument(formData: FormData, instrumentId: string) {
  const studentId = formData.get("student") as string;
  try {
    await prisma.$transaction(async (tx) => {
      // get school Id
      const schoolId = await tx.instrument.findUnique({
        where: {
          id: instrumentId
        },
        select: {
          schoolId: true
        }
      })

      // create assignment and return assignment ID
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

      // delete record
      await tx.instrumentAssignment.delete({
        where: {
          id: assignment.id
        },
      });

      //update instrument record
      await tx.instrument.update({
        where: {
          id: instrumentId
        },
        data: {
          rentStatus: RentStatus.Available
        }
      })

      revalidatePath("/searchInstrument");
      return { success: true, message: "Instrument successfully unassigned" }
    })
  } catch (error) {
    console.error('Error unassigning instrument', error);
    // Handle the error, e.g., notify the user or log the issue
    return { success: false, message: "Failed in unassigneing instrument" }

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

export async function getInstrumentsByDistrict(userId: string) {
  const districtId = await prisma.profile.findUnique({
    where: {
      userId: userId
    },
    select: {
      districtId: true
    }
  })

  const instruments = await prisma.district.findUnique({
    where: {
      id: districtId?.districtId as string
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

export async function deleteAccount(userId: string): Promise<{ success: boolean, message: string }> {
  try {
    const result = await prisma.$transaction(async (tx) => {
      // get profile
      const userProfile = await tx.profile.findUnique({
        where: {
          userId: userId
        },
      })

      if (userProfile) {
        // update all instruments to remove profile reference
        await tx.instrument.updateMany({
          where: {
            profileId: userProfile.id
          },
          data: {
            profileId: null
          }
        })
        // update all students
        await tx.student.updateMany({
          where: {
            profileId: userProfile.id
          },
          data: {
            profileId: null
          }
        })
      }
      await tx.profile.delete({
        where: {
          userId: userId
        }
      })

      await tx.session.deleteMany({
        where: { userId: userId }
      })

      await tx.authenticator.deleteMany({
        where: { userId: userId }
      })

      await tx.account.deleteMany({
        where: { userId: userId }
      })

      await tx.user.delete({
        where: {
          id: userId
        }
      })
      return { success: true, message: "Account successfully deleted" }
    })
    return result;
  } catch (error) {
    console.error('Error deleting user:', error);
    return { success: false, message: error instanceof Error ? error.message : "Failed to delete account" }
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

export async function getAvailableInstrumentCount(userId: string) {
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
        // check multiple schools
        in: schoolId?.schools.map(school => school.id)
      },
      rentStatus: "Available"
    },
  })
  return availableInstruments
}

export async function getAvailableInstrumentCountByDistrict(userId: string) {
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
}