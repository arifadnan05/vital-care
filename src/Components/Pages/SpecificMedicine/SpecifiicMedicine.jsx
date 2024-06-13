import useAuth from "../../../Hooks/useAuth"


const SpecifiicMedicine = () => {
    const {medicineCategory} = useAuth()
    console.log(medicineCategory)
    return (
        <div>
            <h1>Hello world</h1>
        </div>
    )
}

export default SpecifiicMedicine
