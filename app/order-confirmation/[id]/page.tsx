'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { 
  CheckCircle2, 
  Package, 
  Mail, 
  Phone, 
  User, 
  FileText, 
  Calendar,
  ArrowLeft,
  Printer,
  Download,
  Home,
  Truck,
  Building2,
  Wallet,
  CreditCard,
  MapPin,
  Clock,
  DollarSign
} from 'lucide-react';
interface DesignFile {
  fileName: string;
  fileType: string;
  fileSize: number;
}

interface OrderDetails {
  _id: string;
  orderNumber: string;
  userName: string;
  userEmail: string;
  userPhone: string;
  quantity: number;
  size: string;
  material: string;
  designFiles: DesignFile[];
  additionalText: {
    cardHolderName: string;
    designation: string;
    companyName: string;
    specialInstructions: string;
  };
  status: string;
  createdAt: string;
  submittedAt: string;
   // NEW FIELDS
  deliveryMethod?: 'pickup' | 'door_delivery';
  paymentMethod?: 'cod' | 'razorpay';
  deliveryAddress?: {
    street: string;
    city: string;
    state: string;
    pincode: string;
  };
  deliveryCharge?: number;
  paymentStatus?: string;
}

const OrderConfirmationPage = () => {
  const params = useParams();
  const router = useRouter();
  const orderId = params?.id as string;
  
  const [order, setOrder] = useState<OrderDetails | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (orderId) {
      fetchOrderDetails();
    }
  }, [orderId]);

  const fetchOrderDetails = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/design-orders/${orderId}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        throw new Error('Failed to fetch order details');
      }

      const data = await response.json();
      setOrder(data.order);
    } catch (err) {
      console.error('Error fetching order:', err);
      setError('Unable to load order details. Please contact support.');
    } finally {
      setIsLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(2)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
  };
