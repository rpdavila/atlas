"use server"
//react imports
import { cache } from "react";
//db imports
import prisma from "@/lib/prisma";

//nextauth imports
import { revalidatePath } from "next/cache";
import { signIn, signOut } from "../auth";
import { RentStatus } from "@/app/types/formTypes";



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
  let district: { id: string; } | null = null
  let schools: { id: string; }[] | null = null
  try {


    //find district
    console.log("Searching if District exists")
    district = await prisma.district.findFirst({
      where: {
        name: districtName,
        state: state
      },
      select: {
        id: true
      }
    });



    // if district not found create the district
    if (!district?.id) {
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
        districtId: district?.id
      },
    })

    // if not schools create the schools
    if (!schools.length) {
      console.log("NO schools found in DB, creating schools")
      await prisma.school.createMany({
        data: schoolNamesArray.map((name) => ({
          name: name,
          districtId: district?.id
        })),
      })
    }

    //find the newly created school
    if (!schools?.length) {
      console.log("finding newly created schools")
      schools = await prisma.school.findMany({
        where: {
          name: {
            in: schoolNamesArray
          },
          districtId: district?.id
        },
        select: {
          id: true
        }
      })
    }


    //find the newly created district if it was not found before
    if (!district?.id) {
      console.log("finding newly created district")
      district = await prisma.district.findFirst({
        where: {
          name: districtName
        },
        select: {
          id: true
        }
      })
    }
    console.log(schools.map((school) => school.id))
    console.log(district?.id)

    // create the user profile and connect all related records
    const profileData = await prisma.profile.create({
      data: {
        role: role as string,
        district: {
          connect: {
            id: district?.id
          }
        },
        schools: {
          connect: Array.isArray(schools)
            ? schools.map((school) => ({ id: school.id }))
            : []
        },
        user: {
          connect: {
            id: userId
          }
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
              instrument: false,
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
}
export const getStudentById = async (id: string) => {
  const student = await prisma.student.findFirst({
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
      instrument: {
        select: {
          classification: true,
          brand: true,
          serialNumber: true,
          rentStatus: true,
          school: {
            select: {
              name: true
            }
          },
        },
      }
    }
  })
  return student
}
export const getStudentsByUserId = async (userId: string) => {
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
              instrument: {
                select: {
                  classification: true,
                  brand: true,
                  serialNumber: true,
                  rentStatus: true,
                  school: {
                    select: {
                      name: true
                    }
                  },
                },
              },
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
}

export const addStudent = async (formData: FormData, userId: string,) => {
  const firstName = formData.get("firstName") as string;
  const lastName = formData.get("lastName") as string;
  const studentIdNumber = formData.get("studentIdNumber") as string;
  const schoolName = formData.get("schools") as string;

  try {
    const school = await prisma.user.findFirst({
      where: {
        id: userId
      },
      select: {
        profile: {
          select: {
            schools: {
              where: {
                name: schoolName
              },
              select: {
                id: true
              }
            }
          }
        }
      }
    })

    const student = await prisma.student.create({
      data: {
        firstName: firstName,
        lastName: lastName,
        studentIdNumber: studentIdNumber,
        school: {
          connect: {
            id: school?.profile?.schools[0].id
          }
        }
      },
      select: {
        id: true
      }
    })

    await prisma.user.update({
      where: {
        id: userId
      },
      data: {
        profile: {
          update: {
            students: {
              connect: {
                id: student.id
              }
            }
          }
        }
      }
    })

    revalidatePath("/searchStudent")
  } catch (error) {
    console.error(error)
  }
}

// Instrument Actions
export async function getInstrumentsByUserId(userId: string) {
  const instruments = await prisma.user.findFirst({
    where: {
      id: userId
    },
    select: {
      profile: {
        select: {
          instruments: {
            select: {
              id: true,
              classification: true,
              brand: true,
              serialNumber: true,
              rentStatus: true,
              assignedTo: {
                select: {
                  id: true,
                  firstName: true,
                  lastName: true,
                  studentIdNumber: true,
                  school: {
                    select: {
                      name: true
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
      }
    }
  });
  return instruments
}

export async function addInstrument(formData: FormData, userId: string) {
  const classification = formData.get("classification") as string;
  const brand = formData.get("brand") as string;
  const serialNumber = formData.get("serialNumber") as string;
  const rentStatus = formData.get("rentStatus") as RentStatus;
  const schoolName = formData.get("schools") as string;
  try {
    const schoolAndDistrict = await prisma.user.findFirst({
      where: {
        id: userId
      },
      select: {
        profile: {
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
        }
      }
    })

    const instrumentId = await prisma.instrument.create({
      data: {
        classification: classification,
        brand: brand,
        serialNumber: serialNumber,
        rentStatus: rentStatus,
        school: {
          connect: {
            id: schoolAndDistrict?.profile?.schools[0].id
          }
        },
        district: {
          connect: {
            id: schoolAndDistrict?.profile?.district?.id
          }
        }
      },
      select: {
        id: true
      }
    })

    await prisma.user.update({
      where: {
        id: userId
      },
      data: {
        profile: {
          update: {
            instruments: {
              connect: {
                id: instrumentId.id
              }
            }
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
    await prisma.instrument.update({
      where: {
        id: instrumentId
      },
      data: {
        assignedTo: {
          connect: {
            id: studentId
          }
        },
        rentStatus: "Rented" as RentStatus
      }
    })
    revalidatePath("/searchInstruments")
  } catch (error) {
    console.error(error)
  }


}

export async function unassignStudentFromInstrument(userId: string, instrumentId: string) {

  try {

    await prisma.user.update({
      where: {
        id: userId
      },
      data: {
        profile: {
          update: {
            instruments: {
              update: {
                where: {
                  id: instrumentId
                },
                data: {
                  assignedTo: {
                    disconnect: true
                  },
                  rentStatus: "Available" as RentStatus,
                }
              }
            }
          }
        }
      }
    });
    revalidatePath("/searchInstruments");
  } catch (error) {
    if (error) {
      console.error('Unique constraint failed on the constraint:', error);
      // Handle the error, e.g., notify the user or log the issue
    } else {
      throw error; // Re-throw if it's not a known error
    }
  }
}

export async function getDropDownList(userId: string) {
  const students = await prisma.user.findFirst({
    where: {
      id: userId
    },
    select: {
      profile: {
        select: {
          students: {
            where: {
              instrument: null,
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
      }
    }
  })
  return students?.profile?.students
}

export async function getInstrumentsByDistrictWithUersId(userId: string) {
  const instruments = await prisma.user.findFirst({
    where: {
      id: userId
    },
    select: {
      profile: {
        select: {
          district: {
            select: {
              instruments: {
                where: {
                  rentStatus: "Available"
                },
                select: {
                  id: true,
                  classification: true,
                  brand: true,
                  serialNumber: true,
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
  return instruments
}

export async function deleteAccount(userId: string) {
  await prisma.user.delete({
    where: {
      id: userId
    }
  })
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

    return {teacherName: teacherData?.name, teacherEmail: teacherData?.email}
  } catch (e) {
    console.log(e)
  }
}