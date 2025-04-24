import { useState } from "react"
import { useForm } from "react-hook-form"
import { toast } from "react-hot-toast"
import { IoAddCircleOutline } from "react-icons/io5"
import { MdNavigateNext } from "react-icons/md"
import { useDispatch, useSelector } from "react-redux"

import {
  createSection,
  updateSection,
} from "../../../../../services/operations/courseDetailsAPI"

import {
  setCourse,    // Course ka updated data Redux store me save karega.
  setEditCourse,   //  Edit mode enable/disable karega.
  setStep,   // Course creation ke different steps ko manage karega.
} from "../../../../../slices/courseSlice"

import IconBtn from "../../../../Common/IconBtn"
import NestedView from "./NestedView"

export default function CourseBuilderForm() {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm()

  const { course } = useSelector((state) => state.course)
  const { token } = useSelector((state) => state.auth)
  const [loading, setLoading] = useState(false)
  const [editSectionName, setEditSectionName] = useState(null)  // Agar user kisi section ka naam edit kar raha hai to uska ID store karega.
  const dispatch = useDispatch()


    // Agar editSectionName exist karega → To existing section ka naam update karega.
    // Agar nahi karega → To ek naya section create karega.
    // Redux me course ka updated data store karega.

  // handle form submission
  const onSubmit = async (data) => {
    // console.log(data)
    setLoading(true)

    let result   // result me updated course ka data store hoga jo backend se aayega jo courseSlice me store hoga. 

    if (editSectionName) {
      result = await updateSection(
        {
          sectionName: data.sectionName,
          sectionId: editSectionName,
          courseId: course._id,
        },
        token
      )
      // console.log("edit", result)
    } else {
      result = await createSection(
        {
          sectionName: data.sectionName,
          courseId: course._id,
        },
        token
      )
    }
    if (result) {
      // console.log("section result", result)
      dispatch(setCourse(result))
      setEditSectionName(null)   // editSectionName ko null karega agar user kisi section ka naam edit kar raha hai to uska ID store karega. 
      toast.success("Section created successfully")
      setValue("sectionName", "")   // Agar user kisi section ka naam edit kar raha hai to uska ID store karega. 
      
    }
    setLoading(false)
  }

  const cancelEdit = () => {
    setEditSectionName(null)    // // Koi section edit nahi ho raha
    setValue("sectionName", "")   // Input field ko empty kar do
  }

  // Jab user kisi section ke edit button pe click karega, tab us section ka naam input field me fill ho jayega taaki wo usko edit kar sake.
  const handleChangeEditSectionName = (sectionId, sectionName) => {
    // sectionId → Jis section ko edit karna hai uska unique ID.
   // sectionName → Us section ka current naam jo edit hoga.

   // editSectionName ek state variable hai jisme currently edit ho raha section ka ID store hota hai.
  // Agar editSectionName aur sectionId same hain, iska matlab user ek hi section ko dubara edit kar raha hai.
  // Aise case me cancelEdit() function call hoga jo edit mode ko band kar dega.
    if (editSectionName === sectionId) {
      cancelEdit()
      return
    }

    // Agar user kisi naye section ka edit button click karta hai, to:
    // setEditSectionName(sectionId) → Ye naya section ID store karega taaki pata chale ki kaunsa section edit ho raha hai.
    // setValue("sectionName", sectionName) → Ye form ke input field me us section ka naam set karega, taaki user edit kar sake.

    setEditSectionName(sectionId)
    setValue("sectionName", sectionName)
  }

  const goToNext = () => {
    if (course.courseContent.length === 0) {
      toast.error("Please add atleast one section")
      return
    }

    // some() → Check karega ki koi section aisa hai jisme subSection empty ho?
    // section.subSection.length === 0 → Matlab us section me koi lecture nahi hai.
    // Agar aisa koi section milta hai, to:
    // "Please add atleast one lecture in each section" error message dikhayega.
    // return → Function stop ho jayega.
    if (
      course.courseContent.some((section) => section.subSection.length === 0)
    ) {
      toast.error("Please add atleast one lecture in each section")
      return
    }
    dispatch(setStep(3))
  }

  const goBack = () => {
    dispatch(setStep(1))
    dispatch(setEditCourse(true))
  }

  return (
    <div className="space-y-8 rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-6">
      <p className="text-2xl font-semibold text-richblack-5">Course Builder</p>
      <form
       onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="flex flex-col space-y-2">
          <label className="text-sm text-richblack-5" htmlFor="sectionName">
            Section Name <sup className="text-pink-200">*</sup>
          </label>
          <input
            id="sectionName"
            disabled={loading}  // 👈 Jab loading true hoga tab input disable hoga
            placeholder="Add a section to build your course"
            {...register("sectionName", { required: true })}
            className="form-style w-full"
          />
          {errors.sectionName && (
            <span className="ml-2 text-xs tracking-wide text-pink-200">
              Section name is required
            </span>
          )}
        </div>
        <div className="flex items-end gap-x-4">
          <IconBtn
            type="submit"
            disabled={loading}
            text={editSectionName ? "Edit Section Name" : "Create Section"}
            outline={true}
          >
            <IoAddCircleOutline size={20} className="text-yellow-50" />
          </IconBtn>
          {editSectionName && (
            <button
              type="button"
              onClick={cancelEdit}
              className="text-sm text-richblack-300 underline"
            >
              Cancel Edit
            </button>
          )}
        </div>
      </form>
      {/* Agar course me kuch sections add ho chuke hain, to NestedView component render hoga.
          NestedView me sections ka list dikhaya jayega.
          handleChangeEditSectionName function section name edit karne ke liye use hoga. */}
      {course.courseContent.length > 0 && (
        <NestedView handleChangeEditSectionName={handleChangeEditSectionName} />
      )}
      {/* Next Prev Button */}
      <div className="flex justify-end gap-x-3">
        <button
          onClick={goBack}
          className={`flex cursor-pointer items-center gap-x-2 rounded-md bg-richblack-300 py-[8px] px-[20px] font-semibold text-richblack-900`}
        >
          Back
        </button>
        <IconBtn disabled={loading} text="Next" onclick={goToNext}>
          <MdNavigateNext />
        </IconBtn>
      </div>
    </div>
  )
}