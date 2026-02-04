import React, { useState, useEffect } from 'react';
import { FaCamera, FaCheckCircle, FaTimesCircle, FaImage, FaCloudUploadAlt, FaVideo, FaTrash } from 'react-icons/fa';
import { apiClient } from '../../services/api';

export default function PageEditor({ pages, pageSections, sectionIcons, openPage, setOpenPage, activeSectionTab, setActiveSectionTab, preview, setPreview, uploading, setUploading }) {
  const [uploadedFiles, setUploadedFiles] = useState({});
  const [uploadError, setUploadError] = useState({});

  // Load existing uploaded files on mount
  useEffect(() => {
    loadExistingFiles();
  }, []);

  const loadExistingFiles = async () => {
    try {
      // Load files for each page
      for (const page of pages) {
        const response = await apiClient.getPageData(page.key);
        if (response && response.sections) {
          response.sections.forEach(section => {
            if (section.images && section.images.length > 0) {
              section.images.forEach((img, idx) => {
                const key = `${page.key}-${section.sectionKey}-img${idx + 1}`;
                setUploadedFiles(prev => ({ ...prev, [key]: img }));
              });
            }
            if (section.videos && section.videos.length > 0) {
              section.videos.forEach((video, idx) => {
                const key = `${page.key}-${section.sectionKey}-video${idx + 1}`;
                setUploadedFiles(prev => ({ ...prev, [key]: video }));
              });
            }
          });
        }
      }
    } catch (error) {
      console.error('Error loading existing files:', error);
    }
  };

  const handleFileUpload = async (file, pageKey, section, identifier) => {
    const key = `${pageKey}-${section}-${identifier}`;
    
    try {
      setUploading({ ...uploading, [key]: true });
      setUploadError({ ...uploadError, [key]: null });

      // Create preview
      const previewUrl = URL.createObjectURL(file);
      setPreview({ ...preview, [key]: previewUrl });

      // Upload to backend
      const response = await apiClient.uploadFile(file, pageKey, section);
      
      if (response && response.url) {
        // Store the uploaded file URL
        setUploadedFiles(prev => ({ ...prev, [key]: response.url }));
        
        // Update page section with new file
        await apiClient.updatePageSection(pageKey, section, {
          images: [response.url]
        });

        console.log('File uploaded successfully:', response.url);
      } else {
        throw new Error('Upload failed');
      }
    } catch (error) {
      console.error('Upload error:', error);
      setUploadError({ ...uploadError, [key]: 'Upload failed. Please try again.' });
    } finally {
      setUploading({ ...uploading, [key]: false });
    }
  };

  const handleFileDelete = async (pageKey, section, identifier) => {
    const key = `${pageKey}-${section}-${identifier}`;
    
    try {
      const fileUrl = uploadedFiles[key];
      if (fileUrl) {
        // Extract filename from URL
        const filename = fileUrl.split('/').pop();
        await apiClient.deleteFile(filename);
      }

      // Clear from state
      setUploadedFiles(prev => {
        const newFiles = { ...prev };
        delete newFiles[key];
        return newFiles;
      });
      setPreview(prev => {
        const newPrev = { ...prev };
        delete newPrev[key];
        return newPrev;
      });
    } catch (error) {
      console.error('Delete error:', error);
    }
  };

  return (
    <div className="bg-[#18181b] rounded-2xl p-4 md:p-8 shadow text-white">
      <h2 className="text-2xl md:text-3xl font-bold mb-8 flex items-center gap-3"><FaCamera /> Page Editor</h2>
      <div className="overflow-auto scrollbar-thin scrollbar-thumb-[#232326] scrollbar-track-[#18181b]" style={{ maxHeight: 'calc(100vh - 180px)', scrollBehavior: 'smooth' }}>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
          {pages.map((page, idx) => (
            <div key={page.key} className="bg-linear-to-br from-[#232326] to-[#18181b] rounded-2xl shadow-xl border border-[#333] flex flex-col" style={{ maxHeight: '600px', overflow: 'hidden' }}>
              <div className="flex items-center justify-between px-6 py-5 rounded-t-2xl bg-[#232326] border-b border-[#333]">
                <div className="flex items-center gap-3">
                  <FaCamera className="text-2xl text-[#FF0000]" />
                  <span className="font-bold text-xl">{page.name} Page</span>
                </div>
                <button
                  className="text-[#FF0000] text-lg font-bold focus:outline-none"
                  onClick={() => setOpenPage(openPage === idx ? null : idx)}
                  title={openPage === idx ? 'Collapse' : 'Expand'}
                >
                  {openPage === idx ? <FaTimesCircle /> : <FaCheckCircle />}
                </button>
              </div>
              {openPage === idx && (
                <div className="p-0 overflow-auto scrollbar-thin scrollbar-thumb-[#232326] scrollbar-track-[#18181b]" style={{ maxHeight: '520px', scrollBehavior: 'smooth' }}>
                  <div className="flex flex-row border-b border-[#333] bg-[#232326] px-6 sticky top-0 z-10">
                    <div className="w-full flex flex-col">
                      {pageSections[page.key].map((section, sidx) => (
                        <div key={section} className="border-b border-[#333]">
                          <button
                            className={`w-full flex items-center justify-between py-3 px-4 font-semibold text-sm md:text-base gap-2 transition ${activeSectionTab[page.key] === sidx ? 'text-[#FF0000] bg-[#18181b]' : 'text-white hover:text-[#FF0000] hover:bg-[#18181b]/60'}`}
                            onClick={() => setActiveSectionTab({ ...activeSectionTab, [page.key]: sidx })}
                          >
                            <span className="flex items-center">{sectionIcons[section]} {section}</span>
                            <span className="ml-2">{activeSectionTab[page.key] === sidx ? '▲' : '▼'}</span>
                          </button>
                          {activeSectionTab[page.key] === sidx && (
                            <div className="p-4 bg-[#232326] animate-fade-in">
                              <div className="flex items-center gap-3 mb-4">
                                {sectionIcons[section]}
                                <h4 className="font-bold text-lg md:text-xl">{section} Section</h4>
                              </div>
                              {/* Section-wise upload fields for Home and Services page */}
                              {(page.key === 'home' || page.key === 'services') && section === 'Hero' && (
                                <div className="flex flex-col gap-4">
                                  {[1,2,3,4,5].map(idx => (
                                    <div key={idx} className="flex flex-col gap-2">
                                      <label className="font-medium flex items-center"><FaImage className="mr-2 text-[#FF0000]" /> Hero Background Image {idx}</label>
                                      <div className="relative border-2 border-dashed border-[#FF0000] rounded-lg p-4 flex flex-col items-center justify-center bg-[#232326]">
                                        <FaCloudUploadAlt className="text-3xl text-[#FF0000] mb-2" />
                                        <input 
                                          type="file" 
                                          accept="image/*" 
                                          className="absolute inset-0 opacity-0 cursor-pointer" 
                                          onChange={e => {
                                            if (e.target.files && e.target.files[0]) {
                                              handleFileUpload(e.target.files[0], page.key, section, `img${idx}`);
                                            }
                                          }} 
                                        />
                                        {(preview[`${page.key}-${section}-img${idx}`] || uploadedFiles[`${page.key}-${section}-img${idx}`]) && (
                                          <div className="mt-2 relative">
                                            <img 
                                              src={preview[`${page.key}-${section}-img${idx}`] || uploadedFiles[`${page.key}-${section}-img${idx}`]} 
                                              alt="Preview" 
                                              className="rounded shadow max-h-32 object-cover" 
                                            />
                                            <button
                                              onClick={() => handleFileDelete(page.key, section, `img${idx}`)}
                                              className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded-full hover:bg-red-600"
                                              title="Delete"
                                            >
                                              <FaTrash size={12} />
                                            </button>
                                          </div>
                                        )}
                                        {uploading[`${page.key}-${section}-img${idx}`] && (
                                          <span className="text-xs text-[#FF0000] mt-2">Uploading...</span>
                                        )}
                                        {uploadError[`${page.key}-${section}-img${idx}`] && (
                                          <span className="text-xs text-red-400 mt-2">{uploadError[`${page.key}-${section}-img${idx}`]}</span>
                                        )}
                                      </div>
                                    </div>
                                  ))}
                                  {page.key === 'services' && (
                                    <>
                                      <div className="flex flex-col gap-2">
                                        <label className="font-medium flex items-center"><FaImage className="mr-2 text-[#FF0000]" /> Photographer Profile Image 1</label>
                                        <div className="relative border-2 border-dashed border-[#FF0000] rounded-lg p-4 flex flex-col items-center justify-center bg-[#232326]">
                                          <FaCloudUploadAlt className="text-3xl text-[#FF0000] mb-2" />
                                          <input type="file" accept="image/*" className="absolute inset-0 opacity-0 cursor-pointer" onChange={e => {
                                            if (e.target.files && e.target.files[0]) {
                                              const url = URL.createObjectURL(e.target.files[0]);
                                              setPreview({ ...preview, [`${page.key}-${section}-profile1`]: url });
                                              setUploading({ ...uploading, [`${page.key}-${section}-profile1`]: true });
                                              setTimeout(() => setUploading({ ...uploading, [`${page.key}-${section}-profile1`]: false }), 1500);
                                            }
                                          }} />
                                          {preview[`${page.key}-${section}-profile1`] && (
                                            <img src={preview[`${page.key}-${section}-profile1`]} alt="Preview" className="mt-2 rounded shadow max-h-32" />
                                          )}
                                          {uploading[`${page.key}-${section}-profile1`] && (
                                            <span className="text-xs text-[#FF0000] mt-2">Uploading...</span>
                                          )}
                                        </div>
                                      </div>
                                      <div className="flex flex-col gap-2">
                                        <label className="font-medium flex items-center"><FaImage className="mr-2 text-[#FF0000]" /> Photographer Profile Image 2</label>
                                        <div className="relative border-2 border-dashed border-[#FF0000] rounded-lg p-4 flex flex-col items-center justify-center bg-[#232326]">
                                          <FaCloudUploadAlt className="text-3xl text-[#FF0000] mb-2" />
                                          <input type="file" accept="image/*" className="absolute inset-0 opacity-0 cursor-pointer" onChange={e => {
                                            if (e.target.files && e.target.files[0]) {
                                              const url = URL.createObjectURL(e.target.files[0]);
                                              setPreview({ ...preview, [`${page.key}-${section}-profile2`]: url });
                                              setUploading({ ...uploading, [`${page.key}-${section}-profile2`]: true });
                                              setTimeout(() => setUploading({ ...uploading, [`${page.key}-${section}-profile2`]: false }), 1500);
                                            }
                                          }} />
                                          {preview[`${page.key}-${section}-profile2`] && (
                                            <img src={preview[`${page.key}-${section}-profile2`]} alt="Preview" className="mt-2 rounded shadow max-h-32" />
                                          )}
                                          {uploading[`${page.key}-${section}-profile2`] && (
                                            <span className="text-xs text-[#FF0000] mt-2">Uploading...</span>
                                          )}
                                        </div>
                                      </div>
                                      <div className="flex flex-col gap-2">
                                        <label className="font-medium flex items-center"><FaImage className="mr-2 text-[#FF0000]" /> Showcase Image 1</label>
                                        <div className="relative border-2 border-dashed border-[#FF0000] rounded-lg p-4 flex flex-col items-center justify-center bg-[#232326]">
                                          <FaCloudUploadAlt className="text-3xl text-[#FF0000] mb-2" />
                                          <input type="file" accept="image/*" className="absolute inset-0 opacity-0 cursor-pointer" onChange={e => {
                                            if (e.target.files && e.target.files[0]) {
                                              const url = URL.createObjectURL(e.target.files[0]);
                                              setPreview({ ...preview, [`${page.key}-${section}-showcase1`]: url });
                                              setUploading({ ...uploading, [`${page.key}-${section}-showcase1`]: true });
                                              setTimeout(() => setUploading({ ...uploading, [`${page.key}-${section}-showcase1`]: false }), 1500);
                                            }
                                          }} />
                                          {preview[`${page.key}-${section}-showcase1`] && (
                                            <img src={preview[`${page.key}-${section}-showcase1`]} alt="Preview" className="mt-2 rounded shadow max-h-32" />
                                          )}
                                          {uploading[`${page.key}-${section}-showcase1`] && (
                                            <span className="text-xs text-[#FF0000] mt-2">Uploading...</span>
                                          )}
                                        </div>
                                      </div>
                                      <div className="flex flex-col gap-2">
                                        <label className="font-medium flex items-center"><FaImage className="mr-2 text-[#FF0000]" /> Showcase Image 2</label>
                                        <div className="relative border-2 border-dashed border-[#FF0000] rounded-lg p-4 flex flex-col items-center justify-center bg-[#232326]">
                                          <FaCloudUploadAlt className="text-3xl text-[#FF0000] mb-2" />
                                          <input type="file" accept="image/*" className="absolute inset-0 opacity-0 cursor-pointer" onChange={e => {
                                            if (e.target.files && e.target.files[0]) {
                                              const url = URL.createObjectURL(e.target.files[0]);
                                              setPreview({ ...preview, [`${page.key}-${section}-showcase2`]: url });
                                              setUploading({ ...uploading, [`${page.key}-${section}-showcase2`]: true });
                                              setTimeout(() => setUploading({ ...uploading, [`${page.key}-${section}-showcase2`]: false }), 1500);
                                            }
                                          }} />
                                          {preview[`${page.key}-${section}-showcase2`] && (
                                            <img src={preview[`${page.key}-${section}-showcase2`]} alt="Preview" className="mt-2 rounded shadow max-h-32" />
                                          )}
                                          {uploading[`${page.key}-${section}-showcase2`] && (
                                            <span className="text-xs text-[#FF0000] mt-2">Uploading...</span>
                                          )}
                                        </div>
                                      </div>
                                      <div className="flex flex-col gap-2">
                                        <label className="font-medium flex items-center"><FaImage className="mr-2 text-[#FF0000]" /> Showcase Image 3</label>
                                        <div className="relative border-2 border-dashed border-[#FF0000] rounded-lg p-4 flex flex-col items-center justify-center bg-[#232326]">
                                          <FaCloudUploadAlt className="text-3xl text-[#FF0000] mb-2" />
                                          <input type="file" accept="image/*" className="absolute inset-0 opacity-0 cursor-pointer" onChange={e => {
                                            if (e.target.files && e.target.files[0]) {
                                              const url = URL.createObjectURL(e.target.files[0]);
                                              setPreview({ ...preview, [`${page.key}-${section}-showcase3`]: url });
                                              setUploading({ ...uploading, [`${page.key}-${section}-showcase3`]: true });
                                              setTimeout(() => setUploading({ ...uploading, [`${page.key}-${section}-showcase3`]: false }), 1500);
                                            }
                                          }} />
                                          {preview[`${page.key}-${section}-showcase3`] && (
                                            <img src={preview[`${page.key}-${section}-showcase3`]} alt="Preview" className="mt-2 rounded shadow max-h-32" />
                                          )}
                                          {uploading[`${page.key}-${section}-showcase3`] && (
                                            <span className="text-xs text-[#FF0000] mt-2">Uploading...</span>
                                          )}
                                        </div>
                                      </div>
                                    </>
                                  )}
                                </div>
                              )}
                              {page.key === 'home' && section === 'Moodboard' && (
                                <div className="flex flex-col gap-4">
                                  {[...Array(12)].map((_, idx) => (
                                    <div key={idx} className="flex flex-col gap-2">
                                      <label className="font-medium flex items-center"><FaImage className="mr-2 text-[#FF0000]" /> Moodboard Image {idx+1}</label>
                                      <div className="relative border-2 border-dashed border-[#FF0000] rounded-lg p-4 flex flex-col items-center justify-center bg-[#232326]">
                                        <FaCloudUploadAlt className="text-3xl text-[#FF0000] mb-2" />
                                        <input type="file" accept="image/*" className="absolute inset-0 opacity-0 cursor-pointer" onChange={e => {
                                          if (e.target.files && e.target.files[0]) {
                                            const url = URL.createObjectURL(e.target.files[0]);
                                            setPreview({ ...preview, [`${page.key}-${section}-img${idx+1}`]: url });
                                            setUploading({ ...uploading, [`${page.key}-${section}-img${idx+1}`]: true });
                                            setTimeout(() => setUploading({ ...uploading, [`${page.key}-${section}-img${idx+1}`]: false }), 1500);
                                          }
                                        }} />
                                        {preview[`${page.key}-${section}-img${idx+1}`] && (
                                          <img src={preview[`${page.key}-${section}-img${idx+1}`]} alt="Preview" className="mt-2 rounded shadow max-h-32" />
                                        )}
                                        {uploading[`${page.key}-${section}-img${idx+1}`] && (
                                          <span className="text-xs text-[#FF0000] mt-2">Uploading...</span>
                                        )}
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              )}
                              {page.key === 'home' && section === 'Professional' && (
                                <div className="flex flex-col gap-4">
                                  {[1,2,3].map(idx => (
                                    <div key={idx} className="flex flex-col gap-2">
                                      <label className="font-medium flex items-center"><FaImage className="mr-2 text-[#FF0000]" /> Professional Album Image {idx}</label>
                                      <div className="relative border-2 border-dashed border-[#FF0000] rounded-lg p-4 flex flex-col items-center justify-center bg-[#232326]">
                                        <FaCloudUploadAlt className="text-3xl text-[#FF0000] mb-2" />
                                        <input type="file" accept="image/*" className="absolute inset-0 opacity-0 cursor-pointer" onChange={e => {
                                          if (e.target.files && e.target.files[0]) {
                                            const url = URL.createObjectURL(e.target.files[0]);
                                            setPreview({ ...preview, [`${page.key}-${section}-img${idx}`]: url });
                                            setUploading({ ...uploading, [`${page.key}-${section}-img${idx}`]: true });
                                            setTimeout(() => setUploading({ ...uploading, [`${page.key}-${section}-img${idx}`]: false }), 1500);
                                          }
                                        }} />
                                        {preview[`${page.key}-${section}-img${idx}`] && (
                                          <img src={preview[`${page.key}-${section}-img${idx}`]} alt="Preview" className="mt-2 rounded shadow max-h-32" />
                                        )}
                                        {uploading[`${page.key}-${section}-img${idx}`] && (
                                          <span className="text-xs text-[#FF0000] mt-2">Uploading...</span>
                                        )}
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              )}
                              {(page.key === 'home' || page.key === 'services') && section === 'Client Feedback' && (
                                <div className="flex flex-col gap-2">
                                  <label className="font-medium flex items-center"><FaImage className="mr-2 text-[#FF0000]" /> Client Feedback Image</label>
                                  <div className="relative border-2 border-dashed border-[#FF0000] rounded-lg p-4 flex flex-col items-center justify-center bg-[#232326]">
                                    <FaCloudUploadAlt className="text-3xl text-[#FF0000] mb-2" />
                                    <input type="file" accept="image/*" className="absolute inset-0 opacity-0 cursor-pointer" onChange={e => {
                                      if (e.target.files && e.target.files[0]) {
                                        const url = URL.createObjectURL(e.target.files[0]);
                                        setPreview({ ...preview, [`${page.key}-${section}-img`]: url });
                                        setUploading({ ...uploading, [`${page.key}-${section}-img`]: true });
                                        setTimeout(() => setUploading({ ...uploading, [`${page.key}-${section}-img`]: false }), 1500);
                                      }
                                    }} />
                                    {preview[`${page.key}-${section}-img`] && (
                                      <img src={preview[`${page.key}-${section}-img`]} alt="Preview" className="mt-2 rounded shadow max-h-32" />
                                    )}
                                    {uploading[`${page.key}-${section}-img`] && (
                                      <span className="text-xs text-[#FF0000] mt-2">Uploading...</span>
                                    )}
                                  </div>
                                </div>
                              )}
                              {(page.key === 'home' || page.key === 'services') && section === 'Featured Video' && (
                                <div className="flex flex-col gap-2">
                                  <label className="font-medium flex items-center"><FaVideo className="mr-2 text-[#FF0000]" /> Featured Video</label>
                                  <div className="relative border-2 border-dashed border-[#FF0000] rounded-lg p-4 flex flex-col items-center justify-center bg-[#232326]">
                                    <FaCloudUploadAlt className="text-3xl text-[#FF0000] mb-2" />
                                    <input type="file" accept="video/*" className="absolute inset-0 opacity-0 cursor-pointer" onChange={e => {
                                      if (e.target.files && e.target.files[0]) {
                                        const url = URL.createObjectURL(e.target.files[0]);
                                        setPreview({ ...preview, [`${page.key}-${section}-vid`]: url });
                                        setUploading({ ...uploading, [`${page.key}-${section}-vid`]: true });
                                        setTimeout(() => setUploading({ ...uploading, [`${page.key}-${section}-vid`]: false }), 1500);
                                      }
                                    }} />
                                    {preview[`${page.key}-${section}-vid`] && (
                                      <video src={preview[`${page.key}-${section}-vid`]} controls className="mt-2 rounded shadow max-h-32" />
                                    )}
                                    {uploading[`${page.key}-${section}-vid`] && (
                                      <span className="text-xs text-[#FF0000] mt-2">Uploading...</span>
                                    )}
                                  </div>
                                </div>
                              )}
                              {(page.key === 'home' || page.key === 'services') && section === 'About Studio' && (
                                <div className="flex flex-col gap-2">
                                  <label className="font-medium flex items-center"><FaVideo className="mr-2 text-[#FF0000]" /> About Studio Video</label>
                                  <div className="relative border-2 border-dashed border-[#FF0000] rounded-lg p-4 flex flex-col items-center justify-center bg-[#232326]">
                                    <FaCloudUploadAlt className="text-3xl text-[#FF0000] mb-2" />
                                    <input type="file" accept="video/*" className="absolute inset-0 opacity-0 cursor-pointer" onChange={e => {
                                      if (e.target.files && e.target.files[0]) {
                                        const url = URL.createObjectURL(e.target.files[0]);
                                        setPreview({ ...preview, [`${page.key}-${section}-vid`]: url });
                                        setUploading({ ...uploading, [`${page.key}-${section}-vid`]: true });
                                        setTimeout(() => setUploading({ ...uploading, [`${page.key}-${section}-vid`]: false }), 1500);
                                      }
                                    }} />
                                    {preview[`${page.key}-${section}-vid`] && (
                                      <video src={preview[`${page.key}-${section}-vid`]} controls className="mt-2 rounded shadow max-h-32" />
                                    )}
                                    {uploading[`${page.key}-${section}-vid`] && (
                                      <span className="text-xs text-[#FF0000] mt-2">Uploading...</span>
                                    )}
                                  </div>
                                </div>
                              )}
                              {page.key === 'home' && section === 'Event Videos Section' && (
                                <div className="flex flex-col gap-4">
                                  {[1,2,3,4,5].map(idx => (
                                    <div key={idx} className="flex flex-col gap-2">
                                      <label className="font-medium flex items-center"><FaVideo className="mr-2 text-[#FF0000]" /> Event Video {idx}</label>
                                      <div className="relative border-2 border-dashed border-[#FF0000] rounded-lg p-4 flex flex-col items-center justify-center bg-[#232326]">
                                        <FaCloudUploadAlt className="text-3xl text-[#FF0000] mb-2" />
                                        <input type="file" accept="video/*" className="absolute inset-0 opacity-0 cursor-pointer" onChange={e => {
                                          if (e.target.files && e.target.files[0]) {
                                            const url = URL.createObjectURL(e.target.files[0]);
                                            setPreview({ ...preview, [`${page.key}-${section}-vid${idx}`]: url });
                                            setUploading({ ...uploading, [`${page.key}-${section}-vid${idx}`]: true });
                                            setTimeout(() => setUploading({ ...uploading, [`${page.key}-${section}-vid${idx}`]: false }), 1500);
                                          }
                                        }} />
                                        {preview[`${page.key}-${section}-vid${idx}`] && (
                                          <video src={preview[`${page.key}-${section}-vid${idx}`]} controls className="mt-2 rounded shadow max-h-32" />
                                        )}
                                        {uploading[`${page.key}-${section}-vid${idx}`] && (
                                          <span className="text-xs text-[#FF0000] mt-2">Uploading...</span>
                                        )}
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              )}
                              {page.key === 'services' && section === 'Video' && (
                                <div className="flex flex-col gap-4">
                                  <div className="flex flex-col gap-2">
                                    <label className="font-medium flex items-center"><FaVideo className="mr-2 text-[#FF0000]" /> Showcase Video</label>
                                    <div className="relative border-2 border-dashed border-[#FF0000] rounded-lg p-4 flex flex-col items-center justify-center bg-[#232326]">
                                      <FaCloudUploadAlt className="text-3xl text-[#FF0000] mb-2" />
                                      <input type="file" accept="video/*" className="absolute inset-0 opacity-0 cursor-pointer" onChange={e => {
                                        if (e.target.files && e.target.files[0]) {
                                          const url = URL.createObjectURL(e.target.files[0]);
                                          setPreview({ ...preview, [`${page.key}-${section}-video`]: url });
                                          setUploading({ ...uploading, [`${page.key}-${section}-video`]: true });
                                          setTimeout(() => setUploading({ ...uploading, [`${page.key}-${section}-video`]: false }), 1500);
                                        }
                                      }} />
                                      {preview[`${page.key}-${section}-video`] && (
                                        <video src={preview[`${page.key}-${section}-video`]} controls className="mt-2 rounded shadow max-h-32" />
                                      )}
                                      {uploading[`${page.key}-${section}-video`] && (
                                        <span className="text-xs text-[#FF0000] mt-2">Uploading...</span>
                                      )}
                                    </div>
                                  </div>
                                  <div className="flex flex-col gap-2">
                                    <label className="font-medium flex items-center"><FaImage className="mr-2 text-[#FF0000]" /> Background Image</label>
                                    <div className="relative border-2 border-dashed border-[#FF0000] rounded-lg p-4 flex flex-col items-center justify-center bg-[#232326]">
                                      <FaCloudUploadAlt className="text-3xl text-[#FF0000] mb-2" />
                                      <input type="file" accept="image/*" className="absolute inset-0 opacity-0 cursor-pointer" onChange={e => {
                                        if (e.target.files && e.target.files[0]) {
                                          const url = URL.createObjectURL(e.target.files[0]);
                                          setPreview({ ...preview, [`${page.key}-${section}-bg`]: url });
                                          setUploading({ ...uploading, [`${page.key}-${section}-bg`]: true });
                                          setTimeout(() => setUploading({ ...uploading, [`${page.key}-${section}-bg`]: false }), 1500);
                                        }
                                      }} />
                                      {preview[`${page.key}-${section}-bg`] && (
                                        <img src={preview[`${page.key}-${section}-bg`]} alt="Preview" className="mt-2 rounded shadow max-h-32" />
                                      )}
                                      {uploading[`${page.key}-${section}-bg`] && (
                                        <span className="text-xs text-[#FF0000] mt-2">Uploading...</span>
                                      )}
                                    </div>
                                  </div>
                                </div>
                              )}
                              {page.key === 'services' && section === 'Features' && (
                                <div className="flex flex-col gap-4">
                                  <h5 className="font-semibold text-lg">Service Cards (9 total)</h5>
                                  {[1,2,3,4,5,6,7,8,9].map(idx => (
                                    <div key={idx} className="flex flex-col gap-2 p-4 bg-[#18181b] rounded-lg">
                                      <label className="font-medium flex items-center"><FaImage className="mr-2 text-[#FF0000]" /> Service {idx} Background Image</label>
                                      <div className="relative border-2 border-dashed border-[#FF0000] rounded-lg p-4 flex flex-col items-center justify-center bg-[#232326]">
                                        <FaCloudUploadAlt className="text-3xl text-[#FF0000] mb-2" />
                                        <input type="file" accept="image/*" className="absolute inset-0 opacity-0 cursor-pointer" onChange={e => {
                                          if (e.target.files && e.target.files[0]) {
                                            const url = URL.createObjectURL(e.target.files[0]);
                                            setPreview({ ...preview, [`${page.key}-${section}-service${idx}`]: url });
                                            setUploading({ ...uploading, [`${page.key}-${section}-service${idx}`]: true });
                                            setTimeout(() => setUploading({ ...uploading, [`${page.key}-${section}-service${idx}`]: false }), 1500);
                                          }
                                        }} />
                                        {preview[`${page.key}-${section}-service${idx}`] && (
                                          <img src={preview[`${page.key}-${section}-service${idx}`]} alt="Preview" className="mt-2 rounded shadow max-h-32" />
                                        )}
                                        {uploading[`${page.key}-${section}-service${idx}`] && (
                                          <span className="text-xs text-[#FF0000] mt-2">Uploading...</span>
                                        )}
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              )}
                              {page.key === 'services' && section === 'Resources' && (
                                <div className="flex flex-col gap-4">
                                  <h5 className="font-semibold text-lg">Resource Guide Images (3 total)</h5>
                                  {[1,2,3].map(idx => (
                                    <div key={idx} className="flex flex-col gap-2">
                                      <label className="font-medium flex items-center"><FaImage className="mr-2 text-[#FF0000]" /> Resource Guide {idx} Image</label>
                                      <div className="relative border-2 border-dashed border-[#FF0000] rounded-lg p-4 flex flex-col items-center justify-center bg-[#232326]">
                                        <FaCloudUploadAlt className="text-3xl text-[#FF0000] mb-2" />
                                        <input type="file" accept="image/*" className="absolute inset-0 opacity-0 cursor-pointer" onChange={e => {
                                          if (e.target.files && e.target.files[0]) {
                                            const url = URL.createObjectURL(e.target.files[0]);
                                            setPreview({ ...preview, [`${page.key}-${section}-resource${idx}`]: url });
                                            setUploading({ ...uploading, [`${page.key}-${section}-resource${idx}`]: true });
                                            setTimeout(() => setUploading({ ...uploading, [`${page.key}-${section}-resource${idx}`]: false }), 1500);
                                          }
                                        }} />
                                        {preview[`${page.key}-${section}-resource${idx}`] && (
                                          <img src={preview[`${page.key}-${section}-resource${idx}`]} alt="Preview" className="mt-2 rounded shadow max-h-32" />
                                        )}
                                        {uploading[`${page.key}-${section}-resource${idx}`] && (
                                          <span className="text-xs text-[#FF0000] mt-2">Uploading...</span>
                                        )}
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              )}
                              {page.key === 'services' && section === 'Team' && (
                                <div className="flex flex-col gap-4">
                                  <h5 className="font-semibold text-lg">Team Member Images (4 total)</h5>
                                  {[1,2,3,4].map(idx => (
                                    <div key={idx} className="flex flex-col gap-2">
                                      <label className="font-medium flex items-center"><FaImage className="mr-2 text-[#FF0000]" /> Team Member {idx} Image</label>
                                      <div className="relative border-2 border-dashed border-[#FF0000] rounded-lg p-4 flex flex-col items-center justify-center bg-[#232326]">
                                        <FaCloudUploadAlt className="text-3xl text-[#FF0000] mb-2" />
                                        <input type="file" accept="image/*" className="absolute inset-0 opacity-0 cursor-pointer" onChange={e => {
                                          if (e.target.files && e.target.files[0]) {
                                            const url = URL.createObjectURL(e.target.files[0]);
                                            setPreview({ ...preview, [`${page.key}-${section}-team${idx}`]: url });
                                            setUploading({ ...uploading, [`${page.key}-${section}-team${idx}`]: true });
                                            setTimeout(() => setUploading({ ...uploading, [`${page.key}-${section}-team${idx}`]: false }), 1500);
                                          }
                                        }} />
                                        {preview[`${page.key}-${section}-team${idx}`] && (
                                          <img src={preview[`${page.key}-${section}-team${idx}`]} alt="Preview" className="mt-2 rounded shadow max-h-32" />
                                        )}
                                        {uploading[`${page.key}-${section}-team${idx}`] && (
                                          <span className="text-xs text-[#FF0000] mt-2">Uploading...</span>
                                        )}
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              )}
                              {page.key === 'about' && section === 'Team' && (
                                <div className="flex flex-col gap-4">
                                  <h5 className="font-semibold text-lg">Meet the Team Member Images (4 total)</h5>
                                  <p className="text-gray-300 text-sm mb-2">Upload images to: /public/assets/</p>
                                  {[1,2,3,4].map(idx => (
                                    <div key={idx} className="flex flex-col gap-2">
                                      <label className="font-medium flex items-center"><FaImage className="mr-2 text-[#FF0000]" /> Team Member {idx} Image</label>
                                      <div className="relative border-2 border-dashed border-[#FF0000] rounded-lg p-4 flex flex-col items-center justify-center bg-[#232326]">
                                        <FaCloudUploadAlt className="text-3xl text-[#FF0000] mb-2" />
                                        <input type="file" accept="image/*" className="absolute inset-0 opacity-0 cursor-pointer" onChange={e => {
                                          if (e.target.files && e.target.files[0]) {
                                            const url = URL.createObjectURL(e.target.files[0]);
                                            setPreview({ ...preview, [`${page.key}-${section}-team${idx}`]: url });
                                            setUploading({ ...uploading, [`${page.key}-${section}-team${idx}`]: true });
                                            setTimeout(() => setUploading({ ...uploading, [`${page.key}-${section}-team${idx}`]: false }), 1500);
                                          }
                                        }} />
                                        {preview[`${page.key}-${section}-team${idx}`] && (
                                          <img src={preview[`${page.key}-${section}-team${idx}`]} alt="Preview" className="mt-2 rounded shadow max-h-32" />
                                        )}
                                        {uploading[`${page.key}-${section}-team${idx}`] && (
                                          <span className="text-xs text-[#FF0000] mt-2">Uploading...</span>
                                        )}
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              )}
                              {(page.key === 'about' || page.key === 'contact') && section === 'Client Feedback' && (
                                <div className="flex flex-col gap-2">
                                  <label className="font-medium flex items-center"><FaImage className="mr-2 text-[#FF0000]" /> Client Feedback Image</label>
                                  <div className="relative border-2 border-dashed border-[#FF0000] rounded-lg p-4 flex flex-col items-center justify-center bg-[#232326]">
                                    <FaCloudUploadAlt className="text-3xl text-[#FF0000] mb-2" />
                                    <input type="file" accept="image/*" className="absolute inset-0 opacity-0 cursor-pointer" onChange={e => {
                                      if (e.target.files && e.target.files[0]) {
                                        const url = URL.createObjectURL(e.target.files[0]);
                                        setPreview({ ...preview, [`${page.key}-${section}-img`]: url });
                                        setUploading({ ...uploading, [`${page.key}-${section}-img`]: true });
                                        setTimeout(() => setUploading({ ...uploading, [`${page.key}-${section}-img`]: false }), 1500);
                                      }
                                    }} />
                                    {preview[`${page.key}-${section}-img`] && (
                                      <img src={preview[`${page.key}-${section}-img`]} alt="Preview" className="mt-2 rounded shadow max-h-32" />
                                    )}
                                    {uploading[`${page.key}-${section}-img`] && (
                                      <span className="text-xs text-[#FF0000] mt-2">Uploading...</span>
                                    )}
                                  </div>
                                </div>
                              )}
                              {page.key === 'book' && section === 'Gallery' && (
                                <div className="flex flex-col gap-4">
                                  <h5 className="font-semibold text-lg">Gallery Images</h5>
                                  {[1,2,3,4,5,6].map(idx => (
                                    <div key={idx} className="flex flex-col gap-2">
                                      <label className="font-medium flex items-center"><FaImage className="mr-2 text-[#FF0000]" /> Gallery Image {idx}</label>
                                      <div className="relative border-2 border-dashed border-[#FF0000] rounded-lg p-4 flex flex-col items-center justify-center bg-[#232326]">
                                        <FaCloudUploadAlt className="text-3xl text-[#FF0000] mb-2" />
                                        <input type="file" accept="image/*" className="absolute inset-0 opacity-0 cursor-pointer" onChange={e => {
                                          if (e.target.files && e.target.files[0]) {
                                            const url = URL.createObjectURL(e.target.files[0]);
                                            setPreview({ ...preview, [`${page.key}-${section}-gallery${idx}`]: url });
                                            setUploading({ ...uploading, [`${page.key}-${section}-gallery${idx}`]: true });
                                            setTimeout(() => setUploading({ ...uploading, [`${page.key}-${section}-gallery${idx}`]: false }), 1500);
                                          }
                                        }} />
                                        {preview[`${page.key}-${section}-gallery${idx}`] && (
                                          <img src={preview[`${page.key}-${section}-gallery${idx}`]} alt="Preview" className="mt-2 rounded shadow max-h-32" />
                                        )}
                                        {uploading[`${page.key}-${section}-gallery${idx}`] && (
                                          <span className="text-xs text-[#FF0000] mt-2">Uploading...</span>
                                        )}
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              )}
                              {/* Fallback for other sections: single image/video upload */}
                              {!(page.key === 'home' || page.key === 'services') && (
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                  <div className="flex flex-col gap-2">
                                    <label className="font-medium flex items-center"><FaImage className="mr-2 text-[#FF0000]" /> Image</label>
                                    <div className="relative border-2 border-dashed border-[#FF0000] rounded-lg p-4 flex flex-col items-center justify-center bg-[#232326]">
                                      <FaCloudUploadAlt className="text-3xl text-[#FF0000] mb-2" />
                                      <input type="file" accept="image/*" className="absolute inset-0 opacity-0 cursor-pointer" onChange={e => {
                                        if (e.target.files && e.target.files[0]) {
                                          const url = URL.createObjectURL(e.target.files[0]);
                                          setPreview({ ...preview, [`${page.key}-${section}-img`]: url });
                                          setUploading({ ...uploading, [`${page.key}-${section}-img`]: true });
                                          setTimeout(() => setUploading({ ...uploading, [`${page.key}-${section}-img`]: false }), 1500);
                                        }
                                      }} />
                                      {preview[`${page.key}-${section}-img`] && (
                                        <img src={preview[`${page.key}-${section}-img`]} alt="Preview" className="mt-2 rounded shadow max-h-32" />
                                      )}
                                      {uploading[`${page.key}-${section}-img`] && (
                                        <span className="text-xs text-[#FF0000] mt-2">Uploading...</span>
                                      )}
                                    </div>
                                  </div>
                                  <div className="flex flex-col gap-2">
                                    <label className="font-medium flex items-center"><FaVideo className="mr-2 text-[#FF0000]" /> Video</label>
                                    <div className="relative border-2 border-dashed border-[#FF0000] rounded-lg p-4 flex flex-col items-center justify-center bg-[#232326]">
                                      <FaCloudUploadAlt className="text-3xl text-[#FF0000] mb-2" />
                                      <input type="file" accept="video/*" className="absolute inset-0 opacity-0 cursor-pointer" onChange={e => {
                                        if (e.target.files && e.target.files[0]) {
                                          const url = URL.createObjectURL(e.target.files[0]);
                                          setPreview({ ...preview, [`${page.key}-${section}-vid`]: url });
                                          setUploading({ ...uploading, [`${page.key}-${section}-vid`]: true });
                                          setTimeout(() => setUploading({ ...uploading, [`${page.key}-${section}-vid`]: false }), 1500);
                                        }
                                      }} />
                                      {preview[`${page.key}-${section}-vid`] && (
                                        <video src={preview[`${page.key}-${section}-vid`]} controls className="mt-2 rounded shadow max-h-32" />
                                      )}
                                      {uploading[`${page.key}-${section}-vid`] && (
                                        <span className="text-xs text-[#FF0000] mt-2">Uploading...</span>
                                      )}
                                    </div>
                                  </div>
                                </div>
                              )}
                              <div className="flex justify-end mt-6">
                                <button className="px-6 py-2 bg-linear-to-r from-[#FF0000] to-[#d10000] text-white font-bold rounded-lg shadow hover:scale-105 transition">Save Changes</button>
                              </div>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="p-6">
                    {/* Section content is now rendered inside the dropdown above */}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
