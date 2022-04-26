import Header from './Header';
import Students from './Students';
import AddStudent from './AddStudent';
import download from 'downloadjs';
import promotionalCertificate from './promotionalCertificate.pdf'
import { useState } from 'react'
import { PDFDocument, StandardFonts } from "pdf-lib";

const App = () => {
  const [showAddStudent, setShowAddStudent] = useState(false);
  const [students, setStudents] = useState([{
    id: 1,
    name: 'Tony Hawk',
    age: 53,
    rank: '15'
  },
  {
    id: 2,
    name: 'Bob Burnquist',
    age: 45,
    rank: '14'
  },
  {
    id: 3,
    name: 'Nyjah Huston',
    age: 27,
    rank: '12'
  }])

  const ranks = ["10th Kyu","9th Kyu","8th Kyu","7th Kyu","6th Kyu","5th Kyu","4th Kyu","3rd Kyu","2nd Kyu",
    "1st Kyu","1st Dan","2nd Dan","3rd Dan","4th Dan","5th Dan","6th Dan","7th Dan","8th Dan","9th Dan","10th Dan"]

  //delete student
  const deleteStudent = (id) => {
    setStudents(students.filter((student) => student.id !== id));
  }

  const addStudent = (student) => {
    const id = Math.floor(Math.random() * 10000) + 1;
    const newStudent = { id, ...student };
    setStudents([...students, newStudent]);
  }

  const toggleShowAdd = () => {setShowAddStudent(!showAddStudent)};

  const createCertificatePDF = async (student) => {

  }

  const generateCertificates = async (students) => {
    let studentPDFs = [];

    for (let student in students){
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

    if (student.age > 10){
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
          <Header onToggle={toggleShowAdd} showAdd={showAddStudent}/>
          {showAddStudent && <AddStudent onToggle={toggleShowAdd} onAdd={addStudent}/>}
          {!showAddStudent && (students.length > 0 ? <Students students={students} ranks={ranks} onGenerate={generateCertificate} onDelete={deleteStudent}/> : 'nothing')}
      </div>
  )
}

export default App;
