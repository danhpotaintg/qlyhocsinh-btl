import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function TeacherNotifications() {
    const [students, setStudents] = useState([]);
    const [selectedStudentIds, setSelectedStudentIds] = useState([]);
    const [subject, setSubject] = useState('');
    const [content, setContent] = useState('');
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    // Dùng đường dẫn tương đối giống như '/quanly/schedules/teacher' của bạn
    const BASE_URL = '/quanly/notifications';

    useEffect(() => {
        fetchStudents();
    }, []);

    const fetchStudents = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get(`${BASE_URL}/my-class-students`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            
            // Nếu API trả về 200 OK (Thành công)
            if (response.data.code === 1000) {
                setStudents(response.data.result || []);
                setError('');
            }
        } catch (error) {
            // ĐÂY LÀ CHỖ BẮT LỖI TỪ BACKEND
            console.error("Lỗi tải danh sách học sinh:", error);
            if (error.response && error.response.data && error.response.data.message) {
                // Lấy đúng câu "Giáo viên không chủ nhiệm lớp nào" từ backend
                setError(error.response.data.message);
            } else {
                setError('Không thể kết nối đến server');
            }
            setStudents([]);
        }
    };

    const handleSelectAll = (e) => {
        setSelectedStudentIds(e.target.checked ? students.map(s => s.id) : []);
    };

    const handleSelectStudent = (id) => {
        setSelectedStudentIds(prev => prev.includes(id) ? prev.filter(sId => sId !== id) : [...prev, id]);
    };

    const handleSendNotification = async (e) => {
        e.preventDefault();
        
        if (selectedStudentIds.length === 0) {
            setError('Vui lòng chọn ít nhất một học sinh để gửi thông báo');
            setTimeout(() => setError(''), 3000);
            return;
        }

        setLoading(true);
        setError('');
        setMessage('');

        try {
            const token = localStorage.getItem('token');
            const payload = { studentIds: selectedStudentIds, subject, content };
            
            const response = await axios.post(`${BASE_URL}/send`, payload, {
                headers: { Authorization: `Bearer ${token}` }
            });

            if (response.data.code === 1000) {
                setMessage('Gửi thông báo thành công!');
                setSubject('');
                setContent('');
                setSelectedStudentIds([]);
            }
        } catch (error) {
            console.error("Lỗi gửi thông báo:", error);
            if (error.response && error.response.data && error.response.data.message) {
                setError(error.response.data.message); // Bắt lỗi "Vui lòng chọn ít nhất một học sinh..." từ BE
            } else {
                setError('Lỗi kết nối server');
            }
        } finally {
            setLoading(false);
            setTimeout(() => { setMessage(''); setError(''); }, 5000);
        }
    };

    return (
        <div className="p-4">
            <h2 className="text-2xl font-bold mb-4 text-blue-800 text-center">GỬI THÔNG BÁO CHO PHỤ HUYNH</h2>
            
            {message && <div className="text-green-600 bg-green-100 p-2 mb-4 border border-green-300 font-medium">{message}</div>}
            {error && <div className="text-red-600 bg-red-100 p-2 mb-4 border border-red-300 font-medium">{error}</div>}

            <div className="flex flex-col md:flex-row gap-6">

                {/* Cột trái: Form nhập liệu (Chiếm 1/3) */}
                <div className="md:w-1/3 border p-4 bg-gray-50 h-fit shadow-sm">
                    <h3 className="font-bold mb-2">Nội dung thư:</h3>
                    <form onSubmit={handleSendNotification}>
                        <input 
                            required type="text" value={subject} onChange={e => setSubject(e.target.value)}
                            className="w-full border p-2 mb-3 outline-none focus:ring-2 focus:ring-blue-400" 
                            placeholder="Tiêu đề thông báo..." 
                        />
                        <textarea 
                            required rows="8" value={content} onChange={e => setContent(e.target.value)}
                            className="w-full border p-2 mb-3 outline-none focus:ring-2 focus:ring-blue-400" 
                            placeholder="Nhập nội dung thông báo..." 
                        />
                        <button 
                            type="submit" disabled={loading}
                            className="bg-blue-600 text-white px-4 py-2 w-full font-bold disabled:bg-gray-400 hover:bg-blue-700 transition-colors"
                        >
                            {loading ? 'Đang gửi...' : `Gửi thông báo`}
                        </button>
                    </form>
                </div>
                
                {/* Cột phải: Danh sách học sinh (Chiếm 2/3) */}
                <div className="md:w-2/3 border p-4 bg-white shadow-sm">
                    <div className="flex justify-between items-center mb-2">
                        <h3 className="font-bold">Danh sách lớp chủ nhiệm:</h3>
                        <span className="text-sm font-semibold text-blue-600">Đã chọn: {selectedStudentIds.length}</span>
                    </div>
                    
                    <table className="w-full border-collapse border bg-white">
                        <thead className="bg-blue-600 text-white">
                            <tr>
                                <th className="border p-2 w-12">
                                    <input 
                                        type="checkbox" onChange={handleSelectAll}
                                        checked={students.length > 0 && selectedStudentIds.length === students.length}
                                        className="cursor-pointer w-4 h-4"
                                    />
                                </th>
                                <th className="border p-2">Mã HS</th>
                                <th className="border p-2">Họ và Tên</th>
                                <th className="border p-2">Email Phụ Huynh</th>
                            </tr>
                        </thead>
                        <tbody>
                            {students.length === 0 ? (
                                <tr>
                                    <td colSpan="4" className="p-8 text-center text-red-500 font-semibold bg-gray-50">
                                        {/* Hiển thị lỗi nếu có, không thì báo trống */}
                                        {error ? error : "Chưa có dữ liệu học sinh"}
                                    </td>
                                </tr>
                            ) : (
                                students.map(s => (
                                    <tr key={s.id} className="text-center hover:bg-blue-50 transition-colors">
                                        <td className="border p-2">
                                            <input 
                                                type="checkbox" 
                                                checked={selectedStudentIds.includes(s.id)}
                                                onChange={() => handleSelectStudent(s.id)}
                                                className="cursor-pointer w-4 h-4"
                                            />
                                        </td>
                                        <td className="border p-2">{s.id}</td>
                                        <td className="border p-2 text-left font-medium">{s.fullName}</td>
                                        <td className="border p-2 text-gray-600">{s.parentGmail || <span className="italic text-gray-400">Trống</span>}</td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>

            </div>
        </div>
    );
}