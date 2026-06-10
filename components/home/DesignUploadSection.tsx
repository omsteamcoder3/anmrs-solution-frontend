'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { 
  Upload, 
  CheckCircle2, 
  X, 
  Send, 
  Info, 
  Layers, 
  User, 
  Building2,
  FileText,
  Image as ImageIcon,
  Trash2,
  Eye,
  Phone
} from 'lucide-react';
import { motion } from 'framer-motion';

interface DesignFile {
  file: File;
  preview: string;
  name: string;
  size: number;
  type: string;
}

interface DesignOrderData {
  quantity: number;
  size: string;
  material: string;
  cardHolderName: string;
  designation: string;
  companyName: string;
  phoneNumber: string;
  specialInstructions: string;
  designFiles: DesignFile[];
}

const DesignUploadSection: React.FC = () => {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [userId, setUserId] = useState<string>('');
  const [userName, setUserName] = useState<string>('');
  const [userEmail, setUserEmail] = useState<string>('');
  const [userPhone, setUserPhone] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [dragActive, setDragActive] = useState<boolean>(false);
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const [fileError, setFileError] = useState<string>('');
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [submitMessage, setSubmitMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  
  const [formData, setFormData] = useState<DesignOrderData>({
    quantity: 1,
    size: 'CR80 (85.6mm × 54mm)',
    material: 'Premium Plastic',
    cardHolderName: '',
    designation: '',
    companyName: '',
    phoneNumber: '',
    specialInstructions: '',
    designFiles: []
  });

  const [customSize, setCustomSize] = useState({ width: 85.6, height: 54 });

  // Check login status on component mount
  useEffect(() => {
    const checkLoginStatus = () => {
      const token = localStorage.getItem('token');
      const currentUserStr = localStorage.getItem('currentUser');
      
      console.log('Checking login status...');
      console.log('Token exists:', !!token);
      console.log('currentUser exists:', !!currentUserStr);
      
      if (token && currentUserStr) {
        try {
          const currentUser = JSON.parse(currentUserStr);
          
          if (currentUser && currentUser._id) {
            setIsLoggedIn(true);
            setUserId(currentUser._id);
            setUserName(currentUser.name || '');
            setUserEmail(currentUser.email || '');
            setUserPhone(currentUser.phone || '');
            
            // Auto-fill phone number if user has it
            if (currentUser.phone) {
              setFormData(prev => ({ ...prev, phoneNumber: currentUser.phone }));
            }
            
            console.log('User logged in with ID:', currentUser._id);
          } else {
            setIsLoggedIn(false);
          }
        } catch (error) {
          console.error('Error parsing currentUser:', error);
          setIsLoggedIn(false);
        }
      } else {
        setIsLoggedIn(false);
      }
    };
    
    checkLoginStatus();
    
    return () => {
      formData.designFiles.forEach(file => {
        if (file.preview) URL.revokeObjectURL(file.preview);
      });
    };
  }, []);

  const validateAndAddFile = (file: File | undefined) => {
    if (!file) return;
    
    if (formData.designFiles.length >= 2) {
      setFileError('Maximum 2 files allowed. Please remove one before uploading another.');
      return;
    }
    
    const allowedExtensions = ['.pdf', '.jpg', '.jpeg', '.png', '.ai', '.cdr'];
    const fileExtension = '.' + file.name.split('.').pop()?.toLowerCase();
    
    if (!allowedExtensions.includes(fileExtension)) {
      setFileError('Invalid format. Please use PDF, JPG, PNG, AI, or CDR.');
      return;
    }
    
    if (file.size > 50 * 1024 * 1024) {
      setFileError('File size exceeds 50MB.');
      return;
    }
    
    let preview = '';
    if (file.type.startsWith('image/')) {
      preview = URL.createObjectURL(file);
    }
    
    setFileError('');
    setFormData(prev => ({
      ...prev,
      designFiles: [...prev.designFiles, {
        file: file,
        preview: preview,
        name: file.name,
        size: file.size,
        type: file.type
      }]
    }));
  };

  const removeFile = (index: number) => {
    const fileToRemove = formData.designFiles[index];
    if (fileToRemove.preview) {
      URL.revokeObjectURL(fileToRemove.preview);
    }
    setFormData(prev => ({
      ...prev,
      designFiles: prev.designFiles.filter((_, i) => i !== index)
    }));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.designFiles.length === 0) {
      setFileError('Please upload at least one design file.');
      return;
    }

    if (!isLoggedIn || !userId) {
      const pendingOrder = {
        ...formData,
        customSize: formData.size === 'Custom' ? customSize : null,
        designFiles: formData.designFiles.map(f => ({
          name: f.name,
          size: f.size,
          type: f.type
        }))
      };
      sessionStorage.setItem('pendingDesignOrder', JSON.stringify(pendingOrder));
      router.push('/signup?redirect=/design-upload&message=Please sign up to submit your order');
      return;
    }
    
    await submitOrder();
  };

  const submitOrder = async () => {
    setIsSubmitting(true);
    setUploadProgress(10);
    setSubmitMessage(null);
    
    const submitData = new FormData();
    
    // Append all files
    formData.designFiles.forEach((designFile, index) => {
      submitData.append(`designFile${index + 1}`, designFile.file);
    });
    
    // Append other data
    submitData.append('quantity', formData.quantity.toString());
    submitData.append('size', formData.size);
    submitData.append('material', formData.material);
    submitData.append('cardHolderName', formData.cardHolderName);
    submitData.append('designation', formData.designation);
    submitData.append('companyName', formData.companyName);
    submitData.append('userPhone', formData.phoneNumber); // Send phone number from form
    submitData.append('specialInstructions', formData.specialInstructions);
    submitData.append('userId', userId);
    submitData.append('userName', userName);
    submitData.append('userEmail', userEmail);
    
    if (formData.size === 'Custom') {
      submitData.append('customWidth', customSize.width.toString());
      submitData.append('customHeight', customSize.height.toString());
    }

    try {
      const interval = setInterval(() => setUploadProgress(p => p < 90 ? p + 10 : p), 300);
      
      const token = localStorage.getItem('token');
      const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/design-orders/submit`;
      
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: { 
          'Authorization': `Bearer ${token}`
        },
        body: submitData
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Server returned ${response.status}`);
      }

      const data = await response.json();
      clearInterval(interval);
      setUploadProgress(100);

      if (data.success) {
        setSubmitMessage({ type: 'success', text: `Order submitted! Order #: ${data.order.orderNumber}` });
        
        formData.designFiles.forEach(file => {
          if (file.preview) URL.revokeObjectURL(file.preview);
        });
        
        sessionStorage.removeItem('pendingDesignOrder');
        
        setTimeout(() => {
          router.push(`/order-confirmation/${data.order.id}`);
        }, 2000);
      } else {
        setSubmitMessage({ type: 'error', text: data.message || 'Submission failed' });
        setIsSubmitting(false);
        setUploadProgress(0);
      }
    } catch (error: any) {
      console.error('Submission error:', error);
      setSubmitMessage({ type: 'error', text: error.message || 'Network error. Please try again.' });
      setIsSubmitting(false);
      setUploadProgress(0);
    }
  };

  return (
    <section
     id="design-upload-section"
    className="min-h-screen bg-[#0a0a0a] text-zinc-100 py-12 sm:py-20 px-3 sm:px-6">
      
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-10 sm:mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-orange-500 font-bold tracking-[0.2em] text-xs sm:text-sm mb-3 sm:mb-4 uppercase"
          >
            Custom Printing Studio
          </motion.h2>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-2xl sm:text-4xl md:text-6xl font-black tracking-tighter mb-4 sm:mb-6 px-2"
          >
            BRING YOUR <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-600">VISION TO LIFE</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-zinc-400 max-w-2xl mx-auto text-base sm:text-lg px-4"
          >
            Upload your artwork (max 2 files) and configure your card specifications
          </motion.p>
          
          {isLoggedIn && (
            <div className="mt-3 sm:mt-4 inline-flex items-center gap-2 bg-green-500/20 text-green-400 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm">
              <CheckCircle2 size={14} className="sm:w-4 sm:h-4" />
              Logged in as {userName || userEmail}
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-12 items-start">
          {/* Left Column */}
          <div className="lg:col-span-4 space-y-6 sm:space-y-8">
            <div className="bg-zinc-900/50 border border-zinc-800 p-4 sm:p-6 rounded-2xl sm:rounded-3xl">
              <h4 className="flex items-center gap-2 font-bold mb-3 sm:mb-4 text-orange-500 uppercase text-[10px] sm:text-xs tracking-widest">
                <Info size={14} className="sm:w-4 sm:h-4" /> Requirements
              </h4>
              <ul className="space-y-3 sm:space-y-4 text-xs sm:text-sm text-zinc-400">
                <li className="flex gap-2 sm:gap-3">
                  <div className="h-4 w-4 sm:h-5 sm:w-5 rounded-full bg-zinc-800 flex items-center justify-center flex-shrink-0 text-[8px] sm:text-[10px] text-white">1</div>
                  <span>High resolution (300 DPI) for best results.</span>
                </li>
                <li className="flex gap-2 sm:gap-3">
                  <div className="h-4 w-4 sm:h-5 sm:w-5 rounded-full bg-zinc-800 flex items-center justify-center flex-shrink-0 text-[8px] sm:text-[10px] text-white">2</div>
                  <span>Keep text within 3mm of the edge (Safety zone).</span>
                </li>
                <li className="flex gap-2 sm:gap-3">
                  <div className="h-4 w-4 sm:h-5 sm:w-5 rounded-full bg-zinc-800 flex items-center justify-center flex-shrink-0 text-[8px] sm:text-[10px] text-white">3</div>
                  <span>Accepted: AI, CDR, PDF, PNG, JPG (Max 2 files).</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Right Column: Main Form */}
          <div className="lg:col-span-8">
            <form onSubmit={handleSubmit} className="bg-zinc-900 border border-zinc-800 rounded-2xl sm:rounded-[2rem] p-4 sm:p-8 md:p-12 shadow-2xl">
              
              {/* File Upload Area */}
              <div className="mb-6 sm:mb-10">
                <label className="block text-xs sm:text-sm font-semibold text-zinc-400 mb-2 sm:mb-3">
                  Upload Design Files <span className="text-orange-500">(Max 2 files)</span>
                </label>
                
                <div
                  onDragOver={(e) => { e.preventDefault(); setDragActive(true); }}
                  onDragLeave={() => setDragActive(false)}
                  onDrop={(e) => { 
                    e.preventDefault(); 
                    setDragActive(false); 
                    if (e.dataTransfer.files) {
                      validateAndAddFile(e.dataTransfer.files[0]);
                    }
                  }}
                  onClick={() => fileInputRef.current?.click()}
                  className={`
                    relative group cursor-pointer overflow-hidden
                    border-2 border-dashed rounded-2xl sm:rounded-3xl p-6 sm:p-10 transition-all duration-300
                    ${dragActive ? 'border-orange-500 bg-orange-500/5' : 'border-zinc-700 hover:border-zinc-500 bg-zinc-950/50'}
                    ${formData.designFiles.length > 0 ? 'border-green-500/50 bg-green-500/5' : ''}
                  `}
                >
                  <input 
                    type="file" 
                    ref={fileInputRef} 
                    className="hidden" 
                    onChange={(e) => validateAndAddFile(e.target.files?.[0])}
                    accept=".pdf,.jpg,.jpeg,.png,.ai,.cdr"
                  />
                  
                  <div className="flex flex-col items-center text-center">
                    <div className={`h-12 w-12 sm:h-16 sm:w-16 rounded-full flex items-center justify-center mb-3 sm:mb-4 transition-transform group-hover:scale-110 ${
                      formData.designFiles.length > 0 ? 'bg-green-500/20 text-green-500' : 'bg-orange-500/10 text-orange-500'
                    }`}>
                      <Upload size={24} className="sm:w-8 sm:h-8" />
                    </div>
                    <h3 className="text-lg sm:text-xl font-bold mb-1 sm:mb-2">
                      {formData.designFiles.length === 0 ? 'Drop your designs here' : `${formData.designFiles.length}/2 files uploaded`}
                    </h3>
                    <p className="text-zinc-500 text-xs sm:text-sm">or click to browse from your device</p>
                    <p className="text-zinc-600 text-[10px] sm:text-xs mt-1 sm:mt-2">PDF, JPG, PNG, AI, CDR up to 50MB each</p>
                  </div>
                </div>
                
                {fileError && (
                  <p className="text-red-400 text-[11px] sm:text-xs mt-2 sm:mt-3 flex items-center gap-1 font-medium">
                    <X size={12} className="sm:w-3.5 sm:h-3.5" /> {fileError}
                  </p>
                )}
              </div>

              {/* Uploaded Files Preview Section */}
              {formData.designFiles.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-6 sm:mb-10"
                >
                  <h3 className="text-xs sm:text-sm font-semibold text-zinc-400 mb-3 sm:mb-4 flex items-center gap-2">
                    <ImageIcon size={14} className="sm:w-4 sm:h-4" /> Uploaded Files ({formData.designFiles.length}/2)
                  </h3>
                  <div className="grid grid-cols-1 gap-3 sm:gap-4">
                    {formData.designFiles.map((file, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="relative group bg-zinc-950 border border-zinc-800 rounded-xl sm:rounded-2xl overflow-hidden"
                      >
                        <div className="relative h-36 sm:h-48 bg-zinc-900">
                          {file.preview ? (
                            <img
                              src={file.preview}
                              alt={`Preview ${index + 1}`}
                              className="w-full h-full object-contain"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center bg-zinc-800/50">
                              <FileText size={36} className="sm:w-12 sm:h-12 text-orange-500" />
                            </div>
                          )}
                          
                          <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 sm:gap-3">
                            {file.preview && (
                              <button
                                type="button"
                                onClick={() => setPreviewImage(file.preview)}
                                className="p-1.5 sm:p-2 bg-white/10 hover:bg-white/20 rounded-full transition-colors"
                              >
                                <Eye size={16} className="sm:w-5 sm:h-5" />
                              </button>
                            )}
                            <button
                              type="button"
                              onClick={() => removeFile(index)}
                              className="p-1.5 sm:p-2 bg-red-500/20 hover:bg-red-500/40 rounded-full transition-colors"
                            >
                              <Trash2 size={16} className="sm:w-5 sm:h-5 text-red-400" />
                            </button>
                          </div>
                        </div>
                        
                        <div className="p-3 sm:p-4">
                          <p className="text-xs sm:text-sm font-medium text-zinc-300 truncate">{file.name}</p>
                          <p className="text-[10px] sm:text-xs text-zinc-500 mt-1">
                            {(file.size / (1024 * 1024)).toFixed(2)} MB
                          </p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Image Preview Modal */}
              {previewImage && (
                <div
                  className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-3 sm:p-4"
                  onClick={() => setPreviewImage(null)}
                >
                  <div className="relative max-w-4xl max-h-[90vh]">
                    <img
                      src={previewImage}
                      alt="Preview"
                      className="w-full h-full object-contain"
                    />
                    <button
                      onClick={() => setPreviewImage(null)}
                      className="absolute top-2 right-2 sm:top-4 sm:right-4 p-1.5 sm:p-2 bg-black/50 rounded-full hover:bg-black/70 transition-colors"
                    >
                      <X size={18} className="sm:w-6 sm:h-6" />
                    </button>
                  </div>
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 mb-6 sm:mb-10">
                {/* Product Settings */}
                <div className="space-y-4 sm:space-y-6">
                  <div className="flex items-center gap-2 text-zinc-500 mb-1 sm:mb-2 uppercase text-[9px] sm:text-[10px] font-black tracking-[0.2em]">
                    <Layers size={12} className="sm:w-3.5 sm:h-3.5" /> Product Specs
                  </div>
                  
                  <div className="space-y-1">
                    <label className="text-[11px] sm:text-xs font-bold text-zinc-400 ml-1">Quantity</label>
                    <input
                      type="number"
                      name="quantity"
                      value={formData.quantity || ""}
                      onChange={(e) =>
                        setFormData((p) => ({
                          ...p,
                          quantity: e.target.value === ""
                            ? 1
                            : parseInt(e.target.value, 10),
                        }))
                      }
                      className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base focus:outline-none focus:border-orange-500 transition-colors"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[11px] sm:text-xs font-bold text-zinc-400 ml-1">Card Size</label>
                    <select
                      name="size"
                      value={formData.size}
                      onChange={handleInputChange}
                      className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base focus:outline-none focus:border-orange-500 transition-colors appearance-none cursor-pointer"
                    >
                      <option value="CR80 (85.6mm × 54mm)">Standard (CR80)</option>
                      <option value="CR79 (86mm × 54mm)">Large (CR79)</option>
                      <option value="Custom">Custom Size</option>
                    </select>
                  </div>

                  {formData.size === 'Custom' && (
                    <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="grid grid-cols-2 gap-3 sm:gap-4 pt-1 sm:pt-2">
                      <div className="space-y-1">
                        <label className="text-[9px] sm:text-[10px] font-bold text-zinc-500 uppercase">Width (mm)</label>
                        <input type="number" step="0.1" value={customSize.width} onChange={(e) => setCustomSize(p => ({ ...p, width: parseFloat(e.target.value) }))} className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3 sm:px-4 py-2 sm:py-2.5 text-xs sm:text-sm focus:border-orange-500 outline-none" />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[9px] sm:text-[10px] font-bold text-zinc-500 uppercase">Height (mm)</label>
                        <input type="number" step="0.1" value={customSize.height} onChange={(e) => setCustomSize(p => ({ ...p, height: parseFloat(e.target.value) }))} className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3 sm:px-4 py-2 sm:py-2.5 text-xs sm:text-sm focus:border-orange-500 outline-none" />
                      </div>
                    </motion.div>
                  )}
                </div>

                {/* Personalization */}
                <div className="space-y-4 sm:space-y-6">
                  <div className="flex items-center gap-2 text-zinc-500 mb-1 sm:mb-2 uppercase text-[9px] sm:text-[10px] font-black tracking-[0.2em]">
                    <User size={12} className="sm:w-3.5 sm:h-3.5" /> Card Details
                  </div>
                  
                  <div className="relative">
                    <User className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 text-zinc-600 w-4 h-4 sm:w-[18px] sm:h-[18px]"/>
                    <input
                      type="text"
                      name="cardHolderName"
                      placeholder="Card Holder Name"
                      value={formData.cardHolderName}
                      onChange={handleInputChange}
                      className="w-full bg-zinc-950 border border-zinc-800 rounded-xl pl-9 sm:pl-12 pr-3 sm:pr-4 py-2.5 sm:py-3 text-sm sm:text-base focus:outline-none focus:border-orange-500 transition-colors"
                    />
                  </div>

                  <div className="relative">
                    <Building2 className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 text-zinc-600 w-4 h-4 sm:w-[18px] sm:h-[18px]"/>
                    <input
                      type="text"
                      name="companyName"
                      placeholder="Company Name"
                      value={formData.companyName}
                      onChange={handleInputChange}
                      className="w-full bg-zinc-950 border border-zinc-800 rounded-xl pl-9 sm:pl-12 pr-3 sm:pr-4 py-2.5 sm:py-3 text-sm sm:text-base focus:outline-none focus:border-orange-500 transition-colors"
                    />
                  </div>

                  {/* Phone Number Field - NEW */}
                  <div className="relative">
<Phone className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 text-zinc-600 w-4 h-4 sm:w-[18px] sm:h-[18px]" />                    <input
                      type="tel"
                      name="phoneNumber"
                      placeholder="Phone Number"
                      value={formData.phoneNumber}
                      onChange={handleInputChange}
                      className="w-full bg-zinc-950 border border-zinc-800 rounded-xl pl-9 sm:pl-12 pr-3 sm:pr-4 py-2.5 sm:py-3 text-sm sm:text-base focus:outline-none focus:border-orange-500 transition-colors"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[11px] sm:text-xs font-bold text-zinc-400 ml-1">Material Selection</label>
                    <select
                      name="material"
                      value={formData.material}
                      onChange={handleInputChange}
                      className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base focus:outline-none focus:border-orange-500 transition-colors appearance-none cursor-pointer"
                    >
                      <option value="Premium Plastic">Premium Plastic</option>
                      <option value="Standard Plastic">Standard Plastic</option>
                      <option value="PVC">PVC - High Durability</option>
                      <option value="Composite">Composite - Eco Friendly</option>
                      <option value="Paper">Paper - Temporary</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Designation Field - Added */}
              <div className="mb-5 sm:mb-6 space-y-2">
                <div className="flex items-center gap-2 text-zinc-500 mb-1 sm:mb-2 uppercase text-[9px] sm:text-[10px] font-black tracking-[0.2em]">
                  <User size={12} className="sm:w-3.5 sm:h-3.5" /> Designation / Role
                </div>
                <input
                  type="text"
                  name="designation"
                  placeholder="Your Designation / Role (e.g., Software Engineer)"
                  value={formData.designation}
                  onChange={handleInputChange}
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl sm:rounded-2xl px-4 sm:px-6 py-3 sm:py-4 text-sm sm:text-base focus:outline-none focus:border-orange-500 transition-colors"
                />
              </div>

              {/* Special Instructions */}
              <div className="mb-6 sm:mb-10 space-y-2">
                <div className="flex items-center gap-2 text-zinc-500 mb-1 sm:mb-2 uppercase text-[9px] sm:text-[10px] font-black tracking-[0.2em]">
                  <FileText size={12} className="sm:w-3.5 sm:h-3.5" /> Special Instructions
                </div>
                <textarea
                  rows={3} // Reduced rows for mobile
                  name="specialInstructions"
                  value={formData.specialInstructions}
                  onChange={handleInputChange}
                  placeholder="Tell us about color profiles, coating preferences, or specific layout instructions..."
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl sm:rounded-2xl px-4 sm:px-6 py-3 sm:py-4 text-sm sm:text-base focus:outline-none focus:border-orange-500 transition-colors resize-none"
                />
              </div>

              {/* Message Display */}
              {submitMessage && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`mb-5 sm:mb-6 p-3 sm:p-4 rounded-xl text-xs sm:text-sm ${
                    submitMessage.type === 'success' 
                      ? 'bg-green-500/20 border border-green-500 text-green-400'
                      : 'bg-red-500/20 border border-red-500 text-red-400'
                  }`}
                >
                  {submitMessage.text}
                </motion.div>
              )}

              {/* Progress Bar */}
              {isSubmitting && (
                <div className="mb-5 sm:mb-6">
                  <div className="flex justify-between text-[10px] sm:text-xs font-bold mb-1 sm:mb-2 uppercase tracking-tighter">
                    <span>Uploading Design Assets</span>
                    <span>{uploadProgress}%</span>
                  </div>
                  <div className="w-full bg-zinc-800 h-1.5 sm:h-2 rounded-full overflow-hidden">
                    <motion.div 
                      className="bg-orange-500 h-full"
                      initial={{ width: 0 }}
                      animate={{ width: `${uploadProgress}%` }}
                    />
                  </div>
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting || formData.designFiles.length === 0}
                className="w-full group relative flex items-center justify-center gap-2 sm:gap-3 bg-orange-600 hover:bg-orange-500 disabled:bg-zinc-800 disabled:text-zinc-600 py-4 sm:py-6 rounded-xl sm:rounded-2xl text-base sm:text-lg font-black uppercase tracking-widest transition-all duration-300"
              >
                {isSubmitting ? (
                  <div className="w-4 h-4 sm:w-5 sm:h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <>
                    Initialize Print Order ({formData.designFiles.length}/2 files)
                    <Send size={16} className="sm:w-5 sm:h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  </>
                )}
              </button>

              {!isLoggedIn && (
                <div className="mt-5 sm:mt-6 p-3 sm:p-4 rounded-xl bg-orange-500/10 border border-orange-500/20 text-center">
                  <p className="text-orange-200 text-[10px] sm:text-xs font-medium">
                    Authentication Required: You'll be prompted to sign in before final submission.
                  </p>
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DesignUploadSection;