import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router';
import Header from './Header';

function EditApplicant() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [rank, setRank] = useState('0');
  const [age, setAge] = useState(1);
  const params = useParams();
  const navigate = useNavigate();
  const host = 'http://localhost:1337';

  useEffect(() => {
    const getStudent = (id) => {
      console.log('getStudent!');
      fetch(host + '/applicant/' + id)
        .then(res => res.json())
        .then(student => {
          setFirstName(student.firstName);
          setLastName(student.lastName);
          setRank(student.rank);
          setAge(student.age);
        });
    }

    getStudent(params.id);
    return;
  }, []);

  const editStudent = async (student) => {
    await fetch(host + '/applicant/' + params.id, {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(student),
    })
      .then(res => res.json())
  }

  const onSubmit = (e) => {
    e.preventDefault();

    if (!firstName || !lastName) {
      alert('Please add a first and last name');
      return;
    }

    const newStudent = { firstName, lastName, age, rank };

    editStudent(newStudent);

    navigate('/');
  }

  const cancel = () => {
    navigate('/');
  }

  const buttonData = [{
    title: 'Cancel',
    onClick: cancel
  }]

  return (
    <div>
      <Header title='Edit Applicant' buttonData={buttonData} />
      <form className='add-form' onSubmit={onSubmit}>
        <div className='form-control'>
          <label>First Name</label>
          <input type='text' placeholder='First Name' maxLength="30" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
        </div>
        <div className='form-control'>
          <label>Last Name</label>
          <input type='text' placeholder='Last Name' maxLength="30" value={lastName} onChange={(e) => setLastName(e.target.value)} />
        </div>
        <div className='form-control'>
          <label>Age</label>
          <input type='number' min='1' max='100' value={age} onChange={(e) => setAge(e.target.value)} />
        </div>
        <div className='form-control'>
          <label>Rank</label>
          <select name="rank" className="form-control" value={rank} onChange={(e) => setRank(e.target.value)}>
            <option value="0">10th Kyu</option>
            <option value="1">9th Kyu</option>
            <option value="2">8th Kyu</option>
            <option value="3">7th Kyu</option>
            <option value="4">6th Kyu</option>
            <option value="5">5th Kyu</option>
            <option value="6">4th Kyu</option>
            <option value="7">3rd Kyu</option>
            <option value="8">2nd Kyu</option>
            <option value="9">1st Kyu</option>
            <option value="10">1st Dan</option>
            <option value="11">2nd Dan</option>
            <option value="12">3rd Dan</option>
            <option value="13">4th Dan</option>
            <option value="14">5th Dan</option>
            <option value="15">6th Dan</option>
            <option value="16">7th Dan</option>
            <option value="17">8th Dan</option>
            <option value="18">9th Dan</option>
            <option value="19">10th Dan</option>
          </select>
        </div>
        <input type='submit' value='Save Student' className='btn btn-block' />
      </form>
    </div>
  )
}

export default EditApplicant
