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

export default async function HeaderWrapper() {
  let categories: Category[] = [];
  let siteSettings: SiteSettings = {
    siteNameMain: '',
    siteNameTagline: ''
  };
  
  try {
    // Fetch all active categories
    const allCategories = await fetchActiveCategories();
    
    // Filter categories that have products on the server side
    const categoriesWithProducts: Category[] = [];
    
    for (const category of allCategories) {
      const response = await getAllProducts({ category: category._id });
      if (response.data && response.data.length > 0) {
        categoriesWithProducts.push(category);
      }
    }
    
    categories = categoriesWithProducts;
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
  
  return <HeaderClient 
    initialCategories={categories} 
    initialSiteSettings={siteSettings}
  />;
}