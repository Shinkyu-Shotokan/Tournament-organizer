import { FaTimes } from 'react-icons/fa';

const Student = ({ student, onDelete, onGenerate, ranks }) => {

  return (
    <div className={`student`}>
      <h3>{student.firstName + ' ' + student.lastName} <FaTimes style={{ color: '#dbd8e3', cursor: 'pointer' }}
        onClick={() => onDelete(student._id)} />
      </h3>
      <div className='header'>
        <div>
          <p>{'Age: ' + student.age}</p>
          <p>{'Rank: ' + ranks[student.rank]}</p>
        </div>
        <div>
          <a href={`/editApplicant/${student._id}`}><button className='btn'>Edit Student</button></a>
          <button className='btn' onClick={() => onGenerate(student)}>Generate Certificate</button>
        </div>
      </div>
    </div >
  )
}

export default Student
