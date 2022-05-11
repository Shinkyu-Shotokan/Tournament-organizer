import { useState } from 'react';
import { useNavigate } from 'react-router';
import Header from './Header';

function AddStudent() {
  const host = 'http://localhost:1337';
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [rank, setRank] = useState('0');
  const [age, setAge] = useState(1);
  const navigate = useNavigate();

  const addStudent = async (student) => {
    console.log(JSON.stringify(student));
    await fetch(host + '/applicant', {
      method: 'POST',
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

    addStudent({ firstName, lastName, rank, age });

    navigate('/');
  }

  const cancel = () => {
    navigate('/');
  };

  const buttonData = [{
    title: 'Cancel',
    onClick: cancel
  }];

  return (
    <div>
      <Header title='Add Applicant' buttonData={buttonData} />
      <form className='add-form' onSubmit={onSubmit}>
        <div className='form-control'>
          <label>First Name</label>
          <input type='text' placeholder='First Name' maxLength="30" onChange={(e) => setFirstName(e.target.value)} />
        </div>
        <div className='form-control'>
          <label>Last Name</label>
          <input type='text' placeholder='Last Name' maxLength="30" onChange={(e) => setLastName(e.target.value)} />
        </div>
        <div className='form-control'>
          <label>Age</label>
          <input type='number' min='1' max='100' onChange={(e) => setAge(e.target.value)} />
        </div>
        <div className='form-control'>
          <label>Rank</label>
          <select name="rank" className="form-control" onChange={(e) => setRank(e.target.value)}>
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

export default AddStudent
