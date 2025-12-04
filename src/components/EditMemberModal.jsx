'use client';
import { useState } from "react";
import styles from "./EditMemberModal.module.css";
import { uploadMemberPhoto } from "@/lib/uploadToSupabase";

export default function EditMemberModal({ member, onClose, onSave, onDelete }) {
  const [form, setForm] = useState({ ...member });
  const [newPhotoFile, setNewPhotoFile] = useState(null);
  const [preview, setPreview] = useState(member.photo);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit() {
    let photoUrl = form.photo;

    if (newPhotoFile) {
      photoUrl = await uploadMemberPhoto(newPhotoFile);
    }

    onSave({
      ...form,
      photo: photoUrl,
    });
  }

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modal}>
        <h2>Edit Member</h2>

        <label>Name</label>
        <input name="name" value={form.name} onChange={handleChange} />

        <label>Age</label>
        <input name="age" value={form.age} onChange={handleChange} />

        <label>Country</label>
        <input name="country" value={form.country} onChange={handleChange} />

        <label>URL</label>
        <input name="url" value={form.url} onChange={handleChange} />

        <label>Role</label>
        <input name="role" value={form.role} onChange={handleChange} />

        <label>Skills</label>
        <textarea name="skills" value={form.skills} onChange={handleChange} />

        <label>Fun Fact</label>
        <textarea name="funFact" value={form.funFact} onChange={handleChange} />

        <label>Current Photo</label>
        <img src={preview} className={styles.photo} />

        <label>Upload New Photo (optional)</label>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => {
            const file = e.target.files[0];
            setNewPhotoFile(file);
            if (file) setPreview(URL.createObjectURL(file));
          }}
        />

        <div className={styles.buttons}>
          <button onClick={handleSubmit}>Save</button>
          <button onClick={onClose}>Cancel</button>
          <button onClick={() => onDelete(form.name)} className={styles.deleteButton}>
            Delete Member
          </button>
        </div>
      </div>
    </div>
  );
}
