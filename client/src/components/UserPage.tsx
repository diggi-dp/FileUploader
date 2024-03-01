"use client"
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UserPage = () => {
  const [userName, setUserName] = useState<string | null>(null);
  const [files, setFiles] = useState([]);
  const [selectedFile, setSelectedFile] = useState<any>(null);

  // Fetch user information and list of files
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get('/api/user');
        // setUser(response.data.user);
        setFiles(response.data.files);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };
    // fetchUserData();
  }, []);

  useEffect(()=>{
    const username = localStorage.getItem('username')
    if(username){
      setUserName(username)
    }
  },[])

  // Function to handle file selection for upload
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      setSelectedFile(selectedFile);
    }
  };

  // Function to upload a file
  const handleUpload = async () => {
    if (!selectedFile) return;
    const formData = new FormData();
    formData.append('file', selectedFile);
    try {
      await axios.post('/api/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      // Refresh file list after upload
      const response = await axios.get('/api/files');
      setFiles(response.data.files);
      setSelectedFile(null);
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  };

  // Function to delete a file
  const handleDelete = async (fileId: any) => {
    try {
      await axios.delete(`/api/files/${fileId}`);
      // Refresh file list after deletion
      const response = await axios.get('/api/files');
      setFiles(response.data.files);
    } catch (error) {
      console.error('Error deleting file:', error);
    }
  };

  // Function to download a file
  const handleDownload = async (filename: string) => {
    try {
      const response = await axios.get(`/api/download/${filename}`, {
        responseType: 'blob' // Ensure response is treated as binary data
      });
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', filename);
      document.body.appendChild(link);
      link.click();
    } catch (error) {
      console.error('Error downloading file:', error);
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-8 p-4">
      {userName && (
        <div className="bg-white shadow-md rounded p-4">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Welcome, {userName}</h1>

          <div className="mt-4">
            <input type="file" className="border border-gray-300 p-2 rounded-md" onChange={handleFileChange} />
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 ml-2 rounded-md" onClick={handleUpload}>Upload</button>
          </div>

          <h2 className="text-xl font-semibold text-gray-700 mb-2 mt-2">Your Files:</h2>
          <ul className="space-y-2">
            {files.map((file, index) => (
              <li key={index} className="flex items-center justify-between">
                <span className="text-gray-700">{'iunoiii'}</span>
                <div>
                  <button className="text-blue-500 hover:text-blue-700 mr-2" onClick={() => handleDownload('jhhj')}>Download</button>
                  <button className="text-red-500 hover:text-red-700" onClick={() => handleDelete('jkbj')}>Delete</button>
                </div>
              </li>
            ))}
          </ul>
        
        </div>
      )}
    </div>
  );
};

export default UserPage;
