import Student from "./Student"

const Students = ({ students, onDelete, onGenerate, ranks }) => {

  return (
    <>
      {students.map((student) => (<Student key={student.id} ranks={ranks} student={student} onDelete={onDelete} onGenerate={onGenerate}/>))}
    </>
  )
}

export default Students;
