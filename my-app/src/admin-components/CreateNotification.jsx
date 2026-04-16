import React, { useState } from 'react';

export default function CreateNotification() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [toStudents, setToStudents] = useState(false);
  const [toTeachers, setToTeachers] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) return alert("Vui lòng nhập đủ thông tin!");
    
    setLoading(true);
    try {
      const response = await fetch('http://localhost:8080/quanly/notifications/admin', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ title, content, toStudents, toTeachers })
      });
      if (response.ok) {
        alert("Gửi thành công!");
        setTitle(''); setContent('');
      }
    } catch (error) {
      alert("Lỗi kết nối!");
    } finally { setLoading(false); }
  };

  return (
    <div className="max-w-2xl mx-auto bg-white p-6 rounded shadow">
      <h2 className="text-xl font-bold mb-4">Tạo thông báo toàn trường</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input 
          className="w-full border p-2 rounded" 
          placeholder="Tiêu đề" 
          value={title} 
          onChange={e => setTitle(e.target.value)} 
        />
        <div className="flex gap-4 text-sm">
          <label><input type="checkbox" checked={toStudents} onChange={e => setToStudents(e.target.checked)} /> Học sinh</label>
          <label><input type="checkbox" checked={toTeachers} onChange={e => setToTeachers(e.target.checked)} /> Giáo viên</label>
        </div>
        <textarea 
          className="w-full border p-2 rounded h-40" 
          placeholder="Nội dung thông báo..." 
          value={content} 
          onChange={e => setContent(e.target.value)}
        />
        <button className="bg-blue-600 text-white px-4 py-2 rounded w-full">Gửi thông báo</button>
      </form>
    </div>
  );
}