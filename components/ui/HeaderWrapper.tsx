import { fetchActiveCategories } from '@/lib/categoryService';
import { getAllProducts } from '@/lib/productService';
import { settingsAPI } from '@/lib/settings-api';
import HeaderClient from './HeaderClient';

interface Category {
  _id: string;
  name: string;
  slug: string;
  createdAt: string;
}

interface SiteSettings {
  siteNameMain: string;
  siteNameTagline: string;
}

interface MapAndLogoSettings {
  logo: string;
  logoAlt: string;
  logoLink: string;
  mapEmbedUrl: string;
  isActive: boolean;
}

export default async function HeaderWrapper() {
  let categories: Category[] = [];
  let siteSettings: SiteSettings = {
    siteNameMain: '',
    siteNameTagline: ''
  };
  let mapAndLogoSettings: MapAndLogoSettings = {
    logo: '',
    logoAlt: 'Company Logo',
    logoLink: '/',
    mapEmbedUrl: '',
    isActive: true
  };
  
  try {
    // Fetch all active categories (no filtering)
    const allCategories = await fetchActiveCategories();
    categories = allCategories;
  } catch (error) {
    console.error('Error loading categories:', error);
  }
  
  try {
    // Fetch site settings on the server
    const response = await settingsAPI.getPublicSettings();
    if (response.success && response.data) {
      const settings = response.data;
      if (settings.siteName && settings.siteName.trim() !== '') {
        const nameParts = settings.siteName.trim().split(' ');
        
        siteSettings = {
          siteNameMain: nameParts[0] || '',
          siteNameTagline: nameParts.length > 1 ? nameParts.slice(1).join(' ') : ''
        };
      }
    }
  } catch (error) {
    console.error('Error loading site settings:', error);
  }
  
  try {
    // Fetch map and logo settings on the server
    const apiBaseUrl = process.env.NEXT_PUBLIC_BASE_URL 

const response = await fetch(`${apiBaseUrl}/api/public/map-logo`, {
  cache: 'no-store'
});
    
    if (response.ok) {
      const data = await response.json();
      if (data.success && data.data) {
        mapAndLogoSettings = {
          logo: data.data.logo || '',
          logoAlt: data.data.logoAlt || 'Company Logo',
          logoLink: data.data.logoLink || '/',
          mapEmbedUrl: data.data.mapEmbedUrl || '',
          isActive: data.data.isActive !== false
        };
      }
    }
  } catch (error) {
    console.error('Error loading map and logo settings:', error);
  }
  
  return <HeaderClient 
    initialCategories={categories} 
    initialSiteSettings={siteSettings}
    initialMapAndLogoSettings={mapAndLogoSettings}
  />;
}