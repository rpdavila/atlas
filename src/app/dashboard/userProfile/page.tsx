"use client";
import { useEffect, useState } from "react";

import { useAppSelector, useAppDispatch } from "../../lib/ReduxSSR/hooks";
import { getCustomUserData } from "../../lib/ReduxSSR/features/userSlice";
import { UserRole, UpdateUserData } from "../../types/formTypes";

import TextInput from "../../components/input/customTextInput";
import Select from "../../components/input/customSelection";
import Button from "../../components/button/button";

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

  const handleUpdate = () => { };


  return (
    <>
      <div className="flex flex-col items-center mt-2 bg-white basis-3/4">
        <section className="flex flex-col">
          <h1 className="text-center">
            {userInfo.customUserData
              ? `Hello ${userInfo.customUserData.firstName} ${userInfo.customUserData.lastName}`
              : `Welcome user ${userInfo.id}`}
          </h1>
          <p>Here you can change your password and/or delete your account</p>
        </section>
        <br />
        <br />
        <section className="flex flex-col justify-evenly w-1/2">
          <section className="flex flex-row justify-between">
            <p>
              <strong>First Name:</strong>{" "}
              {userInfo.customUserData
                ? `${userInfo.customUserData.firstName}`
                : "No Data"}
            </p>
            <p>
              <strong>Last Name:</strong>{" "}
              {userInfo.customUserData
                ? `${userInfo.customUserData.lastName}`
                : "No Data"}
            </p>
          </section>
          <section className="flex flex-row justify-between">
            <p>
              <strong>Role:</strong>{" "}
              {userInfo.customUserData
                ? `${userInfo.customUserData.role}`
                : "No Data"}
            </p>
            <p>
              <strong>District:</strong>{" "}
              {userInfo.customUserData
                ? `${userInfo.customUserData.district}`
                : "No Data"}
            </p>
          </section>
          <p>
            <strong>Schools:</strong>{" "}
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
      </div>
    </>
  );
}
