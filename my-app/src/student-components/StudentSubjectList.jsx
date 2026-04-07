import { useState, useEffect } from 'react';
import {Link} from "react-router-dom";
import axios from 'axios';

export default function StudentSubjectList() {
    const subject = {
        "Math": "Toán",
        "English": "Tiếng Anh",
        "Physics": "Vật lý",
        "Chemistry": "Hoá học",
        "Literature": "Ngữ văn" 
    }

    const [semester, setSemester] = useState(1);
    const [subjectList, setSubjectList] = useState([]);
    const [err, setErr] = useState("");

    const fetchSubjectList = async() => {
        try{
            const token = localStorage.getItem('token');
            const response = await axios.get(`/quanly/grades/student/subjects?semester=${semester}`, {
                headers: { Authorization: `Bearer ${token}` }
            })
            setSubjectList(response.data.result);
        }catch(error){
            const backendMessage = error.response?.data?.message;
            setErr(backendMessage || "Không thể tải danh sách môn học");
            setTimeout(() => setErr(''), 5000);
        }
    }

    useEffect(()=>{
        fetchSubjectList();
    }, [])
    

    
    

    return (
        <div>
            <select onChange={(e) => setSemester(e.target.value)}>
                <option value="1">Học kì 1</option>
                <option value="2">Học kì 2</option>
            </select>
            
            {err && <div className="text-red-500 bg-red-50 p-2 rounded mb-4">{err}</div>}

            <table className="w-full border-collapse border border-gray-300">
                <thead className="bg-blue-600 text-white">
                    <tr>
                        <th className="border p-2 text-center w-16">Tên môn</th>
                        <th className="border p-2 text-center w-16"></th>
                        
                    </tr>
                </thead>
                <tbody>
                    {subjectList.map(data => (
                        <tr className="hover:bg-gray-50 text-center">
                            <td className="border p-2">{subject[data.subjectName]}</td>
                            <td className="border p-2"> 
                                <Link 
                                    to={`/student/grade/${data.id}/${semester}`} 
                                    className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                                >
                                    Xem điểm
                                </Link>
                            </td>
                        </tr>  
                    ))}
                    
                </tbody>
            </table>
        </div>
    );
}