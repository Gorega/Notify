import {firebaseApp} from "./InitiFirebase";
import { getStorage, ref, uploadBytesResumable, getDownloadURL,deleteObject } from "firebase/storage";
import {useState} from "react";

export function useUpload(){

    const [fileName,setFileName] = useState(null);
    const [loading,setLoading] = useState(false);
    const [uploadedFile,setUploadedFile] = useState(null);
    const [doneUploading,setDoneUploading] = useState(false);

    // const upload image profile
    const upload = (e,dirPath)=>{
        const storage = getStorage();
        const file = e.target.files[0];
        // Upload file and metadata to the object
        const storageRef = ref(storage, dirPath + file.name);
        const uploadTask = uploadBytesResumable(storageRef, file);
        setFileName(file.name)
        // Listen for state changes, errors, and completion of the upload.
        uploadTask.on('state_changed',
        (snapshot) => {
        setLoading(true)
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            //
        switch (snapshot.state) {
        case 'paused':
            //
            break;
        case 'running':
            //
            break;
        }
        }, 
        (error) => {
        switch (error.code) {
        case 'storage/unauthorized':
            // User doesn't have permission to access the object
            break;
        case 'storage/canceled':
            // User canceled the upload
            break;

        case 'storage/unknown':
            // Unknown error occurred, inspect error.serverResponse
            break;
        }
        }, 
        () => {
            // Upload completed successfully, now we can get the download URL
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setLoading(false)
            setDoneUploading(true)
            setUploadedFile(downloadURL);
            });
        }
        );
    }

      const deleteUplaodedFile =(dirPath)=>{
        setUploadedFile(null)
        setDoneUploading(false)
        // delete uploaded image
        const storage = getStorage();
        const desertRef = ref(storage, dirPath + fileName);
        deleteObject(desertRef).then(() => {
        });
    }

    return {upload,loading,uploadedFile,doneUploading,setDoneUploading,deleteUplaodedFile}

}