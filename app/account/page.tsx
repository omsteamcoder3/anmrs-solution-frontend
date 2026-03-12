// src/pages/BankAccountPage.tsx
"use client";

import React, { useState, useEffect } from 'react';
import { settingsAPI } from '@/lib/settings-api';
import { 
  Building, 
  UserCircle, 
  Hash, 
  Code, 
  MapPin, 
  QrCode,
  Copy,
  Check,
  Banknote,
  CreditCard,
  FileText,
  Globe,
  Shield,
  AlertCircle,
  Smartphone,
  Phone,
  ExternalLink,
  Wallet,
  BanknoteIcon,
  Smartphone as PhoneIcon,
  Eye,
  EyeOff
} from 'lucide-react';

interface BankAccountDetails {
  bankName: string;
  accountHolderName: string;
  accountNumber: string;
  accountType: string;
  bankBranch: string;
  ifscCode: string;
  swiftCode: string;
  bankAddress: string;
  micrCode: string;
  upiId: string;
}

interface DigitalPaymentDetails {
  phonePeNumber: string;
  googlePayNumber: string;
  phonePeQrImage: string;
  googlePayQrImage: string;
}

const BankAccountPage: React.FC = () => {
  const [bankDetails, setBankDetails] = useState<BankAccountDetails>({
    bankName: '',
    accountHolderName: '',
    accountNumber: '',
    accountType: 'Savings',
    bankBranch: '',
    ifscCode: '',
    swiftCode: '',
    bankAddress: '',
    micrCode: '',
    upiId: ''
  });

  const [digitalPayments, setDigitalPayments] = useState<DigitalPaymentDetails>({
    phonePeNumber: '',
    googlePayNumber: '',
    phonePeQrImage: '',
    googlePayQrImage: ''
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const [showAccountNumber, setShowAccountNumber] = useState(false);

  useEffect(() => {
    fetchBankDetails();
  }, []);

  const fetchBankDetails = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await settingsAPI.getPublicSettings();
      
      if (response.success && response.data) {
        const settings = response.data;
        
        setBankDetails({
          bankName: settings.bankName || '',
          accountHolderName: settings.accountHolderName || '',
          accountNumber: settings.accountNumber || '',
          accountType: settings.accountType || 'Savings',
          bankBranch: settings.bankBranch || '',
          ifscCode: settings.ifscCode || '',
          swiftCode: settings.swiftCode || '',
          bankAddress: settings.bankAddress || '',
          micrCode: settings.micrCode || '',
          upiId: settings.upiId || ''
        });

        setDigitalPayments({
          phonePeNumber: settings.phonePeNumber || '',
          googlePayNumber: settings.googlePayNumber || '',
          phonePeQrImage: settings.phonePeQrImage || '',
          googlePayQrImage: settings.googlePayQrImage || ''
        });

        const hasPaymentDetails = 
          settings.bankName || 
          settings.accountNumber || 
          settings.accountHolderName ||
          settings.phonePeNumber ||
          settings.googlePayNumber ||
          settings.upiId;

        if (!hasPaymentDetails) {
          setError('Payment details not configured yet');
        }
      } else {
        setError('Failed to load payment details');
      }
    } catch (err) {
      console.error('Error fetching payment details:', err);
      setError('Failed to load payment details. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = (text: string, fieldName: string) => {
    if (!text) return;
    
    navigator.clipboard.writeText(text)
      .then(() => {
        setCopiedField(fieldName);
        setTimeout(() => setCopiedField(null), 2000);
      })
      .catch(err => {
        console.error('Failed to copy:', err);
      });
  };

  const formatAccountNumber = (accountNumber: string) => {
    if (!accountNumber) return '';
    
    // Format with spaces for readability (e.g., 1234 5678 9012 3456)
    const cleaned = accountNumber.replace(/\s/g, '');
    const groups = cleaned.match(/.{1,4}/g);
    return groups ? groups.join(' ') : accountNumber;
  };

  const getAccountTypeColor = (type: string) => {
    const colors: Record<string, string> = {
      'Savings': 'bg-[#008080]/10 text-[#008080] border border-[#008080]/20',
      'Current': 'bg-[#008080]/10 text-[#008080] border border-[#008080]/20',
      'Salary': 'bg-[#008080]/10 text-[#008080] border border-[#008080]/20',
      'Fixed Deposit': 'bg-[#008080]/10 text-[#008080] border border-[#008080]/20',
      'Recurring Deposit': 'bg-[#008080]/10 text-[#008080] border border-[#008080]/20'
    };
    return colors[type] || 'bg-gray-50 text-gray-700 border border-gray-200';
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 md:p-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <div className="h-8 bg-gray-200 rounded w-48 mb-4 animate-pulse"></div>
            <div className="h-4 bg-gray-200 rounded w-96 mb-2 animate-pulse"></div>
            <div className="h-4 bg-gray-200 rounded w-64 animate-pulse"></div>
          </div>
          
          <div className="space-y-6">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="bg-white rounded-xl shadow-sm p-6 animate-pulse">
                <div className="h-4 bg-gray-200 rounded w-32 mb-4"></div>
                <div className="h-6 bg-gray-200 rounded w-full mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-24"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  const hasAnyPaymentMethod = 
    bankDetails.bankName || 
    bankDetails.accountNumber || 
    bankDetails.accountHolderName ||
    bankDetails.upiId ||
    digitalPayments.phonePeNumber ||
    digitalPayments.googlePayNumber;

  if (error && !hasAnyPaymentMethod) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 md:p-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            
            <p className="text-gray-600">View and use our payment information for transactions</p>
          </div>
          
          <div className="bg-white rounded-xl shadow-sm p-8 text-center">
            <AlertCircle className="w-16 h-16 text-yellow-500 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Payment Details Not Available</h3>
            <p className="text-gray-600 mb-6">{error}</p>
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 max-w-2xl mx-auto">
              <p className="text-sm text-yellow-700">
                Please contact the administrator to configure payment details in the settings.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center mb-4">
         
          
          </div>
        </div>


        {/* Vertical Layout */}
        <div className="space-y-8">
          {/* Bank Account Section */}
          {(bankDetails.bankName || bankDetails.accountNumber || bankDetails.accountHolderName) && (
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200">
              <div className="flex items-center mb-6">
                <div className="p-2 bg-[#008080]/10 rounded-lg mr-4">
                  <Building className="w-6 h-6 text-[#008080]" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">Bank Account Details</h2>
              </div>
              
              <div className="space-y-6">
                {bankDetails.bankName && (
                  <div className="border-l-4 border-[#008080] pl-4 py-2">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="text-sm font-medium text-gray-500 mb-1">Bank Name</p>
                        <p className="text-lg font-semibold text-gray-900">{bankDetails.bankName}</p>
                      </div>
                      <button
                        onClick={() => copyToClipboard(bankDetails.bankName, 'bankName')}
                        className="flex items-center gap-2 text-[#008080] hover:text-[rgb(129,52,0)] px-3 py-2 rounded-lg hover:bg-[#008080]/10 transition-colors"
                      >
                        {copiedField === 'bankName' ? (
                          <>
                            <Check className="w-4 h-4" />
                            <span className="text-sm font-medium">Copied</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-4 h-4" />
                            <span className="text-sm font-medium">Copy</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                )}

                {bankDetails.accountHolderName && (
                  <div className="border-l-4 border-[#008080] pl-4 py-2">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="text-sm font-medium text-gray-500 mb-1">Account Holder</p>
                        <div className="flex items-center gap-3">
                          <UserCircle className="w-5 h-5 text-gray-400" />
                          <p className="text-lg font-semibold text-gray-900">{bankDetails.accountHolderName}</p>
                        </div>
                      </div>
                      <button
                        onClick={() => copyToClipboard(bankDetails.accountHolderName, 'accountHolderName')}
                        className="flex items-center gap-2 text-[#008080] hover:text-[rgb(129,52,0)] px-3 py-2 rounded-lg hover:bg-[#008080]/10 transition-colors"
                      >
                        {copiedField === 'accountHolderName' ? (
                          <>
                            <Check className="w-4 h-4" />
                            <span className="text-sm font-medium">Copied</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-4 h-4" />
                            <span className="text-sm font-medium">Copy</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                )}

                {bankDetails.accountNumber && (
                  <div className="border-l-4 border-[#008080] pl-4 py-2">
                    <div className="space-y-3">
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="text-sm font-medium text-gray-500 mb-1">Account Number</p>
                          <div className="flex items-center gap-3">
                            <Hash className="w-5 h-5 text-gray-400" />
                            <div className="flex items-center gap-2">
                              <p className="text-xl font-mono font-bold text-gray-900 tracking-wider">
                                {showAccountNumber ? formatAccountNumber(bankDetails.accountNumber) : bankDetails.accountNumber}
                              </p>
                              <button
                                onClick={() => setShowAccountNumber(!showAccountNumber)}
                                className="text-gray-500 hover:text-gray-700 p-1"
                                title={showAccountNumber ? "Hide formatting" : "Show with spacing"}
                              >
                                {showAccountNumber ? (
                                  <EyeOff className="w-4 h-4" />
                                ) : (
                                  <Eye className="w-4 h-4" />
                                )}
                              </button>
                            </div>
                          </div>
                        </div>
                        <button
                          onClick={() => copyToClipboard(bankDetails.accountNumber, 'accountNumber')}
                          className="flex items-center gap-2 text-[#008080] hover:text-[rgb(129,52,0)] px-3 py-2 rounded-lg hover:bg-[#008080]/10 transition-colors"
                        >
                          {copiedField === 'accountNumber' ? (
                            <>
                              <Check className="w-4 h-4" />
                              <span className="text-sm font-medium">Copied</span>
                            </>
                          ) : (
                            <>
                              <Copy className="w-4 h-4" />
                              <span className="text-sm font-medium">Copy</span>
                            </>
                          )}
                        </button>
                      </div>
                      <div className="bg-gray-50 rounded-lg p-3">
                        <p className="text-xs text-gray-500">
                          <span className="font-medium">Full Account Number:</span> {bankDetails.accountNumber}
                          <br />
                          <span className="text-gray-400">Make sure to copy the exact account number without spaces</span>
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {bankDetails.accountType && (
                  <div className="border-l-4 border-[#008080] pl-4 py-2">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="text-sm font-medium text-gray-500 mb-1">Account Type</p>
                        <span className={`px-4 py-2 rounded-lg text-sm font-semibold ${getAccountTypeColor(bankDetails.accountType)}`}>
                          {bankDetails.accountType} Account
                        </span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Digital Payments Section */}
          {(digitalPayments.phonePeNumber || digitalPayments.googlePayNumber) && (
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200">
              <div className="flex items-center mb-6">
                <div className="p-2 bg-[#008080]/10 rounded-lg mr-4">
                  <Smartphone className="w-6 h-6 text-[#008080]" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">Digital Payment Methods</h2>
              </div>
              
              <div className="space-y-8">
                {digitalPayments.phonePeNumber && (
                  <div className="border border-gray-200 rounded-xl p-5">
                    <div className="flex items-center mb-4">
                      <div className="w-10 h-10 bg-[#008080] rounded-lg flex items-center justify-center mr-4">
                        <Smartphone size={20} className="text-white" />
                      </div>
                      <h3 className="text-xl font-semibold text-gray-900">PhonePe</h3>
                    </div>
                    
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-3">
                          <Phone className="w-5 h-5 text-gray-400" />
                          <div>
                            <p className="text-sm font-medium text-gray-500 mb-1">Phone Number</p>
                            <p className="text-lg font-semibold text-gray-900">{digitalPayments.phonePeNumber}</p>
                          </div>
                        </div>
                        <button
                          onClick={() => copyToClipboard(digitalPayments.phonePeNumber, 'phonePeNumber')}
                          className="inline-flex items-center gap-2 text-[#008080] hover:text-[rgb(129,52,0)] px-4 py-2 rounded-lg hover:bg-[#008080]/10 transition-colors border border-[#008080]/20"
                        >
                          {copiedField === 'phonePeNumber' ? (
                            <>
                              <Check className="w-4 h-4" />
                              <span className="font-medium">Copied</span>
                            </>
                          ) : (
                            <>
                              <Copy className="w-4 h-4" />
                              <span className="font-medium">Copy Number</span>
                            </>
                          )}
                        </button>
                      </div>
                      
                      {digitalPayments.phonePeQrImage && (
                        <div className="flex-shrink-0">
                          <div className="bg-gray-50 rounded-xl p-4">
                            <p className="text-sm font-medium text-gray-700 mb-3 text-center">Scan with PhonePe</p>
                            <img 
                              src={`${process.env.NEXT_PUBLIC_IMG_URL}/${digitalPayments.phonePeQrImage}`} 
                              alt="PhonePe QR Code"
                              className="w-48 h-48 object-contain mx-auto"
                            />
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {digitalPayments.googlePayNumber && (
                  <div className="border border-gray-200 rounded-xl p-5">
                    <div className="flex items-center mb-4">
                      <div className="w-10 h-10 bg-[#008080] rounded-lg flex items-center justify-center mr-4">
                        <Smartphone size={20} className="text-white" />
                      </div>
                      <h3 className="text-xl font-semibold text-gray-900">Google Pay</h3>
                    </div>
                    
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-3">
                          <Phone className="w-5 h-5 text-gray-400" />
                          <div>
                            <p className="text-sm font-medium text-gray-500 mb-1">Phone Number</p>
                            <p className="text-lg font-semibold text-gray-900">{digitalPayments.googlePayNumber}</p>
                          </div>
                        </div>
                        <button
                          onClick={() => copyToClipboard(digitalPayments.googlePayNumber, 'googlePayNumber')}
                          className="inline-flex items-center gap-2 text-[#008080] hover:text-[rgb(129,52,0)] px-4 py-2 rounded-lg hover:bg-[#008080]/10 transition-colors border border-[#008080]/20"
                        >
                          {copiedField === 'googlePayNumber' ? (
                            <>
                              <Check className="w-4 h-4" />
                              <span className="font-medium">Copied</span>
                            </>
                          ) : (
                            <>
                              <Copy className="w-4 h-4" />
                              <span className="font-medium">Copy Number</span>
                            </>
                          )}
                        </button>
                      </div>
                      
                      {digitalPayments.googlePayQrImage && (
                        <div className="flex-shrink-0">
                          <div className="bg-gray-50 rounded-xl p-4">
                            <p className="text-sm font-medium text-gray-700 mb-3 text-center">Scan with Google Pay</p>
                            <img 
                              src={`${process.env.NEXT_PUBLIC_IMG_URL}/${digitalPayments.googlePayQrImage}`} 
                              alt="Google Pay QR Code"
                              className="w-48 h-48 object-contain mx-auto"
                            />
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

      

          {/* Bank Codes Section */}
          {(bankDetails.ifscCode || bankDetails.swiftCode || bankDetails.micrCode) && (
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200">
              <div className="flex items-center mb-6">
                <div className="p-2 bg-[#008080]/10 rounded-lg mr-4">
                  <Code className="w-6 h-6 text-[#008080]" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">Bank Codes & Information</h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {bankDetails.ifscCode && (
                  <div className="bg-gray-50 rounded-xl p-5">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="p-2 bg-[#008080]/10 rounded-lg">
                        <Hash className="w-4 h-4 text-[#008080]" />
                      </div>
                      <h3 className="font-semibold text-gray-900">IFSC Code</h3>
                    </div>
                    <div className="flex justify-between items-center mb-3">
                      <p className="text-2xl font-mono font-bold text-gray-900 uppercase tracking-wider">
                        {bankDetails.ifscCode}
                      </p>
                      <button
                        onClick={() => copyToClipboard(bankDetails.ifscCode, 'ifscCode')}
                        className="text-[#008080] hover:text-[rgb(129,52,0)] p-2"
                        title="Copy IFSC code"
                      >
                        {copiedField === 'ifscCode' ? (
                          <Check className="w-5 h-5" />
                        ) : (
                          <Copy className="w-5 h-5" />
                        )}
                      </button>
                    </div>
                    <p className="text-sm text-gray-500">11-digit code for domestic transfers</p>
                  </div>
                )}

                {bankDetails.swiftCode && (
                  <div className="bg-gray-50 rounded-xl p-5">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="p-2 bg-[#008080]/10 rounded-lg">
                        <Globe className="w-4 h-4 text-[#008080]" />
                      </div>
                      <h3 className="font-semibold text-gray-900">SWIFT/BIC Code</h3>
                    </div>
                    <div className="flex justify-between items-center mb-3">
                      <p className="text-2xl font-mono font-bold text-gray-900 uppercase tracking-wider">
                        {bankDetails.swiftCode}
                      </p>
                      <button
                        onClick={() => copyToClipboard(bankDetails.swiftCode, 'swiftCode')}
                        className="text-[#008080] hover:text-[rgb(129,52,0)] p-2"
                        title="Copy SWIFT code"
                      >
                        {copiedField === 'swiftCode' ? (
                          <Check className="w-5 h-5" />
                        ) : (
                          <Copy className="w-5 h-5" />
                        )}
                      </button>
                    </div>
                    <p className="text-sm text-gray-500">For international transfers</p>
                  </div>
                )}

                {bankDetails.micrCode && (
                  <div className="bg-gray-50 rounded-xl p-5">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="p-2 bg-[#008080]/10 rounded-lg">
                        <FileText className="w-4 h-4 text-[#008080]" />
                      </div>
                      <h3 className="font-semibold text-gray-900">MICR Code</h3>
                    </div>
                    <div className="flex justify-between items-center mb-3">
                      <p className="text-2xl font-mono font-bold text-gray-900">
                        {bankDetails.micrCode}
                      </p>
                      <button
                        onClick={() => copyToClipboard(bankDetails.micrCode, 'micrCode')}
                        className="text-[#008080] hover:text-[rgb(129,52,0)] p-2"
                        title="Copy MICR code"
                      >
                        {copiedField === 'micrCode' ? (
                          <Check className="w-5 h-5" />
                        ) : (
                          <Copy className="w-5 h-5" />
                        )}
                      </button>
                    </div>
                  </div>
                )}

                {bankDetails.bankBranch && (
                  <div className="bg-gray-50 rounded-xl p-5">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="p-2 bg-[#008080]/10 rounded-lg">
                        <MapPin className="w-4 h-4 text-[#008080]" />
                      </div>
                      <h3 className="font-semibold text-gray-900">Bank Branch</h3>
                    </div>
                    <div className="flex items-start gap-3">
                      <MapPin className="w-5 h-5 text-gray-400 mt-1 flex-shrink-0" />
                      <p className="text-gray-700 text-lg">{bankDetails.bankBranch}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Bank Address Section */}
          {bankDetails.bankAddress && (
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200">
              <div className="flex items-center mb-6">
                <div className="p-2 bg-[#008080]/10 rounded-lg mr-4">
                  <MapPin className="w-6 h-6 text-[#008080]" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">Bank Address</h2>
              </div>
              
              <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl p-6">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-start gap-4">
                      <MapPin className="w-6 h-6 text-gray-400 mt-1 flex-shrink-0" />
                      <p className="text-gray-700 text-lg leading-relaxed whitespace-pre-line">
                        {bankDetails.bankAddress}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => copyToClipboard(bankDetails.bankAddress, 'bankAddress')}
                    className="ml-6 inline-flex items-center gap-2 bg-white border border-gray-300 text-gray-700 hover:text-[#008080] hover:border-[#008080] px-4 py-2 rounded-lg hover:bg-[#008080]/10 transition-colors"
                  >
                    {copiedField === 'bankAddress' ? (
                      <>
                        <Check className="w-4 h-4" />
                        <span className="font-medium">Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4" />
                        <span className="font-medium">Copy Address</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer Note */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 text-sm text-gray-500 bg-gray-50 px-4 py-2 rounded-full">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>Last updated: {new Date().toLocaleDateString('en-IN', { 
                day: '2-digit', 
                month: 'short', 
                year: 'numeric' 
              })}</span>
            </div>
            <p className="text-sm text-gray-400 mt-4">
              For any queries regarding payments, please contact our support team
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BankAccountPage;