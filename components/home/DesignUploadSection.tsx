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
  Phone,
  Truck,
  Home,
  CreditCard,
  Wallet,
  MapPin,
  Briefcase,
  AlertCircle
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

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
  deliveryMethod: 'pickup' | 'door_delivery';
  paymentMethod: 'cod' | 'razorpay';
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
    designFiles: [],
    deliveryMethod: 'pickup',
    paymentMethod: 'cod'
  });

  const [deliveryAddress, setDeliveryAddress] = useState({
    street: '',
    city: '',
    state: '',
    pincode: ''
  });
  
  const [customSize, setCustomSize] = useState({ width: 85.6, height: 54 });

  useEffect(() => {
    const checkLoginStatus = () => {
      const token = localStorage.getItem('token');
      const currentUserStr = localStorage.getItem('currentUser');
      
      if (token && currentUserStr) {
        try {
          const currentUser = JSON.parse(currentUserStr);
          if (currentUser && currentUser._id) {
            setIsLoggedIn(true);
            setUserId(currentUser._id);
            setUserName(currentUser.name || '');
            setUserEmail(currentUser.email || '');
            setUserPhone(currentUser.phone || '');
            if (currentUser.phone) {
              setFormData(prev => ({ ...prev, phoneNumber: currentUser.phone }));
            }
          }
        } catch (error) {
          console.error('Error parsing currentUser:', error);
        }
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
      designFiles: [...prev.designFiles, { file, preview, name: file.name, size: file.size, type: file.type }]
    }));
  };

  const removeFile = (index: number) => {
    const fileToRemove = formData.designFiles[index];
    if (fileToRemove.preview) URL.revokeObjectURL(fileToRemove.preview);
    setFormData(prev => ({ ...prev, designFiles: prev.designFiles.filter((_, i) => i !== index) }));
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
        designFiles: formData.designFiles.map(f => ({ name: f.name, size: f.size, type: f.type }))
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
    
    formData.designFiles.forEach((designFile, index) => {
      submitData.append(`designFile${index + 1}`, designFile.file);
    });
    
    submitData.append('quantity', formData.quantity.toString());
    submitData.append('size', formData.size);
    submitData.append('material', formData.material);
    submitData.append('cardHolderName', formData.cardHolderName);
    submitData.append('designation', formData.designation);
    submitData.append('companyName', formData.companyName);
    submitData.append('userPhone', formData.phoneNumber);
    submitData.append('specialInstructions', formData.specialInstructions);
    submitData.append('userId', userId);
    submitData.append('userName', userName);
    submitData.append('userEmail', userEmail);
    submitData.append('deliveryMethod', formData.deliveryMethod);
    submitData.append('paymentMethod', formData.paymentMethod);
    
    if (formData.deliveryMethod === 'door_delivery') {
      submitData.append('deliveryAddress', JSON.stringify(deliveryAddress));
    }
    
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
        headers: { 'Authorization': `Bearer ${token}` },
        body: submitData
      });

      if (!response.ok) throw new Error(`Server returned ${response.status}`);
      const data = await response.json();
      
      clearInterval(interval);
      setUploadProgress(100);

      if (data.success) {
        setSubmitMessage({ type: 'success', text: `Order submitted! Order #: ${data.order.orderNumber}` });
        formData.designFiles.forEach(file => { if (file.preview) URL.revokeObjectURL(file.preview); });
        sessionStorage.removeItem('pendingDesignOrder');
        setTimeout(() => router.push(`/order-confirmation/${data.order.id}`), 2000);
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
    <section id="design-upload-section" className="min-h-screen bg-gradient-to-b from-[#0a0a0a] to-[#0f0f0f] text-zinc-100 py-16 sm:py-24 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 sm:mb-16"
        >
          <div className="inline-flex items-center gap-2 bg-orange-500/10 border border-orange-500/30 rounded-full px-4 py-1.5 mb-6">
            <span className="text-orange-400 text-xs font-semibold tracking-wider">CUSTOM PRINTING STUDIO</span>
          </div>
          <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tighter mb-6">
            BRING YOUR{' '}
            <span className="bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent">
              VISION TO LIFE
            </span>
          </h1>
          <p className="text-zinc-400 max-w-2xl mx-auto text-base sm:text-lg">
            Upload your artwork and configure your card specifications. Our expert team will ensure perfect printing quality.
          </p>
          {isLoggedIn && (
            <div className="mt-4 inline-flex items-center gap-2 bg-green-500/20 text-green-400 px-4 py-2 rounded-full text-sm">
              <CheckCircle2 size={14} />
              Logged in as {userName || userEmail}
            </div>
          )}
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          {/* Left Column - Guidelines */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="lg:col-span-4 space-y-6"
          >
            <div className="bg-zinc-900/40 backdrop-blur-sm border border-zinc-800 rounded-2xl p-6 sticky top-24">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-orange-500/20 rounded-xl">
                  <Info size={20} className="text-orange-500" />
                </div>
                <h3 className="font-bold text-orange-400 uppercase text-sm tracking-wider">Design Guidelines</h3>
              </div>
              <ul className="space-y-4">
                {[
                  'High resolution (300 DPI) for best print quality',
                  'Keep text within 3mm of the edge (Safety zone)',
                  'Use CMYK color mode for accurate colors',
                  'Supported formats: AI, CDR, PDF, PNG, JPG (Max 2 files)',
                  'Maximum file size: 50MB per file'
                ].map((item, idx) => (
                  <li key={idx} className="flex gap-3 text-sm text-zinc-400">
                    <div className="h-5 w-5 rounded-full bg-zinc-800 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-[10px] text-white font-bold">{idx + 1}</span>
                    </div>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>

          {/* Right Column - Main Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="lg:col-span-8"
          >
            <form onSubmit={handleSubmit} className="bg-zinc-900/40 backdrop-blur-sm border border-zinc-800 rounded-2xl p-6 sm:p-8">
              {/* File Upload Section */}
              <div className="mb-8">
                <label className="block text-sm font-semibold text-zinc-300 mb-3">
                  Upload Design Files <span className="text-orange-500">(Max 2 files)</span>
                </label>
                <div
                  onDragOver={(e) => { e.preventDefault(); setDragActive(true); }}
                  onDragLeave={() => setDragActive(false)}
                  onDrop={(e) => { e.preventDefault(); setDragActive(false); validateAndAddFile(e.dataTransfer.files?.[0]); }}
                  onClick={() => fileInputRef.current?.click()}
                  className={`relative cursor-pointer border-2 border-dashed rounded-xl p-8 transition-all duration-300
                    ${dragActive ? 'border-orange-500 bg-orange-500/5' : 'border-zinc-700 hover:border-zinc-500 bg-zinc-800/30'}
                    ${formData.designFiles.length > 0 ? 'border-green-500/50 bg-green-500/5' : ''}`}
                >
                  <input type="file" ref={fileInputRef} className="hidden" onChange={(e) => validateAndAddFile(e.target.files?.[0])} accept=".pdf,.jpg,.jpeg,.png,.ai,.cdr" />
                  <div className="flex flex-col items-center text-center">
                    <div className={`p-4 rounded-full mb-4 transition-transform group-hover:scale-110 ${
                      formData.designFiles.length > 0 ? 'bg-green-500/20' : 'bg-orange-500/20'
                    }`}>
                      <Upload size={32} className={formData.designFiles.length > 0 ? 'text-green-500' : 'text-orange-500'} />
                    </div>
                    <h3 className="text-lg font-semibold mb-1">
                      {formData.designFiles.length === 0 ? 'Drop your designs here' : `${formData.designFiles.length}/2 files uploaded`}
                    </h3>
                    <p className="text-zinc-500 text-sm">or click to browse</p>
                    <p className="text-zinc-600 text-xs mt-2">PDF, JPG, PNG, AI, CDR up to 50MB each</p>
                  </div>
                </div>
                {fileError && <p className="text-red-400 text-xs mt-3 flex items-center gap-1"><AlertCircle size={12} /> {fileError}</p>}
              </div>

              {/* Uploaded Files Preview */}
              <AnimatePresence>
                {formData.designFiles.length > 0 && (
                  <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="mb-8">
                    <h3 className="text-sm font-semibold text-zinc-300 mb-3 flex items-center gap-2">
                      <ImageIcon size={16} /> Uploaded Files ({formData.designFiles.length}/2)
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {formData.designFiles.map((file, index) => (
                        <div key={index} className="bg-zinc-800/50 rounded-xl border border-zinc-700 overflow-hidden group">
                          <div className="relative h-40 bg-zinc-900">
                            {file.preview ? (
                              <img src={file.preview} alt={`Preview ${index + 1}`} className="w-full h-full object-contain" />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center"><FileText size={40} className="text-orange-500" /></div>
                            )}
                            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                              {file.preview && (
                                <button type="button" onClick={() => setPreviewImage(file.preview)} className="p-2 bg-white/10 hover:bg-white/20 rounded-full transition">
                                  <Eye size={18} />
                                </button>
                              )}
                              <button type="button" onClick={() => removeFile(index)} className="p-2 bg-red-500/20 hover:bg-red-500/40 rounded-full transition">
                                <Trash2 size={18} className="text-red-400" />
                              </button>
                            </div>
                          </div>
                          <div className="p-3">
                            <p className="text-sm font-medium text-zinc-300 truncate">{file.name}</p>
                            <p className="text-xs text-zinc-500">{(file.size / (1024 * 1024)).toFixed(2)} MB</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Two Column Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                {/* Left Column - Product Specs */}
                <div className="space-y-5">
                  <div className="flex items-center gap-2 pb-2 border-b border-zinc-800">
                    <Layers size={16} className="text-orange-500" />
                    <span className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">Product Specifications</span>
                  </div>
                  
                  <div>
                    <label className="block text-xs font-medium text-zinc-400 mb-1">Quantity</label>
                    <input type="number" name="quantity" value={formData.quantity} onChange={(e) => setFormData(p => ({ ...p, quantity: parseInt(e.target.value) || 1 }))}
                      className="w-full bg-zinc-800/50 border border-zinc-700 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-orange-500 transition" />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-zinc-400 mb-1">Card Size</label>
                    <select name="size" value={formData.size} onChange={handleInputChange}
                      className="w-full bg-zinc-800/50 border border-zinc-700 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-orange-500 transition">
                      <option value="CR80 (85.6mm × 54mm)">Standard CR80 (85.6 × 54mm)</option>
                      <option value="CR79 (86mm × 54mm)">Large CR79 (86 × 54mm)</option>
                      <option value="Custom">Custom Size</option>
                    </select>
                  </div>

                  {formData.size === 'Custom' && (
                    <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="grid grid-cols-2 gap-3">
                      <div><label className="block text-xs text-zinc-400 mb-1">Width (mm)</label><input type="number" step="0.1" value={customSize.width} onChange={(e) => setCustomSize(p => ({ ...p, width: parseFloat(e.target.value) }))} className="w-full bg-zinc-800/50 border border-zinc-700 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-orange-500" /></div>
                      <div><label className="block text-xs text-zinc-400 mb-1">Height (mm)</label><input type="number" step="0.1" value={customSize.height} onChange={(e) => setCustomSize(p => ({ ...p, height: parseFloat(e.target.value) }))} className="w-full bg-zinc-800/50 border border-zinc-700 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-orange-500" /></div>
                    </motion.div>
                  )}

                  <div>
                    <label className="block text-xs font-medium text-zinc-400 mb-1">Material</label>
                    <select name="material" value={formData.material} onChange={handleInputChange}
                      className="w-full bg-zinc-800/50 border border-zinc-700 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-orange-500 transition">
                      <option value="Premium Plastic">Premium Plastic</option>
                      <option value="Standard Plastic">Standard Plastic</option>
                      <option value="PVC">PVC - High Durability</option>
                      <option value="Composite">Composite - Eco Friendly</option>
                      <option value="Paper">Paper - Temporary</option>
                    </select>
                  </div>
                </div>

                {/* Right Column - Card Details */}
                <div className="space-y-5">
                  <div className="flex items-center gap-2 pb-2 border-b border-zinc-800">
                    <User size={16} className="text-orange-500" />
                    <span className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">Card Information</span>
                  </div>

                  <div className="relative">
                    <User size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" />
                    <input type="text" name="cardHolderName" placeholder="Card Holder Name" value={formData.cardHolderName} onChange={handleInputChange}
                      className="w-full bg-zinc-800/50 border border-zinc-700 rounded-lg pl-10 pr-4 py-2.5 text-white placeholder-zinc-500 focus:outline-none focus:border-orange-500 transition" />
                  </div>

                  <div className="relative">
                    <Building2 size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" />
                    <input type="text" name="companyName" placeholder="Company Name" value={formData.companyName} onChange={handleInputChange}
                      className="w-full bg-zinc-800/50 border border-zinc-700 rounded-lg pl-10 pr-4 py-2.5 text-white placeholder-zinc-500 focus:outline-none focus:border-orange-500 transition" />
                  </div>

                  <div className="relative">
                    <Briefcase size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" />
                    <input type="text" name="designation" placeholder="Designation / Role" value={formData.designation} onChange={handleInputChange}
                      className="w-full bg-zinc-800/50 border border-zinc-700 rounded-lg pl-10 pr-4 py-2.5 text-white placeholder-zinc-500 focus:outline-none focus:border-orange-500 transition" />
                  </div>

                  <div className="relative">
                    <Phone size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" />
                    <input type="tel" name="phoneNumber" placeholder="Phone Number" value={formData.phoneNumber} onChange={handleInputChange}
                      className="w-full bg-zinc-800/50 border border-zinc-700 rounded-lg pl-10 pr-4 py-2.5 text-white placeholder-zinc-500 focus:outline-none focus:border-orange-500 transition" />
                  </div>
                </div>
              </div>

              {/* Delivery & Payment Section */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                {/* Delivery Method */}
                <div className="space-y-3">
                  <div className="flex items-center gap-2 pb-2 border-b border-zinc-800">
                    <Truck size={16} className="text-orange-500" />
                    <span className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">Delivery Method</span>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <button type="button" onClick={() => setFormData(prev => ({ ...prev, deliveryMethod: 'pickup' }))}
                      className={`p-3 rounded-xl border-2 transition-all text-center ${formData.deliveryMethod === 'pickup' ? 'border-orange-500 bg-orange-500/10 text-orange-500' : 'border-zinc-700 text-zinc-400 hover:border-zinc-500'}`}>
                      <Home size={20} className="mx-auto mb-1" />
                      <span className="text-xs font-medium">Pickup from Office</span>
                    </button>
                    <button type="button" onClick={() => setFormData(prev => ({ ...prev, deliveryMethod: 'door_delivery' }))}
                      className={`p-3 rounded-xl border-2 transition-all text-center ${formData.deliveryMethod === 'door_delivery' ? 'border-orange-500 bg-orange-500/10 text-orange-500' : 'border-zinc-700 text-zinc-400 hover:border-zinc-500'}`}>
                      <Truck size={20} className="mx-auto mb-1" />
                      <span className="text-xs font-medium">Door Delivery</span>
                    </button>
                  </div>
                </div>

                {/* Payment Method */}
                <div className="space-y-3">
                  <div className="flex items-center gap-2 pb-2 border-b border-zinc-800">
                    <Wallet size={16} className="text-orange-500" />
                    <span className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">Payment Method</span>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <button type="button" onClick={() => setFormData(prev => ({ ...prev, paymentMethod: 'cod' }))}
                      className={`p-3 rounded-xl border-2 transition-all text-center ${formData.paymentMethod === 'cod' ? 'border-orange-500 bg-orange-500/10 text-orange-500' : 'border-zinc-700 text-zinc-400 hover:border-zinc-500'}`}>
                      <Wallet size={20} className="mx-auto mb-1" />
                      <span className="text-xs font-medium">Cash on Delivery</span>
                    </button>
                    <button type="button" onClick={() => setFormData(prev => ({ ...prev, paymentMethod: 'razorpay' }))}
                      className={`p-3 rounded-xl border-2 transition-all text-center ${formData.paymentMethod === 'razorpay' ? 'border-orange-500 bg-orange-500/10 text-orange-500' : 'border-zinc-700 text-zinc-400 hover:border-zinc-500'}`}>
                      <CreditCard size={20} className="mx-auto mb-1" />
                      <span className="text-xs font-medium">Razorpay</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Delivery Address */}
              <AnimatePresence>
                {formData.deliveryMethod === 'door_delivery' && (
                  <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="mb-8">
                    <div className="bg-orange-500/5 border border-orange-500/20 rounded-xl p-5">
                      <div className="flex items-center gap-2 mb-4">
                        <MapPin size={16} className="text-orange-500" />
                        <h4 className="font-semibold text-orange-400">Delivery Address</h4>
                      </div>
                      <div className="space-y-3">
                        <input type="text" placeholder="Street Address" value={deliveryAddress.street} onChange={(e) => setDeliveryAddress(p => ({ ...p, street: e.target.value }))}
                          className="w-full bg-zinc-800/50 border border-zinc-700 rounded-lg px-4 py-2.5 text-white placeholder-zinc-500 focus:outline-none focus:border-orange-500 transition" />
                        <div className="grid grid-cols-2 gap-3">
                          <input type="text" placeholder="City" value={deliveryAddress.city} onChange={(e) => setDeliveryAddress(p => ({ ...p, city: e.target.value }))}
                            className="w-full bg-zinc-800/50 border border-zinc-700 rounded-lg px-4 py-2.5 text-white placeholder-zinc-500 focus:outline-none focus:border-orange-500 transition" />
                          <input type="text" placeholder="State" value={deliveryAddress.state} onChange={(e) => setDeliveryAddress(p => ({ ...p, state: e.target.value }))}
                            className="w-full bg-zinc-800/50 border border-zinc-700 rounded-lg px-4 py-2.5 text-white placeholder-zinc-500 focus:outline-none focus:border-orange-500 transition" />
                        </div>
                        <input type="text" placeholder="Pincode" value={deliveryAddress.pincode} onChange={(e) => setDeliveryAddress(p => ({ ...p, pincode: e.target.value }))}
                          className="w-full bg-zinc-800/50 border border-zinc-700 rounded-lg px-4 py-2.5 text-white placeholder-zinc-500 focus:outline-none focus:border-orange-500 transition" />
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Special Instructions */}
              <div className="mb-8">
                <div className="flex items-center gap-2 pb-2 border-b border-zinc-800 mb-3">
                  <FileText size={16} className="text-orange-500" />
                  <span className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">Special Instructions</span>
                </div>
                <textarea rows={3} name="specialInstructions" value={formData.specialInstructions} onChange={handleInputChange}
                  placeholder="Tell us about color profiles, coating preferences, or specific layout instructions..."
                  className="w-full bg-zinc-800/50 border border-zinc-700 rounded-lg px-4 py-3 text-white placeholder-zinc-500 focus:outline-none focus:border-orange-500 transition resize-none" />
              </div>

              {/* Messages */}
              {submitMessage && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className={`mb-6 p-4 rounded-xl text-sm ${submitMessage.type === 'success' ? 'bg-green-500/20 border border-green-500 text-green-400' : 'bg-red-500/20 border border-red-500 text-red-400'}`}>
                  {submitMessage.text}
                </motion.div>
              )}

              {/* Progress Bar */}
              {isSubmitting && (
                <div className="mb-6">
                  <div className="flex justify-between text-xs font-medium mb-2"><span>Uploading...</span><span>{uploadProgress}%</span></div>
                  <div className="w-full bg-zinc-700 h-2 rounded-full overflow-hidden"><motion.div className="bg-orange-500 h-full" initial={{ width: 0 }} animate={{ width: `${uploadProgress}%` }} /></div>
                </div>
              )}

              {/* Submit Button */}
              <button type="submit" disabled={isSubmitting || formData.designFiles.length === 0}
                className={`w-full py-4 rounded-xl font-bold text-base transition-all flex items-center justify-center gap-2 ${isSubmitting || formData.designFiles.length === 0 ? 'bg-zinc-700 cursor-not-allowed text-zinc-400' : 'bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white transform hover:scale-[1.02]'}`}>
                {isSubmitting ? <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <>Initialize Print Order ({formData.designFiles.length}/2 files) <Send size={18} /></>}
              </button>

              {!isLoggedIn && (
                <div className="mt-4 p-3 rounded-lg bg-orange-500/10 border border-orange-500/20 text-center">
                  <p className="text-orange-300 text-xs">Authentication Required: You'll be prompted to sign in before final submission.</p>
                </div>
              )}
            </form>
          </motion.div>
        </div>
      </div>

      {/* Image Preview Modal */}
      {previewImage && (
        <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4" onClick={() => setPreviewImage(null)}>
          <div className="relative max-w-4xl max-h-[90vh]">
            <img src={previewImage} alt="Preview" className="w-full h-full object-contain" />
            <button onClick={() => setPreviewImage(null)} className="absolute top-4 right-4 p-2 bg-black/50 rounded-full hover:bg-black/70 transition"><X size={24} /></button>
          </div>
        </div>
      )}
    </section>
  );
};

export default DesignUploadSection;