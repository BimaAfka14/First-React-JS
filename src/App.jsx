import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import Swal from "sweetalert2";
import "./App.css";

function App() {
  const [students, setStudents] = useState([
    { id: 1, nim: "12345", name: "Huskar" },
    { id: 2, nim: "23456", name: "Earthshaker" },
    { id: 3, nim: "34567", name: "Leshrac" },
  ]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [currentStudent, setCurrentStudent] = useState(null);

  const addStudent = (student) => {
    setStudents([...students, student]);
  };

  const updateStudent = (updatedStudent) => {
    setStudents(
      students.map((student) =>
        student.id === updatedStudent.id ? updatedStudent : student
      )
    );
  };

  const openAddModal = () => {
    setShowAddModal(true);
  };

  const openEditModal = (student) => {
    setCurrentStudent(student);
    setShowEditModal(true);
  };

  const closeModal = () => {
    setShowAddModal(false);
    setShowEditModal(false);
  };

  return (
    <div className="bg-gray-100">
      <div className="flex min-h-screen">
        <Sider />
        <Main
          students={students}
          setStudents={setStudents}
          openAddModal={openAddModal}
          openEditModal={openEditModal}
        />
      </div>

      {showAddModal && (
        <AddStudentModal onClose={closeModal} addStudent={addStudent} />
      )}
      {showEditModal && currentStudent && (
        <EditStudentModal
          onClose={closeModal}
          student={currentStudent}
          updateStudent={updateStudent}
        />
      )}
    </div>
  );
}

//1 return, 1 statement

export default App;
// Komponen Sider
function Sider() {
  return (
    <aside className="w-64 bg-indigo-900 text-white">
      <div className="p-4">
        <h1 className="text-2xl text=bold">Admin Panel</h1>
        <nav className="py-2 px-4 mt-4">
          <ul>
            <li className="hover:bg-indigo-700">
              <a href="#">Dashboard</a>
            </li>
            <li className="hover:bg-indigo-700">
              <a href="#">Mahasiswa</a>
            </li>
            <li className="hover:bg-indigo-700">
              <a href="#">Setting</a>
            </li>
          </ul>
        </nav>
      </div>
    </aside>
  );
}

// Komponen Main (Header, Konten, Tabel, Footer)
function Main({ students, setStudents, openAddModal, openEditModal }) {
  return (
    <div className="flex-1 flex flex-col">
      <Header />
      <Content
        students={students}
        setStudents={setStudents}
        openAddModal={openAddModal}
        openEditModal={openEditModal}
      />
      <Footer />
    </div>
  );
}

// Komponen Header
function Header() {
  return (
    <header className="bg-white p-4">
      <div className="flex justify-end">
        <button className="bg-blue-500 text-white px-4 py-2 rounded">
          Logout
        </button>
      </div>
    </header>
  );
}

// Komponen Konten Utama (Tabel Mahasiswa)
function Content({ students, setStudents, openAddModal, openEditModal }) {
  const deleteStudent = (id) => {
    Swal.fire({
      title: "Apakah Anda Yakin?",
      text: "Data Tidak Akan Bisa Dikembalikan",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Hapus",
    }).then((result) => {
      if (result.isConfirmed) {
        setStudents(students.filter((students) => students.id !== id));
        Swal.fire("Terhapus", students, "Berhasil Terhapus");
      }
    });
  };

  return (
    <>
      <div className="flex justify-between mb-1 p-4">
        <h2 className="text-xl font-semibold">List Mahasiswa</h2>
        <button
          id="addDataBtn"
          className="bg-pink-500 text-white px-4 py-2 rounded"
          onClick={openAddModal}
        >
          Tambah
        </button>
      </div>

      <main className="flex-grow bg-blue-50 p-4">
        <div className="bg-white p-6 rounded-lg shadow">
          <Table
            students={students}
            deleteStudent={deleteStudent}
            openEditModal={openEditModal}
          />
        </div>
      </main>
    </>
  );
}

//Komponen Footer
function Footer() {
  return (
    <footer className="bg-indigo-900 text-white p-4 text-center">
      &copy; Admin WDP
    </footer>
  );
}

//Komponen Tabel Mahasiswa
function Table({ students, deleteStudent, openEditModal }) {
  return (
    <table className="min-w-full table-auto">
      <thead>
        <tr className="bg-gray-200">
          <th className="px-2 py-4">No</th>
          <th className="px-2 py-4">NIM</th>
          <th className="px-2 py-4">Nama</th>
          <th className="px-2 py-4">Action</th>
        </tr>
      </thead>
      <tbody>
        {students.map((student, index) => (
          <tr key={student.id}>
            <td className="border px-2 py-4">{index + 1}</td>
            <td className="border px-2 py-4">{student.nim}</td>
            <td className="border px-2 py-4">{student.name}</td>
            <td className="border px-2 py-4">
              <div className="flex space-x-2">
                <button
                  className="edit-btn bg-yellow-500 text-white px-4 py-2 rounded"
                  onClick={() => openEditModal(student)}
                >
                  Edit
                </button>
                <button
                  className="delete-btn bg-yellow-500 text-white px-4 py-2 rounded"
                  onClick={() => deleteStudent(student.id)}
                >
                  Hapus
                </button>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

// Komponen Modal Tambah Mahasiswa
function AddStudentModal({ onClose, addStudent }) {
  const [nim, setNim] = useState("");
  const [name, setName] = useState("");

  const handleSubmit = () => {
    addStudent({ id: Date.now(), nim, name });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-indigo-800 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-lg font-semibold mb-4">Tambah Mahasiswa</h2>
        <input
          type="text"
          placeholder="NIM"
          value={nim}
          onChange={(e) => setNim(e.target.value)}
          className="border p-2 mb-4 w-full"
        />

        <input
          type="text"
          placeholder="Nama"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border p-2 mb-4 w-full"
        />
        <button
          className="bg-green-500 text-white px-4 py-2 rounded mr-2"
          onClick={handleSubmit}
        >
          Tambah
        </button>
        <button
          className="bg-gray-500 text-white px-4 py-2 rounded mr-2"
          onClick={onClose}
        >
          Batal
        </button>
      </div>
    </div>
  );
}

// Komponen Modal Edit Mahasiswa
function EditStudentModal({ onClose, student, updateStudent }) {
  const [nim, setNim] = useState(student.nim);
  const [name, setName] = useState(student.name);

  const handleSubmit = () => {
    updateStudent({ ...student, nim, name });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-indigo-800 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-lg font-semibold mb-4">Edit Mahasiswa</h2>
        <input
          type="text"
          placeholder="NIM"
          value={nim}
          onChange={(e) => setNim(e.target.value)}
          className="border p-2 mb-4 w-full"
        />

        <input
          type="text"
          placeholder="Nama"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border p-2 mb-4 w-full"
        />
        <button
          className="bg-green-500 text-white px-4 py-2 rounded mr-2"
          onClick={handleSubmit}
        >
          Simpan
        </button>
        <button
          className="bg-gray-500 text-white px-4 py-2 rounded mr-2"
          onClick={onClose}
        >
          Batal
        </button>
      </div>
    </div>
  );
}