const getImageUrl = (imagePath: string): string | undefined => {
  if (!imagePath) return undefined;

  // already full url
  if (imagePath.startsWith('http')) return imagePath;

  const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
  
  if (!BASE_URL) return undefined;

  return `${BASE_URL}${imagePath}`;
}
  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-orange-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-zinc-400">Loading your order details...</p>
        </div>
      </div>
    );
  }

  if (error || !order) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center p-4">
        <div className="text-center max-w-md">
          <div className="w-20 h-20 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <FileText className="w-10 h-10 text-red-500" />
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">Order Not Found</h2>
          <p className="text-zinc-400 mb-6">{error || "We couldn't find your order details."}</p>
          <button
            onClick={() => router.push('/')}
            className="px-6 py-3 bg-orange-500 hover:bg-orange-600 rounded-xl text-white font-semibold transition-colors"
          >
            Return to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] py-32 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto">
        {/* Success Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <div className="inline-flex items-center justify-center w-20 h-20 bg-green-500/20 rounded-full mb-6">
            <CheckCircle2 className="w-12 h-12 text-green-500" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
            Order Confirmed! 🎉
          </h1>
          <p className="text-zinc-400 text-lg">
            Your design order has been successfully submitted
          </p>
        </motion.div>

        {/* Order Info Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8"
        >
          {/* Order Number Card */}
          <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-6 backdrop-blur-sm">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-orange-500/20 rounded-xl">
                <Package className="w-5 h-5 text-orange-500" />
              </div>
              <h3 className="text-zinc-400 text-sm uppercase tracking-wider">Order Number</h3>
            </div>
            <p className="text-2xl font-mono font-bold text-white">{order.orderNumber}</p>
            <p className="text-zinc-500 text-sm mt-2">Keep this number for future reference</p>
          </div>

          {/* Status Card */}
          <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-6 backdrop-blur-sm">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-green-500/20 rounded-xl">
                <Calendar className="w-5 h-5 text-green-500" />
              </div>
              <h3 className="text-zinc-400 text-sm uppercase tracking-wider">Order Status</h3>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-green-500 font-semibold capitalize">{order.status}</span>
            </div>
            <p className="text-zinc-500 text-sm mt-2">Submitted on {formatDate(order.createdAt)}</p>
          </div>
        </motion.div>

        {/* Order Details */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-zinc-900/50 border border-zinc-800 rounded-2xl overflow-hidden mb-8"
        >
          {/* Customer Information */}
          <div className="p-6 border-b border-zinc-800">
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <User className="w-5 h-5 text-orange-500" />
              Customer Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-zinc-500 text-sm">Full Name</p>
                <p className="text-white font-medium">{order.userName}</p>
              </div>
              <div>
                <p className="text-zinc-500 text-sm">Email Address</p>
                <p className="text-white font-medium flex items-center gap-2">
                  <Mail className="w-4 h-4 text-zinc-500" />
                  {order.userEmail}
                </p>
              </div>
              {order.userPhone && (
                <div>
                  <p className="text-zinc-500 text-sm">Phone Number</p>
                  <p className="text-white font-medium flex items-center gap-2">
                    <Phone className="w-4 h-4 text-zinc-500" />
                    {order.userPhone}
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Order Specifications */}
          <div className="p-6 border-b border-zinc-800">
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <FileText className="w-5 h-5 text-orange-500" />
              Order Specifications
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <p className="text-zinc-500 text-sm">Quantity</p>
                <p className="text-white font-semibold text-lg">{order.quantity} cards</p>
              </div>
              <div>
                <p className="text-zinc-500 text-sm">Card Size</p>
                <p className="text-white font-semibold text-lg">{order.size}</p>
              </div>
              <div>
                <p className="text-zinc-500 text-sm">Material</p>
                <p className="text-white font-semibold text-lg">{order.material}</p>
              </div>
            </div>
          </div>
{/* Delivery & Payment Information */}
{(order.deliveryMethod || order.paymentMethod) && (
  <div className="p-6 border-b border-zinc-800">
    <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
      <Truck className="w-5 h-5 text-orange-500" />
      Delivery & Payment
    </h3>
    
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Delivery Method - Show only what user selected */}
      <div>
        <p className="text-zinc-500 text-sm mb-2">Delivery Method</p>
        <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium ${
          order.deliveryMethod === 'door_delivery' 
            ? 'bg-orange-500/20 text-orange-400' 
            : 'bg-green-500/20 text-green-400'
        }`}>
          {order.deliveryMethod === 'door_delivery' ? (
            <Truck className="w-4 h-4" />
          ) : (
            <Building2 className="w-4 h-4" />
          )}
          <span className="capitalize">
            {order.deliveryMethod === 'door_delivery' ? 'Door Delivery' : 'Pickup from Office'}
          </span>
        </div>
        
        {/* Delivery Charge - Only show if door delivery */}
        {order.deliveryMethod === 'door_delivery' && order.deliveryCharge && order.deliveryCharge > 0 && (
          <p className="text-zinc-400 text-sm mt-2 flex items-center gap-1">
            <DollarSign className="w-3 h-3" />
            Delivery Charge: <span className="text-orange-400 font-semibold">₹{order.deliveryCharge}</span>
          </p>
        )}
      </div>
      
      {/* Payment Method - Show ONLY what user selected */}
      <div>
        <p className="text-zinc-500 text-sm mb-2">Payment Method</p>
        {order.paymentMethod === 'cod' ? (
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium bg-blue-500/20 text-blue-400">
            <DollarSign className="w-4 h-4" />
            <span>Cash on Delivery</span>
          </div>
        ) : order.paymentMethod === 'razorpay' ? (
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium bg-purple-500/20 text-purple-400">
            <CreditCard className="w-4 h-4" />
            <span>Razorpay (Online)</span>
          </div>
        ) : null}
        
        {/* Payment Status - Only show if exists */}
        {order.paymentStatus && (
          <p className="text-zinc-400 text-sm mt-2">
            Payment Status: 
            <span className={`ml-1 font-semibold ${
              order.paymentStatus === 'paid' ? 'text-green-400' : 
              order.paymentStatus === 'failed' ? 'text-red-400' : 'text-yellow-400'
            }`}>
              {order.paymentStatus.charAt(0).toUpperCase() + order.paymentStatus.slice(1)}
            </span>
          </p>
        )}
      </div>
    </div>
    
    {/* Delivery Address (only if door delivery) */}
    {order.deliveryMethod === 'door_delivery' && order.deliveryAddress && (
      <div className="mt-4 p-4 bg-zinc-800/30 rounded-xl">
        <p className="text-zinc-400 text-sm mb-2 flex items-center gap-1">
          <MapPin className="w-3 h-3" /> Delivery Address
        </p>
        <p className="text-white text-sm">
          {order.deliveryAddress.street}<br />
          {order.deliveryAddress.city}, {order.deliveryAddress.state}<br />
          Pincode: {order.deliveryAddress.pincode}
        </p>
      </div>
    )}
  </div>
)}
          {/* Card Details (if provided) */}
          {(order.additionalText?.cardHolderName || order.additionalText?.companyName) && (
            <div className="p-6 border-b border-zinc-800">
              <h3 className="text-lg font-semibold text-white mb-4">Card Details</h3>
              <div className="space-y-3">
                {order.additionalText.cardHolderName && (
                  <div>
                    <p className="text-zinc-500 text-sm">Card Holder Name</p>
                    <p className="text-white">{order.additionalText.cardHolderName}</p>
                  </div>
                )}
                {order.additionalText.designation && (
                  <div>
                    <p className="text-zinc-500 text-sm">Designation</p>
                    <p className="text-white">{order.additionalText.designation}</p>
                  </div>
                )}
                {order.additionalText.companyName && (
                  <div>
                    <p className="text-zinc-500 text-sm">Company Name</p>
                    <p className="text-white">{order.additionalText.companyName}</p>
                  </div>
                )}
                {order.additionalText.specialInstructions && (
                  <div>
                    <p className="text-zinc-500 text-sm">Special Instructions</p>
                    <p className="text-white italic">{order.additionalText.specialInstructions}</p>
                  </div>
                )}
              </div>
            </div>
          )}
{/* Uploaded Files - Grid Layout with Large Previews */}
<div className="p-6">
  <h3 className="text-lg font-semibold text-white mb-4">Uploaded Files</h3>
  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
    {order.designFiles?.map((file, index) => {
      const isImage = file.fileType === 'WEBP' || file.fileType === 'JPG' || file.fileType === 'PNG' || file.fileType === 'JPEG';
      // Fix: Use BASE_URL not API_URL, and remove /api from path
      const imageUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/uploads/designs/${file.fileName}`;
      
      return (
        <div key={index} className="bg-zinc-950 rounded-xl border border-zinc-800 overflow-hidden group">
          {/* Image Preview Area */}
          <div className="relative h-48 bg-zinc-900">
            {isImage ? (
              <img
                src={getImageUrl(imageUrl)}  // Fix: Call the function with the URL
                alt={`Design ${index + 1}`}
                className="w-full h-full object-contain p-2"
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = 'none';
                  const parent = (e.target as HTMLImageElement).parentElement;
                  if (parent) {
                    const fallback = document.createElement('div');
                    fallback.className = 'w-full h-full flex items-center justify-center';
                    fallback.innerHTML = '<span class="text-zinc-500 text-xs">Image not available</span>';
                    parent.appendChild(fallback);
                  }
                }}
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <FileText className="w-16 h-16 text-orange-500" />
              </div>
            )}
            
            {/* Overlay on hover */}
            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
              {isImage && (
                <button
                  onClick={() => window.open(imageUrl, '_blank')}
                  className="px-4 py-2 bg-orange-500 hover:bg-orange-600 rounded-lg text-white text-sm font-medium transition-colors"
                >
                  View Full Size
                </button>
              )}
              <a
                href={imageUrl}
                download={file.fileName}
                className="px-4 py-2 bg-blue-500 hover:bg-blue-600 rounded-lg text-white text-sm font-medium transition-colors"
              >
                Download
              </a>
            </div>
          </div>
          
          {/* File Info */}
          <div className="p-3">
            <p className="text-white text-sm font-medium truncate">{file.fileName}</p>
            <div className="flex justify-between items-center mt-1">
              <p className="text-zinc-500 text-xs">
                {file.fileType} • {formatFileSize(file.fileSize)}
              </p>
              <span className="text-zinc-600 text-xs">File {index + 1}</span>
            </div>
          </div>
        </div>
      );
    })}
  </div>
