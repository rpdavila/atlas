"use server"
//db imports
import prisma from "@/lib/prisma";

import {revalidatePath} from "next/cache";
import {RentStatus} from "@prisma/client";
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
    return await prisma.$transaction(async (tx) => {
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

      // Check if the district exists and update if it doesn't then district
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

      // filter out the school names that don't exist
      const newSchoolNames = schoolNames.filter(name => !existingSchoolNames.includes(name))

      // create new schools if they don't exist
      await Promise.all(newSchoolNames.map(async (schoolName) => {
        return tx.school.create({
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
        });
      }))

      // fetch profile data to return
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
      return {profileData: profileData, success: true, message: "Profile successfully created"}
    })
  } catch (error) {
    console.error(error);
    return { success: false, message: "Failed to create profile", profileData: { user: { email: null }, district: null, schools: [] } };
  }
}

export const getSchoolsByUserId = async (userId: string) => {
  return prisma.school.findMany({
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
}

export async function getUserProfile(userId: string) {
  return prisma.user.findFirst({
    where: {
      id: userId
    },
    select: {
      profile: true
    }
  });
}
export async function getDistrictFromUserId(userId: string) {
  return prisma.user.findFirst({
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
  });
}
// student actions
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
      const profile = await tx.profile.findUnique({
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

      if (!profile) {
        throw new Error("Profile not found");
      }

      const [school]= profile.schools;
      if (!school) {
        throw new Error("School not found for user");
      }
      await tx.student.create({
        data: {
          firstName: firstName,
          lastName: lastName,
          studentIdNumber: studentIdNumber,
          school: {
            connect: {
              id: school.id
            },
          },
          Profile: {
            connect: {id: profile.id}
          }
        }
      });
    })
    revalidatePath("/searchStudent");

    return { success: true, message: "Student successfully added" };
  } catch (error) {
    console.error(error);
    return { success: false, message: "Failed to add student" };
  }
}

// Instrument Actions
export async function getInstrumentsByUserId(userId: string) {
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
  const classification = formData.get("classification");
  const brand = formData.get("brand");
  const serialNumber = formData.get("serialNumber");
  const rentStatus = formData.get("rentStatus");
  const schoolId = formData.get("schoolId");

  if (
    typeof classification !== "string" ||
    typeof brand !== "string" ||
    typeof serialNumber !== "string" ||
    typeof rentStatus !== "string" ||
    typeof schoolId !== "string"
  ) {
    return { success: false, message: "Missing or invalid required fields" };
  }

  try {
    await prisma.$transaction(async (tx) => {
      const profile = await tx.profile.findUnique({
        where: { userId },
        select: {
          id: true,
          schools: {
            where: { id: schoolId },
            select: { id: true }
          },
          district: {
            select: { id: true }
          }
        }
      });

      if (!profile) {
        throw new Error("Profile not found");
      }

      const [school] = profile.schools;
      if (!school) {
        throw new Error("School not found for user");
      }

      if (!profile.district?.id) {
        throw new Error("District not found for user");
      }

      await tx.instrument.create({
        data: {
          classification,
          brand,
          serialNumber,
          rentStatus: rentStatus as RentStatus,
          school: {
            connect: { id: school.id }
          },
          district: {
            connect: { id: profile.district.id }
          },
          Profile: {
            connect: { id: profile.id }
          }
        }
      });
    });
    revalidatePath("/dashboard/searchInstrument");

    return { success: true, message: "Instrument successfully added" };
  } catch (error) {
    console.error("Failed to add instrument", error);
    return {
      success: false,
      message: error instanceof Error ? error.message : "Failed to add instrument"
    };
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


      await tx.instrumentAssignment.delete({
        where: {
          id: assignment.id
        },
      });


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
    if (!teacherData) {
      return null
    }

    return { teacherName: teacherData.name, teacherEmail: teacherData.email }
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

    const schoolIds = schoolId?.schools.map((school) => school.id);

    if (!schoolIds || schoolIds.length === 0) {
      return 0
    }

    return await prisma.instrument.count({
      where: {
        schoolId: {
          in: schoolIds
        },
        rentStatus: "Available"
      },
    })
  } catch (error) {
    console.error("Error retrieving number of instruments", error)
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

    if (!districtId?.district?.id) {
      return 0
    }

    return await prisma.instrument.count({
      where: {
        school: {
          districtId: districtId?.district?.id,
        },
        rentStatus: "Available"
      }
    })
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