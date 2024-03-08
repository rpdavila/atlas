"use client";
import { useEffect, useState } from "react";

import { useAppSelector, useAppDispatch } from "../redux/hooks";
import { getCustomUserData } from "../redux/features/userSlice";
import { UserRole, UpdateUserData } from "../types/formTypes";

import { UPDATE_USER_CUSTOM_DATA } from "../graphQLOperations";
import { useMutation } from "@apollo/client";

import TextInput from "../components/input/customTextInput";
import Select from "../components/input/customSelection";
import Button from "../components/button/button";

type FieldData = {
  firstName: string;
  lastName: string;
  school: string[];
  district: string;
  role: UserRole | null;
  selectOptions: UpdateUserData | null;
};

export default function UserProfile() {
  const userInfo = useAppSelector((state) => state.userInfo);
  const dispatch = useAppDispatch();
  const initialState: FieldData = {
    firstName: "",
    lastName: "",
    school: [],
    district: "",
    role: null,
    selectOptions: null,
  };

  const [fieldData, setFieldData] = useState<FieldData>(initialState);
  // put below function in its own page after user confirms registration
  // const [
  //   addUserCustomData,
  //   { data: addUserData, loading: addUserLoading, error: addUserError },
  // ] = useMutation(ADD_USER_CUSTOM_DATA);

  const [
    updateUserData,
    { loading: updateUserLoading, error: updateUserDataError },
  ] = useMutation(UPDATE_USER_CUSTOM_DATA);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === "school") {
      const schools = value.replace(" ", "").split(",");
      setFieldData({ ...fieldData, [name]: schools });
    } else {
      setFieldData({ ...fieldData, [name]: value });
    }
  };

  const getComponent = () => {
    switch (fieldData.selectOptions) {
      case "First Name":
        return (
          <TextInput
            labelName="First Name"
            type="text"
            name="firstName"
            value={fieldData.firstName}
            onChange={onChange}
            placeHolder="First Name"
          />
        );
      case "Last Name":
        return (
          <TextInput
            labelName="Last Name"
            type="text"
            name="lastName"
            value={fieldData.lastName}
            onChange={onChange}
            placeHolder="Last Name"
          />
        );
      case "Role":
        return (
          <Select
            label="Role"
            category="role"
            options={UserRole}
            onChange={onChange}
            placeHolder="Role"
          />
        );
      case "District":
        return (
          <TextInput
            labelName="District"
            type="text"
            name="district"
            value={fieldData.district}
            onChange={onChange}
            placeHolder="District"
          />
        );
      case "School":
        return (
          <TextInput
            labelName="School"
            type="text"
            name="school"
            value={fieldData.school}
            onChange={onChange}
            placeHolder="School"
          />
        );
    }
  };
  // put below function in its own page after user confirms registration
  // const handleSubmit = () => {
  //   addUserCustomData({
  //     variables: {
  //       data: {
  //         userId: userInfo.id,
  //         firstName: fieldData.firstName,
  //         lastName: fieldData.lastName,
  //         schools: fieldData.school,
  //         district: fieldData.district,
  //         role: fieldData.role,
  //       },
  //     },
  //   });
  // };

  const handleUpdate = () => {
    switch (fieldData.selectOptions) {
      case "First Name":
        updateUserData({
          variables: {
            query: {
              userId: userInfo.id,
            },
            set: {
              firstName: fieldData.firstName,
            },
          },
        });
        break;
      case "Last Name":
        updateUserData({
          variables: {
            query: {
              userId: userInfo.id,
            },
            set: {
              lastName: fieldData.lastName,
            },
          },
        });
        break;
      case "Role":
        updateUserData({
          variables: {
            query: {
              userId: userInfo.id,
            },
            set: {
              role: fieldData.role,
            },
          },
        });
        break;
      case "District":
        updateUserData({
          variables: {
            query: {
              userId: userInfo.id,
            },
            set: {
              district: fieldData.district,
            },
          },
        });
        break;
      case "School":
        updateUserData({
          variables: {
            query: {
              userId: userInfo.id,
            },
            set: {
              school: fieldData.school,
            },
          },
        });
        break;
    }
  };

  useEffect(() => {
    dispatch(getCustomUserData());
  }, [dispatch, fieldData]);

  if (updateUserLoading) return <h1>Loading...</h1>;
  if (updateUserDataError)
    return <h1>Error submitting request {updateUserDataError.message}</h1>;
  return (
    <main className="flex min-h-screen flex-col justify-evenly place-items-center basis-3/4 bg-white mt-2 rounded-lg">
      <section className="flex flex-col">
        <h1 className="text-center">
          {userInfo.customUserData
            ? `Hello ${userInfo.customUserData.firstName} ${userInfo.customUserData.lastName}`
            : `Welcome user ${userInfo.id}`}
        </h1>
        <p>Here you can change your password and/or delete your account</p>
      </section>
      <section className="flex flex-col justify-evenly w-1/2">
        <section className="flex flex-row justify-between">
          <p>
            First Name:{" "}
            {userInfo.customUserData
              ? `${userInfo.customUserData.firstName}`
              : "No Data"}
          </p>
          <p>
            Last Name:{" "}
            {userInfo.customUserData
              ? `${userInfo.customUserData.lastName}`
              : "No Data"}
          </p>
        </section>
        <section className="flex flex-row justify-between">
          <p>
            Role:{" "}
            {userInfo.customUserData
              ? `${userInfo.customUserData.role}`
              : "No Data"}
          </p>
          <p>
            District:{" "}
            {userInfo.customUserData
              ? `${userInfo.customUserData.district}`
              : "No Data"}
          </p>
        </section>
        <p>
          Schools:{" "}
          {userInfo.customUserData
            ? `${userInfo.customUserData.school}`
            : "No Data"}
        </p>
      </section>
      <section>
        <section>
          <Select
            category="selectOptions"
            label="Update Field"
            options={UpdateUserData}
            onChange={onChange}
            placeHolder="Update Field"
          />
        </section>

        <section className="flex flex-row justify-center w-full">
          {getComponent()}
        </section>

        <Button
          name="Update"
          onClick={handleUpdate}
          type="button"
          marginTop="5"
        />
      </section>
    </main>
  );
}