</div>
        </motion.div>

        {/* Email Notification Message */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-blue-500/10 border border-blue-500/30 rounded-2xl p-6 mb-8"
        >
          <div className="flex items-start gap-4">
            <Mail className="w-6 h-6 text-blue-400 flex-shrink-0 mt-1" />
            <div>
              <h3 className="text-blue-400 font-semibold mb-1">We'll Notify You via Email</h3>
              <p className="text-zinc-300 text-sm">
                A confirmation has been sent to <span className="text-blue-400 font-medium">{order.userEmail}</span>. 
                We'll keep you updated on your order status through email updates.
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                <span className="text-xs text-blue-400/80 bg-blue-500/20 px-3 py-1 rounded-full">Order Confirmation</span>
                <span className="text-xs text-blue-400/80 bg-blue-500/20 px-3 py-1 rounded-full">Design Review</span>
                <span className="text-xs text-blue-400/80 bg-blue-500/20 px-3 py-1 rounded-full">Printing Started</span>
                <span className="text-xs text-blue-400/80 bg-blue-500/20 px-3 py-1 rounded-full">Ready for Dispatch</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="flex flex-wrap gap-4 justify-center"
        >
          <button
            onClick={() => router.push('/')}
            className="px-6 py-3 bg-zinc-800 hover:bg-zinc-700 rounded-xl text-white font-medium transition-colors flex items-center gap-2"
          >
            <Home className="w-5 h-5" />
            Back to Home
          </button>
     
<button
  onClick={() => {
    router.push('/#design-upload-section');
  }}
  className="px-6 py-3 bg-orange-500 hover:bg-orange-600 rounded-xl text-white font-medium transition-colors flex items-center gap-2"
>
  <ArrowLeft className="w-5 h-5" />
  Submit Another Order
</button>
        </motion.div>

        {/* Next Steps */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-12 p-6 bg-zinc-900/30 rounded-2xl text-center"
        >
          <h4 className="text-white font-semibold mb-2">What's Next?</h4>
          <p className="text-zinc-400 text-sm">
            Our design team will review your artwork within 24 hours. You'll receive an email confirmation 
            once your design is approved and sent for printing.
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default OrderConfirmationPage;