import Header from './Header';
import Students from './Students';
import AddStudent from './AddStudent';
import download from 'downloadjs';
import promotionalCertificate from './promotionalCertificate.pdf'
import { useEffect, useState } from 'react'
import { PDFDocument, StandardFonts } from "pdf-lib";

const HomePage = () => {
  const host = 'http://localhost:1337';
  const [showAddStudent, setShowAddStudent] = useState(false);
  const [showEditStudent, setShowEditStudent] = useState(false);
  const [students, setStudents] = useState([]);

  const ranks = ["10th Kyu", "9th Kyu", "8th Kyu", "7th Kyu", "6th Kyu", "5th Kyu", "4th Kyu", "3rd Kyu", "2nd Kyu",
    "1st Kyu", "1st Dan", "2nd Dan", "3rd Dan", "4th Dan", "5th Dan", "6th Dan", "7th Dan", "8th Dan", "9th Dan", "10th Dan"]

  useEffect(() => {
    const getAllStudents = () => {
      console.log('getAllStudents!!!!!!!!!!!!!!!!!!!!');
      fetch(host + '/applicant')
        .then(res => res.json())
        .then(students => {
          setStudents(students.applicants);
          console.log('test');
        });
    }

    getAllStudents();
    return;
  }, [students.length]);

  //delete student
  const deleteStudent = (id) => {
    console.log(id);

    fetch(host + '/applicant/' + id, {
      method: 'DELETE',
    })
      .then(res => {
        if (res.status === 200) setStudents(students.filter((student) => student._id !== id));
      });
  }

  const addStudent = (student) => {
    console.log(JSON.stringify(student));
    fetch(host + '/applicant', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(student),
    })
      .then(res => res.json())
      .then(res => {
        const newStudent = { id: res.id, ...student };
        setStudents([...students, newStudent]);
      })
  }

  const editStudent = (student) => {
    fetch(host + '/applicant/' + student._id, {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(student),
    })
      .then(res => res.json())
      .then(res => {
        setStudents(students);
      })
  }


  const toggleShowAdd = () => { setShowAddStudent(!showAddStudent) };

  const toggleShowEdit = () => { setShowEditStudent(!showEditStudent) };


  const createCertificatePDF = async (student) => {

  }

  const generateCertificates = async (students) => {
    let studentPDFs = [];

    for (let student in students) {
      studentPDFs.push()
    }
  }

  const generateCertificate = async (student) => {
    const existingPdfBytes = await fetch(promotionalCertificate).then(res => res.arrayBuffer());

    const pdfDoc = await PDFDocument.load(existingPdfBytes);
    const helveticaFont = await pdfDoc.embedFont(StandardFonts.Helvetica);

    let text = student.name;
    let textSize = 24;
    let textWidth = helveticaFont.widthOfTextAtSize(text, textSize);

    const pages = pdfDoc.getPages();
    const firstPage = pages[0];

    firstPage.drawText(text, {
      x: firstPage.getWidth() / 2 - textWidth / 2,
      y: 452,
      size: textSize,
      font: helveticaFont
    });

    text = ranks[student.rank];
    textSize = 28;
    textWidth = helveticaFont.widthOfTextAtSize(text, textSize);

    firstPage.drawText(text, {
      x: firstPage.getWidth() / 2 - textWidth / 2,
      y: 372,
      size: textSize,
      font: helveticaFont
    });

    const date = new Date().toLocaleDateString();

    firstPage.drawText(date, {
      x: 180,
      y: 330,
      size: 14,
      font: helveticaFont
    });

    let sensei = "Sue Miller, Sensei";

    if (student.age > 10) {
      sensei = "Nobu Kaji, Sensei";
    }

    firstPage.drawText(sensei, {
      x: 135,
      y: 286,
      size: 14,
      font: helveticaFont
    });

    const pdfBytes = await pdfDoc.save();

    download(pdfBytes, `${student.name}`, "application/pdf");
  }

  return (
    <div className='container'>
      <Header onToggle={toggleShowAdd} showAdd={showAddStudent} />
      {showAddStudent && <AddStudent onToggle={toggleShowAdd} onAdd={addStudent} />}
      {!showAddStudent && (students.length > 0 ? <Students students={students} ranks={ranks} onGenerate={generateCertificate} onDelete={deleteStudent} /> : 'nothing')}
    </div>
  )
}

export default HomePage;
