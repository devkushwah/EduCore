// React hook import karte hain component state manage karne ke liye
import { useEffect, useState } from "react"
// React icon component import karte hain
import { MdClose } from "react-icons/md"
import { useSelector } from "react-redux"

// Ek functional component ChipInput define kar rahe hain
export default function ChipInput({
  // Component ko pass hone wale props
  label,
  name,
  placeholder,
  register,
  errors,
  setValue,
  getValues,
}) {
  const { editCourse, course } = useSelector((state) => state.course)

  // Chips array manage karne ke liye state setup kar rahe hain
  const [chips, setChips] = useState([])

  useEffect(() => {
    if (editCourse) {
      // console.log(course)
      setChips(course?.tag)
    }
    register(name, { required: true, validate: (value) => value.length > 0 })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    setValue(name, chips)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chips])

  // Chips add karte waqt user input handle karne ke liye function
  const handleKeyDown = (event) => {
    // Check karte hain agar user "Enter" ya "," press kare
    if (event.key === "Enter" || event.key === ",") {
      // Event ka default behavior prevent karte hain
      event.preventDefault()
      // Input value ko lete hain aur koi bhi leading/trailing spaces remove karte hain
      const chipValue = event.target.value.trim()
      // Check karte hain agar input value exist karti hai aur already chips array me nahi hai
      if (chipValue && !chips.includes(chipValue)) {
        // Chip ko array me add karte hain aur input clear karte hain
        const newChips = [...chips, chipValue]
        setChips(newChips)
        event.target.value = ""
      }
    }
  }

  // Chip delete karne ke liye function
  const handleDeleteChip = (chipIndex) => {
    // Chips array ko filter karte hain taaki chip given index ke saath remove ho jaye
    const newChips = chips.filter((_, index) => index !== chipIndex)
    setChips(newChips)
  }

  // Component render karte hain
  return (
    <div className="flex flex-col space-y-2">
      {/* Input ke liye label render karte hain */}
      <label className="text-sm text-richblack-5" htmlFor={name}>
        {label} <sup className="text-pink-200">*</sup>
      </label>
      {/* Chips aur input render karte hain */}
      <div className="flex w-full flex-wrap gap-y-2">
        {/* Chips array ko map karte hain aur har chip render karte hain */}
        {chips.map((chip, index) => (
          <div
            key={index}
            className="m-1 flex items-center rounded-full bg-yellow-400 px-2 py-1 text-sm text-richblack-5"
          >
            {/* Chip value render karte hain */}
            {chip}
            {/* Button render karte hain chip delete karne ke liye */}
            <button
              type="button"
              className="ml-2 focus:outline-none"
              onClick={() => handleDeleteChip(index)}
            >
              <MdClose className="text-sm" />
            </button>
          </div>
        ))}
        {/* Naye chips add karne ke liye input render karte hain */}
        <input
          id={name}
          name={name}
          type="text"
          placeholder={placeholder}
          onKeyDown={handleKeyDown}
          className="form-style w-full"
        />
      </div>
      {/* Agar input required hai aur nahi bhara gaya toh error message render karte hain */}
      {errors[name] && (
        <span className="ml-2 text-xs tracking-wide text-pink-200">
          {label} is required
        </span>
      )}
    </div>
  )
}
