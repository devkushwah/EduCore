import { useEffect, useState } from "react"
import { useSelector } from "react-redux"

export default function RequirementsField({
  name,  // name="courseRequirements"
  label,
  register,
  setValue,
  errors,
  getValues,
}) {

  // Agar editCourse true hai, iska matlab hai ki user ek course edit kar raha hai (naya create nahi kar raha).
  // course object course ka pura data store karta hai.
  const { editCourse, course } = useSelector((state) => state.course)
  // Ek single requirement ka input store karne ke liye.
  const [requirement, setRequirement] = useState("")
  // Pura list store karne ke liye jisme multiple requirements hongi.
  const [requirementsList, setRequirementsList] = useState([])

  //  (Course Edit Mode ke liye)
  useEffect(() => {
    // Agar editCourse true hai, toh requirementsList ko course ke instructions (previous requirements) se set karega
    if (editCourse) {
      setRequirementsList(course?.instructions)
    }
    // register(name, { required: true, validate: (value) => value.length > 0 }) → React Hook Form me field register karta hai aur validation apply karta hai.
    register(name, { required: true, validate: (value) => value.length > 0 })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])


  // Jab bhi requirementsList update hoti hai, toh form ki value bhi update ho jaye
  useEffect(() => {
    setValue(name, requirementsList)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [requirementsList])


  const handleAddRequirement = () => {
    // Agar requirement empty nahi hai, toh usko list me add karega.
    if (requirement) {
      // previous requirementlist me naya requirement append hoga
      setRequirementsList([...requirementsList, requirement])
      // Input field ko reset karega
      setRequirement("")
    }
  }


  const handleRemoveRequirement = (index) => {
      // bhai spread operator hai wohi starting se ending tak sab kuch wala khel
    const updatedRequirements = [...requirementsList]
    // splice(index, 1) → Ek element remove karta hai.
    updatedRequirements.splice(index, 1)
    // List update kar deta hai.
    setRequirementsList(updatedRequirements)
  }

  return (
    <div className="flex flex-col space-y-2">
      <label className="text-sm text-richblack-5" htmlFor={name}>
        {label} <sup className="text-pink-200">*</sup>
      </label>
      
      {/* ✅ input field user se requirement ka data lene ke liye hai.
          ✅ onChange={(e) => setRequirement(e.target.value)} → Input ki value update karta hai.
          ✅ "Add" button handleAddRequirement function call karega. */}
      <div className="flex flex-col items-start space-y-2">
        <input
          type="text"
          id={name}
          value={requirement}
          onChange={(e) => setRequirement(e.target.value)}
          className="form-style w-full"
        />
        <button
          type="button"
          onClick={handleAddRequirement}
          className="font-semibold text-yellow-50"
        >
          Add
        </button>
      </div>


      {/* ✅ Agar requirementsList empty nahi hai, toh uski values list me render hogi.
          ✅ map function use karke list show kar raha hai.
          ✅ clear button se requirement remove ho sakti hai. */}
      {requirementsList.length > 0 && (
        <ul className="mt-2 list-inside list-disc">
          {requirementsList.map((requirement, index) => (
            <li key={index} className="flex items-center text-richblack-5">
              <span>{requirement}</span>
              <button
                type="button"
                className="ml-2 text-xs text-pure-greys-300 "
                onClick={() => handleRemoveRequirement(index)}
              >
                clear
              </button>
            </li>
          ))}
        </ul>
      )}

      {/*  name="courseRequirements"  check krlene props ye hai sbse upar check krna*/}
      {errors[name] && (
        <span className="ml-2 text-xs tracking-wide text-pink-200">
          {label} is required
        </span>
      )}
    </div>
  )
}