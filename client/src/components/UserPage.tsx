"use client"
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { deleteFile, downloadFile, getFiles, uploadFile } from '@/service';

const UserPage = () => {
  const [userName, setUserName] = useState<string | null>(null);
  const [files, setFiles] = useState([]);
  const [selectedFile, setSelectedFile] = useState<any>(null);

  const getAllFiles = async () => {
    try {
      const res = await getFiles()
      if (res) {
        setFiles(res)
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getAllFiles()
  }, []);

  useEffect(() => {
    const username = localStorage.getItem('username')
    if (username) {
      setUserName(username)
    }
  }, [])

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
      const res: any = await uploadFile(formData)

      setSelectedFile(null);
      getAllFiles()
      if (res) {
        alert(`your file is uploaded and your accessCode for the file is ${res.accessCode}`)
      }
      // Refresh file list after upload
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  };

  // Function to delete a file
  const handleDelete = async (fileId: any) => {
    try {
      const res:any = await deleteFile(fileId)
      if(res){
        getAllFiles()
        alert(res.data.message)
      }
      
    } catch (error) {
      console.error('Error deleting file:', error);
    }
  };

  // Function to download a file
  const handleDownload = async (file : any) => {
    const code = prompt("Please enter your Access Code")

    if (!code) {
      return
    }
    try {
      const response = await downloadFile(file._id, code)
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', file.filename);
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
            <input type="file" className="border border-gray-300 text-black p-2 rounded-md" onChange={handleFileChange} />
            {
              selectedFile && <span>{selectedFile.name}</span>
            }
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 ml-2 rounded-md" onClick={handleUpload}>Upload</button>
          </div>

          <h2 className="text-xl font-semibold text-gray-700 mb-2 mt-2">Your Files:</h2>
          <ul className="space-y-2">
            {files.map((file: any, index) => (
              <li key={index} className="flex items-center justify-between">
                <span className="text-gray-700">{file?.filename}</span>
                <div>
                  <button className="text-blue-500 hover:text-blue-700 mr-2" onClick={() => handleDownload(file)}>Download</button>
                  <button className="text-red-500 hover:text-red-700" onClick={() => handleDelete(file._id)}>Delete</button>
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
